import { MaskText, Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ArrowLink, SectionHeader, StatusDot } from "@/components/ui/primitives";
import type { Dictionary, Product } from "@/content/types";
import { localePath, sectionCopy, sectionIndex, type Locale } from "@/lib/i18n";
import { cn, interpolate, pad } from "@/lib/utils";

/* --------------------------------------------------------------------------
 * Products — the proof that Waterfall ships its own software.
 *
 * Each product gets a full-bleed slab on the sunk canvas, breaking the shell
 * so it reads as its own territory rather than another row in the ledger.
 * Below the slabs, an honest empty slot: one product shipped, one in progress,
 * and no pretending otherwise.
 *
 * The status word next to the dot is `dict.ui.productStatus`, keyed off
 * `Product["status"]` — the status itself is an identifier and never
 * translated, only the word rendered for it.
 * ----------------------------------------------------------------------- */

export function Products({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const { products, nextSlot } = dict;
  const copy = sectionCopy(dict, "products");

  return (
    <section id="products" className="relative rule-t">
      <div className="shell pt-section">
        <SectionHeader
          index={sectionIndex(dict, "products")}
          kicker={copy.kicker}
          headline={copy.headline}
          lede={copy.lede || undefined}
        />
      </div>

      <div className="mt-16 sm:mt-24 lg:mt-28">
        {products.map((product, i) => (
          <ProductBlock
            key={product.slug}
            product={product}
            index={i}
            last={i === products.length - 1}
            dict={dict}
            locale={locale}
          />
        ))}
      </div>

      <div className="shell pt-14 pb-section sm:pt-16">
        <Reveal y={16}>
          <div className="flex flex-col gap-4 border border-dashed border-[var(--rule)] px-5 py-6 sm:flex-row sm:items-start sm:gap-10 sm:px-8 sm:py-8">
            <span className="label shrink-0 sm:pt-1">
              {pad(products.length + 1)}
            </span>
            <div>
              <p className="text-[0.9375rem] font-medium text-ink-400">
                {nextSlot.title}
              </p>
              <p className="mt-2 max-w-[58ch] text-[0.9375rem] leading-[1.7] text-ink-600">
                {nextSlot.clause}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- */

/**
 * One full-bleed feature slab. Alternate entries mirror left/right so a second
 * product never looks like a duplicate of the first.
 */
function ProductBlock({
  product,
  index,
  last,
  dict,
  locale,
}: {
  product: Product;
  index: number;
  last: boolean;
  dict: Dictionary;
  locale: Locale;
}) {
  const { site, ui } = dict;
  const mirrored = index % 2 === 1;

  return (
    <div className={cn("rule-t bg-ink-1000", last && "rule-b")}>
      <div className="shell py-24 sm:py-32 lg:py-40">
        <div className="grid-shell items-start gap-y-14 lg:items-center">
          {/* ---- Text column: cols 1–6, or 7–12 when mirrored ---- */}
          <div
            className={cn(
              "col-span-12 lg:col-span-6 lg:row-start-1",
              mirrored ? "lg:col-start-7" : "lg:col-start-1",
            )}
          >
            <Reveal y={14}>
              {/* Wraps rather than crushing the kicker: mono labels sit at
                  line-height 1, so a squeezed line would collide. */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="label text-ink-600">{pad(index + 1)}</span>
                <span className="label">{product.kicker}</span>
              </div>
            </Reveal>

            <h3 className="mt-7 text-headline font-medium tracking-[-0.04em] text-ink-50">
              <MaskText text={product.name} />
            </h3>

            <Reveal delay={0.1} y={12}>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <StatusDot active={product.status !== "building"} />
                <span className="label text-ink-400">
                  {ui.productStatus[product.status]}
                </span>
                <span
                  aria-hidden="true"
                  className="h-3 w-px bg-[var(--rule-strong)]"
                />
                <span className="label">{product.year}</span>
              </div>
            </Reveal>

            <Reveal delay={0.14} y={16}>
              <p className="mt-9 max-w-[32ch] text-pretty text-lede text-ink-200">
                {product.tagline}
              </p>
              <p className="mt-5 max-w-[44ch] text-[0.9375rem] leading-[1.7] text-ink-400">
                {product.description}
              </p>
            </Reveal>

            <Reveal delay={0.2} y={12}>
              <div className="mt-10">
                <ArrowLink href={localePath(locale, `/products/${product.slug}`)}>
                  {interpolate(ui.openProductPage, { name: product.name })}
                </ArrowLink>
                {/* Canonical host, rendered as metadata rather than a link.
                    A hostname, never translated. */}
                <div className="mt-5 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-px w-6 shrink-0 bg-[var(--rule-strong)]"
                  />
                  <span className="label text-ink-600">
                    {`${product.slug}.${site.domain}`}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ---- Mark: cols 8–12, or 1–5 when mirrored ---- */}
          <div
            className={cn(
              "col-span-12 max-w-[17rem] sm:max-w-[20rem] lg:col-span-5 lg:row-start-1 lg:max-w-[24rem]",
              mirrored
                ? "lg:col-start-1 lg:justify-self-start"
                : "lg:col-start-8 lg:justify-self-end",
            )}
          >
            <CascadeMark />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------- */

const GRID = 6;
const CELLS = Array.from({ length: GRID * GRID }, (_, i) => i);

/**
 * Abstract mark: a hairline field with a single diagonal of filled cells that
 * land one after another, top-left to bottom-right. The terminus is the only
 * blue in the block besides the status dot. Echoes the hero cascade — not a
 * logo, not an icon.
 */
function CascadeMark() {
  return (
    <div aria-hidden="true" className="w-full">
      <Stagger
        className="grid aspect-square grid-cols-6 grid-rows-6 border-t border-l border-[var(--rule-faint)]"
        step={0.11}
        delay={0.08}
        amount={0.4}
      >
        {CELLS.map((i) => {
          const row = Math.floor(i / GRID);
          const column = i % GRID;
          const cell = "border-r border-b border-[var(--rule-faint)]";

          if (row !== column) return <div key={i} className={cell} />;

          return (
            <StaggerItem key={i} className={cell}>
              <span
                className={cn(
                  "block size-full",
                  row === GRID - 1 ? "bg-signal" : "bg-ink-800",
                )}
              />
            </StaggerItem>
          );
        })}
      </Stagger>
    </div>
  );
}
