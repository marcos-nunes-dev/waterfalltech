"use client";

import Image from "next/image";
import {
  ArrowLink,
  ButtonLink,
  Headline,
  StatusDot,
} from "@/components/ui/primitives";
import type { Dictionary } from "@/content/types";
import { localePath, type Locale } from "@/lib/i18n";

/* --------------------------------------------------------------------------
 * The one place on this project where centring is correct: a product page has
 * a single message. Below the measure, the product itself.
 *
 * This used to be an abstract flow map — deliberately a diagram, not a
 * screenshot, in the agency's voice. On Zenda's own page that choice inverts:
 * the visitor's question is "what does it look like", and a diagram in place
 * of the answer is one more step between them and deciding.
 * ----------------------------------------------------------------------- */

export function ZendaHero({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const { zenda } = dict;
  // A primeira captura do showcase e a mesma que abre a pagina: repetir a
  // fonte evita que a vitrine e o heroi mostrem telas diferentes do mesmo app.
  const [hero] = zenda.showcase.shots;

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
            <span className="label">{hero.title}</span>
            <span aria-hidden="true" className="h-px flex-1 bg-[var(--rule)]" />
          </figcaption>

          {/* A tela real, e nao um diagrama.
              O site da agencia usa um esquema abstrato de proposito — la o
              produto e o raciocinio. Aqui o produto e o PRODUTO, e a pergunta
              de quem chega e "como isso se parece". Um diagrama no lugar dessa
              resposta e uma pergunta a mais entre a pessoa e a decisao dela. */}
          <div className="z-shot mt-4">
            <Image
              src={hero.src}
              alt={hero.alt}
              width={1500}
              height={1000}
              priority
              sizes="(min-width: 1200px) 76rem, 100vw"
              className="h-auto w-full"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
