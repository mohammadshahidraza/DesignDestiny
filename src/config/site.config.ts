/**
 * ⚙️ SITE CONFIG — put your real details here.
 *
 * Anything left as an empty string ("") shows a "Not set" state in the UI
 * instead of a fake link. Nothing is invented for you.
 */
export const siteConfig = {
  name: "Design Destiny",

  /** WhatsApp number in international format, digits only. Example: "919876543210" */
  whatsappNumber: "923155751115", // your 0315 5751115 → wa.me/923155751115
  whatsappMessage: "Hi Design Destiny! I'd like to discuss a design project.",

  /** Your email address. Example: "hello@yourdomain.com" */
  email: "",

  /** Full profile URL. Example: "https://instagram.com/yourhandle" */
  instagramUrl: "",
  instagramHandle: "",

  /** Full profile URL. Example: "https://www.behance.net/yourhandle" */
  behanceUrl: "",
  behanceHandle: "",

  /**
   * Contact form endpoint. Paste a Formspree / Web3Forms / EmailJS style
   * endpoint URL to enable real submissions. While empty, the form openly
   * says it is not connected yet — it never pretends to send.
   */
  formEndpoint: "",

  /** Show the "available for projects" badge in the hero. */
  availableForProjects: true,
}

export type SiteConfig = typeof siteConfig
