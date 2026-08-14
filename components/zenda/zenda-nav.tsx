"use client";

import { motion, useReducedMotion, useScroll } from "motion/react";
import { ZendaWordmark } from "@/components/zenda/zenda-logo";
import { ArrowLink, ButtonLink } from "@/components/ui/primitives";
import type { Dictionary } from "@/content/types";
import { localePath, type Locale } from "@/lib/i18n";

/* --------------------------------------------------------------------------
 * Product-page nav. Deliberately thinner than the agency site's chrome: a
 * wordmark, the parent-brand attribution, and one ghost CTA. The only moving
 * part is a scroll rail on the bottom hairline — the product's own surface is
 * allowed one more beat of signal than the agency site.
 * ----------------------------------------------------------------------- */

export function ZendaNav({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const { zenda, ui } = dict;
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  return (
    <header className="sticky top-0 z-50">
      <div className="relative border-b border-[var(--rule)] bg-ink-950/85 backdrop-blur-md">
        <div className="mx-auto flex h-[var(--nav-height)] w-full max-w-[76rem] items-center justify-between gap-4 px-gutter">
          {/* A marca completa ja contem a palavra — o texto ao lado seria o
              nome escrito duas vezes. Altura fixa, largura automatica: o SVG
              tem proporcao propria e esticar uma marca e sempre errado. */}
          <span className="flex shrink-0 items-center">
            <ZendaWordmark className="h-[1.6rem] w-auto text-ink-50" />
            <span className="sr-only">{zenda.name}</span>
          </span>

          <nav
            aria-label={zenda.name}
            className="flex items-center gap-4 sm:gap-6"
          >
            {/* The bar has a fixed height, so this attribution must never wrap
                onto a second line — it is longer in some locales than others. */}
            <ArrowLink
              href={localePath(locale, "/")}
              className="hidden whitespace-nowrap text-[0.8125rem] text-ink-400 hover:text-ink-100 sm:inline-flex"
            >
              {ui.waterfallProduct}
            </ArrowLink>
            <ButtonLink
              href={localePath(locale, zenda.primaryCta.href)}
              variant="ghost"
              className="h-9 shrink-0 whitespace-nowrap px-4 text-[0.8125rem]"
            >
              {zenda.primaryCta.label}
            </ButtonLink>
          </nav>
        </div>

        {reduced ? null : (
          <motion.span
            aria-hidden="true"
            style={{ scaleX: scrollYProgress }}
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-signal will-change-transform"
          />
        )}
      </div>
    </header>
  );
}
