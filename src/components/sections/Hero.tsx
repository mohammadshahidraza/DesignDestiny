import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { hero } from "../../content/content"
import { siteConfig } from "../../config/site.config"
import { scrollToId } from "../../lib/scroll"
import { EASE } from "../../lib/motion"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"
import { Button } from "../ui/Button"
import { Magnetic } from "../ui/Magnetic"
import { GlowOrb } from "../ui/GlowOrb"

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 140])
  const yWatermark = useTransform(scrollYProgress, [0, 1], [0, -100])
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden"
    >
      <GlowOrb className="left-[-12%] top-[-18%] h-[62vw] w-[62vw]" />
      <GlowOrb className="bottom-[-32%] right-[-16%] h-[46vw] w-[46vw] opacity-70" />

      <motion.div
        style={reduced ? undefined : { y: yWatermark }}
        aria-hidden="true"
        className="pointer-events-none absolute right-[-3%] top-1/2 hidden -translate-y-1/2 select-none md:block"
      >
        <span className="font-display stroke-amber text-[26vw] font-semibold leading-none">D</span>
      </motion.div>

      <motion.div
        style={reduced ? undefined : { y: yContent, opacity: fade }}
        className="shell relative z-10 pb-16 pt-28 md:pt-32"
      >
        <motion.p
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.15, duration: 0.8, ease: EASE }}
          className="flex items-center gap-4 text-[11px] uppercase tracking-[0.35em] text-white/55 md:text-xs"
        >
          <span className="h-px w-10 bg-amber/70" />
          {hero.eyebrow}
        </motion.p>

        <h1 className="font-display mt-8 text-[clamp(2.6rem,8.5vw,7.5rem)] font-semibold leading-[0.98] tracking-tight">
          {hero.headline.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.15em] -mb-[0.15em]">
              <motion.span
                className="block will-change-transform"
                initial={reduced ? { opacity: 0 } : { y: "115%" }}
                animate={ready ? (reduced ? { opacity: 1 } : { y: "0%" }) : undefined}
                transition={{ delay: 0.25 + i * 0.12, duration: 1.05, ease: EASE }}
              >
                {line.map((seg, j) =>
                  seg.accent ? (
                    <span key={j} className="text-amber">
                      {seg.text}
                    </span>
                  ) : (
                    <span key={j}>{seg.text}</span>
                  ),
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.75, duration: 0.9, ease: EASE }}
          className="mt-8"
        >
          <p className="max-w-xl text-base leading-relaxed text-white/60 md:text-lg">{hero.sub}</p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Button onClick={() => scrollToId("work")}>View My Work</Button>
            </Magnetic>
            <Magnetic>
              <Button variant="ghost" onClick={() => scrollToId("contact")}>
                Hire Me
              </Button>
            </Magnetic>
          </div>

          {siteConfig.availableForProjects && (
            <p className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-white/15 px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-white/65">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
              </span>
              Available for new projects
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ delay: 1.15, duration: 0.9, ease: EASE }}
          className="mt-16 flex items-end justify-between"
        >
          <button
            type="button"
            onClick={() => scrollToId("about")}
            className="group flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white/40 transition-colors hover:text-amber"
          >
            Scroll
            <span className="relative block h-10 w-px overflow-hidden bg-white/15">
              <span
                className="absolute inset-x-0 top-0 h-4 bg-amber"
                style={{ animation: "scroll-line 1.9s var(--ease-soft) infinite" }}
              />
            </span>
          </button>
          <p className="hidden text-[11px] uppercase tracking-[0.3em] text-white/30 md:block">
            {siteConfig.name}
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
