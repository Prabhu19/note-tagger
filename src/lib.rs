#[cfg(all(feature = "ssr", feature = "cloudflare"))]
use worker::*;

pub mod app;
pub mod components;
pub mod ml;
pub mod types;
pub mod webworker;

#[cfg(feature = "ssr")]
pub fn register_server_functions() {
    use leptos::server_fn::axum::register_explicit;
    register_explicit::<ml::util::SaveNote>();
    register_explicit::<ml::util::LoadNotes>();
    register_explicit::<ml::util::DeleteNote>();
    register_explicit::<ml::util::SaveCategory>();
    register_explicit::<ml::util::LoadCategories>();
}

#[cfg(all(feature = "ssr", feature = "cloudflare"))]
async fn router(env: Env) -> axum::Router {
    use axum::{Extension, Router};
    use crate::app::{App, shell};
    use leptos::prelude::*;
    use leptos_axum::{generate_route_list, LeptosRoutes};
    use std::sync::Arc;

    // get_configuration() reads env vars at runtime, which aren't set in a WASM Worker.
    // Hardcode the values that cargo-leptos would normally provide.
    let leptos_options = LeptosOptions::builder()
        .output_name("note-tagger")
        .build();
    let routes = generate_route_list(App);
    register_server_functions();

    Router::new()
        .leptos_routes(&leptos_options, routes, {
            let leptos_options = leptos_options.clone();
            move || shell(leptos_options.clone())
        })
        .with_state(leptos_options)
        .layer(Extension(Arc::new(env)))
}

#[cfg(all(feature = "ssr", feature = "cloudflare"))]
#[event(fetch)]
async fn fetch(
    req: HttpRequest,
    env: Env,
    _ctx: Context,
) -> Result<axum::http::Response<axum::body::Body>> {
    use tower_service::Service;
    Ok(router(env).await.call(req).await?)
}

#[cfg(feature = "hydrate")]
#[wasm_bindgen::prelude::wasm_bindgen]
pub fn hydrate() {
    use crate::app::App;
    leptos::mount::hydrate_body(App);
}
