"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ElementType, type ReactNode } from "react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import {
  ArrowLink,
  ButtonLink,
  Headline,
  StatusDot,
} from "@/components/ui/primitives";
import type { Dictionary } from "@/content/types";
import { localePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------------------
 * The signature section. The brand argument is made visible here: a field of
 * thin columns with light segments falling at different speeds, exactly one of
 * them blue, and copy that arrives in the same cascading gesture. Nothing is
 * centred; a ledger strip holds the floor of the viewport.
 * ----------------------------------------------------------------------- */

const EXPO = [0.16, 1, 0.3, 1] as const;

/* -------------------------------------------------------------------------
 * Cascade field — server-renderable, deterministic, zero JS.
 * ---------------------------------------------------------------------- */

const COLUMN_COUNT = 26;
/** The 9th column carries the single blue segment. One accent, deliberate. */
const SIGNAL_COLUMN = 8;

/**
 * Deterministic 0–1 value from an integer seed. Integer-only math — no `sin`,
 * no `Math.random` — so the server and every client engine agree exactly and
 * the field renders without a hydration mismatch.
 */
function noise(seed: number) {
  let h = Math.imul(seed ^ 0x9e3779b9, 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

function CascadeField() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-clip"
    >
      {Array.from({ length: COLUMN_COUNT }, (_, i) => {
        const isSignal = i === SIGNAL_COLUMN;

        // Every column is hashed, except the blue one: its phase is pinned so
        // the single accent is already falling — high in the frame — on the
        // very first paint, rather than being off-screen for six seconds.
        const duration = isSignal ? 11 : 7 + noise(i * 4 + 1) * 10; // 7s – 17s
        const segment = isSignal ? 26 : 18 + noise(i * 4 + 2) * 12; // 18% – 30%
        const phase = isSignal ? 0.14 : noise(i * 4 + 3);
        const dim = isSignal ? 1 : 0.4 + noise(i * 4 + 4) * 0.5;

        const gradient = cn(
          "bg-linear-to-b from-transparent to-transparent",
          isSignal ? "via-signal" : "via-ink-300",
        );
        const box = {
          height: `${segment.toFixed(2)}%`,
          opacity: Number(dim.toFixed(2)),
        };

        return (
          <div
            key={i}
            className="absolute inset-y-0 w-px bg-[var(--rule-faint)]"
            style={{
              left: `${(((i + 0.5) / COLUMN_COUNT) * 100).toFixed(3)}%`,
            }}
          >
            {/* A negative delay puts every column mid-cycle on first paint
                instead of starting the whole field in lockstep. */}
            <span
              className={cn(
                "absolute inset-x-0 top-0 will-change-transform motion-reduce:hidden",
                gradient,
              )}
              style={{
                ...box,
                animation: `wf-fall ${duration.toFixed(2)}s linear ${(
                  -phase * duration
                ).toFixed(2)}s infinite`,
              }}
            />
            {/* Reduced motion: the cascade holds as a still frame. */}
            <span
              className={cn(
                "absolute inset-x-0 hidden motion-reduce:block",
                gradient,
              )}
              style={{ ...box, top: `${(8 + phase * 62).toFixed(2)}%` }}
            />
          </div>
        );
      })}

      {/* Vignette: less light at the margins, painted with the canvas colour
          itself. No bloom, no tint. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(130% 110% at 50% 42%, transparent 0%, transparent 48%, color-mix(in oklab, var(--color-canvas) 55%, transparent) 78%, var(--color-canvas) 100%)",
        }}
      />
      <div className="grain" />
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Scroll cue — a short bright segment falling down a 40px hairline.
 * ---------------------------------------------------------------------- */

function ScrollCue() {
  return (
    <span
      aria-hidden="true"
      className="relative block h-10 w-px overflow-hidden bg-[var(--rule)]"
    >
      <span className="absolute inset-x-0 top-0 h-3 animate-[wf-fall_2.2s_linear_infinite] bg-linear-to-b from-transparent via-ink-200 to-transparent will-change-transform motion-reduce:hidden" />
    </span>
  );
}

/* -------------------------------------------------------------------------
 * Mount choreography. Same vocabulary as <Reveal>, but fired on mount rather
 * than on scroll — the hero is already in view when the page loads.
 * ---------------------------------------------------------------------- */

function Rise({
  children,
  className,
  delay = 0,
  duration = 0.9,
  y = 16,
  blur = 7,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  /** 0 opts out of the defocus — used for the headline, which masks instead. */
  blur?: number;
  as?: ElementType;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as "div"] ?? motion.div;

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const from = blur > 0 ? { opacity: 0, y, filter: `blur(${blur}px)` } : { opacity: 0, y };
  const to = blur > 0 ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 1, y: 0 };

  return (
    <MotionTag
      className={className}
      initial={from}
      animate={to}
      transition={{ duration, delay, ease: EXPO }}
    >
      {children}
    </MotionTag>
  );
}

/* -------------------------------------------------------------------------
 * Hero
 * ---------------------------------------------------------------------- */

export function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { hero, stats } = dict;
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.35]);

  const statusLabel = hero.status.available
    ? hero.status.availableLabel
    : hero.status.bookedLabel;

  return (
    /*
     * `min-h`, never `h` — on a short laptop the copy plus the ledger strip do
     * not fit inside 100svh, and the strip must grow out of the viewport rather
     * than be cut off. `overflow-x-clip` (not `overflow-clip`) keeps that
     * promise: the cascade field clips itself, so nothing here needs a vertical
     * clip, and with `overflow-y` left visible no future content can be sliced.
     *
     * The top breathing room is height-aware. `min(8vh, 14vh - 4.5rem)` is the
     * original 8vh on tall viewports (they cross at 1200px) and noticeably less
     * on 800–900px laptops, which is where the strip was falling off the floor.
     */
    <section
      id="hero"
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] flex-col overflow-x-clip bg-ink-950 pt-[calc(var(--nav-height)+clamp(2rem,min(8vh,14vh_-_4.5rem),7rem))]"
    >
      <CascadeField />

      <motion.div
        className="shell relative z-10"
        style={reduced ? undefined : { y, opacity }}
      >
        {/* 1 — status, with a rule running off to the right of it */}
        <Rise className="flex items-center gap-3.5" delay={0.05} duration={0.8}>
          <StatusDot active={hero.status.available} />
          <span className="label">{statusLabel}</span>
          <span aria-hidden="true" className="h-px min-w-6 flex-1 bg-[var(--rule)]" />
        </Rise>

        {/* 2 — the page's only h1. The words rise out of their own masks; the
            fade lands the headline a beat after the status row. */}
        <Rise className="mt-10 md:mt-14" delay={0.12} duration={1} y={0} blur={0}>
          <Headline
            as="h1"
            size="display"
            immediate
            parts={hero.headline}
            className="max-w-[16ch]"
          />
        </Rise>

        {/* 3 — lede. `text-pretty` so the longer Portuguese sentence doesn't
            end on a single orphaned word. */}
        <Rise
          as="p"
          className="mt-8 max-w-[52ch] text-lede text-pretty text-ink-400 md:mt-10"
          delay={0.62}
        >
          {hero.lede}
        </Rise>

        {/* 4 — CTAs. The row wraps, so a longer label pushes the secondary
            link onto a second row instead of overflowing. `whitespace-nowrap`
            keeps the pill itself on one line — it has a fixed height and text
            wrapping inside it would break out of the capsule. */}
        <Rise
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 md:mt-12"
          delay={0.82}
          duration={0.85}
        >
          <ButtonLink
            href={localePath(locale, hero.primaryCta.href)}
            className="whitespace-nowrap"
          >
            {hero.primaryCta.label}
          </ButtonLink>
          <ArrowLink href={localePath(locale, hero.secondaryCta.href)}>
            {hero.secondaryCta.label}
          </ArrowLink>
        </Rise>
      </motion.div>

      {/* Ledger strip — pinned to the floor of the hero.
          `mt-auto` already opens the gap on any viewport with room to spare, so
          this padding is only the *minimum* separation for cramped viewports.
          It used to be pt-20, which bought nothing on tall screens (mt-auto
          simply gave 80px back) and cost 80px on short ones, pushing the strip
          under the fold. */}
      <div className="relative z-10 mt-auto pt-10 md:pt-12">
        <div className="shell">
          <Rise className="flex justify-end pb-6" delay={1} y={8} blur={0}>
            <ScrollCue />
          </Rise>

          <Stagger
            as="dl"
            className="rule-t grid grid-cols-2 md:grid-cols-4"
            step={0.07}
            delay={0.5}
            amount={0.1}
          >
            {stats.map((stat, i) => (
              <StaggerItem
                key={stat.label}
                className={cn(
                  "flex flex-col-reverse items-start gap-2.5 py-6 pr-4 md:py-7 md:pr-6",
                  i % 2 === 1 && "pl-5 md:pl-0",
                  i >= 2 && "border-t border-[var(--rule)] md:border-t-0",
                  i > 0 && "md:border-l md:border-[var(--rule)] md:pl-7",
                )}
              >
                {/* Reversed in flow so the value reads first, while the DOM
                    keeps term-before-definition order. */}
                {/* `!` beats the `label` utility's own line-height:1, which
                    would crush these two-line labels on narrow screens.
                    Two lines are *reserved* (2 × 1.45em) and the text is
                    bottom-aligned inside them: the longer Portuguese labels
                    ("Empresas atendidas", "Experiência mediana do time") wrap
                    to two lines where the English ones do too, the numerals
                    stay on one line across all four columns, and a label that
                    ever needs a third line grows the strip instead of being
                    trimmed by the floor of the section. */}
                <dt className="label flex min-h-[2.9em] max-w-[20ch] items-end leading-[1.45]!">
                  {stat.label}
                </dt>
                <dd className="text-title font-medium text-ink-50">
                  {stat.value}
                  {stat.suffix ? (
                    <span className="ml-1 text-[0.5em] font-normal tracking-normal text-ink-500">
                      {stat.suffix}
                    </span>
                  ) : null}
                </dd>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
