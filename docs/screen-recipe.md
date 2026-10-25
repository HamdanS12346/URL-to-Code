# Screen recipe (one screen, one chat)

Complements `draw-ui`; does not replace it. Order matters: layout bugs found late cost the most.

1. **Task folder** `outputs/<screen>/` (made by `npm run capture -- <screen>`): `reference.png`, `manifest.json` with `dpr` and `css_viewport_width`, `capture/`. No dpr → ask.
2. **Skeleton first.** Page shell, page width, background, font stack. Run `npm run verify -- <screen>`. `size_delta_px` must be within ±2 before you add content.
3. **Top-down, one band at a time**: header → nav/sidebar → main → footer. After each band, run `npm run verify -- <screen>` and check that band's `bad_pct`.
   Same-direction drift across bands = fix the earliest band (container width, then font/wrapping, then spacing), not each band.
4. **Shared pieces** (master page, buttons, inputs, grid, validators) go in their own component + CSS, not in the screen. The next screen reuses them.
5. **Fonts**: confirm the family that actually renders (compare glyph shapes in `diff.png`), not the CSS list. Legacy pages are often Verdana/Tahoma/Arial at 11–13px.
6. **Stop** at 3 failed rounds on the same band. Report the delta; do not keep nudging pixels.
7. **Report** with the `verify` numbers and anything not verifiable from a still image (hover, disabled, hidden states).
