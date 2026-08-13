/* ============================================================================
 *  DOMAIN — the single place that knows how hosts map to products.
 * ----------------------------------------------------------------------------
 *  Two directions, both derived from `products` in content/en.ts so adding a
 *  product is a one-line content edit and never a routing edit:
 *
 *    slug  -> url      productSubdomain("zenda")  ->  https://zenda.waterfalltech.xyz
 *    host  -> slug     productSlugFromHost("zenda.waterfalltech.xyz")  ->  "zenda"
 *
 *  Pure functions only — no React, no Next imports. `proxy.ts` runs this in a
 *  separate bundle, so nothing here may reach for shared state.
 *
 *  Reads the English dictionary directly: slugs, the domain and the origin are
 *  routing facts, identical in every locale. Nothing here is translated.
 * ========================================================================= */

import { en } from "@/content/en";

const { products, site } = en;

/** Every product slug. Derived, never hand-maintained. */
export const PRODUCT_SLUGS: readonly string[] = products.map(
  (product) => product.slug,
);

/** True when `value` names a product we actually ship. */
export function isProductSlug(value: string): boolean {
  return PRODUCT_SLUGS.includes(value);
}

/** The path a product renders at on the apex domain: `/products/zenda`. */
export function productPath(slug: string): string {
  return `/products/${slug}`;
}

/** The product's own public origin: `https://zenda.waterfalltech.xyz`. */
export function productSubdomain(slug: string): string {
  return `https://${slug}.${site.domain}`;
}

/* -------------------------------------------------------------------------- */
/*  Host parsing                                                              */
/* -------------------------------------------------------------------------- */

/** Loopback authorities that stand in for the apex during local development. */
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0", "[::1]"]);

/**
 * Lowercase a Host header down to a bare hostname: no port, no trailing dot,
 * no proxy-appended second value. Returns null for anything unusable, so every
 * caller gets one shape to check instead of a pile of edge cases.
 */
function normalizeHost(host: string | null | undefined): string | null {
  if (typeof host !== "string") return null;

  // Some proxies join forwarded hosts with a comma — take the first.
  let hostname = host.split(",")[0].trim().toLowerCase();
  if (!hostname) return null;

  if (hostname.startsWith("[")) {
    // Bracketed IPv6 authority, e.g. "[::1]:3000" — keep the brackets, drop the port.
    const close = hostname.indexOf("]");
    if (close === -1) return null;
    hostname = hostname.slice(0, close + 1);
  } else {
    const colon = hostname.indexOf(":");
    if (colon !== -1) hostname = hostname.slice(0, colon);
  }

  // A fully-qualified name may arrive with a root dot: "waterfalltech.xyz."
  if (hostname.endsWith(".")) hostname = hostname.slice(0, -1);

  return hostname || null;
}

/** `waterfalltech.xyz` itself, or anything under it (`staging.waterfalltech.xyz`). */
function isSiteSuffix(rest: string): boolean {
  return rest === site.domain || rest.endsWith(`.${site.domain}`);
}

/** Vercel preview and production deployment hostnames. */
function isVercelSuffix(rest: string): boolean {
  return rest === "vercel.app" || rest.endsWith(".vercel.app");
}

/**
 * Given a Host header, return the product it addresses — or null.
 *
 * Matches `<slug>.<domain>`, the dev equivalent `<slug>.localhost[:port]`, and
 * `<slug>.<anything>.vercel.app` preview hosts. Returns null for the apex, for
 * `www.`, for unknown subdomains, and for a missing or malformed header — the
 * apex site is the default and anything ambiguous must fall through to it.
 */
export function productSlugFromHost(
  host: string | null | undefined,
): string | null {
  const hostname = normalizeHost(host);
  if (!hostname) return null;

  const dot = hostname.indexOf(".");
  // No dot at all ("localhost", an IP) means there is no subdomain label.
  if (dot <= 0) return null;

  const label = hostname.slice(0, dot);
  const rest = hostname.slice(dot + 1);

  // `www` is the apex under another name, never a product.
  if (label === "www") return null;
  if (!isProductSlug(label)) return null;

  if (isSiteSuffix(rest)) return label;
  if (LOCAL_HOSTS.has(rest)) return label;
  if (isVercelSuffix(rest)) return label;

  return null;
}
