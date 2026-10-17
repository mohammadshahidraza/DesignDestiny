import { motion } from "motion/react"
import { services } from "../../content/content"
import { EASE } from "../../lib/motion"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"
import { SectionHeading } from "../ui/SectionHeading"
import { Reveal } from "../ui/Reveal"
import { PlusIcon } from "../ui/Icons"

export function Services() {
  const reduced = usePrefersReducedMotion()

  return (
    <section id="services" className="section relative">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionHeading index="03" label="Services" />
            <Reveal delay={0.05} className="mt-6">
              <h2 className="font-display text-[clamp(2.2rem,6vw,4.5rem)] font-semibold leading-none tracking-tight">
                What I <span className="text-amber">do</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm leading-relaxed text-white/45">
              Every engagement starts with understanding your brand — then designing the sharpest
              way to express it.
            </p>
          </Reveal>
        </div>

        <div className="mt-14">
          <motion.div
            initial={{ scaleX: reduced ? 1 : 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="h-px w-full origin-left bg-white/10"
          />

          {services.map((service, i) => (
            <div key={service.title}>
              <Reveal delay={i * 0.06} y={20}>
                <div className="group relative grid grid-cols-12 items-start gap-4 px-2 py-8 md:gap-8 md:px-4 md:py-10">
                  <span
                    className="absolute inset-0 origin-bottom scale-y-0 bg-amber/5 transition-transform duration-500 ease-expo group-hover:scale-y-100"
                    aria-hidden="true"
                  />
                  <span className="font-display relative col-span-12 text-sm text-amber/70 md:col-span-1">
                    0{i + 1}
                  </span>
                  <div className="relative col-span-12 md:col-span-4">
                    <h3 className="font-display text-3xl font-semibold tracking-tight transition-transform duration-500 ease-expo group-hover:translate-x-2 md:text-4xl">
                      {service.title}
                    </h3>
                  </div>
                  <p className="relative col-span-12 max-w-xl text-sm leading-relaxed text-white/45 transition-colors duration-500 group-hover:text-white/70 md:col-span-6">
                    {service.description}
                  </p>
                  <span className="relative col-span-12 hidden md:col-span-1 md:flex md:justify-end">
                    <PlusIcon
                      className="text-white/30 transition-all duration-500 group-hover:rotate-90 group-hover:text-amber"
                      size={22}
                    />
                  </span>
                </div>
              </Reveal>
              <motion.div
                initial={{ scaleX: reduced ? 1 : 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.9, delay: i * 0.05, ease: EASE }}
                className="h-px w-full origin-left bg-white/10"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
