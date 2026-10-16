import { useEffect, useState } from "react"

/** Tracks which section is currently in the viewport band — powers nav highlighting. */
export function useScrollSpy(ids: readonly string[], band = 0.42): string {
  const [active, setActive] = useState(ids[0] ?? "")

  useEffect(() => {
    const top = Math.round(band * 100)
    const bottom = 100 - top
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: `-${top}% 0px -${bottom}% 0px`, threshold: 0 },
    )
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids, band])

  return active
}
