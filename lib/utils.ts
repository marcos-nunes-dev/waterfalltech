import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's built-in scales. Our fluid type scale
 * (`text-display`, `text-headline`, …) is defined in @theme, so out of the box
 * twMerge reads `text-headline` as an unknown `text-*` and treats it as
 * conflicting with `text-ink-50` — silently dropping the size and rendering
 * every headline at body size. Registering the tokens under the font-size
 * theme key teaches it the difference between size and colour.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display", "headline", "title", "lede", "meta"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Zero-padded section index: 1 -> "01" */
export function pad(n: number, width = 2) {
  return String(n).padStart(width, "0");
}

/**
 * Fill `{token}` placeholders in a dictionary string.
 *   interpolate("Open the {name} page", { name: "Zenda" })
 * Unknown tokens are left as-is so a typo is visible rather than silent.
 */
export function interpolate(
  template: string,
  values: Record<string, string | number>,
) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
