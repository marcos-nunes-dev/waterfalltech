"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

import { SectionHeader } from "@/components/ui/primitives";
import type { Dictionary } from "@/content/types";
import { sectionCopy, sectionIndex, type Locale } from "@/lib/i18n";
import { cn, pad } from "@/lib/utils";

/* --------------------------------------------------------------------------
 * PROCESS — the literal waterfall.
 *
 * One hairline runs down the left edge of the section. A single signal-blue
 * line draws down it as you scroll, and each step lights up at the exact
 * moment the line reaches it — the reveal is not a separate animation, it is
 * the same scroll progress read at a different offset.
 *
 * The steps step further right as they descend, and the gap between them
 * grows, so the cascade appears to accelerate on its way down.
 * ----------------------------------------------------------------------- */

/**
 * Per-step geometry. Static strings so Tailwind can see every candidate.
 *
 *   gap       — vertical rhythm, widening down the list
 *   pad       — how far the content sits from the rail (the staircase)
 *   connector — the hairline bridging rail → content; always `pad` minus a beat
 */
const CASCADE = [
  {
    gap: "",
    pad: "pl-10 sm:pl-16 lg:pl-36",
    connector: "w-6 sm:w-11 lg:w-28",
  },
  {
    gap: "mt-20 lg:mt-28",
    pad: "pl-10 sm:pl-16 lg:pl-[calc(7%_+_9rem)]",
    connector: "w-6 sm:w-11 lg:w-[calc(7%_+_7rem)]",
  },
  {
    gap: "mt-24 lg:mt-36",
    pad: "pl-10 sm:pl-16 lg:pl-[calc(14%_+_9rem)]",
    connector: "w-6 sm:w-11 lg:w-[calc(14%_+_7rem)]",
  },
  {
    gap: "mt-28 lg:mt-44",
    pad: "pl-10 sm:pl-16 lg:pl-[calc(21%_+_9rem)]",
    connector: "w-6 sm:w-11 lg:w-[calc(21%_+_7rem)]",
  },
] as const;

type Metrics = {
  /** Container height in px — the dot travels this far. */
  height: number;
  /** Each step's top edge as a fraction of the container height. */
  marks: number[];
};

/** Sensible guesses used for the single frame before measurement lands. */
const INITIAL_METRICS: Metrics = { height: 0, marks: [0, 0.3, 0.58, 0.85] };

export function Process({
  dict,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const { process: steps } = dict;
  const copy = sectionCopy(dict, "process");
  const reduced = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState<Metrics>(INITIAL_METRICS);

  // Progress 0 → 1 as the section passes through the lower third of the
  // viewport. With this window the tip of the drawn line stays pinned between
  // 65% and 85% of the viewport height the whole way down.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 85%"],
  });

  // The line scrubs both ways, but content must not un-reveal on the way back
  // up — so the steps read a monotonic high-water mark of the same progress.
  const drawn = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value > drawn.get()) drawn.set(value);
  });
  useEffect(() => {
    // Covers a load that starts already scrolled past this section.
    const initial = scrollYProgress.get();
    if (initial > drawn.get()) drawn.set(initial);
  }, [scrollYProgress, drawn]);

  const dotY = useTransform(scrollYProgress, [0, 1], [0, metrics.height]);
  const dotOpacity = useTransform(
    scrollYProgress,
    [0, 0.015, 0.985, 1],
    [0, 1, 1, 0],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const height = el.offsetHeight;
      if (!height) return;

      const marks = Array.from(
        el.querySelectorAll<HTMLElement>("[data-wf-step]"),
      ).map((node) => Math.min(1, Math.max(0, node.offsetTop / height)));

      setMetrics((prev) =>
        prev.height === height &&
        prev.marks.length === marks.length &&
        prev.marks.every((mark, i) => Math.abs(mark - marks[i]) < 0.0005)
          ? prev
          : { height, marks },
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" className="relative rule-t">
      <div className="shell py-section">
        <SectionHeader
          index={sectionIndex(dict, "process")}
          kicker={copy.kicker}
          headline={copy.headline}
          lede={copy.lede || undefined}
        />

        <div ref={containerRef} className="relative mt-20 sm:mt-24 lg:mt-32">
          {/* The channel the water runs in */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-px bg-[var(--rule)]"
          />

          {/* The water. One pixel wide, and the only saturated thing here. */}
          <motion.div
            aria-hidden="true"
            className={cn(
              "absolute inset-y-0 left-0 w-px origin-top bg-signal",
              !reduced && "will-change-transform",
            )}
            style={reduced ? undefined : { scaleY: scrollYProgress }}
          />

          {/* Leading edge */}
          <motion.div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute left-0",
              reduced ? "bottom-0" : "top-0 will-change-transform",
            )}
            style={reduced ? undefined : { y: dotY, opacity: dotOpacity }}
          >
            <span className="absolute -left-[3px] -top-[3px] size-[7px] rounded-full bg-signal" />
          </motion.div>

          {/* Static in the flow so each step's offsetTop measures against the
              container the rail is drawn in. */}
          <ol>
            {steps.map((step, i) => (
              <ProcessStep
                key={step.title}
                index={i}
                title={step.title}
                duration={step.duration}
                body={step.body}
                mark={metrics.marks[i] ?? INITIAL_METRICS.marks[i] ?? 0}
                drawn={drawn}
                reduced={Boolean(reduced)}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- */

function ProcessStep({
  index,
  title,
  duration,
  body,
  mark,
  drawn,
  reduced,
}: {
  index: number;
  title: string;
  duration: string;
  body: string;
  /** Where this step sits on the rail, 0 → 1. */
  mark: number;
  /** Monotonic scroll progress shared with the drawn line. */
  drawn: MotionValue<number>;
  reduced: boolean;
}) {
  // Lands on full opacity a hair after the line's tip crosses the connector.
  const shown = useTransform(drawn, [mark - 0.02, mark + 0.06], [0, 1]);
  const y = useTransform(shown, [0, 1], [22, 0]);

  const geometry = CASCADE[Math.min(index, CASCADE.length - 1)];

  return (
    <motion.li
      data-wf-step=""
      className={cn("group relative list-none", geometry.gap)}
      style={reduced ? undefined : { opacity: shown, y }}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-[0.35rem] h-px bg-[var(--rule)] transition-colors duration-500 ease-[var(--ease-out-quart)] group-hover:bg-[var(--rule-strong)] group-focus-within:bg-[var(--rule-strong)]",
          geometry.connector,
        )}
      />

      <div className={cn("relative", geometry.pad)}>
        <span className="label block">{duration}</span>

        <div className="relative mt-5">
          {/* Structural mark: a ledger numeral, not an ornament. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-[0.055em] top-1/2 -translate-y-1/2 select-none font-mono text-[clamp(2.75rem,5vw,4.5rem)] font-medium leading-none tracking-[-0.04em] text-ink-800"
          >
            {pad(index + 1)}
          </span>
          {/* text-balance: PT titles run longer than EN. If one wraps at the
              deepest indent, an even two-line break keeps the staircase
              reading as a cascade instead of a ragged tail. */}
          <h3 className="relative text-balance text-title font-medium text-ink-50">
            {title}
          </h3>
        </div>

        <p className="relative mt-5 max-w-[42ch] text-pretty leading-relaxed text-ink-400">
          {body}
        </p>
      </div>
    </motion.li>
  );
}
