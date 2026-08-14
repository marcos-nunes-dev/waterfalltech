"use client";

import { motion, useReducedMotion } from "motion/react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { cn, pad } from "@/lib/utils";

/* --------------------------------------------------------------------------
 * Three steps read left-to-right on md+, divided by vertical hairlines and
 * strung together by a horizontal rule that draws itself once, on entry. On
 * mobile the same rules simply rotate: each step sits under its own hairline.
 * ----------------------------------------------------------------------- */

const EXPO = [0.16, 1, 0.3, 1] as const;
const INDEX = 4;

// `locale` is accepted for uniformity with every other section — this one has
// no links, so it is never read.
export function ZendaHow({ dict }: { dict: Dictionary; locale: Locale }) {
  const { zenda } = dict;
  const reduced = useReducedMotion();
  const steps = zenda.how;

  return (
    <section
      id="how"
      className="relative rule-t scroll-mt-[var(--nav-height)]"
    >
      <div className="mx-auto w-full max-w-[76rem] px-gutter py-section">
        <Reveal
          className="flex flex-wrap items-baseline gap-x-6 gap-y-3"
          y={12}
        >
          <span className="label text-signal">{pad(INDEX)}</span>
          <h2 className="text-title font-medium text-balance text-ink-50">
            {zenda.howTitle}
          </h2>
        </Reveal>

        <div className="relative mt-[clamp(2.5rem,1.5rem+4vw,4.5rem)]">
          {reduced ? (
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 hidden h-px bg-[var(--rule-strong)] md:block"
            />
          ) : (
            <motion.span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 hidden h-px origin-left bg-[var(--rule-strong)] md:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.3, ease: EXPO }}
            />
          )}

          <Stagger as="ol" className="grid md:grid-cols-3" step={0.12}>
            {steps.map((item, i) => (
              <StaggerItem
                key={item.step}
                as="li"
                className={cn(
                  "relative min-w-0 border-t border-[var(--rule)] pt-9 pb-10 md:border-t-0 md:pr-8 md:pb-0",
                  i > 0 && "md:border-l md:border-[var(--rule)] md:pl-8",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-0 left-0 size-1.5 -translate-y-1/2",
                    i === steps.length - 1 ? "bg-signal" : "bg-ink-700",
                  )}
                />
                <span className="label">{pad(i + 1)}</span>
                <h3 className="mt-6 text-title font-medium text-balance text-ink-50">
                  {item.step}
                </h3>
                <p className="mt-4 max-w-[34ch] text-[0.9375rem] leading-[1.7] text-pretty text-ink-400">
                  {item.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
