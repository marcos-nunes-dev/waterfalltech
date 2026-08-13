import { Reveal } from "@/components/motion/reveal";
import { ArrowLink, Rule } from "@/components/ui/primitives";
import { defaultLocale, getDict } from "@/lib/i18n";

/**
 * 404. Same ledger grammar as every section — mono index in the narrow left
 * column, content offset into the wide right column, a hairline before the way
 * out. The number is metadata, not a monument, so it stays in the label style.
 *
 * DELIBERATELY LOCALE-BLIND. A not-found file renders outside the matched
 * route, so Next.js never passes it `params` — there is no locale to await and
 * no correct one to guess. It renders the default locale, and the way out
 * points at bare "/", which proxy.ts redirects to the reader's own locale. A
 * reader who lands here in Portuguese gets one English screen and then the
 * Portuguese site. Please do not "fix" this into a params read.
 */
export default function NotFound() {
  const { ui } = getDict(defaultLocale);

  return (
    <main id="main" className="flex min-h-svh items-center">
      <Reveal className="shell grid-shell w-full items-start gap-y-8" y={14}>
        <div className="col-span-12 flex flex-wrap items-baseline gap-x-4 gap-y-2 lg:col-span-3 lg:flex-col lg:items-start lg:gap-3">
          <span className="label text-signal">404</span>
          {/* Sentence-length in both locales, so it has to be allowed to wrap. */}
          <span className="label leading-[1.45]">{ui.notFoundTitle}</span>
        </div>

        <div className="col-span-12 lg:col-span-8 lg:col-start-5">
          <p className="max-w-[32ch] text-balance text-title font-medium text-ink-50">
            {ui.notFoundBody}
          </p>
          <Rule className="mt-10" />
          <div className="mt-6">
            <ArrowLink href="/">{ui.backHome}</ArrowLink>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
