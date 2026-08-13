"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  localeLabels,
  localeNames,
  locales,
  switchLocalePath,
  type Locale,
} from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * EN / PT toggle.
 *
 * Rendered as two real links rather than a dropdown: there are only two
 * locales, links are crawlable, and a middle-click still works. The active one
 * is not a link — you cannot navigate to where you already are.
 *
 * `switchLocalePath` keeps the reader on the same page across the swap, so
 * /pt-BR/products/zenda <-> /en/products/zenda rather than dumping to the home
 * page. Hash fragments are preserved by the browser on a client-side nav.
 */
/**
 * Persist the choice so proxy.ts stops guessing from Accept-Language on the
 * next unprefixed visit. One year, lax — it is a preference, not a session.
 *
 * Module scope on purpose: the React Compiler's immutability rule rejects
 * writing to `document` from inside a component body.
 */
function rememberLocale(next: Locale) {
  document.cookie = `waterfall_locale=${next};path=/;max-age=31536000;samesite=lax`;
}

export function LanguageSwitcher({
  locale,
  label,
  className,
}: {
  locale: Locale;
  /** aria-label from the dictionary, e.g. "Change language". */
  label: string;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "flex items-center gap-1.5 font-mono text-[0.6875rem] leading-none tracking-[0.11em]",
        className,
      )}
    >
      {locales.map((l, i) => {
        const active = l === locale;
        return (
          <span key={l} className="flex items-center gap-1.5">
            {i > 0 ? (
              <span aria-hidden="true" className="text-ink-700">
                /
              </span>
            ) : null}
            {active ? (
              <span aria-current="true" className="text-ink-100">
                {localeLabels[l]}
              </span>
            ) : (
              <Link
                href={switchLocalePath(pathname, l)}
                hrefLang={l}
                lang={l}
                onClick={() => rememberLocale(l)}
                aria-label={localeNames[l]}
                className="text-ink-600 transition-colors duration-300 hover:text-ink-200"
              >
                {localeLabels[l]}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
