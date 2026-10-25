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
# where the differences are: 24px blocks with >2% bad pixels, merged by 8-neighbour flood fill; top 5 by bad pixels (boxes in image px)
B = 24
gh, gw = -(-h // B), -(-w // B)
pad = np.zeros((gh * B, gw * B), bool)
pad[:h, :w] = d > 32
cells = pad.reshape(gh, B, gw, B).mean(axis=(1, 3)) > 0.02
seen = np.zeros_like(cells)
clusters = []
for sy, sx in zip(*(a.tolist() for a in np.nonzero(cells))):
    if seen[sy, sx]:
        continue
    seen[sy, sx] = True
    stack, ys, xs = [(sy, sx)], [], []
    while stack:
        y, x = stack.pop()
        ys.append(y); xs.append(x)
        for ny in (y - 1, y, y + 1):
            for nx in (x - 1, x, x + 1):
                if 0 <= ny < gh and 0 <= nx < gw and cells[ny, nx] and not seen[ny, nx]:
                    seen[ny, nx] = True
                    stack.append((ny, nx))
    x0, y0, x1, y1 = min(xs) * B, min(ys) * B, min(max(xs) * B + B, w), min(max(ys) * B + B, h)
    clusters.append({"box": [x0, y0, x1 - x0, y1 - y0], "bad_px": int(pad[y0:y1, x0:x1].sum())})
rep["clusters"] = sorted(clusters, key=lambda c: -c["bad_px"])[:5]
if rep["clusters"]:  # ref | candidate side by side for the worst one
    x0, y0, bw, bh = rep["clusters"][0]["box"]
    m = (max(x0 - 16, 0), max(y0 - 16, 0), min(x0 + bw + 16, w), min(y0 + bh + 16, h))
    a, b = ref.crop(m), cand.crop(m)
    sbs = Image.new("RGB", (a.width * 2 + 8, a.height), (255, 0, 255))
    sbs.paste(a, (0, 0)); sbs.paste(b, (a.width + 8, 0))
    sbs.save(f"{out}/worst.png")
    rep["worst_crop"] = "worst.png"
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
