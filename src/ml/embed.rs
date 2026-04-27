use super::model::BertEncoder;
use crate::types::NoteTag;
use anyhow::Result;

pub const LABEL_PHRASES: &[(&str, NoteTag)] = &[
    ("meeting with the team at work", NoteTag::Work),
    ("deploy service to production environment", NoteTag::Work),
    ("code review and engineering task", NoteTag::Work),
    ("client presentation or technical discussion", NoteTag::Work),
    ("infrastructure setup and deployment", NoteTag::Work),
    ("attend the standup meeting today", NoteTag::Todo),
    ("need to finish this task before deadline", NoteTag::Todo),
    ("remember to send the report", NoteTag::Todo),
    ("pick up groceries on the way home", NoteTag::Todo),
    ("schedule a call with the team", NoteTag::Todo),
    ("new product or feature concept", NoteTag::Idea),
    ("what if we built something like this", NoteTag::Idea),
    ("creative project inspiration and brainstorm", NoteTag::Idea),
    ("startup idea worth exploring", NoteTag::Idea),
    ("weekend trip with family and friends", NoteTag::Personal),
    ("personal journal about feelings and life", NoteTag::Personal),
    ("birthday celebration or social event", NoteTag::Personal),
    ("had a good day feeling happy", NoteTag::Personal),
];

pub fn cosine_similarity(a: &[f32], b: &[f32]) -> f32 {
    let dot: f32 = a.iter().zip(b).map(|(x, y)| x * y).sum();
    let norm_a: f32 = a.iter().map(|x| x * x).sum::<f32>().sqrt();
    let norm_b: f32 = b.iter().map(|x| x * x).sum::<f32>().sqrt();
    if norm_a == 0.0 || norm_b == 0.0 {
        0.0
    } else {
        dot / (norm_a * norm_b)
    }
}

/// Encodes all label phrases and averages embeddings per category.
pub fn build_label_embeddings(encoder: &BertEncoder) -> Result<Vec<(NoteTag, Vec<f32>)>> {
    let mut buckets: std::collections::HashMap<&str, Vec<Vec<f32>>> =
        Default::default();
    for (phrase, tag) in LABEL_PHRASES {
        buckets
            .entry(tag.as_str())
            .or_default()
            .push(encoder.encode(phrase)?);
    }
    let tags = [NoteTag::Work, NoteTag::Todo, NoteTag::Idea, NoteTag::Personal];
    tags.into_iter()
        .map(|tag| {
            let vecs = &buckets[tag.as_str()];
            let len = vecs[0].len();
            let mean: Vec<f32> = (0..len)
                .map(|i| vecs.iter().map(|v| v[i]).sum::<f32>() / vecs.len() as f32)
                .collect();
            Ok((tag, mean))
        })
        .collect()
}

/// Classifies a note embedding by highest cosine similarity to label embeddings.
pub fn classify(note_emb: &[f32], label_embeddings: &[(NoteTag, Vec<f32>)]) -> NoteTag {
    label_embeddings
        .iter()
        .map(|(tag, emb)| (tag, cosine_similarity(note_emb, emb)))
        .max_by(|(_, a), (_, b)| a.total_cmp(b))
        .map(|(tag, _)| tag.clone())
        .unwrap_or(NoteTag::Personal)
}
