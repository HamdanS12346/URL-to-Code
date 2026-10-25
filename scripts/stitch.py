"""Join overlapping scroll screenshots into one image, and compare two images.

python scripts/stitch.py stitch  <shots-dir> <out.png> <offsets.json> [live-page.png]
python scripts/stitch.py compare <reference.png> <candidate.png>      (prints JSON)

stitch: shots are taken top to bottom (file names sort naturally: 1.png, 2.png, 10.png), same width, each
overlapping the previous one. Each shot is placed by matching it against the live full-page render when given
(capture/page.png), else by its overlap with the previous shot. Rows identical at the same position in every
shot are a sticky header/footer and are kept once. Exit 2 with a reason when shots don't fit together.
"""
import json
import re
import sys
from pathlib import Path

import numpy as np
from PIL import Image

IMG = re.compile(r"\.(png|jpe?g|webp|bmp)$", re.I)


def natural(s):
    return [int(t) if t.isdigit() else t.lower() for t in re.split(r"(\d+)", s)]


def fail(msg):
    print(json.dumps({"error": msg}))
    sys.exit(2)


def body(a):
    # drop the right 2.5% (the scrollbar thumb moves between shots), quarter width: plenty for matching
    return a[:, : int(a.shape[1] * 0.975) : 4].mean(axis=2).astype(np.float32)


def textured(g):
    return g.std(axis=1) > 3  # rows with content; blank rows match anything and prove nothing


def sticky_rows(imgs, top):
    gs = [body(i) for i in imgs]
    h = min(g.shape[0] for g in gs)
    n = 0
    for r in range(h // 3):
        rr = r if top else -1 - r
        if all(np.abs(g[rr] - gs[0][rr]).max() <= 8 for g in gs[1:]):
            n += 1
        else:
            break
    band = gs[0][:n] if top else gs[0][gs[0].shape[0] - n:]
    return n if n and textured(band).sum() >= 3 else 0  # identical blank margins are not a sticky bar


def shift(a, dx):
    """move content dx px right (negative = left), filling the gap with the edge column; width unchanged."""
    if dx == 0:
        return a
    p = np.pad(a, ((0, 0), (max(dx, 0), max(-dx, 0)), (0, 0)), mode="edge")
    return p[:, max(-dx, 0): p.shape[1] - max(dx, 0)]


def offset(a, b, top, bot, name):
    """(dy, score, dx): row r of b == row r+dy of a once b is shifted dx px sideways. Every candidate is scored
    on the textured rows of its overlap; the best score wins, ties go to the overlap with the most matching content.
    Small dx covers shots cropped a few px differently (e.g. 1917 vs 1918 wide)."""
    ga = body(a)
    ha, hb = a.shape[0], b.shape[0]
    tex = textured(body(b))
    scores = []
    for dx in range(-4, 5):
        gb = body(shift(b, dx))
        for dy in range(1, ha - top - bot - 40):
            ov = min(ha - bot - top - dy, hb - bot - top)
            if ov < 40:
                break
            rows = tex[top:top + ov]
            n = int(rows.sum())
            if n < 8:
                continue
            d = np.abs(ga[top + dy:top + dy + ov] - gb[top:top + ov]).mean(axis=1)
            scores.append((float(d[rows].mean()), dy, n, dx))
    if not scores:
        fail(f"{name[0]} / {name[1]}: no overlapping content to match (blank overlap, or no overlap at all)")
    best, _, _, bdx = min(scores)
    if best > 6:
        fail(f"no overlap found between {name[0]} and {name[1]} (best mean diff {best:.1f}). "
             "Shots must overlap, be the same zoom, and show only the page (no browser bars/taskbar).")
    score, dy, _, dx = max((x for x in scores if x[3] == bdx and x[0] <= best + 1.0), key=lambda x: x[2])
    return dy, score, dx


def locate(guide, shot, top, bot):
    """absolute y of a shot inside the live full-page render (same dpr), scored on the shot's textured rows."""
    w = min(guide.shape[1], shot.shape[1])
    gg, gs = body(guide[:, :w]), body(shot[:, :w])
    rows = textured(gs)
    rows[:top] = False
    if bot:
        rows[len(rows) - bot:] = False
    idx = np.where(rows)[0]
    if len(idx) < 8:
        return None, None
    span = gg.shape[0] - gs.shape[0] + 1
    if span < 1:
        return None, None
    coarse = idx[:: max(1, len(idx) // 40)]  # ~40 rows to rank every y, then the full row set on the best few
    rough = sorted(range(span), key=lambda y: float(np.abs(gg[y + coarse] - gs[coarse]).mean()))[:5]
    return min(((float(np.abs(gg[y + idx] - gs[idx]).mean()), y) for y in rough))[::-1]


def stitch(shots_dir, out_png, out_json, guide_png=None):
    files = sorted([p for p in Path(shots_dir).iterdir() if p.is_file() and IMG.search(p.name)], key=lambda p: natural(p.name))
    if not files:
        fail(f"no screenshots in {shots_dir}")
    imgs = [np.asarray(Image.open(p).convert("RGB")) for p in files]
    widths = [i.shape[1] for i in imgs]
    w = max(widths)
    if w - min(widths) > 10:
        fail("screenshots have different widths: " + ", ".join(f"{p.name}={i.shape[1]}" for p, i in zip(files, imgs)))
    if w != min(widths):
        # ponytail: pad by repeating the right edge column; retake shots if the gap is ever more than a few px
        print(f"warning: padded to {w}px: " + ", ".join(f"{p.name}={i.shape[1]}" for p, i in zip(files, imgs) if i.shape[1] != w), file=sys.stderr)
        imgs = [np.pad(i, ((0, 0), (0, w - i.shape[1]), (0, 0)), mode="edge") for i in imgs]
    top = sticky_rows(imgs, True) if len(imgs) > 1 else 0
    bot = sticky_rows(imgs, False) if len(imgs) > 1 else 0
    # preferred: place every shot against the live page render (works across blank overlaps, no drift);
    # fallback: chain overlaps between neighbours
    guide = np.asarray(Image.open(guide_png).convert("RGB")) if guide_png and Path(guide_png).exists() else None
    placed = [locate(guide, im, top, bot) if guide is not None and len(imgs) > 1 else (None, None) for im in imgs]
    ok = lambda i: placed[i][0] is not None and placed[i][1] <= 6
    ys, scores, method = [0], [], []
    for i in range(1, len(imgs)):
        if ok(i) and ok(i - 1) and placed[i][0] > placed[i - 1][0]:
            dy, sc, how = placed[i][0] - placed[i - 1][0], placed[i][1], "live page"
        else:
            dy, sc, dx = offset(imgs[i - 1], imgs[i], top, bot, (files[i - 1].name, files[i].name))
            imgs[i] = shift(imgs[i], dx)
            how = f"overlap dx={dx}" if dx else "overlap"
        ys.append(ys[-1] + dy)
        scores.append(round(sc, 2))
        method.append(how)
    W = imgs[0].shape[1]
    H = max(y + i.shape[0] for y, i in zip(ys, imgs))
    canvas = np.zeros((H, W, 3), dtype=np.uint8)
    last = len(imgs) - 1
    for i, (img, y) in enumerate(zip(imgs, ys)):
        r0 = 0 if i == 0 else top
        r1 = img.shape[0] - (0 if i == last else bot)
        canvas[y + r0:y + r1] = img[r0:r1]
    if top and len(imgs) > 1:
        canvas[:top] = imgs[0][:top]
    Image.fromarray(canvas).save(out_png)
    info = {"width": W, "height": int(H), "sticky": {"top": top, "bottom": bot}, "matchScores": scores, "placedBy": method,
            "shots": [{"file": p.name, "y": int(y), "height": int(i.shape[0])} for p, i, y in zip(files, imgs, ys)]}
    Path(out_json).write_text(json.dumps(info, indent=1))
    print(json.dumps({k: info[k] for k in ("width", "height", "sticky", "matchScores", "placedBy")}))


def compare(ref_p, cand_p):
    ref, cand = Image.open(ref_p).convert("RGB"), Image.open(cand_p).convert("RGB")
    w, h = min(ref.width, cand.width), min(ref.height, cand.height)
    d = np.abs(np.asarray(ref.crop((0, 0, w, h)), dtype=np.int16) - np.asarray(cand.crop((0, 0, w, h)), dtype=np.int16)).max(axis=2)
    band = max(h // 8, 1)
    bands = [round(float((d[y:y + band] > 32).mean() * 100), 2) for y in range(0, h, band)]
    print(json.dumps({"reference": [ref.width, ref.height], "candidate": [cand.width, cand.height],
                      "size_delta_px": [cand.width - ref.width, cand.height - ref.height],
                      "bad_pct": round(float((d > 32).mean() * 100), 2), "bands_bad_pct": bands}))


if __name__ == "__main__":
    if len(sys.argv) in (5, 6) and sys.argv[1] == "stitch":
        stitch(*sys.argv[2:6])
    elif len(sys.argv) == 4 and sys.argv[1] == "compare":
        compare(*sys.argv[2:4])
    elif len(sys.argv) == 3 and sys.argv[1] == "size":
        with Image.open(sys.argv[2]) as im:
            print(json.dumps({"width": im.width, "height": im.height}))
    else:
        fail(__doc__)
