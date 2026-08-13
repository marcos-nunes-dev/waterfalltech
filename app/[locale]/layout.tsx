import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import {
  getDict,
  isLocale,
  localeTags,
  locales,
  type Locale,
} from "@/lib/i18n";
import "../globals.css";

/*
 * This is the ROOT layout — it owns <html> and <body>. It lives inside the
 * [locale] segment rather than at app/ so that `lang` can be set from the URL
 * instead of hard-coded. There is deliberately no app/layout.tsx; proxy.ts
 * redirects every unprefixed path into a locale, so nothing renders outside
 * this tree.
 */

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(locale);
  const active: Locale = isLocale(locale) ? locale : "en";

  return {
    metadataBase: new URL(dict.site.url),
    title: {
      default: `${dict.site.name} — ${dict.site.tagline}`,
      template: `%s — ${dict.site.name}`,
    },
    description: dict.site.description,
    alternates: {
      canonical: `/${active}`,
      // Lets Google serve the right language and stops the two locales from
      // competing with each other as duplicate content.
      languages: {
        ...Object.fromEntries(locales.map((l) => [localeTags[l], `/${l}`])),
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      siteName: dict.site.name,
      title: `${dict.site.name} — ${dict.site.tagline}`,
      description: dict.site.description,
      url: `${dict.site.url}/${active}`,
      locale: localeTags[active].replace("-", "_"),
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#0b0c10",
  colorScheme: "dark",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDict(locale);

  return (
    <html
      lang={localeTags[locale]}
      className={`${instrumentSans.variable} ${instrumentSerif.variable} ${GeistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-sm focus:bg-ink-50 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink-950"
        >
          {dict.ui.skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
