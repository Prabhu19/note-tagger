use crate::types::{Note, NoteTag};
use leptos::prelude::*;
use leptos::server_fn::codec::Cbor;

#[cfg(all(feature = "ssr", feature = "cloudflare"))]
use send_wrapper::SendWrapper;

pub const NOTES_KEY: &str = "notes/all.cbor";
pub const BUCKET_BINDING: &str = "note-tagger-bucket";

#[server(SaveNote, endpoint = "save_note", output = Cbor)]
pub async fn save_note(text: String, tag: String) -> Result<Vec<Note>, ServerFnError> {
    let note_tag = match tag.as_str() {
        "work"     => NoteTag::Work,
        "todo"     => NoteTag::Todo,
        "idea"     => NoteTag::Idea,
        _          => NoteTag::Personal,
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
        let cbor =
            serde_cbor::to_vec(&notes).map_err(|e| ServerFnError::new(e.to_string()))?;
        SendWrapper::new(r2.put(NOTES_KEY, cbor).execute())
            .await
            .map_err(|e| ServerFnError::new(e.to_string()))?;
        return Ok(notes);
    }

    #[cfg(all(feature = "ssr", feature = "nocloudflare", not(feature = "cloudflare")))]
    {
        let path = std::path::Path::new("/tmp/notes.cbor");
        let mut notes: Vec<Note> = if path.exists() {
            serde_cbor::from_slice(&std::fs::read(path)?)
                .unwrap_or_default()
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
            return Ok(
                serde_cbor::from_slice(&std::fs::read(path)?).unwrap_or_default()
            );
        }
        return Ok(vec![]);
    }

    #[allow(unreachable_code)]
    Ok(vec![])
}

#[cfg(all(feature = "ssr", feature = "cloudflare"))]
async fn read_notes_from_r2(
    r2: &SendWrapper<worker::Bucket>,
) -> Result<Vec<Note>, ServerFnError> {
    let r2c = r2.clone();
    let key = NOTES_KEY.to_string();
    SendWrapper::new(async move {
        let obj = SendWrapper::new((*r2c).get(&key).execute()).await?;
        if let Some(obj) = obj {
            if let Some(body) = obj.body() {
                let bytes = SendWrapper::new(body.bytes()).await?;
                return Ok::<Vec<Note>, worker::Error>(
                    serde_cbor::from_slice(&bytes).unwrap_or_default(),
                );
            }
        }
        Ok(vec![])
    })
    .await
    .map_err(|e| ServerFnError::new(e.to_string()))
}
