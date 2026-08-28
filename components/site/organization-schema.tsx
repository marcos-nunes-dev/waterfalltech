import type { Dictionary } from "@/content/types";

/* --------------------------------------------------------------------------
 * schema.org/Organization, em JSON-LD.
 *
 * A contraparte legível por máquina da linha de identificação do rodapé. O
 * rodapé serve a quem lê; isto serve a quem raspa — e a verificação de negócio
 * da Meta, o Google Business e qualquer validador de dados estruturados leem
 * daqui antes de ler o texto da página.
 *
 * Renderizado pelo layout de `[locale]`, que é a raiz de TUDO que o site
 * serve: home, páginas legais e a landing do Zenda no subdomínio. Uma única
 * inserção cobre o site inteiro, e nenhuma página pode existir sem o bloco.
 *
 * Todos os valores saem de `dict.site` — nada é digitado aqui. A razão social
 * e o CNPJ existem em um lugar só do repositório, e é o mesmo lugar que o
 * rodapé e o ledger do estúdio leem.
 * ----------------------------------------------------------------------- */

/**
 * CNPJ em dígitos puros: `42.804.319/0001-10` -> `42804319000110`.
 *
 * O `identifier` é o campo que um consumidor automático compara, e comparação
 * de identificador não deve depender de pontuação. O `taxID` logo ao lado
 * mantém a forma canônica, que é a que aparece no documento.
 */
function digits(cnpj: string): string {
  return cnpj.replace(/\D/g, "");
}

export function OrganizationSchema({ dict }: { dict: Dictionary }) {
  const { site } = dict;

  const [locality, region] = site.registeredOffice.split(",").map((s) => s.trim());

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    // Âncora estável: um dia uma página vai querer dizer "publisher desta
    // coisa é aquela organização" em vez de repetir o bloco inteiro.
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    alternateName: site.tradeName,
    description: site.description,
    url: site.url,
    email: site.email,
    foundingDate: site.foundedAt,
    taxID: site.cnpj,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "CNPJ",
      value: digits(site.cnpj),
    },
    // A sede do registro, não a base do time: é este endereço que consta no
    // documento contra o qual a Meta compara a página.
    address: {
      "@type": "PostalAddress",
      addressLocality: locality,
      addressRegion: region,
      addressCountry: "BR",
    },
  };

  return (
    <script
      type="application/ld+json"
      // `JSON.stringify` não escapa `<`, e um "</script>" dentro de uma string
      // fecharia a tag no meio do JSON. Nada em `dict.site` tem `<` hoje, mas
      // o bloco é montado a partir de conteúdo editável — escapar para a forma
      // unicode é válido em JSON e tira a categoria de bug do caminho.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
