import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { categories, projects, type CategoryId, type Project } from "../../data/projects"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"
import { SectionHeading } from "../ui/SectionHeading"
import { Reveal } from "../ui/Reveal"
import { ProjectCard } from "./ProjectCard"
import { ProjectDetail } from "./ProjectDetail"

export function Portfolio() {
  const [filter, setFilter] = useState<CategoryId | "all">("all")
  const [active, setActive] = useState<Project | null>(null)
  const openedRef = useRef(false)
  const reduced = usePrefersReducedMotion()

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter)

  /* Deep links (#project-slug) + browser back/forward sync. */
  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash
      if (hash.startsWith("#project-")) {
        const slug = hash.replace("#project-", "")
        const project = projects.find((p) => p.slug === slug) ?? null
        setActive(project)
      } else {
        openedRef.current = false
        setActive(null)
      }
    }
    sync()
    window.addEventListener("popstate", sync)
    return () => window.removeEventListener("popstate", sync)
  }, [])

  const open = (project: Project) => {
    openedRef.current = true
    setActive(project)
    window.history.pushState({ project: project.slug }, "", `#project-${project.slug}`)
  }

  const close = () => {
    if (openedRef.current) {
      openedRef.current = false // guard: a rapid double-close must not step back twice
      window.history.back() // popstate handler clears the overlay
    } else {
      window.history.replaceState(null, "", "#work")
      setActive(null)
    }
  }

  const next = (project: Project) => {
    setActive(project)
    window.history.replaceState(null, "", `#project-${project.slug}`)
  }

  return (
    <section id="work" className="section relative">
      <div className="shell">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionHeading index="02" label="Portfolio" />
            <Reveal delay={0.05} className="mt-6">
              <h2 className="font-display text-[clamp(2.2rem,6vw,4.5rem)] font-semibold leading-none tracking-tight">
                Selected <span className="text-amber">Work</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12} className="mt-5">
              <p className="max-w-md text-sm leading-relaxed text-white/45">
                Clearly-labelled sample projects previewing this layout — your real case studies
                will replace them.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={filter === c.id}
                  onClick={() => setFilter(c.id)}
                  className={`relative cursor-pointer rounded-full border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.15em] transition-colors duration-300 ${
                    filter === c.id
                      ? "border-amber text-black"
                      : "border-white/15 text-white/55 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {filter === c.id && (
                    <motion.span
                      layoutId={reduced ? undefined : "filter-pill"}
                      className="absolute inset-0 rounded-full bg-amber"
                      transition={
                        reduced ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 34 }
                      }
                    />
                  )}
                  <span className="relative z-10">{c.label}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div
          layout={!reduced}
          className="mt-14 grid grid-cols-12 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                wide={i % 2 === 0}
                onOpen={open}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {active && <ProjectDetail project={active} onClose={close} onNext={next} />}
      </AnimatePresence>
    </section>
  )
}
