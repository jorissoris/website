use crate::auth::login;
use crate::state::AppState;
use axum::routing::post;
use axum::Router;
use memory_serve::{load_assets, MemoryServe};
use tower_http::trace;
use tower_http::trace::TraceLayer;
use tracing::Level;

pub fn create_router(state: AppState) -> Router {
    let memory_router = MemoryServe::new(load_assets!("../frontend/dist"))
        .index_file(None)
        .into_router();

    Router::new()
        .merge(memory_router)
        .nest("/api", api_router())
        .layer(
            TraceLayer::new_for_http()
                .make_span_with(trace::DefaultMakeSpan::new().level(Level::TRACE))
                .on_response(trace::DefaultOnResponse::new().level(Level::TRACE)),
        )
        .with_state(state)
}

fn api_router() -> Router<AppState> {
    Router::new().route("/login", post(login))
}
