"""python scripts/diff.py <reference.png> <candidate.png> <out-dir> [<bands.json> <dpr>]  ->  report.json + diff.png (stdout: summary)
With bands.json (the reference's top-level bands, CSS px) the report also scores every band: bad_pct per section."""
import json, sys
import numpy as np
from PIL import Image, ImageChops

Image.MAX_IMAGE_PIXELS = None
ref_p, cand_p, out = sys.argv[1:4]
ref, cand = Image.open(ref_p).convert("RGB"), Image.open(cand_p).convert("RGB")
dw, dh = cand.width - ref.width, cand.height - ref.height
w, h = min(ref.width, cand.width), min(ref.height, cand.height)
d = np.asarray(ImageChops.difference(ref.crop((0, 0, w, h)), cand.crop((0, 0, w, h)))).max(axis=2)
band = max(h // 6, 1)
bands = [{"y": y, "bad_pct": round(float((d[y:y + band] > 32).mean() * 100), 2)} for y in range(0, h, band)]
rep = {"size_delta_px": [dw, dh], "bad_pct": round(float((d > 32).mean() * 100), 2), "mean_abs": round(float(d.mean()), 2),
       "worst_band": max(bands, key=lambda b: b["bad_pct"]), "bands": bands}
if len(sys.argv) > 5:
    dpr = float(sys.argv[5])
    secs = []
    for n, b in enumerate(json.load(open(sys.argv[4])), 1):
        y0, y1 = round(b["y"] * dpr), min(round((b["y"] + b["h"]) * dpr), h)
        secs.append({"n": n, "label": b.get("label", ""), "y": b["y"], "h": b["h"],
                     "bad_pct": round(float((d[y0:y1] > 32).mean() * 100), 2) if y1 > y0 else 100.0})
    rep["sections"] = secs
    rep["worst_section"] = max(secs, key=lambda s: s["bad_pct"]) if secs else None
# a size delta beyond rounding (<=2px) means a layout/DPR error, not antialiasing
rep["verdict"] = "SIZE MISMATCH - fix layout/DPR first" if abs(dw) > 2 or abs(dh) > 2 else ("close" if rep["bad_pct"] < 5 else "differs")
Image.fromarray(np.clip(d * 4, 0, 255).astype("uint8")).save(f"{out}/diff.png")
json.dump(rep, open(f"{out}/report.json", "w"), indent=2)
print(json.dumps({k: rep[k] for k in ("size_delta_px", "bad_pct", "mean_abs", "worst_band", "verdict") + (("worst_section",) if "sections" in rep else ())}))
