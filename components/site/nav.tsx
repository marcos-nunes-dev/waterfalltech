"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ButtonLink } from "@/components/ui/primitives";
import type { Dictionary } from "@/content/types";
import { localePath, type Locale } from "@/lib/i18n";
import { cn, interpolate, pad } from "@/lib/utils";

const EXPO = [0.16, 1, 0.3, 1] as const;

/** Bar gains its surface past this scroll offset. */
const SETTLE_AT = 24;
/** Below this the bar never retracts — the hero keeps it. */
const RETRACT_AT = 400;

/* -------------------------------------------------------------------------- */

/**
 * The mark: three steps descending left-to-right, each one lower and brighter
 * than the last. Only the step that lands is signal — the single blue detail
 * in the whole bar.
 */
function CascadeMark() {
  return (
    <svg
      viewBox="0 0 14 14"
      aria-hidden="true"
      className="size-3.5 shrink-0 overflow-visible"
    >
      <rect
        x="0"
        y="1"
        width="8"
        height="2"
        className="fill-ink-600 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-px group-focus-visible:translate-x-px"
      />
      <rect
        x="3"
        y="6"
        width="8"
        height="2"
        className="fill-ink-400 transition-transform delay-[40ms] duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-[1.5px] group-focus-visible:translate-x-[1.5px]"
      />
      <rect
        x="6"
        y="11"
        width="8"
        height="2"
        className="fill-signal transition-transform delay-[80ms] duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-[2px] group-focus-visible:translate-x-[2px]"
      />
    </svg>
  );
}

/** The wordmark is a proper noun — it is the one string that never translates. */
function Wordmark({ name }: { name: string }) {
  return (
    <>
      <CascadeMark />
      <span className="whitespace-nowrap text-base font-medium tracking-tight text-ink-50">
        {name}
      </span>
    </>
  );
}

/* -------------------------------------------------------------------------- */

export function Nav({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { site, nav: navLinks, hero, ui } = dict;

  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  const [settled, setSettled] = useState(false);
  const [retracted, setRetracted] = useState(false);
  const [open, setOpen] = useState(false);

  const lastY = useRef(0);
  const hasOpened = useRef(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  /* Direction-aware retraction. Down past the hero hides it, any upward
     movement brings it straight back. */
  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = lastY.current;
    lastY.current = y;

    setSettled(y > SETTLE_AT);

    if (y > RETRACT_AT && y > previous) setRetracted(true);
    else if (y < previous) setRetracted(false);
  });

  /* Scroll restoration can land us mid-page before any scroll event fires, so
     take one reading after the first frame — otherwise a reload leaves the bar
     transparent on top of content. */
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const y = scrollY.get();
      lastY.current = y;
      setSettled(y > SETTLE_AT);
    });
    return () => cancelAnimationFrame(frame);
  }, [scrollY]);

  /* Lock the page while the panel owns the viewport. Restores the previous
     value on close and on unmount. */
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  /* Escape closes; Tab cycles inside the panel; crossing into the desktop
     breakpoint closes too, so the scroll lock can never outlive the panel. */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const query = window.matchMedia("(min-width: 48rem)");
    const onBreakpoint = () => {
      if (query.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    query.addEventListener("change", onBreakpoint);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      query.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  /* Focus in on open, back to the trigger on close. */
  useEffect(() => {
    if (open) {
      hasOpened.current = true;
      closeRef.current?.focus();
      return;
    }
    if (hasOpened.current) triggerRef.current?.focus();
  }, [open]);

  /* Any link inside the panel dismisses it — including the CTA and the locale
     swap, which navigates away anyway. */
  const dismissOnLink = (event: ReactMouseEvent<HTMLDivElement>) => {
    if ((event.target as Element | null)?.closest("a")) setOpen(false);
  };

  const hidden = retracted && !open && !reduced;

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-[400ms] ease-[var(--ease-out-quart)]",
          settled && !open
            ? "border-b-[color:var(--rule)] bg-ink-950/70 backdrop-blur-xl"
            : "border-b-transparent bg-transparent",
        )}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={reduced ? { duration: 0 } : { duration: 0.55, ease: EXPO }}
      >
        {/* Gaps tighten a step at md: the bar now carries the locale toggle as
            well, and Portuguese nav labels run ~20% wider than the English. */}
        <div className="shell flex h-[var(--nav-height)] items-center justify-between gap-4">
          <Link
            href={localePath(locale, "/")}
            aria-label={interpolate(ui.home, { name: site.name })}
            className="group flex shrink-0 items-center gap-2.5"
          >
            <Wordmark name={site.name} />
          </Link>

          <div className="flex items-center gap-5 lg:gap-8">
            <nav
              aria-label={ui.primaryNav}
              className="hidden items-center gap-5 md:flex lg:gap-7"
            >
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={localePath(locale, item.href)}
                  className="group relative whitespace-nowrap py-1 text-sm text-ink-400 transition-colors duration-300 hover:text-ink-50 focus-visible:text-ink-50"
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-ink-500 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
              ))}
            </nav>

            {/* Hairline sets the toggle apart from the links without letting it
                lean on the CTA. */}
            <div className="hidden items-center gap-4 md:flex lg:gap-6">
              <span
                aria-hidden="true"
                className="h-4 w-px shrink-0 bg-[var(--rule-strong)]"
              />
              <LanguageSwitcher locale={locale} label={ui.languageSwitcher} />
            </div>

            <ButtonLink
              variant="ghost"
              href={localePath(locale, hero.primaryCta.href)}
              className="hidden whitespace-nowrap sm:inline-flex"
            >
              {hero.primaryCta.label}
            </ButtonLink>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? ui.closeMenu : ui.openMenu}
              className="group relative -mr-3 flex size-11 shrink-0 items-center justify-center md:hidden"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute h-px w-5 bg-ink-300 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:bg-ink-50",
                  open ? "rotate-45" : "-translate-y-[3px]",
                )}
              />
              <span
                aria-hidden="true"
                className={cn(
                  "absolute h-px w-5 bg-ink-300 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:bg-ink-50",
                  open ? "-rotate-45" : "translate-y-[3px]",
                )}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label={interpolate(ui.menu, { name: site.name })}
            onClick={dismissOnLink}
            className="fixed inset-0 z-50 flex flex-col overscroll-contain bg-ink-1000 md:hidden"
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={reduced ? { duration: 0 } : { duration: 0.45, ease: EXPO }}
          >
            {/* Mirrors the bar exactly, so the hamburger reads as crossing over */}
            <div className="shell flex h-[var(--nav-height)] shrink-0 items-center justify-between gap-4">
              <span className="flex items-center gap-2.5">
                <Wordmark name={site.name} />
              </span>

              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label={ui.closeMenu}
                className="group relative -mr-3 flex size-11 shrink-0 items-center justify-center"
              >
                <motion.span
                  aria-hidden="true"
                  className="absolute h-px w-5 bg-ink-300 group-hover:bg-ink-50"
                  initial={reduced ? false : { rotate: 0, y: -3 }}
                  animate={{ rotate: 45, y: 0 }}
                  transition={reduced ? { duration: 0 } : { duration: 0.5, ease: EXPO }}
                />
                <motion.span
                  aria-hidden="true"
                  className="absolute h-px w-5 bg-ink-300 group-hover:bg-ink-50"
                  initial={reduced ? false : { rotate: 0, y: 3 }}
                  animate={{ rotate: -45, y: 0 }}
                  transition={reduced ? { duration: 0 } : { duration: 0.5, ease: EXPO }}
                />
              </button>
            </div>

            <Stagger
              className="flex min-h-0 flex-1 flex-col justify-between overflow-y-auto"
              step={0.06}
              delay={0.08}
              amount={0}
            >
              <nav aria-label={ui.primaryNav} className="shell flex flex-col pt-6">
                {navLinks.map((item, i) => (
                  <StaggerItem key={item.href}>
                    <a
                      href={localePath(locale, item.href)}
                      className="group flex items-baseline gap-5 rule-b py-5"
                    >
                      <span className="label shrink-0 text-ink-600">{pad(i + 1)}</span>
                      <span className="text-balance text-title font-medium tracking-tight text-ink-50">
                        {item.label}
                      </span>
                    </a>
                  </StaggerItem>
                ))}
              </nav>

              <div className="shell flex flex-col gap-7 pb-12 pt-10">
                <StaggerItem>
                  <ButtonLink
                    variant="ghost"
                    href={localePath(locale, hero.primaryCta.href)}
                    className="w-full"
                  >
                    {hero.primaryCta.label}
                  </ButtonLink>
                </StaggerItem>

                <StaggerItem>
                  {/* Address and locale toggle share the closing line. Wraps
                      rather than squeezing if the address runs long. */}
                  <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-5">
                    <a
                      href={`mailto:${site.email}`}
                      className="group relative inline-flex text-sm text-ink-400 transition-colors duration-300 hover:text-ink-50 focus-visible:text-ink-50"
                    >
                      {site.email}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-ink-500 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                      />
                    </a>

                    {/* Padded out to a thumb-sized target without moving the
                        baseline it shares with the address. */}
                    <LanguageSwitcher
                      locale={locale}
                      label={ui.languageSwitcher}
                      className="-my-3 gap-3 text-xs [&_a]:-mx-1.5 [&_a]:px-1.5 [&_a]:py-3"
                    />
                  </div>
                </StaggerItem>
              </div>
            </Stagger>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
