# final-playwright — rules for coding agents

This repo turns one legacy screen (a URL; the user's own screenshots are optional) into a UI spec, and then (when asked) into a React 19 rebuild.
The capture makes its own reference: it warms the page up, freezes it, and photographs it screen by screen (`reference.png`, plus full-resolution crops in `sections/`), saves the page's real CSS (`snapshot/used.css`) and measures every motion (`motion.json`).
Scripts capture the facts; you write the spec, and later the code. Two phases, one screen per chat.

## Where things live (follow this every time)

`screenshots/<screen>/url/url.txt` (the page address; the user's own screenshots may sit beside it) → `npm run go -- <screen>` → everything for that screen lives in **`outputs/<screen>/`**,
and its React build lives in **`outputs/<screen>/app/`** (`Page.tsx`, `components/`, `style.css`, `assets/`, `BEHAVIOR.md`).
Nothing screen-specific goes anywhere else: not `src/`, `public/`, `scripts/` or the repo root. The root `src/main.tsx` is a generic router that finds `outputs/*/app/Page.tsx`,
so a new screen needs no edit outside its own folder. `scripts/` holds site-agnostic tools only; if a script names a site, it is wrong.
What the tool knows about one family of sites lives in a **site kit**, `kits/<kit>/` (`kit.mjs` hooks the scripts call, an in-page harvest,
the React runtime copied into each app as `src/kit`, and `KIT.md`, the guide you read for it). The only kit today is `kits/provider/`
(Kendo UI for jQuery portals: the client's Provider portal). A screen captured with a kit has `run.json` `"kit"` and a `kit/` folder.

**Packs** (`npm run ui`, see `docs/client-runbook.md`): one module of a logged-in portal at a time. A pack's screens live in `packs/<pack>/screens/<screen>/`
and are addressed as `<pack>/<screen>` in every command (`npm run check -- file-transfer/home`). Wherever this file or a skill says `outputs/<screen>/`, read that folder instead.
In a pack run, `scripts/ui.mjs` calls you (the writer) with one task per call and checks your output itself; the prompt names the task, the screen folder and the files you may write.
Its code goes to the pack's app, `packs/<pack>/app/` (or `--out`), not to the screen's `app/`.
With a kit (`pack.json` `"kit"`), there is no planning step, the spec cites every widget and dialog as `[kit:<id>]`, and the code
step builds only what the kit cannot know: read `kits/<kit>/KIT.md` first, and never edit the app's `src/kit` (fix the kit in `kits/<kit>/app`).
Never open, print or copy `.env` or anything under `packs/*/auth/`: they hold the portal password and the logged-in session.

## Phase 0 — Exploration plan (skill `explore-plan`, stage 3 of `npm run go`)

`npm run go -- <screen>` stops after its survey and asks for a plan ("plan the exploration for <screen>").
Follow `.claude/skills/explore-plan/SKILL.md`: read `outputs/<screen>/explore/survey/candidates.md` and every `map/*.jpg`, write `outputs/<screen>/explore/plan.json`,
also read the **Behavior brief** inside it (what the survey measured: JavaScript hover handlers, scroll behavior, media), write `outputs/<screen>/explore/plan.json` (every hover-handler group in the brief goes under `hover`/`actions`, or under `skip` with a reason),
and finish when `npm run check:plan -- <screen>` prints ✓. `plan.json` is the only file you write in this phase. The user then re-runs `npm run go -- <screen>`; don't run it yourself unless asked.

## Phase 1 — Spec (skill `ui-spec`)

1. **One screen per chat.** Work only in `outputs/<screen>/`.
2. **Never edit capture output.** Everything in `outputs/<screen>/` is generated, except `explore/plan.json` (phase 0), `spec/UI_SPEC.md` and `spec/tasks.md`
   (and, in phase 2, the rebuild in `app/` and the `measure-*` / `verify/` folders you create).
   If facts look wrong or stale, ask the user to re-run `npm run capture -- <screen>`; don't patch them.
3. **Don't run the capture or open the live site** unless the user asks. It clicks things on a real page.
4. **Write the spec with the skill:** follow `.claude/skills/ui-spec/SKILL.md` exactly (templates in its `references/`).
   Tools without skill support: open that file and follow it as instructions.
5. **Gate:** `npm run check -- <screen>` must print ✓. Fix the spec, not the checker.
6. **Never invent.** Every requirement carries an evidence tag; unknowns are `[UNKNOWN: …]`.
7. Finish with: coverage line from the check, the `[UNKNOWN]` count, and the top 3 open questions.

## Phase 2 — Build (skill `draw-ui`, only when the user asks to build)

Screenshot-to-code: the same screen comes out as React 19 + TypeScript + Vite, plain CSS, no UI library.
The screenshot is the spec. It is not inspiration. Build from `outputs/<screen>/spec/tasks.md`.

### Step 0 — DPR (before anything else)
A screenshot is in **device pixels**, not CSS pixels. `CSS px = image px / dpr`.
`outputs/<screen>/manifest.json` must contain `"dpr"` and `"css_viewport_width"` (= image width / dpr).

- No `dpr`? **Stop and ask.** Never assume 1. (Windows at 150% → dpr 1.5. Browser console: `devicePixelRatio`.)
- Write all CSS in CSS px. Never `zoom`, `transform: scale`, or `html { font-size }` tricks to make it fit.
- Sanity check: legacy .aspx body text is usually 11–13 CSS px. Body text > 15px, or a 1600px-wide container, means you copied image px. Divide by dpr.
- Image assets are in device px: give them `width = natural / dpr`.
- Scrollbars and OS chrome in the screenshot are not part of the page. Do not rebuild them.

### Step 1 — port the capture (`npm run port -- <screen>`)
Run it first. It turns `snapshot/rendered.html` + `used.css` + `capture/` into a static, pixel-faithful page in `outputs/<screen>/app/`
(every `data-testid` from the spec stamped, the page's own class names kept) and writes `app/BEHAVIOR.md`, one line per explored action. It works for any screen.
Then `npm run verify -- <screen>`, and spend the rest of the build on what a port cannot give: behavior (state, dialogs, forms, motion) from the spec and `BEHAVIOR.md`.
From then on edit the files in `app/` by hand; re-running `port` needs `--force` and overwrites them.

### Workflow (not optional)
Every build runs through the `draw-ui` skill in reconstruction mode (`.claude/skills/draw-ui/`):

1. Read `.claude/skills/draw-ui/references/calibration.md` — measure before writing code. The capture already did the first measurement for you:
   `outputs/<screen>/regions.json` (draw-ui's region list, boxes taken from the real DOM: every band, h1–h3, large images, repeated card rows as `group`s)
   and `outputs/<screen>/measure-00/` (draw-ui's `measure_reference.py` run on it: `measurements.json`, `annotations.svg`). Start from these; add regions to a copy of `regions.json` for a new round instead of eyeballing boxes. The skill defaults to 1:1, which is wrong whenever dpr ≠ 1: set `css_viewport_width` per Step 0.
   Put measurement output in new folders under `outputs/<screen>/` (e.g. `measure-01/`); the task folder is `outputs/<screen>/`.
2. Read `.claude/skills/draw-ui/references/html-reconstruction.md` — build it. Follow `docs/screen-recipe.md`.
   Work band by band: open `outputs/<screen>/sections/NN-*.png` (full resolution) for the band you are building, and take its layout and styles from `outputs/<screen>/snapshot/used.css` + `rendered.html` (real flex/grid/widths, `::before` content, hover rules, media queries, `@keyframes`). Port those rules; do not re-guess what the page already states. Keep the original class names where it keeps the CSS intact.
3. Verify with **one command**, not devtools round-trips: `npm run verify -- <screen>`
   (it starts the repo's dev server itself when none is running; `BASE=http://localhost:<port>` if not 5173, or `URL=<full url>`).
   It renders at viewport = image/dpr with deviceScaleFactor = dpr, diffs against `reference.png`, and writes
   `outputs/<screen>/verify/{candidate.png,diff.png,report.json}`. Read the JSON. Open only the crop of `worst_band`. Fix. Max **3 rounds**, then report what is left.
4. Behavior: `TARGET=react URL=… npx playwright test outputs/<screen>/spec/parity.spec.ts` — every key from the spec is a `data-testid`.

Skip the design path (`ui-design.md`, `full-page.md`). There is no design phase — the design already exists.

### Build rules
- Copy exactly: spacing, font sizes, weights, colors, radii, borders, shadows, alignment, text content. Measure them; do not eyeball them.
- `outputs/<screen>/capture/` (Playwright capture) computed styles beat pixel measuring for font, color, padding, border. Use pixels only to confirm layout.
- No improvements. No "cleaner" spacing, palette tweaks, swapped fonts, extra rounded corners, dark mode, or animations that are not in the spec's Motion section.
- Motion is copied, not invented: build every `M##` of the spec with its measured numbers (autoplay delay, px/s, duration, easing, keyframes, counter end value). A counter that is `0` in a picture still counts up to its value.
- No extra features, routes, states, or components that aren't in the screenshot or `UI_SPEC.md`.
- Ambiguous or cut off? Ask. Do not invent.
- Assets: use the files in `outputs/<screen>/capture/assets/` (spec §4). Only crop from `reference.png` or generate when there is genuinely nothing to reuse, and say so.
- Text, icons, and layout are code. Images are images.

### Reporting
**Behavior is measured, not guessed.** The page's scripts are not ported, so a port is static: nothing sticks, slides, hovers open, or plays until you build it.
Build it from `app/BEHAVIOR.md` (animation lines carry measured durations/easings; the Scroll and Media sections carry the sticky/fixed parts, thresholds and the video/pause behavior) and the spec's `[S##]`/`[V##]`/`[T##]` lines. `verify` replays the same probes on the rebuild and prints
`behavior: scroll N/M | media N/M | timing N/M | console: …` with one `✗` line per mismatch (a part that does not stick, a video that does not play or a pause button that does nothing, an animation that is instant, a React warning such as `Invalid DOM property autoplay`). Fix those before polishing pixels.
Anything you had to assume because the spec says `[UNKNOWN]` goes in the report under **Guessed**, one line each, with the guess you made.

State what matched, what didn't, and anything you couldn't verify. "Looks close" is not a result — report `verify` output: `size_delta_px`, `bad_pct`, `worst_section` and the per-section `bad_pct` / `h_delta_px` (fix the earliest band that drifts first), the `motion: N/M match` line, and the `behavior:` line (scroll / media / timing / console).
`size_delta_px` beyond ±2 is a layout/DPR error, not antialiasing: fix it before anything else.

## Commands
- `npm run go -- <screen> [--auto] [--from <step>|--only <step>] [--mode readonly|safe|full] [--headed]` (`npm run capture` is the same)
- `npm run check:plan -- <screen>` (stage-3 gate)
- `npm run check -- <screen>`
- `npm run port -- <screen> [--force]` (phase 2, step 1)
- `npm run verify -- <screen>`
- `npx playwright test outputs/<screen>/spec/parity.spec.ts` (add `TARGET=react URL=…` for the rebuild)

Windows: Python steps need `PYTHONUTF8=1` (run.mjs and verify.mjs set it; set it yourself when running the draw-ui Python scripts directly).
