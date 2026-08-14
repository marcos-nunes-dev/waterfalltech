import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import type { Dictionary, LegalDoc as Doc } from "@/content/types";
import { localeTags, type Locale } from "@/lib/i18n";
import { pad } from "@/lib/utils";

/* --------------------------------------------------------------------------
 * A legal document, rendered from data.
 *
 * Long prose in the same voice as the rest of the site: one measure, hairlines
 * instead of boxes, numerals in the margin. What it does NOT do is dress the
 * text up — someone reading a privacy policy is looking for a specific answer,
 * so the table of contents is a real index and every section is linkable.
 *
 * Kept out of the Zenda scope on purpose: these documents belong to the
 * company, not to one product, and they must read the same whichever product
 * brought the reader here.
 * ----------------------------------------------------------------------- */

/**
 * The only inline markup the documents support: `**bold**`.
 *
 * A deliberate floor rather than a Markdown parser. Every extra syntax is a
 * way for a legal document to render wrong, and bold is the only emphasis
 * these texts actually use — for the sentence in each section that carries the
 * obligation.
 */
function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-medium text-ink-100">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

/** `2026-08-14` in the reader's locale, without dragging in a date library. */
function formatDate(iso: string, locale: Locale): string {
  const [year, month, day] = iso.split("-").map(Number);
  // Constructed in UTC and read in UTC: `new Date("2026-08-14")` parses as
  // midnight UTC, which in São Paulo is still the 13th. A legal document that
  // reports the wrong effective date is a small error with a long tail.
  return new Date(Date.UTC(year!, month! - 1, day!)).toLocaleDateString(
    localeTags[locale],
    { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" },
  );
}

export function LegalDocument({
  doc,
  dict,
  locale,
}: {
  doc: Doc;
  dict: Dictionary;
  locale: Locale;
}) {
  const { legal } = dict;

  return (
    <article className="mx-auto w-full max-w-[76rem] px-gutter pt-[clamp(3rem,1.5rem+5vw,6rem)] pb-section">
      <header className="grid-shell gap-y-6">
        <Reveal className="col-span-12 lg:col-span-8" y={14}>
          <p className="label">{legal.label}</p>
          <h1 className="mt-5 text-headline font-medium text-balance text-ink-50">
            {doc.title}
          </h1>
          <p className="mt-6 max-w-[54ch] text-lede text-pretty text-ink-400">
            {doc.lede}
          </p>
          <p className="mt-8 label">
            {legal.updatedLabel} · {formatDate(doc.updatedAt, locale)}
          </p>
        </Reveal>
      </header>

      <div className="mt-[clamp(3rem,1.5rem+5vw,5rem)] grid-shell gap-y-12 rule-t pt-12">
        {/* Index. Sticky on wide screens so it stays reachable through a long
            document; plain flow on narrow ones, where sticky would eat the
            viewport the text needs. */}
        <nav
          aria-label={legal.tocLabel}
          className="col-span-12 lg:col-span-3 lg:sticky lg:top-[calc(var(--nav-height)+2rem)] lg:self-start"
        >
          <p className="label">{legal.tocLabel}</p>
          <ol className="mt-5 flex flex-col gap-2.5">
            {doc.sections.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="group inline-flex items-baseline gap-2.5 text-[0.8125rem] leading-snug text-ink-400 transition-colors duration-300 hover:text-ink-50"
                >
                  <span className="label shrink-0">{pad(i + 1)}</span>
                  <span>{section.heading}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="col-span-12 flex flex-col gap-12 lg:col-span-8 lg:col-start-5">
          {doc.sections.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              // Without this, an anchor jump parks the heading under the
              // sticky nav bar and the reader lands on the wrong sentence.
              className="scroll-mt-[calc(var(--nav-height)+1.5rem)]"
            >
              <h2 className="flex items-baseline gap-3 text-lg font-medium tracking-[-0.015em] text-balance text-ink-50">
                <span className="label shrink-0 text-signal">{pad(i + 1)}</span>
                {section.heading}
              </h2>

              <div className="mt-5 flex flex-col gap-4">
                {section.body.map((paragraph, k) => (
                  <p
                    key={k}
                    className="max-w-[68ch] text-[0.9375rem] leading-[1.75] text-pretty text-ink-400"
                  >
                    {renderInline(paragraph)}
                  </p>
                ))}

                {section.list ? (
                  <ul className="mt-1 flex flex-col gap-3">
                    {section.list.map((item, k) => (
                      <li
                        key={k}
                        className="flex max-w-[68ch] gap-3.5 text-[0.9375rem] leading-[1.75] text-pretty text-ink-400"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.7em] h-px w-3 shrink-0 bg-[var(--rule-strong)]"
                        />
                        <span>{renderInline(item)}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
