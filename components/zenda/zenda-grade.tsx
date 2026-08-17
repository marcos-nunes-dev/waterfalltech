"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/* --------------------------------------------------------------------------
 * A grade de disponibilidade, se pintando.
 *
 * No produto a atendente clica e arrasta para dizer em que dias e horas o
 * medico atende. Aqui a mesma grade se preenche sozinha, na ordem em que uma
 * pessoa faria: as manhas primeiro, depois as tardes, depois o sabado curto.
 *
 * O gesto e o argumento. Uma lista de horarios digitados um a um nao teria
 * graca nenhuma, e e exatamente o que o produto evita.
 * ----------------------------------------------------------------------- */

const DIAS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const HORAS = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17"];

/** Cada bloco: dia, hora de inicio, quantas horas. Pintados em cascata. */
const BLOCOS = [
  { dia: 1, ini: 1, dur: 4 },
  { dia: 2, ini: 1, dur: 4 },
  { dia: 3, ini: 1, dur: 4 },
  { dia: 4, ini: 1, dur: 4 },
  { dia: 5, ini: 1, dur: 4 },
  { dia: 1, ini: 6, dur: 4 },
  { dia: 2, ini: 6, dur: 4 },
  { dia: 3, ini: 6, dur: 4 },
  { dia: 4, ini: 6, dur: 4 },
  { dia: 5, ini: 6, dur: 4 },
  { dia: 6, ini: 1, dur: 3 },
];

export function ZendaGrade({ legenda }: { legenda: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const naTela = useInView(ref, { amount: 0.35 });
  const semMovimento = useReducedMotion();
  const [pintados, setPintados] = useState(0);

  useEffect(() => {
    if (!naTela) return;
    if (semMovimento) {
      setPintados(BLOCOS.length);
      return;
    }
    // Depois de completar, respira e recomeca. O laco e o ponto: mostra que a
    // grade se monta em segundos, nao em uma tarde de cadastro.
    const cheia = pintados >= BLOCOS.length;
    const t = window.setTimeout(
      () => setPintados((p) => (p >= BLOCOS.length ? 0 : p + 1)),
      cheia ? 2400 : 220,
    );
    return () => window.clearTimeout(t);
  }, [pintados, naTela, semMovimento]);

  return (
    <div
      ref={ref}
      aria-label={legenda}
      role="img"
      className="w-full max-w-[26rem] rounded-[1.125rem] border border-line bg-ink-950 p-4"
    >
      <div className="flex items-center justify-between">
        <span className="rounded-md bg-signal/15 px-2 py-1 text-[0.6875rem] font-semibold text-signal">
          Consultório Centro
        </span>
        <span className="text-[0.6875rem] text-ink-500">Teleconsulta</span>
      </div>

      <div className="mt-3 grid grid-cols-[2rem_repeat(7,1fr)] gap-px">
        <span />
        {DIAS.map((d) => (
          <span
            key={d}
            className="pb-1 text-center text-[0.625rem] font-semibold text-ink-500"
          >
            {d}
          </span>
        ))}

        {HORAS.map((h, linha) => (
          <div key={h} className="contents">
            <span className="pr-1.5 text-right text-[0.5625rem] leading-[1.4rem] text-ink-600 tabular-nums">
              {h}h
            </span>
            {DIAS.map((_, col) => {
              const indice = BLOCOS.findIndex(
                (b) => b.dia === col && linha >= b.ini && linha < b.ini + b.dur,
              );
              const aceso = indice >= 0 && indice < pintados;
              return (
                <motion.span
                  key={col}
                  initial={false}
                  animate={{
                    backgroundColor: aceso
                      ? "color-mix(in oklab, var(--color-signal) 22%, transparent)"
                      : "color-mix(in oklab, var(--color-ink-900) 100%, transparent)",
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[1.4rem] rounded-[3px]"
                />
              );
            })}
          </div>
        ))}
      </div>

      <p className="mt-3 text-[0.6875rem] text-ink-500">
        Clique e arraste para pintar. O nome do dia marca a coluna.
      </p>
    </div>
  );
}
