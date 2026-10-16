import type { ReactNode } from "react"

type Props = {
  children: ReactNode
  /** Seconds for one full loop. */
  duration?: number
  reverse?: boolean
  className?: string
}

/** Seamless infinite marquee. Content is duplicated so the loop is gapless. */
export function Marquee({ children, duration = 32, reverse = false, className }: Props) {
  return (
    <div className={`overflow-hidden ${className ?? ""}`} aria-hidden="true">
      <div
        className="marquee-track"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="marquee-chunk">{children}</div>
        <div className="marquee-chunk">{children}</div>
      </div>
    </div>
  )
}
