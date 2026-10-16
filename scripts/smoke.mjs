/**
 * Runtime smoke test.
 *
 * Renders the production bundle inside jsdom, verifies the key content of
 * every section, then exercises the interactive paths:
 *   filter pills → card grid reflow → project overlay → Escape close → form submit.
 *
 * Run:  npm run build && npm run smoke
 */
import { readFileSync } from "node:fs"
import { JSDOM } from "jsdom"

const dom = new JSDOM("<!doctype html><html><body><div id='root'></div></body></html>", {
  url: "http://localhost/",
  pretendToBeVisual: true,
})

const { window } = dom

const define = (name, value) =>
  Object.defineProperty(globalThis, name, { value, configurable: true, writable: true })

define("window", window)
define("document", window.document)
define("navigator", window.navigator)
define("HTMLElement", window.HTMLElement)
define("Element", window.Element)
define("Node", window.Node)
define("MouseEvent", window.MouseEvent)
define("KeyboardEvent", window.KeyboardEvent)
define("Event", window.Event)
define("getComputedStyle", window.getComputedStyle.bind(window))
define("requestAnimationFrame", window.requestAnimationFrame.bind(window))
define("cancelAnimationFrame", window.cancelAnimationFrame.bind(window))

class FakeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}
define("IntersectionObserver", FakeObserver)
define("ResizeObserver", FakeObserver)
window.IntersectionObserver = FakeObserver
window.ResizeObserver = FakeObserver

/* Expose every remaining jsdom window global (MutationObserver, SVGElement,
   DOMRect, …) so the production bundle runs unmodified. */
for (const key of Object.getOwnPropertyNames(window)) {
  if (key in globalThis) continue
  try {
    const value = window[key]
    if (typeof value === "function" || (typeof value === "object" && value !== null)) {
      define(key, value)
    }
  } catch {
    /* ignore inaccessible window properties */
  }
}

window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener() {},
  removeEventListener() {},
  addListener() {},
  removeListener() {},
  dispatchEvent: () => false,
})

window.scrollTo = () => {}
window.Element.prototype.scrollTo = function () {}

/* ---- capture runtime errors ---- */
const errors = []
window.addEventListener("error", (e) => errors.push("window error: " + (e.error?.message ?? e.message)))
window.addEventListener("unhandledrejection", (e) => errors.push("unhandled rejection: " + e.reason))
const origConsoleError = console.error.bind(console)
console.error = (...args) => {
  errors.push("console.error: " + args.map(String).join(" "))
  origConsoleError(...args)
}

/* ---- load the production bundle ---- */
const html = readFileSync(new URL("../dist/index.html", import.meta.url), "utf8")
const match = html.match(/src="\/assets\/(index-[^"]+\.js)"/)
if (!match) {
  console.log("FAIL: could not find the bundle in dist/index.html — run `npm run build` first")
  process.exit(1)
}
try {
  await import(new URL(`../dist/assets/${match[1]}`, import.meta.url).href)
} catch (error) {
  console.log("FAIL: bundle threw during import —", error?.message ?? error)
  process.exit(1)
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
await wait(700)

const root = document.getElementById("root")
const text = () => root.textContent ?? ""

const results = []
const check = (name, ok, extra = "") => {
  results.push({ name, ok })
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${extra ? "  — " + extra : ""}`)
}
const click = (el) =>
  el.dispatchEvent(new window.MouseEvent("click", { bubbles: true, cancelable: true }))

/* ---- content checks ---- */
check("app mounted", root.childElementCount > 0)

const t = text()
check("brand present", t.includes("Design") && t.includes("Destiny"))
check("hero headline", t.includes("Every brand has") && t.includes("destiny."))
check("nav links", t.includes("About") && t.includes("Services") && t.includes("Skills"))
check("marquee strip", t.includes("Brand Identity"))
check("about section", t.includes("every brand deserves"))
check("portfolio heading", t.includes("Selected") && t.includes("Work"))
check("portfolio filter pills", t.includes("All Work") && t.includes("Posters & Ads"))
check("sample labels", t.includes("Sample"))
check("services list", t.includes("Logo Design") && t.includes("Complete Brand Packages"))
check("skills", t.includes("Tools I work with") && t.includes("%"))
check("contact heading", t.includes("Have a project") && t.includes("unforgettable"))
check("honest unset channels", t.includes("Not set — add in src/config/site.config.ts"))
check("footer", t.includes("All rights reserved"))
check("preloader visible on first load", t.includes("Loading experience"))

/* ---- filter interaction ---- */
const initialCards = root.querySelectorAll("article").length
check("12 project cards initially", initialCards === 12, `found ${initialCards}`)

const filterBtn = [...root.querySelectorAll("button")].find(
  (b) => b.textContent?.trim() === "Brand Identity",
)
check("filter pill found", Boolean(filterBtn))

if (filterBtn) {
  click(filterBtn)
  await wait(500)
  const filtered = root.querySelectorAll("article")
  check("filter reduces grid to 3 brand cards", filtered.length === 3, `found ${filtered.length}`)

  const cardButton = filtered[0]?.querySelector("button")
  check("card button found", Boolean(cardButton))

  if (cardButton) {
    click(cardButton)
    await wait(500)
    const dialog = root.querySelector('[role="dialog"]')
    check("project overlay opens", Boolean(dialog))
    check(
      "overlay shows 'no real client' notice",
      (dialog?.textContent ?? "").includes("no real client"),
    )
    check("URL hash updated", window.location.hash.startsWith("#project-"), window.location.hash)

    window.dispatchEvent(new window.KeyboardEvent("keydown", { key: "Escape", bubbles: true }))
    await wait(900)
    check("escape closes the overlay", !root.querySelector('[role="dialog"]'))
  }
}

/* ---- contact form honesty ---- */
const form = root.querySelector("form")
check("contact form found", Boolean(form))
if (form) {
  form.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }))
  await wait(200)
  check(
    "submitting unconnected form shows honest notice",
    text().includes("not connected to a submission service"),
  )
}

/* ---- runtime errors ---- */
check("no runtime errors", errors.length === 0, errors.slice(0, 3).join(" | "))

const failed = results.filter((r) => !r.ok)
console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
window.close()
process.exit(failed.length > 0 ? 1 : 0)
