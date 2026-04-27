#!/usr/bin/env python3
"""Convert pytorch_model.bin to model.safetensors."""
import sys
from pathlib import Path

src = Path(sys.argv[1])
dst = src.parent / "model.safetensors"

if dst.exists():
    print(f"{dst} already exists, skipping")
    sys.exit(0)

import torch
from safetensors.torch import save_file

weights = torch.load(src, map_location="cpu", weights_only=True)
save_file(weights, str(dst))
print(f"Converted {src} -> {dst} ({dst.stat().st_size / 1e6:.1f} MB)")
