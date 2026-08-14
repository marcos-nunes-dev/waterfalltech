import Link from "next/link";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import type { Dictionary, Section } from "@/content/types";
import { productHref } from "@/lib/domain";
import { localePath, type Locale } from "@/lib/i18n";
import { cn, pad } from "@/lib/utils";

/* --------------------------------------------------------------------------
 * A ledger, not a sitemap dump. Four unequal columns, a bottom bar of pure
 * metadata, and one last cascade — static, so the page ends quietly.
 * Server component: no hooks, no interaction beyond CSS hover.
 * ----------------------------------------------------------------------- */

/**
 * Nav entries point at page sections; show the same numeral the section uses.
 * Takes the locale's `sections` so the numerals come from the same array the
 * section headers read — they cannot drift apart.
 */
function indexForHref(sections: Section[], href: string) {
  const found = sections.findIndex((s) => s.id === href.replace("#", ""));
  return found < 0 ? null : pad(found + 1);
}

/* The closing cascade: thin verticals, tallest at the left, stepping down to
   the right with a small deterministic wobble so it never reads as a chart. */
const CASCADE_LINES = 56;
/** The one blue line — the last appearance of the accent on the page. */
const CASCADE_SIGNAL = 17;

const cascade = Array.from({ length: CASCADE_LINES }, (_, i) => {
  const t = i / (CASCADE_LINES - 1);
  const wobble = (Math.sin(i * 1.9) + Math.sin(i * 0.7)) * 5;
  const height = Math.min(100, Math.max(7, 94 - t * 78 + wobble));
  return Number(height.toFixed(2));
});

export function Footer({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const { site, nav, sections, products, ui } = dict;
  const year = new Date().getFullYear();

  return (
    <footer className="relative rule-t">
      <div className="shell pt-[clamp(3.5rem,6vw,6rem)] pb-[clamp(2rem,3vw,3rem)]">
        <div className="grid-shell gap-y-14">
          {/* Mark + where we are */}
          <div className="col-span-12 lg:col-span-4">
            <div className="flex items-center gap-3">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-6 shrink-0 text-ink-50"
              >
                <rect x="0" y="1" width="2.5" height="15" fill="currentColor" />
                <rect
                  x="6"
                  y="5"
                  width="2.5"
                  height="14"
                  fill="currentColor"
                  opacity="0.8"
                />
                <rect
                  x="12"
                  y="9"
                  width="2.5"
                  height="12"
                  fill="currentColor"
                  opacity="0.55"
                />
                <rect
                  x="18"
                  y="14"
                  width="2.5"
                  height="9"
                  fill="currentColor"
                  opacity="0.32"
                />
              </svg>
              <span className="text-lg font-medium tracking-[-0.03em] text-ink-50">
                {site.name}
              </span>
            </div>

            <p className="mt-6 max-w-[28ch] text-sm leading-relaxed text-ink-500">
              {site.tagline}
            </p>
            <p className="mt-5 label">{site.base}</p>
          </div>

          {/* Page index */}
          <nav
            aria-label={ui.footerNav}
            className="col-span-5 sm:col-span-4 lg:col-span-2 lg:col-start-6"
          >
            <h2 className="label">{ui.footerIndex}</h2>
            <ul className="mt-6 flex flex-col gap-3.5">
              {nav.map((item) => {
                const numeral = indexForHref(sections, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={localePath(locale, item.href)}
                      className="group inline-flex items-baseline gap-2.5 text-sm text-ink-300 transition-colors duration-300 hover:text-ink-50"
                    >
                      {numeral ? (
                        <span className="label shrink-0 transition-colors duration-300 group-hover:text-ink-400">
                          {numeral}
                        </span>
                      ) : null}
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Our own products, with the subdomain they live on */}
          <div className="col-span-7 sm:col-span-4 lg:col-span-3 lg:col-start-8">
            <h2 className="label">{ui.footerProducts}</h2>
            <ul className="mt-6 flex flex-col gap-3.5">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={productHref(product.slug, locale)}
                    className="group flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-ink-300 transition-colors duration-300 hover:text-ink-50"
                  >
                    <span>{product.name}</span>
                    <span className="label break-all transition-colors duration-300 group-hover:text-ink-400">
                      {product.slug}.{site.domain}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal. A quarta coluna do rodape existe porque estes documentos
              precisam ser encontraveis de qualquer pagina — e porque o App
              Review da Meta exige que politica e termos estejam acessiveis. */}
          <div className="col-span-12 sm:col-span-4 lg:col-span-2 lg:col-start-11">
            <h2 className="label">{dict.legal.label}</h2>
            <ul className="mt-6 flex flex-col gap-3.5">
              {(
                [
                  ["privacy", dict.legal.privacy],
                  ["terms", dict.legal.terms],
                  ["data-deletion", dict.legal.deletion],
                ] as const
              ).map(([slug, doc]) => (
                <li key={slug}>
                  <Link
                    href={localePath(locale, `/legal/${slug}`)}
                    className="text-sm text-ink-300 transition-colors duration-300 hover:text-ink-50"
                  >
                    {doc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar — metadata only, plus the language switch for a reader
            who got this far. Wraps rather than squeezing: the coverage line is
            half again as long in pt-BR and four items no longer fit one row. */}
        <div className="mt-[clamp(3rem,6vw,5rem)] flex flex-col gap-3 rule-t pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6 sm:gap-y-3">
          <p className="label">
            © {year} {site.name}
          </p>
          {/* Identificação da pessoa jurídica. Fica ao lado do copyright porque é
              a mesma natureza de informação — quem responde pelo site — e porque
              é ali que quem procura por ela olha primeiro. */}
          <p className="label">CNPJ {site.cnpj}</p>
          {/* The only line here long enough to wrap; `label` is line-height:1,
              which collides on a second line. */}
          <p className="label leading-[1.45]">{site.coverage}</p>
          <p className="label text-ink-600">
            {site.founded}—{year}
          </p>
          <LanguageSwitcher locale={locale} label={ui.languageSwitcher} />
        </div>
      </div>

      {/* One last cascade. Full bleed, static, no animation — the page stops. */}
      <div
        aria-hidden="true"
        className="mt-[clamp(2.5rem,5vw,4rem)] flex h-[clamp(3rem,6vw,5.5rem)] w-full items-end justify-between"
      >
        {cascade.map((height, i) => (
          <span
            key={i}
            style={{ height: `${height}%` }}
            className={cn(
              "w-px shrink-0",
              i === CASCADE_SIGNAL ? "bg-signal/45" : "bg-[var(--rule)]",
            )}
          />
        ))}
      </div>
    </footer>
  );
}
