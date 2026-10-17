import { useState } from "react"
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react"
import { nav, sectionIds } from "../../content/content"
import { scrollToId } from "../../lib/scroll"
import { useScrollSpy } from "../../hooks/useScrollSpy"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"
import { EASE } from "../../lib/motion"
import { TextLogo } from "../ui/TextLogo"
import { Button } from "../ui/Button"
import { MobileMenu } from "./MobileMenu"

export function Header() {
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useScrollSpy(sectionIds)
  const reduced = usePrefersReducedMotion()

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > prev && y > 520 && !menuOpen)
  })

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[80]"
        animate={{ y: hidden && !reduced ? "-110%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div
          className={`transition-colors duration-500 ${
            scrolled
              ? "border-b border-white/10 bg-black/70 backdrop-blur-md"
              : "border-b border-transparent"
          }`}
        >
          <div className="shell flex h-20 items-center justify-between">
            <TextLogo />

            <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
              {nav.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToId(item.id)}
                  className={`relative text-sm transition-colors ${
                    active === item.id ? "text-white" : "text-white/55 hover:text-white"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-amber transition-all duration-300 ${
                      active === item.id ? "scale-100 opacity-100" : "scale-50 opacity-0"
                    }`}
                  />
                </button>
              ))}
            </nav>

            <div className="hidden lg:block">
              <Button
                variant="ghost"
                className="text-sm"
                onClick={() => scrollToId("contact")}
              >
                Hire Me
              </Button>
            </div>

            <button
              type="button"
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <motion.span
                className="h-px w-6 bg-white"
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 3.5 : 0 }}
              />
              <motion.span
                className="h-px w-6 bg-white"
                animate={{ opacity: menuOpen ? 0 : 1 }}
              />
              <motion.span
                className="h-px w-6 bg-white"
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -3.5 : 0 }}
              />
            </button>
          </div>
        </div>

        <motion.div className="h-[2px] w-full origin-left bg-amber" style={{ scaleX: progress }} />
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
