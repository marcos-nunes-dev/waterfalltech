"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { ArrowLink, SectionHeader } from "@/components/ui/primitives";
import type { Dictionary, WorkItem } from "@/content/types";
import {
  localePath,
  sectionCopy,
  sectionIndex,
  type Locale,
} from "@/lib/i18n";
import { cn, pad } from "@/lib/utils";

/* --------------------------------------------------------------------------
 * Selected work — the page's second big moment.
 *
 * Three renderings of the same ledger, chosen by capability rather than by
 * guesswork:
 *   lg + motion   → the page pins and the ledger travels sideways on scroll
 *   lg + reduced  → a native scroll-snap track: same content, no hijack
 *   below lg      → a plain vertical stack of hairline-separated blocks
 *
 * The panels are not cards. They are columns in a ledger, separated by a
 * single left hairline, and the only fill is a barely-there hover wash.
 * ----------------------------------------------------------------------- */

/** Scroll length of the pinned section. 380vh ⇒ 280vh of sideways travel. */
const PIN_HEIGHT = "h-[380vh]";

export function Work({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const copy = sectionCopy(dict, "work");
  const reduced = useReducedMotion();

  return (
    <section id="work" className="relative rule-t">
      <div className="shell pt-section">
        <SectionHeader
          index={sectionIndex(dict, "work")}
          kicker={copy.kicker}
          headline={copy.headline}
          lede={copy.lede || undefined}
        />
      </div>

      {/* Below lg: no pinning, no transform — just the ledger, stacked. */}
      <div className="shell pt-14 pb-section sm:pt-16 lg:hidden">
        {dict.work.map((item, i) => (
          <Reveal key={item.id} y={20} amount={0.2}>
            <WorkPanel
              item={item}
              index={i}
              mode="stack"
              dict={dict}
              locale={locale}
            />
          </Reveal>
        ))}
      </div>

      {/* lg and up. */}
      {reduced ? (
        <div className="hidden pt-16 pb-section lg:block">
          <SnapTrack label={copy.kicker} dict={dict} locale={locale} />
        </div>
      ) : (
        <div className="hidden pb-section lg:block">
          <PinnedTrack dict={dict} locale={locale} />
        </div>
      )}
    </section>
  );
}

/* --------------------------------------------------------------------------
 * Pinned, scroll-driven track
 * ----------------------------------------------------------------------- */

function PinnedTrack({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  /** Sideways travel in px. 0 until measured, so first paint never jumps. */
  const [travel, setTravel] = useState(0);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  // Measured, never assumed: the track grows with fluid gutters, wrapped
  // outcome labels and the font swap, so remeasure on all of them.
  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    let live = true;

    const measure = () => {
      if (!live) return;
      const distance = track.scrollWidth - viewport.clientWidth;
      const next = distance > 0 ? distance : 0;
      // Guard the observer against its own feedback loop.
      setTravel((previous) => (Math.abs(previous - next) < 1 ? previous : next));
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    observer.observe(viewport);

    document.fonts.ready.then(measure, () => {});

    return () => {
      live = false;
      observer.disconnect();
    };
  }, []);

  const span = dict.work.length - 1;
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (span <= 0) return;
    const next = Math.min(span, Math.max(0, Math.round(value * span)));
    setActive((previous) => (previous === next ? previous : next));
  });

  return (
    <div ref={outerRef} className={cn("relative", PIN_HEIGHT)}>
      <div
        ref={viewportRef}
        className="sticky top-0 flex h-screen flex-col overflow-clip"
      >
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex min-h-0 flex-1 will-change-transform"
        >
          <span
            aria-hidden="true"
            className="w-[var(--spacing-gutter)] shrink-0"
          />
          {dict.work.map((item, i) => (
            <WorkPanel
              key={item.id}
              item={item}
              index={i}
              mode="pinned"
              dict={dict}
              locale={locale}
            />
          ))}
          {/* Closes the ledger with the same hairline that opens each panel. */}
          <span
            aria-hidden="true"
            className="w-[var(--spacing-gutter)] shrink-0 border-l border-[var(--rule)]"
          />
        </motion.div>

        <ProgressRail
          progress={scrollYProgress}
          active={active}
          total={dict.work.length}
        />
      </div>
    </div>
  );
}

/** Read position for the pinned track. One of the sanctioned uses of blue. */
function ProgressRail({
  progress,
  active,
  total,
}: {
  progress: MotionValue<number>;
  active: number;
  total: number;
}) {
  return (
    <div
      aria-hidden="true"
      className="shrink-0 px-[var(--spacing-gutter)] pb-10"
    >
      <div className="flex items-center gap-6">
        <span className="label tabular-nums">
          {pad(active + 1)}
          <span className="mx-1.5 text-ink-700">/</span>
          {pad(total)}
        </span>
        <span className="relative h-px flex-1 bg-[var(--rule)]">
          <motion.span
            style={{ scaleX: progress }}
            className="absolute inset-0 origin-left bg-signal will-change-transform"
          />
        </span>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
 * Reduced motion: the browser's own horizontal scroll, snapped
 * ----------------------------------------------------------------------- */

function SnapTrack({
  label,
  dict,
  locale,
}: {
  label: string;
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      tabIndex={0}
      className="snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-pl-[var(--spacing-gutter)]"
    >
      <div className="flex">
        <span aria-hidden="true" className="w-[var(--spacing-gutter)] shrink-0" />
        {dict.work.map((item, i) => (
          <WorkPanel
            key={item.id}
            item={item}
            index={i}
            mode="snap"
            dict={dict}
            locale={locale}
          />
        ))}
        <span
          aria-hidden="true"
          className="w-[var(--spacing-gutter)] shrink-0 border-l border-[var(--rule)]"
        />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
 * The panel itself — one shape, three framings
 * ----------------------------------------------------------------------- */

type PanelMode = "pinned" | "snap" | "stack";

function WorkPanel({
  item,
  index,
  mode,
  dict,
  locale,
}: {
  item: WorkItem;
  index: number;
  mode: PanelMode;
  dict: Dictionary;
  locale: Locale;
}) {
  const { ui } = dict;
  const column = mode !== "stack";

  return (
    <article
      className={cn(
        "group relative flex min-w-0 flex-col",
        column &&
          "w-[min(84vw,720px)] shrink-0 border-l border-[var(--rule)] px-7 transition-colors duration-500 ease-[var(--ease-out-quart)] focus-within:bg-ink-900/40 hover:bg-ink-900/40 xl:px-12",
        // Clears the fixed nav, then breathes more once the viewport is tall
        // enough to afford it — the panel has to fit one screen, always.
        //
        // `overflow-y-auto` is the safety valve, not the plan: the panel is
        // sized to fit, but a three-line translated title on a short laptop
        // would otherwise push the outcomes/stack/link block past the bottom
        // of the sticky viewport, where `overflow-clip` on the parent makes it
        // unreachable. While the content fits there is no scrollport and the
        // wheel still drives the pin exactly as before; when it doesn't, the
        // reader (and Tab focus) can still get to the figures.
        mode === "pinned" &&
          "overflow-y-auto pt-[calc(var(--nav-height)_+_1.5rem)] pb-10 2xl:pt-[calc(var(--nav-height)_+_3.5rem)] 2xl:pb-14",
        mode === "snap" && "snap-start py-16",
        mode === "stack" && "rule-t py-12 sm:py-14",
      )}
    >
      {/* Ledger row: index, a hairline that eats the slack, the year. */}
      <div className="flex items-center gap-4">
        <span
          className={cn(
            "label tabular-nums",
            // Deliberately not blue: the cascade rail and this section's own
            // progress rail already spend the accent budget for this viewport.
            column &&
              "transition-colors duration-500 group-focus-within:text-ink-200 group-hover:text-ink-200",
          )}
        >
          {pad(index + 1)}
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-[var(--rule)]" />
        <span className="label">{item.year}</span>
      </div>

      <p className="label mt-7 2xl:mt-9">
        {item.confidential ? ui.confidential : item.client}
      </p>

      {/* text-balance keeps the longer pt-BR titles from ending on a widow;
          the panel is a fixed column, so the title must wrap, never clip. */}
      <h3 className="mt-3 text-title font-medium text-balance text-ink-50 2xl:mt-4">
        {item.title}
      </h3>

      <p className="mt-4 max-w-[42ch] leading-relaxed text-pretty text-ink-400 2xl:mt-5">
        {item.summary}
      </p>

      <div
        className={cn(
          "flex flex-col gap-6 2xl:gap-7",
          column ? "mt-auto pt-10 2xl:pt-14" : "mt-10",
        )}
      >
        <Outcomes outcomes={item.outcomes} />

        <ul className="flex flex-wrap gap-2">
          {item.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-[var(--rule)] px-2.5 py-1 text-xs text-ink-500"
            >
              {tech}
            </li>
          ))}
        </ul>

        {item.href ? (
          <ArrowLink href={localePath(locale, item.href)}>
            {ui.viewCaseStudy}
            <span className="sr-only"> — {item.title}</span>
          </ArrowLink>
        ) : item.confidential ? (
          <p className="py-1 text-sm text-ink-600">{ui.caseStudyUnderNda}</p>
        ) : null}
      </div>
    </article>
  );
}

/** Two figures, mono, with a hairline standing between them. */
function Outcomes({ outcomes }: { outcomes: WorkItem["outcomes"] }) {
  return (
    <dl className="flex">
      {outcomes.map((outcome, i) => (
        <div
          key={outcome.label}
          className={cn(
            "flex min-w-0 flex-1 flex-col-reverse gap-2.5",
            i > 0 && "border-l border-[var(--rule)] pl-5 xl:pl-7",
            i < outcomes.length - 1 && "pr-5 xl:pr-7",
          )}
        >
          {/* col-reverse: the figure reads first, the caption sits under it,
              and `dt` still precedes `dd` in the document.
              `.label` ships line-height:1, which collapses the two-line
              captions pt-BR produces ("horas de downtime planejado"), so the
              caption opts back into a readable leading and is allowed to
              break a single over-long word rather than escape the column. */}
          <dt className="label leading-tight break-words">{outcome.label}</dt>
          <dd className="font-mono text-2xl tracking-tight text-ink-50 tabular-nums sm:text-3xl">
            {outcome.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
