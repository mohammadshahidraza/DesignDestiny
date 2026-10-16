import type { ReactNode } from "react"
import { ArrowUpRight } from "./Icons"

type Props = {
  children: ReactNode
  variant?: "primary" | "ghost"
  onClick?: () => void
  href?: string
  type?: "button" | "submit"
  className?: string
  withArrow?: boolean
  disabled?: boolean
}

export function Button({
  children,
  variant = "primary",
  onClick,
  href,
  type = "button",
  className,
  withArrow = true,
  disabled = false,
}: Props) {
  const cls = `btn ${variant === "primary" ? "btn-primary" : "btn-ghost"} ${
    disabled ? "pointer-events-none opacity-50" : ""
  } ${className ?? ""}`

  const inner = (
    <>
      <span>{children}</span>
      {withArrow && <ArrowUpRight className="btn-arrow" size={15} />}
    </>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {inner}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {inner}
    </button>
  )
}
