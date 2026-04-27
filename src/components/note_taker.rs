use futures::stream::StreamExt;
use leptos::prelude::*;

use crate::types::{Note, WorkerInput};
use crate::webworker::bert_classifier_worker;
use crate::ml::util::{delete_note, load_categories, load_notes, save_category, save_note};

/// Deterministic hue from a tag name so every custom tag gets a consistent colour.
fn tag_hue(name: &str) -> u32 {
    name.bytes().fold(5381u32, |h, b| h.wrapping_mul(33).wrapping_add(b as u32)) % 360
}

fn tag_color(name: &str) -> String {
    format!("hsl({}, 60%, 40%)", tag_hue(name))
}

const BUILTIN_TAGS: &[&str] = &["work", "todo", "idea", "personal"];

#[component]
pub fn NoteTakerComponent() -> impl IntoView {
    let (note_text, set_note_text)     = signal(String::new());
    let (pending_tag, set_pending_tag) = signal(Option::<String>::None);
    let (is_classifying, set_is_classifying) = signal(false);
    let (filter_tag, set_filter_tag)   = signal(Option::<String>::None);
    let (show_add_tag, set_show_add_tag) = signal(false);
    let (new_tag_name, set_new_tag_name) = signal(String::new());
    let (new_tag_p1, set_new_tag_p1)   = signal(String::new());
    let (new_tag_p2, set_new_tag_p2)   = signal(String::new());
    let (new_tag_p3, set_new_tag_p3)   = signal(String::new());

    // Worker: holds the BERT model for the component lifetime
    let worker_resource = LocalResource::new(move || async move {
        match bert_classifier_worker() {
            Ok((tx, rx)) => Some((tx, rx)),
            Err(e) => { leptos::logging::error!("worker init: {e:?}"); None }
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

    // Load custom categories from the server
    let categories_resource = Resource::new(|| (), |_| load_categories());

    // When both the worker and categories are ready, push categories into the worker
    Effect::new(move || {
        let cats = categories_resource.get().and_then(|r| r.ok()).unwrap_or_default();
        if let Some(Some((tx, _))) = worker_resource.get() {
            let _ = tx.send(WorkerInput::UpdateCategories(cats));
        }
    });

    let notes_resource = Resource::new(|| (), |_| load_notes());

    let save_action = Action::new(move |(text, tag): &(String, String)| {
        let (text, tag) = (text.clone(), tag.clone());
        async move { save_note(text, tag).await }
    });

    let delete_action = Action::new(move |id: &u64| {
        let id = *id;
        async move { delete_note(id).await }
    });

    let save_category_action = Action::new(
        move |(name, phrases): &(String, Vec<String>)| {
            let (name, phrases) = (name.clone(), phrases.clone());
            async move { save_category(name, phrases).await }
        },
    );

    // When a new category is saved, push the updated list into the worker
    Effect::new(move || {
        if let Some(Ok(cats)) = save_category_action.value().get() {
            if let Some(Some((tx, _))) = worker_resource.get() {
                let _ = tx.send(WorkerInput::UpdateCategories(cats));
            }
        }
    });

    // Single source of truth for the displayed notes list.
    // Effects drive it from the resource (initial load) and action results (mutations).
    let notes_list = RwSignal::new(Vec::<Note>::new());

    Effect::new(move || {
        if let Some(Ok(notes)) = notes_resource.get() {
            notes_list.set(notes);
        }
    });
    Effect::new(move || {
        if let Some(Ok(notes)) = save_action.value().get() {
            notes_list.set(notes);
        }
    });
    Effect::new(move || {
        if let Some(Ok(notes)) = delete_action.value().get() {
            notes_list.set(notes);
        }
    });

    // All tags: builtins + any saved custom tags
    let all_tags = move || {
        let mut tags: Vec<String> = BUILTIN_TAGS.iter().map(|s| s.to_string()).collect();
        let custom: Vec<String> = save_category_action
            .value()
            .get()
            .and_then(|r| r.ok())
            .or_else(|| categories_resource.get().and_then(|r| r.ok()))
            .unwrap_or_default()
            .into_iter()
            .map(|(name, _)| name)
            .collect();
        for c in custom {
            if !tags.contains(&c) { tags.push(c); }
        }
        tags
    };

    let filtered_notes = move || {
        let f = filter_tag.get();
        notes_list.get()
            .into_iter()
            .filter(|n| f.as_deref().map_or(true, |t| n.tag.as_str() == t))
            .collect::<Vec<_>>()
    };

    let classify_note = move || {
        let text = note_text.get();
        if text.is_empty() { return; }
        if let Some(Some((tx, _))) = worker_resource.get() {
            set_is_classifying.set(true);
            set_pending_tag.set(None);
            let _ = tx.send(WorkerInput::Classify(text));
        }
    };

    let save_note_handler = move || {
        let text = note_text.get();
        let tag = pending_tag.get().unwrap_or_else(|| "personal".to_string());
        if text.is_empty() { return; }
        save_action.dispatch((text, tag));
        set_note_text.set(String::new());
        set_pending_tag.set(None);
    };

    let add_tag_handler = move || {
        let name = new_tag_name.get().trim().to_lowercase();
        if name.is_empty() { return; }
        let phrases: Vec<String> = [new_tag_p1.get(), new_tag_p2.get(), new_tag_p3.get()]
            .into_iter()
            .map(|s| s.trim().to_string())
            .filter(|s| !s.is_empty())
            .collect();
        if phrases.is_empty() { return; }
        save_category_action.dispatch((name.clone(), phrases));
        set_new_tag_name.set(String::new());
        set_new_tag_p1.set(String::new());
        set_new_tag_p2.set(String::new());
        set_new_tag_p3.set(String::new());
        set_show_add_tag.set(false);
    };

    view! {
        <div class="note-taker">
            <h1 class="app-title">"Note Tagger"</h1>

            // ── Input ──────────────────────────────────────────────────────
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
                        {move || {
                            let tag = pending_tag.get().unwrap_or_default();
                            let is_custom = !BUILTIN_TAGS.contains(&tag.as_str());
                            let style = if is_custom {
                                format!("background:{}", tag_color(&tag))
                            } else {
                                String::new()
                            };
                            view! {
                                <span
                                    class=format!("tag-badge tag-{}", tag)
                                    style=style
                                >
                                    {tag.clone()}
                                </span>
                            }
                        }}
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

            // ── Filter row ─────────────────────────────────────────────────
            <div class="filter-row">
                <span class="filter-label">"Filter: "</span>
                {move || all_tags().into_iter().map(|tag| {
                    let is_custom = !BUILTIN_TAGS.contains(&tag.as_str());
                    let tag1 = tag.clone();
                    let tag2 = tag.clone();
                    let tag3 = tag.clone();
                    view! {
                        <button
                            class=move || {
                                let active = filter_tag.get().as_deref() == Some(&tag1);
                                if active { format!("filter-btn filter-btn--active tag-{}", tag1) }
                                else      { format!("filter-btn tag-{}", tag1) }
                            }
                            style=move || {
                                if is_custom && filter_tag.get().as_deref() == Some(&tag2) {
                                    format!("background:{};color:#fff", tag_color(&tag2))
                                } else if is_custom {
                                    format!("border:1px solid {};color:{}", tag_color(&tag2), tag_color(&tag2))
                                } else {
                                    String::new()
                                }
                            }
                            on:click=move |_| {
                                let cur = filter_tag.get();
                                if cur.as_deref() == Some(&tag3) {
                                    set_filter_tag.set(None);
                                } else {
                                    set_filter_tag.set(Some(tag3.clone()));
                                }
                            }
                        >
                            {tag.clone()}
                        </button>
                    }
                }).collect_view()}
                <button class="filter-btn filter-btn--all" on:click=move |_| set_filter_tag.set(None)>
                    "All"
                </button>
                <button
                    class="add-tag-toggle"
                    on:click=move |_| set_show_add_tag.update(|v| *v = !*v)
                >
                    {move || if show_add_tag.get() { "✕ Cancel" } else { "+ Add Tag" }}
                </button>
            </div>

            // ── Add tag form ───────────────────────────────────────────────
            <Show when=move || show_add_tag.get()>
                <div class="add-tag-form">
                    <p class="add-tag-hint">
                        "Name the tag and give 1–3 example phrases that describe it.
                         The model uses these to learn the category."
                    </p>
                    <div class="add-tag-fields">
                        <input
                            class="tag-name-input"
                            placeholder="Tag name (e.g. health)"
                            prop:value=move || new_tag_name.get()
                            on:input=move |ev| set_new_tag_name.set(event_target_value(&ev))
                        />
                        <input
                            class="phrase-input"
                            placeholder="Example phrase 1"
                            prop:value=move || new_tag_p1.get()
                            on:input=move |ev| set_new_tag_p1.set(event_target_value(&ev))
                        />
                        <input
                            class="phrase-input"
                            placeholder="Example phrase 2 (optional)"
                            prop:value=move || new_tag_p2.get()
                            on:input=move |ev| set_new_tag_p2.set(event_target_value(&ev))
                        />
                        <input
                            class="phrase-input"
                            placeholder="Example phrase 3 (optional)"
                            prop:value=move || new_tag_p3.get()
                            on:input=move |ev| set_new_tag_p3.set(event_target_value(&ev))
                        />
                        <button
                            class="save-tag-btn"
                            on:click=move |_| add_tag_handler()
                            disabled=move || {
                                new_tag_name.get().trim().is_empty()
                                    || new_tag_p1.get().trim().is_empty()
                                    || save_category_action.pending().get()
                            }
                        >
                            {move || if save_category_action.pending().get() { "Saving..." } else { "Save Tag" }}
                        </button>
                    </div>
                </div>
            </Show>

            // ── Notes list ─────────────────────────────────────────────────
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
                                let note_id  = note.id;
                                let tag_name = note.tag.as_str().to_string();
                                let is_custom = !BUILTIN_TAGS.contains(&tag_name.as_str());
                                let badge_style = if is_custom {
                                    format!("background:{}", tag_color(&tag_name))
                                } else {
                                    String::new()
                                };
                                let card_style = if is_custom {
                                    format!("border-left-color:{}", tag_color(&tag_name))
                                } else {
                                    String::new()
                                };
                                let card_class  = format!("note-card note-card--{}", tag_name);
                                let badge_class = format!("tag-badge tag-{}", tag_name);
                                view! {
                                    <div
                                        class=card_class
                                        style=card_style
                                    >
                                        <div class="note-card-header">
                                            <span
                                                class=badge_class
                                                style=badge_style
                                            >
                                                {tag_name}
                                            </span>
                                            <button
                                                class="delete-btn"
                                                on:click=move |_| { delete_action.dispatch(note_id); }
                                                disabled=move || delete_action.pending().get()
                                            >
                                                "✕"
                                            </button>
                                        </div>
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
