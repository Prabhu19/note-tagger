use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
pub enum NoteTag {
    Work,
    Todo,
    Idea,
    Personal,
    Custom(String),
}

impl NoteTag {
    pub fn as_str(&self) -> &str {
        match self {
            NoteTag::Work        => "work",
            NoteTag::Todo        => "todo",
            NoteTag::Idea        => "idea",
            NoteTag::Personal    => "personal",
            NoteTag::Custom(s)   => s.as_str(),
        }
    }
}

/// Message sent from the UI to the background Web Worker.
#[derive(Clone, Serialize, Deserialize)]
pub enum WorkerInput {
    Classify(String),
    UpdateCategories(Vec<(String, Vec<String>)>),
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Note {
    pub id:         u64,
    pub text:       String,
    pub tag:        NoteTag,
    pub created_at: u64,
}
