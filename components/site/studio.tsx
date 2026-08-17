import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ArrowLink, SectionHeader } from "@/components/ui/primitives";
import type { Dictionary } from "@/content/types";
import { localePath, sectionCopy, sectionIndex, type Locale } from "@/lib/i18n";
import { cn, interpolate, pad } from "@/lib/utils";

/* --------------------------------------------------------------------------
 * Studio — the least gridded section on the page, on purpose.
 *
 *   A) a wide statement, cols 1–7
 *   B) a narrow ledger, cols 9–12, dropped well below the statement
 *   C) three principles as a divided row
 *
 * The vertical offsets between the three blocks are all different. That
 * irregularity is the composition — do not normalise them.
 *
 * All prose lives in `dict.studio`. The statement carries {name} and {base}
 * tokens because word order around them differs per locale — interpolate,
 * never concatenate.
 * ----------------------------------------------------------------------- */

export function Studio({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const { site, studio, ui } = dict;
  const copy = sectionCopy(dict, "studio");
  const { statement } = studio;

  const ledgerRows = [
    { term: studio.ledger.based, value: site.base },
    { term: studio.ledger.coverage, value: site.coverage },
    { term: studio.ledger.founded, value: String(site.founded) },
  ];

  return (
    <section id="studio" className="relative rule-t">
      <div className="shell py-section">
        <SectionHeader
          index={sectionIndex(dict, "studio")}
          kicker={copy.kicker}
          headline={copy.headline}
          lede={copy.lede || undefined}
        />

        <div className="grid-shell mt-24 items-start lg:mt-32">
          {/* A — the statement. Deliberately not full width. */}
          <div className="col-span-12 lg:col-span-7">
            <Reveal y={20}>
              <p className="text-title leading-tight tracking-tight text-pretty text-ink-100">
                {interpolate(statement.first, { name: site.name })}
              </p>
            </Reveal>
            <Reveal y={20} delay={0.1}>
              <p className="mt-10 text-title leading-tight tracking-tight text-pretty text-ink-100">
                {interpolate(statement.second.before, { base: site.base })}{" "}
                <em className="em-serif">{statement.second.emphasis}</em>
                {statement.second.after}
              </p>
            </Reveal>
          </div>

          {/* B — the ledger, dropped down the page against the statement. */}
          <Reveal
            y={16}
            delay={0.18}
            className="col-span-12 mt-16 lg:col-span-4 lg:col-start-9 lg:mt-44"
          >
            <dl className="border-t">
              {ledgerRows.map((row) => (
                <div
                  key={row.term}
                  className="flex items-baseline justify-between gap-x-6 border-b py-4"
                >
                  <dt className="label shrink-0">{row.term}</dt>
                  <dd className="min-w-0 text-right text-sm leading-snug text-ink-200">
                    {row.value}
                  </dd>
                </div>
              ))}

              {/* Sem contas, sem linha: um rotulo "Social" com nada ao lado le
                  como carregamento que falhou. */}
              {site.socials.length === 0 ? null : (
                <div className="flex items-baseline justify-between gap-x-6 border-b py-3">
                  <dt className="label shrink-0">{ui.social}</dt>
                  <dd className="flex min-w-0 flex-col items-end">
                    {site.socials.map((social) => (
                      <ArrowLink
                        key={social.label}
                        href={localePath(locale, social.href)}
                      >
                        {social.label}
                      </ArrowLink>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </Reveal>
        </div>

        {/* C — principles. Divided row on lg, hairline list on mobile. */}
        <div className="mt-32 border-t pt-10 lg:mt-48 lg:pt-14">
          <Stagger as="ol" step={0.09} amount={0.25} className="grid-shell gap-y-10">
            {studio.principles.map((principle, i) => (
              <StaggerItem
                as="li"
                key={principle.title}
                className={cn(
                  "group col-span-12 min-w-0 lg:col-span-4",
                  i > 0 &&
                    "border-t pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8",
                )}
              >
                <span className="label transition-colors duration-500 ease-[var(--ease-out-quart)] group-hover:text-signal group-focus-within:text-signal">
                  {pad(i + 1)}
                </span>
                {/* Titles run to two lines in pt-BR — balance the break and
                    let long compounds wrap rather than cross the divider. */}
                <h3 className="mt-5 text-lg font-medium tracking-tight text-balance break-words text-ink-100">
                  {principle.title}
                </h3>
                <p className="mt-3 max-w-[42ch] text-[0.9375rem] leading-relaxed text-ink-400">
                  {principle.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
