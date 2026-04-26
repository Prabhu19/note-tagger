# Codebase Guide

This document explains every file in the project, how they connect, and the
key concepts you need to understand to work on this codebase confidently.

---

## The Big Picture

Note Tagger is a single-page note-taking app where a small BERT language model
runs **inside the browser** and automatically categorises each note as
work / todo / idea / personal before you save it.

```
Browser (WASM)                         Server (native binary or CF Worker)
──────────────────────────────         ─────────────────────────────────────
NoteTakerComponent (UI)                Axum HTTP server
  │  sends text                          │  serves initial HTML with notes
  ▼                                      │  already embedded (SSR)
BertClassifierWorker (Web Worker)        │
  │  BERT model runs here                │  save_note()  ──►  /tmp/notes.cbor
  │  returns tag string                  │  load_notes() ◄──  (or R2 on CF)
  ▼
tag shown in UI → user clicks Save
  │
  └──── HTTP call ──────────────────►  save_note server function
                                        returns updated Vec<Note>
```

The same Rust source compiles to three distinct outputs depending on which
Cargo features are enabled. Understanding feature flags is the single most
important thing to grasp before reading any file.

---

## Feature Flags — the Key to Reading This Code

```
Feature           What it produces
──────────────    ──────────────────────────────────────────────────────
hydrate           Client-side WASM bundle (hydrates SSR HTML in browser)
ssr + nocloudflare  Native binary → Axum dev server on your machine
ssr + cloudflare  WASM → Cloudflare Worker (replaces the native binary)
```

Throughout the source you will see blocks like:

```rust
#[cfg(feature = "cloudflare")]
let id = js_sys::Date::now() as u64;   // JS Date API, available in WASM

#[cfg(not(feature = "cloudflare"))]
let id = std::time::SystemTime::now()  // std time, available in native
    ...
```

These `#[cfg(...)]` attributes are compile-time switches — the compiler only
includes the matching block. When you read a file and see `#[cfg(...)]`,
mentally pick **one** target (e.g. `nocloudflare` for local dev) and
ignore the blocks that don't match.

---

## File-by-File Walkthrough

### `src/types.rs` — Shared data model

This is the simplest file and the foundation everything else builds on.

```
NoteTag  — enum with four variants: Work, Todo, Idea, Personal
           as_str() converts to the lowercase string used in CSS and storage

Note     — the actual stored record
           id:         unix timestamp in milliseconds, used as a unique key
           text:       the raw note the user typed
           tag:        a NoteTag variant
           created_at: same value as id (timestamp at creation)
```

Both structs derive `Serialize` / `Deserialize` so they can be sent over
HTTP (as CBOR) and stored to disk. This file is compiled into **both** the
server binary and the WASM bundle — it is the contract between the two sides.

---

### `src/lib.rs` — Crate entry point and wiring

This file does three different jobs depending on the build target.

**1. Declares all modules** (always compiled):
```rust
pub mod app;
pub mod components;
pub mod ml;
pub mod types;
pub mod webworker;
```

**2. Registers server functions** (`ssr` feature only):
```rust
pub fn register_server_functions() {
    register_explicit::<ml::util::SaveNote>();
    register_explicit::<ml::util::LoadNotes>();
}
```
Leptos server functions are HTTP endpoints — they must be explicitly
registered with the Axum router before the server starts handling requests.
If you forget this, calling a server function from the browser returns a 404.

**3. Cloudflare fetch handler** (`ssr + cloudflare` features):
```rust
#[event(fetch)]
async fn fetch(req: HttpRequest, env: Env, _ctx: Context) -> Result<...> {
    Ok(router(env).await.call(req).await?)
}
```
Cloudflare Workers have no `main()`. Instead, every incoming HTTP request
triggers this `fetch` event. The `router()` function builds an Axum router,
and `tower_service::Service::call` dispatches the request through it.

**4. Hydration entry point** (`hydrate` feature only):
```rust
#[wasm_bindgen]
pub fn hydrate() {
    leptos::mount::hydrate_body(App);
}
```
After the browser downloads the WASM bundle, it calls this exported function.
"Hydration" means Leptos walks the server-rendered HTML already in the DOM
and attaches event listeners to it — so the page is interactive instantly
without re-rendering from scratch.

---

### `src/main.rs` — Local dev server

Only compiled when the `nocloudflare` feature is active. It is a standard
Axum async main that:

1. Reads Leptos config (port, asset paths etc.) via `get_configuration(None)`
2. Generates the route list from the `App` component
3. Registers server functions
4. Starts a TCP listener and serves the app

This is what runs when you do `./target/debug/note-tagger` or
`cargo leptos watch` locally.

---

### `src/app.rs` — App shell and routing

Two functions live here:

**`shell(options)`** — produces the outer HTML document (`<html>`, `<head>`,
`<body>`). It is called once per SSR request on the server side. It injects:
- `<AutoReload>` — the WebSocket that triggers hot-reload during `cargo leptos watch`
- `<HydrationScripts>` — the `<script>` tags that load the WASM bundle
- `<MetaTags>` — renders any `<Title>` / `<Meta>` set by child components

**`App()`** — the root Leptos component. It:
- Calls `provide_meta_context()` so child components can set `<Title>` etc.
- Loads the CSS file via `<Stylesheet>`
- Sets up the `<Router>` with a single route at `/` that renders
  `NoteTakerComponent`

The distinction between `shell` and `App` matters because `shell` is only
called server-side (it produces raw HTML), while `App` runs on both sides
(server for SSR, browser for hydration).

---

### `src/components/note_taker.rs` — The entire UI

This is the only user-visible component. It owns all reactive state for the
page. Here is what each piece of state does:

```
Signal              Type                  Meaning
──────────────────  ────────────────────  ──────────────────────────────────
note_text           String                text currently in the textarea
pending_tag         Option<String>        tag returned by the worker, not yet saved
is_classifying      bool                  true while waiting for worker response
filter_tag          Option<String>        which tag the list is filtered to
```

**Resources and Actions** — Leptos uses these instead of `useState` + `fetch`:

| Leptos primitive | Used for | Why |
|---|---|---|
| `Resource` | `load_notes` | SSR-compatible — initial data is serialised into the HTML so the page has notes on first load without a loading spinner |
| `LocalResource` | the web worker | Browser-only (`!Send` channels can't cross the SSR boundary) |
| `Action` | `save_note` | Represents a mutation — `.pending()` drives the "Saving..." button label; `.value()` holds the updated notes list after success |

**How note display works:**
```rust
let displayed_notes = move || {
    if let Some(Ok(notes)) = save_action.value().get() {
        return notes;   // prefer the freshest save result
    }
    notes_resource.get().and_then(|r| r.ok()).unwrap_or_default()
};
```
After a save, the server returns the complete updated list. `displayed_notes`
prefers that over the original `load_notes` result, so the list updates
immediately without a second network request.

**Worker interaction:**
```
User clicks Auto-Tag
  → classify_note() sends note_text into tx (worker's input channel)
  → is_classifying = true (button shows "Classifying...")

Worker processes it asynchronously
  → sends tag string back via tx (worker's output channel)

Effect drains the output stream
  → set_pending_tag(Some(tag))
  → is_classifying = false
```

**`into_any()`** — You will see `.into_any()` at the end of each branch
inside `{move || { ... }}` blocks that return different view types (a `<p>`
in one branch vs a list of `<div>`s in the other). Leptos requires a single
concrete return type; `.into_any()` erases the type so both branches unify.

---

### `src/webworker.rs` — BERT classifier running off the main thread

The `#[worker(BertClassifierWorker)]` macro from `leptos_workers` does two
things: it generates a Web Worker script, and it provides the `bert_classifier_worker()`
function that the UI calls to get `(tx, rx)` channel handles.

The worker function itself runs **inside the Web Worker thread**:

```
Worker starts
  ├─ BertEncoder::load()          — parses safetensors, initialises BERT (~0.3s)
  ├─ build_label_embeddings()     — embeds the 12 label phrases
  └─ logs "BertClassifierWorker: ready."

Loop forever:
  receive note_text from rx
    encode(note_text) → 128-dim vector
    classify(vector, label_embeddings) → NoteTag
    send tag.as_str() via tx
```

The model loads **once** at startup and stays in memory. Every subsequent
classification is just a forward pass through the small BERT-tiny model
(2 layers, hidden size 128), which takes roughly 500ms with WASM SIMD enabled.

---

### `src/ml/model.rs` — BertEncoder

**`include_bytes!`** bakes the three model files directly into the compiled
WASM binary at build time:
```rust
static MODEL_BYTES: &[u8] = include_bytes!("../../assets/models/bert-tiny/model.safetensors");
static TOKENIZER_BYTES: &[u8] = include_bytes!("../../assets/models/bert-tiny/tokenizer.json");
static CONFIG_BYTES: &[u8] = include_bytes!("../../assets/models/bert-tiny/config.json");
```
This means no network request is needed to load the model — it is already
inside the WASM bundle. The trade-off is ~32MB added to the WASM size, but
that is served from Cloudflare Assets which has no size limit.

**`BertEncoder::load()`** — parses the three bytes slices into a live model:
1. `serde_json::from_slice(CONFIG_BYTES)` → `BertConfig` (architecture params)
2. `Tokenizer::from_bytes(TOKENIZER_BYTES)` → WordPiece tokenizer
3. `VarBuilder::from_buffered_safetensors(MODEL_BYTES)` → tensor store
4. `BertModel::load(vb.pp("bert"), &config)` → the actual neural network

Note `vb.pp("bert")`: the safetensors file stores weights with a `bert.`
prefix (e.g. `bert.embeddings.word_embeddings.weight`). `pp("bert")` tells
the VarBuilder to prepend `"bert."` to every lookup, so candle finds them.

**`BertEncoder::encode(text)`** — runs a forward pass:
1. Tokenize text → token ids, type ids, attention mask
2. Wrap each as a `[1, seq_len]` Tensor (batch size 1)
3. Call `model.forward(ids, types, mask)` → `[1, seq_len, 128]` output
4. Extract position `(0, 0)` — the `[CLS]` token at the start of the sequence
5. Return as `Vec<f32>` (128 floats)

The `[CLS]` token is a special token BERT always places first. After
pre-training, its embedding summarises the whole input sentence.

---

### `src/ml/embed.rs` — Zero-shot classification

**Why zero-shot?** The model was never trained on "work/todo/idea/personal"
labels. Instead, we rely on the fact that pre-trained BERT already understands
language. Two sentences that mean similar things will have similar embeddings.

**`LABEL_PHRASES`** — twelve example sentences, three per category:
```
"meeting with team"           → Work
"finish this task"            → Todo
"new feature concept"         → Idea
"weekend with family"         → Personal
...
```

**`build_label_embeddings(encoder)`** — called once at worker startup:
- Encodes all 12 phrases into 128-dim vectors
- Groups them by category and averages the three vectors per category
- Returns four `(NoteTag, Vec<f32>)` pairs — one centroid per category

**`cosine_similarity(a, b)`** — measures how similar two vectors are:
```
similarity = (a · b) / (|a| × |b|)
```
Result is between -1 and 1. Values near 1 mean the two texts are
semantically close. This is preferred over Euclidean distance because
it is scale-invariant — length of the vector doesn't affect the score.

**`classify(note_emb, label_embeddings)`** — picks the winning category:
- Computes cosine similarity between the note embedding and each of the four
  category centroids
- Returns the `NoteTag` with the highest score

---

### `src/ml/util.rs` — Server functions (HTTP endpoints)

The `#[server(...)]` macro from Leptos generates both sides of an HTTP call:
- On the server: a real async function that runs
- On the client (WASM): a stub that serialises arguments, POSTs to the
  `/api/save_note` endpoint, and deserialises the response

Both functions use `Cbor` as the codec — CBOR is a compact binary format,
smaller than JSON, suitable for `Vec<Note>` payloads.

**`save_note(text, tag)`**:
1. Converts the `tag: String` back to a `NoteTag` enum variant
2. Creates a new `Note` with a timestamp ID
3. **nocloudflare path**: reads `/tmp/notes.cbor`, appends the note, writes back
4. **cloudflare path**: extracts the R2 `Bucket` from Axum's request extensions,
   reads `notes/all.cbor` from R2, appends, writes back
5. Returns the full updated `Vec<Note>` — the UI uses this to refresh the list

**`load_notes()`** — the same dual-backend pattern, read-only.

**`SendWrapper`** — R2's `Bucket` type is `!Send` (it holds a JS object that
is not thread-safe). Rust's async runtime requires `Send` futures. `SendWrapper`
is a type that asserts "I know this is !Send but I'm running on a single-threaded
JS event loop so it's fine." Every `.await` on an R2 operation must be wrapped.

---

### `assets/models/bert-tiny/` — Model weights (gitignored)

Three files downloaded during `just setup`:

| File | Size | Purpose |
|---|---|---|
| `model.safetensors` | ~32MB | Neural network weight tensors |
| `tokenizer.json` | ~455KB | Vocabulary and tokenisation rules |
| `config.json` | < 1KB | Model architecture (layer count, hidden size etc.) |

These are **not committed** to git (`.gitignore` excludes `assets/models/`).
Anyone cloning the repo must run `just setup` to download them before building.

---

### `justfile` — Task runner

| Command | What it does |
|---|---|
| `just setup` | Adds WASM target, installs `cargo-leptos` and `wasm-bindgen-cli`, downloads model weights |
| `just dev-native` | Hot-reloading local dev server via `cargo leptos watch` |
| `just dev` | Cloudflare Workers dev via `npx wrangler dev` |
| `just build` | Full release build |
| `just check features="ssr,nocloudflare"` | Fast type-check for a specific feature combo |
| `just test-wasm` | WASM unit tests via wasm-pack |
| `just deploy` | Deploy to Cloudflare |

---

### `wrangler.toml` — Cloudflare Workers config

Tells Wrangler how to build and deploy:
- `main = "build/index.js"` — the JS shim that loads the WASM Worker
- `[build] command` — runs `cargo leptos build --release` before deploying
- `[[r2_buckets]]` — binds the `note-tagger-bucket` R2 bucket so server
  functions can access it via `env.bucket("note-tagger-bucket")`

---

### `.cargo/config.toml` — Compiler flags for WASM

```toml
rustflags = [
  "-C", "target-feature=+simd128",
  "--cfg", "getrandom_backend=\"wasm_js\"",
]
```

`+simd128` enables WASM SIMD instructions. Candle (the ML library) uses these
for matrix multiplication — without them, inference falls back to scalar ops
and takes 4–5× longer.

`getrandom_backend="wasm_js"` tells the `getrandom` crate (used internally by
Candle) to use the browser's `crypto.getRandomValues` API instead of
`/dev/urandom`, which doesn't exist in WASM.

---

## How a Full Request Flows (Local Dev)

Here is the sequence from server start to the user seeing their classified note:

```
1. Server start
   main() → register_server_functions() → bind TCP → serve

2. Browser requests /
   Server renders App → NoteTakerComponent
     load_notes() runs server-side → reads /tmp/notes.cbor
     Notes are serialised into the HTML as a <script> tag
   Browser receives complete HTML with notes already in it

3. Browser downloads WASM bundle
   hydrate() is called → Leptos attaches event listeners to existing DOM
   LocalResource fires → bert_classifier_worker() spawns a Web Worker
   Worker calls BertEncoder::load() → model is live (~0.3s)

4. User types a note and clicks Auto-Tag
   classify_note() → tx.send(note_text) into the worker's input channel
   is_classifying = true → button shows "Classifying..."

5. Inside the Web Worker
   encoder.encode(note_text) → 128-dim vector
   classify(vector, label_embeddings) → e.g. NoteTag::Todo
   tx.send("todo") back to the main thread

6. Effect in NoteTakerComponent receives "todo"
   set_pending_tag(Some("todo"))
   set_is_classifying(false) → button returns to "Auto-Tag"
   Tag badge appears next to the Save button

7. User clicks Save Note
   save_action.dispatch(("note text", "todo"))
   HTTP POST to /api/save_note with CBOR body
   Server: reads /tmp/notes.cbor, appends note, writes back
   Returns updated Vec<Note> as CBOR

8. save_action.value() updates
   displayed_notes() returns the new list from the action result
   UI re-renders the notes list with the new note at the bottom
   Textarea clears, pending_tag resets
```

---

## Key Concepts to Understand

**Leptos reactivity** — `signal()` creates a reactive value. Any closure that
reads a signal is automatically re-run when the signal changes. You never call
"re-render" manually; the framework tracks dependencies automatically.

**SSR + Hydration** — The server renders the full page to HTML so the browser
shows something immediately. The WASM bundle then "hydrates" the page by
attaching JS behaviour to the existing DOM nodes. This is why `Resource` (not
`LocalResource`) is used for `load_notes` — it can run on both server and
client, so the initial notes come from the server without a client-side fetch.

**BERT-tiny** — A 2-layer, 128-hidden-dim BERT model. It has only ~4M
parameters vs 110M for the full BERT-base. It understands language well enough
for simple categorisation but is small enough (~32MB) to embed in a WASM binary.

**Zero-shot classification** — No labelled training data was used. Classification
works because semantically similar text produces geometrically close embeddings.
The label phrases act as anchors; any note closer to the "work" anchor than the
others gets tagged Work.
