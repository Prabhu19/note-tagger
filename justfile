set unstable

default:
  just --list

setup:
  rustup target add wasm32-unknown-unknown
  cargo install cargo-leptos wasm-bindgen-cli worker-build
  cargo update
  just r2 download-weights

dev:
  npx wrangler dev --ip 0.0.0.0 --port 8788

dev-native:
  cargo leptos watch

build:
  cargo leptos build --release

deploy:
  npx wrangler deploy

check features="ssr,cloudflare":
  cargo check --features {{ features }} --target wasm32-unknown-unknown

test-wasm:
  wasm-pack test --headless --firefox

mod r2 "assets"
