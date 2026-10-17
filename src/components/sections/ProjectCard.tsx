import { useRef, useState, type MouseEvent, type Ref } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"
import { categoryLabel, type Project } from "../../data/projects"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"
import { useMediaQuery } from "../../hooks/useMediaQuery"
import { EASE } from "../../lib/motion"
import { CoverArt } from "../ui/CoverArt"

type Props = {
  project: Project
  index: number
  wide: boolean
  onOpen: (project: Project) => void
  ref?: Ref<HTMLElement>
}

export function ProjectCard({ project, index, wide, onOpen, ref }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const finePointer = useMediaQuery("(pointer: fine)")
  const showCursor = finePointer && !reduced

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 350, damping: 32, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 350, damping: 32, mass: 0.6 })
  const [hover, setHover] = useState(false)

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!showCursor || !wrapRef.current) return
    const rect = wrapRef.current.getBoundingClientRect()
    x.set(e.clientX - rect.left)
    y.set(e.clientY - rect.top)
  }

  return (
    <motion.article
      ref={ref}
      layout={!reduced}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={
        reduced
          ? { opacity: 0, transition: { duration: 0.25, ease: EASE } }
          : { opacity: 0, scale: 0.96, transition: { duration: 0.25, ease: EASE } }
      }
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, delay: (index % 3) * 0.08, ease: EASE }}
      className={`group relative col-span-12 ${wide ? "md:col-span-7" : "md:col-span-5"}`}
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Open project: ${project.title}`}
        className="block w-full cursor-pointer text-left"
      >
        <div
          ref={wrapRef}
          onMouseMove={onMouseMove}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="relative"
        >
          <motion.div
            layoutId={reduced ? undefined : `cover-${project.id}`}
            className={`relative overflow-hidden rounded-xl ${wide ? "aspect-[16/11]" : "aspect-[4/5]"}`}
          >
            <div className="absolute inset-0 transition-transform duration-[1400ms] ease-expo group-hover:scale-[1.06]">
              <CoverArt
                variant={project.variant}
                seed={index}
                label={`${project.title} — sample placeholder artwork`}
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

            <span className="absolute left-4 top-4 rounded-full border border-amber/50 bg-black/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-amber backdrop-blur-sm">
              Sample
            </span>
          </motion.div>

          {showCursor && (
            <motion.div
              style={{ x: springX, y: springY }}
              animate={{ opacity: hover ? 1 : 0, scale: hover ? 1 : 0.5 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="pointer-events-none absolute left-0 top-0 z-20"
              aria-hidden="true"
            >
              <span className="-ml-12 -mt-12 flex h-24 w-24 items-center justify-center rounded-full bg-amber text-[11px] font-semibold uppercase tracking-[0.2em] text-black">
                View
              </span>
            </motion.div>
          )}
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-amber md:text-2xl">
              {project.title}
            </h3>
            <p className="mt-1.5 text-sm text-white/45">{categoryLabel[project.category]}</p>
          </div>
          <span className="font-display pt-1 text-sm text-white/30">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </button>
    </motion.article>
  )
}
