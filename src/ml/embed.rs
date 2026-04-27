use std::collections::HashMap;
use super::model::BertEncoder;
use anyhow::Result;

/// Built-in category phrases: (phrase, category_name).
pub const BUILTIN_PHRASES: &[(&str, &str)] = &[
    ("meeting with the team at work",              "work"),
    ("deploy service to production environment",   "work"),
    ("code review and engineering task",           "work"),
    ("client presentation or technical discussion","work"),
    ("infrastructure setup and deployment",        "work"),
    ("attend the standup meeting today",           "todo"),
    ("need to finish this task before deadline",   "todo"),
    ("remember to send the report",                "todo"),
    ("pick up groceries on the way home",          "todo"),
    ("schedule a call with the team",              "todo"),
    ("new product or feature concept",             "idea"),
    ("what if we built something like this",       "idea"),
    ("creative project inspiration and brainstorm","idea"),
    ("startup idea worth exploring",               "idea"),
    ("weekend trip with family and friends",       "personal"),
    ("personal journal about feelings and life",   "personal"),
    ("birthday celebration or social event",       "personal"),
    ("had a good day feeling happy",               "personal"),
];

pub fn cosine_similarity(a: &[f32], b: &[f32]) -> f32 {
    let dot: f32 = a.iter().zip(b).map(|(x, y)| x * y).sum();
    let norm_a: f32 = a.iter().map(|x| x * x).sum::<f32>().sqrt();
    let norm_b: f32 = b.iter().map(|x| x * x).sum::<f32>().sqrt();
    if norm_a == 0.0 || norm_b == 0.0 { 0.0 } else { dot / (norm_a * norm_b) }
}

/// Builds per-category centroid embeddings from built-in phrases plus any
/// user-defined extra categories (name → list of example phrases).
pub fn build_label_embeddings(
    encoder: &BertEncoder,
    extra: &[(String, Vec<String>)],
) -> Result<Vec<(String, Vec<f32>)>> {
    let mut buckets: HashMap<String, Vec<Vec<f32>>> = HashMap::new();

    for (phrase, cat) in BUILTIN_PHRASES {
        buckets.entry(cat.to_string()).or_default().push(encoder.encode(phrase)?);
    }

    for (name, phrases) in extra {
        for phrase in phrases {
            buckets.entry(name.clone()).or_default().push(encoder.encode(phrase)?);
        }
    }

    buckets
        .into_iter()
        .map(|(tag, vecs)| {
            let len = vecs[0].len();
            let mean: Vec<f32> = (0..len)
                .map(|i| vecs.iter().map(|v| v[i]).sum::<f32>() / vecs.len() as f32)
                .collect();
            Ok((tag, mean))
        })
        .collect()
}

pub fn classify(note_emb: &[f32], label_embeddings: &[(String, Vec<f32>)]) -> String {
    label_embeddings
        .iter()
        .map(|(tag, emb)| (tag, cosine_similarity(note_emb, emb)))
        .max_by(|(_, a), (_, b)| a.total_cmp(b))
        .map(|(tag, _)| tag.clone())
        .unwrap_or_else(|| "personal".to_string())
}
