import Link from "next/link";
import { Fragment } from "react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui/primitives";
import type { Client, Dictionary } from "@/content/types";
import { localePath, sectionCopy, sectionIndex, type Locale } from "@/lib/i18n";
import { cn, pad } from "@/lib/utils";

/* --------------------------------------------------------------------------
 * CLIENTS
 *
 * Two registers, deliberately different:
 *   1. a ghosted full-bleed ticker directly under the hero — atmosphere, read
 *      at a glance, never the source of truth
 *   2. the ledger — a hairline table where the actual claim is made
 *
 * Everything here is CSS-driven interaction, so the file stays a server
 * component; only the scroll reveal (Stagger) crosses into the client bundle.
 * ----------------------------------------------------------------------- */

/** Names fade into the page edges instead of being sliced by the clip box. */
const EDGE_FADE =
  "[mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]";

/* ----------------------------------------------------------------------- */

/**
 * One half of the marquee track. `wf-marquee` translates the track by exactly
 * -50%, so the two halves must be byte-identical for the loop to be seamless.
 * That -50% is a proportion of the track, not a pixel distance, so the loop
 * stays seamless whatever the roster's rendered width — and the edge mask is
 * likewise a percentage of the viewport, so it keeps covering both ends.
 * The roster is repeated *inside* each half so a half stays wider than an
 * ultra-wide viewport — otherwise the loop shows a gap on large displays.
 */
function MarqueeHalf({ clients }: { clients: Client[] }) {
  return (
    <div className="flex w-max shrink-0 items-center">
      {[0, 1].map((pass) =>
        clients.map((client) => (
          <Fragment key={`${pass}-${client.name}`}>
            <span className="shrink-0 px-5 text-title font-medium whitespace-nowrap sm:px-8">
              {client.name}
            </span>
            {/* the only colour in the strip, and deliberately almost too small to notice */}
            <span className="size-[3px] shrink-0 rounded-full bg-signal" />
          </Fragment>
        )),
      )}
    </div>
  );
}

/* ----------------------------------------------------------------------- */

/** Name cell. A link where we can point at something public, plain text otherwise. */
function ClientName({ client, locale }: { client: Client; locale: Locale }) {
  const base =
    "block w-fit text-title font-medium text-ink-100 transition-[transform,text-decoration-color] duration-[450ms] ease-[var(--ease-out-expo)] group-hover:translate-x-2 group-focus-within:translate-x-2";
  const linked = cn(
    base,
    "underline decoration-1 decoration-[color:var(--rule-strong)] underline-offset-[0.22em] group-hover:decoration-ink-400",
  );

  if (!client.href) return <span className={base}>{client.name}</span>;

  if (/^https?:\/\//.test(client.href)) {
    return (
      <a
        href={client.href}
        target="_blank"
        rel="noreferrer noopener"
        className={linked}
      >
        {client.name}
      </a>
    );
  }

  return (
    <Link href={localePath(locale, client.href)} className={linked}>
      {client.name}
    </Link>
  );
}

/* ----------------------------------------------------------------------- */

export function Clients({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const { clients, ui } = dict;
  const copy = sectionCopy(dict, "clients");

  return (
    <section id="clients" className="relative rule-t">
      {/* ---- 1. the ticker. Full-bleed by virtue of sitting outside the shell. ---- */}
      <div className="group rule-b">
        <p className="sr-only">
          {copy.kicker}: {clients.map((client) => client.name).join(", ")}.
        </p>
        <div className={cn("overflow-clip py-6 sm:py-8", EDGE_FADE)}>
          <div
            aria-hidden="true"
            className="flex w-max animate-[wf-marquee_46s_linear_infinite] items-center text-ink-800 transition-colors duration-700 ease-[var(--ease-out-quart)] will-change-transform group-hover:text-ink-600 group-hover:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]"
          >
            <MarqueeHalf clients={clients} />
            <MarqueeHalf clients={clients} />
          </div>
        </div>
      </div>

      {/* ---- 2. the ledger ---- */}
      <div className="shell py-section">
        <SectionHeader
          index={sectionIndex(dict, "clients")}
          kicker={copy.kicker}
          headline={copy.headline}
          lede={copy.lede || undefined}
        />

        {/*
          The list bleeds 1rem past the text column on both sides so the hover
          band has air and the active tick can sit in the margin rather than on
          top of the index. `px-4` on each row's grid puts the content back on
          the section's 12-column grid.
        */}
        <Stagger
          as="ul"
          step={0.06}
          amount={0.08}
          className="-mx-4 mt-16 rule-t lg:mt-24"
        >
          {clients.map((client, i) => (
            <StaggerItem
              as="li"
              key={client.name}
              className="group relative rule-b transition-colors duration-[450ms] ease-[var(--ease-out-expo)] focus-within:border-b-[color:var(--rule-strong)] focus-within:bg-ink-900/60 hover:border-b-[color:var(--rule-strong)] hover:bg-ink-900/60"
            >
              {/* active marker — one of the accent's few licensed appearances */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-[2px] origin-left scale-x-0 bg-signal transition-transform duration-[450ms] ease-[var(--ease-out-expo)] group-focus-within:scale-x-100 group-hover:scale-x-100"
              />

              <div className="grid gap-y-2 px-4 py-5 sm:py-6 lg:grid-shell lg:items-baseline lg:gap-y-0 lg:py-7">
                <span className="label hidden lg:col-span-1 lg:block">
                  {pad(i + 1)}
                </span>

                {/*
                  min-w-0 keeps the name inside its four columns: without it the
                  cell's automatic minimum would let a long name spill into the
                  sector column instead of wrapping.
                */}
                <div className="min-w-0 lg:col-span-4">
                  <ClientName client={client} locale={locale} />
                </div>

                {/*
                  Below lg these three read as one line: "sector · region · year".
                  At lg the wrapper dissolves (display: contents) and each field
                  becomes a real column of the row's grid.

                  `break-words` is the guard for translated values: Portuguese
                  sectors and engagements run long, and these are the row's two
                  narrowest columns. Words wrap at spaces on their own; this only
                  catches a single token wider than its column, which would
                  otherwise overflow into the neighbour.
                */}
                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 lg:contents">
                  <span className="text-sm break-words text-ink-500 lg:col-span-3 lg:text-base">
                    {client.sector}
                  </span>
                  <span aria-hidden="true" className="text-ink-700 lg:hidden">
                    ·
                  </span>
                  <span className="hidden break-words text-ink-500 lg:col-span-2 lg:block lg:text-base">
                    {client.engagement}
                  </span>
                  <span className="label break-words lg:col-span-2 lg:text-right">
                    {client.region} · {client.since}
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Explains the gap a careful reader will already have noticed. */}
        <div className="grid-shell mt-10">
          <p className="col-span-12 max-w-[62ch] text-sm text-pretty text-ink-600 lg:col-span-7 lg:col-start-2">
            {ui.ndaNote}
          </p>
        </div>
      </div>
    </section>
  );
}
