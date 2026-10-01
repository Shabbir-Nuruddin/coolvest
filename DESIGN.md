---
name: CoolVest
description: A cooling undershirt for people who work in the heat, presented as a cold-chain shipping label with the worker in frame.
colors:
  signal: "#ffd400"
  signal-deep: "#e6be00"
  heat: "#c8341f"
  ink: "#0d1b24"
  ink-2: "#3c4a53"
  ink-3: "#56636b"
  crate: "#f2f4f3"
  crate-sunk: "#e4e8e6"
  paper: "#ffffff"
  hair: "#c5ccc9"
  pcm-cell: "#ffe14d"
typography:
  display:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(3.1rem, 7vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.94
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2.4rem, 5.2vw, 4.4rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.005em"
  readout:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2.6rem, 5vw, 3.6rem)"
    fontWeight: 800
    lineHeight: 1
    fontFeature: "tnum, lnum"
  title:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.25
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  body-lead:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.625
  caption:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.375
  label:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "14px"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "0.08em"
  label-sm:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "0.08em"
  button:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 700
    letterSpacing: "0.04em"
  nav:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    letterSpacing: "0.06em"
rounded:
  none: "0px"
spacing:
  gutter-sm: "16px"
  gutter: "32px"
  cell: "20px"
  gap: "48px"
  section: "80px"
  section-lg: "112px"
  container: "1240px"
components:
  button-signal:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 1.4rem"
    height: "52px"
  button-signal-hover:
    backgroundColor: "{colors.signal-deep}"
    textColor: "{colors.ink}"
  button-signal-disabled:
    backgroundColor: "{colors.crate-sunk}"
    textColor: "{colors.ink-3}"
  button-signal-compact:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.ink}"
    padding: "0 1rem"
    height: "42px"
  link-ink:
    textColor: "{colors.ink}"
    typography: "{typography.button}"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0.7rem 0.85rem"
    height: "48px"
  field-focus:
    backgroundColor: "#fff9d6"
  field-invalid:
    backgroundColor: "#fdf1ee"
    textColor: "{colors.ink}"
  label-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
  provenance-tag:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.crate}"
    typography: "{typography.label-sm}"
    padding: "2px 8px"
  nav-bar:
    backgroundColor: "{colors.crate}"
    textColor: "{colors.ink-2}"
    typography: "{typography.nav}"
    height: "64px"
  band-section-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.crate}"
---

# Design System: CoolVest

## Overview

**Creative North Star: "The Cold-Chain Label"**

CoolVest is a cold-chain object worn by a person: charged cold, carried, swapped at midday. The system dresses every surface as the paperwork of that chain: die-cut shipping labels, temperature-logger strips, handling sheets with ISO-780-style marks, lot barcodes. Two inks do almost all the work, logger ink on insulated-crate white, and a single label yellow carries action and the 28 °C hold line. The worker stays in frame; the label is addressed to them.

Density is that of a well-set consignment document: heavy 2px ink rules, square corners, condensed caps for anything a handler would read at arm's length, a plain grotesk for everything a buyer reads closely, tabular numerals for every figure. Nothing floats, glows or rounds off. Sections alternate crate and crate-sunk grounds, with one full ink section (the employer table) and an ink footer.

States print themselves rather than animate for show: the logger trace draws across the shift on entry, the quote form's status prints as a new label line, the layer peel lifts one physical plane at a time. All of it is skippable under reduced motion. The page rejects the cooling category's ice-blue product-shot-plus-feature-icons layout, and the brand rejects tactical, military, sportswear and fashion styling.

**Key Characteristics:**
- Two inks (ink on crate/paper) plus one signal yellow; heat red only where heat or an alarm is shown.
- Every container is a ruled label: 2px ink border, 0px radius, no shadow.
- Barlow Condensed caps for display, titles, labels and buttons; Archivo sentence case for reading.
- Tabular numerals on all data: times, temperatures, quantities, lot codes.
- Drawn, not decorated: SVG pictograms, barcodes, logger charts and construction drawings in single-weight ink.
- Every shipped raster and every illustrative dataset carries a visible provenance line.

## Colors

A cold, nearly colourless ground and ink, punctured by one saturated label yellow and, only where heat is the subject, a hot red.

### Primary
- **Label Yellow** (signal): the one signal. Primary buttons, the "Holds at 28 °C" strip, the 28 °C hold line in the logger chart, the highlighter behind two words of the hero headline, the active step (13:00 swap card, active peel layer number, open FAQ toggle), the printed success status, sector names and kit quantities on the ink section, text selection and the outer focus halo.
- **Deep Label Yellow** (signal-deep): hover state of signal buttons and the resting underline colour of ink links. Never a fill on its own.

### Secondary
- **Heat Red** (heat): plotted heat only (the logger air-temperature trace and its 12% area fill above the hold line, the heat contours on the body plane of the layer peel, the legend swatch) plus alarm states (field error text and invalid underline, the "inbox not connected" status headline).

### Neutral
- **Logger Ink** (ink): all text of record, every rule and border, barcodes, pictogram strokes, the ink section and footer ground, provenance tags.
- **Faded Ink** (ink-2): body copy and secondary text on light grounds, inactive nav links.
- **Pale Ink** (ink-3): field-header captions on labels ("Deliver to"), chart tick labels, inactive peel steps, placeholders, units after readouts, disabled button text.
- **Crate White** (crate): page ground, header ground at 95% opacity, text on ink.
- **Sunk Crate** (crate-sunk): alternate section ground, image wells, scrollbar track, disabled button fill.
- **Label Paper** (paper): the face of every die-cut label, fields, the routine strip, the active peel step.
- **Hairline** (hair): the logger chart's grid only.
- **PCM Cell Yellow** (pcm-cell): fill of phase-change cells in technical drawings (liner drawing, peel liner plane). A material colour, not a signal; never used on UI.

### Named Rules
**The Two-Ink Rule.** Structure is logger ink on crate or paper. Colour is earned by meaning, never by decoration; a new surface that needs a third neutral is wrong.

**The One Signal Rule.** Label yellow means "act here" or "this is the 28 °C line / the current step". It is never a background wash, a section fill or an ornament. If two yellows compete in one viewport, one of them is wrong.

**The Heat-Is-Data Rule.** Heat red appears only on plotted heat and on alarm states. It never marks a brand moment, a heading or a CTA.

## Typography

**Display Font:** Barlow Condensed (with Arial Narrow, sans-serif), weights 500 to 800 loaded via next/font
**Body Font:** Archivo (with system-ui, sans-serif), variable via next/font

**Character:** A handler's condensed grotesk in caps for everything read at a glance, against a sturdy, plain grotesk for everything read with care. Together they read as a printed label, not a brochure.

### Hierarchy
- **Display** (800, clamp(3.1rem, 7vw, 6rem), 0.94, uppercase): the hero headline only.
- **Headline** (800, clamp(2.4rem, 5.2vw, 4.4rem), 0.92, uppercase): section headings, set in the left 7 columns of the section head. The quote heading steps up to clamp(2.6rem, 6vw, 5rem); sub-headings (h3) step down to clamp(1.9rem, 3.2vw, 2.6rem) at 0.95.
- **Readout** (800, clamp(2.6rem, 5vw, 3.6rem), 1, tabular): guidance figures and routine times; units follow at 0.42em, uppercase, in pale ink.
- **Title** (700, 22px, 1.25, uppercase): list and card titles, quoted complaints, kit items; 24px in the peel list, 26px for sector names.
- **Body** (400, 17px, 1.6): reading copy, measure 60 to 68ch; lead paragraph 19px at 54ch; captions 14px at up to 70ch.
- **Label** (700, 12 to 14px, 0.05 to 0.12em tracking, uppercase): label field headers, table headers, spec keys, handling-mark captions, form labels, chart markers, provenance tags.

### Named Rules
**The Condensed Caps Rule.** Barlow Condensed is always uppercase; Archivo is never uppercase except the small tabular lot/provenance lines on labels. Headings use `text-wrap: balance`, paragraphs `pretty`.

**The Tabular Data Rule.** Any figure that is data (time, temperature, quantity, lot code, step number) is set with tabular lining numerals.

## Layout

A 12-column grid inside a 1240px container, with 16px gutters on mobile and 32px from `sm`. Columns collapse to a single stack below `lg` (1024px); the canonical desktop split is 7 + 5 (statement left, label or evidence right), with 4 + 8 and 5 + 7 for text-against-table sections. Column gap is 48px at `lg`, 40px stacked.

Sections run 80px vertical padding, 112px at `lg`, separated by full-width 2px ink rules rather than whitespace alone. Grounds alternate crate and crate-sunk; the employer section and footer invert to ink. The header is sticky, 64px, crate at 95% with a 2px ink bottom rule; the in-page anchor offset is 80px.

Tables and lists are built as ruled rows: 2px ink rules between rows, label-cell keys on the left (8.5rem spec keys, 2.5 to 3.5rem quantity/step columns), padding 12 to 24px inside cells. Mobile hides table header rows and stacks cells, keeping screen-reader prefixes. The layer peel pins for 75svh per layer with a sticky 100svh stage.

## Elevation & Depth

Flat. No surface casts a shadow. Depth is expressed by ruling (2px ink borders), by ground alternation (crate, crate-sunk, paper, ink), and in one place by real 3D: the layer peel's perspective stack, where planes physically lift away on scroll. The only box-shadow in the system is the focus halo.

### Shadow Vocabulary
- **Focus halo** (`outline: 3px solid #0d1b24; outline-offset: 3px; box-shadow: 0 0 0 6px #ffd400`): the global `:focus-visible` treatment. Fields override it with a tinted fill instead.

### Named Rules
**The Flat Label Rule.** Labels sit on the crate, they do not hover over it. No drop shadows, no offset shadows, no glow; if something needs separation, rule it.

## Shapes

Square everything (0px radius) on containers, buttons, fields, tags and toggles. Borders are 2px ink as the default and only structural weight; 1px appears only inside drawings and chart grids. Pictograms use 3px square-capped, mitred strokes in a 48-unit box (2.4 for inner detail), ink only, no fills. The hazard band (45-degree ink/yellow stripes, 10px each, 10 to 12px tall) caps a label. Barcodes are drawn bars, never images. The hero label alone sits at a slight 0.6deg tilt, as a label slapped on a crate.

### Named Rules
**The Band-Once Rule.** The hazard band appears at most once per label (hero label, kit label, quote form, footer top). It is a closure, not a divider.

## Components

### Buttons
Blunt, label-yellow, filled-in-by-hand.
- **Shape:** square (0px), 2px ink border.
- **Primary (signal):** label yellow fill, ink text in condensed caps 1.2rem, 0.04em tracking, 52px min height, 0 1.4rem padding, a drawn arrow (2.6 stroke) trailing at 0.75rem gap. Compact header variant: 42px, 1rem padding, 16px text.
- **Hover / Active:** fill deepens to signal-deep over 160ms on the label ease; press nudges down 1px.
- **Disabled / Busy:** sunk-crate fill, pale-ink text and border; busy copy reads "Printing label…".
- **Text link (ink link):** ink text with a 2px deep-yellow underline offset 5px, turning ink on hover. Used for the secondary hero action (condensed caps 19px) and inline source links (Archivo, semibold).

### Cards / Containers (die-cut label)
- **Corner Style:** square (0px).
- **Background:** label paper on crate or crate-sunk; on the ink section the label stays paper with ink text.
- **Shadow Strategy:** none (see Elevation).
- **Border:** 2px ink outer rule; internal cells divided by 2px ink rules.
- **Internal Padding:** 12px in label cells, 16 to 20px in form and table cells, 20 to 24px in routine cards.
- **Anatomy:** label field header (pale-ink label-sm) over a title-size value; image well on sunk crate; yellow signal strip; hazard band; handling-mark row of four ruled cells; barcode + lot/provenance line.

### Inputs / Fields
- **Style:** paper fill, no side borders, 2px ink underline, 0px radius, 48px min height, inherited body type. Selects carry a drawn ink chevron. Labels above in condensed caps 14px; "optional" in Archivo 12px pale ink.
- **Hover:** fill warms to #fbfbf7.
- **Focus:** the global ring is suppressed; the field fills pale yellow (#fff9d6).
- **Error:** underline turns heat red, fill #fdf1ee, message below in heat red 14px medium; focus moves to the first invalid field.
- **Form as label:** the quote form is a die-cut label, hazard band on top, fields in a 2-column ruled grid; submission status prints as a new ruled line beneath (yellow strip on success, paper with heat-red headline when the inbox is not configured).

### Navigation
- **Header:** sticky crate bar, wordmark left, five section links in condensed caps 16px (0.06em), faded ink turning ink on hover, compact signal button right. Links hide below `lg`; the quote button stays.
- **Footer:** ink ground topped by the hazard band; inverted wordmark; links in condensed caps 17px, crate at 80% turning yellow on hover.
- **Skip link:** yellow, appears fixed top-left on focus.

### Wordmark
"COOL" reversed out of an ink block, "VEST" in a 2px ink-ruled box, condensed 800 caps 24px. Inverted on ink.

### Logger Strip (signature)
An SVG temperature-logger chart: hairline grid, 2px ink axes, a 9px yellow hold band at 28 °C overlaid by a 1.5px dashed ink line, the air trace in 3px heat red that draws left to right (2.2s) when 35% visible, then a 12% heat-red fill above the hold line. Event markers are dotted ink verticals with ink-ground condensed tags ("SET A ON", "SWAP TO SET B"). All text lives in HTML so it never stretches; tick and hour labels are tabular 12px. Always ships with a legend and a caption stating the data is illustrative.

### Layer Peel (signature)
A pinned scroll scene: six drawn planes (uniform, undershirt, reflective foil, PCM liner, mesh, the person with heat contours and a yellow CORE tag) in a perspective stack; planes above the active one lift away over 700ms. Beside it, a ruled ordered list where the active step gets a paper row and a yellow number square; on mobile only the active step shows. The list carries all content; the stack is aria-hidden.

### Handling Pictograms
ISO-780-style marks drawn for real handling rules: charge cold (fridge), holds at 28 °C (thermometer), mesh to skin, liners out to wash, no battery. Each is captioned in label type; decorative uses pass an empty title and are hidden.

### Imagery and Provenance
Rasters sit in 2px-ruled image wells on sunk crate, cropped by `object-position`, and every one carries a visible provenance line in label type.
- **public/product/security-worker.webp**: illustrative photo, not a CoolVest wearer. Labelled on the page ("Illustrative photo · not a CoolVest wearer" on the hero label; "Illustrative photo" tag on the mobile crop). Also the Open Graph image.
- **public/product/undershirt-front-back.webp**: concept render, labelled ("Concept render · samples will replace it"); to be replaced by production samples.
- **Logger strip data**: illustrative, not measured; labelled in the caption under the chart.
- **Liner drawing**: drawn to scale from design targets; labelled in its figure caption.

## Do's and Don'ts

### Do:
- **Do** build every new container as a die-cut label: paper face, 2px ink rule, 0px radius, internal 2px ink cell rules.
- **Do** keep label yellow (#ffd400) for action, the 28 °C line and the current step only.
- **Do** restrict heat red (#c8341f) to plotted heat and alarm/error states.
- **Do** set headings, labels, buttons and nav in Barlow Condensed caps, and reading copy in Archivo sentence case at 17px / 1.6.
- **Do** set every figure with tabular numerals.
- **Do** draw icons, barcodes and diagrams as single-weight ink SVG in the ISO-780 manner, each stating a real handling rule.
- **Do** caption every raster, render and illustrative dataset with its provenance, in label type, on the surface where it appears.
- **Do** let states print themselves (draw-on-entry, status as a new label line) on the label ease (cubic-bezier(0.2, 0.7, 0.1, 1)), and respect reduced motion.
- **Do** mark specs as design targets wherever they appear.
- **Do** refer to the wearer with they/them.

### Don't:
- **Don't** use rounded corners, drop shadows, offset shadows or glows on any surface.
- **Don't** use ice-blue, frost or product-shot-plus-feature-icon layouts, or tactical, military, sportswear or fashion styling.
- **Don't** use yellow as a section wash or decorative fill, or red as a brand colour.
- **Don't** add a hazard band more than once per label or use it as a section divider.
- **Don't** show a price; the only commercial action is "Request a quote".
- **Don't** show wear-duration or temperature-drop figures, testimonials, ratings, customer logos or certification badges until independent testing exists.
- **Don't** present a stock, generated or concept image as a CoolVest wearer or a production sample.
