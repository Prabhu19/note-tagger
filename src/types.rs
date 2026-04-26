use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
pub enum NoteTag {
    Work,
    Todo,
    Idea,
    Personal,
}

impl NoteTag {
    pub fn as_str(&self) -> &'static str {
        match self {
            NoteTag::Work     => "work",
            NoteTag::Todo     => "todo",
            NoteTag::Idea     => "idea",
            NoteTag::Personal => "personal",
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Note {
    pub id:         u64,
    pub text:       String,
    pub tag:        NoteTag,
    pub created_at: u64,
}
