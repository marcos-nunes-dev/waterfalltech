"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/* --------------------------------------------------------------------------
 * O seletor de horarios do Zenda, vivo.
 *
 * Nao e uma captura nem uma ilustracao: sao os mesmos elementos do produto,
 * reconstruidos com os tokens deste site, tocando sozinhos a sequencia que a
 * atendente faz ao telefone. Filtra por dia, escolhe o horario, repete a serie.
 *
 * Por que reconstruir em vez de mostrar um GIF: um GIF pesa, desfoca no retina
 * e envelhece calado. Isto acompanha o tema, respeita `prefers-reduced-motion`
 * e custa alguns kB.
 *
 * A sequencia so comeca quando o bloco entra na tela, e para quando sai. Uma
 * animacao rodando fora do campo de visao gasta bateria para ninguem.
 * ----------------------------------------------------------------------- */

const HORAS = [
  "09:00", "09:30", "10:00", "10:30", "11:00",
  "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00",
];

const DIAS = ["D", "S", "T", "Q", "Q", "S", "S"];

/** Os passos da encenacao, em ordem. `espera` e quanto ele fica ali. */
const ROTEIRO = [
  { dias: [] as number[], periodo: 0, escolhido: -1, repetir: 1, espera: 900 },
  { dias: [2, 4], periodo: 0, escolhido: -1, repetir: 1, espera: 1100 },
  { dias: [2, 4], periodo: 1, escolhido: -1, repetir: 1, espera: 1100 },
  { dias: [2, 4], periodo: 1, escolhido: 2, repetir: 1, espera: 1300 },
  { dias: [2, 4], periodo: 1, escolhido: 2, repetir: 4, espera: 2600 },
];

const PERIODOS = ["Qualquer", "Manhã", "Tarde"];

function datasDaSerie(quantas: number): string[] {
  const base = new Date(Date.UTC(2026, 7, 18));
  return Array.from({ length: quantas }, (_, i) => {
    const d = new Date(base.getTime() + i * 7 * 86_400_000);
    const dia = String(d.getUTCDate()).padStart(2, "0");
    const mes = String(d.getUTCMonth() + 1).padStart(2, "0");
    return `ter ${dia}/${mes}`;
  });
}

export function ZendaMarcar({ legenda }: { legenda: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const naTela = useInView(ref, { amount: 0.4 });
  const semMovimento = useReducedMotion();
  const [passo, setPasso] = useState(0);

  useEffect(() => {
    // Parado fora da tela, e no ultimo quadro para quem pediu menos movimento.
    if (!naTela) return;
    if (semMovimento) {
      setPasso(ROTEIRO.length - 1);
      return;
    }
    const atual = ROTEIRO[passo] ?? ROTEIRO[0];
    const t = window.setTimeout(
      () => setPasso((p) => (p + 1) % ROTEIRO.length),
      atual.espera,
    );
    return () => window.clearTimeout(t);
  }, [passo, naTela, semMovimento]);

  const estado = ROTEIRO[passo] ?? ROTEIRO[0];
  const visiveis =
    estado.periodo === 1
      ? HORAS.slice(0, 6)
      : estado.periodo === 2
        ? HORAS.slice(9)
        : HORAS;
  const serie = datasDaSerie(estado.repetir);

  return (
    <div
      ref={ref}
      aria-label={legenda}
      role="img"
      className="w-full max-w-[19rem] rounded-[1.125rem] border border-line bg-ink-950 p-4 shadow-[0_1px_2px_rgba(16,24,40,0.03)]"
    >
      <p className="text-[0.8125rem] font-semibold text-ink-50">
        Marcar consulta
      </p>

      {/* dias da semana */}
      <div className="mt-3 flex gap-1">
        {DIAS.map((d, i) => (
          <span
            key={i}
            className={[
              "flex h-6 flex-1 items-center justify-center rounded-md text-[0.6875rem] transition-colors duration-500",
              estado.dias.includes(i)
                ? "bg-signal/15 font-semibold text-signal"
                : "bg-ink-900 text-ink-500",
            ].join(" ")}
          >
            {d}
          </span>
        ))}
      </div>

      {/* periodo */}
      <div className="mt-1.5 flex gap-1">
        {PERIODOS.map((p, i) => (
          <span
            key={p}
            className={[
              "flex h-6 flex-1 items-center justify-center rounded-md text-[0.6875rem] transition-colors duration-500",
              estado.periodo === i
                ? "bg-signal/15 font-semibold text-signal"
                : "bg-ink-900 text-ink-500",
            ].join(" ")}
          >
            {p}
          </span>
        ))}
      </div>

      {/* dia a vista */}
      <div className="mt-3 flex items-center gap-1.5 text-[0.6875rem] text-ink-400">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-ink-900">
          ‹
        </span>
        <span className="flex h-6 flex-1 items-center justify-center gap-1.5 rounded-md bg-ink-900 font-semibold text-ink-100 tabular-nums">
          ter 18/08
        </span>
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-ink-900">
          ›
        </span>
      </div>

      <p className="mt-3 text-[0.625rem] font-bold tracking-[0.04em] text-ink-500 uppercase">
        Consultório Centro
      </p>

      {/* horarios */}
      <div className="mt-1.5 grid grid-cols-5 gap-1">
        {visiveis.map((h, i) => (
          <motion.span
            key={h}
            layout={!semMovimento}
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className={[
              "flex h-[1.6rem] items-center justify-center rounded-md text-[0.6875rem] tabular-nums transition-colors duration-300",
              i === estado.escolhido
                ? "bg-signal font-semibold text-ink-1000"
                : "bg-ink-900 text-ink-200",
            ].join(" ")}
          >
            {h}
          </motion.span>
        ))}
      </div>

      {/* serie */}
      <motion.div
        initial={false}
        animate={{
          opacity: estado.escolhido >= 0 ? 1 : 0.35,
          y: estado.escolhido >= 0 ? 0 : 4,
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="mt-3 border-t border-line pt-3"
      >
        <p className="text-[0.6875rem] text-ink-400">
          Repetir{" "}
          <span className="rounded bg-ink-900 px-1.5 py-0.5 font-semibold text-ink-100 tabular-nums">
            {estado.repetir}
          </span>{" "}
          {estado.repetir === 1 ? "vez" : "vezes"}, a cada 1 semana
        </p>

        <ul className="mt-2 space-y-1">
          {serie.map((d, i) => (
            <motion.li
              key={d}
              initial={semMovimento ? false : { opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: semMovimento ? 0 : i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-center gap-2 text-[0.6875rem] text-ink-300 tabular-nums"
            >
              <span className="w-3 text-ink-600">{i + 1}</span>
              <span>{d} · 10:00</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-[0.6875rem] text-ink-500">Encaixe</span>
        <motion.span
          initial={false}
          animate={{ scale: estado.repetir > 1 ? 1 : 0.97 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-md bg-signal px-3 py-1.5 text-[0.6875rem] font-semibold text-ink-1000"
        >
          Marcar {estado.repetir > 1 ? estado.repetir : ""}
        </motion.span>
      </div>
    </div>
  );
}
