/* ============================================================================
 *  The shape every locale dictionary must satisfy.
 * ----------------------------------------------------------------------------
 *  Deliberately written out by hand rather than derived with `typeof en`.
 *  Deriving it would bake the English string literals into the type and every
 *  translation would fail to compile. These types are widened to `string` on
 *  purpose — the compiler's job here is to guarantee that pt-BR has the same
 *  KEYS as en, not the same words.
 *
 *  Adding a field: add it here first, then to every file in content/.
 *  TypeScript will point at each locale that still needs it.
 * ========================================================================= */

/** Renders as: before + <italic serif>accent</italic serif> + after. */
export type HeadlineParts = {
  before: string;
  /** Exactly one word. It is the word the reader lands on. */
  accent: string;
  after: string;
};

export type Cta = { label: string; href: string };

export type SectionId =
  | "clients"
  | "studio"
  | "capabilities"
  | "work"
  | "products"
  | "process"
  | "contact";

export type Section = {
  id: SectionId;
  kicker: string;
  headline: HeadlineParts;
  lede: string;
};

export type SiteInfo = {
  name: string;
  domain: string;
  url: string;
  email: string;
  tagline: string;
  description: string;
  base: string;
  coverage: string;
  founded: number;
  socials: { label: string; href: string }[];
};

export type Hero = {
  headline: HeadlineParts;
  lede: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  status: {
    available: boolean;
    availableLabel: string;
    bookedLabel: string;
  };
};

export type Stat = { value: string; suffix: string; label: string };

export type Client = {
  name: string;
  sector: string;
  engagement: string;
  region: string;
  since: string;
  href?: string;
};

export type Capability = {
  id: string;
  title: string;
  summary: string;
  detail: string;
  bullets: string[];
};

export type WorkItem = {
  id: string;
  client: string;
  title: string;
  summary: string;
  outcomes: { value: string; label: string }[];
  stack: string[];
  year: string;
  href?: string;
  confidential?: boolean;
};

export type ProcessStep = { title: string; duration: string; body: string };

export type Product = {
  slug: string;
  name: string;
  kicker: string;
  tagline: string;
  description: string;
  status: "live" | "beta" | "building";
  year: string;
  href?: string;
};

export type Zenda = {
  name: string;
  headline: HeadlineParts;
  lede: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  status: { label: string; detail: string };
  problem: { kicker: string; headline: HeadlineParts; body: string };
  features: { id: string; title: string; body: string }[];
  how: { step: string; body: string }[];
  faq: { q: string; a: string }[];
};

export type Contact = {
  headline: HeadlineParts;
  body: string;
  cta: Cta;
};

/**
 * Prose that lives in the Studio section rather than in `sections`, because it
 * is body copy rather than section chrome. `{name}` and `{base}` are replaced
 * at render time by `interpolate()` in lib/utils.ts — keep the tokens intact
 * when translating.
 */
export type Studio = {
  statement: {
    /** Supports {name}. */
    first: string;
    /** Supports {base}. `emphasis` renders in italic serif. */
    second: { before: string; emphasis: string; after: string };
  };
  ledger: { based: string; coverage: string; founded: string };
  principles: { title: string; body: string }[];
};

/** The deliberately empty product slot under Zenda. */
export type NextSlot = { title: string; clause: string };

/**
 * Interface chrome — labels, aria strings and one-off notes. Everything a user
 * can read that is not marketing copy. Kept separate so a translator can see
 * at a glance which strings are UI and which are voice.
 */
export type Ui = {
  skipToContent: string;
  openMenu: string;
  closeMenu: string;
  primaryNav: string;
  sectionNav: string;
  footerNav: string;
  /** aria-label on the language switcher. */
  languageSwitcher: string;
  /** Accessible name for the wordmark link. Supports {name}. */
  home: string;
  /** Accessible name for the mobile menu dialog. Supports {name}. */
  menu: string;
  /** Ledger row label for the social links in the Studio section. */
  social: string;
  /** Column headings in the footer. */
  footerIndex: string;
  footerProducts: string;
  /** Work section. */
  confidential: string;
  caseStudyUnderNda: string;
  viewCaseStudy: string;
  /** Clients section — explains the gap in the ledger. */
  ndaNote: string;
  /** Product status pills, keyed by `Product["status"]`. */
  productStatus: { live: string; beta: string; building: string };
  /** Supports {name}. */
  openProductPage: string;
  /** Zenda page. */
  waterfallProduct: string;
  faqHeading: string;
  notFoundTitle: string;
  notFoundBody: string;
  backHome: string;
};

export type Dictionary = {
  site: SiteInfo;
  nav: Cta[];
  sections: Section[];
  hero: Hero;
  stats: Stat[];
  clients: Client[];
  capabilities: Capability[];
  work: WorkItem[];
  process: ProcessStep[];
  products: Product[];
  zenda: Zenda;
  contact: Contact;
  studio: Studio;
  nextSlot: NextSlot;
  ui: Ui;
};
