import { useState, type FormEvent } from "react"
import { contact } from "../../content/content"
import { siteConfig } from "../../config/site.config"
import { SectionHeading } from "../ui/SectionHeading"
import { MaskedLine } from "../ui/MaskedLine"
import { Reveal } from "../ui/Reveal"
import { Button } from "../ui/Button"
import { ArrowUpRight, BehanceIcon, InstagramIcon, MailIcon, WhatsAppIcon } from "../ui/Icons"
import { InputField, SelectField, TextareaField } from "../ui/Field"

type Status = "idle" | "sending" | "success" | "error" | "unconfigured"

export function Contact() {
  const [status, setStatus] = useState<Status>("idle")
  const [formKey, setFormKey] = useState(0)

  const channels = [
    {
      icon: WhatsAppIcon,
      label: "WhatsApp",
      value: siteConfig.whatsappNumber ? `+${siteConfig.whatsappNumber}` : "",
      href: siteConfig.whatsappNumber
        ? `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`
        : "",
    },
    {
      icon: MailIcon,
      label: "Email",
      value: siteConfig.email,
      href: siteConfig.email ? `mailto:${siteConfig.email}` : "",
    },
    {
      icon: InstagramIcon,
      label: "Instagram",
      value: siteConfig.instagramHandle || siteConfig.instagramUrl,
      href: siteConfig.instagramUrl,
    },
    {
      icon: BehanceIcon,
      label: "Behance",
      value: siteConfig.behanceHandle || siteConfig.behanceUrl,
      href: siteConfig.behanceUrl,
    },
  ]

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!siteConfig.formEndpoint) {
      setStatus("unconfigured")
      return
    }
    setStatus("sending")
    try {
      const res = await fetch(siteConfig.formEndpoint, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      })
      if (res.ok) {
        setStatus("success")
        setFormKey((k) => k + 1) // remounts the form, clearing the fields
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="section relative overflow-hidden">
      <span
        className="font-display stroke-text pointer-events-none absolute left-1/2 top-20 -translate-x-1/2 select-none whitespace-nowrap text-[18vw] font-semibold leading-none opacity-40"
        aria-hidden="true"
      >
        {"LET'S TALK"}
      </span>

      <div className="shell relative">
        <SectionHeading index="05" label={contact.eyebrow} />

        <h2 className="font-display mt-6 text-[clamp(2.2rem,6vw,4.6rem)] font-semibold leading-[1.02] tracking-tight">
          {contact.headline.map((line, i) => (
            <MaskedLine key={i} delay={0.08 * i}>
              {line.map((seg, j) =>
                seg.accent ? (
                  <span key={j} className="text-amber">
                    {seg.text}
                  </span>
                ) : (
                  <span key={j}>{seg.text}</span>
                ),
              )}
            </MaskedLine>
          ))}
        </h2>
        <Reveal delay={0.15} className="mt-5">
          <p className="max-w-xl leading-relaxed text-white/50">{contact.sub}</p>
        </Reveal>

        <div className="mt-16 grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
                Direct channels
              </p>
            </Reveal>
            <div className="mt-6">
              {channels.map((c, i) => (
                <Reveal key={c.label} delay={i * 0.07} y={16}>
                  {c.href ? (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-4 border-b border-white/10 py-5 transition-colors duration-300 hover:border-amber/50"
                    >
                      <span className="flex items-center gap-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors duration-300 group-hover:border-amber group-hover:text-amber">
                          <c.icon size={16} />
                        </span>
                        <span>
                          <span className="block text-sm font-medium text-white/85">{c.label}</span>
                          <span className="mt-0.5 block text-xs text-white/40">{c.value}</span>
                        </span>
                      </span>
                      <ArrowUpRight
                        className="text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber"
                        size={16}
                      />
                    </a>
                  ) : (
                    <div className="flex items-center justify-between gap-4 border-b border-white/10 py-5">
                      <span className="flex items-center gap-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/25">
                          <c.icon size={16} />
                        </span>
                        <span>
                          <span className="block text-sm font-medium text-white/40">{c.label}</span>
                          <span className="mt-0.5 block text-xs text-white/25">
                            Not set — add in src/config/site.config.ts
                          </span>
                        </span>
                      </span>
                    </div>
                  )}
                </Reveal>
              ))}
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
                Project inquiry
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-8">
              <form key={formKey} onSubmit={onSubmit} className="space-y-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  <InputField id="name" name="name" label="Your name" autoComplete="name" required />
                  <InputField
                    id="email"
                    name="email"
                    label="Email address"
                    type="email"
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="grid gap-8 sm:grid-cols-2">
                  <SelectField
                    id="projectType"
                    name="projectType"
                    label="Project type"
                    required
                    options={[
                      "Logo Design",
                      "Brand Identity",
                      "Social Media Design",
                      "Posters & Advertising",
                      "Other",
                    ]}
                  />
                  <SelectField
                    id="budget"
                    name="budget"
                    label="Budget range"
                    options={[
                      "Under $250",
                      "$250 – $500",
                      "$500 – $1,000",
                      "$1,000+",
                      "Not sure yet",
                    ]}
                  />
                </div>
                <TextareaField id="message" name="message" label="Tell me about your project" required />

                <div className="flex flex-wrap items-center gap-4">
                  <Button type="submit" disabled={status === "sending"}>
                    {status === "sending" ? "Sending…" : "Send Inquiry"}
                  </Button>
                  {status === "success" && (
                    <p className="text-sm text-amber">Thanks — your message has been sent.</p>
                  )}
                  {status === "error" && (
                    <p className="text-sm text-white/60">
                      Something went wrong — please try again.
                    </p>
                  )}
                </div>

                {status === "unconfigured" && (
                  <p className="rounded-xl border border-amber/25 bg-amber/5 p-4 text-sm leading-relaxed text-white/65">
                    This form is a design preview and is not connected to a submission service
                    yet. Add your endpoint in src/config/site.config.ts — it works with Formspree,
                    Web3Forms, EmailJS and most form services.
                  </p>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
