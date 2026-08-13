"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { Fragment, type ElementType, type ReactNode } from "react";

/* --------------------------------------------------------------------------
 * The site's shared motion vocabulary.
 *
 * Two rules, applied everywhere:
 *   1. transform + opacity + filter only — never layout properties
 *   2. exponential deceleration (ease-out-expo) — never bounce
 *
 * Every primitive collapses to a plain, instantly-visible element under
 * `prefers-reduced-motion`. Nothing here is load-bearing for legibility.
 * ----------------------------------------------------------------------- */

const EXPO = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds. Use to offset a reveal against a sibling. */
  delay?: number;
  /** Travel distance in px. Smaller for dense UI, larger for display type. */
  y?: number;
  /** Fraction of the element that must be visible before it fires. */
  amount?: number;
  as?: ElementType;
};

/** Single element rising into place, with a short defocus on the way in. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  amount = 0.35,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as "div"] ?? motion.div;

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, delay, ease: EXPO }}
    >
      {children}
    </MotionTag>
  );
}

/* ----------------------------------------------------------------------- */

type StaggerProps = {
  children: ReactNode;
  className?: string;
  /** Seconds between each child. 0.05–0.09 reads as one gesture; 0.2 as a list. */
  step?: number;
  delay?: number;
  amount?: number;
  as?: ElementType;
};

const staggerParent = (step: number, delay: number): Variants => ({
  hidden: {},
  shown: { transition: { staggerChildren: step, delayChildren: delay } },
});

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(5px)" },
  shown: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EXPO },
  },
};

/** Wrap a list; every `<StaggerItem>` inside cascades in sequence. */
export function Stagger({
  children,
  className,
  step = 0.07,
  delay = 0,
  amount = 0.2,
  as = "div",
}: StaggerProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as "div"] ?? motion.div;

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={staggerParent(step, delay)}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as "div"] ?? motion.div;

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag className={className} variants={staggerChild}>
      {children}
    </MotionTag>
  );
}

/* ----------------------------------------------------------------------- */

type MaskTextProps = {
  /** Plain text. Split per word, each word masked behind its own clip box. */
  text: string;
  className?: string;
  /** Seconds between words. */
  step?: number;
  delay?: number;
  /** Fire on mount instead of on scroll — for above-the-fold headlines. */
  immediate?: boolean;
  as?: ElementType;
};

/**
 * Headline treatment: words rise out from behind a clip edge, one after the
 * next. This is the "falling into place" gesture the whole site is built on —
 * the cascade, applied to type.
 */
export function MaskText({
  text,
  className,
  step = 0.055,
  delay = 0,
  immediate = false,
  as = "span",
}: MaskTextProps) {
  const reduced = useReducedMotion();
  const Tag = as as "span";
  const words = text.split(" ").filter(Boolean);

  if (reduced) return <Tag className={className}>{text}</Tag>;

  const MotionTag = motion[Tag] ?? motion.span;
  const animateProp = immediate
    ? { animate: "shown" as const }
    : { whileInView: "shown" as const, viewport: { once: true, amount: 0.5 } };

  return (
    <MotionTag
      className={className}
      variants={staggerParent(step, delay)}
      initial="hidden"
      {...animateProp}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          {/* pb keeps descenders (g, y, p) from being sliced by the clip edge */}
          <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              variants={{
                hidden: { y: "108%" },
                shown: { y: 0, transition: { duration: 1, ease: EXPO } },
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </MotionTag>
  );
}
