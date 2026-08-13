import type { MetadataRoute } from "next";
import { en } from "@/content/en";
import { productPath } from "@/lib/domain";
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
 * Products are listed at their canonical apex path (`/products/zenda`), not at
 * `zenda.<domain>`. The subdomain is the same document served through a
 * rewrite; pointing crawlers at one address keeps the two from competing.
 *
 * Content comes from the English dictionary because slugs and the origin are
 * routing facts, identical in every locale — nothing read here is translated.
 */

const { products, site } = en;

/** Fully-qualified URL for a locale-agnostic app path. */
function absolute(locale: Locale, path: string): string {
  return `${site.url}${localePath(locale, path)}`;
}

/** Every locale's address for one path, keyed by hreflang. */
function languagesFor(path: string) {
  return {
    ...Object.fromEntries(
      locales.map((locale) => [localeTags[locale], absolute(locale, path)]),
    ),
    "x-default": absolute(defaultLocale, path),
  };
}

/** The locale-agnostic paths worth crawling, with their relative weight. */
const ROUTES = [
  { path: "/", priority: 1 },
  ...products.map((product) => ({
    path: productPath(product.slug),
    priority: 0.8,
  })),
];

/**
 * `new Date()` is evaluated inside the function, so it becomes the build
 * timestamp during static generation rather than a module-scope side effect.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.flatMap(({ path, priority }) =>
    locales.map((locale) => ({
      url: absolute(locale, path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages: languagesFor(path) },
    })),
  );
}
