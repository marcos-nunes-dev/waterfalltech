"use client";

import { motion, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import type { Dictionary, SectionId } from "@/content/types";
import { localePath, type Locale } from "@/lib/i18n";
import { cn, pad } from "@/lib/utils";

/* --------------------------------------------------------------------------
 * The spine. A fixed hairline in the left gutter with one tick per section,
 * filled from the top as the page scrolls — the Waterfall name expressed as
 * navigation. Desktop only: below `lg` there is no gutter to live in.
 *
 * The rail lives INSIDE the gutter and must stay there: at 1440px the shell's
 * gutter is 3.5rem, so page content starts at x≈56px while the rail sits at
 * x≈20px. Only the ticks are permanently visible — they fit. The text label is
 * an on-demand overlay: it appears on hover/focus of a single marker, on a
 * solid ink-950 chip that paints over whatever it covers, and it disappears
 * again. That is what keeps it from colliding with the mono "01 / KICKER"
 * label SectionHeader renders in the same left column.
 *
 * Which section is current is therefore carried by the tick alone — wider and
 * signal-coloured — not by a permanently-revealed word. That also makes the
 * rail locale-proof: "Selected work" and "Projetos selecionados" are very
 * different widths, and neither is on screen unless the reader asks for it.
 *
 * Blue appears exactly twice here, and this is one of the sanctioned places:
 * the progress fill and the active tick.
 * ----------------------------------------------------------------------- */

const EXPO = [0.16, 1, 0.3, 1] as const;

export function CascadeRail({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const { sections, ui } = dict;
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [activeId, setActiveId] = useState<SectionId | null>(null);

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    // A 1%-tall band across the middle of the viewport. A section owns the
    // rail from the moment its body crosses that line.
    const observer = new IntersectionObserver(
      (entries) => {
        setActiveId((previous) => {
          let entering: SectionId | null = null;

          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const match = sections.find((s) => s.id === entry.target.id);
            if (match) entering = match.id;
          }
          if (entering) return entering;

          // Scrolled back up above the section that was active — nothing is
          // current again (the hero owns the top of the page).
          const leftDownward = entries.some(
            (entry) =>
              !entry.isIntersecting &&
              entry.target.id === previous &&
              entry.boundingClientRect.top > 0,
          );

          return leftDownward ? null : previous;
        });
      },
      { rootMargin: "-45% 0px -54% 0px", threshold: 0 },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
    // `sections` is a module-level constant on the dictionary, so this is a
    // stable reference — the observer is built once, not once per render.
  }, [sections]);

  return (
    <motion.nav
      aria-label={ui.sectionNav}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.7, ease: EXPO }}
      className="pointer-events-none fixed top-1/2 left-[max(1rem,calc((100vw-90rem)/2+1.25rem))] z-40 hidden -translate-y-1/2 lg:flex"
    >
      <div className="relative h-[clamp(16rem,40vh,28rem)]">
        {/* Track */}
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-px bg-[var(--rule)]"
        />
        {/* Read position. Not decoration — it keeps tracking under reduced motion. */}
        <motion.span
          aria-hidden="true"
          style={{ scaleY: scrollYProgress }}
          className="absolute inset-y-0 left-0 w-px origin-top bg-signal will-change-transform"
        />

        <ul className="relative flex h-full flex-col justify-between">
          {sections.map((section, i) => {
            const isActive = section.id === activeId;

            return (
              <li key={section.id} className="flex">
                <a
                  href={localePath(locale, `#${section.id}`)}
                  aria-current={isActive ? "true" : undefined}
                  className="group pointer-events-auto relative flex items-center py-2.5 pr-5"
                >
                  {/* Tick. Widens by transform so the label never shifts. It
                      carries the active state on its own — see note above. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-px w-2.5 origin-left bg-ink-700",
                      // v4 emits `scale` as its own property, so the blanket
                      // `transition` list is what actually covers it.
                      !reduced &&
                        "transition duration-500 ease-[var(--ease-out-expo)]",
                      isActive
                        ? "scale-x-[2.2] bg-signal"
                        : "group-hover:scale-x-[1.8] group-hover:bg-ink-400 group-focus-visible:scale-x-[1.8] group-focus-visible:bg-ink-400",
                    )}
                  />

                  {/*
                    Hover/focus only, and never for `isActive` alone — a
                    permanently-visible label would sit on top of the section
                    header. Opacity-0 rather than hidden keeps the words in the
                    accessibility tree, so the link is still named "01 Clients".
                    max-w + wrapping absorbs whatever length the locale needs
                    without the chip running across the page.
                  */}
                  <span
                    className={cn(
                      "label pointer-events-none absolute top-1/2 left-9 z-10 flex max-w-[14rem] -translate-x-1 -translate-y-1/2 items-baseline gap-2 rounded-sm border border-[var(--rule)] bg-ink-950 px-2.5 py-1.5 opacity-0",
                      !reduced &&
                        "transition duration-500 ease-[var(--ease-out-expo)]",
                      "group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
                    )}
                  >
                    <span className="shrink-0 text-ink-600">{pad(i + 1)}</span>
                    <span
                      className={cn(
                        "min-w-0 leading-[1.35]",
                        isActive ? "text-ink-300" : "text-ink-400",
                      )}
                    >
                      {section.kicker}
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );
}
