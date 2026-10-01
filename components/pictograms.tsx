/*
  Handling pictograms in the manner of ISO 780 package marks:
  heavy single-weight strokes in a ruled square, no fills except ink.
  Drawn for CoolVest; each one states a real handling rule.
*/

type P = { className?: string; title: string };

const frame = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 3,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
};

const label = (title: string) =>
  title ? { role: "img" as const, "aria-label": title } : { "aria-hidden": true as const };

/** Charge in a fridge or freezer */
export function PictoChargeCold({ className, title }: P) {
  return (
    <svg {...frame} className={className} {...label(title)}>
      <rect x="11" y="5" width="26" height="38" />
      <path d="M11 19h26M15 10v5M15 24v8" />
      {/* snowflake */}
      <path d="M28 25v12M23 28l10 6M33 28l-10 6" strokeWidth={2.4} />
    </svg>
  );
}

/** This side to skin (mesh) */
export function PictoSkinSide({ className, title }: P) {
  return (
    <svg {...frame} className={className} {...label(title)}>
      <path d="M8 40h32" />
      <path d="M17 33V12M11 18l6-6 6 6" />
      <path d="M31 33V12M25 18l6-6 6 6" />
    </svg>
  );
}

/** Remove liners before washing */
export function PictoRemoveBeforeWash({ className, title }: P) {
  return (
    <svg {...frame} className={className} {...label(title)}>
      <path d="M6 14l4 26h28l4-26" />
      <path d="M6 14c3 3 6 3 9 0s6-3 9 0 6 3 9 0 6-3 9 0" strokeWidth={2.4} />
      <rect x="17" y="22" width="14" height="12" strokeWidth={2.4} />
      <path d="M8 6l32 36" />
    </svg>
  );
}

/** Holds at 28 °C */
export function PictoHold28({ className, title }: P) {
  return (
    <svg {...frame} className={className} {...label(title)}>
      <path d="M20 8a4 4 0 0 1 8 0v20a8 8 0 1 1-8 0z" />
      <path d="M24 16v16" />
      <path d="M32 18h8M32 24h5" strokeWidth={2.4} />
    </svg>
  );
}

/** No electronics */
export function PictoNoBattery({ className, title }: P) {
  return (
    <svg {...frame} className={className} {...label(title)}>
      <rect x="8" y="15" width="28" height="18" />
      <path d="M36 21h4v6h-4" />
      <path d="M6 40L42 8" />
    </svg>
  );
}
