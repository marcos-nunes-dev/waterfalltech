import { Nav } from "@/components/site/nav";
import { CascadeRail } from "@/components/site/cascade-rail";
import { Hero } from "@/components/site/hero";
import { Clients } from "@/components/site/clients";
import { Studio } from "@/components/site/studio";
import { Capabilities } from "@/components/site/capabilities";
import { Work } from "@/components/site/work";
import { Products } from "@/components/site/products";
import { Process } from "@/components/site/process";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { getDict, isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Section order here must match the `sections` array in the dictionary — that
 * array drives both the numerals in each section header and the markers on the
 * fixed rail, so a mismatch shows up immediately as an out-of-order index.
 *
 * Every section takes the same two props. No context provider: the dictionary
 * is plain data, so passing it down keeps server components on the server and
 * client components hydrating from props they can see.
 */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDict(locale);
  const props = { dict, locale };

  return (
    <>
      <Nav {...props} />
      <CascadeRail {...props} />
      <main id="main">
        <Hero {...props} />
        <Clients {...props} />
        <Studio {...props} />
        <Capabilities {...props} />
        <Work {...props} />
        <Products {...props} />
        <Process {...props} />
        <Contact {...props} />
      </main>
      <Footer {...props} />
    </>
  );
}
