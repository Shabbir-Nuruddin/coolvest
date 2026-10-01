/*
  One liner set, drawn to scale at 10 units per cm.
  Back panel ~35 × 40 cm: 8 × 9 cells. Chest pads ~18 × 14 cm: 4 × 3 cells.
  Cells ~3.5 cm, welds between them, 4 mm vents at interior weld crossings.
  All dimensions are design targets.
*/

const CM = 10;
const CELL = 3.5 * CM;

type PanelProps = { x: number; y: number; w: number; h: number; cols: number; rows: number; id: string };

function Panel({ x, y, w, h, cols, rows, id }: PanelProps) {
  const gx = (w - cols * CELL) / (cols + 1);
  const gy = (h - rows * CELL) / (rows + 1);
  const vents: { cx: number; cy: number }[] = [];
  for (let r = 1; r < rows; r++) {
    for (let c = 1; c < cols; c++) {
      vents.push({ cx: x + c * (CELL + gx) + gx / 2, cy: y + r * (CELL + gy) + gy / 2 });
    }
  }
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#ffffff" stroke="#0d1b24" strokeWidth="2.5" />
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => (
          <rect
            key={`${id}-${r}-${c}`}
            x={x + gx + c * (CELL + gx)}
            y={y + gy + r * (CELL + gy)}
            width={CELL}
            height={CELL}
            fill="#ffe14d"
            stroke="#0d1b24"
            strokeWidth="1.25"
          />
        )),
      )}
      {vents.map((v, i) => (
        <circle key={`${id}-v${i}`} cx={v.cx} cy={v.cy} r={2.2} fill="#f2f4f3" stroke="#0d1b24" strokeWidth="1" />
      ))}
    </g>
  );
}

function Dim({ x1, y1, x2, y2, label, vertical = false }: { x1: number; y1: number; x2: number; y2: number; label: string; vertical?: boolean }) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return (
    <g stroke="#0d1b24" strokeWidth="1.25">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      {vertical ? (
        <>
          <line x1={x1 - 6} x2={x1 + 6} y1={y1} y2={y1} />
          <line x1={x2 - 6} x2={x2 + 6} y1={y2} y2={y2} />
        </>
      ) : (
        <>
          <line x1={x1} x2={x1} y1={y1 - 6} y2={y1 + 6} />
          <line x1={x2} x2={x2} y1={y2 - 6} y2={y2 + 6} />
        </>
      )}
      <g stroke="none">
        <rect
          x={vertical ? mx - 13 : mx - 40}
          y={vertical ? my - 40 : my - 10}
          width={vertical ? 26 : 80}
          height={vertical ? 80 : 20}
          fill="#f2f4f3"
        />
        <text
          x={mx}
          y={my}
          fill="#0d1b24"
          fontSize="15"
          fontWeight="700"
          textAnchor="middle"
          dominantBaseline="central"
          className="font-display tnum"
          transform={vertical ? `rotate(-90 ${mx} ${my})` : undefined}
        >
          {label}
        </text>
      </g>
    </g>
  );
}

export function LinerDrawing() {
  const back = { x: 60, y: 30, w: 35 * CM, h: 40 * CM };
  const chestA = { x: 500, y: 30, w: 18 * CM, h: 14 * CM };
  const chestB = { x: 500, y: 230, w: 18 * CM, h: 14 * CM };
  return (
    <svg
      viewBox="0 0 720 480"
      className="block h-auto w-full"
      role="img"
      aria-label="One liner set drawn to scale. A back panel about 35 by 40 centimetres with 72 cells in an 8 by 9 grid, and two chest pads about 18 by 14 centimetres with 12 cells each. Small vent holes sit where the welds cross."
    >
      <Panel {...back} cols={8} rows={9} id="back" />
      <Panel {...chestA} cols={4} rows={3} id="ca" />
      <Panel {...chestB} cols={4} rows={3} id="cb" />

      <Dim x1={back.x} y1={back.y + back.h + 26} x2={back.x + back.w} y2={back.y + back.h + 26} label="~35 cm" />
      <Dim x1={back.x - 26} y1={back.y} x2={back.x - 26} y2={back.y + back.h} label="~40 cm" vertical />
      <Dim x1={chestB.x} y1={chestB.y + chestB.h + 26} x2={chestB.x + chestB.w} y2={chestB.y + chestB.h + 26} label="~18 cm" />
      <Dim x1={chestA.x + chestA.w + 22} y1={chestA.y} x2={chestA.x + chestA.w + 22} y2={chestA.y + chestA.h} label="~14 cm" vertical />
    </svg>
  );
}
