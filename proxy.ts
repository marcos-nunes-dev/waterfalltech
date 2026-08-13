/* ============================================================================
 *  ROUTING — subdomains and locales, resolved before anything renders.
 * ----------------------------------------------------------------------------
 *  Two jobs, in this order:
 *
 *  1. LOCALE. Every rendered page lives under app/[locale]/, so every request
 *     must carry a locale prefix. An unprefixed path on the apex is REDIRECTED
 *     (308) to the reader's best locale:
 *
 *        /                     ->  /en            (or /pt-BR)
 *        /products/zenda       ->  /en/products/zenda
 *
 *     Preference order: an explicit cookie the reader set with the language
 *     switcher, then Accept-Language, then English.
 *
 *  2. SUBDOMAIN. A product hostname is REWRITTEN, never redirected, so the URL
 *     bar keeps saying zenda.waterfalltech.xyz:
 *
 *        zenda.waterfalltech.xyz/          renders  /en/products/zenda
 *        zenda.waterfalltech.xyz/pt-BR     renders  /pt-BR/products/zenda
 *        waterfalltech.xyz/en/products/zenda   renders itself, unchanged
 *
 *     The slug list comes from `products` in content/en.ts — add a product
 *     there and its subdomain starts working. Nothing is hard-coded here.
 *
 *  ------------------------------------------------------------------------
 *  GOING LIVE — what has to exist for zenda.waterfalltech.xyz to resolve
 *  ------------------------------------------------------------------------
 *  1. DNS, at your registrar / DNS host:
 *
 *       Apex        A       @        76.76.21.21
 *                   (or ALIAS/ANAME @ -> cname.vercel-dns.com if supported)
 *       Product     CNAME   zenda    cname.vercel-dns.com
 *
 *     Prefer a wildcard if you expect more products — then every future slug
 *     works the moment it is added to content/en.ts:
 *
 *       Wildcard    CNAME   *        cname.vercel-dns.com
 *
 *  2. Vercel, Project -> Settings -> Domains: add `zenda.waterfalltech.xyz`
 *     (or `*.waterfalltech.xyz` for the wildcard route). Vercel only forwards a
 *     hostname to this deployment once the domain is attached to the project —
 *     DNS alone is not enough. A wildcard also needs a wildcard certificate,
 *     which Vercel issues after you add the TXT record it asks for.
 *
 *  3. Leave the product domain set to "No Redirect" in Vercel. If you configure
 *     it to redirect to the apex, the browser leaves the subdomain before this
 *     file ever sees the request and the rewrite below never runs.
 *
 *  ------------------------------------------------------------------------
 *  TESTING LOCALLY
 *  ------------------------------------------------------------------------
 *    npm run dev, then open  http://zenda.localhost:3000
 *
 *  Chrome, Edge, Safari and Firefox resolve *.localhost to 127.0.0.1 on their
 *  own (RFC 6761) — no hosts-file edit. If some tool in your chain does not,
 *  add `127.0.0.1  zenda.localhost` to
 *  C:\Windows\System32\drivers\etc\hosts (or /etc/hosts).
 *
 *  ------------------------------------------------------------------------
 *  NEXT.JS 16 NOTE
 *  ------------------------------------------------------------------------
 *  Next.js 16 renamed this file convention from `middleware` to `proxy`. The
 *  behaviour is identical; only the filename and the exported function name
 *  changed. If you find a `middleware.ts` guide online it still applies — just
 *  read `proxy` for `middleware`. Never have both files present: Next.js throws
 *  when it finds middleware.ts *and* proxy.ts.
 * ========================================================================= */

import { NextResponse, type NextRequest } from "next/server";
import { productPath, productSlugFromHost } from "@/lib/domain";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n";

/** Set by the language switcher; an explicit choice outranks the browser. */
export const LOCALE_COOKIE = "waterfall_locale";

/**
 * Best locale for this request, in preference order:
 *   1. the cookie the reader's own click set
 *   2. Accept-Language, by quality value
 *   3. English
 *
 * A hand-rolled Accept-Language parse rather than a library: this runs on the
 * edge for every request and the header format is three lines of work.
 */
function detectLocale(request: NextRequest): Locale {
  const fromCookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(fromCookie)) return fromCookie;

  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      const quality = q ? Number.parseFloat(q.trim().slice(2)) : 1;
      return { tag: tag.trim().toLowerCase(), q: Number.isNaN(quality) ? 0 : quality };
    })
    .filter((entry) => entry.tag)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    // Exact match first: "pt-br" -> pt-BR
    const exact = locales.find((l) => l.toLowerCase() === tag);
    if (exact) return exact;
    // Then the base language: "pt", "pt-pt" -> pt-BR (our only Portuguese)
    const base = tag.split("-")[0];
    const loose = locales.find((l) => l.toLowerCase().split("-")[0] === base);
    if (loose) return loose;
  }

  return defaultLocale;
}

/** The locale prefix already on the path, if any. */
function localeFromPath(pathname: string): Locale | null {
  const first = pathname.split("/")[1];
  return isLocale(first) ? first : null;
}

export function proxy(request: NextRequest) {
  // The Host header is what the browser actually asked for. `nextUrl.host` is
  // the fallback for runtimes that normalise the header away.
  const host = request.headers.get("host") ?? request.nextUrl.host;
  const slug = productSlugFromHost(host);
  const { pathname } = request.nextUrl;
  const pathLocale = localeFromPath(pathname);

  /* --- 2. Product subdomain: rewrite, keep the hostname in the URL bar --- */
  if (slug) {
    const locale = pathLocale ?? detectLocale(request);
    // Everything after the locale prefix, e.g. "/pt-BR/pricing" -> "/pricing"
    const rest = pathLocale
      ? pathname.slice(`/${pathLocale}`.length)
      : pathname === "/"
        ? ""
        : pathname;

    const target = `/${locale}${productPath(slug)}${rest}`;
    // Already where we want to be — rewriting again would nest the path.
    if (pathname === target) return NextResponse.next();

    const url = request.nextUrl.clone();
    url.pathname = target;
    const response = NextResponse.rewrite(url);
    // Content differs by language even though the URL does not.
    response.headers.set("Vary", "Accept-Language, Cookie");
    return response;
  }

  /* --- 1. Apex: make sure a locale prefix is present ---------------------- */
  if (pathLocale) return NextResponse.next();

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  const response = NextResponse.redirect(url, 308);
  response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

export const config = {
  matcher: [
    /*
     * Everything except:
     *   api/…          — route handlers own their own paths
     *   _next/static   — build output
     *   _next/image    — the image optimizer
     *   favicon.ico / robots.txt / sitemap.xml — metadata files
     *   *.<ext>        — any path whose last segment has a file extension
     *
     * `api(?:/|$)` rather than a bare `api` so a future page at /apiary is not
     * silently excluded. Matcher values must be static literals; Next.js reads
     * them at build time and ignores anything computed.
     */
    "/((?!api(?:/|$)|_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\.[^/]+$).*)",
  ],
};
