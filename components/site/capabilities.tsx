"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState, type KeyboardEvent } from "react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui/primitives";
import type { Capability, Dictionary } from "@/content/types";
import { sectionCopy, sectionIndex, type Locale } from "@/lib/i18n";
import { cn, pad } from "@/lib/utils";

/* --------------------------------------------------------------------------
 * Capabilities — an index, not a card grid.
 *
 * Desktop: a vertical tablist on the left half, one detail panel on the right.
 * Below lg: the same state driving an exclusive accordion. One `active` index
 * feeds both trees, so switching viewport never loses your place.
 * ----------------------------------------------------------------------- */

const EXPO = [0.16, 1, 0.3, 1] as const;

const PANEL_ID = "capabilities-panel";
const tabId = (id: string) => `capabilities-tab-${id}`;
const rowId = (id: string) => `capabilities-row-${id}`;
const regionId = (id: string) => `capabilities-region-${id}`;

/**
 * Height reserved for the detail panel so the page holds still while you scan
 * the index. It is a measurement of the copy, not a design constant, so it is
 * declared per locale: Portuguese summaries and bodies each run about a line
 * longer than the English ones, and reserving the English height there would
 * let the panel jump on every hover. Typed as a full Record so a new locale
 * cannot be added without deciding its reserve.
 */
const PANEL_MIN_H: Record<Locale, string> = {
  en: "min-h-[29rem]",
  "pt-BR": "min-h-[32rem]",
};

export function Capabilities({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const { capabilities } = dict;
  const copy = sectionCopy(dict, "capabilities");
  const reduced = useReducedMotion() ?? false;

  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const last = capabilities.length - 1;
  const current = capabilities[active];

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    let next: number | null = null;

    if (event.key === "ArrowDown") next = active === last ? 0 : active + 1;
    else if (event.key === "ArrowUp") next = active === 0 ? last : active - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;

    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section id="capabilities" className="relative rule-t">
      <div className="shell py-section">
        <SectionHeader
          index={sectionIndex(dict, "capabilities")}
          kicker={copy.kicker}
          headline={copy.headline}
          lede={copy.lede || undefined}
        />

        <Reveal className="mt-16 grid-shell lg:mt-28" y={20} amount={0.12}>
          {/* ---------------------------------------------------------------
              Below lg — exclusive accordion, same active index.
          --------------------------------------------------------------- */}
          <div className="col-span-12 rule-t lg:hidden">
            {capabilities.map((cap, i) => {
              const open = i === active;

              return (
                <div key={cap.id} className="rule-b">
                  <button
                    type="button"
                    id={rowId(cap.id)}
                    aria-expanded={open}
                    aria-controls={regionId(cap.id)}
                    onClick={() => setActive(i)}
                    className="grid w-full grid-cols-[2rem_1fr_auto] items-baseline gap-x-3 py-5 text-left"
                  >
                    <span
                      className={cn(
                        "label transition-colors duration-500",
                        open ? "text-ink-300" : "text-ink-600",
                      )}
                    >
                      {pad(i + 1)}
                    </span>
                    {/* Titles wrap in longer languages — balance the lines
                        rather than orphaning the last word. */}
                    <span
                      className={cn(
                        "text-balance text-title font-medium transition-colors duration-500 ease-[var(--ease-out-expo)]",
                        open ? "text-ink-50" : "text-ink-200",
                      )}
                    >
                      {cap.title}
                    </span>
                    <PlusMinus open={open} />
                  </button>

                  <div
                    id={regionId(cap.id)}
                    role="region"
                    aria-labelledby={rowId(cap.id)}
                    inert={!open}
                    className={cn(
                      "grid",
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      reduced
                        ? null
                        : "transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-9 pl-11 pr-1">
                        <CapabilityBody cap={cap} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ---------------------------------------------------------------
              lg and up — the index.
          --------------------------------------------------------------- */}
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label={copy.kicker}
            className="col-span-12 hidden rule-t lg:col-span-6 lg:block"
          >
            {capabilities.map((cap, i) => {
              const selected = i === active;

              return (
                <button
                  key={cap.id}
                  type="button"
                  role="tab"
                  id={tabId(cap.id)}
                  aria-selected={selected}
                  aria-controls={PANEL_ID}
                  tabIndex={selected ? 0 : -1}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onKeyDown={onTabKeyDown}
                  className="group flex w-full items-baseline gap-5 rule-b py-6 pl-9 pr-2 text-left"
                >
                  <span
                    className={cn(
                      "label relative shrink-0 transition-colors duration-500",
                      selected ? "text-ink-300" : "text-ink-800",
                    )}
                  >
                    {/* The one blue mark in this section: the active marker. */}
                    <span
                      aria-hidden="true"
                      className="absolute right-[calc(100%+0.75rem)] top-1/2 h-px w-4 -translate-y-1/2"
                    >
                      <span
                        className={cn(
                          "block h-px w-full origin-left bg-signal transition-transform duration-500 ease-[var(--ease-out-expo)]",
                          selected ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </span>
                    {pad(i + 1)}
                  </span>

                  {/* "Plataforma e infraestrutura" is half again as wide as
                      "Platform & infrastructure" at this size, so the title
                      has to be allowed to wrap. It stays a baseline-aligned
                      flex item, which means the numeral and its tick align to
                      the FIRST line — the row simply grows downward and the
                      hairline below it follows. */}
                  <span
                    className={cn(
                      "text-balance text-title font-medium transition-colors duration-500 ease-[var(--ease-out-expo)]",
                      selected
                        ? "text-ink-50"
                        : "text-ink-700 group-hover:text-ink-400",
                    )}
                  >
                    {cap.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ---------------------------------------------------------------
              lg and up — the detail. Min-height reserved per locale (see
              PANEL_MIN_H) so the page holds still while you scan the index.
          --------------------------------------------------------------- */}
          <div className="col-span-12 hidden lg:col-span-5 lg:col-start-8 lg:block">
            <div
              id={PANEL_ID}
              role="tabpanel"
              aria-labelledby={tabId(current.id)}
              tabIndex={0}
              className={cn("rule-t pt-6", PANEL_MIN_H[locale])}
            >
              {reduced ? (
                <CapabilityBody cap={current} />
              ) : (
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.3, ease: EXPO },
                    }}
                    exit={{
                      opacity: 0,
                      y: -6,
                      transition: { duration: 0.2, ease: EXPO },
                    }}
                  >
                    <CapabilityBody cap={current} />
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- */

/** Summary, body, and the bullet ledger. Shared by both trees. */
function CapabilityBody({ cap }: { cap: Capability }) {
  const total = cap.bullets.length;

  return (
    <>
      <p className="text-lede text-ink-200">{cap.summary}</p>
      <p className="mt-6 max-w-[46ch] text-[0.9375rem] leading-[1.7] text-ink-400">
        {cap.detail}
      </p>
      <ul className="mt-9">
        {cap.bullets.map((bullet, i) => (
          <li
            key={bullet}
            className="flex items-baseline gap-4 rule-t py-3.5"
          >
            <span className="label shrink-0 tabular-nums text-ink-700">
              {`${pad(i + 1)}/${pad(total)}`}
            </span>
            <span className="text-sm text-ink-300">{bullet}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

/* ----------------------------------------------------------------------- */

/** Two hairlines. The vertical one rotates and scales away when open. */
function PlusMinus({ open }: { open: boolean }) {
  return (
    <span aria-hidden="true" className="relative block size-3.5 shrink-0">
      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ink-500" />
      <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2">
        <span
          className={cn(
            "block h-full w-px origin-center bg-ink-500 transition-transform duration-500 ease-[var(--ease-out-expo)]",
            open ? "rotate-90 scale-y-0" : "rotate-0 scale-y-100",
          )}
        />
      </span>
    </span>
  );
}
