import { marqueeItems } from "../../content/content"
import { Marquee } from "../ui/Marquee"

/** Two stacked marquee rows moving in opposite directions. */
export function MarqueeStrip() {
  return (
    <div className="relative border-y border-white/10 py-6 md:py-8" aria-hidden="true">
      <div className="space-y-4">
        <Marquee duration={36}>
          {marqueeItems.map((item) => (
            <span key={item} className="flex items-center">
              <span className="font-display px-6 text-2xl font-medium text-white/85 md:px-10 md:text-4xl">
                {item}
              </span>
              <span className="text-xl text-amber md:text-2xl">✦</span>
            </span>
          ))}
        </Marquee>

        <Marquee duration={48} reverse>
          {marqueeItems.map((item) => (
            <span key={item} className="flex items-center">
              <span className="font-display stroke-text px-6 text-2xl font-medium md:px-10 md:text-4xl">
                {item}
              </span>
              <span className="text-xl text-amber/60 md:text-2xl">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  )
}
