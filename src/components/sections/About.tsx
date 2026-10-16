import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "motion/react"
import { about } from "../../content/content"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"
import { useCountUp } from "../../hooks/useCountUp"
import { SectionHeading } from "../ui/SectionHeading"
import { MaskedLine } from "../ui/MaskedLine"
import { Reveal } from "../ui/Reveal"

function Stat({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const count = useCountUp(value, inView)

  return (
    <Reveal delay={delay}>
      <div ref={ref}>
        <p className="font-display text-4xl font-semibold text-white md:text-5xl">
          {count}
          <span className="text-amber">{suffix}</span>
        </p>
        <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-white/45">{label}</p>
      </div>
    </Reveal>
  )
}

function PortraitPlaceholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 border border-white/10">
      <span className="font-display stroke-amber text-[9rem] font-semibold leading-none">D</span>
      <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Portrait placeholder</p>
      <p className="max-w-[16rem] text-center text-xs leading-relaxed text-white/30">
        Add your photo to /public and set `portrait` in src/content/content.ts
      </p>
    </div>
  )
}

function Portrait() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [-26, 26])

  return (
    <div ref={ref} className="relative">
      <span className="absolute -left-3 -top-3 z-10 h-8 w-8 border-l-2 border-t-2 border-amber" aria-hidden="true" />
      <span className="absolute -right-3 -top-3 z-10 h-8 w-8 border-r-2 border-t-2 border-amber" aria-hidden="true" />
      <span className="absolute -bottom-3 -left-3 z-10 h-8 w-8 border-b-2 border-l-2 border-amber" aria-hidden="true" />
      <span className="absolute -bottom-3 -right-3 z-10 h-8 w-8 border-b-2 border-r-2 border-amber" aria-hidden="true" />

      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-white/[0.03]">
        {about.portrait ? (
          <motion.img
            style={reduced ? undefined : { y }}
            src={about.portrait}
            alt="Portrait of the designer behind Design Destiny"
            loading="lazy"
            className="h-full w-full scale-[1.1] object-cover"
          />
        ) : (
          <PortraitPlaceholder />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>
    </div>
  )
}

export function About() {
  return (
    <section id="about" className="section relative">
      <div className="shell grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <SectionHeading index="01" label={about.eyebrow} />
            <Reveal delay={0.1} className="mt-10">
              <Portrait />
            </Reveal>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <h2 className="font-display text-[clamp(2rem,4.6vw,3.6rem)] font-semibold leading-[1.05] tracking-tight">
            {about.headline.map((line, i) => (
              <MaskedLine key={i} delay={0.1 + i * 0.1}>
                {line}
              </MaskedLine>
            ))}
          </h2>

          <div className="mt-8 space-y-5">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.15 + i * 0.08}>
                <p className="max-w-xl leading-relaxed text-white/55">{p}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-10">
            {about.stats.map((s, i) => (
              <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
