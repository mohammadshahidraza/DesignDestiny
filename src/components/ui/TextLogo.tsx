import { scrollToId } from "../../lib/scroll"

export function TextLogo({ className }: { className?: string }) {
  return (
    <button
      type="button"
      aria-label="Design Destiny — back to top"
      onClick={() => scrollToId("home")}
      className={`font-display cursor-pointer text-lg font-semibold tracking-tight transition-opacity hover:opacity-80 ${className ?? ""}`}
    >
      <span className="text-white">Design</span> <span className="text-amber">Destiny</span>
    </button>
  )
}
