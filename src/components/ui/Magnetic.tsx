import { useRef, type MouseEvent, type ReactNode } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"
import { useMediaQuery } from "../../hooks/useMediaQuery"

type Props = {
  children: ReactNode
  strength?: number
  className?: string
}

/** Element drifts gently toward the cursor. Disabled on touch / reduced motion. */
export function Magnetic({ children, strength = 0.3, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 })

  const reduced = usePrefersReducedMotion()
  const finePointer = useMediaQuery("(pointer: fine)")
  const enabled = !reduced && finePointer

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!enabled || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={enabled ? { x: springX, y: springY } : undefined}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  )
}
