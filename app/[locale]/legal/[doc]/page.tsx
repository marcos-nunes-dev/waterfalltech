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
 * Legal documents: privacy policy, terms of use, and data deletion.
 *
 * One dynamic route rather than three pages — they share every piece of chrome,
 * and three files would be three places to forget the same fix.
 *
 * Data deletion is a document of its own because Meta's App Dashboard has a
 * separate "User Data Deletion" field beside the privacy and terms fields.
 * Pointing all three at the same URL is a rejection reason: the reviewer is
 * looking for actionable instructions, not a paragraph buried in a long policy.
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

const DOCS = ["privacy", "terms", "data-deletion"] as const;
type DocSlug = (typeof DOCS)[number];

function isDocSlug(value: string): value is DocSlug {
  return (DOCS as readonly string[]).includes(value);
}

/**
 * URL slug -> chave no dicionario.
 *
 * O slug e `data-deletion` porque e o que a Meta espera colar no campo "User
 * Data Deletion" do painel — um endereco que se le. A chave e `deletion`
 * porque `dict.legal["data-deletion"]` nao passa no typecheck.
 */
const DOC_KEY = {
  privacy: "privacy",
  terms: "terms",
  "data-deletion": "deletion",
} as const;

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
  const document = dict.legal[DOC_KEY[doc]];
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
                {dict.legal[DOC_KEY[slug]].title}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main id="main">
        <LegalDocument doc={dict.legal[DOC_KEY[doc]]} dict={dict} locale={locale} />
      </main>

      <Footer dict={dict} locale={locale} />
    </>
  );
}
