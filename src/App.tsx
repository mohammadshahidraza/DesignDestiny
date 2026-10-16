import { useEffect, useState } from "react"
import { AnimatePresence } from "motion/react"
import { destroyLenis, initLenis, startScroll, stopScroll } from "./lib/scroll"
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion"
import { GrainOverlay } from "./components/ui/GrainOverlay"
import { Preloader } from "./components/layout/Preloader"
import { Header } from "./components/layout/Header"
import { Footer } from "./components/layout/Footer"
import { Hero } from "./components/sections/Hero"
import { MarqueeStrip } from "./components/sections/MarqueeStrip"
import { About } from "./components/sections/About"
import { Portfolio } from "./components/sections/Portfolio"
import { Services } from "./components/sections/Services"
import { Skills } from "./components/sections/Skills"
import { Contact } from "./components/sections/Contact"

const INTRO_KEY = "dd-intro-played"

export default function App() {
  const reduced = usePrefersReducedMotion()

  const [introDone, setIntroDone] = useState(() => {
    try {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true
      return sessionStorage.getItem(INTRO_KEY) === "1"
    } catch {
      return false
    }
  })
  const [fontsReady, setFontsReady] = useState(false)

  useEffect(() => {
    initLenis()
    return () => destroyLenis()
  }, [])

  useEffect(() => {
    if (introDone) startScroll()
    else stopScroll()
  }, [introDone])

  useEffect(() => {
    let settled = false
    const finish = () => {
      if (settled) return
      settled = true
      setFontsReady(true)
    }
    if (document.fonts?.ready) {
      document.fonts.ready.then(finish).catch(finish)
    } else {
      finish()
    }
    const t = window.setTimeout(finish, 2500)
    return () => window.clearTimeout(t)
  }, [])

  const handleIntroComplete = () => {
    try {
      sessionStorage.setItem(INTRO_KEY, "1")
    } catch {
      /* private mode — ignore */
    }
    setIntroDone(true)
  }

  const heroReady = introDone && fontsReady

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[130] focus:rounded-full focus:bg-amber focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-black"
      >
        Skip to content
      </a>

      <GrainOverlay />

      <AnimatePresence>
        {!introDone && !reduced && <Preloader onComplete={handleIntroComplete} />}
      </AnimatePresence>

      <Header />

      <main id="main">
        <Hero ready={heroReady} />
        <MarqueeStrip />
        <About />
        <Portfolio />
        <Services />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
