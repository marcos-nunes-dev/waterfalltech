import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/site/footer";
import { LegalDocument } from "@/components/site/legal-doc";
import {
  getDict,
  isLocale,
  localePath,
  localeTags,
  locales,
  type Locale,
} from "@/lib/i18n";

/* --------------------------------------------------------------------------
 * Legal documents: /<locale>/legal/privacy and /<locale>/legal/terms.
 *
 * One dynamic route rather than two pages — the documents share every piece of
 * chrome, and two files would be two places to forget the same fix.
 *
 * The slugs are English in both locales on purpose. A translated slug means a
 * link printed in a contract, pasted into a Meta App Review form or filed by a
 * client's lawyer breaks the moment the reader's language differs from the
 * writer's. The address of a legal document should be stable, not localised.
 *
 * These live on the apex, never on a product subdomain: they are the company's
 * documents, and a reader who arrives from Zenda must see the same text as one
 * who arrives from anywhere else.
 * ----------------------------------------------------------------------- */

const DOCS = ["privacy", "terms"] as const;
type DocSlug = (typeof DOCS)[number];

function isDocSlug(value: string): value is DocSlug {
  return (DOCS as readonly string[]).includes(value);
}

export function generateStaticParams() {
  return locales.flatMap((locale) => DOCS.map((doc) => ({ locale, doc })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; doc: string }>;
}): Promise<Metadata> {
  const { locale, doc } = await params;
  if (!isDocSlug(doc)) return {};

  const dict = getDict(locale);
  const active: Locale = isLocale(locale) ? locale : "en";
  const document = dict.legal[doc];
  const path = localePath(active, `/legal/${doc}`);

  return {
    title: document.title,
    description: document.lede,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [localeTags[l], localePath(l, `/legal/${doc}`)]),
        ),
        "x-default": localePath("en", `/legal/${doc}`),
      },
    },
    openGraph: {
      type: "article",
      siteName: dict.site.name,
      title: `${document.title} — ${dict.site.name}`,
      description: document.lede,
      url: `${dict.site.url}${path}`,
      locale: localeTags[active].replace("-", "_"),
    },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; doc: string }>;
}) {
  const { locale: raw, doc } = await params;
  // A slug that is not a document is a 404, not a blank page: an unknown legal
  // URL must not look like a document that exists and happens to be empty.
  if (!isDocSlug(doc)) notFound();

  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDict(locale);

  return (
    <>
      {/* Chrome kept to a minimum — a way back and nothing else. The full site
          nav is a marketing surface, and this page is not one. */}
      <header className="sticky top-0 z-50 border-b border-[var(--rule)] bg-ink-950/85 backdrop-blur-md">
        <div className="mx-auto flex h-[var(--nav-height)] w-full max-w-[76rem] items-center justify-between gap-4 px-gutter">
          <Link
            href={localePath(locale, "/")}
            className="text-[0.95rem] font-medium tracking-[-0.01em] text-ink-50 transition-opacity duration-300 hover:opacity-70"
          >
            {dict.site.name}
          </Link>
          <nav aria-label={dict.legal.label} className="flex items-center gap-5">
            {DOCS.map((slug) => (
              <Link
                key={slug}
                href={localePath(locale, `/legal/${slug}`)}
                aria-current={slug === doc ? "page" : undefined}
                className={
                  slug === doc
                    ? "text-[0.8125rem] text-ink-50"
                    : "text-[0.8125rem] text-ink-400 transition-colors duration-300 hover:text-ink-100"
                }
              >
                {dict.legal[slug].title}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main id="main">
        <LegalDocument doc={dict.legal[doc]} dict={dict} locale={locale} />
      </main>

      <Footer dict={dict} locale={locale} />
    </>
  );
}
