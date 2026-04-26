use futures::stream::StreamExt;
use leptos_workers::worker;

use crate::ml::{embed, model::BertEncoder};

#[worker(BertClassifierWorker)]
pub async fn bert_classifier_worker(
    rx: leptos_workers::Receiver<String>,
    tx: leptos_workers::Sender<String>,
) {
    let encoder = match BertEncoder::load() {
        Ok(e) => e,
        Err(err) => {
            leptos::logging::error!("BertClassifierWorker: load failed: {err:?}");
            return;
        }
    };

    let label_embeddings = match embed::build_label_embeddings(&encoder) {
        Ok(e) => e,
        Err(err) => {
            leptos::logging::error!(
                "BertClassifierWorker: label embeddings failed: {err:?}"
            );
            return;
        }
    };

    leptos::logging::log!("BertClassifierWorker: ready.");

    let mut stream = rx.into_stream();
    while let Some(note_text) = stream.next().await {
        let tag_str = match encoder.encode(&note_text) {
            Ok(emb) => embed::classify(&emb, &label_embeddings)
                .as_str()
                .to_string(),
            Err(e) => {
                leptos::logging::error!("encode error: {e:?}");
                "personal".to_string()
            }
        };
        let _ = tx.send(tag_str);
    }
}
