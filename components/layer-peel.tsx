"use client";

import { useEffect, useRef, useState } from "react";

/*
  Six physical planes, outermost first. As the section scrolls, each plane
  above the current one lifts away, so the reader peels the uniform back to
  skin. The text list beside it is always fully readable; motion only adds
  the order, it never hides content.
*/

const LAYERS = [
  {
    name: "Their uniform",
    body: "Nothing changes on the outside. The same shirt, the same badge, the same dress code the site already enforces.",
  },
  {
    name: "CoolVest undershirt",
    body: "A thin, sleeveless knit with liner pockets on the back and upper chest only. Nothing on the stomach, shoulders, neck or arms, so the uniform hangs the way it should.",
  },
  {
    name: "Reflective layer",
    body: "Faces outward. It slows the heat coming in from the sun and the uniform, so the liner spends its capacity on the body instead.",
  },
  {
    name: "Phase-change liner",
    body: "Small sealed cells of phase-change material in welded TPU. While the material melts it holds at about 28 °C, drawing heat out of the skin beside it.",
  },
  {
    name: "Mesh, skin side",
    body: "Open mesh against the body, so sweat can move and the liner never sits wet on skin.",
  },
  {
    name: "The person",
    body: "The whole system exists for this layer: someone who has to stay at their post, on their route or on the site through the hottest hours.",
  },
] as const;

const TANK = "M62 12 L104 12 Q150 52 196 12 L238 12 Q234 92 268 122 L262 350 L38 350 L32 122 Q66 92 62 12 Z";
const SHIRT =
  "M40 44 L112 12 L150 34 L188 12 L260 44 L298 128 L262 146 L262 352 L38 352 L38 146 L2 128 Z";

function Plane({ index }: { index: number }) {
  switch (index) {
    case 0:
      return (
        <svg viewBox="0 0 300 360" className="h-full w-full overflow-visible">
          <defs>
            <pattern id="twill" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <path d="M0 0v7" stroke="#0d1b24" strokeWidth="1" opacity="0.35" />
            </pattern>
          </defs>
          <path d={SHIRT} fill="#e4e8e6" stroke="#0d1b24" strokeWidth="2.5" />
          <path d={SHIRT} fill="url(#twill)" />
          <path d="M150 34 V352" stroke="#0d1b24" strokeWidth="1.5" />
          <path d="M112 12 L150 60 L188 12" fill="none" stroke="#0d1b24" strokeWidth="2" />
          <rect x="78" y="118" width="48" height="56" fill="none" stroke="#0d1b24" strokeWidth="1.5" />
          <rect x="174" y="118" width="48" height="56" fill="none" stroke="#0d1b24" strokeWidth="1.5" />
          <rect x="174" y="98" width="52" height="14" fill="#0d1b24" />
          {[90, 140, 190, 240, 290].map((cy) => (
            <circle key={cy} cx="150" cy={cy} r="3" fill="#0d1b24" />
          ))}
        </svg>
      );
    case 1:
      return (
        <svg viewBox="0 0 300 360" className="h-full w-full overflow-visible">
          <defs>
            <pattern id="knit" width="6" height="6" patternUnits="userSpaceOnUse">
              <path d="M0 3h6" stroke="#d6dcd9" strokeWidth="1" />
            </pattern>
          </defs>
          <path d={TANK} fill="#ffffff" stroke="#0d1b24" strokeWidth="2.5" />
          <path d={TANK} fill="url(#knit)" />
          <rect x="72" y="70" width="58" height="46" fill="none" stroke="#0d1b24" strokeWidth="1.5" strokeDasharray="4 4" />
          <rect x="170" y="70" width="58" height="46" fill="none" stroke="#0d1b24" strokeWidth="1.5" strokeDasharray="4 4" />
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 300 360" className="h-full w-full overflow-visible">
          <defs>
            <linearGradient id="foil" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#eef1f0" />
              <stop offset="0.45" stopColor="#b9c2c0" />
              <stop offset="0.55" stopColor="#f7f9f8" />
              <stop offset="1" stopColor="#a6b0ae" />
            </linearGradient>
          </defs>
          <path d={TANK} fill="url(#foil)" stroke="#0d1b24" strokeWidth="2.5" />
        </svg>
      );
    case 3:
      return (
        <svg viewBox="0 0 300 360" className="h-full w-full overflow-visible">
          <path d={TANK} fill="none" stroke="#0d1b24" strokeWidth="1.5" strokeDasharray="5 5" />
          {Array.from({ length: 9 }).map((_, r) =>
            Array.from({ length: 8 }).map((_, c) => (
              <rect key={`${r}-${c}`} x={74 + c * 19.5} y={118 + r * 24} width="16.5" height="21" fill="#ffe14d" stroke="#0d1b24" strokeWidth="1.5" />
            )),
          )}
        </svg>
      );
    case 4:
      return (
        <svg viewBox="0 0 300 360" className="h-full w-full overflow-visible">
          <defs>
            <pattern id="mesh" width="9" height="9" patternUnits="userSpaceOnUse">
              <circle cx="4.5" cy="4.5" r="2.3" fill="#0d1b24" />
            </pattern>
          </defs>
          <path d={TANK} fill="#f2f4f3" stroke="#0d1b24" strokeWidth="2.5" />
          <path d={TANK} fill="url(#mesh)" opacity="0.55" />
        </svg>
      );
    default:
      // The person: a body outline with heat contours drawn inward from the
      // skin, the hottest at the core where the liner sits.
      return (
        <svg viewBox="0 0 300 360" className="h-full w-full overflow-visible">
          <path d={TANK} fill="#f2f4f3" stroke="#0d1b24" strokeWidth="2.5" />
          {[0.84, 0.68, 0.52, 0.36].map((k, i) => (
            <path
              key={k}
              d={TANK}
              fill="none"
              stroke="#c8341f"
              strokeWidth={1.5 + i * 0.5}
              transform={`translate(${150 * (1 - k)} ${190 * (1 - k)}) scale(${k})`}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <rect x="110" y="176" width="80" height="26" fill="#ffd400" stroke="#0d1b24" strokeWidth="2" />
          <text x="150" y="194" textAnchor="middle" fontSize="15" fontWeight="800" fill="#0d1b24" className="font-display">CORE</text>
        </svg>
      );
  }
}

export function LayerPeel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
      setActive(Math.min(LAYERS.length - 1, Math.floor(p * LAYERS.length)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative" style={{ height: `${LAYERS.length * 75}svh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-6 px-4 sm:px-8 lg:grid-cols-12 lg:gap-12">
          {/* Stack */}
          <div className="relative h-[38svh] lg:col-span-7 lg:h-[70svh]" aria-hidden>
            <div className="absolute inset-0 flex items-center justify-center [perspective:1800px]">
              <div
                className="relative aspect-[300/360] h-[78%] [transform-style:preserve-3d]"
                style={{ transform: "rotateX(54deg) rotateZ(-32deg)" }}
              >
                {LAYERS.map((_, i) => {
                  const lifted = i < active;
                  const z = (LAYERS.length - 1 - i) * 34;
                  return (
                    <div
                      key={i}
                      className="absolute inset-0 [transform-style:preserve-3d]"
                      style={{
                        transform: lifted ? `translate3d(-40px,-260px,${z + 420}px)` : `translate3d(0,0,${z}px)`,
                        opacity: lifted ? 0 : 1,
                        transition: "transform 700ms cubic-bezier(0.2,0.7,0.1,1), opacity 500ms cubic-bezier(0.2,0.7,0.1,1)",
                        filter: i === active ? "none" : "saturate(0.85)",
                      }}
                    >
                      <Plane index={i} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Readable list */}
          <ol className="lg:col-span-5">
            {LAYERS.map((l, i) => {
              const on = i === active;
              return (
                <li
                  key={l.name}
                  className={`grid grid-cols-[2.25rem_1fr] border-t-2 border-ink py-2.5 transition-colors duration-300 last:border-b-2 lg:py-3.5 ${
                    on ? "bg-paper" : ""
                  } ${!on ? "max-lg:hidden" : ""}`}
                  aria-current={on ? "step" : undefined}
                >
                  <span
                    className={`tnum mt-0.5 flex h-7 w-7 items-center justify-center font-display text-[15px] font-bold ${
                      on ? "bg-signal text-ink outline-2 outline-ink" : "text-ink-3"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="pr-3">
                    <h3 className={`font-display text-[24px] font-bold uppercase leading-none tracking-[0.02em] ${on ? "text-ink" : "text-ink-3"}`}>
                      {l.name}
                    </h3>
                    <p
                      className={`overflow-hidden text-[15.5px] leading-snug text-ink-2 transition-all duration-500 ${
                        on ? "mt-2 max-h-40 opacity-100" : "max-h-0 opacity-0 lg:max-h-0"
                      }`}
                    >
                      {l.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
