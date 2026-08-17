import { Reveal } from "@/components/motion/reveal";
import { Headline } from "@/components/ui/primitives";
import { ZendaGrade } from "@/components/zenda/zenda-grade";
import { ZendaMarcar } from "@/components/zenda/zenda-marcar";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { pad } from "@/lib/utils";

/* --------------------------------------------------------------------------
 * A agenda, funcionando na propria pagina.
 *
 * As outras secoes mostram capturas. Esta mostra os componentes do produto,
 * reconstruidos com os tokens deste site e tocando sozinhos. A diferenca
 * importa: a agenda e a parte do Zenda que so faz sentido em movimento, e uma
 * imagem parada de uma grade vazia nao diz nada.
 * ----------------------------------------------------------------------- */

const INDEX = 4;

export function ZendaAgenda({ dict }: { dict: Dictionary; locale: Locale }) {
  const { agenda } = dict.zenda;

  return (
    <section id="agenda" className="relative rule-t">
      <div className="mx-auto w-full max-w-[76rem] px-gutter py-section">
        <header className="grid-shell items-baseline gap-y-6">
          <Reveal
            className="col-span-12 flex items-baseline gap-4 lg:col-span-3 lg:flex-col lg:gap-3"
            y={12}
          >
            <span className="label text-signal">{pad(INDEX)}</span>
            <span className="label">{agenda.kicker}</span>
          </Reveal>
          <Reveal
            className="col-span-12 lg:col-span-8 lg:col-start-5"
            delay={0.08}
            y={16}
          >
            <Headline
              as="h2"
              size="title"
              parts={agenda.headline}
              className="max-w-[20ch] font-semibold text-balance text-ink-50"
            />
            <p className="mt-5 max-w-[52ch] text-[0.9375rem] leading-[1.7] text-pretty text-ink-400">
              {agenda.lede}
            </p>
          </Reveal>
        </header>

        <div className="mt-[clamp(3rem,1.5rem+5vw,5rem)] flex flex-col gap-[clamp(3rem,2rem+5vw,5.5rem)]">
          {agenda.blocks.map((bloco, i) => (
            <div
              key={bloco.title}
              className="grid-shell items-center gap-y-8"
            >
              <Reveal
                className={[
                  "col-span-12 flex justify-center lg:col-span-6",
                  i % 2 === 1 ? "lg:order-2 lg:col-start-7" : "",
                ].join(" ")}
                y={18}
              >
                {i === 0 ? (
                  <ZendaGrade legenda={bloco.alt} />
                ) : (
                  <ZendaMarcar legenda={bloco.alt} />
                )}
              </Reveal>

              <Reveal
                className={[
                  "col-span-12 lg:col-span-5",
                  i % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-8",
                ].join(" ")}
                delay={0.06}
                y={16}
              >
                <h3 className="text-[1.0625rem] font-semibold text-ink-50">
                  {bloco.title}
                </h3>
                <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-[1.7] text-pretty text-ink-400">
                  {bloco.body}
                </p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
