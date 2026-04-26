# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A single-page note-taking app where a tiny BERT model running in a browser Web Worker auto-tags notes (work / todo / idea / personal) via embedding cosine similarity. Notes are persisted to Cloudflare R2 as CBOR. UI is Leptos 0.8, runtime is Cloudflare Workers, ML is Candle (Rust).

## Commands

```bash
just setup          # install tools (cargo-leptos, wasm-bindgen-cli) + download BERT-tiny weights
just dev            # Cloudflare Workers dev server via wrangler on port 8787
just dev-native     # local Axum dev server via cargo leptos watch (no Cloudflare)
just build          # full release build
just deploy         # deploy to Cloudflare Workers
just test-wasm      # run WASM unit tests with wasm-pack --headless --firefox

# type-check with specific feature combos (the two valid combos are below):
just check features="ssr,cloudflare"
just check features="ssr,nocloudflare"
# client-side check:
cargo check --features hydrate --target wasm32-unknown-unknown
```

Run `just setup` before any build — `include_bytes!` for the BERT model files causes an immediate compile error if `assets/models/bert-tiny/` is missing.

## Feature flags

The codebase compiles to three distinct targets via Cargo features:

| Features | Target | Used by |
|---|---|---|
| `ssr,cloudflare` | WASM (server) | Cloudflare Workers build |
| `ssr,nocloudflare` | native | local Axum dev server |
| `hydrate` | WASM (client) | browser hydration |

Never combine `cloudflare` and `nocloudflare`. These are mutually exclusive storage backends.

## Architecture

**Data flow for saving a note:**
1. User types note → clicks "Auto-Tag" → text sent to `BertClassifierWorker` (Web Worker)
2. Worker runs `BertEncoder::encode()` → 128-dim [CLS] embedding → cosine similarity vs label embeddings → `NoteTag`
3. Tag shown in UI → user clicks "Save Note" → `save_note` server function called
4. Server reads `notes/all.cbor` from R2, appends new `Note`, writes back (read-modify-write)
5. Updated `Vec<Note>` returned → `save_action.value()` drives the displayed list

**ML classification** (`src/ml/`): Zero-shot — no fine-tuning. `build_label_embeddings()` embeds 3 hardcoded phrases per category at worker startup, averages them per category. `classify()` picks the highest cosine similarity. Model weights baked into WASM via `include_bytes!` (~17MB, served from Cloudflare Assets not the 10MB Worker bundle).

**Persistence** (`src/ml/util.rs`): Two backends behind `#[cfg]`:
- `cloudflare`: R2 bucket at key `notes/all.cbor` via `SendWrapper` (R2 `Bucket` is `!Send`)
- `nocloudflare`: `/tmp/notes.cbor` for local dev

**Leptos patterns used:**
- `Resource` for `load_notes` — SSR-compatible, initial data arrives in HTML
- `LocalResource` for the worker — browser-only (`!Send` channels)
- `Action` for `save_note` — mutation; `action.value()` returns updated notes list; `action.pending()` drives button state

## Key gotchas

- **`SystemTime` unavailable on Cloudflare Workers** — use `js_sys::Date::now() as u64` for timestamps, gated behind `#[cfg(feature = "cloudflare")]`.
- **`SendWrapper` required for all R2 `.await` points** — `worker::Bucket` is `!Send`.
- **`tokenizers` must use `features = ["unstable_wasm"]`** — otherwise WASM build fails with a threading linker error (disables Rayon, fine for single-note inference).
- **`+simd128` in `.cargo/config.toml` is required** — without it, Candle scalar fallback takes ~2–5s per note; with SIMD ~500ms.
- **`BertModel::forward` signature** — verify against `candle-transformers 0.10` source before writing `model.rs`; minor versions occasionally shift parameter order or attention mask optionality.
- **`into_any()` in branching view blocks** — when `{move || ...}` branches return different view types (e.g. `<p>` vs list of `<div>`), call `.into_any()` on each branch to unify return type for Leptos.
- **R2 read-modify-write is not atomic** — two concurrent saves will race. Acceptable for single-user; would need ETags for multi-user.
