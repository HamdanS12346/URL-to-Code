"""Image helpers for the tool-made reference (scripts/lib/freeze.mjs -> shoot).

python scripts/imgtools.py compose  <shots-dir> <out.png> <dpr>
    paste the viewport shots listed in <shots-dir>/shots.json (y = scrollY in CSS px) into one tall image.
python scripts/imgtools.py sections <reference.png> <bands.json> <out-dir> <dpr>
    cut one full-resolution crop per top-level band (tall bands are split in parts) + <out-dir>/index.json.
"""
import json
import math
import re
import sys
from pathlib import Path

from PIL import Image

Image.MAX_IMAGE_PIXELS = None


def compose(shots_dir, out_png, dpr):
    d = Path(shots_dir)
    info = json.loads((d / "shots.json").read_text())
    imgs = [(Image.open(d / s["file"]).convert("RGB"), round(s["y"] * dpr)) for s in info["shots"]]
    w = max(i.width for i, _ in imgs)
    h = max(round(info["docHeight"] * dpr), max(y + i.height for i, y in imgs))
    canvas = Image.new("RGB", (w, h), (255, 255, 255))
    for img, y in imgs:  # later shots overwrite the overlap with the previous one
        canvas.paste(img, (0, y))
    canvas.save(out_png)
    print(json.dumps({"width": w, "height": h, "shots": len(imgs)}))


def sections(ref_png, bands_json, out_dir, dpr, max_css=1400, part_css=1000):
    ref = Image.open(ref_png).convert("RGB")
    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)
    for f in [*out.glob("*.png"), *out.glob("jpg/*.jpg")]:
        f.unlink()
    index = []
    for n, b in enumerate(json.loads(Path(bands_json).read_text()), 1):
        label = re.sub(r"[^a-z0-9]+", "-", str(b.get("label", "")).lower()).strip("-")[:40] or b.get("tag", "band")
        parts = max(1, math.ceil(b["h"] / part_css)) if b["h"] > max_css else 1
        files = []
        for p in range(parts):
            y0 = round((b["y"] + b["h"] * p / parts) * dpr)
            y1 = round((b["y"] + b["h"] * (p + 1) / parts) * dpr)
            if y0 >= ref.height:
                break
            name = f"{n:02d}-{label}{'-' + 'abcdefghij'[p] if parts > 1 else ''}.png"
            crop = ref.crop((0, y0, ref.width, min(y1, ref.height)))
            crop.save(out / name)
            # small JPEG twin: what goes to Gemini (request size budget); the PNG stays the exact reference
            (out / "jpg").mkdir(exist_ok=True)
            crop.save(out / "jpg" / name.replace(".png", ".jpg"), quality=82)
            files.append(name)
        index.append({"n": n, **{k: b[k] for k in ("sel", "tag", "id", "cls", "x", "y", "w", "h", "label") if k in b}, "files": files})
    (out / "index.json").write_text(json.dumps(index, indent=1))
    print(json.dumps({"count": len(index)}))


def crop(ref_png, out_png, dpr, x, y, w, h):
    ref = Image.open(ref_png)
    box = [round(v * dpr) for v in (x, y, x + w, y + h)]
    ref.crop((max(0, box[0]), max(0, box[1]), min(ref.width, box[2]), min(ref.height, box[3]))).save(out_png)
    print(json.dumps({"file": out_png}))


if __name__ == "__main__":
    a = sys.argv[1:]
    if len(a) == 8 and a[0] == "crop":
        crop(a[1], a[2], *map(float, a[3:8]))
    elif len(a) == 4 and a[0] == "compose":
        compose(a[1], a[2], float(a[3]))
    elif len(a) == 5 and a[0] == "sections":
        sections(a[1], a[2], a[3], float(a[4]))
    else:
        print(json.dumps({"error": __doc__}))
        sys.exit(2)
