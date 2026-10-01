import Image from "next/image";
import { LoggerStrip } from "@/components/logger-strip";
import { LayerPeel } from "@/components/layer-peel";
import { LinerDrawing } from "@/components/liner-drawing";
import { QuoteForm } from "@/components/quote-form";
import { PictoChargeCold, PictoHold28, PictoNoBattery, PictoRemoveBeforeWash, PictoSkinSide } from "@/components/pictograms";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/site";

/* ---------- small pieces ---------- */

function Wordmark({ invert = false }: { invert?: boolean }) {
  return (
    <span className="inline-flex items-stretch font-display text-[24px] font-extrabold uppercase leading-none tracking-[0.02em]">
      <span className={`px-2 py-1 ${invert ? "bg-crate text-ink" : "bg-ink text-crate"}`}>Cool</span>
      <span className={`border-2 px-2 py-[2px] ${invert ? "border-crate text-crate" : "border-ink text-ink"}`}>Vest</span>
    </span>
  );
}

function Barcode({ seed, className }: { seed: string; className?: string }) {
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  for (let i = 0; i < 46; i++) {
    const c = seed.charCodeAt(i % seed.length) + i * 7;
    const w = (c % 3) + 1;
    if (i % 2 === 0) bars.push({ x, w });
    x += w + ((c >> 2) % 2) + 1;
  }
  return (
    <svg viewBox={`0 0 ${x} 30`} preserveAspectRatio="none" className={className} aria-hidden>
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y="0" width={b.w} height="30" fill="#0d1b24" />
      ))}
    </svg>
  );
}

function Arrow({ className = "h-3.5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 14" className={className} aria-hidden>
      <path d="M0 7h17M11 1l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.6" />
    </svg>
  );
}

function SectionHead({ id, title, children }: { id?: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <header className="grid gap-5 lg:grid-cols-12 lg:gap-12">
      <h2 id={id} className="font-display text-[clamp(2.4rem,5.2vw,4.4rem)] font-extrabold uppercase leading-[0.92] lg:col-span-7">
        {title}
      </h2>
      {children && <div className="max-w-[60ch] self-end text-[17px] leading-relaxed text-ink-2 lg:col-span-5">{children}</div>}
    </header>
  );
}

const NAV = [
  { href: "#heat", label: "The heat" },
  { href: "#how", label: "How it works" },
  { href: "#routine", label: "Daily routine" },
  { href: "#employers", label: "For employers" },
  { href: "#questions", label: "Questions" },
];

const READOUT = [
  {
    value: "27.5 °C",
    unit: "WBGT",
    text: "The heat-stress index at which ACGIH guidance starts restricting heavy work for acclimatised workers. Continuous heavy work is outside the limit at every level in the table.",
    source: "CCOHS, citing ACGIH TLVs",
    href: "https://www.ccohs.ca/oshanswers/phys_agents/heat/heat_control.html",
  },
  {
    value: "20 / 40",
    unit: "min",
    text: "Minutes of work, then minutes of rest, in every hour NIOSH lists for heavy work at 40 °C. A guard at a post rarely gets that rest.",
    source: "NIOSH",
    href: "https://www.cdc.gov/niosh/docs/mining/UserFiles/works/pdfs/2017-127.pdf",
  },
  {
    value: "7–14",
    unit: "days",
    text: "How long a body takes to get used to working in heat. New and returning workers are most at risk in their first days on the job.",
    source: "NIOSH",
    href: "https://www.cdc.gov/niosh/heat-stress/recommendations/acclimatization.html",
  },
  {
    value: "~50%",
    unit: "",
    text: "In a NIOSH trial, a frozen phase-change vest cut the rate heat built up in the body to about half of wearing no cooling (5 people, 2 hours, controlled heat). That is the category, not CoolVest. We publish our own numbers after independent testing.",
    source: "NIOSH",
    href: "https://stacks.cdc.gov/view/cdc/222236",
  },
];

const COMPLAINTS = [
  { said: "It stops cooling too soon", answer: "Every worker gets two liner sets. One is in the shirt, one is charging in the fridge, and they swap at midday." },
  { said: "It's too heavy", answer: "The liner targets about 480 g of phase-change material, split across the back and upper chest, not a block on the torso." },
  { said: "It's stiff", answer: "Small cells, each sealed on its own, so the liner bends along every weld line as the wearer moves." },
  { said: "It's hard to clean", answer: "The liners slide out. The shirt goes in the washing machine like any other undershirt." },
];

const ROUTINE = [
  {
    time: "20:00",
    title: "Both sets into the fridge",
    body: "Liners recharge in a fridge or freezer. Hot water, a parked car or body heat will not recharge them.",
  },
  {
    time: "06:00",
    title: "Set A goes in",
    body: "The back panel and two chest pads slide into the shirt's pockets. The uniform goes on over the top.",
  },
  {
    time: "13:00",
    title: "Swap to set B",
    body: "Set B comes out of the site fridge. Set A goes in to recharge for tomorrow.",
  },
  {
    time: "End of shift",
    title: "Liners out, shirt in the wash",
    body: "Take every liner piece out first. The shirt is machine-washable; the liners wipe clean.",
  },
];

const SECTORS = [
  {
    sector: "Security services",
    who: "Guards at gates, lobbies, car parks",
    why: "Long static shifts at a post they can't leave. Strict uniform rules mean nothing can show.",
    needs: "A fridge in the guard room",
  },
  {
    sector: "Delivery and quick-commerce fleets",
    who: "Riders on the road through the afternoon",
    why: "No power to plug into and no water to refill. Liners swap at the store or hub.",
    needs: "A fridge at the hub",
  },
  {
    sector: "Construction and industrial",
    who: "Site crews and supervisors",
    why: "Heavy work in direct sun. It sits under a hi-vis vest or coverall without adding bulk.",
    needs: "Cold storage at the site office",
  },
  {
    sector: "Facilities management",
    who: "Gardeners, technicians, housekeeping",
    why: "Moving between hot outdoor areas and plant rooms across a shift.",
    needs: "A pantry fridge",
  },
  {
    sector: "Gulf contractors",
    who: "Outdoor crews through Gulf summers",
    why: "Works alongside midday-break rules, not instead of them.",
    needs: "Camp or site fridges",
  },
];

const FAQ = [
  {
    q: "How long does one liner set keep cooling?",
    a: "We publish measured wear-time once independent testing is complete. It will depend on air temperature, sun, how hard the person is working and fit, which is why every kit has two sets and a midday swap.",
  },
  {
    q: "How do the liners recharge?",
    a: "In a fridge or a freezer. The material has to cool well below 28 °C to set again, so leaving liners in the shade, in hot water, in a parked car or on the body will not recharge them. A site needs a fridge for the midday swap.",
  },
  {
    q: "Does this replace rest breaks, water and shade?",
    a: "No. Heat-stress guidance treats cooling garments as an extra control alongside rest, water and shade, never a substitute. CoolVest is for the hours between breaks.",
  },
  {
    q: "Will it show under the uniform?",
    a: "It is designed not to. The shirt is thin and sleeveless, and the liners sit only on the back and upper chest, with nothing on the stomach, shoulders, neck or arms.",
  },
  {
    q: "Is there anything electronic?",
    a: "No. No fan, no battery, no cable, no water. Nothing to charge except the liners in a fridge.",
  },
  {
    q: "How is it washed?",
    a: "Remove every liner piece, then machine-wash the shirt. Wipe the liners clean with a damp cloth.",
  },
  {
    q: "What sizes are there?",
    a: "The size range is confirmed with the first production run. Tell us your team's sizes in the quote request and we'll match them.",
  },
  {
    q: "What does it cost?",
    a: "Pricing is quoted per worker, by volume and by how many liner sets you need. Small pilot teams are welcome.",
  },
];

/* ---------- page ---------- */

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only z-50 bg-signal px-4 py-2 font-semibold focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>

      {/* Header */}
      <div className="sticky top-0 z-40 border-b-2 border-ink bg-crate/95 backdrop-blur-[2px]">
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-6 px-4 sm:px-8">
          <a href="#top" aria-label="CoolVest, back to top">
            <Wordmark />
          </a>
          <nav aria-label="Sections" className="hidden lg:block">
            <ul className="flex gap-7 font-display text-[16px] font-semibold uppercase tracking-[0.06em]">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="py-2 text-ink-2 transition-colors hover:text-ink">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href="#quote" className="btn-signal !min-h-[42px] !px-4 !text-[16px]">
            Request a quote
          </a>
        </div>
      </div>

      <main id="main">
        {/* ============ HERO ============ */}
        <section id="top" aria-labelledby="hero-title" className="mx-auto max-w-[1240px] px-4 pt-8 pb-14 sm:px-8 lg:pt-10 lg:pb-16">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7 lg:pt-6">
              <h1 id="hero-title" className="font-display text-[clamp(3.1rem,7vw,6rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.01em]">
                Twelve hours in the heat.{" "}
                <span className="box-decoration-clone bg-[linear-gradient(transparent_14%,#ffd400_14%,#ffd400_90%,transparent_90%)] px-[0.06em]">Their uniform</span> keeps it in.
              </h1>
              <div className="relative mt-6 h-[200px] overflow-hidden border-2 border-ink bg-crate-sunk lg:hidden">
                <Image
                  src="/product/security-worker.webp"
                  alt=""
                  fill
                  priority
                  sizes="92vw"
                  className="object-cover object-[50%_18%]"
                />
                <span className="absolute bottom-2 left-2 bg-ink px-2 py-0.5 font-display text-[12px] font-bold uppercase tracking-[0.08em] text-crate">
                  Illustrative photo
                </span>
              </div>
              <p className="mt-7 max-w-[54ch] text-[19px] leading-relaxed text-ink-2">
                Guards, riders and site crews work whole shifts through Indian and Gulf summers, buttoned into uniforms that hold heat against the body. CoolVest is a thin undershirt with phase-change liners that hold at 28 °C, worn under the uniform they already have. No fan, no battery, nothing anyone can see.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                <a href="#quote" className="btn-signal">
                  Request a quote <Arrow />
                </a>
                <a href="#how" className="link-ink font-display text-[19px] font-bold uppercase tracking-[0.04em]">
                  See how it works
                </a>
              </div>
            </div>

            {/* The shipping label */}
            <div className="lg:col-span-5">
              <div className="label mx-auto max-w-[460px] rotate-[0.6deg]">
                <div className="grid grid-cols-[1fr_auto] border-b-2 border-ink">
                  <div className="p-3">
                    <p className="font-display text-[12px] font-bold uppercase tracking-[0.12em] text-ink-3">Deliver to</p>
                    <p className="font-display text-[20px] font-bold uppercase leading-tight">The person at gate 2</p>
                    <p className="tnum text-[13px] text-ink-2">Shift 06:00–18:00 · no shade at the post</p>
                  </div>
                  <div className="flex items-center border-l-2 border-ink px-3">
                    <PictoChargeCold title="Charge cold" className="h-10 w-10" />
                  </div>
                </div>
                <div className="relative aspect-[4/3.4] overflow-hidden border-b-2 border-ink bg-crate-sunk">
                  <Image
                    src="/product/security-worker.webp"
                    alt="A security guard in a light-blue uniform shirt, tie and cap, standing at a site entrance barrier in bright sun."
                    fill
                    priority
                    sizes="(min-width: 1024px) 460px, 92vw"
                    className="object-cover object-[50%_18%]"
                  />
                  <span className="absolute bottom-3 left-3 bg-ink px-2 py-1 font-display text-[13px] font-bold uppercase tracking-[0.08em] text-crate">
                    The post it&apos;s made for
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 bg-signal px-3 py-2.5">
                  <p className="tnum font-display text-[clamp(1.6rem,3.2vw,2.15rem)] font-extrabold uppercase leading-none">Holds at 28 °C</p>
                  <PictoHold28 title="Holds at 28 °C" className="h-10 w-10 shrink-0" />
                </div>
                <div className="band h-2.5" aria-hidden />
                <ul className="grid grid-cols-4 border-y-2 border-ink" aria-label="Handling marks">
                  {[
                    { Icon: PictoChargeCold, t: "Fridge charge" },
                    { Icon: PictoSkinSide, t: "Mesh to skin" },
                    { Icon: PictoRemoveBeforeWash, t: "Liners out to wash" },
                    { Icon: PictoNoBattery, t: "No battery" },
                  ].map(({ Icon, t }, i) => (
                    <li key={t} className={`flex flex-col items-center gap-1.5 px-1 py-3 text-center ${i > 0 ? "border-l-2 border-ink" : ""}`}>
                      <Icon title={t} className="h-9 w-9" />
                      <span className="font-display text-[12px] font-bold uppercase leading-tight tracking-[0.05em]">{t}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-3 px-3 py-2.5">
                  <Barcode seed="COOLVEST-PCM28" className="h-8 w-36" />
                  <p className="tnum text-[12px] font-semibold uppercase leading-tight tracking-[0.06em] text-ink-2">
                    Lot CV-01 · PCM 28 °C
                    <br />Illustrative photo · not a CoolVest wearer
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Logger strip under both columns */}
          <div className="mt-14 border-t-2 border-ink pt-5 lg:mt-10">
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <p className="font-display text-[18px] font-bold uppercase tracking-[0.06em]">Shift log, one gate, one afternoon</p>
              <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[13px] font-medium text-ink-2">
                <li className="flex items-center gap-2">
                  <span className="inline-block h-[3px] w-6 bg-heat" aria-hidden /> Air temperature
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block h-2 w-6 border-y border-ink bg-signal" aria-hidden /> Liner holds at 28 °C
                </li>
              </ul>
            </div>
            <LoggerStrip caption="Illustrative, not measured: a late-May shift at an unshaded gate in north India. Every hour sits above 28 °C. While the liner melts it stays at 28 °C, below skin and below the day around it." />
          </div>
        </section>

        {/* ============ THE HEAT ============ */}
        <section aria-labelledby="heat" className="border-t-2 border-ink bg-crate-sunk">
          <div className="mx-auto max-w-[1240px] px-4 py-20 sm:px-8 lg:py-28">
            <SectionHead id="heat" title={<>Heat is part of the job. The people in it can't walk away.</>}>
              <p>
                A guard can't leave the gate for shade. A rider is on the road through the hottest hours. A site crew carries load in direct sun. On top of that, the uniform is buttoned, tucked, often polyester, sometimes under a vest. It keeps the heat right where it hurts.
              </p>
              <p className="mt-4">Rest, water and shade come first. CoolVest is for the hours in between, when none of those are on offer.</p>
            </SectionHead>

            <div className="mt-14 border-t-2 border-ink" role="list" aria-label="What the guidance says">
              {READOUT.map((r) => (
                <div key={r.value} role="listitem" className="grid gap-3 border-b-2 border-ink py-6 sm:grid-cols-[minmax(0,15rem)_1fr_auto] sm:items-baseline sm:gap-8">
                  <p className="tnum font-display text-[clamp(2.6rem,5vw,3.6rem)] font-extrabold leading-none">
                    {r.value}
                    {r.unit && <span className="ml-2 text-[0.42em] font-bold uppercase tracking-[0.06em] text-ink-3">{r.unit}</span>}
                  </p>
                  <p className="max-w-[68ch] text-[17px] leading-relaxed text-ink-2">{r.text}</p>
                  <a href={r.href} target="_blank" rel="noopener noreferrer" className="link-ink text-[14px] font-semibold whitespace-nowrap">
                    {r.source}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              ))}
            </div>

            {/* What workers say goes wrong */}
            <div className="mt-20 grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <h3 className="font-display text-[clamp(1.9rem,3.2vw,2.6rem)] font-extrabold uppercase leading-[0.95]">What workers say goes wrong with cooling vests</h3>
                <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-ink-2">
                  Asked in a Hong Kong study, workers ranked the same complaints again and again. CoolVest is built against that list.{" "}
                  <a href="https://www.oshc.org.hk/oshc_data/files/OSHInformation/Cooling_Vest_Study_ENG.pdf" target="_blank" rel="noopener noreferrer" className="link-ink font-semibold text-ink">
                    OSHC study<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </p>
              </div>
              <div className="lg:col-span-8">
                <div className="label">
                  <div className="hidden grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] border-b-2 border-ink bg-ink font-display text-[13px] font-bold uppercase tracking-[0.1em] text-crate sm:grid">
                    <p className="px-4 py-2">What they said</p>
                    <p className="border-l-2 border-crate/30 px-4 py-2">What CoolVest does</p>
                  </div>
                  {COMPLAINTS.map((c, i) => (
                    <div key={c.said} className={`grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] ${i > 0 ? "border-t-2 border-ink" : ""}`}>
                      <p className="px-4 pt-4 font-display text-[22px] font-bold uppercase leading-tight sm:py-4">“{c.said}”</p>
                      <p className="px-4 pt-1 pb-4 text-[16px] leading-relaxed text-ink-2 sm:border-l-2 sm:border-ink sm:py-4">{c.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ UNDER THE UNIFORM ============ */}
        <section aria-labelledby="how" className="border-t-2 border-ink">
          <div className="mx-auto max-w-[1240px] px-4 pt-20 sm:px-8 lg:pt-28">
            <SectionHead id="how" title={<>It goes under the uniform they already wear.</>}>
              <p>Six layers from the badge to the skin. Scroll to take them off one at a time.</p>
            </SectionHead>
          </div>
          <LayerPeel />
        </section>

        {/* ============ THE LINER ============ */}
        <section aria-labelledby="liner" className="border-t-2 border-ink bg-crate-sunk">
          <div className="mx-auto max-w-[1240px] px-4 py-20 sm:px-8 lg:py-28">
            <SectionHead id="liner" title={<>One liner set: a back panel and two chest pads.</>}>
              <p>Small sealed cells, welded flat, with vent holes where the welds cross. Each worker gets two full sets.</p>
            </SectionHead>

            <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
              <figure className="m-0 lg:col-span-7">
                <div className="border-2 border-ink bg-crate p-4 sm:p-6">
                  <LinerDrawing />
                </div>
                <figcaption className="mt-3 text-[14px] text-ink-2">Drawn to scale from the design targets. Back panel 8 × 9 cells, chest pads 4 × 3 cells each.</figcaption>
              </figure>

              <div className="lg:col-span-5">
                <dl className="label tnum">
                  {[
                    ["Cells", "About 3.5 cm, each sealed on its own"],
                    ["Film", "TPU, high-frequency welded"],
                    ["Vents", "4 mm holes where welds cross"],
                    ["Holds at", "About 28 °C while melting"],
                    ["Material", "Paraffin or bio-based phase-change material"],
                    ["Load", "About 480 g, roughly 75% back, 25% chest"],
                    ["Skin side", "Open mesh"],
                    ["Sun side", "Reflective layer"],
                    ["Electronics", "None"],
                  ].map(([k, v], i) => (
                    <div key={k} className={`grid grid-cols-[8.5rem_1fr] ${i > 0 ? "border-t-2 border-ink" : ""}`}>
                      <dt className="border-r-2 border-ink px-3 py-3 font-display text-[14px] font-bold uppercase tracking-[0.08em]">{k}</dt>
                      <dd className="px-3 py-3 text-[16px]">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 max-w-[52ch] text-[14px] leading-snug text-ink-2">
                  These are design targets. We replace them with measured values once production samples are tested, and we won't publish a cooling figure before then.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ ROUTINE ============ */}
        <section aria-labelledby="routine" className="border-t-2 border-ink">
          <div className="mx-auto max-w-[1240px] px-4 py-20 sm:px-8 lg:py-28">
            <SectionHead id="routine" title={<>Charge cold. Swap at one. Wash the shirt.</>}>
              <p>CoolVest runs like a small cold chain: the liners live in the fridge when they aren't on someone's back.</p>
            </SectionHead>

            <ol className="mt-14 grid border-2 border-ink bg-paper md:grid-cols-4">
              {ROUTINE.map((s, i) => (
                <li key={s.time} className={`relative p-5 lg:p-6 ${i > 0 ? "border-t-2 border-ink md:border-t-0 md:border-l-2" : ""} ${i === 2 ? "bg-signal" : ""}`}>
                  <p className="tnum font-display text-[clamp(2.2rem,3.6vw,3rem)] font-extrabold leading-none">{s.time}</p>
                  <h3 className="mt-4 font-display text-[22px] font-bold uppercase leading-tight">{s.title}</h3>
                  <p className={`mt-2 text-[15.5px] leading-relaxed ${i === 2 ? "text-ink" : "text-ink-2"}`}>{s.body}</p>
                </li>
              ))}
            </ol>

            <div className="mt-6 flex flex-col gap-4 border-2 border-ink p-5 sm:flex-row sm:items-center sm:gap-6">
              <PictoChargeCold title="Fridge" className="h-12 w-12 shrink-0" />
              <p className="max-w-[72ch] text-[16px] leading-relaxed">
                <strong className="font-display text-[19px] font-bold uppercase tracking-[0.03em]">What the site needs: one fridge.</strong>{" "}
                In the guard room, the hub or the site office, close enough that the midday swap takes minutes. Without cold storage the liners can't recharge, so we'll ask about it before we quote.
              </p>
            </div>
          </div>
        </section>

        {/* ============ EMPLOYERS ============ */}
        <section aria-labelledby="employers" className="border-t-2 border-ink bg-ink text-crate">
          <div className="mx-auto max-w-[1240px] px-4 py-20 sm:px-8 lg:py-28">
            <header className="grid gap-5 lg:grid-cols-12 lg:gap-12">
              <h2 id="employers" className="font-display text-[clamp(2.4rem,5.2vw,4.4rem)] font-extrabold uppercase leading-[0.92] lg:col-span-7">
                Sold to the people who look after a workforce.
              </h2>
              <p className="max-w-[60ch] self-end text-[17px] leading-relaxed text-crate/80 lg:col-span-5">
                CoolVest is bought per worker, by agencies, fleets and contractors who are responsible for people working outside. Here is where it fits.
              </p>
            </header>

            <div className="mt-14 border-t-2 border-crate">
              <div className="hidden grid-cols-[1.1fr_1fr_1.6fr_1fr] gap-8 border-b border-crate/30 py-3 font-display text-[13px] font-bold uppercase tracking-[0.12em] text-crate/70 lg:grid">
                <p>Sector</p>
                <p>Who wears it</p>
                <p>Why it fits</p>
                <p>Site needs</p>
              </div>
              {SECTORS.map((s) => (
                <div key={s.sector} className="grid gap-2 border-b-2 border-crate/30 py-6 lg:grid-cols-[1.1fr_1fr_1.6fr_1fr] lg:gap-8">
                  <h3 className="font-display text-[26px] font-bold uppercase leading-tight text-signal">{s.sector}</h3>
                  <p className="text-[16px] leading-relaxed">
                    <span className="sr-only">Who wears it: </span>
                    {s.who}
                  </p>
                  <p className="text-[16px] leading-relaxed text-crate/80">
                    <span className="sr-only">Why it fits: </span>
                    {s.why}
                  </p>
                  <p className="flex items-start gap-2 text-[16px] leading-relaxed">
                    <PictoChargeCold title="" className="mt-0.5 h-5 w-5 shrink-0 text-signal" />
                    <span>
                      <span className="sr-only">Site needs: </span>
                      {s.needs}
                    </span>
                  </p>
                </div>
              ))}
            </div>

            {/* Kit */}
            <div className="mt-20 grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <h3 className="font-display text-[clamp(1.9rem,3.2vw,2.6rem)] font-extrabold uppercase leading-[0.95]">One kit per worker</h3>
                <ul className="tnum mt-6 border-t-2 border-crate">
                  {[
                    ["1 ×", "CoolVest undershirt", "Sleeveless, liner pockets on back and upper chest"],
                    ["2 ×", "Liner sets", "Each one back panel and two chest pads"],
                    ["1 ×", "Care card", "Charge, swap and wash instructions for the wearer"],
                  ].map(([q, t, d]) => (
                    <li key={t} className="grid grid-cols-[3.5rem_1fr] border-b-2 border-crate/30 py-4">
                      <span className="font-display text-[26px] font-extrabold leading-none text-signal">{q}</span>
                      <span>
                        <span className="block font-display text-[22px] font-bold uppercase leading-tight">{t}</span>
                        <span className="text-[15px] text-crate/75">{d}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 max-w-[48ch] text-[16px] leading-relaxed text-crate/80">
                  Priced per worker on quote, by volume and number of liner sets. A small pilot team is a good way to start.
                </p>
                <a href="#quote" className="btn-signal mt-7">
                  Request a quote <Arrow />
                </a>
              </div>
              <figure className="label m-0 self-start text-ink lg:col-span-7">
                <div className="flex items-center justify-between border-b-2 border-ink px-3 py-2.5">
                  <p className="font-display text-[15px] font-bold uppercase tracking-[0.1em]">Contents · per worker</p>
                  <PictoRemoveBeforeWash title="" className="h-8 w-8" />
                </div>
                <div className="relative aspect-[3/2] border-b-2 border-ink bg-[#f4f4f4]">
                  <Image
                    src="/product/undershirt-front-back.webp"
                    alt="Concept render of the CoolVest undershirt, front and back: a plain white sleeveless knit with a round neck."
                    fill
                    sizes="(min-width: 1024px) 700px, 92vw"
                    className="object-contain"
                  />
                </div>
                <div className="band h-2.5" aria-hidden />
                <figcaption className="flex items-center gap-3 border-t-2 border-ink px-3 py-2.5">
                  <Barcode seed="COOLVEST-KIT" className="h-8 w-28 shrink-0" />
                  <span className="text-[12px] font-semibold uppercase leading-tight tracking-[0.06em] text-ink-2">Concept render · samples will replace it</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ============ QUESTIONS ============ */}
        <section aria-labelledby="questions" className="border-t-2 border-ink">
          <div className="mx-auto max-w-[1240px] px-4 py-20 sm:px-8 lg:py-28">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <h2 id="questions" className="font-display text-[clamp(2.4rem,5.2vw,4.4rem)] font-extrabold uppercase leading-[0.92]">
                  Straight answers
                </h2>
                <p className="mt-5 max-w-[40ch] text-[17px] leading-relaxed text-ink-2">
                  Phase-change cooling works only while the material is melting, and it needs cold to reset. We'd rather say that up front.
                </p>
              </div>
              <div className="border-t-2 border-ink lg:col-span-8">
                {FAQ.map((f) => (
                  <details key={f.q} className="group border-b-2 border-ink">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-[clamp(1.25rem,2vw,1.55rem)] font-bold uppercase leading-tight transition-colors hover:text-ink-2 [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span className="relative h-7 w-7 shrink-0 border-2 border-ink transition-colors group-open:bg-signal" aria-hidden>
                        <span className="absolute top-1/2 left-1/2 h-[2.5px] w-3.5 -translate-x-1/2 -translate-y-1/2 bg-ink" />
                        <span className="absolute top-1/2 left-1/2 h-3.5 w-[2.5px] -translate-x-1/2 -translate-y-1/2 bg-ink transition-transform group-open:scale-y-0" />
                      </span>
                    </summary>
                    <p className="max-w-[68ch] pb-6 text-[17px] leading-relaxed text-ink-2">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ QUOTE ============ */}
        <section aria-labelledby="quote" className="border-t-2 border-ink bg-crate-sunk">
          <div className="mx-auto max-w-[1240px] px-4 py-20 sm:px-8 lg:py-28">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <h2 id="quote" className="font-display text-[clamp(2.6rem,6vw,5rem)] font-extrabold uppercase leading-[0.9]">
                  Request a quote
                </h2>
                <p className="mt-5 max-w-[46ch] text-[18px] leading-relaxed text-ink-2">
                  Tell us who's working in the heat and where. We'll come back with a price per worker, a pilot option and a lead time.
                </p>
                <ol className="mt-8 border-t-2 border-ink">
                  {[
                    "We reply with a few questions: shift length, uniform, sizes, fridge access.",
                    "You get a quote per worker, by volume and liner sets.",
                    "Start with a pilot team, then roll out.",
                  ].map((t, i) => (
                    <li key={t} className="grid grid-cols-[2.5rem_1fr] border-b-2 border-ink py-3.5 text-[16px] leading-snug">
                      <span className="tnum font-display text-[20px] font-extrabold">{i + 1}</span>
                      {t}
                    </li>
                  ))}
                </ol>
                {(CONTACT_EMAIL || CONTACT_PHONE) && (
                  <p className="mt-6 text-[16px] text-ink-2">
                    Or reach us directly
                    {CONTACT_EMAIL && (
                      <>
                        {" "}at{" "}
                        <a className="link-ink font-semibold text-ink" href={`mailto:${CONTACT_EMAIL}`}>
                          {CONTACT_EMAIL}
                        </a>
                      </>
                    )}
                    {CONTACT_PHONE && (
                      <>
                        {CONTACT_EMAIL ? " or " : " on "}
                        <a className="link-ink tnum font-semibold text-ink" href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}>
                          {CONTACT_PHONE}
                        </a>
                      </>
                    )}
                    .
                  </p>
                )}
              </div>
              <div className="lg:col-span-7">
                <QuoteForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-ink bg-ink text-crate">
        <div className="band h-2.5" aria-hidden />
        <div className="mx-auto grid max-w-[1240px] gap-10 px-4 py-14 sm:px-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark invert />
            <p className="mt-5 max-w-[42ch] text-[16px] leading-relaxed text-crate/80">
              A cooling undershirt for people who work in the heat. Made for India and the Gulf.
            </p>
          </div>
          <nav aria-label="Footer" className="md:col-span-3">
            <ul className="space-y-2 font-display text-[17px] font-semibold uppercase tracking-[0.05em]">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-crate/80 transition-colors hover:text-signal">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-4">
            <p className="max-w-[44ch] text-[14px] leading-relaxed text-crate/70">
              Cooling garments support rest, water and shade at work. They don't replace them. If someone shows signs of heat illness, stop work, cool them and get medical help.
            </p>
            <p className="tnum mt-6 text-[13px] text-crate/60">© 2026 CoolVest</p>
          </div>
        </div>
      </footer>
    </>
  );
}
