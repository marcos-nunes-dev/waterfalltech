import type { MetadataRoute } from "next";
import { en } from "@/content/en";
import { productUrl } from "@/lib/domain";
import {
  defaultLocale,
  localePath,
  localeTags,
  locales,
  type Locale,
} from "@/lib/i18n";

/**
 * Served at /sitemap.xml — the home page plus one entry per product, listed
 * once for every locale:
 *
 *     /en                    /pt-BR
 *     /en/products/zenda     /pt-BR/products/zenda
 *
 * Each entry carries the full `alternates.languages` map (supported by
 * MetadataRoute.Sitemap since Next 14.2), so a crawler that finds either
 * address knows the other is the same document in another language and the two
 * never compete as duplicate content. `x-default` points at English, matching
 * the canonical alternates in app/[locale]/layout.tsx.
 *
 * Products are listed at their SUBDOMAIN (`zenda.<domain>/<locale>`), which is
 * their canonical address — the apex path 308s there. Listing the apex path
 * would point crawlers at a redirect.
 *
 * Content comes from the English dictionary because slugs and the origin are
 * routing facts, identical in every locale — nothing read here is translated.
 */

const { products, site } = en;

/** Fully-qualified URL for a locale-agnostic app path. */
function absolute(locale: Locale, path: string): string {
  return `${site.url}${localePath(locale, path)}`;
}

/** Home lives on the apex; each product lives on its own subdomain. */
type Entry = { url: (locale: Locale) => string; priority: number };

const ROUTES: Entry[] = [
  { url: (locale) => absolute(locale, "/"), priority: 1 },
  ...products.map((product) => ({
    url: (locale: Locale) => productUrl(product.slug, locale),
    priority: 0.8,
  })),
  // Baixa prioridade e alta necessidade: ninguem procura a politica no Google,
  // mas ela precisa ser rastreavel — o App Review da Meta verifica se o
  // endereco publicado responde.
  ...(["privacy", "terms", "data-deletion"] as const).map((doc) => ({
    url: (locale: Locale) => absolute(locale, `/legal/${doc}`),
    priority: 0.3,
  })),
];

/** Every locale's address for one entry, keyed by hreflang. */
function languagesForEntry(entry: Entry) {
  return {
    ...Object.fromEntries(
      locales.map((locale) => [localeTags[locale], entry.url(locale)]),
    ),
    "x-default": entry.url(defaultLocale),
  };
}

/**
 * `new Date()` is evaluated inside the function, so it becomes the build
 * timestamp during static generation rather than a module-scope side effect.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.flatMap((entry) =>
    locales.map((locale) => ({
      url: entry.url(locale),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: entry.priority,
      alternates: { languages: languagesForEntry(entry) },
    })),
  );
}
