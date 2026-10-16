import type { CoverVariant } from "../components/ui/CoverArt"

/**
 * 🧪 PLACEHOLDER PROJECTS.
 *
 * These are clearly-labelled sample projects used to preview the portfolio
 * layout. They are NOT real client work. When you have your own projects,
 * replace this file — keep the same shape (id, slug, title, category,
 * variant, gallery, deliverables, description).
 */
export type CategoryId = "logo" | "brand" | "social" | "poster" | "other"

export interface Project {
  id: string
  slug: string
  title: string
  category: CategoryId
  variant: CoverVariant
  gallery: CoverVariant[]
  deliverables: string[]
  description: string[]
}

export const categories: { id: CategoryId | "all"; label: string }[] = [
  { id: "all", label: "All Work" },
  { id: "logo", label: "Logo Design" },
  { id: "brand", label: "Brand Identity" },
  { id: "social", label: "Social Media" },
  { id: "poster", label: "Posters & Ads" },
  { id: "other", label: "Other Projects" },
]

export const categoryLabel: Record<CategoryId, string> = {
  logo: "Logo Design",
  brand: "Brand Identity",
  social: "Social Media Design",
  poster: "Posters & Advertising Creatives",
  other: "Other Graphic Design Projects",
}

export const projects: Project[] = [
  {
    id: "p01",
    slug: "logo-mark-explorations",
    title: "Logofolio — Mark Explorations Vol. 1",
    category: "logo",
    variant: "monogram",
    gallery: ["orbit", "grid"],
    deliverables: ["Logo suite", "Monogram", "Usage sheet"],
    description: [
      "A sample logo study exploring letterform balance, negative space and how a mark holds up from a favicon to a billboard.",
      "Swap this project out in src/data/projects.ts with your own case study.",
    ],
  },
  {
    id: "p02",
    slug: "monogram-study-letter-d",
    title: "Monogram Study — Letter D",
    category: "logo",
    variant: "specimen",
    gallery: ["monogram", "halftone"],
    deliverables: ["Monogram", "Grid construction", "Applications"],
    description: [
      "A typographic monogram exploration — geometry, stroke contrast and grid-built construction shown in detail.",
      "Placeholder content for layout preview only.",
    ],
  },
  {
    id: "p03",
    slug: "wordmark-exploration-studio-type",
    title: "Wordmark Exploration — Studio Type",
    category: "logo",
    variant: "orbit",
    gallery: ["specimen", "grid"],
    deliverables: ["Wordmark", "Lockups", "Type pairing"],
    description: [
      "A wordmark study focused on spacing, rhythm and custom letterform edits that give a name its own voice.",
      "Placeholder content for layout preview only.",
    ],
  },
  {
    id: "p04",
    slug: "identity-system-concept-board",
    title: "Identity System — Concept Board",
    category: "brand",
    variant: "grid",
    gallery: ["cards", "specimen"],
    deliverables: ["Concept board", "Colour system", "Type system"],
    description: [
      "A sample identity concept board showing how colour, type and layout rules come together into a coherent visual system.",
      "Placeholder content for layout preview only.",
    ],
  },
  {
    id: "p05",
    slug: "brand-guidelines-sample-spread",
    title: "Brand Guidelines — Sample Spread",
    category: "brand",
    variant: "specimen",
    gallery: ["grid", "orbit"],
    deliverables: ["Guideline pages", "Do & don't sheet", "Asset kit"],
    description: [
      "A preview spread from a brand guideline document — logo usage, clear space, colour codes and typography rules.",
      "Placeholder content for layout preview only.",
    ],
  },
  {
    id: "p06",
    slug: "visual-identity-colour-type-study",
    title: "Visual Identity — Colour & Type Study",
    category: "brand",
    variant: "cards",
    gallery: ["halftone", "monogram"],
    deliverables: ["Palette study", "Type specimens", "Stationery"],
    description: [
      "Palette and typeface studies that show how a brand's personality is set before a single layout is made.",
      "Placeholder content for layout preview only.",
    ],
  },
  {
    id: "p07",
    slug: "social-kit-feed-layout-study",
    title: "Social Kit — Feed Layout Study",
    category: "social",
    variant: "social",
    gallery: ["grid", "poster"],
    deliverables: ["Feed templates", "Story set", "Highlight covers"],
    description: [
      "A sample social kit: nine-post feed grid, story templates and highlight covers built from one flexible system.",
      "Placeholder content for layout preview only.",
    ],
  },
  {
    id: "p08",
    slug: "campaign-grid-story-set",
    title: "Campaign Grid — Story Set",
    category: "social",
    variant: "halftone",
    gallery: ["social", "cards"],
    deliverables: ["Campaign tiles", "Story sequence", "Ad variants"],
    description: [
      "A campaign tile set exploring repetition, scale and motion-friendly composition for stories and paid ads.",
      "Placeholder content for layout preview only.",
    ],
  },
  {
    id: "p09",
    slug: "poster-series-type-experiment",
    title: "Poster Series — Type Experiment",
    category: "poster",
    variant: "poster",
    gallery: ["halftone", "specimen"],
    deliverables: ["Poster series", "Print specs", "Type treatment"],
    description: [
      "A three-poster series experiment: oversized typography, halftone textures and a strict two-colour palette.",
      "Placeholder content for layout preview only.",
    ],
  },
  {
    id: "p10",
    slug: "ad-creative-concept-layout",
    title: "Ad Creative — Concept Layout",
    category: "poster",
    variant: "orbit",
    gallery: ["specimen", "orbit"],
    deliverables: ["Concept layout", "Copy treatment", "Format variants"],
    description: [
      "An advertising concept layout balancing headline hierarchy, imagery and call-to-action across formats.",
      "Placeholder content for layout preview only.",
    ],
  },
  {
    id: "p11",
    slug: "packaging-concept-label-study",
    title: "Packaging Concept — Label Study",
    category: "other",
    variant: "cards",
    gallery: ["grid", "halftone"],
    deliverables: ["Label design", "Dieline", "Mockup direction"],
    description: [
      "A packaging label study exploring shelf presence, print finishes and how a brand system wraps around a product.",
      "Placeholder content for layout preview only.",
    ],
  },
  {
    id: "p12",
    slug: "editorial-layout-zine-spread",
    title: "Editorial Layout — Zine Spread",
    category: "other",
    variant: "halftone",
    gallery: ["specimen", "poster"],
    deliverables: ["Spread layout", "Grid system", "Print-ready file"],
    description: [
      "An editorial spread exploring grid systems, pull quotes and the rhythm of type across facing pages.",
      "Placeholder content for layout preview only.",
    ],
  },
]

export function getNextProject(current: Project): Project {
  const i = projects.findIndex((p) => p.id === current.id)
  return projects[(i + 1) % projects.length]
}
