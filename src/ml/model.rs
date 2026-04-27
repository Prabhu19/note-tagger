use anyhow::Result;
use candle_core::{DType, Device, IndexOp, Tensor};
use candle_nn::VarBuilder;
use candle_transformers::models::bert::{BertModel, Config as BertConfig};
use tokenizers::Tokenizer;

pub const DEVICE: Device = Device::Cpu;
pub const DTYPE: DType = DType::F32;

pub struct BertEncoder {
    model: BertModel,
    tokenizer: Tokenizer,
}

impl BertEncoder {
    pub async fn load() -> Result<Self> {
        let model_bytes =
            fetch_bytes("/models/bert-tiny/model.safetensors").await?;
        let tokenizer_bytes =
            fetch_bytes("/models/bert-tiny/tokenizer.json").await?;
        let config_bytes =
            fetch_bytes("/models/bert-tiny/config.json").await?;

        let config: BertConfig = serde_json::from_slice(&config_bytes)?;
        let tokenizer = Tokenizer::from_bytes(&tokenizer_bytes)
            .map_err(|e| anyhow::anyhow!("tokenizer error: {e}"))?;
        let vb =
            VarBuilder::from_buffered_safetensors(model_bytes, DTYPE, &DEVICE)?;
        let model = BertModel::load(vb.pp("bert"), &config)?;
        Ok(Self { model, tokenizer })
    }

    /// Returns the [CLS] token embedding (128-dim) for the input text.
    pub fn encode(&self, text: &str) -> Result<Vec<f32>> {
        let encoding = self
            .tokenizer
            .encode(text, true)
            .map_err(|e| anyhow::anyhow!("encode error: {e}"))?;

        let ids = Tensor::new(encoding.get_ids(), &DEVICE)?.unsqueeze(0)?;
        let types =
            Tensor::new(encoding.get_type_ids(), &DEVICE)?.unsqueeze(0)?;
        let mask =
            Tensor::new(encoding.get_attention_mask(), &DEVICE)?.unsqueeze(0)?;

        let output = self.model.forward(&ids, &types, Some(&mask))?;
        let cls = output.i((0, 0))?;
        Ok(cls.to_vec1::<f32>()?)
    }
}

// In WASM (browser Web Worker or Cloudflare Worker) fetch via the global fetch API.
// Relative URLs don't resolve from blob-URL workers, so prepend the origin.
#[cfg(target_arch = "wasm32")]
async fn fetch_bytes(url: &str) -> Result<Vec<u8>> {
    use wasm_bindgen::JsCast;
    use wasm_bindgen_futures::JsFuture;

    let scope: web_sys::WorkerGlobalScope = js_sys::global().unchecked_into();
    let origin = scope.location().origin();
    let absolute_url = format!("{origin}{url}");
    let resp: web_sys::Response =
        JsFuture::from(scope.fetch_with_str(&absolute_url))
            .await
            .map_err(|e| anyhow::anyhow!("fetch {absolute_url}: {e:?}"))?
            .unchecked_into();
    let buf = JsFuture::from(
        resp.array_buffer()
            .map_err(|e| anyhow::anyhow!("array_buffer: {e:?}"))?,
    )
    .await
    .map_err(|e| anyhow::anyhow!("buffer await: {e:?}"))?;
    Ok(js_sys::Uint8Array::new(&buf).to_vec())
}

// On native (dev-native / cargo test), read from the assets directory.
#[cfg(not(target_arch = "wasm32"))]
async fn fetch_bytes(url: &str) -> Result<Vec<u8>> {
    let path = format!("assets{url}");
    std::fs::read(&path).map_err(|e| anyhow::anyhow!("read {path}: {e}"))
}
