"use client";

import { motion, useReducedMotion } from "motion/react";
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
 * The one place on this project where centring is correct: a product page has
 * a single message. Below the measure, an abstract flow map — lanes, blocks,
 * and one path descending through them. It is a diagram, not a screenshot.
 * ----------------------------------------------------------------------- */

const EXPO = [0.16, 1, 0.3, 1] as const;

/** Lane rules, as a share of the frame height. */
const LANES = ["top-[20%]", "top-[40%]", "top-[60%]", "top-[80%]"];

/**
 * Blocks of work sitting on the lanes. Class strings are written out in full
 * so Tailwind can see them — do not build these with template literals.
 */
const BLOCKS: { pos: string; tone: string }[] = [
  { pos: "top-[20%] left-[6%] w-[10%]", tone: "bg-ink-800" },
  { pos: "top-[20%] left-[20%] w-[6%]", tone: "border border-[var(--rule-strong)]" },
  { pos: "top-[20%] left-[33%] w-[9%]", tone: "bg-ink-850" },
  { pos: "top-[40%] left-[8%] w-[5%]", tone: "bg-ink-850" },
  { pos: "top-[40%] left-[26%] w-[16%]", tone: "bg-ink-700" },
  { pos: "top-[40%] left-[50%] w-[7%]", tone: "border border-[var(--rule-strong)]" },
  { pos: "top-[60%] left-[20%] w-[6%]", tone: "bg-ink-850" },
  { pos: "top-[60%] left-[42%] w-[10%]", tone: "bg-ink-700" },
  { pos: "top-[60%] left-[57%] w-[7%]", tone: "border border-[var(--rule-strong)]" },
  { pos: "top-[80%] left-[30%] w-[8%]", tone: "bg-ink-850" },
  { pos: "top-[80%] left-[47%] w-[5%]", tone: "border border-[var(--rule-strong)]" },
  { pos: "top-[80%] left-[64%] w-[12%]", tone: "bg-ink-700" },
  // The one block that carries the accent: work that made it to the end.
  { pos: "top-[80%] left-[86%] w-[6%]", tone: "bg-signal" },
];

/** The route a single change takes, in a 0–100 box stretched to the frame. */
const TRACK = "M8 20H26V40H42V60H64V80H90";
const TRACK_TAIL = "M64 60V80H90";

export function ZendaHero({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const { zenda } = dict;
  const reduced = useReducedMotion();
  const [lead] = zenda.features;

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="grain" />

      <div className="relative mx-auto w-full max-w-[76rem] px-gutter pt-[clamp(3.5rem,1.5rem+7vw,7.5rem)] pb-[clamp(4rem,2rem+6vw,7rem)]">
        <div className="mx-auto flex max-w-[46rem] flex-col items-center text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full border border-[var(--rule)] px-4 py-2">
            <span className="flex items-center gap-2">
              <StatusDot />
              <span className="label text-ink-300">{zenda.status.label}</span>
            </span>
            <span
              aria-hidden="true"
              className="hidden h-3 w-px bg-[var(--rule-strong)] sm:block"
            />
            <span className="text-xs text-pretty text-ink-500">
              {zenda.status.detail}
            </span>
          </div>

          <Headline
            as="h1"
            size="display"
            immediate
            parts={zenda.headline}
            className="mt-8 max-w-[15ch]"
          />

          <p className="mt-7 max-w-[52ch] text-lede text-pretty text-ink-400">
            {zenda.lede}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <ButtonLink href={localePath(locale, zenda.primaryCta.href)}>
              {zenda.primaryCta.label}
            </ButtonLink>
            <ArrowLink href={localePath(locale, zenda.secondaryCta.href)}>
              {zenda.secondaryCta.label}
            </ArrowLink>
          </div>
        </div>

        <figure className="mt-[clamp(3.5rem,2rem+6vw,6.5rem)]">
          <figcaption className="flex items-center gap-4">
            <span className="label">{lead.title}</span>
            <span aria-hidden="true" className="h-px flex-1 bg-[var(--rule)]" />
            <span className="sr-only">{lead.body}</span>
          </figcaption>

          <div
            aria-hidden="true"
            className="relative mt-4 h-[14rem] overflow-hidden border border-[var(--rule)] bg-ink-1000/50 sm:h-[18rem] lg:h-[21rem]"
          >
            {LANES.map((lane) => (
              <span
                key={lane}
                className={cn(
                  "absolute inset-x-0 h-px bg-[var(--rule-faint)]",
                  lane,
                )}
              />
            ))}

            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 size-full"
              fill="none"
              strokeWidth="1"
              strokeLinecap="square"
            >
              {reduced ? (
                <>
                  <path
                    d={TRACK}
                    className="stroke-ink-600"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d={TRACK_TAIL}
                    className="stroke-signal"
                    vectorEffect="non-scaling-stroke"
                  />
                </>
              ) : (
                <>
                  <motion.path
                    d={TRACK}
                    className="stroke-ink-600"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1.5, delay: 0.35, ease: EXPO }}
                  />
                  <motion.path
                    d={TRACK_TAIL}
                    className="stroke-signal"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.9, delay: 1.35, ease: EXPO }}
                  />
                </>
              )}
            </svg>

            <Stagger
              className="absolute inset-0"
              step={0.05}
              delay={0.2}
              amount={0.15}
            >
              {BLOCKS.map((block) => (
                // Bars are pure geometry — the explicit null keeps `children`
                // satisfied without emitting an empty text node.
                <StaggerItem
                  key={block.pos}
                  className={cn("absolute -mt-1 h-2", block.pos, block.tone)}
                >
                  {null}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </figure>
      </div>
    </section>
  );
}
