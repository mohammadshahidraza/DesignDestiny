import { Reveal } from "./Reveal"

type Props = {
  index: string
  label: string
  className?: string
}

/** Numbered eyebrow — "01 — ABOUT" with amber hairline. */
export function SectionHeading({ index, label, className }: Props) {
  return (
    <Reveal className={className}>
      <div className="flex items-center gap-4">
        <span className="font-display text-sm font-medium text-amber">{index}</span>
        <span className="h-px w-12 bg-amber/60" />
        <span className="text-xs font-medium uppercase tracking-[0.35em] text-white/50">
          {label}
        </span>
      </div>
    </Reveal>
  )
}
