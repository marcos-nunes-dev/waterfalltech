import { Reveal } from "@/components/motion/reveal";
import { Headline } from "@/components/ui/primitives";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { pad } from "@/lib/utils";

/* --------------------------------------------------------------------------
 * Deliberately lopsided: the statement takes the left six columns, the
 * explanation is pushed to the far right and set small, like a margin note in
 * a ledger. Nothing here is boxed.
 * ----------------------------------------------------------------------- */

const INDEX = 1;

// `locale` is accepted for uniformity with every other section — this one has
// no links, so it is never read.
export function ZendaProblem({ dict }: { dict: Dictionary; locale: Locale }) {
  const { problem } = dict.zenda;

  return (
    <section id="problem" className="relative rule-t">
      <div className="mx-auto w-full max-w-[76rem] px-gutter py-section">
        <div className="grid-shell gap-y-10">
          <Reveal
            className="col-span-12 flex items-baseline gap-4 lg:col-span-2 lg:flex-col lg:gap-3"
            y={12}
          >
            <span className="label text-signal">{pad(INDEX)}</span>
            <span className="label">{problem.kicker}</span>
          </Reveal>

          <div className="col-span-12 lg:col-span-6 lg:col-start-3">
            <Headline parts={problem.headline} />
          </div>

          <Reveal
            className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pt-3"
            delay={0.1}
            y={16}
          >
            <span
              aria-hidden="true"
              className="mb-6 block h-px w-10 bg-[var(--rule-strong)]"
            />
            <p className="max-w-[46ch] text-[0.9375rem] leading-[1.75] text-ink-400">
              {problem.body}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
