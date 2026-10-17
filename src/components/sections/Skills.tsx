import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { skills } from "../../content/content"
import { EASE } from "../../lib/motion"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"
import { useCountUp } from "../../hooks/useCountUp"
import { SectionHeading } from "../ui/SectionHeading"
import { MaskedLine } from "../ui/MaskedLine"
import { Reveal } from "../ui/Reveal"

function SkillBar({
  label,
  value,
  index,
  start,
}: {
  label: string
  value: number
  index: number
  start: boolean
}) {
  const reduced = usePrefersReducedMotion()
  const count = useCountUp(value, start, reduced ? 0 : 1.4)

  return (
    <div className="py-5">
      <div className="mb-3 flex items-baseline justify-between">
        <span className="text-sm font-medium text-white/80">{label}</span>
        <span className="font-display text-sm text-amber">{count}%</span>
      </div>
      <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full origin-left rounded-full bg-amber"
          initial={{ scaleX: 0 }}
          animate={start ? { scaleX: 1 } : undefined}
          transition={{
            duration: reduced ? 0 : 1.3,
            delay: reduced ? 0 : 0.15 + index * 0.08,
            ease: EASE,
          }}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export function Skills() {
  const listRef = useRef<HTMLDivElement>(null)
  const inView = useInView(listRef, { once: true, amount: 0.35 })
  const reduced = usePrefersReducedMotion()

  return (
    <section id="skills" className="section relative">
      <div className="shell grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <SectionHeading index="04" label={skills.eyebrow} />
          <h2 className="font-display mt-6 text-[clamp(2rem,4.6vw,3.6rem)] font-semibold leading-[1.05] tracking-tight">
            {skills.headline.map((line, i) => (
              <MaskedLine key={i} delay={0.08 * i}>
                {line}
              </MaskedLine>
            ))}
          </h2>

          <Reveal delay={0.15} className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
              Tools I work with
            </p>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {skills.tools.map((tool, i) => (
                <motion.li
                  key={tool}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                  className="cursor-default rounded-full border border-white/15 px-4 py-2 text-sm text-white/65 transition-colors duration-300 hover:border-amber hover:text-amber"
                >
                  {tool}
                </motion.li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div ref={listRef} className="md:col-span-6 md:col-start-7">
          {skills.bars.map((bar, i) => (
            <SkillBar key={bar.label} label={bar.label} value={bar.value} index={i} start={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
