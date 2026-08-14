import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { defaultLocale, getDict, locales } from "@/lib/i18n";

/**
 * Share card for Zenda's own page.
 *
 * Deliberately NOT the agency card: that one is near-black with a hairline
 * cascade. This is the product, so it wears the product's skin — white paper,
 * blue and pink, the same tokens the app uses. A dark card linking to a white
 * page is the same mismatch the landing itself used to have.
 *
 * Satori supports a narrow CSS subset (flexbox, absolute positioning, plain
 * backgrounds). No CSS variables, no oklch, no Tailwind — the hex values below
 * are the literal Zenda tokens.
 */

const defaults = getDict(defaultLocale);
export const alt = `${defaults.zenda.name} — ${defaults.zenda.lede}`;

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ZendaOpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDict(locale);
  const { zenda, site } = dict;

  const INK = "#0f172a";
  const INK_2 = "#475569";
  const INK_3 = "#94a3b8";
  const BLUE = "#3b82f6";
  const PINK = "#ec4899";
  const RULE = "#e2e8f0";

  /**
   * The wordmark, inlined as a data URI.
   *
   * Satori cannot rasterise an imported React SVG component, but it does read
   * `<img src="data:image/svg+xml,…">`. Reading from `public/` at build time
   * keeps one source of truth for the mark — the alternative is a second copy
   * of the path data that silently goes stale when the logo changes.
   */
  const wordmark = await readFile(
    join(process.cwd(), "public", "zenda", "logo-full.svg"),
    "utf8",
  );
  const wordmarkUri = `data:image/svg+xml;base64,${Buffer.from(
    wordmark.replace(/currentColor/g, INK),
  ).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          padding: 72,
          position: "relative",
        }}
      >
        {/* The app's wallpaper: a breath of blue at one corner, pink at the
            other. Two soft discs rather than a gradient — Satori has no
            radial-gradient, and a hard linear one would read as a banner. */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: -160,
            width: 760,
            height: 760,
            borderRadius: 999,
            backgroundColor: "#eff6ff",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -320,
            right: -180,
            width: 720,
            height: 720,
            borderRadius: 999,
            backgroundColor: "#fdf2f8",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={wordmarkUri} alt="" height={40} />
          <div style={{ width: 1, height: 26, backgroundColor: RULE }} />
          <div style={{ fontSize: 20, color: INK_3 }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 72,
              lineHeight: 1.05,
              letterSpacing: -3,
              color: INK,
              maxWidth: 940,
            }}
          >
            {/* Rebuilt from the parts so the accent word carries the blue,
                exactly as the <Headline> component renders it on the page. */}
            <span style={{ display: "flex", marginRight: 18 }}>
              {zenda.headline.before}
            </span>
            <span style={{ display: "flex", color: BLUE, marginRight: 18 }}>
              {zenda.headline.accent}
            </span>
            <span style={{ display: "flex" }}>{zenda.headline.after}</span>
          </div>

          <div style={{ width: "100%", height: 1, backgroundColor: RULE }} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 24,
              fontSize: 21,
              color: INK_2,
            }}
          >
            <div>{`zenda.${site.domain}`}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 999,
                  backgroundColor: PINK,
                }}
              />
              <div style={{ color: INK_3 }}>{zenda.status.label}</div>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
