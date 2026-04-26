use futures::stream::StreamExt;
use leptos::prelude::*;

use crate::webworker::bert_classifier_worker;
use crate::ml::util::{load_notes, save_note};

#[component]
pub fn NoteTakerComponent() -> impl IntoView {
    let (note_text, set_note_text) = signal(String::new());
    let (pending_tag, set_pending_tag) = signal(Option::<String>::None);
    let (is_classifying, set_is_classifying) = signal(false);
    let (filter_tag, set_filter_tag) = signal(Option::<String>::None);

    // Worker created once — holds the model in memory for the component's lifetime
    let worker_resource = LocalResource::new(move || async move {
        match bert_classifier_worker() {
            Ok((tx, rx)) => Some((tx, rx)),
            Err(e) => {
                leptos::logging::error!("worker init: {e:?}");
                None
            }
        }
    });

    // Drain worker output → set pending_tag
    Effect::new(move || {
        if let Some(Some((_tx, rx))) = worker_resource.get() {
            leptos::task::spawn_local(async move {
                let mut stream = rx.into_stream();
                while let Some(tag) = stream.next().await {
                    set_pending_tag.set(Some(tag));
                    set_is_classifying.set(false);
                }
            });
        }
    });

    // SSR-compatible resource — initial notes arrive in HTML (no spinner)
    let notes_resource = Resource::new(|| (), |_| load_notes());

    // Mutation action — returns updated notes list on success
    let save_action = Action::new(move |(text, tag): &(String, String)| {
        let (text, tag) = (text.clone(), tag.clone());
        async move { save_note(text, tag).await }
    });

    let displayed_notes = move || {
        if let Some(Ok(notes)) = save_action.value().get() {
            return notes;
        }
        notes_resource.get().and_then(|r| r.ok()).unwrap_or_default()
    };

    let filtered_notes = move || {
        let f = filter_tag.get();
        displayed_notes()
            .into_iter()
            .filter(|n| f.as_deref().map_or(true, |t| n.tag.as_str() == t))
            .collect::<Vec<_>>()
    };

    let classify_note = move || {
        let text = note_text.get();
        if text.is_empty() {
            return;
        }
        if let Some(Some((tx, _))) = worker_resource.get() {
            set_is_classifying.set(true);
            set_pending_tag.set(None);
            let _ = tx.send(text);
        }
    };

    let save_note_handler = move || {
        let text = note_text.get();
        let tag = pending_tag.get().unwrap_or_else(|| "personal".to_string());
        if text.is_empty() {
            return;
        }
        save_action.dispatch((text, tag));
        set_note_text.set(String::new());
        set_pending_tag.set(None);
    };

    let tag_labels = ["work", "todo", "idea", "personal"];

    view! {
        <div class="note-taker">
            <h1 class="app-title">"Note Tagger"</h1>

            <div class="input-section">
                <textarea
                    class="note-input"
                    placeholder="Type your note here..."
                    prop:value=move || note_text.get()
                    on:input=move |ev| set_note_text.set(event_target_value(&ev))
                    rows="3"
                />
                <div class="action-row">
                    <button
                        class="classify-button"
                        on:click=move |_| classify_note()
                        disabled=move || is_classifying.get() || note_text.get().is_empty()
                    >
                        {move || if is_classifying.get() { "Classifying..." } else { "Auto-Tag" }}
                    </button>

                    <Show when=move || pending_tag.get().is_some()>
                        <span class=move || {
                            format!(
                                "tag-badge tag-{}",
                                pending_tag.get().unwrap_or_default()
                            )
                        }>
                            {move || pending_tag.get().unwrap_or_default()}
                        </span>
                    </Show>

                    <button
                        class="save-button"
                        on:click=move |_| save_note_handler()
                        disabled=move || note_text.get().is_empty() || save_action.pending().get()
                    >
                        {move || if save_action.pending().get() { "Saving..." } else { "Save Note" }}
                    </button>
                </div>
            </div>

            <div class="filter-row">
                <span class="filter-label">"Filter: "</span>
                {tag_labels.iter().map(|&tag| {
                    let tag = tag.to_string();
                    let tag_c = tag.clone();
                    view! {
                        <button
                            class=move || {
                                let active = filter_tag.get().as_deref() == Some(&tag_c);
                                if active { format!("filter-btn filter-btn--active tag-{}", tag_c) }
                                else { format!("filter-btn tag-{}", tag_c) }
                            }
                            on:click=move |_| {
                                let cur = filter_tag.get();
                                if cur.as_deref() == Some(&tag) {
                                    set_filter_tag.set(None);
                                } else {
                                    set_filter_tag.set(Some(tag.clone()));
                                }
                            }
                        >
                            {tag_c.clone()}
                        </button>
                    }
                }).collect_view()}
                <button
                    class="filter-btn filter-btn--all"
                    on:click=move |_| set_filter_tag.set(None)
                >
                    "All"
                </button>
            </div>

            <div class="notes-list">
                <Suspense fallback=move || view! { <p class="loading">"Loading notes..."</p> }>
                    {move || {
                        let notes = filtered_notes();
                        if notes.is_empty() {
                            view! {
                                <p class="empty-state">"No notes yet. Write one above!"</p>
                            }.into_any()
                        } else {
                            notes.into_iter().map(|note| {
                                view! {
                                    <div class=format!("note-card note-card--{}", note.tag.as_str())>
                                        <span class=format!("tag-badge tag-{}", note.tag.as_str())>
                                            {note.tag.as_str()}
                                        </span>
                                        <p class="note-text">{note.text}</p>
                                    </div>
                                }
                            }).collect_view().into_any()
                        }
                    }}
                </Suspense>
            </div>
        </div>
    }
}
