# CoolVest Website — Status

**Path:** `C:\Users\nurud\OneDrive\Documents\OpenMaus Businesses\Cooling Vest\14_Website`
**Last build:** passing (`next build`, Next.js 15.1.6, static, 4/4 pages).
**Run it:** `npm run dev` in this folder → http://localhost:3000

---

## What is on the page now

| # | Section | Anchor | Content |
|---|---|---|---|
| 01 | Hero | — | "Cooling that lives in the fabric, not in a device." + scroll-linked SVG layer reveal |
| 02 | The material | `#how` | Three textbook PCM facts: phase change, latent heat, "a limit, not a loophole" |
| 03 | The garment | `#product` | Undershirt sheet + liner sheet (SVG technical drawings), CV-01/02/03 rules, two product photos with captions |
| 04 | Evidence | `#evidence` | The recharge-direction correction (4 steps), heat-exposure limits (27.5 °C WBGT / 20-40 min / 7-14 days), independent trial findings, source list |
| 05 | Status | `#status` | "What we have not proven yet" — 6 items, navy ground |

**Components:** `components/layer-reveal.tsx`, `components/undershirt-sheet.tsx`, `components/liner-sheet.tsx`
**Design spec:** `DESIGN_DIRECTION.md` (fonts, palette, grid, and 12 anti-slop reject-rules)

---

## Success criteria

### Done

- [x] Build passes with no type or lint errors
- [x] No text-encoding defects. Verified by codepoint scan: `page.tsx` contains exactly 5 non-ASCII characters, all correct (U+00B0 degree, U+2013 en dash, U+2014 em dash ×3). No U+FFFD anywhere in any `.md`/`.tsx`/`.css` file.
- [x] Real product photography in use, not just SVG
- [x] Every image captioned, and captions say what is concept versus what is tested
- [x] Explicit "what we have not proven yet" section
- [x] Recharge-direction correction carried onto the page (D-008)
- [x] Evidence section cites named sources
- [x] No cooling-duration, temperature-drop or price figure stated about CoolVest
- [x] Near-zero radius, no dark mode, Inter + IBM Plex Mono
- [x] Layer reveal is SVG + scroll-linked transform — no canvas, no WebGL

### Not done

- [ ] **Only 2 of 5 product images are on the page.** Three are in `public/product/` unused: `undershirt-front-back.png`, `pcm-liner-flat.png`, `liner-construction-detail.png`.
  - **Blocker on `liner-construction-detail.png`:** the image has baked-in marketing copy — "Advanced heat-sealed welding designed for long-term durability", "built for repeated use". That violates reject-rules 1 (no performance claims) and 3 (the word "advanced" is banned). Do not publish it as-is. Either crop it to the image panels without the text, or leave it out.
- [ ] Only 4 of 5 nav destinations are scroll-tested on mobile.
- [ ] No `favicon`, no `og:image`, no meta description.
- [ ] No dedicated pages — the site is a single page.
- [ ] Three technical illustrations specified in `DESIGN_DIRECTION.md` §6 exist as SVG sheets but have not been checked line-by-line against the spec's caption and part-number conventions.

---

## Evidence base

`04_Research/PCM_Evidence_Pack.md` — Sherlock's external evidence pack, transcribed
to disk 2026-09-30. Sections 1–3 complete. **Section 4 (washability / cycle life) was
never delivered and is recorded as `UNKNOWN`.**

Product media: `02_Product/` (originals) and `14_Website/public/product/` (web copies).

| Web file | Source | On page? |
|---|---|---|
| `security-worker.png` | 02_Product, 11_50_07 PM | Yes |
| `layer-board.png` | 02_Product, 12_02_25 AM | Yes |
| `undershirt-front-back.png` | 02_Product, 11_51_10 PM | No |
| `pcm-liner-flat.png` | 02_Product, 11_56_47 PM | No |
| `liner-construction-detail.png` | 02_Product, 12_06_55 AM | No — contains claims, see above |

---

## Design reference material

`10_Design/reference/animation/` — 17 saved pages (Codrops, Awwwards, Rive, Spline,
Obys, Toteme and others) collected while deciding the layer-reveal interaction. Kept
because `DESIGN_DIRECTION.md` §4 records that decision and these are what it was
decided against.
