---
name: ui-spec
description: Write the UI spec (spec/UI_SPEC.md + spec/tasks.md) for ONE captured screen from outputs/<screen>/ — facts.md, content.md, the user's screenshots and the state pictures — so the screen can be rebuilt in React 19 with the same looks and behavior. Use when asked to "write the UI spec for <screen>", "spec <screen>", or to fix a failing `npm run check`. Not for capturing (that is `npm run capture`) and not for writing the React code.
---

# UI spec writer

You turn a capture into a spec a developer (or a coding agent) can build from without opening the legacy app.
The capture is deterministic and complete for what a browser can observe. Your job is to **describe and organize** it, **reconcile** it with the screenshots, and **mark what cannot be known**. You never discover facts by guessing.

One screen per run. Input: `outputs/<screen>/` (made by `npm run capture -- <screen>`). If `facts.md` is missing, stop and tell the user to run the capture.

## 1. Read, in this order

| # | file | why | how much |
|---|---|---|---|
| 1 | `outputs/<screen>/facts.md` | the brief: page, tokens, sections, assets, controls, validation, states, behaviors (EARS drafts), server calls, navigation, gaps | all of it |
| 2 | `outputs/<screen>/sections/*.png` (+ `index.json`) | what it must look like, one full-resolution crop per band, made by the tool from a warmed-up, frozen page. **Look at every one**: they are far sharper than the whole-page `reference.png`. Cite as `[asset:sections/<file>]` | every crop |
| 2b | `screenshots/<screen>/*` (only if the user supplied any) | `shot:N` = the Nth image in natural file order | look at every one |
| 3 | `outputs/<screen>/content.md` | every text verbatim, in document order, with `{key}` markers and `<!-- box -->` style notes | all of it |
| 4 | `outputs/<screen>/explore/shots/T##.png` | what each revealed/changed state looks like | the ones whose behavior shows something |
| 5 | `outputs/<screen>/snapshot/used.css` + `rendered.html` | the page's real CSS rules (only those it uses) and its HTML with original class names. The truth for layout (flex/grid/widths/media queries), `::before` content, hover rules, `@keyframes`. Quote rules from here instead of inferring them | grep per component |
| 6 | on demand | `capture/dom.json` (search by key/id; read one region at a time), `capture/controls.json` (exact control styles), `capture/pseudo.json`, legacy CSS listed in facts §4, `capture/js/*` (only for facts §12 and handlers), legacy source files listed in facts §1 | only what you need |

Never open the live site and never run the capture yourself.

## 2. Rules

1. **Evidence on every requirement.** Each requirement / table row ends with a tag in brackets:
   `[T07]` behavior · `[M03]` motion entry · `[ctl:key]` control/element · `[val:key]` validator · `[shot:N]` screenshot · `[asset:path]` file under `capture/` (or `sections/…`) · `[js:file#function]` · `[aspx:file:line]` · `[css:selector]` · `[UNKNOWN: question]`.
   Several in one bracket are fine: `[T04, ctl:chkShip, shot:1]`.
2. **Never write a value you did not read.** Missing, cut off, or contradictory → `[UNKNOWN: …]` + an entry in Open questions.
3. **Numbers come from the capture, looks from the screenshots.** Sizes/colors/fonts: copy the computed CSS values (CSS px, already divided by dpr). If the screenshots show something the capture doesn't (different data, logged-in state), describe the screenshot and record the disagreement in Open questions.
4. **Text verbatim** from `content.md`: spelling, case, punctuation, trailing colons.
5. **Assets are files, not redraws.** Reference `capture/...` paths from facts §4. Icon-font glyphs (`::before` content) → name the font and the codepoint. Canvas charts → the picture file + what data it shows.
6. **Keys are sacred.** Use the capture's keys exactly (`txtName`, `pnlShipping`, `hover-orders`). They become `data-testid` in the rebuild and the parity tests depend on them.
7. **Describe behavior, not mechanics.** A WebForms postback that refills a dropdown is "WHEN Country changes THE SYSTEM SHALL load the states of that country". The postback detail (target, fields) goes to Server interactions only.
8. **Blocked requests** (facts §9 status `blocked`): give the request contract (fields) and mark the outcome `[UNKNOWN]` unless the source shows it.
9. **This page only.** Other pages are navigation targets, nothing more.
10. **Flaky** behaviors (facts §13) may be mentioned, never required.
11. **Motion is required.** Every entry in facts §15 (`M01…`) gets a requirement in the `Motion` section with its numbers copied (autoplay delay, px/s, duration, easing, keyframes, counter end value). Timing comes from the measurement, never from your impression of a still image. A counter that shows 0 in a picture still ends at the value in §15.

## 3. EARS

Use exactly these forms, uppercase keywords:

| pattern | form | use for |
|---|---|---|
| ubiquitous | `THE SYSTEM SHALL …` | always-true looks/structure, default states |
| event | `WHEN <trigger> THE SYSTEM SHALL …` | every behavior in facts §8 |
| state | `WHILE <state> THE SYSTEM SHALL …` | modes: panel open, item selected, disabled-until |
| unwanted | `IF <bad input/condition> THEN THE SYSTEM SHALL …` | validation failures, errors, confirm-cancel |
| optional | `WHERE <feature/role> THE SYSTEM SHALL …` | role- or data-dependent parts (usually `[UNKNOWN]`) |

Start from the facts §8 drafts: rewrite them as clean requirements, group them by component, merge duplicates (cite all their T ids), and split one draft into several requirements when it mixes concerns. Each line: one requirement, ending in its evidence tag.

## 4. Write

- `outputs/<screen>/spec/UI_SPEC.md`: follow [references/ui-spec-template.md](references/ui-spec-template.md). Headings are checked: keep their names and order.
- `outputs/<screen>/spec/tasks.md`: follow [references/tasks-template.md](references/tasks-template.md).

Prefer tables to prose. Typical size: 150–400 lines for the spec, 30–80 for tasks.

## 5. Gate (not optional)

Run `npm run check -- <screen>` and fix everything it reports:

| report | fix |
|---|---|
| missing controls / behaviors / validators | cite them where they belong (component table, behavior list, field table) |
| missing motion | cite each `[M##]` in the Motion section |
| invented | the id doesn't exist in the capture: correct it or remove the claim |
| no evidence tag | add the tag, or delete the line if there is no evidence |
| missing sections | add the section (write "None." if empty) |
| (optional) links / unexplained not mentioned | links → Navigation; unexplained → State model or Open questions |

Repeat until it prints ✓. Then report to the user: the coverage line, the number of `[UNKNOWN]`s, and the three most important open questions.
