/** Soft amber ambient light. Position and size come from the className. */
export function GlowOrb({ className }: { className?: string }) {
  return <div className={`glow-orb ${className ?? ""}`} aria-hidden="true" />
}
