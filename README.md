# Waterfall

Marketing site for the Waterfall technology consultancy, plus a standalone page for each
in-house product (currently Zenda) served from its own subdomain.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · Motion · Lenis.

---

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build
npm start            # serve the production build
npm run lint         # eslint
npx tsc --noEmit     # typecheck
```

---

## Editing the content

**All copy lives in two files, one per language:**

- [`content/en.ts`](content/en.ts) — English
- [`content/pt-BR.ts`](content/pt-BR.ts) — Brazilian Portuguese

Nothing is hard-coded into components. Search either file for `PLACEHOLDER` — every invented
value is marked. In priority order:

| What              | Key                    | Why it matters                                          |
| ----------------- | ---------------------- | ------------------------------------------------------- |
| Your real domain  | `site.domain`, `site.url` | Canonical URLs, the sitemap, and subdomain links      |
| Contact address   | `site.email`           | The primary call to action on the whole page            |
| Client list       | `clients`              | Currently eight invented companies                      |
| Case studies      | `work`                 | Including the live `href` for each                      |
| What Zenda does   | `products`, `zenda`    | The entire Zenda page reads from these                  |
| Stats strip       | `stats`                | Four numbers under the hero — make them defensible      |
| Section headlines | `sections`             | Kicker, headline and lede for each section              |
| Interface labels  | `ui`                   | Buttons, aria-labels, status pills — not marketing copy |

### The two files must stay structurally identical

[`content/types.ts`](content/types.ts) defines a `Dictionary` type that both files must satisfy,
so **the build fails if you add a key to one and forget the other**. What it cannot check is
array *length* — if you add a ninth client to `en.ts` and not to `pt-BR.ts`, the Portuguese site
silently shows eight. Add entries in pairs.

Three structural notes:

- `sections` is the page's spine. Section headers and the fixed scroll rail both read from it,
  so their numbering cannot drift apart. Reordering the array reorders the indices everywhere.
- Headlines are `{ before, accent, after }`. The `accent` is one word and renders in italic
  serif — it should be the word you want the reader to land on, not a literal translation of the
  English accent.
- Some strings contain `{name}` / `{base}` tokens, filled in at render by `interpolate()`.
  Keep the braces when translating.

Adding an entry to `products` is all it takes to create a new product route: it gets
`/<locale>/products/<slug>` and a subdomain at `<slug>.yourdomain.com` automatically. You still
have to write that product's page.

---

## Languages

Two locales, each on its own URL prefix — `/en` and `/pt-BR`. Both are statically prerendered.

- Visiting an unprefixed path redirects (308) to the reader's best locale: an explicit cookie
  they set with the EN/PT switcher, then `Accept-Language`, then English.
- The switcher (in the nav and the footer) keeps the reader on the same page across the swap,
  and writes a one-year cookie so the choice sticks.
- `hreflang` alternates and an `x-default` are emitted on every page, so the two versions don't
  compete as duplicate content.

**To add a third language:** add the tag to `locales` in [`lib/i18n.ts`](lib/i18n.ts), add its
label to `localeLabels` / `localeNames` / `localeTags`, create `content/<tag>.ts` satisfying
`Dictionary`, and register it in the `dictionaries` map. Nothing else needs to change — routing,
the sitemap, the switcher and `generateStaticParams` all read from that array.

---

## How subdomains work

`zenda.yourdomain.com` and `/products/zenda` render the same page. [`proxy.ts`](proxy.ts) reads the
`Host` header, matches it against the product slugs, and rewrites the request — a rewrite, not a
redirect, so the subdomain stays in the address bar.

### Locally

Visit **`http://zenda.localhost:3000`**. Most systems resolve any `*.localhost` name to
`127.0.0.1` with no `hosts` file editing. If yours doesn't, add:

```
127.0.0.1 zenda.localhost
```

to `C:\Windows\System32\drivers\etc\hosts` (Windows) or `/etc/hosts` (macOS/Linux).

### In production (Vercel)

1. Add the apex domain to the project: **Settings → Domains → `yourdomain.com`**.
2. Add a **wildcard** domain in the same place: **`*.yourdomain.com`**. This is what makes every
   future product subdomain work without another deploy.
3. At your DNS provider:

   | Type    | Name  | Value                   |
   | ------- | ----- | ----------------------- |
   | `A`     | `@`   | `76.76.21.21`           |
   | `CNAME` | `www` | `cname.vercel-dns.com`  |
   | `CNAME` | `*`   | `cname.vercel-dns.com`  |

   (Confirm the exact values Vercel shows you — they occasionally change.)
4. A wildcard domain needs a wildcard TLS certificate, which requires Vercel to verify domain
   ownership via DNS. Vercel will prompt you with a `TXT` record to add.

If you'd rather not use a wildcard, add each subdomain individually (`zenda.yourdomain.com`) with
a `CNAME` to `cname.vercel-dns.com`. The proxy logic is identical either way.

---

## Project layout

```
app/
  [locale]/
    layout.tsx            ROOT layout — <html lang>, fonts, metadata, smooth scroll
    page.tsx              the agency site — composes the sections in order
    products/zenda/       the Zenda page (also served at zenda.<domain>)
    not-found.tsx  opengraph-image.tsx
  robots.ts  sitemap.ts   locale-agnostic, stay outside [locale]
  globals.css             the design tokens
components/
  site/                   one file per section of the agency page
  zenda/                  one file per section of the product page
  ui/primitives.tsx       Headline, SectionHeader, ArrowLink, ButtonLink, StatusDot, Rule
  ui/language-switcher.tsx
  motion/reveal.tsx       Reveal, Stagger, StaggerItem, MaskText
  providers/              Lenis smooth scroll
content/
  types.ts                the Dictionary contract both locales must satisfy
  en.ts  pt-BR.ts         ALL copy
lib/
  i18n.ts                 locales, getDict, section + path helpers
  domain.ts               host → product slug
  utils.ts                cn, pad, interpolate
proxy.ts                  locale redirects + subdomain rewrites
.impeccable.md            the design direction this site is built against
```

There is deliberately **no `app/layout.tsx`** — the root layout lives inside `[locale]` so that
`<html lang>` can come from the URL. `proxy.ts` guarantees nothing ever renders outside that tree.

---

## Design system

The full token set is defined in [`app/globals.css`](app/globals.css) under `@theme`; the
direction it serves is written down in [`.impeccable.md`](.impeccable.md). The short version:

- **Monochrome, blue-tinted neutrals.** A 13-step `ink` scale in OKLCH. Never pure black or white.
- **One accent.** `signal` blue, used like punctuation — the status dot, the scroll rail, one
  column in the hero cascade, focus rings. If you see blue more than twice in a viewport,
  something has gone wrong.
- **Hairlines, not cards.** Structure comes from 1px rules and asymmetric 12-column spans.
- **Type.** Instrument Sans throughout, Instrument Serif *italic* for exactly one word per
  headline, Geist Mono only for real metadata.
- **Motion.** Transform, opacity and filter only. Exponential ease-out, never bounce. Everything
  degrades to static under `prefers-reduced-motion`.

---

## Before launch

- [ ] Replace every `PLACEHOLDER` in `content/site.ts`
- [ ] Add a real `app/favicon.ico`
- [ ] Check the generated share card at `/opengraph-image` (it renders from `site.tagline`
      automatically — replace `app/opengraph-image.tsx` only if you want art direction)
- [ ] Point `site.domain` at the real domain
- [ ] Add the wildcard domain in Vercel and the matching DNS records
