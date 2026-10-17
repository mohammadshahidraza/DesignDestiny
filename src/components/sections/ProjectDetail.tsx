import { useEffect, useRef } from "react"
import { AnimatePresence, motion } from "motion/react"
import { categoryLabel, getNextProject, type Project } from "../../data/projects"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"
import { startScroll, stopScroll } from "../../lib/scroll"
import { EASE } from "../../lib/motion"
import { CoverArt } from "../ui/CoverArt"
import { ArrowRight, CloseIcon } from "../ui/Icons"
import { Reveal } from "../ui/Reveal"

type Props = {
  project: Project
  onClose: () => void
  onNext: (project: Project) => void
}

export function ProjectDetail({ project, onClose, onNext }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const reduced = usePrefersReducedMotion()
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null
    stopScroll()
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current()
        return
      }
      /* Keep keyboard focus inside the dialog while it is open. */
      if (e.key === "Tab") {
        const focusables = rootRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (!focusables || focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      startScroll()
      previousFocusRef.current?.focus() // hand focus back to the card that opened it
    }
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
    closeRef.current?.focus() // keeps the keyboard flow sane after "Next project"
  }, [project.id])

  const nextProject = getNextProject(project)

  const meta: [string, string][] = [
    ["Category", categoryLabel[project.category]],
    ["Deliverables", project.deliverables.join(", ")],
    ["Year", "—"],
    ["Client", "Sample — no real client"],
  ]

  return (
    <motion.div
      ref={rootRef}
      className="fixed inset-0 z-[90]"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — project details`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.2 } }}
    >
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={scrollRef}
        data-lenis-prevent
        className="absolute inset-0 overflow-y-auto overscroll-contain"
      >
        <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-24 md:pt-28">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={project.id}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 26 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: reduced ? 0 : 0.6,
                  delay: reduced ? 0 : 0.28,
                  ease: EASE,
                },
              }}
              exit={{
                opacity: 0,
                ...(reduced ? {} : { y: -18 }),
                transition: { duration: 0.25, ease: EASE },
              }}
            >
              <motion.div
                layoutId={reduced ? undefined : `cover-${project.id}`}
                className="relative aspect-[16/10] overflow-hidden rounded-xl"
              >
                <CoverArt
                  variant={project.variant}
                  seed={0}
                  label={`${project.title} — cover artwork`}
                />
                <span className="absolute left-5 top-5 rounded-full border border-amber/50 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-amber backdrop-blur-sm">
                  Sample project
                </span>
              </motion.div>

              <div className="mt-10 grid gap-10 md:grid-cols-12">
                <div className="md:col-span-7">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-amber">
                    {categoryLabel[project.category]}
                  </p>
                  <h2 className="font-display mt-4 text-[clamp(1.9rem,4.5vw,3.4rem)] font-semibold leading-[1.05] tracking-tight">
                    {project.title}
                  </h2>
                  <div className="mt-6 space-y-5">
                    {project.description.map((paragraph, i) => (
                      <p key={i} className="leading-relaxed text-white/55">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <p className="mt-8 rounded-xl border border-amber/25 bg-amber/[0.06] p-5 text-sm leading-relaxed text-white/65">
                    This is a placeholder case study — no real client is associated with it.
                    Replace it with your own project in src/data/projects.ts.
                  </p>
                </div>

                <div className="md:col-span-5 md:pl-6">
                  <dl className="divide-y divide-white/10 border-y border-white/10">
                    {meta.map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-6 py-4">
                        <dt className="text-[11px] uppercase tracking-[0.25em] text-white/40">
                          {label}
                        </dt>
                        <dd className="text-right text-sm text-white/75">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <div className="mt-14 grid gap-4 md:grid-cols-2 md:gap-6">
                {project.gallery.map((variant, i) => (
                  <Reveal key={`${variant}-${i}`} delay={i * 0.1}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                      <CoverArt
                        variant={variant}
                        seed={i + 1}
                        label={`${project.title} — sample visual ${i + 1}`}
                      />
                    </div>
                  </Reveal>
                ))}
              </div>

              <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8">
                <button
                  type="button"
                  onClick={onClose}
                  className="link-sweep flex cursor-pointer items-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
                >
                  <ArrowRight className="rotate-180" size={14} />
                  Back to all work
                </button>

                <button
                  type="button"
                  onClick={() => onNext(nextProject)}
                  className="group flex cursor-pointer items-center gap-3 text-right"
                >
                  <span className="text-[11px] uppercase tracking-[0.25em] text-white/40">
                    Next project
                  </span>
                  <span className="font-display text-base font-semibold transition-colors duration-300 group-hover:text-amber md:text-lg">
                    {nextProject.title}
                  </span>
                  <ArrowRight className="text-amber transition-transform duration-500 group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close project"
        className="absolute right-4 top-4 z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/80 backdrop-blur-md transition-colors hover:border-amber hover:text-amber md:right-8 md:top-8"
      >
        <CloseIcon />
      </button>
    </motion.div>
  )
}
