import { Reveal } from "@/components/motion/reveal";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { pad } from "@/lib/utils";

/* --------------------------------------------------------------------------
 * Native <details>/<summary>. No JavaScript, no ARIA to get wrong, correct
 * with a keyboard and a screen reader by construction. The only thing that
 * moves is the indicator: a vertical hairline rotating onto a horizontal one.
 * ----------------------------------------------------------------------- */

const INDEX = 4;

// `locale` is accepted for uniformity with every other section — this one has
// no links, so it is never read.
export function ZendaFaq({ dict }: { dict: Dictionary; locale: Locale }) {
  const { zenda, ui } = dict;

  return (
    <section id="faq" className="relative rule-t">
      <div className="mx-auto w-full max-w-[76rem] px-gutter py-section">
        <div className="grid-shell gap-y-8">
          <Reveal className="col-span-12 lg:col-span-3" y={12}>
            <span className="label text-signal">{pad(INDEX)}</span>
            {/* The questions carry the section; the heading is for the outline. */}
            <h2 className="sr-only">{ui.faqHeading}</h2>
          </Reveal>

          <ul className="col-span-12 lg:col-span-8 lg:col-start-5">
            {zenda.faq.map((entry, i) => (
              <li
                key={entry.q}
                className="border-t border-[var(--rule)] last:border-b"
              >
                <details className="group" name="zenda-faq" open={i === 0}>
                  {/* items-start keeps the numeral and the +/- indicator on the
                      first line's height when a longer question wraps. */}
                  <summary className="flex cursor-pointer list-none items-start gap-5 py-6 [&::-webkit-details-marker]:hidden">
                    <span className="label mt-1.5 shrink-0">{pad(i + 1)}</span>
                    <span className="min-w-0 flex-1 text-lg font-medium tracking-[-0.015em] text-pretty text-ink-100 transition-colors duration-300 group-open:text-ink-50 group-hover:text-ink-50">
                      {entry.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className="relative mt-1.5 size-3 shrink-0"
                    >
                      <span className="absolute top-1/2 left-0 h-px w-3 -translate-y-1/2 bg-ink-500 transition-colors duration-300 group-open:bg-signal" />
                      <span className="absolute top-0 left-1/2 h-3 w-px -translate-x-1/2 bg-ink-500 transition duration-500 ease-[var(--ease-out-expo)] group-open:rotate-90 group-open:bg-signal" />
                    </span>
                  </summary>
                  <p className="max-w-[58ch] pb-8 text-[0.9375rem] leading-[1.75] text-pretty text-ink-400 sm:pl-10">
                    {entry.a}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
