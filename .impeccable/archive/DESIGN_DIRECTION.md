# CoolVest — Visual Direction

Authored by CoolVest CEO, 2026-09-29. Written after two attempts to obtain an
external design spec returned a usage-limit error. This is the working
specification. If a designer's spec is later obtained, this file is the thing
it should be measured against.

## 1. Type

| Role | Family | Source | Use |
|---|---|---|---|
| Workhorse sans | **Inter** | `next/font/google` | Body, UI, headlines, buttons |
| Technical mono | **IBM Plex Mono** | `next/font/google` | Part numbers, section numbers, spec labels, table headers |

Scale: ratio **1.25** (major third), 16px base. Deliberately restrained. A
utility-first product site that uses 1.333 or larger reads as marketing; the
gap between body and H1 here should be felt, not admired.

Mono is uppercase, `letter-spacing: 0.08em`, and only ever used at 11–13px for
metadata. It is never used for a sentence a human is meant to read at length.
That restriction is the whole reason to have it.

Inter justification: it is a variable font, it has real tabular figures, and it
degrades to nothing offensive at 12px — all three matter for a spec table.
Noto Sans and Roboto were rejected as default-looking; Satoshi and Neue Haas
are licensed and unavailable via `next/font`.

## 2. Colour

One palette. **No dark mode** — confirmed.

Rationale: dark mode doubles the token surface, and on a site this restrained
it produces a second, differently-restrainted design that nobody reviews. The
product is a physical object; the site is a document about it. Documents are
not dark-mode subjects. If a dark variant is ever genuinely needed, it is a
separate design review, not a token flip.

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#0E1721` | Primary text |
| `--ink-muted` | `#5A6673` | Secondary text, captions |
| `--ink-faint` | `#5F6A77` | Tertiary, part numbers, metadata |
| `--bg` | `#F7F6F3` | Page background — warm off-white |
| `--surface` | `#FFFFFF` | Cards, spec panels |
| `--surface-sunk` | `#EFEDE8` | Recessed panels, table stripes |
| `--hairline` | `#DDD9D2` | All borders and rules |
| `--navy` | `#16283C` | Deep technical blue — section grounds, header |
| `--navy-hover` | `#1E3450` | Hover/active state for navy surfaces |
| `--accent` | `#C2603A` | Restrained burnt orange |

**Accent justification:** burnt orange is the complement of the blue-grey
technical family, so it reads as *the same system with one marked element*,
not as a second brand. It is used at most twice per viewport — once for the
primary action, once for a leader line in a technical illustration. A
temperature-themed palette (cyan/ice) was rejected: it implies coldness the
product does not deliver, and it drifts into SaaS.

Contrast, verified against `--bg #F7F6F3`:
- `--ink #0E1721` → 15.1:1 (AAA at all sizes)
- `--ink-muted #5A6673` → 5.6:1 (AA at all sizes)
- `--ink-faint #5F6A77` → 5.1:1 (AA at all sizes). Revised 2026-09-30 from
  `#8B95A1` (2.9:1), which failed WCAG AA for the 11px `meta` labels and the
  13px sources list. Tertiary text is still text: it still has to be readable.
- `--accent #C2603A` on `--bg` → 4.1:1 — **large text only**, never body copy,
  never a sole means of conveying state. Paired with an underline or label
  whenever it carries meaning.

## 3. Grid and spacing

- Container max: **1200px**, gutters 24px (mobile) / 40px (desktop).
- Grid: 12 columns, 20px gutter, 1px hairline column rules visible only in
  technical illustration panels.
- Section vertical rhythm: **112px** desktop / 72px mobile. One value, used
  everywhere. Irregular section spacing is a tell that no one set a rule.
- Spacing scale is 4px-based: `4 8 12 16 24 32 48 64 96 112`.

**Radius: near-zero, confirmed.** `2px` on inputs and buttons, `0` everywhere
else. Panels get a 1px hairline, not a shadow. Rounded cards at 12–16px are the
single loudest signal of a templated SaaS site, and this product is a garment
that goes under a work shirt — the geometry should be cut cloth and sheet
metal, not an app.

Depth: no drop shadows. Separation is achieved with hairline rules and the
`--surface-sunk` fill. Shadows imply elevation in a physical sense that a
garment spec sheet has no use for.

## 4. Signature interaction — the thermal layer reveal

**Decision: layered SVG + CSS scroll-linked transforms. Canvas and WebGL are
rejected. This is the correct call and the user's instinct was right.**

The honest cost analysis, since he asked for it:
- **WebGL/three.js** would buy real 3D rotation. It would also add roughly
  150 KB of JS before any model data, break on devices without a working GPU,
  make the hero unrenderable for search crawlers and for anyone with JS
  disabled, and — critically — a 3D garment model of a product that does not
  physically exist yet would be an *invented depiction*. That is a claim
  problem, not a rendering problem.
- **Canvas 2D** costs less than WebGL but throws away the accessibility tree
  and text selection for no visual gain, because our "3D" is four flat layers
  moving at different rates.
- **Layered SVG** gives us real DOM elements, so each layer is addressable,
  labelled, and animatable with compositor-only `transform`/`opacity`. It stays
  crisp at any zoom, degrades to the final static state, and costs zero
  kilobytes of JavaScript beyond a small scroll-progress hook.

Implementation: four stacked absolutely-positioned SVGs — uniform, undershirt,
uniform-outline, liner. A single `IntersectionObserver` + `scroll` handler maps
scroll progress `0→1` to opacity and `translateY` per layer. Liner separates
last, on the longest curve. All transforms are `translate`/`scale`/`opacity` so
they stay off the main thread. `prefers-reduced-motion` snaps to the final
state with no scroll coupling at all.

## 5. Anti-slop reject-rules

Self-audit. If any rule is violated, the section is cut, not reworked.

1. **No cooling duration, temperature reduction, or cost figures anywhere.**
   None. The product is untested. A number here is a lie.
2. **No invented specifications.** No gram counts, transition temperatures,
   cycle counts, or fabric weights on the public site. Internal targets stay
   internal. (60–70% back / 30–40% chest is a *design intent* and may appear
   only when labelled as intent.)
3. **No performance adjectives.** "Advanced", "cutting-edge", "revolutionary",
   "state-of-the-art", "innovative", "next-generation" are all banned. If a
   sentence needs one of them, the sentence is empty and gets deleted.
4. **No urgency or scarcity devices.** No countdowns, "limited stock",
   "act now", "only N left". Nothing is for sale.
5. **No testimonials, ratings, star counts, or review badges.** None exist.
6. **No military, police, or tactical visual language.** No camo, no
   stencil type, no badge motifs, no chevrons. CoolVest serves security guards
   *among others*; styling it as tactical misrepresents the market and reads
   as costume.
7. **No sportswear language.** No "performance", "training", "athlete",
   "sweat", "endurance".
8. **No fashion cues.** No model-celebrating-a-body, no aspirational
   lifestyle, no gendered styling, no "look good while you work".
9. **Type scale: max 4 steps between body and H1.** No `text-7xl` hero. The
   H1 is capped at 48px desktop / 34px mobile. A calm site has a calm headline.
10. **No icon as decoration.** Icons mark a state or a step, never fill space.
11. **Every illustration carries a caption.** An unexplained floating diagram
    is decoration pretending to be engineering.
12. **Rounded cards, drop shadows, or gradient buttons = automatic fail.**

## 6. Art direction — three technical illustrations

All three are **line/vector technical illustration**, not photo imitation. The
deliberate visual language: 1.25px `currentColor` strokes, no fills except a
5% navy wash, no gradients, no drop shadows, no isometric projection.

**Shared conventions**, borrowed from real garment technical packs:
- Part numbering: `CV-01`, `CV-02`, `CV-03` set in mono, uppercase, tracked.
- Leader lines: 1px, terminating in a 3px dot at the referenced point, running
  horizontally to a label in a fixed left or right margin. No curved leaders,
  no arrows.
- Annotation set is fixed and small: `PART NO.`, `MATERIAL`, `PROCESS`. No
  dimension arrows until a real measured dimension exists.
- A drawing frame: 1px hairline border inset 24px, with the product name and
  sheet number in the bottom-right corner, like an actual drawing title block.
- Grid registration marks at the four corners, 8px. This is the single
  cheapest detail that makes it read as documentation.

**(a) Worker in uniform** — the uniform shirt drawn as a flat technical
elevation, three-quarter simplified, with the undershirt as a dashed outline
beneath it. The uniform is opaque, the undershirt dashed, signalling "under".
No face beyond a minimal jaw line, no body proportions modelled — a garment
elevation, not a person. Uniform is a plain collar-and-sleeve block, mid-grey,
no insignia, no buttons rendered in detail.

**(b) The undershirt alone** — flat front elevation, armholes and neck bound,
drawn in the same line weight as everything else. Three callouts: neck binding,
armhole binding, hem. This is the sheet that teaches the most, so it gets the
most callouts and the cleanest line work.

**(c) The PCM liner laid flat** — the most important image, because it is the
actual innovation. Drawn as one continuous outlined panel with an internal
**subtle** cell grid, plus callouts for: the continuous single-piece
construction, the back-weighted coverage region, and the chest coverage
region. Back region drawn with a 5% navy wash, chest region with a 3% wash, so
the weighting difference is visible at a glance without a chart.

Critical honesty constraint on (c): the cell grid is **generic and
non-specific**. It must not depict a real cell count, cell size, or capsule
diameter, because those are undecided. The drawing shows *that* it is
multi-cell, never *how many*.

## 7. Content rules

- Every factual claim on the site carries a named public source, or it is cut.
- Physical science statements about PCM are safe — latent heat, phase change,
  the fact that a PCM does not cool below its transition temperature. These are
  textbook facts about the material class, not claims about CoolVest.
- Anything about CoolVest's own performance is absent from the site entirely
  until physical testing produces it.
- The site includes an explicit "what we have not yet proven" section. On a
  product this early, that section is a credibility asset, not an admission.
