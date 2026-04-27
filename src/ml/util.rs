use crate::types::Note;
#[cfg(feature = "ssr")]
use crate::types::NoteTag;
use leptos::prelude::*;
use leptos::server_fn::codec::Cbor;

#[cfg(all(feature = "ssr", feature = "cloudflare"))]
use send_wrapper::SendWrapper;

pub const NOTES_KEY: &str = "notes/all.cbor";
pub const CATEGORIES_KEY: &str = "categories/custom.cbor";
pub const BUCKET_BINDING: &str = "note-tagger-bucket";

// ── Notes ────────────────────────────────────────────────────────────────────

#[server(SaveNote, endpoint = "save_note", output = Cbor)]
pub async fn save_note(text: String, tag: String) -> Result<Vec<Note>, ServerFnError> {
    let note_tag = match tag.as_str() {
        "work"     => NoteTag::Work,
        "todo"     => NoteTag::Todo,
        "idea"     => NoteTag::Idea,
        "personal" => NoteTag::Personal,
        other      => NoteTag::Custom(other.to_string()),
    };

    #[cfg(feature = "cloudflare")]
    let id = js_sys::Date::now() as u64;
    #[cfg(not(feature = "cloudflare"))]
    let id = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .unwrap_or_default()
        .as_millis() as u64;

    let new_note = Note { id, text, tag: note_tag, created_at: id };

    #[cfg(all(feature = "ssr", feature = "cloudflare", not(feature = "nocloudflare")))]
    {
        use axum::Extension;
        use std::sync::Arc;
        use worker::Env;
        let Extension::<Arc<Env>>(env) = leptos_axum::extract().await?;
        let bucket = env
            .bucket(BUCKET_BINDING)
            .map_err(|e| ServerFnError::new(e.to_string()))?;
        let r2 = SendWrapper::new(bucket);
        let mut notes = read_notes_from_r2(&r2).await?;
        notes.push(new_note);
        let cbor = serde_cbor::to_vec(&notes).map_err(|e| ServerFnError::new(e.to_string()))?;
        SendWrapper::new(r2.put(NOTES_KEY, cbor).execute())
            .await
            .map_err(|e| ServerFnError::new(e.to_string()))?;
        return Ok(notes);
    }

    #[cfg(all(feature = "ssr", feature = "nocloudflare", not(feature = "cloudflare")))]
    {
        let path = std::path::Path::new("/tmp/notes.cbor");
        let mut notes: Vec<Note> = if path.exists() {
            serde_cbor::from_slice(&std::fs::read(path)?).unwrap_or_default()
        } else {
            vec![]
        };
        notes.push(new_note);
        std::fs::write(
            path,
            serde_cbor::to_vec(&notes).map_err(|e| ServerFnError::new(e.to_string()))?,
        )?;
        return Ok(notes);
    }

    #[allow(unreachable_code)]
    Err(ServerFnError::new("No storage backend"))
}

#[server(DeleteNote, endpoint = "delete_note", output = Cbor)]
pub async fn delete_note(id: u64) -> Result<Vec<Note>, ServerFnError> {
    #[cfg(all(feature = "ssr", feature = "cloudflare", not(feature = "nocloudflare")))]
    {
        use axum::Extension;
        use std::sync::Arc;
        use worker::Env;
        let Extension::<Arc<Env>>(env) = leptos_axum::extract().await?;
        let bucket = env
            .bucket(BUCKET_BINDING)
            .map_err(|e| ServerFnError::new(e.to_string()))?;
        let r2 = SendWrapper::new(bucket);
        let mut notes = read_notes_from_r2(&r2).await?;
        notes.retain(|n| n.id != id);
        let cbor = serde_cbor::to_vec(&notes).map_err(|e| ServerFnError::new(e.to_string()))?;
        SendWrapper::new(r2.put(NOTES_KEY, cbor).execute())
            .await
            .map_err(|e| ServerFnError::new(e.to_string()))?;
        return Ok(notes);
    }

    #[cfg(all(feature = "ssr", feature = "nocloudflare", not(feature = "cloudflare")))]
    {
        let path = std::path::Path::new("/tmp/notes.cbor");
        let mut notes: Vec<Note> = if path.exists() {
            serde_cbor::from_slice(&std::fs::read(path)?).unwrap_or_default()
        } else {
            vec![]
        };
        notes.retain(|n| n.id != id);
        std::fs::write(
            path,
            serde_cbor::to_vec(&notes).map_err(|e| ServerFnError::new(e.to_string()))?,
        )?;
        return Ok(notes);
    }

    #[allow(unreachable_code)]
    Err(ServerFnError::new("No storage backend"))
}

#[server(LoadNotes, endpoint = "load_notes", output = Cbor)]
pub async fn load_notes() -> Result<Vec<Note>, ServerFnError> {
    #[cfg(all(feature = "ssr", feature = "cloudflare", not(feature = "nocloudflare")))]
    {
        use axum::Extension;
        use std::sync::Arc;
        use worker::Env;
        let Extension::<Arc<Env>>(env) = leptos_axum::extract().await?;
        let bucket = env
            .bucket(BUCKET_BINDING)
            .map_err(|e| ServerFnError::new(e.to_string()))?;
        return read_notes_from_r2(&SendWrapper::new(bucket)).await;
    }

    #[cfg(all(feature = "ssr", feature = "nocloudflare", not(feature = "cloudflare")))]
    {
        let path = std::path::Path::new("/tmp/notes.cbor");
        if path.exists() {
            return Ok(serde_cbor::from_slice(&std::fs::read(path)?).unwrap_or_default());
        }
        return Ok(vec![]);
    }

    #[allow(unreachable_code)]
    Ok(vec![])
}

// ── Custom categories ─────────────────────────────────────────────────────────

/// Upserts a custom category (name, phrases). Returns the full updated list.
#[server(SaveCategory, endpoint = "save_category", output = Cbor)]
pub async fn save_category(
    name: String,
    phrases: Vec<String>,
) -> Result<Vec<(String, Vec<String>)>, ServerFnError> {
    #[cfg(all(feature = "ssr", feature = "cloudflare", not(feature = "nocloudflare")))]
    {
        use axum::Extension;
        use std::sync::Arc;
        use worker::Env;
        let Extension::<Arc<Env>>(env) = leptos_axum::extract().await?;
        let bucket = env
            .bucket(BUCKET_BINDING)
            .map_err(|e| ServerFnError::new(e.to_string()))?;
        let r2 = SendWrapper::new(bucket);
        let mut cats = read_categories_from_r2(&r2).await?;
        if let Some(existing) = cats.iter_mut().find(|(n, _)| n == &name) {
            existing.1 = phrases;
        } else {
            cats.push((name, phrases));
        }
        let cbor = serde_cbor::to_vec(&cats).map_err(|e| ServerFnError::new(e.to_string()))?;
        SendWrapper::new(r2.put(CATEGORIES_KEY, cbor).execute())
            .await
            .map_err(|e| ServerFnError::new(e.to_string()))?;
        return Ok(cats);
    }

    #[cfg(all(feature = "ssr", feature = "nocloudflare", not(feature = "cloudflare")))]
    {
        let path = std::path::Path::new("/tmp/categories.cbor");
        let mut cats: Vec<(String, Vec<String>)> = if path.exists() {
            serde_cbor::from_slice(&std::fs::read(path)?).unwrap_or_default()
        } else {
            vec![]
        };
        if let Some(existing) = cats.iter_mut().find(|(n, _)| n == &name) {
            existing.1 = phrases;
        } else {
            cats.push((name, phrases));
        }
        std::fs::write(
            path,
            serde_cbor::to_vec(&cats).map_err(|e| ServerFnError::new(e.to_string()))?,
        )?;
        return Ok(cats);
    }

    #[allow(unreachable_code)]
    Err(ServerFnError::new("No storage backend"))
}

#[server(LoadCategories, endpoint = "load_categories", output = Cbor)]
pub async fn load_categories() -> Result<Vec<(String, Vec<String>)>, ServerFnError> {
    #[cfg(all(feature = "ssr", feature = "cloudflare", not(feature = "nocloudflare")))]
    {
        use axum::Extension;
        use std::sync::Arc;
        use worker::Env;
        let Extension::<Arc<Env>>(env) = leptos_axum::extract().await?;
        let bucket = env
            .bucket(BUCKET_BINDING)
            .map_err(|e| ServerFnError::new(e.to_string()))?;
        return read_categories_from_r2(&SendWrapper::new(bucket)).await;
    }

    #[cfg(all(feature = "ssr", feature = "nocloudflare", not(feature = "cloudflare")))]
    {
        let path = std::path::Path::new("/tmp/categories.cbor");
        if path.exists() {
            return Ok(serde_cbor::from_slice(&std::fs::read(path)?).unwrap_or_default());
        }
        return Ok(vec![]);
    }

    #[allow(unreachable_code)]
    Ok(vec![])
}

// ── R2 helpers ────────────────────────────────────────────────────────────────

#[cfg(all(feature = "ssr", feature = "cloudflare"))]
async fn read_r2_cbor<T: serde::de::DeserializeOwned>(
    r2: &SendWrapper<worker::Bucket>,
    key: &str,
) -> Result<T, ServerFnError>
where
    T: Default,
{
    let r2c = r2.clone();
    let key = key.to_string();
    SendWrapper::new(async move {
        let obj = SendWrapper::new((*r2c).get(&key).execute()).await?;
        if let Some(obj) = obj {
            if let Some(body) = obj.body() {
                let bytes = SendWrapper::new(body.bytes()).await?;
                return Ok::<T, worker::Error>(
                    serde_cbor::from_slice(&bytes).unwrap_or_default(),
                );
            }
        }
        Ok(T::default())
    })
    .await
    .map_err(|e| ServerFnError::new(e.to_string()))
}

#[cfg(all(feature = "ssr", feature = "cloudflare"))]
async fn read_notes_from_r2(
    r2: &SendWrapper<worker::Bucket>,
) -> Result<Vec<Note>, ServerFnError> {
    read_r2_cbor(r2, NOTES_KEY).await
}

#[cfg(all(feature = "ssr", feature = "cloudflare"))]
async fn read_categories_from_r2(
    r2: &SendWrapper<worker::Bucket>,
) -> Result<Vec<(String, Vec<String>)>, ServerFnError> {
    read_r2_cbor(r2, CATEGORIES_KEY).await
}
