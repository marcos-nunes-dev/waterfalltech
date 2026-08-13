import Link from "next/link";
import type { ReactNode } from "react";
import { MaskText, Reveal } from "@/components/motion/reveal";
import { cn, pad } from "@/lib/utils";

/* --------------------------------------------------------------------------
 * Shared building blocks. Every section composes from these so the page reads
 * as one system rather than eleven separately-designed slabs.
 * ----------------------------------------------------------------------- */

export type HeadlineParts = {
  before: string;
  /** Rendered in italic serif — the single editorial accent per headline. */
  accent: string;
  after?: string;
};

/**
 * Display headline. The accent word is italic serif and rises a beat after the
 * words before it, so the eye lands on it last.
 */
export function Headline({
  parts,
  className,
  immediate = false,
  size = "headline",
  as: Tag = "h2",
}: {
  parts: HeadlineParts;
  className?: string;
  immediate?: boolean;
  size?: "display" | "headline" | "title";
  /** One `h1` per page — the hero. Everything else stays `h2`. */
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const sizeClass = {
    display: "text-display",
    headline: "text-headline",
    title: "text-title",
  }[size];

  // Words before the accent set the pace; the accent lands on the next beat.
  const beforeWords = parts.before.trim().split(/\s+/).filter(Boolean).length;

  return (
    <Tag
      className={cn(
        sizeClass,
        "text-balance font-medium text-ink-50",
        className,
      )}
    >
      {parts.before ? (
        <>
          <MaskText text={parts.before} immediate={immediate} />{" "}
        </>
      ) : null}
      <MaskText
        text={parts.accent}
        className="em-serif"
        immediate={immediate}
        delay={beforeWords * 0.055 + 0.06}
      />
      {parts.after ? (
        <>
          {parts.after.startsWith(".") || parts.after.startsWith(",") ? "" : " "}
          <MaskText
            text={parts.after}
            immediate={immediate}
            delay={(beforeWords + 1) * 0.055 + 0.12}
          />
        </>
      ) : null}
    </Tag>
  );
}

/* ----------------------------------------------------------------------- */

/**
 * Section chrome: a hairline, a mono index in the narrow left column, and the
 * headline in the wide right column. The asymmetry is the point — content
 * never starts at the same x as the label.
 */
export function SectionHeader({
  index,
  kicker,
  headline,
  lede,
  className,
  children,
}: {
  index: number;
  kicker: string;
  headline: HeadlineParts;
  lede?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <header className={cn("grid-shell items-start gap-y-8", className)}>
      <Reveal
        className="col-span-12 flex items-baseline gap-4 lg:col-span-3 lg:flex-col lg:gap-3"
        y={12}
      >
        <span className="label text-signal">{pad(index)}</span>
        <span className="label">{kicker}</span>
      </Reveal>

      <div className="col-span-12 lg:col-span-8 lg:col-start-5">
        <Headline parts={headline} />
        {lede ? (
          <Reveal delay={0.12} y={16}>
            <p className="mt-7 max-w-[46ch] text-lede text-ink-400">{lede}</p>
          </Reveal>
        ) : null}
        {children}
      </div>
    </header>
  );
}

/* ----------------------------------------------------------------------- */

/**
 * The site's only link affordance: a label, a hairline that wipes in from the
 * left on hover, and an arrow that steps forward. Used for every outbound and
 * in-page link so hover behaviour is learnable.
 */
export function ArrowLink({
  href,
  children,
  external,
  className,
  tone = "default",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
  tone?: "default" | "signal";
}) {
  const isExternal = external ?? /^https?:\/\//.test(href);
  const Tag = isExternal ? "a" : Link;

  return (
    <Tag
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={cn(
        "group relative inline-flex items-center gap-2 py-1 text-sm font-medium transition-colors duration-300",
        tone === "signal"
          ? "text-signal-bright hover:text-signal-bright"
          : "text-ink-200 hover:text-ink-50",
        className,
      )}
    >
      <span>{children}</span>
      <svg
        viewBox="0 0 16 16"
        aria-hidden="true"
        className="size-3.5 shrink-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
      >
        {isExternal ? (
          <path
            d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="square"
          />
        ) : (
          <path
            d="M2.5 8h11M9.5 4l4 4-4 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="square"
          />
        )}
      </svg>
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100",
          tone === "signal" ? "bg-signal" : "bg-ink-500",
        )}
      />
    </Tag>
  );
}

/* ----------------------------------------------------------------------- */

/** Solid CTA. Used at most twice per page — hierarchy only survives scarcity. */
export function ButtonLink({
  href,
  children,
  variant = "solid",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
}) {
  const isExternal = /^(https?:|mailto:)/.test(href);
  const Tag = isExternal ? "a" : Link;

  return (
    <Tag
      href={href}
      {...(isExternal && href.startsWith("http")
        ? { target: "_blank", rel: "noreferrer noopener" }
        : {})}
      className={cn(
        "group relative isolate inline-flex h-11 items-center justify-center overflow-hidden rounded-full px-6 text-sm font-medium transition-colors duration-500",
        variant === "solid"
          ? "bg-ink-50 text-ink-950"
          : "border border-[var(--rule-strong)] text-ink-200 hover:text-ink-50",
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
      {/* Fill wipes up from the bottom edge rather than fading — reads faster */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10 origin-bottom scale-y-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100",
          variant === "solid" ? "bg-ink-200" : "bg-ink-850",
        )}
      />
    </Tag>
  );
}

/* ----------------------------------------------------------------------- */

/** Live-status dot. One of the few places blue is allowed to appear. */
export function StatusDot({ active = true }: { active?: boolean }) {
  return (
    <span className="relative flex size-1.5 shrink-0">
      {active ? (
        <span className="absolute inset-0 animate-[wf-pulse_2.4s_var(--ease-in-out-quart)_infinite] rounded-full bg-signal" />
      ) : null}
      <span
        className={cn(
          "relative size-1.5 rounded-full",
          active ? "bg-signal" : "bg-ink-600",
        )}
      />
    </span>
  );
}

/* ----------------------------------------------------------------------- */

/** Full-bleed hairline. The page's primary structural device. */
export function Rule({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("h-px w-full bg-[var(--rule)]", className)}
    />
  );
}
