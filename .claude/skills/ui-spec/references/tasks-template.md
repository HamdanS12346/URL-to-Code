# tasks.md template

Ordered build plan for one screen. Each task names its spec section, keys / T ids, and an acceptance check. Order matters: layout errors found late cost the most.

```markdown
# TASKS — <screen>

Target: React 19 + TypeScript, plain CSS (no UI library) unless the build project says otherwise.
Build with the draw-ui skill (reconstruction mode) + the "Build phase" rules in AGENTS.md (dpr!).
Spec: outputs/<screen>/spec/UI_SPEC.md · tests: outputs/<screen>/spec/parity.spec.ts

## 0. Setup
- [ ] `npm run port -- <screen>`: builds the static page in `outputs/<screen>/app/` (assets copied to `app/assets/`, every key as `data-testid`) and writes `app/BEHAVIOR.md`. Everything for this screen lives in `outputs/<screen>/`.
- [ ] `reference.png` and `manifest.json` stay in `outputs/<screen>/` (`npm run verify -- <screen>` reads them there).
- [ ] The route `#/<screen>` needs no registration: the root router finds `outputs/<screen>/app/Page.tsx`.

## 1. Shell — §2, §3
- [ ] Page width, background, font stack, CSS variables from §3.
  Accept: `npm run verify -- <screen>` → `size_delta_px` within ±2.

## 2. Regions — §2 (top to bottom, one task each)
- [ ] <Region>: <what> [keys]. Accept: verify band `bad_pct` < 5 for its band.

## 3. Components & states — §5, §7, §8
- [ ] <Component>: elements <keys>, state <names>, behaviors <T ids>, every key as data-testid.
  Accept: parity tests <T ids> pass.

## 4. Validation — §6
- [ ] <rules>. Accept: parity tests <T ids> pass.

## 5. Server interactions — §10
- [ ] <API stub / call> with the legacy fields. Accept: <T ids> show the same UI result.

## 6. Done
- [ ] `npm run verify -- <screen>`: size_delta ±2, bad_pct < 5 (report the numbers).
- [ ] `TARGET=react URL=<url> npx playwright test outputs/<screen>/spec/parity.spec.ts`: all pass.
- [ ] Every §13 open question answered, or listed as known gaps.
```
