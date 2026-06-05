use axum::{
    extract::{
        ws::{Message, WebSocket, WebSocketUpgrade},
        Path, State,
    },
    response::IntoResponse,
    routing::get,
    Router,
};
use futures_util::{SinkExt, StreamExt};
use serde::{Deserialize, Serialize};
use std::{
    collections::HashMap,
    sync::{Arc, Mutex},
};
use tower_http::cors::{Any, CorsLayer};

#[derive(Clone, Serialize, Deserialize, Debug)]
struct CollaborationEvent {
    #[serde(rename = "type")]
    event_type: String,
    userId: String,
    #[serde(default)]
    x: f64,
    #[serde(default)]
    y: f64,
    #[serde(default)]
    payload: serde_json::Value,
    lamport: u64,
}

type RoomMap = Arc<Mutex<HashMap<String, Vec<tokio::sync::mpsc::UnboundedSender<String>>>>>;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    let rooms: RoomMap = Arc::new(Mutex::new(HashMap::new()));

    let app = Router::new()
        .route("/session/:session_id", get(ws_handler))
        .layer(
            CorsLayer::new()
                .allow_origin(Any)
                .allow_methods(Any)
                .allow_headers(Any),
        )
        .with_state(rooms);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8787")
        .await
        .expect("bind failed");
    tracing::info!("Consequence WebSocket server listening on :8787");
    axum::serve(listener, app).await.expect("server failed");
}

async fn ws_handler(
    ws: WebSocketUpgrade,
    Path(session_id): Path<String>,
    State(rooms): State<RoomMap>,
) -> impl IntoResponse {
    ws.on_upgrade(move |socket| handle_socket(socket, session_id, rooms))
}

async fn handle_socket(socket: WebSocket, session_id: String, rooms: RoomMap) {
    let (mut sender, mut receiver) = socket.split();
    let (tx, mut rx) = tokio::sync::mpsc::unbounded_channel::<String>();

    {
        let mut map = rooms.lock().expect("room lock");
        map.entry(session_id.clone())
            .or_default()
            .push(tx.clone());
    }

    let rooms_fwd = rooms.clone();
    let session_fwd = session_id.clone();
    let forward = tokio::spawn(async move {
        while let Some(msg) = rx.recv().await {
            if sender.send(Message::Text(msg)).await.is_err() {
                break;
            }
        }
    });

    while let Some(Ok(msg)) = receiver.next().await {
        if let Message::Text(text) = msg {
            if let Ok(event) = serde_json::from_str::<CollaborationEvent>(&text) {
                broadcast(&rooms_fwd, &session_fwd, &text, &event.userId);
            }
        }
    }

    {
        let mut map = rooms.lock().expect("room lock");
        if let Some(subs) = map.get_mut(&session_id) {
            subs.retain(|s| !s.is_closed());
            if subs.is_empty() {
                map.remove(&session_id);
            }
        }
    }

    forward.abort();
}

fn broadcast(rooms: &RoomMap, session_id: &str, text: &str, sender_id: &str) {
    let map = rooms.lock().expect("room lock");
    if let Some(subs) = map.get(session_id) {
        for sub in subs {
            let _ = sub.send(text.to_string());
            let _ = sender_id;
        }
    }
}
