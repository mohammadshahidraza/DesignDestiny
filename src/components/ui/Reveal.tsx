import type { ReactNode } from "react"
import { motion } from "motion/react"
import { EASE } from "../../lib/motion"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"

type Props = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
  amount?: number
}

/** Scroll-triggered fade + rise reveal. */
export function Reveal({ children, delay = 0, y = 28, className, once = true, amount = 0.3 }: Props) {
  const reduced = usePrefersReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
