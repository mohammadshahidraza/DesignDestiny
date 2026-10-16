import { useEffect, useRef } from "react"
import { AnimatePresence, motion } from "motion/react"
import { nav } from "../../content/content"
import { siteConfig } from "../../config/site.config"
import { scrollToId, startScroll, stopScroll } from "../../lib/scroll"
import { EASE } from "../../lib/motion"
import {
  BehanceIcon,
  CloseIcon,
  InstagramIcon,
  MailIcon,
  WhatsAppIcon,
} from "../ui/Icons"

type Props = { open: boolean; onClose: () => void }

export function MobileMenu({ open, onClose }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) stopScroll()
    else startScroll()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "Tab") {
        const focusables = containerRef.current?.querySelectorAll<HTMLElement>("a, button")
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
    document.addEventListener("keydown", onKey)
    const t = setTimeout(() => {
      containerRef.current?.querySelector<HTMLElement>("button, a")?.focus()
    }, 100)
    return () => {
      document.removeEventListener("keydown", onKey)
      clearTimeout(t)
    }
  }, [open, onClose])

  const channels = [
    {
      icon: WhatsAppIcon,
      label: "WhatsApp",
      href: siteConfig.whatsappNumber ? `https://wa.me/${siteConfig.whatsappNumber}` : "",
    },
    { icon: MailIcon, label: "Email", href: siteConfig.email ? `mailto:${siteConfig.email}` : "" },
    { icon: InstagramIcon, label: "Instagram", href: siteConfig.instagramUrl },
    { icon: BehanceIcon, label: "Behance", href: siteConfig.behanceUrl },
  ].filter((c) => c.href)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[70] lg:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: EASE }}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="flex h-full flex-col bg-black">
            <div className="flex h-20 items-center justify-end px-6">
              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-amber hover:text-amber"
              >
                <CloseIcon />
              </button>
            </div>

            <nav aria-label="Menu" className="flex flex-1 flex-col justify-center gap-1 px-6">
              {nav.map((item, i) => (
                <motion.button
                  key={item.id}
                  type="button"
                  initial={{ y: 44, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.18 + i * 0.07, duration: 0.6, ease: EASE }}
                  onClick={() => {
                    onClose()
                    window.setTimeout(() => scrollToId(item.id), 350)
                  }}
                  className="group flex items-baseline gap-4 py-2 text-left"
                >
                  <span className="font-display text-sm text-amber/80">0{i + 1}</span>
                  <span className="font-display text-4xl font-semibold tracking-tight text-white transition-colors group-hover:text-amber">
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </nav>

            <motion.div
              className="flex flex-wrap items-center gap-5 px-6 pb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6, ease: EASE }}
            >
              {channels.length > 0 ? (
                channels.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={c.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-amber hover:text-amber"
                  >
                    <c.icon size={17} />
                  </a>
                ))
              ) : (
                <p className="text-xs text-white/35">
                  Add your social links in src/config/site.config.ts
                </p>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
