import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import { EASE } from "../../lib/motion"
import { prefersReducedMotion } from "../../lib/scroll"

const TOTAL_MS = 2000

const panelTop = {
  initial: { y: 0 },
  animate: { y: 0 },
  exit: { y: "-101%", transition: { duration: 0.75, ease: EASE, delay: 0.15 } },
}
const panelBottom = {
  initial: { y: 0 },
  animate: { y: 0 },
  exit: { y: "101%", transition: { duration: 0.75, ease: EASE, delay: 0.15 } },
}

/**
 * Branded intro: the "D" monogram draws itself, the wordmark assembles,
 * a counter runs, then the black panels split away to reveal the site.
 * Click / key press skips it. Never shown for reduced-motion users.
 */
export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [percent, setPercent] = useState(0)
  const doneRef = useRef(false)

  useEffect(() => {
    const finish = () => {
      if (doneRef.current) return
      doneRef.current = true
      onComplete()
    }

    if (prefersReducedMotion()) {
      finish()
      return
    }

    const t0 = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / TOTAL_MS)
      setPercent(Math.round(p * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else finish()
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener("keydown", finish)
    window.addEventListener("pointerdown", finish)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("keydown", finish)
      window.removeEventListener("pointerdown", finish)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[120]"
      initial="initial"
      animate="animate"
      exit="exit"
      aria-hidden="true"
    >
      <motion.div className="absolute left-0 top-0 h-1/2 w-full bg-black" variants={panelTop} />
      <motion.div
        className="absolute bottom-0 left-0 h-1/2 w-full bg-black"
        variants={panelBottom}
      />

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-8"
        variants={{
          initial: { opacity: 1 },
          animate: { opacity: 1 },
          exit: { opacity: 0, y: -24, transition: { duration: 0.35, ease: EASE } },
        }}
      >
        <svg viewBox="0 0 140 140" width="96" height="96" fill="none" aria-hidden="true">
          <motion.path
            d="M40 118 V22 H66 A48 48 0 0 1 66 118 H40"
            stroke="#F6B125"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.05, ease: "easeInOut" }}
          />
        </svg>
        <div className="font-display flex items-baseline gap-2 text-2xl font-semibold tracking-tight">
          <motion.span
            className="text-white"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7, ease: EASE }}
          >
            Design
          </motion.span>
          <motion.span
            className="text-amber"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.7, ease: EASE }}
          >
            Destiny
          </motion.span>
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-x-0 bottom-0 flex items-end justify-between px-6 pb-6 md:px-10 md:pb-8"
        variants={{
          initial: { opacity: 1 },
          animate: { opacity: 1 },
          exit: { opacity: 0, transition: { duration: 0.3 } },
        }}
      >
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
            Loading experience
          </p>
          <div className="mt-3 h-px w-40 overflow-hidden bg-white/15">
            <div
              className="h-full w-full origin-left bg-amber transition-transform duration-100 ease-linear"
              style={{ transform: `scaleX(${percent / 100})` }}
            />
          </div>
        </div>
        <span className="font-display text-4xl text-white/80 tabular-nums md:text-5xl">
          {percent}%
        </span>
      </motion.div>
    </motion.div>
  )
}
