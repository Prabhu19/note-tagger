#!/usr/bin/env python3
"""Convert a safetensors model from F32 to F16 to fit Cloudflare's 25 MB asset limit."""
import sys
import numpy as np
from safetensors import safe_open
from safetensors.numpy import save_file

path = sys.argv[1]
tensors = {}
with safe_open(path, framework="numpy") as f:
    for key in f.keys():
        tensors[key] = f.get_tensor(key).astype(np.float16)
save_file(tensors, path)
size_mb = sum(t.nbytes for t in tensors.values()) / 1024 / 1024
print(f"Converted {path} to F16 ({size_mb:.1f} MB)")
