import Lenis from "lenis"

let lenis: Lenis | null = null
let rafId = 0

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}

/** Initialise Lenis smooth scrolling once. Skipped for reduced-motion users. */
export function initLenis(): Lenis | null {
  if (lenis || prefersReducedMotion()) return lenis
  lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })
  const raf = (time: number) => {
    lenis?.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)
  return lenis
}

export function destroyLenis(): void {
  cancelAnimationFrame(rafId)
  lenis?.destroy()
  lenis = null
}

/** Lock page scroll (preloader, mobile menu, project overlay). */
export function stopScroll(): void {
  lenis?.stop()
  document.body.style.overflow = "hidden"
}

export function startScroll(): void {
  lenis?.start()
  document.body.style.overflow = ""
}

/** Smooth-scroll to a section id, compensating for the fixed header. */
export function scrollToId(id: string): void {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) {
    lenis.scrollTo(el, { offset: -72, duration: 1.4 })
  } else {
    el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" })
  }
}
