"use client";

import { useEffect, useRef, useState } from "react";

/*
  A temperature-logger strip chart. The heat curve prints itself when the
  strip enters the viewport, the way a logger trace builds across a shift.
  The data is illustrative and labelled as such wherever this renders.
*/

const HOURS = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
// Illustrative air temperature at an unshaded gate, north India, late May.
const AIR = [31, 33, 35, 37, 39, 41, 42, 43, 44, 44, 43, 41, 39];

const W = 1000;
const H = 260;
const PAD = { l: 52, r: 18, t: 22, b: 36 };
const T_MIN = 20;
const T_MAX = 48;

const x = (i: number) => PAD.l + (i / (HOURS.length - 1)) * (W - PAD.l - PAD.r);
const y = (t: number) => PAD.t + ((T_MAX - t) / (T_MAX - T_MIN)) * (H - PAD.t - PAD.b);

const TICKS = [20, 28, 36, 44];
const MARKERS = [
  { i: 0, t: "SET A ON" },
  { i: 7, t: "SWAP TO SET B" },
];

function curve(values: number[]) {
  // Monotone-ish smoothing with short horizontal handles.
  return values
    .map((v, i) => {
      if (i === 0) return `M${x(0)},${y(v)}`;
      const cx = (x(i - 1) + x(i)) / 2;
      return `C${cx},${y(values[i - 1])} ${cx},${y(v)} ${x(i)},${y(v)}`;
    })
    .join(" ");
}

type Props = {
  compact?: boolean;
  showMarkers?: boolean;
  caption?: string;
};

export function LoggerStrip({ compact = false, showMarkers = true, caption }: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const heatPath = curve(AIR);
  const areaPath = `${heatPath} L${x(HOURS.length - 1)},${y(28)} L${x(0)},${y(28)} Z`;

  return (
    <figure className="m-0">
      <div className="relative">
        <svg
          ref={ref}
          viewBox={`0 0 ${W} ${H}`}
          className={`block w-full ${compact ? "h-[150px] sm:h-[190px]" : "h-[200px] sm:h-[260px]"}`}
          preserveAspectRatio="none"
          role="img"
          aria-label="Illustrative logger trace: air temperature at an unshaded gate rises from 31 °C at 06:00 to 44 °C at 15:00 and stays above 28 °C for the whole shift. The liner holds at 28 °C while it melts."
          data-drawn={drawn ? "true" : "false"}
        >
          <defs>
            <pattern id="logger-grid" width={W / 24} height={(H - PAD.t - PAD.b) / 7} patternUnits="userSpaceOnUse" x={PAD.l} y={PAD.t}>
              <path d={`M${W / 24} 0V${H}M0 0H${W}`} stroke="#c5ccc9" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            </pattern>
          </defs>

          <rect x={PAD.l} y={PAD.t} width={W - PAD.l - PAD.r} height={H - PAD.t - PAD.b} fill="url(#logger-grid)" />

          {/* heat above the hold line */}
          <path
            d={areaPath}
            fill="#c8341f"
            style={{
              opacity: drawn ? 0.12 : 0,
              transition: "opacity 900ms cubic-bezier(0.2,0.7,0.1,1) 1400ms",
            }}
          />

          {/* 28 °C hold line */}
          <line x1={PAD.l} x2={W - PAD.r} y1={y(28)} y2={y(28)} stroke="#ffd400" strokeWidth="9" vectorEffect="non-scaling-stroke" />
          <line x1={PAD.l} x2={W - PAD.r} y1={y(28)} y2={y(28)} stroke="#0d1b24" strokeWidth="1.5" strokeDasharray="6 5" vectorEffect="non-scaling-stroke" />

          {/* heat trace */}
          <path
            d={heatPath}
            fill="none"
            stroke="#c8341f"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
            style={{
              clipPath: drawn ? "inset(-10px 0 -10px 0)" : "inset(-10px 100% -10px 0)",
              transition: "clip-path 2200ms cubic-bezier(0.45,0,0.2,1)",
            }}
          />

          {/* axis */}
          <line x1={PAD.l} x2={PAD.l} y1={PAD.t} y2={H - PAD.b} stroke="#0d1b24" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <line x1={PAD.l} x2={W - PAD.r} y1={H - PAD.b} y2={H - PAD.b} stroke="#0d1b24" strokeWidth="2" vectorEffect="non-scaling-stroke" />

          {showMarkers &&
            MARKERS.map((m) => (
              <line key={m.t} x1={x(m.i)} x2={x(m.i)} y1={PAD.t} y2={H - PAD.b} stroke="#0d1b24" strokeWidth="2" strokeDasharray="2 4" vectorEffect="non-scaling-stroke" />
            ))}
        </svg>

        {/* Text lives in HTML so it never stretches with the chart. */}
        {TICKS.map((t) => (
          <span
            key={t}
            aria-hidden
            className={`tnum absolute left-0 -translate-y-1/2 pr-2 text-[12px] font-semibold ${t === 28 ? "text-ink" : "text-ink-3"}`}
            style={{ top: `${(y(t) / H) * 100}%` }}
          >
            {t}°
          </span>
        ))}
        {showMarkers &&
          MARKERS.map((m) => (
            <span
              key={m.t}
              aria-hidden
              className="absolute top-0 ml-2 bg-ink px-1.5 py-0.5 font-display text-[12px] font-bold tracking-[0.06em] text-crate"
              style={{ left: `${(x(m.i) / W) * 100}%` }}
            >
              {m.t}
            </span>
          ))}
      </div>
      <div className="tnum relative mt-1.5 h-5 text-[12px] font-semibold text-ink-3" aria-hidden>
        {HOURS.map((h, i) =>
          i % 2 === 0 ? (
            <span key={h} className="absolute -translate-x-1/2" style={{ left: `${(x(i) / W) * 100}%` }}>
              {String(h).padStart(2, "0")}:00
            </span>
          ) : null,
        )}
      </div>
      {caption && <figcaption className="mt-3 max-w-[70ch] text-[14px] leading-snug text-ink-2">{caption}</figcaption>}
    </figure>
  );
}
