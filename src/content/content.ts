/**
 * All editable copy lives here.
 * Items marked PLACEHOLDER are sample text written for the design — replace
 * them with your own words before you share the site widely.
 */

export type Segment = { text: string; accent?: boolean }

export const nav = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const

export const sectionIds = ["home", "about", "work", "services", "skills", "contact"] as const

export const hero = {
  eyebrow: "Graphic Design · Brand Identity · Visual Storytelling", // PLACEHOLDER
  headline: [
    [{ text: "Every brand has" }],
    [{ text: "a " }, { text: "destiny", accent: true }, { text: "." }],
    [{ text: "Let's design it." }],
  ] as Segment[][], // PLACEHOLDER headline
  sub: "Design Destiny is a graphic design practice crafting bold identities, striking social creatives and advertising visuals that make brands impossible to ignore.", // PLACEHOLDER
}

export const about = {
  eyebrow: "About Me",
  headline: ["A designer who believes", "every brand deserves", "a destiny."], // PLACEHOLDER
  paragraphs: [
    "I'm the graphic designer behind Design Destiny. My work is built on a simple belief: every brand carries a destiny, and thoughtful design is how you reveal it.", // PLACEHOLDER
    "From logo marks to complete visual systems, I help brands and creators cut through the noise with distinctive identities, considered typography and visuals built to be remembered.", // PLACEHOLDER
  ],
  /** Optional: put your photo in /public and set e.g. "/portrait.jpg" */
  portrait: "",
  stats: [
    { value: 40, suffix: "+", label: "Projects Delivered" }, // PLACEHOLDER — replace with real numbers
    { value: 5, suffix: "+", label: "Years of Experience" }, // PLACEHOLDER
    { value: 98, suffix: "%", label: "Client Satisfaction" }, // PLACEHOLDER
  ],
}

export const marqueeItems = [
  "Brand Identity",
  "Logo Design",
  "Social Media",
  "Posters & Ads",
  "Art Direction",
  "Visual Systems",
]

export const services = [
  {
    title: "Logo Design",
    description:
      "Distinctive, timeless marks that capture what your brand stands for — from first sketches to a complete logo suite in every format you'll ever need.", // PLACEHOLDER
  },
  {
    title: "Brand Identity & Visual Systems",
    description:
      "Complete identity systems: colour, typography, layout and guidelines that keep every touchpoint consistent and unmistakably yours.", // PLACEHOLDER
  },
  {
    title: "Social Media Design",
    description:
      "Scroll-stopping posts, stories and campaign grids designed around your brand's voice — built to be posted, not just admired.", // PLACEHOLDER
  },
  {
    title: "Posters & Advertising Creatives",
    description:
      "Bold, concept-driven posters and ad creatives with typography that commands attention — in print and on screen.", // PLACEHOLDER
  },
  {
    title: "Complete Brand Packages",
    description:
      "Logo, identity, social templates and brand guidelines bundled into one end-to-end project — everything a new brand needs to launch.", // PLACEHOLDER
  },
]

export const skills = {
  eyebrow: "Skills",
  headline: ["Craft, taste and", "an obsession with detail."], // PLACEHOLDER
  bars: [
    { label: "Brand Identity", value: 92 }, // PLACEHOLDER values — set to reflect real skill levels
    { label: "Logo Design", value: 95 }, // PLACEHOLDER
    { label: "Typography", value: 90 }, // PLACEHOLDER
    { label: "Social Media Design", value: 88 }, // PLACEHOLDER
    { label: "Print & Poster Design", value: 86 }, // PLACEHOLDER
    { label: "Layout & Composition", value: 89 }, // PLACEHOLDER
  ],
  tools: [
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Adobe InDesign",
    "Figma",
    "After Effects",
  ], // PLACEHOLDER — adjust to your real tools
}

export const contact = {
  eyebrow: "Contact",
  headline: [
    [{ text: "Have a project" }],
    [{ text: "in mind?" }],
    [{ text: "Let's create something " }, { text: "unforgettable", accent: true }, { text: "." }],
  ] as Segment[][], // PLACEHOLDER
  sub: "Tell me about your brand, your goals and your timeline — I'll reply with next steps and a clear quote.", // PLACEHOLDER
}

export const footer = {
  blurb:
    "Graphic design studio crafting bold brands, identities and visuals with intent.", // PLACEHOLDER
  marqueeWord: "Design Destiny",
}
