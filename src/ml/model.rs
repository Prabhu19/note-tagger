use anyhow::Result;
use candle_core::{DType, Device, IndexOp, Tensor};
use candle_nn::VarBuilder;
use candle_transformers::models::bert::{BertModel, Config as BertConfig};
use tokenizers::Tokenizer;

pub const DEVICE: Device = Device::Cpu;
pub const DTYPE: DType = DType::F32;

static MODEL_BYTES: &[u8] =
    include_bytes!("../../assets/models/bert-tiny/model.safetensors");
static TOKENIZER_BYTES: &[u8] =
    include_bytes!("../../assets/models/bert-tiny/tokenizer.json");
static CONFIG_BYTES: &[u8] =
    include_bytes!("../../assets/models/bert-tiny/config.json");

pub struct BertEncoder {
    model: BertModel,
    tokenizer: Tokenizer,
}

impl BertEncoder {
    pub fn load() -> Result<Self> {
        let config: BertConfig = serde_json::from_slice(CONFIG_BYTES)?;
        let tokenizer = Tokenizer::from_bytes(TOKENIZER_BYTES)
            .map_err(|e| anyhow::anyhow!("tokenizer error: {e}"))?;
        let vb = VarBuilder::from_buffered_safetensors(
            MODEL_BYTES.to_vec(),
            DTYPE,
            &DEVICE,
        )?;
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
