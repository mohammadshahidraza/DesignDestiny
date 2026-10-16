import type { Variants } from "motion/react"

/** Signature easing used for all reveals — fast start, long luxurious settle. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
export const EASE_SOFT: [number, number, number, number] = [0.33, 1, 0.68, 1]

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
}

export function staggerParent(stagger = 0.08, delay = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }
}
