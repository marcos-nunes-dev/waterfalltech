import { en } from "@/content/en";
import { ptBR } from "@/content/pt-BR";
import type { Dictionary, Section, SectionId } from "@/content/types";

/* ============================================================================
 *  Locales
 * ----------------------------------------------------------------------------
 *  Two locales, each served from its own URL prefix:
 *      /en          /en/products/zenda
 *      /pt-BR       /pt-BR/products/zenda
 *  proxy.ts redirects any unprefixed path to one of them, so every rendered
 *  page always sits inside app/[locale]/.
 * ========================================================================= */

export const locales = ["en", "pt-BR"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** What the language switcher shows. Short — it sits in the nav bar. */
export const localeLabels: Record<Locale, string> = {
  en: "EN",
  "pt-BR": "PT",
};

/** Full names, for aria-labels and the <html lang> hreflang alternates. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  "pt-BR": "Português (Brasil)",
};

/** BCP-47 tags for <html lang> and hreflang. */
export const localeTags: Record<Locale, string> = {
  en: "en",
  "pt-BR": "pt-BR",
};

const dictionaries: Record<Locale, Dictionary> = {
  en,
  "pt-BR": ptBR,
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** Falls back to the default rather than throwing — a bad URL should not 500. */
export function getDict(locale: string | undefined): Dictionary {
  return dictionaries[isLocale(locale) ? locale : defaultLocale];
}

/* -------------------------------------------------------------------------- */
/*  Dates                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * `2026-08-14` in the reader's locale, without dragging in a date library.
 *
 * Lives here rather than in the one component that used to own it because two
 * unrelated dates now need it — a legal document's effective date and the
 * company's founding date — and the second one is checked against a public
 * registry. Two copies of this function is two chances to be off by a day.
 */
export function formatDate(iso: string, locale: Locale): string {
  const [year, month, day] = iso.split("-").map(Number);
  // Constructed in UTC and read in UTC: `new Date("2026-08-14")` parses as
  // midnight UTC, which in São Paulo is still the 13th. A legal document that
  // reports the wrong effective date is a small error with a long tail.
  return new Date(Date.UTC(year!, month! - 1, day!)).toLocaleDateString(
    localeTags[locale],
    { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" },
  );
}

/** Just the year of an ISO date, for the copyright range in the footer. */
export function yearOf(iso: string): number {
  return Number(iso.slice(0, 4));
}

/* -------------------------------------------------------------------------- */
/*  Section helpers — the page spine, resolved per locale                     */
/* -------------------------------------------------------------------------- */

/** 1-based position of a section, for the mono numerals in section headers. */
export function sectionIndex(dict: Dictionary, id: SectionId): number {
  return dict.sections.findIndex((s) => s.id === id) + 1;
}

/** Kicker + headline + lede for a section, in the active locale. */
export function sectionCopy(dict: Dictionary, id: SectionId): Section {
  const found = dict.sections.find((s) => s.id === id);
  if (!found) throw new Error(`Unknown section: ${id}`);
  return found;
}

/* -------------------------------------------------------------------------- */
/*  Link helpers — every internal href must carry the locale prefix           */
/* -------------------------------------------------------------------------- */

/**
 * Prefix an app path with the active locale.
 *   localePath("pt-BR", "/products/zenda")  ->  "/pt-BR/products/zenda"
 *   localePath("en", "/")                   ->  "/en"
 * In-page hashes are returned untouched — they are not routes.
 */
export function localePath(locale: Locale, path: string): string {
  if (path.startsWith("#") || /^(https?:|mailto:)/.test(path)) return path;
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

/**
 * Swap the locale on the current pathname, keeping the reader where they are.
 * Used by the language switcher.
 */
export function switchLocalePath(pathname: string, next: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (isLocale(segments[0])) {
    segments[0] = next;
    return `/${segments.join("/")}`;
  }
  return `/${next}${pathname === "/" ? "" : pathname}`;
}
