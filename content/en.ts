/* ============================================================================
 *  WATERFALL — ENGLISH CONTENT
 * ----------------------------------------------------------------------------
 *  ⚠️  EVERYTHING MARKED `PLACEHOLDER` IS INVENTED. REPLACE IT.
 *
 *  This file and content/pt-BR.ts must stay structurally IDENTICAL — same keys,
 *  same array lengths, same order. Only the prose differs. The `Dictionary`
 *  type in content/types.ts enforces the keys; array lengths are on you.
 *
 *  Nothing here is hard-coded into components. Search "PLACEHOLDER" to find
 *  every value that still needs your real data.
 *
 *  Quick checklist before launch:
 *    1. `site.domain`      — your real domain (drives subdomain links + SEO)
 *    2. `site.email`       — real contact address
 *    3. `clients`          — real client names, or delete the ones you can't name
 *    4. `work`             — real case studies + their live URLs
 *    5. `products`/`zenda` — what Zenda actually does
 * ========================================================================= */

import type {
  Capability,
  Client,
  Contact,
  Dictionary,
  Hero,
  Product,
  ProcessStep,
  NextSlot,
  Section,
  SiteInfo,
  Stat,
  Studio,
  Ui,
  WorkItem,
  Zenda,
} from "./types";

const site: SiteInfo = {
  name: "Waterfall",
  domain: "waterfalltech.xyz",
  /** Canonical origin. Keep in sync with `domain` above. */
  url: "https://waterfalltech.xyz",
  /** PLACEHOLDER — confirm this mailbox actually exists and is watched. */
  email: "hello@waterfalltech.xyz",
  /** Shown in the nav + hero. Keep it under ~9 words. */
  tagline: "An engineering partner for companies that ship",
  description:
    "Waterfall is a technology consultancy. We embed senior engineers into product teams at companies across the US and Europe — and we build our own products.",
  /** PLACEHOLDER — where you're actually based, and the timezones you cover. */
  base: "Rio de Janeiro, Brazil",
  coverage: "UTC−3 · overlapping US & EU hours",
  founded: 2021,
  socials: [
    /** PLACEHOLDER — delete any you don't have. */
    { label: "LinkedIn", href: "https://linkedin.com/company/waterfall" },
    { label: "GitHub", href: "https://github.com/waterfall" },
    { label: "X", href: "https://x.com/waterfall" },
  ],
};

/* -------------------------------------------------------------------------- */
/*  NAVIGATION                                                                */
/* -------------------------------------------------------------------------- */

const nav: Dictionary["nav"] = [
  { label: "Work", href: "#work" },
  { label: "Products", href: "#products" },
  { label: "Studio", href: "#studio" },
  { label: "Process", href: "#process" },
];

/**
 * The page's spine. Drives the section indices in each header AND the marker
 * positions on the fixed cascade rail — they cannot drift apart because both
 * read this array. Order here is the order on the page.
 */
const sections: Section[] = [
  {
    id: "clients",
    kicker: "Clients",
    headline: { before: "Companies that", accent: "already", after: "had engineers" },
    lede: "They didn't need more headcount. They needed the specific problem solved, by people who had solved it before.",
  },
  {
    id: "studio",
    kicker: "Studio",
    headline: { before: "A small team,", accent: "deliberately", after: "" },
    lede: "",
  },
  {
    id: "capabilities",
    kicker: "Capabilities",
    headline: { before: "What we're", accent: "actually", after: "good at" },
    lede: "Five things, done well. Anything outside this list we'll tell you honestly that we're not your best option.",
  },
  {
    id: "work",
    kicker: "Selected work",
    headline: { before: "Systems we", accent: "shipped", after: "" },
    lede: "Some clients we can name, some we can't. The problems are real either way.",
  },
  {
    id: "products",
    kicker: "Products",
    headline: { before: "We build for", accent: "ourselves", after: "too" },
    lede: "Consultancies that never ship their own product lose the instinct for it. So we ship.",
  },
  {
    id: "process",
    kicker: "How we work",
    headline: { before: "Four stages,", accent: "downhill", after: "" },
    lede: "No discovery phase that bills for three months and produces a slide deck.",
  },
  {
    id: "contact",
    kicker: "Contact",
    headline: { before: "Tell us what's", accent: "stuck", after: "" },
    lede: "One email, a real reply from an engineer within two working days. If we're not the right fit we'll say so and point you somewhere better.",
  },
];

/* -------------------------------------------------------------------------- */
/*  HERO                                                                      */
/* -------------------------------------------------------------------------- */

const hero: Hero = {
  /** The emphasised word renders in italic serif. Keep it to ONE word. */
  headline: { before: "Engineering that", accent: "compounds", after: "" },
  lede: "We embed senior engineers inside product teams at companies in the US and Europe. Fewer people, further along — and the systems hold up after we leave.",
  primaryCta: { label: "Start a project", href: "#contact" },
  secondaryCta: { label: "See selected work", href: "#work" },
  status: {
    /** Set to false when you're booked out — the dot and copy both change. */
    available: true,
    availableLabel: "Taking new engagements — Q3",
    bookedLabel: "Booked through Q3 — join the waitlist",
  },
};

/* -------------------------------------------------------------------------- */
/*  STATS — shown as a ledger strip. Keep to 4. Numbers must be defensible.   */
/* -------------------------------------------------------------------------- */

/*
 *  The first number is real — it counts the `clients` array below, so keep them
 *  in step. ⚠️ The middle two are DEMO; make them defensible or cut them.
 */
const stats: Stat[] = [
  { value: "8", suffix: "", label: "Companies shipped for" },
  { value: "3", suffix: "", label: "Countries" },
  { value: "11", suffix: "yrs", label: "Median engineer experience" },
  { value: "1", suffix: "", label: "Product of our own" },
];

/* -------------------------------------------------------------------------- */
/*  CLIENTS — rendered as an editorial ledger, not a logo wall.               */
/*  Text beats fake logos. Add `href` only where you can link publicly.       */
/* -------------------------------------------------------------------------- */

/*
 *  REAL CLIENTS. The `name`, `sector`, `region` and `href` of each row are
 *  accurate — taken from the company's own site.
 *
 *  ⚠️  `engagement` and `since` are DEMO on every row. They are plausible, not
 *  true. Replace each with the actual scope of work and the year it started
 *  before this goes live — and mirror the edit in content/pt-BR.ts.
 *
 *  Order is deliberate: strongest name recognition first. Re-order freely.
 */
const clients: Client[] = [
  { name: "Hoag", sector: "Health system", engagement: "Patient platform", region: "United States", since: "2023", href: "https://www.hoag.org/" },
  { name: "Learned Hand", sector: "Legal technology", engagement: "AI product engineering", region: "United States", since: "2024", href: "https://www.learned-hand.ai/" },
  { name: "Perch Insights", sector: "Revenue operations", engagement: "Analytics platform", region: "United States", since: "2024", href: "https://www.perchinsights.com/" },
  { name: "SanarFlix", sector: "Medical education", engagement: "Platform at scale", region: "Brazil", since: "2022", href: "https://sanarflix.com.br/" },
  { name: "Veteran Benefits Guide", sector: "Veterans services", engagement: "Claims workflow", region: "United States", since: "2023", href: "https://vbg.com/" },
  { name: "Alokai", sector: "People intelligence", engagement: "Product engineering", region: "Europe", since: "2025", href: "https://alokai.ai/" },
  { name: "Flowerplot", sector: "Marketing analytics", engagement: "Product engineering", region: "United States", since: "2025", href: "https://www.flowerplot.com/" },
  { name: "Berimbau", sector: "Hospitality", engagement: "Web & ordering", region: "United States", since: "2024", href: "https://www.berimbaunyc.com/" },
];

/* -------------------------------------------------------------------------- */
/*  CAPABILITIES — hover an index row, detail reveals. Progressive disclosure. */
/* -------------------------------------------------------------------------- */

const capabilities: Capability[] = [
  {
    id: "product-engineering",
    title: "Product engineering",
    summary: "Senior engineers embedded in your team, shipping from week one.",
    detail:
      "We don't hand you a discovery deck. We join your standup, take tickets off your board, and open pull requests against your repo. Most engagements are two to four engineers running as a self-sufficient pod inside your product org.",
    bullets: ["Full-stack delivery", "Your repo, your process", "2–4 engineer pods", "Async-first, timezone-overlapped"],
  },
  {
    id: "platform",
    title: "Platform & infrastructure",
    summary: "Make the deploy boring and the bill smaller.",
    detail:
      "Build pipelines that finish, environments that reproduce, and infrastructure your team can reason about at 3am. We inherit systems as often as we design them, and we leave documentation that outlives the engagement.",
    bullets: ["CI/CD that finishes under 10 min", "IaC & environment parity", "Observability you actually read", "Cost teardown"],
  },
  {
    id: "ai",
    title: "AI systems",
    summary: "LLM features that survive contact with real users.",
    detail:
      "Retrieval, evaluation, guardrails, and cost control — the unglamorous parts that decide whether an AI feature ships or quietly gets rolled back. We instrument before we optimise and we benchmark against your data, not a demo set.",
    bullets: ["Retrieval & context design", "Eval harnesses and regression suites", "Latency and spend budgets", "Human-in-the-loop workflows"],
  },
  {
    id: "rescue",
    title: "Rescue & modernisation",
    summary: "Inherit the codebase nobody wants to touch.",
    detail:
      "A frozen release train, a framework three majors behind, the one service only one person understands. We map it, stabilise it, and migrate it in slices that keep shipping — no eighteen-month rewrite with a big-bang cutover at the end.",
    bullets: ["Incremental strangler migrations", "Test coverage from zero", "Dependency and framework upgrades", "Knowledge transfer, written down"],
  },
  {
    id: "fractional",
    title: "Fractional leadership",
    summary: "Technical direction without a full-time hire.",
    detail:
      "Architecture review, hiring calibration, roadmap sequencing, and the hard call on build-versus-buy. For teams that have engineers but not yet the person who decides how they work.",
    bullets: ["Architecture review", "Hiring loops & calibration", "Roadmap sequencing", "Vendor and build/buy calls"],
  },
];

/* -------------------------------------------------------------------------- */
/*  SELECTED WORK                                                             */
/* -------------------------------------------------------------------------- */

/*
 *  SELECTED WORK — four of the engagements above, written up.
 *
 *  `client`, `title`, `href` and every `outcomes` figure are REAL.
 *
 *  ⚠️  Still to fix: `stack` is an educated guess from each product's public
 *  surface, not a statement of what the team actually used, and `year` is a
 *  guess too. Correct both before launch.
 *
 *  Also worth doing: get each client's explicit OK to be named and to have
 *  their numbers published. Where you can't, set `confidential: true` and drop
 *  `href` — that renders "Case study under NDA" instead of a link.
 *
 *  Mirror every edit in content/pt-BR.ts.
 */
const work: WorkItem[] = [
  {
    id: "learned-hand",
    client: "Learned Hand",
    title: "An AI case-preparation platform judges will actually trust",
    summary:
      "Fact extraction, issue mapping and motion analysis over court filings — where every generated claim has to trace back to a verifiable citation in the source document, because the reader is a judge. Now on the bench in over 300 courtrooms, and the company was acquired on the strength of it.",
    outcomes: [
      { value: "300+", label: "judges using it" },
      { value: "Acquired", label: "outcome for the company" },
    ],
    stack: ["TypeScript", "Python", "Postgres", "Claude"],
    year: "2024",
    href: "https://www.learned-hand.ai/",
  },
  {
    id: "perch-insights",
    client: "Perch Insights",
    title: "Real-time analytics over the whole customer journey",
    summary:
      "CRM, dialer, marketing and billing data unified into one model, with agents watching for anomalies and answering questions in natural language instead of waiting for someone to build a dashboard. It raised a three-million-dollar round after launch.",
    outcomes: [{ value: "US$3M", label: "raised after launch" }],
    stack: ["TypeScript", "Python", "Snowflake", "React"],
    year: "2024",
    href: "https://www.perchinsights.com/",
  },
  {
    id: "sanarflix",
    client: "SanarFlix",
    title: "Brazil's largest medical-education platform, under exam-season load",
    summary:
      "Two hundred thousand practice questions, thousands of video lectures and AI tutoring, serving Brazilian medical students — with traffic that spikes hard around residency and ENAMED exam dates.",
    outcomes: [
      { value: "#1", label: "medical-ed platform in Brazil" },
      { value: "200k+", label: "practice questions" },
    ],
    stack: ["TypeScript", "React", "Node.js", "Postgres"],
    year: "2022",
    href: "https://sanarflix.com.br/",
  },
  {
    id: "hoag",
    client: "Hoag",
    title: "Digital patient experience for a regional health system",
    summary:
      "Care navigation across a dozen specialty institutes, virtual visits and imaging, for a health system that sees more than 450,000 patients a year — the kind of surface where an ambiguous button costs someone a real appointment.",
    outcomes: [{ value: "450k+", label: "patients a year" }],
    stack: ["TypeScript", "React", "Node.js", "Azure"],
    year: "2023",
    href: "https://www.hoag.org/",
  },
];

/* -------------------------------------------------------------------------- */
/*  PROCESS — the literal waterfall. Steps cascade down the page.             */
/* -------------------------------------------------------------------------- */

const process: ProcessStep[] = [
  {
    title: "Read the system",
    duration: "Week 1",
    body: "We read the code, the incidents, and the backlog before we write a line. You get a written map of what exists and where it hurts — useful even if you never hire us.",
  },
  {
    title: "Ship something small",
    duration: "Week 2",
    body: "A real change in production inside the first two weeks. It proves the pipeline, the access, and the working relationship all at once.",
  },
  {
    title: "Run as a pod",
    duration: "Month 1 →",
    body: "Two to four engineers operating inside your process — your board, your reviews, your on-call if you want it. Weekly written updates, no status theatre.",
  },
  {
    title: "Hand back stronger",
    duration: "Exit",
    body: "Documentation, runbooks, and a team that can maintain what we built. The engagement ends; the leverage stays. We're happy to be replaceable.",
  },
];

/* -------------------------------------------------------------------------- */
/*  OWN PRODUCTS — each `slug` becomes both /products/<slug> and              */
/*  <slug>.<domain> via middleware. Adding an entry here is all it takes.     */
/* -------------------------------------------------------------------------- */

const products: Product[] = [
  {
    slug: "zenda",
    name: "Zenda",
    kicker: "Our first product",
    tagline: "Every clinic's WhatsApp in one inbox",
    description:
      "Zenda is built for the people who run medical schedules. Connect the WhatsApp Business number of every clinic you look after, work all of those conversations from one screen, and keep the calendar and the appointment confirmations right beside the thread.",
    status: "beta",
    year: "2025",
  },
];

/* -------------------------------------------------------------------------- */
/*  ZENDA — full content for zenda.<domain>                                   */
/*  ⚠️  ALL PLACEHOLDER. Rewrite once Zenda's positioning is settled.         */
/* -------------------------------------------------------------------------- */

const zenda: Zenda = {
  name: "Zenda",
  headline: { before: "Every clinic's WhatsApp,", accent: "one", after: "inbox" },
  lede: "Zenda is where medical schedulers work. Connect the WhatsApp Business number of every clinic you manage, answer all of it from one screen, and book, move and confirm appointments without leaving the conversation.",
  primaryCta: { label: "Request access", href: "#access" },
  secondaryCta: { label: "How it works", href: "#how" },
  status: { label: "Private beta", detail: "Onboarding a small group of clinics" },

  problem: {
    kicker: "The problem",
    headline: { before: "One scheduler, five phones, and a", accent: "calendar", after: "nobody else can see" },
    body: "Whoever manages appointments for several clinics is doing it across several WhatsApp accounts, usually on several devices. Confirmations go out by hand, one message at a time. A patient who wrote yesterday has no history anyone else can find, and when that person takes a day off, the schedule goes with them.",
  },

  features: [
    {
      id: "inbox",
      title: "Every number in one inbox",
      body: "Connect the WhatsApp Business account of each clinic you look after. Every conversation arrives in the same queue, tagged by clinic, instead of on a different phone in a different drawer.",
    },
    {
      id: "calendar",
      title: "The calendar beside the conversation",
      body: "Book, move and cancel while you are still reading what the patient wrote. No switching to another system and typing the name a second time.",
    },
    {
      id: "confirmations",
      title: "Confirmations that run themselves",
      body: "Automatic reminders and confirmation requests go out on schedule, and the answers update the calendar. Confirming a full day stops being someone's whole morning.",
    },
    {
      id: "team",
      title: "More than one person on the same number",
      body: "Assign conversations, leave internal notes, hand a patient over mid-thread. Everyone sees the same history, so nobody has to ask the patient to explain it again.",
    },
  ],

  how: [
    { step: "Connect", body: "Link each clinic's WhatsApp Business number. Minutes per clinic, and nothing changes for the patient — they keep writing to the same number they always did." },
    { step: "Organise", body: "Conversations land in one inbox with the day's schedule alongside. Assign them, tag them by clinic, answer them." },
    { step: "Confirm", body: "Reminders and confirmation requests go out automatically. Replies update the calendar, and you see what is still unconfirmed at a glance." },
  ],

  faq: [
    /** DEMO — confirm the integration details before publishing. */
    { q: "Does it use the official WhatsApp Business API?", a: "DEMO — replace with the real answer. It should say exactly how a number is connected, whether an existing WhatsApp Business account can be migrated, and what happens to the message history already on that number." },
    /** DEMO — set a real number once you know it. */
    { q: "How many clinics can one person handle?", a: "DEMO — replace with the real answer, ideally with a number from the beta. Say whether pricing is per clinic, per number or per seat." },
    { q: "What happens to patient data?", a: "DEMO — replace with the real answer, and be specific about LGPD: where the data lives, how long messages are retained, who inside the clinic can read them, and how a patient's data is deleted on request. This is the question that decides the sale for a clinic." },
    { q: "Who builds Zenda?", a: "Waterfall — the consultancy. Zenda came out of watching the same problem in clinic after clinic: the scheduling is not hard, but doing it across five WhatsApp accounts is." },
  ],
};

/* -------------------------------------------------------------------------- */
/*  CONTACT                                                                   */
/* -------------------------------------------------------------------------- */

const contact: Contact = {
  headline: { before: "Tell us what's", accent: "stuck", after: "" },
  body: "One email, a real reply from an engineer within two working days. If we're not the right fit we'll say so and point you somewhere better.",
  cta: { label: "Write to us", href: `mailto:${site.email}` },
};

/* -------------------------------------------------------------------------- */
/*  STUDIO — body copy for the "who we are" section                           */
/*  {name} and {base} are substituted at render time. Keep the braces.        */
/* -------------------------------------------------------------------------- */

const studio: Studio = {
  statement: {
    first:
      "{name} is a technology consultancy, and a deliberately small one. We take a handful of engagements at a time and staff each with engineers who have already built the thing you are about to build.",
    second: {
      before:
        "We work out of {base}, close enough to the American day and early enough for the European one. Everyone here has built systems and then",
      emphasis: "stayed to maintain them",
      after:
        ", which is the part of the job that changes how you build the next one.",
    },
  },
  ledger: { based: "Based", coverage: "Coverage", founded: "Founded" },
  principles: [
    {
      title: "Seniority over headcount",
      body: "Adding engineers to a late project is the oldest mistake in software and it still gets made every quarter. We would rather send three people who have solved your problem before than eight who will learn it on your budget.",
    },
    {
      title: "Write it down",
      body: "A decision that lives in one person's head is a decision your team relitigates in six months. Everything we conclude lands in a document your engineers can read, argue with, and reverse without us in the room.",
    },
    {
      title: "Replaceable on purpose",
      body: "The best outcome of an engagement is that you stop needing it. We plan the handover in the first week, which has cost us the occasional renewal and has never once cost us a reference.",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  The empty product slot. Promote it to `products` when it becomes real.    */
/* -------------------------------------------------------------------------- */

const nextSlot: NextSlot = {
  title: "Next product in progress",
  clause:
    "Same origin as Zenda: something we needed on client work and could not buy. This one is about what a team inherits when the engineers who built the system move on.",
};

/* -------------------------------------------------------------------------- */
/*  UI CHROME — labels and aria strings, not marketing voice                  */
/* -------------------------------------------------------------------------- */

const ui: Ui = {
  skipToContent: "Skip to content",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  primaryNav: "Primary",
  sectionNav: "Section navigation",
  footerNav: "Footer",
  languageSwitcher: "Change language",
  home: "{name} — home",
  menu: "{name} — menu",
  social: "Social",
  footerIndex: "Index",
  footerProducts: "Products",
  confidential: "Confidential",
  caseStudyUnderNda: "Case study under NDA",
  viewCaseStudy: "View case study",
  ndaNote:
    "Several engagements are covered by NDA and aren't listed here. We can talk through the shape of that work — the problem, the stack, what changed — without naming the company.",
  productStatus: {
    live: "Live",
    beta: "Private beta",
    building: "In development",
  },
  openProductPage: "Open the {name} page",
  waterfallProduct: "A Waterfall product",
  faqHeading: "Questions",
  notFoundTitle: "This page doesn't exist",
  notFoundBody:
    "The link may be out of date, or the page may have moved. Everything else is one click away.",
  backHome: "Back to the site",
};

/* -------------------------------------------------------------------------- */
/*  THE DICTIONARY — what lib/i18n.ts serves for locale "en"                  */
/* -------------------------------------------------------------------------- */

export const en: Dictionary = {
  site,
  nav,
  sections,
  hero,
  stats,
  clients,
  capabilities,
  work,
  process,
  products,
  zenda,
  contact,
  studio,
  nextSlot,
  ui,
};
