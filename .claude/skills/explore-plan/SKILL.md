---
name: explore-plan
description: Stage 3 of the pipeline. Decide what Playwright should hover, click and type into on ONE captured screen, and write outputs/<screen>/explore/plan.json from the stage-2 survey (candidates.md + map pictures). Use when asked to "plan the exploration for <screen>", "plan explore <screen>", or to fix a failing `npm run check:plan`. Not for capturing, not for running the exploration, not for writing the UI spec.
---

# Exploration planner

`npm run go -- <screen>` stopped after stage 2. It found every element of the page that can be hovered, clicked, typed into or picked. You choose which of them Playwright tests in stage 4, and in what order. What you choose is all that stage 4 will know about the page's behavior, and the UI spec is written from that. A menu you leave out is a menu the rebuild will not have.

One screen per run. Work only in `outputs/<screen>/explore/`. Never open the live site and never run the pipeline yourself, unless the user asks.

## 1. Read

| # | file | what for |
|---|---|---|
| 1 | `explore/survey/candidates.md` | the table: `#`, `key`, label, kind, `can` (hover / click / fill / select), y position, map picture, look-alikes, hints. Read all of it |
| 2 | `explore/survey/map/*.jpg` | the page with a numbered box per row (the number is the row `#`). Red is an element. Magenta is a popup/expand trigger or an element with a CSS `:hover` rule. **Look at every picture**: this is how you tell a main menu from a footer link |
| 3 | `explore/survey/plan.suggested.json` | the rule-based plan (`--auto`). It is a starting point, not the answer |
| 4 | `sections/*.png` (optional) | sharper crops of the page, if a map picture is unclear |
| 5 | `explore/survey/survey.json` (on demand) | every element with its full key list, including look-alikes the table folded |

## 2. Choose

The goal is every distinct behavior once, not every element. There is a time budget: about 1–2 s per hover and about 2–5 s per action, plus a 5–20 s page reload when an action leaves something open.

**Always include** (`actions`, and `hover` too when hovering might open it):
- Menus and navigation that open something: hamburger, mega-menu headers, "More", account and location pickers, every popup/expand trigger (magenta, hint `popup/expand trigger`).
- Tabs, accordions and FAQ questions (one of each look-alike group is enough when they behave the same; FAQ items each reveal different text, so take them all if there are ≤ 12).
- Carousels and sliders: next/previous arrows and dots, one each.
- Dialog openers: login, sign up, "learn more" buttons that open a modal.
- Search boxes, with a realistic `value` (for a grocery site, `"milk"`) and `"enter": true` to submit it.
- Filters, sort, toggles, dropdowns (`select`) and chips (one or two per group).
- Form fields: every field of the screen's own form. Stage 4 tries invalid values, then a valid one. Give `value` when a realistic value matters (e.g. a zip code `"94105"`).
- The form's own submit button, with `"submit": true`: stage 4 fills every field of that form with valid values (your `value`s first), then presses it. Safe mode blocks the request, but the client-side validation and the request's fields are recorded. The hint `submit-like` marks candidates. On sites where the whole page is one form, every button looks submit-like, so use `submit` only on a real form's button (login, register, contact, checkout-style forms).

**Hover only** (`hover`, not `actions`):
- One or two of each card/tile/product group (hover styles, quick-view overlays). Look-alikes behave the same.
- Nav links with the hint `css :hover`.
- Buttons whose hover style you need (pick one of each look). Do not hover every link.

**Leave out**:
- Plain links that only leave the page (`can` = `hover` only, kind `link`): at most one per group, for its hover style.
- Footer, legal, social, cookie banners, app-store badges and language pickers, unless they are the screen's subject.
- Destructive or real-world actions: buy, checkout, add to cart, pay, delete, log out, send. Safe mode blocks their requests anyway; they waste the budget.
- Duplicates: the same thing in a sticky header and in the page body. Test it once.

**Order matters.** Stage 4 runs `hover` first, then `actions`, top of the list first. When the budget runs out, the bottom of the list is lost. Put the most important behaviors first.

Hidden-at-load elements (the section at the top of `candidates.md`) are revealed by something on the page. Make sure their trigger is in the plan. After the whole plan has run, stage 4 automatically follows a few of the controls an action revealed (menu sections, a dialog's close button), up to depth `maxDepth`, while budget remains.

## 3. Write `outputs/<screen>/explore/plan.json`

```json
{
  "hover":   [ { "key": "hover-shop", "why": "CSS dropdown: Shop menu" }, "product-card-1" ],
  "actions": [
    { "key": "hamburger-button", "why": "opens the main menu dialog" },
    { "key": "search-bar-input", "value": "milk", "enter": true, "why": "search" },
    "button-how-does-instacart-delivery-and-"
  ],
  "notes": "skipped: footer links, app badges, store cards beyond 2"
}
```

- An entry is a key (copy it exactly from the table, backticks removed) or an object `{ key, why?, value?, enter?, submit? }`. `value` and `enter` are for text fields only, `submit` for a form's button.
- `budgetSec` is optional. **Leave it out by default**: the default is `config.json → explore.timeBudgetSec` (300 s). Never set it below the default, even for a small plan: stage 4 also spends time on follow-ups of what an action revealed (menu sections, dialogs) and on page reloads, and what does not fit in the budget is silently dropped (`facts.md` §13 "limit reached").
  Set it only to raise it, when the plan is bigger than what fits in 300 s (about 40 hovers plus 30 actions on a busy site): estimate hovers × 1.5 s + actions × 4 s + 10 s per action that leaves something open, add ~30% for follow-ups, round up, and say in `notes` why it was raised.
- Do not invent keys or selectors. Every key must appear in `survey.json`.

## 4. Check, then hand back

Run `npm run check:plan -- <screen>`. It must print `✓`. Fix the errors (an unknown key is usually a typo or a key from another screen) and read the warnings.

Finish with:
- the check line,
- what you included, grouped (menus, tabs/accordions, carousel, search/forms, hover styles),
- what you deliberately left out and why (one line),
- the next step for the user: **run the same command again, `npm run go -- <screen>`, to continue with stage 4 (run the plan + facts).** It stops again at stage 5 (the spec).
