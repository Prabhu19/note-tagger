# Note Tagger

A single-page note-taking app that auto-tags your notes using a tiny BERT model running entirely in your browser. No cloud ML API — the model runs locally in a Web Worker via WebAssembly.

## What it does

- Type a note, click **Auto-Tag** — a tiny BERT model classifies it as `work`, `todo`, `idea`, or `personal`
- Click **Save Note** to persist it
- Filter notes by tag, or delete individual notes
- Notes survive page reloads (stored in Cloudflare R2 as CBOR)

## How it works

```
User types note
  → Auto-Tag → BertClassifierWorker (Web Worker, WASM)
      → BertEncoder::encode() → 128-dim [CLS] embedding
      → cosine similarity vs label embeddings → NoteTag
  ← tag shown in UI
User clicks Save Note
  → save_note() server function (Cloudflare Worker)
      → reads notes/all.cbor from R2, appends, writes back
  ← updated list returned and displayed
```

**ML classification** is zero-shot — no fine-tuning. At worker startup, 3 phrases per category are embedded and averaged. Each new note embedding is compared by cosine similarity against those category centroids, and the closest one wins.

**Stack:**
- UI: [Leptos](https://leptos.dev) 0.8 (Rust/WASM, SSR + hydration)
- Runtime: [Cloudflare Workers](https://workers.cloudflare.com) (WASM)
- ML: [Candle](https://github.com/huggingface/candle) (Rust ML) + BERT-tiny
- Storage: Cloudflare R2 (CBOR-encoded note list)
- Model weights: Cloudflare Assets (~16 MB F16 safetensors, fetched at runtime)

## Setup

```bash
just setup     # install toolchain + download BERT-tiny weights
```

Requires: Rust, Node.js (for wrangler), Python 3 + `safetensors` + `numpy` (for F16 weight conversion).

## Running locally

```bash
just dev           # Cloudflare Workers dev server (wrangler) on port 8788
just dev-native    # Native Axum dev server (no Cloudflare), faster iteration
```

## Building & deploying

```bash
just build     # release build
just deploy    # deploy to Cloudflare Workers
```

## Feature flags

| Features | Target | Used by |
|---|---|---|
| `ssr,cloudflare` | WASM (server) | Cloudflare Workers |
| `ssr,nocloudflare` | native | local Axum dev server |
| `hydrate` | WASM (client) | browser hydration |

```bash
just check features="ssr,cloudflare"      # type-check for CF Workers
just check features="ssr,nocloudflare"    # type-check for native
cargo check --features hydrate --target wasm32-unknown-unknown  # client
```

## Project structure

```
src/
  app.rs           # Leptos app shell + routes
  lib.rs           # CF Workers entry point (#[event(fetch)]), server fn registration
  main.rs          # native Axum dev server entry point
  types.rs         # Note, NoteTag types
  webworker.rs     # BertClassifierWorker (leptos_workers)
  components/
    note_taker.rs  # main UI component
  ml/
    model.rs       # BertEncoder (load + encode)
    embed.rs       # label embeddings + classify()
    util.rs        # save_note / load_notes / delete_note server functions
assets/
  models/bert-tiny/   # model weights (downloaded by just setup, not in git)
style/main.css
wrangler.toml
justfile
```
