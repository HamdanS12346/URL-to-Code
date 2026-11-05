# UI_SPEC.md template

Copy the structure below. Replace every `<…>`. Keep heading names and order (`npm run check` looks for them). Write "None." under a heading that has nothing.

```markdown
# UI SPEC — <screen>

> Source <url> · viewport <W>×<H> CSS px @ dpr <dpr> · legacy built with <framework from facts §1> · target React 19
> Evidence tags: `[T##]` behavior · `[ctl:key]` element · `[val:key]` validator · `[shot:N]` screenshot · `[asset:path]` · `[js:…]` · `[aspx:…]` · `[UNKNOWN: …]`

## 1. Overview
<1–3 sentences: what the screen is for, who uses it> [shot:1]
Primary tasks:
- <task> [ctl:…]

## 2. Layout
Page: <fixed width N px centered | fluid | min-width>, background <value>, scroll <page | inner region>, sticky <parts or none> [shot:…]

| region | element (key / id) | box x,y,w,h (CSS) | in shots | layout | key styles | evidence |
|---|---|---|---|---|---|---|
| Header | … | … | shot:1 | flex row, space-between | bg …, height …, padding … | [shot:1] |

<optional ASCII sketch of the regions>

### 2.x <Region name>
<exact styles: background, border, padding, gap, font, alignment; children in order with their sizes> [evidence]

## 3. Design tokens
| token (CSS variable for the rebuild) | value | used by | evidence |
|---|---|---|---|
| --color-text | rgb(51, 51, 51) | body text | [shot:1] |
| --font-base | Verdana, Arial, sans-serif 12px/normal | body | [shot:1] |

## 4. Assets
| file (under capture/) | where | display size (CSS) | notes | evidence |
|---|---|---|---|---|
| assets/img/logo.svg | header logo | 32×32 | | [asset:assets/img/logo.svg] |

## 5. Components
React component tree (shared components marked *shared*):
- `<ScreenName>Page`
  - `Header` *shared* — logo, title [ctl:…]
  - `CustomerForm` — fields §6 [ctl:…]

| component | props / inputs | owns state | elements (keys) | evidence |
|---|---|---|---|---|

## 6. Fields & validation
| key | label (verbatim) | type | default | required | rules | message (verbatim) | validated when | evidence |
|---|---|---|---|---|---|---|---|---|

- IF <invalid input> THEN THE SYSTEM SHALL <show message where> [T…, val:…]

## 7. State model
| state | type | initial | changed by | drives (what shows/enables) | evidence |
|---|---|---|---|---|---|

Hidden at load (facts §12):
| element | shown when | evidence |
|---|---|---|
| pnlAdmin | <condition> | [UNKNOWN: …] |

## 8. Behavior
### 8.x <Component>
- THE SYSTEM SHALL <default look / state> [ctl:…]
- WHEN <trigger> THE SYSTEM SHALL <effect> [T…]
- WHILE <state> THE SYSTEM SHALL <effect> [T…]
- THE SYSTEM SHALL show <hover/focus/disabled style with values> [ctl:…]
- WHEN <trigger> THE SYSTEM SHALL <show/hide X>, animating <property> <from>→<to> over <ms>ms (<easing>) [T…]   (copy the measured timing from facts §8)

### 8.y Scroll behavior (facts §16: cite every [S##])
- WHEN the page is scrolled down past <N>px THE SYSTEM SHALL show <part>, <fixed|sticky> at <top|bottom|corner>, <w>×<h>px; scrolling back to the top hides it [S01]
- THE SYSTEM SHALL keep <header> stuck to the top while scrolling, and change <class/height> past <N>px [S02]

### 8.z Media (facts §17: cite every [V##])
- THE SYSTEM SHALL play <video file> automatically, <muted>, <looping>, poster <file> [V01]
- WHEN the user clicks <control> THE SYSTEM SHALL pause the video; clicking again resumes it [V01]

## 9. Navigation
| trigger (key) | destination | how (same tab / new window / route) | evidence |
|---|---|---|---|

## 10. Server interactions
| trigger | legacy request (method, target, fields) | rebuild needs (API, proposed) | response → UI | evidence |
|---|---|---|---|---|

## 11. Accessibility
- Labels, tab order, focus visibility, Enter-key default button, aria roles from capture/aria.yml [ctl:…]

## 12. Test ids
Every element below gets `data-testid="<key>"` in the rebuild; `outputs/<screen>/spec/parity.spec.ts` uses them:
`txtName`, `txtEmail`, … [ctl:…]
Run: `TARGET=react URL=<rebuild url> npx playwright test outputs/<screen>/spec/parity.spec.ts`

## 13. Open questions
1. <question> — answer from: <legacy source file / backend spec / product owner> [UNKNOWN]

## 14. Motion
One requirement per facts §15 entry, numbers copied from it. Cite every `[M##]`. Write "None." only if §15 says nothing moved.
- WHILE the page is shown THE SYSTEM SHALL advance <carousel> every <autoplayDelay>ms with a <speed>ms <effect>, <slidesPerView> slide(s) visible, loop <yes/no>, pausing on hover <yes/no> [M01]
- WHEN <counter> enters the viewport THE SYSTEM SHALL count from <from> to <end value> in <duration>ms [M02]
- THE SYSTEM SHALL scroll <ticker> <direction> at <N>px/s, looping [M03]
- WHEN <element> enters the viewport THE SYSTEM SHALL play <animation name> (<duration>, <delay>, <easing>, <fill>) from <keyframes> [M04]
Hover/focus transitions (facts §15 table) go in Behavior with their durations.
```
