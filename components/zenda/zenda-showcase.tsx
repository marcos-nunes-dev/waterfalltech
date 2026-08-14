import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Headline } from "@/components/ui/primitives";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { cn, pad } from "@/lib/utils";

/* --------------------------------------------------------------------------
 * The product, shown.
 *
 * Real captures from the running app with demonstration data — not renders,
 * not a device mockup on a gradient. A landing page that illustrates instead
 * of showing is promising an interface that may not exist, and the person who
 * finds out is the one who already signed up.
 *
 * Layout alternates: shot left / text right, then reversed. The frame is a
 * hairline and a soft blue glow, the same separation language the app uses —
 * no drop shadows, because Zenda's own surfaces don't float either.
 * ----------------------------------------------------------------------- */

const INDEX = 3;

/** `locale` kept for uniformity with the other sections; this one has no links. */
export function ZendaShowcase({ dict }: { dict: Dictionary; locale: Locale }) {
  const { showcase } = dict.zenda;
  // A primeira captura ja abre a pagina, no heroi. Repeti-la aqui faria a
  // vitrine comecar mostrando o que a pessoa acabou de ver — e a secao perderia
  // o unico trabalho que ela tem, que e mostrar o que ainda nao foi mostrado.
  const shots = showcase.shots.slice(1);

  return (
    <section id="showcase" className="relative rule-t">
      <div className="mx-auto w-full max-w-[76rem] px-gutter py-section">
        <header className="grid-shell items-baseline gap-y-6">
          <Reveal
            className="col-span-12 flex items-baseline gap-4 lg:col-span-3 lg:flex-col lg:gap-3"
            y={12}
          >
            <span className="label text-signal">{pad(INDEX)}</span>
            <span className="label">{showcase.kicker}</span>
          </Reveal>
          <Reveal
            className="col-span-12 lg:col-span-8 lg:col-start-5"
            delay={0.08}
            y={16}
          >
            <Headline
              as="h2"
              size="title"
              parts={showcase.headline}
              className="max-w-[20ch] font-semibold text-balance text-ink-50"
            />
            <p className="mt-5 max-w-[52ch] text-[0.9375rem] leading-[1.7] text-pretty text-ink-400">
              {showcase.lede}
            </p>
          </Reveal>
        </header>

        <div className="mt-[clamp(3rem,1.5rem+5vw,5.5rem)] flex flex-col gap-[clamp(3.5rem,2rem+6vw,7rem)]">
          {shots.map((shot, i) => (
            <Reveal
              key={shot.id}
              className={cn(
                "grid-shell items-center gap-y-8",
                // Alternating sides. On mobile everything stacks with the shot
                // first, because the picture is the argument and the paragraph
                // is the caption — not the other way round.
                i % 2 === 1 && "lg:[&>figure]:order-2",
              )}
              y={20}
            >
              <figure className="col-span-12 lg:col-span-7">
                <div className="z-shot">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={1500}
                    height={1000}
                    // The first shot is above the fold on tall screens and is
                    // the page's largest paint; the rest can wait for scroll.
                    priority={i === 0}
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="h-auto w-full"
                  />
                </div>
              </figure>

              <div
                className={cn(
                  "col-span-12 lg:col-span-4",
                  i % 2 === 1 ? "lg:col-start-1" : "lg:col-start-9",
                )}
              >
                <span className="label text-signal">{pad(i + 1)}</span>
                <h3 className="mt-4 text-lg font-semibold tracking-[-0.015em] text-balance text-ink-50">
                  {shot.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.7] text-pretty text-ink-400">
                  {shot.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
