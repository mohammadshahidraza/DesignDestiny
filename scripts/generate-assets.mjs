/**
 * Renders the static branding assets (social share image + apple touch icon)
 * from their SVG sources, so they can be regenerated any time the design changes.
 *
 * Run:  npm run assets
 *
 * The social share image is rendered with the real Clash Display font files
 * (scripts/fonts/, Fontshare Free License — see scripts/fonts/FFL.txt), so the
 * preview card matches the site typography exactly.
 */
import { readFileSync, writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { Resvg } from "@resvg/resvg-js"

const fontFiles = ["./fonts/ClashDisplay-Regular.otf", "./fonts/ClashDisplay-Semibold.otf"].map(
  (p) => fileURLToPath(new URL(p, import.meta.url)),
)

function render(svgRel, outRel, width) {
  const svg = readFileSync(new URL(svgRel, import.meta.url), "utf8")
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
    font: {
      fontFiles,
      loadSystemFonts: true,
      defaultFontFamily: "Clash Display",
    },
  })
  const png = resvg.render().asPng()
  writeFileSync(new URL(outRel, import.meta.url), png)
  console.log(`OK  ${outRel}  (${width}px, ${(png.length / 1024).toFixed(1)} KB)`)
}

// 1200×630 — the standard Open Graph / WhatsApp link preview size
render("../public/og.svg", "../public/og-image.png", 1200)

// 180×180 — apple touch icon
render("../public/favicon.svg", "../public/apple-touch-icon.png", 180)
