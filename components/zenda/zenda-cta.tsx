import { Reveal } from "@/components/motion/reveal";
import { ArrowLink, ButtonLink, StatusDot } from "@/components/ui/primitives";
import type { Dictionary } from "@/content/types";
import { localePath, type Locale } from "@/lib/i18n";

/* --------------------------------------------------------------------------
 * The close. The status line becomes the headline, the provenance paragraph
 * hands the reader back to the agency, and the CTA resolves to a real inbox
 * rather than a form nobody watches.
 * ----------------------------------------------------------------------- */

export function ZendaCta({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const { products, site, zenda, ui } = dict;
  const product = products.find((p) => p.slug === "zenda") ?? products[0];

  return (
    <section
      id="access"
      className="relative rule-t scroll-mt-[var(--nav-height)]"
    >
      <div className="mx-auto w-full max-w-[76rem] px-gutter py-section">
        <div className="grid-shell gap-y-10">
          <Reveal
            className="col-span-12 flex items-center gap-2.5 lg:col-span-3"
            y={12}
          >
            <StatusDot />
            <span className="label text-ink-300">{zenda.status.label}</span>
          </Reveal>

          <div className="col-span-12 lg:col-span-8 lg:col-start-5">
            <Reveal y={20}>
              <h2 className="max-w-[20ch] text-headline font-medium text-balance text-ink-50">
                {zenda.status.detail}
              </h2>
            </Reveal>

            <Reveal delay={0.1} y={16}>
              <p className="mt-8 max-w-[54ch] text-lede text-pretty text-ink-400">
                {product.description}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <ButtonLink href={`mailto:${site.email}`}>
                  {zenda.primaryCta.label}
                </ButtonLink>
                <ArrowLink href={`mailto:${site.email}`}>
                  {site.email}
                </ArrowLink>
              </div>

              <div className="mt-14 rule-t pt-6">
                <ArrowLink
                  href={localePath(locale, "/")}
                  className="text-ink-400 hover:text-ink-100"
                >
                  {ui.waterfallProduct}
                </ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
