import type { ReactNode } from "react"

/**
 * In-brand placeholder artwork (abstract, clearly labelled samples).
 * Drawn as inline SVG so it stays sharp at any size and adds zero image weight.
 */

export type CoverVariant =
  | "monogram"
  | "orbit"
  | "specimen"
  | "grid"
  | "cards"
  | "halftone"
  | "social"
  | "poster"

const AMBER = "#F6B125"
const num = (n: number) => String(n + 1).padStart(2, "0")

export function CoverArt({
  variant,
  seed = 0,
  label,
}: {
  variant: CoverVariant
  seed?: number
  label?: string
}) {
  return (
    <svg
      viewBox="0 0 640 800"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label={label ?? "Sample placeholder artwork"}
    >
      <rect width="640" height="800" fill="#000000" />
      {variant === "monogram" && <Monogram />}
      {variant === "orbit" && <Orbit seed={seed} />}
      {variant === "specimen" && <Specimen seed={seed} />}
      {variant === "grid" && <Grid seed={seed} />}
      {variant === "cards" && <Cards seed={seed} />}
      {variant === "halftone" && <Halftone seed={seed} />}
      {variant === "social" && <Social seed={seed} />}
      {variant === "poster" && <Poster seed={seed} />}
    </svg>
  )
}

function Monogram() {
  return (
    <>
      <circle cx={320} cy={380} r={200} fill="none" stroke={AMBER} strokeOpacity="0.45" strokeWidth="2" />
      <circle
        cx={320}
        cy={380}
        r={244}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.1"
        strokeWidth="1"
        strokeDasharray="3 12"
      />
      <line x1={60} y1={380} x2={196} y2={380} stroke="#ffffff" strokeOpacity="0.14" />
      <line x1={444} y1={380} x2={580} y2={380} stroke="#ffffff" strokeOpacity="0.14" />
      <text
        x={320}
        y={448}
        textAnchor="middle"
        fontFamily="'Clash Display', sans-serif"
        fontWeight={600}
        fontSize={250}
        fill={AMBER}
      >
        D
      </text>
      <Caption>MONOGRAM STUDY</Caption>
    </>
  )
}

function Orbit({ seed }: { seed: number }) {
  const r = 90 + (seed % 3) * 26
  return (
    <>
      {[r, r + 60, r + 120].map((radius, i) => (
        <circle
          key={i}
          cx={320}
          cy={390}
          r={radius}
          fill="none"
          stroke="#ffffff"
          strokeOpacity={0.1 + i * 0.03}
          strokeWidth="1"
        />
      ))}
      <circle
        cx={320}
        cy={390}
        r={r + 90}
        fill="none"
        stroke={AMBER}
        strokeOpacity="0.7"
        strokeWidth="2"
        strokeDasharray="230 900"
        strokeLinecap="round"
        transform="rotate(-60 320 390)"
      />
      <circle cx={320 + r + 60} cy={390} r={7} fill={AMBER} />
      <circle cx={320 - (r + 120)} cy={390} r={4} fill="#ffffff" fillOpacity="0.5" />
      <text
        x={60}
        y={130}
        fontFamily="'Clash Display', sans-serif"
        fontSize={64}
        fontWeight={600}
        fill="#ffffff"
        fillOpacity="0.9"
      >
        N°{num(seed)}
      </text>
      <Caption>ORBIT STUDY</Caption>
    </>
  )
}

function Specimen({ seed }: { seed: number }) {
  return (
    <>
      <text x={70} y={330} fontFamily="'Clash Display', sans-serif" fontWeight={600} fontSize={270} fill={AMBER}>
        Aa
      </text>
      <line x1={70} y1={360} x2={570} y2={360} stroke="#ffffff" strokeOpacity="0.25" />
      <line x1={70} y1={470} x2={570} y2={470} stroke="#ffffff" strokeOpacity="0.12" />
      {Array.from({ length: 4 }).map((_, i) => (
        <rect
          key={i}
          x={70}
          y={560 + i * 34}
          width={i === 3 ? 260 : 460 - i * 60}
          height={10}
          rx={5}
          fill="#ffffff"
          fillOpacity={0.14}
        />
      ))}
      <Caption>TYPE SPECIMEN — {num(seed)}</Caption>
    </>
  )
}

function Grid({ seed }: { seed: number }) {
  const cells = []
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 8; j++) {
      const filled = (i * 8 + j + seed) % 9 === 4
      cells.push(
        <rect
          key={`${i}-${j}`}
          x={48 + i * 92}
          y={44 + j * 90}
          width={64}
          height={64}
          rx={8}
          fill={filled ? AMBER : "#ffffff"}
          fillOpacity={filled ? 1 : 0.05}
          stroke="#ffffff"
          strokeOpacity={filled ? 0 : 0.14}
        />,
      )
    }
  }
  return <>{cells}</>
}

function Cards({ seed }: { seed: number }) {
  const offset = (seed % 2) * 20
  return (
    <g>
      <g transform="rotate(-9 320 400)">
        <rect x={190} y={170} width={260} height={380} rx={18} fill="none" stroke="#ffffff" strokeOpacity="0.2" />
      </g>
      <g transform="rotate(9 320 400)">
        <rect
          x={190}
          y={230}
          width={260}
          height={380}
          rx={18}
          fill="#ffffff"
          fillOpacity="0.05"
          stroke="#ffffff"
          strokeOpacity="0.14"
        />
      </g>
      <rect x={190} y={280 + offset} width={260} height={320} rx={18} fill={AMBER} />
      <text
        x={320}
        y={425 + offset}
        textAnchor="middle"
        fontFamily="'Clash Display', sans-serif"
        fontWeight={600}
        fontSize={72}
        fill="#000000"
      >
        DD
      </text>
      <text
        x={320}
        y={485 + offset}
        textAnchor="middle"
        fontFamily="'Satoshi', sans-serif"
        fontSize={18}
        letterSpacing={8}
        fill="#000000"
        fillOpacity={0.7}
      >
        SAMPLE
      </text>
    </g>
  )
}

function Halftone({ seed }: { seed: number }) {
  const dots = []
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 20; j++) {
      const x = 30 + i * 39
      const y = 30 + j * 39
      const d = Math.hypot(x - 320, y - 360) / 480
      const r = Math.max(0.8, 9.5 * Math.pow(1 - d, 1.6))
      if (r < 1.3) continue
      dots.push(
        <circle
          key={`${i}-${j}`}
          cx={x}
          cy={y}
          r={r}
          fill={AMBER}
          fillOpacity={0.35 + (1 - Math.min(d, 1)) * 0.55}
        />,
      )
    }
  }
  return (
    <>
      {dots}
      <Caption>HALFTONE — {num(seed)}</Caption>
    </>
  )
}

function Social({ seed }: { seed: number }) {
  const highlightIndex = seed % 3
  return (
    <>
      {[0, 1, 2].map((i) => {
        const x = 78 + i * 170
        const tilt = (i - 1) * 3
        const highlight = i === highlightIndex
        return (
          <g key={i} transform={`rotate(${tilt} ${x + 70} 400)`}>
            <rect
              x={x}
              y={220}
              width={140}
              height={280}
              rx={16}
              fill={highlight ? AMBER : "#ffffff"}
              fillOpacity={highlight ? 1 : 0.05}
              stroke="#ffffff"
              strokeOpacity={highlight ? 0 : 0.16}
            />
            <circle cx={x + 70} cy={330} r={30} fill={highlight ? "#000000" : AMBER} />
            <rect
              x={x + 30}
              y={400}
              width={80}
              height={8}
              rx={4}
              fill={highlight ? "#000000" : "#ffffff"}
              fillOpacity={highlight ? 0.85 : 0.3}
            />
            <rect
              x={x + 30}
              y={425}
              width={56}
              height={8}
              rx={4}
              fill={highlight ? "#000000" : "#ffffff"}
              fillOpacity={highlight ? 0.6 : 0.2}
            />
          </g>
        )
      })}
      <Caption>SOCIAL SET — {num(seed)}</Caption>
    </>
  )
}

function Poster({ seed }: { seed: number }) {
  return (
    <>
      <text
        x={62}
        y={300}
        fontFamily="'Clash Display', sans-serif"
        fontWeight={700}
        fontSize={130}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.4"
        strokeWidth="2"
      >
        POSTER
      </text>
      <text x={62} y={450} fontFamily="'Clash Display', sans-serif" fontWeight={700} fontSize={130} fill={AMBER}>
        SERIES
      </text>
      <line x1={62} y1={520} x2={578} y2={520} stroke={AMBER} strokeWidth="3" />
      <text x={62} y={580} fontFamily="'Satoshi', sans-serif" fontSize={22} fill="#ffffff" fillOpacity={0.55}>
        Two-colour print experiment
      </text>
      <text x={62} y={620} fontFamily="'Satoshi', sans-serif" fontSize={22} fill="#ffffff" fillOpacity={0.55}>
        Edition N°{num(seed)} — placeholder artwork
      </text>
      <circle cx={512} cy={160} r={46} fill="none" stroke={AMBER} strokeWidth="2" />
      <circle cx={512} cy={160} r={8} fill={AMBER} />
    </>
  )
}

function Caption({ children }: { children: ReactNode }) {
  return (
    <text
      x={60}
      y={736}
      fontFamily="'Satoshi', sans-serif"
      fontSize={20}
      letterSpacing={6}
      fill="#ffffff"
      fillOpacity={0.35}
    >
      {children}
    </text>
  )
}
