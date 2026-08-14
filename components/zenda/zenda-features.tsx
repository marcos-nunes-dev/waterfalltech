import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Headline } from "@/components/ui/primitives";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { cn, pad } from "@/lib/utils";

/* --------------------------------------------------------------------------
 * Four features, one grid, no cards. The first feature holds seven columns and
 * all three rows; the rest stack against a single vertical hairline. Structure
 * comes from the rules, not from boxes.
 * ----------------------------------------------------------------------- */

const INDEX = 2;

/** Appears on hover or keyboard focus — the row's only coloured mark. */
function Tick() {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className="size-3 shrink-0 text-signal opacity-0 transition-opacity duration-500 ease-[var(--ease-out-expo)] group-focus-within:opacity-100 group-hover:opacity-100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="square"
    >
      <path d="M1.5 6.25 4.5 9.5 10.5 2.5" />
    </svg>
  );
}

// `locale` is accepted for uniformity with every other section — this one has
// no links, so it is never read.
export function ZendaFeatures({ dict }: { dict: Dictionary; locale: Locale }) {
  const { zenda } = dict;
  const [lead, ...rest] = zenda.features;

  return (
    <section id="features" className="relative rule-t">
      <div className="mx-auto w-full max-w-[76rem] px-gutter py-section">
        <header className="grid-shell items-baseline gap-y-6">
          <Reveal
            className="col-span-12 flex items-baseline gap-4 lg:col-span-3 lg:flex-col lg:gap-3"
            y={12}
          >
            <span className="label text-signal">{pad(INDEX)}</span>
            <span className="label">{zenda.featuresHeader.kicker}</span>
          </Reveal>
          <Reveal
            className="col-span-12 lg:col-span-8 lg:col-start-5"
            delay={0.08}
            y={16}
          >
            <Headline
              as="h2"
              size="title"
              parts={zenda.featuresHeader.headline}
              className="max-w-[24ch] font-semibold text-balance text-ink-50"
            />
          </Reveal>
        </header>

        <Stagger
          as="ul"
          className="mt-[clamp(3rem,1.5rem+5vw,5.5rem)] grid-shell border-t border-[var(--rule)]"
          step={0.09}
        >
          {/* row-span-3 mirrors the three features stacked beside it. The lead
              cell is stretched by that span, so its content is pinned to the
              top of the run however long the three bodies beside it run. */}
          <StaggerItem
            as="li"
            className="group col-span-12 flex min-w-0 flex-col border-b border-[var(--rule)] pt-8 pb-12 md:col-span-7 md:row-span-3 md:border-b-0 md:pr-12"
          >
            <span className="flex items-center gap-3">
              <span className="label">{pad(1)}</span>
              <Tick />
            </span>
            <h3 className="mt-10 text-title font-medium text-balance text-ink-50">
              {lead.title}
            </h3>
            <p className="mt-6 max-w-[40ch] text-lede text-pretty text-ink-400 transition-colors duration-500 group-hover:text-ink-300">
              {lead.body}
            </p>
          </StaggerItem>

          {rest.map((feature, i) => (
            <StaggerItem
              key={feature.id}
              as="li"
              className={cn(
                "group col-span-12 flex min-w-0 flex-col pt-8 pb-10 md:col-span-5 md:border-l md:border-[var(--rule)] md:pl-10",
                i < rest.length - 1 && "border-b border-[var(--rule)]",
              )}
            >
              <span className="flex items-center gap-3">
                <span className="label">{pad(i + 2)}</span>
                <Tick />
              </span>
              <h3 className="mt-6 text-lg font-medium tracking-[-0.015em] text-balance text-ink-50">
                {feature.title}
              </h3>
              <p className="mt-3 max-w-[52ch] text-[0.9375rem] leading-[1.7] text-pretty text-ink-400 transition-colors duration-500 group-hover:text-ink-300">
                {feature.body}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
