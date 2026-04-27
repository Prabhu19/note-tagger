use futures::stream::StreamExt;
use leptos_workers::worker;

use crate::ml::{embed, model::BertEncoder};
use crate::types::WorkerInput;

#[worker(BertClassifierWorker)]
pub async fn bert_classifier_worker(
    rx: leptos_workers::Receiver<WorkerInput>,
    tx: leptos_workers::Sender<String>,
) {
    let encoder = match BertEncoder::load().await {
        Ok(e) => e,
        Err(err) => {
            leptos::logging::error!("BertClassifierWorker: load failed: {err:?}");
            return;
        }
    };

    let mut custom_categories: Vec<(String, Vec<String>)> = vec![];
    let mut label_embeddings = match embed::build_label_embeddings(&encoder, &custom_categories) {
        Ok(e) => e,
        Err(err) => {
            leptos::logging::error!("BertClassifierWorker: label embeddings failed: {err:?}");
            return;
        }
    };

    leptos::logging::log!("BertClassifierWorker: ready.");

    let mut stream = rx.into_stream();
    while let Some(msg) = stream.next().await {
        match msg {
            WorkerInput::Classify(text) => {
                let tag = match encoder.encode(&text) {
                    Ok(emb) => embed::classify(&emb, &label_embeddings),
                    Err(e) => {
                        leptos::logging::error!("encode error: {e:?}");
                        "personal".to_string()
                    }
                };
                let _ = tx.send(tag);
            }
            WorkerInput::UpdateCategories(cats) => {
                custom_categories = cats;
                match embed::build_label_embeddings(&encoder, &custom_categories) {
                    Ok(e) => {
                        label_embeddings = e;
                        leptos::logging::log!("BertClassifierWorker: categories updated.");
                    }
                    Err(e) => {
                        leptos::logging::error!("BertClassifierWorker: rebuild failed: {e:?}");
                    }
                }
            }
        }
    }
}
