import { Reveal } from "@/components/motion/reveal";
import { Headline, StatusDot } from "@/components/ui/primitives";
import type { Dictionary } from "@/content/types";
import { localePath, sectionCopy, sectionIndex, type Locale } from "@/lib/i18n";
import { pad } from "@/lib/utils";

/* --------------------------------------------------------------------------
 * The closing statement. Deliberately does NOT use <SectionHeader> — the page
 * has said its piece seven times already, so the chrome moves to the top-right,
 * the type gets bigger, and everything below it is one email address.
 *
 * Vertical rhythm here is roughly double every other section: the silence
 * around the address is what makes it read as the only thing left to do.
 * ----------------------------------------------------------------------- */

export function Contact({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const { contact, hero, site } = dict;
  const copy = sectionCopy(dict, "contact");
  const availability = hero.status.available
    ? hero.status.availableLabel
    : hero.status.bookedLabel;

  return (
    <section id="contact" className="relative rule-t">
      <div className="shell py-section">
        {/* Chrome, banished to the top right and hung off a hairline. */}
        <Reveal className="flex items-center justify-end gap-4" y={10} amount={0.6}>
          <span
            aria-hidden="true"
            className="hidden h-px flex-1 bg-[var(--rule)] sm:block"
          />
          <span className="label">{copy.kicker}</span>
          <span className="label text-signal">
            {pad(sectionIndex(dict, "contact"))}
          </span>
        </Reveal>

        <div className="mt-16 grid-shell gap-y-12 lg:mt-28 lg:gap-y-16">
          <div className="col-span-12 lg:col-span-11">
            <Headline size="display" parts={copy.headline} />
          </div>

          {/* Body drops into the right half of the next row — the headline
              leans left, the answer leans right. */}
          <Reveal
            className="col-span-12 lg:col-span-5 lg:col-start-7"
            delay={0.1}
            y={16}
          >
            <p className="max-w-[46ch] text-lede text-ink-400">{contact.body}</p>
          </Reveal>
        </div>

        {/* The single action. No button beside it, nothing competing. */}
        <Reveal className="mt-[clamp(4.5rem,10vw,11rem)]" y={20} amount={0.3}>
          <a
            href={localePath(locale, contact.cta.href)}
            aria-label={`${contact.cta.label} — ${site.email}`}
            className="group relative block w-full pb-7 focus-visible:outline-offset-8"
          >
            <span className="inline-flex max-w-full items-center gap-[0.32em] text-title font-medium text-ink-50 sm:text-headline">
              {/* The address is not translated, so truncate stays a safety net
                  rather than a length dependency. */}
              <span className="min-w-0 truncate">{site.email}</span>
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="size-[0.5em] shrink-0 transition-transform duration-[600ms] ease-[var(--ease-out-expo)] group-hover:translate-x-[0.28em] group-focus-visible:translate-x-[0.28em]"
              >
                <path
                  d="M2.5 8h11M9.5 4l4 4-4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="square"
                />
              </svg>
            </span>

            {/* Resting hairline, then the wipe that runs the full width of it. */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-px bg-[var(--rule)]"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-ink-50 transition-transform duration-[600ms] ease-[var(--ease-out-expo)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
            />
          </a>
        </Reveal>

        {/* Availability, as a last ledger line. Both labels here run long in
            pt-BR and wrap on narrow viewports — `label` sets line-height:1,
            which collides once there are two lines, so they get a leading. */}
        <Reveal className="mt-[clamp(3rem,7vw,7rem)]" y={12} amount={0.5}>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 rule-t pt-6">
            <span className="flex min-w-0 items-center gap-2.5">
              <StatusDot active={hero.status.available} />
              <span className="label leading-[1.45] text-ink-300">
                {availability}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="hidden h-3 w-px bg-[var(--rule-strong)] sm:block"
            />
            <span className="label leading-[1.45]">{site.coverage}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
