import { Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";

/* --------------------------------------------------------------------------
 * Zenda runs on its own skin.
 *
 * The agency site is dark and monochrome; the product is white, blue and pink.
 * Someone who lands here and then signs in has to recognise the same place —
 * a dark landing followed by a light app reads as two different products.
 *
 * The whole flip is CSS. `.zenda-scope` (app/globals.css) redefines the same
 * token names the shared components already consume, so every `text-ink-50`
 * and `bg-canvas` in those components keeps working and simply paints light.
 * No component had to learn about theming.
 *
 * The font is loaded here rather than in the root layout so the agency site
 * never pays for a typeface it does not use.
 * ----------------------------------------------------------------------- */

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export default function ZendaLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${jakarta.variable} zenda-scope min-h-dvh`}>{children}</div>
  );
}
