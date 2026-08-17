import { ImageResponse } from "next/og";
import { defaultLocale, getDict, locales } from "@/lib/i18n";

/**
 * Generated share card, one per locale. Same rules as the site: ink neutrals,
 * hairlines, one blue detail. Prerendered at build time so there is no runtime
 * cost, and it follows the dictionary — change a tagline and the card changes.
 *
 * Satori (which powers ImageResponse) supports a narrow CSS subset — flexbox,
 * absolute positioning and plain backgrounds only. No CSS variables, no oklch,
 * no Tailwind. The hex values below are the computed equivalents of the ink
 * tokens in app/globals.css.
 */

/**
 * `alt` is a module constant: Next.js reads the export, never calls it, so it
 * cannot see the locale. The only documented way to vary it is
 * `generateImageMetadata` — and that is mutually exclusive with the
 * `generateStaticParams` below. Next's metadata-route loader synthesises its
 * own `generateStaticParams` (enumerating image ids) as soon as
 * `generateImageMetadata` is exported, and re-exports ours alongside it, which
 * is a duplicate export. Prerendering both locales is worth more than a
 * translated alt string, so the alt stays in the default locale.
 */
const defaults = getDict(defaultLocale).site;
export const alt = `${defaults.name}: ${defaults.tagline}`;

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Enumerate the locales so both cards are built rather than rendered on
 * demand. A metadata route only reads `generateStaticParams` from its own
 * module — the one in app/[locale]/layout.tsx does not reach this file.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // Next 16 hands metadata image routes a promise, same as pages.
  const { locale } = await params;
  const { site } = getDict(locale);

  const INK_950 = "#0b0c10";
  const INK_50 = "#f7f8fa";
  const INK_500 = "#7f858f";
  const INK_800 = "#33373f";
  const SIGNAL = "#3f7bf5";

  // The cascade, flattened into a static field of falling columns.
  const columns = Array.from({ length: 30 }, (_, i) => {
    const seed = (i * 2654435761) % 1000;
    return {
      left: 40 + i * 38,
      top: 60 + (seed % 300),
      height: 90 + (seed % 180),
      blue: i === 11,
    };
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: INK_950,
          padding: 72,
          position: "relative",
        }}
      >
        {columns.map((c, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: c.left,
              top: c.top,
              width: 1,
              height: c.height,
              backgroundColor: c.blue ? SIGNAL : INK_800,
              opacity: c.blue ? 0.9 : 0.55,
            }}
          />
        ))}

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <div style={{ width: 18, height: 2, backgroundColor: INK_500 }} />
            <div style={{ width: 13, height: 2, backgroundColor: INK_500 }} />
            <div style={{ width: 8, height: 2, backgroundColor: SIGNAL }} />
          </div>
          <div style={{ fontSize: 26, color: INK_50, letterSpacing: -0.5 }}>
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.04,
              letterSpacing: -3,
              color: INK_50,
              maxWidth: 900,
            }}
          >
            {site.tagline}
          </div>
          <div style={{ width: "100%", height: 1, backgroundColor: INK_800 }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 24,
              fontSize: 21,
              color: INK_500,
            }}
          >
            <div>{site.domain}</div>
            <div>{site.base}</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
