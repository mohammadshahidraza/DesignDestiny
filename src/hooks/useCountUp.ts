import { useEffect, useState } from "react"

/** Eased count-up from 0 to target, started when `start` flips true. */
export function useCountUp(target: number, start: boolean, duration = 1.6): number {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const progress = Math.min(1, (now - t0) / (duration * 1000))
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration])

  return value
}
