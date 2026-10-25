"""python scripts/diff.py <reference.png> <candidate.png> <out-dir>  ->  report.json + diff.png (stdout: summary)"""
import json, sys
import numpy as np
from PIL import Image, ImageChops

ref_p, cand_p, out = sys.argv[1:4]
ref, cand = Image.open(ref_p).convert("RGB"), Image.open(cand_p).convert("RGB")
dw, dh = cand.width - ref.width, cand.height - ref.height
w, h = min(ref.width, cand.width), min(ref.height, cand.height)
d = np.asarray(ImageChops.difference(ref.crop((0, 0, w, h)), cand.crop((0, 0, w, h)))).max(axis=2)
band = max(h // 6, 1)
bands = [{"y": y, "bad_pct": round(float((d[y:y + band] > 32).mean() * 100), 2)} for y in range(0, h, band)]
rep = {"size_delta_px": [dw, dh], "bad_pct": round(float((d > 32).mean() * 100), 2), "mean_abs": round(float(d.mean()), 2),
       "worst_band": max(bands, key=lambda b: b["bad_pct"]), "bands": bands}
# a size delta beyond rounding (<=2px) means a layout/DPR error, not antialiasing
rep["verdict"] = "SIZE MISMATCH - fix layout/DPR first" if abs(dw) > 2 or abs(dh) > 2 else ("close" if rep["bad_pct"] < 5 else "differs")
Image.fromarray(np.clip(d * 4, 0, 255).astype("uint8")).save(f"{out}/diff.png")
json.dump(rep, open(f"{out}/report.json", "w"), indent=2)
print(json.dumps({k: rep[k] for k in ("size_delta_px", "bad_pct", "mean_abs", "worst_band", "verdict")}))
