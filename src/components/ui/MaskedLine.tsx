import type { ReactNode } from "react"
import { motion, type TargetAndTransition } from "motion/react"
import { EASE } from "../../lib/motion"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"

type Props = {
  children: ReactNode
  delay?: number
  className?: string
  /**
   * "view" — plays when scrolled into view.
   * "controlled" — plays when the `play` prop becomes true (used by the hero,
   * which waits for the preloader + fonts).
   */
  mode?: "view" | "controlled"
  play?: boolean
}

/** Masked line reveal — text slides up from a clipped container. */
export function MaskedLine({ children, delay = 0, className, mode = "view", play = true }: Props) {
  const reduced = usePrefersReducedMotion()

  const hidden: TargetAndTransition = reduced ? { opacity: 0 } : { y: "115%" }
  const shown: TargetAndTransition = reduced ? { opacity: 1 } : { y: "0%" }

  const controlled = mode === "controlled" ? { animate: play ? shown : hidden } : {}
  const view = mode === "view" ? { whileInView: shown, viewport: { once: true, amount: 0.5 } } : {}

  return (
    <span className={`block overflow-hidden pb-[0.12em] -mb-[0.12em] ${className ?? ""}`}>
      <motion.span
        className="block will-change-transform"
        initial={hidden}
        {...controlled}
        {...view}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  )
}
