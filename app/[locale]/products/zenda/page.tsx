import type { Metadata } from "next";
import { Footer } from "@/components/site/footer";
import { ZendaCta } from "@/components/zenda/zenda-cta";
import { ZendaFaq } from "@/components/zenda/zenda-faq";
import { ZendaFeatures } from "@/components/zenda/zenda-features";
import { ZendaHero } from "@/components/zenda/zenda-hero";
import { ZendaHow } from "@/components/zenda/zenda-how";
import { ZendaNav } from "@/components/zenda/zenda-nav";
import { ZendaProblem } from "@/components/zenda/zenda-problem";
import { productPath } from "@/lib/domain";
import {
  getDict,
  isLocale,
  localePath,
  localeTags,
  locales,
  type Locale,
} from "@/lib/i18n";

/* --------------------------------------------------------------------------
 * Zenda — the product page. Served at /<locale>/products/zenda on the apex and,
 * via the proxy, at the root of zenda.<domain>. Same tokens as the agency site,
 * a tighter measure, and one extra beat of signal because this surface is the
 * product's own.
 *
 * Every section takes the same two props — the dictionary and the locale — so
 * nothing on this page reaches for content on its own.
 * ----------------------------------------------------------------------- */

const SLUG = "zenda";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(locale);
  const active: Locale = isLocale(locale) ? locale : "en";

  const product = dict.products.find((p) => p.slug === SLUG) ?? dict.products[0];
  const path = localePath(active, productPath(SLUG));

  return {
    title: dict.zenda.name,
    description: dict.zenda.lede,
    alternates: {
      canonical: path,
      // Same reasoning as the root layout: tell Google which language belongs
      // to which URL so the two locales don't compete as duplicate content.
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [localeTags[l], localePath(l, productPath(SLUG))]),
        ),
        "x-default": localePath("en", productPath(SLUG)),
      },
    },
    openGraph: {
      type: "website",
      siteName: dict.site.name,
      title: `${dict.zenda.name} — ${product.tagline}`,
      description: dict.zenda.lede,
      url: `${dict.site.url}${path}`,
      locale: localeTags[active].replace("-", "_"),
    },
  };
}

export default async function ZendaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDict(locale);
  const props = { dict, locale };

  return (
    <>
      <ZendaNav {...props} />
      <main id="main">
        <ZendaHero {...props} />
        <ZendaProblem {...props} />
        <ZendaFeatures {...props} />
        <ZendaHow {...props} />
        <ZendaFaq {...props} />
        <ZendaCta {...props} />
      </main>
      <Footer {...props} />
    </>
  );
}
