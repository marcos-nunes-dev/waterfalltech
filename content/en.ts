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
import { legalEn } from "@/content/legal/en";

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
  cnpj: "42.804.319/0001-10",
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
  headline: { before: "Every clinic on", accent: "one", after: "screen" },
  lede: "Zenda is where you work if you run the schedule for several doctors. Connect each client's WhatsApp Business account, answer every patient from a single list — and know who is due back before the patient disappears.",
  primaryCta: { label: "Request access", href: "#access" },
  secondaryCta: { label: "See inside", href: "#showcase" },
  status: { label: "Private beta", detail: "Onboarding a small group of practices" },

  problem: {
    kicker: "The problem",
    headline: { before: "Five phones, no", accent: "memory", after: "" },
    body: "Running the schedule for several doctors means several WhatsApp accounts, usually on different handsets. Worse than the switching is what never gets written down: the patient seen in March who should return in September doesn't, because nobody remembers — and nobody remembers because there is nowhere to note it. Every missed return is revenue your client doesn't earn and work you can't bill for.",
  },

  featuresHeader: {
    kicker: "What it does",
    headline: { before: "Four things, and all four on the same", accent: "screen", after: "" },
  },
  features: [
    {
      id: "inbox",
      title: "Every patient in one list",
      body: "Connect the WhatsApp Business account of each doctor or clinic you serve. Every conversation lands in the same queue, labelled with whose it is — answering on behalf of the wrong doctor is the one mistake you cannot undo. Someone waiting three hours looks different from someone who just wrote.",
    },
    {
      id: "patients",
      title: "A record that fills itself in",
      body: "The patient is born from the conversation: a message arrives, the number becomes a record. You note what you learn — prefers mornings, comes with her daughter, latex allergy — and the history of visits, procedures and conversations sits alongside it. Records are per client: what you write for one doctor never shows on another's screen.",
    },
    {
      id: "returns",
      title: "Who is due back",
      body: "Each procedure carries the practice's return interval, and each patient can carry their own. Log the visit and the return date is already set. The list opens on whoever is most overdue: “7 months overdue”, “due in 20 days”. It's the difference between waiting for the patient to remember and calling first.",
    },
    {
      id: "clients",
      title: "Your clients, beside you",
      body: "What you charge each doctor and when it falls due. Whether anyone's WhatsApp has dropped or is missing a payment method at Meta — the silent case where the number connects and doesn't send. And how many patients each one brought this month, which is the number that carries the conversation about your rate.",
    },
  ],

  showcase: {
    kicker: "Inside",
    headline: { before: "Not a mockup. The", accent: "product", after: "running" },
    lede: "The screens below come from Zenda in use, with demonstration data. No real patient appears here. The interface is in Brazilian Portuguese — Zenda runs on WhatsApp in Brazil, and that is who it is built for.",
    shots: [
      {
        id: "inbox",
        src: "/zenda/inbox.png",
        alt: "Zenda inbox showing patients from several clinics in one list, each tagged with its client",
        title: "The single inbox",
        body: "Patients from all your clients in the same queue. Each row says which clinic the person belongs to, how long they have been waiting and how much is left of WhatsApp's 24-hour window — after it, only an approved template reopens the conversation.",
      },
      {
        id: "clients",
        src: "/zenda/clientes.png",
        alt: "Zenda client table with billing, connection health and monthly patient volume",
        title: "Your clients",
        body: "Sorted by who needs attention first: dropped connection, missing card at Meta, quality slipping, payment overdue. What breaks on its own shows up before the doctor calls to complain.",
      },
      {
        id: "patients",
        src: "/zenda/pacientes.png",
        alt: "Zenda patient list for one clinic, sorted by return date, with overdue and due-soon labels",
        title: "Who is due back",
        body: "Each client's patient list, opening on whoever is most overdue. Nothing to register: it fills itself with whoever has already messaged that number.",
      },
      {
        id: "record",
        src: "/zenda/ficha.png",
        alt: "Zenda patient record with return interval, logged procedures, notes and history",
        title: "The patient record",
        body: "Return interval, procedures already performed, notes only your team can see, and the history of visits and conversations. Changes save themselves — a save button on a note is the one you forget to press.",
      },
    ],
  },

  howTitle: "How it works",
  how: [
    { step: "Connect", body: "The doctor authorises with their own Meta account, and the number stays theirs. Nothing changes for the patient: same number as always, and WhatsApp Business on the phone keeps working exactly as before. If they allow it, that number's earlier conversations come across too." },
    { step: "Handle", body: "Every conversation in one list, tagged by client, with your own labels and a warning for anyone who has been waiting too long. The patient record opens beside it, with everything you already know." },
    { step: "Bring them back", body: "Log what was done and the return date sets itself. Every day the list shows who is overdue and who is due soon — and the work stops depending on somebody's memory." },
  ],

  faq: [
    {
      q: "Does it use the official WhatsApp Business API?",
      a: "Yes, exclusively Meta's official Cloud API. Unofficial libraries are banned in our codebase — not out of purism: they breach Meta's terms, and the risk is the doctor's number being banned, which is the practice's most critical asset. We connect through Coexistence: WhatsApp Business on their phone keeps working, the number doesn't change, and the patient notices nothing. If the doctor allows it at connection time, that number's earlier conversations come across too.",
    },
    {
      q: "Who pays Meta for the messages?",
      a: "The owner of the number — the doctor or the clinic — under their own company. That's Meta's rule for our type of partnership, not our choice: the billing account belongs to whoever owns the number. Since July 2026 billing in Brazil is in reais, invoiced by Facebook Brasil. In practice it tends to be small, and the doctor can see their own spend whenever they want. If they'd rather not add a card, you can be an administrator on their account and use yours, folding the cost into your monthly fee — the number stays theirs, and they can remove you at any time.",
    },
    {
      q: "What happens to patient data?",
      a: "It stays separated by client, not pooled. The record is per (client, patient) pair: the same person seen by two doctors has two records, and a note for one never appears on the other's screen — each doctor is the controller of their own patients' data. Message bodies and clinical notes never reach logs, monitoring or error reports. We run no cross-client aggregation of health data, not even for internal metrics. And when you lose a client, that doctor's data goes with them: the data map lives in a public project document, with legal basis and retention period per table.",
    },
    {
      q: "How many clients can one person handle?",
      a: "The product imposes no limit: there is one inbox, and filtering by client is for focus, not navigation. The real limit is Meta's messaging cap, which sits with each client's own account — so one client's volume never eats another's quota, and one client's reputation never drags down everyone else's delivery. We don't have a number from the beta yet, and we'd rather not invent one.",
    },
    {
      q: "Can I use it today?",
      a: "We're in private beta with a small group of practices. Connecting new numbers depends on Meta approving our application, which is their process and not ours — so access goes out by list, and we run your first connection together, on a call. Request access and we'll tell you where the queue stands.",
    },
    {
      q: "Who makes Zenda?",
      a: "Waterfall — the consultancy. Zenda came out of seeing the same problem in clinic after clinic: booking isn't the hard part; doing it across five WhatsApp accounts and remembering who was due back is.",
    },
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
  legal: legalEn,
  contact,
  studio,
  nextSlot,
  ui,
};
