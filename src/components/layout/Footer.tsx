import { footer, nav } from "../../content/content"
import { siteConfig } from "../../config/site.config"
import { scrollToId } from "../../lib/scroll"
import { TextLogo } from "../ui/TextLogo"
import { Marquee } from "../ui/Marquee"
import { Reveal } from "../ui/Reveal"
import { ArrowUp, BehanceIcon, InstagramIcon, MailIcon, WhatsAppIcon } from "../ui/Icons"

export function Footer() {
  const year = new Date().getFullYear()

  const socials = [
    {
      icon: WhatsAppIcon,
      label: "WhatsApp",
      href: siteConfig.whatsappNumber
        ? `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`
        : "",
    },
    {
      icon: MailIcon,
      label: "Email",
      href: siteConfig.email ? `mailto:${siteConfig.email}` : "",
    },
    { icon: InstagramIcon, label: "Instagram", href: siteConfig.instagramUrl },
    { icon: BehanceIcon, label: "Behance", href: siteConfig.behanceUrl },
  ].filter((s) => s.href)

  return (
    <footer className="relative overflow-hidden border-t border-white/10">
      <div className="shell pt-16 md:pt-20">
        <Reveal>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <TextLogo />
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
                {footer.blurb}
              </p>
              {siteConfig.availableForProjects && (
                <p className="mt-6 inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.25em] text-white/55">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
                  </span>
                  Available for projects
                </p>
              )}
            </div>

            <div className="md:col-span-3">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">Navigate</p>
              <ul className="mt-5 space-y-3">
                {nav.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => scrollToId(item.id)}
                      className="link-sweep text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">Socials</p>
              {socials.length > 0 ? (
                <ul className="mt-5 space-y-3">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="link-sweep items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                      >
                        <s.icon size={15} />
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-5 text-sm text-white/35">
                  Add your links in src/config/site.config.ts
                </p>
              )}
            </div>

            <div className="flex md:col-span-2 md:justify-end">
              <button
                type="button"
                aria-label="Back to top"
                onClick={() => scrollToId("home")}
                className="group flex h-16 w-16 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-amber hover:bg-amber hover:text-black"
              >
                <ArrowUp className="transition-transform duration-500 group-hover:-translate-y-1" />
              </button>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-white/35 md:flex-row md:items-center md:justify-between">
          <p>© {year} Design Destiny. All rights reserved.</p>
          <p>
            Projects shown are clearly-labelled samples — replace them with your real work.
          </p>
        </div>
      </div>

      <div className="relative pb-4 pt-2 md:pb-8">
        <Marquee duration={64}>
          <span className="font-display stroke-text whitespace-nowrap px-6 text-[clamp(3.5rem,10vw,8.5rem)] font-semibold leading-none">
            {footer.marqueeWord}
          </span>
          <span className="font-display px-6 text-[clamp(3.5rem,10vw,8.5rem)] font-semibold leading-none text-amber">
            ✦
          </span>
        </Marquee>
      </div>
    </footer>
  )
}
