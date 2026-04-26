use super::model::BertEncoder;
use crate::types::NoteTag;
use anyhow::Result;

pub const LABEL_PHRASES: &[(&str, NoteTag)] = &[
    ("meeting with team", NoteTag::Work),
    ("project deadline approaching", NoteTag::Work),
    ("client call scheduled", NoteTag::Work),
    ("finish this task", NoteTag::Todo),
    ("remember to buy groceries", NoteTag::Todo),
    ("action item for tomorrow", NoteTag::Todo),
    ("new feature concept", NoteTag::Idea),
    ("creative project inspiration", NoteTag::Idea),
    ("what if we tried this", NoteTag::Idea),
    ("weekend with family", NoteTag::Personal),
    ("feeling good today", NoteTag::Personal),
    ("personal diary entry", NoteTag::Personal),
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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn work_phrase_classifies_as_work() {
        let encoder = BertEncoder::load().expect("load failed");
        let label_embeddings =
            build_label_embeddings(&encoder).expect("labels failed");
        let emb = encoder.encode("meeting with team").expect("encode failed");
        let tag = classify(&emb, &label_embeddings);
        assert_eq!(tag, NoteTag::Work);
    }
}
