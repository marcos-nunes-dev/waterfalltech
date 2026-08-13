/* ============================================================================
 *  WATERFALL — CONTEÚDO DO SITE EM PORTUGUÊS DO BRASIL
 * ----------------------------------------------------------------------------
 *  ⚠️  ESTE ARQUIVO PRECISA SER ESTRUTURALMENTE IDÊNTICO A `content/en.ts`.
 *
 *  Mesmas chaves, mesma ordem, mesmo aninhamento, mesma quantidade de itens em
 *  cada array. Só o texto muda. Se você adicionar uma seção, um cliente, uma
 *  capacidade ou um projeto em `en.ts`, adicione o par aqui na mesma posição —
 *  o build quebra se as duas traduções divergirem de forma.
 *
 *  NÃO traduza: `id`, `slug`, `href`, `status` de produto ("live" | "beta" |
 *  "building"), nomes de tecnologia em `stack`, nomes de clientes, `site.name`,
 *  `site.email`, `site.domain` e os valores numéricos de `stats`/`outcomes`.
 *
 *  ⚠️  TUDO MARCADO COM `PLACEHOLDER` É INVENTADO. SUBSTITUA (nos dois idiomas).
 * ========================================================================= */

import type { Dictionary } from "./types";

/** Um lugar só para o endereço, usado no `site` e no CTA de contato. */
const EMAIL = "hello@waterfalltech.xyz";

export const ptBR: Dictionary = {
  /* ------------------------------------------------------------------------ */
  /*  SITE                                                                    */
  /* ------------------------------------------------------------------------ */
  site: {
    name: "Waterfall",
    domain: "waterfalltech.xyz",
    /** Usado em URLs canônicas + OpenGraph. Precisa bater com `domain`. */
    url: "https://waterfalltech.xyz",
    /** PLACEHOLDER — confirme que essa caixa existe e é lida. */
    email: EMAIL,
    /** Aparece na nav + hero. Máximo ~9 palavras. */
    tagline: "Parceiro de engenharia para empresas que entregam",
    description:
      "A Waterfall é uma consultoria de tecnologia. Alocamos engenheiros sêniores dentro de times de produto nos EUA e na Europa — e construímos nossos próprios produtos.",
    /** PLACEHOLDER — onde vocês ficam de fato, e os fusos que vocês cobrem. */
    base: "Rio de Janeiro, Brasil",
    coverage: "UTC−3 · horários sobrepostos com EUA e Europa",
    founded: 2021,
    socials: [
      /** PLACEHOLDER — apague as que vocês não têm. */
      { label: "LinkedIn", href: "https://linkedin.com/company/waterfall" },
      { label: "GitHub", href: "https://github.com/waterfall" },
      { label: "X", href: "https://x.com/waterfall" },
    ],
  },

  /* ------------------------------------------------------------------------ */
  /*  NAVEGAÇÃO — uma palavra por item.                                       */
  /* ------------------------------------------------------------------------ */
  nav: [
    { label: "Projetos", href: "#work" },
    { label: "Produtos", href: "#products" },
    { label: "Estúdio", href: "#studio" },
    { label: "Processo", href: "#process" },
  ],

  /**
   * A espinha da página. Os `id` são identificadores — nunca traduza. A ordem
   * aqui é a ordem na página e precisa ser a mesma de `en.ts`.
   */
  sections: [
    {
      id: "clients",
      kicker: "Clientes",
      headline: { before: "Empresas que", accent: "já", after: "tinham engenheiros" },
      lede: "Não precisavam de mais headcount. Precisavam do problema específico resolvido, por quem já tinha resolvido antes.",
    },
    {
      id: "studio",
      kicker: "Estúdio",
      headline: { before: "Um time pequeno por", accent: "escolha", after: "" },
      lede: "",
    },
    {
      id: "capabilities",
      kicker: "Competências",
      headline: { before: "No que somos", accent: "realmente", after: "bons" },
      lede: "Cinco coisas, bem feitas. Fora dessa lista, dizemos com franqueza que não somos a melhor opção.",
    },
    {
      id: "work",
      kicker: "Projetos selecionados",
      headline: { before: "Sistemas que", accent: "entregamos", after: "" },
      lede: "Alguns clientes podemos citar, outros não. Os problemas são reais de qualquer jeito.",
    },
    {
      id: "products",
      kicker: "Produtos",
      headline: { before: "Também construímos para", accent: "nós", after: "" },
      lede: "Consultoria que nunca entrega produto próprio perde o instinto. Por isso entregamos.",
    },
    {
      id: "process",
      kicker: "Como trabalhamos",
      headline: { before: "Quatro etapas, em", accent: "cascata", after: "" },
      lede: "Sem fase de discovery que cobra três meses e entrega um deck.",
    },
    {
      id: "contact",
      kicker: "Contato",
      headline: { before: "Conta pra gente o que", accent: "travou", after: "" },
      lede: "Um e-mail, uma resposta real de um engenheiro em até dois dias úteis. Se não formos a escolha certa, dizemos isso e indicamos alguém melhor.",
    },
  ],

  /* ------------------------------------------------------------------------ */
  /*  HERO                                                                    */
  /* ------------------------------------------------------------------------ */
  hero: {
    /** A palavra em destaque sai em serifada itálica. Mantenha UMA palavra. */
    headline: { before: "Engenharia que rende", accent: "juros", after: "" },
    lede: "Alocamos engenheiros sêniores dentro de times de produto nos EUA e na Europa. Menos gente, mais longe — e os sistemas continuam de pé depois que saímos.",
    primaryCta: { label: "Começar um projeto", href: "#contact" },
    secondaryCta: { label: "Ver projetos", href: "#work" },
    status: {
      /** Coloque false quando a agenda estiver cheia — o ponto e o texto mudam. */
      available: true,
      availableLabel: "Aceitando novos projetos — Q3",
      bookedLabel: "Agenda cheia até Q3 — entre na lista",
    },
  },

  /* ------------------------------------------------------------------------ */
  /*  NÚMEROS — faixa de ledger. Mantenha 4. Números precisam ser defensáveis. */
  /* ------------------------------------------------------------------------ */
  /*
   *  O primeiro número é real — conta o array `clients`. Mantenha os dois em dia.
   *  ⚠️  Os dois do meio são DEMO: torne-os defensáveis ou corte.
   */
  stats: [
    { value: "8", suffix: "", label: "Empresas atendidas" },
    { value: "3", suffix: "", label: "Países" },
    { value: "11", suffix: "anos", label: "Experiência mediana do time" },
    { value: "1", suffix: "", label: "Produto próprio" },
  ],

  /* ------------------------------------------------------------------------ */
  /*  CLIENTES — ledger editorial, não parede de logos.                       */
  /*  Nomes de empresa NÃO se traduzem. `href` só onde dá para linkar.        */
  /* ------------------------------------------------------------------------ */
  /*
   *  CLIENTES REAIS. `name`, `sector`, `region` e `href` estão corretos.
   *
   *  ⚠️  `engagement` e `since` são DEMO em todas as linhas — plausíveis, não
   *  verdadeiros. Troque pelo escopo real e pelo ano de início antes de publicar,
   *  e espelhe a mesma edição em content/en.ts.
   */
  clients: [
    { name: "Hoag", sector: "Rede de saúde", engagement: "Plataforma do paciente", region: "Estados Unidos", since: "2023", href: "https://www.hoag.org/" },
    { name: "Learned Hand", sector: "Legal tech", engagement: "Engenharia de produto com IA", region: "Estados Unidos", since: "2024", href: "https://www.learned-hand.ai/" },
    { name: "Perch Insights", sector: "Revenue operations", engagement: "Plataforma de analytics", region: "Estados Unidos", since: "2024", href: "https://www.perchinsights.com/" },
    { name: "SanarFlix", sector: "Educação médica", engagement: "Plataforma em escala", region: "Brasil", since: "2022", href: "https://sanarflix.com.br/" },
    { name: "Veteran Benefits Guide", sector: "Serviços a veteranos", engagement: "Fluxo de solicitações", region: "Estados Unidos", since: "2023", href: "https://vbg.com/" },
    { name: "Alokai", sector: "People intelligence", engagement: "Engenharia de produto", region: "Europa", since: "2025", href: "https://alokai.ai/" },
    { name: "Flowerplot", sector: "Analytics de marketing", engagement: "Engenharia de produto", region: "Estados Unidos", since: "2025", href: "https://www.flowerplot.com/" },
    { name: "Berimbau", sector: "Restaurantes", engagement: "Site e pedidos", region: "Estados Unidos", since: "2024", href: "https://www.berimbaunyc.com/" },
  ],

  /* ------------------------------------------------------------------------ */
  /*  COMPETÊNCIAS — o detalhe abre no hover. Divulgação progressiva.         */
  /*  Os `id` são identificadores: iguais aos de `en.ts`.                     */
  /* ------------------------------------------------------------------------ */
  capabilities: [
    {
      id: "product-engineering",
      title: "Engenharia de produto",
      summary: "Engenheiros sêniores dentro do seu time, entregando desde a primeira semana.",
      detail:
        "Não entregamos um deck de discovery. Entramos no seu standup, puxamos tickets do seu board e abrimos pull requests no seu repo. A maioria dos projetos são dois a quatro engenheiros rodando como um pod autossuficiente dentro do seu time de produto.",
      bullets: ["Entrega full-stack", "Seu repo, seu processo", "Pods de 2–4 engenheiros", "Async, fusos sobrepostos"],
    },
    {
      id: "platform",
      title: "Plataforma e infraestrutura",
      summary: "Deixar o deploy entediante e a conta menor.",
      detail:
        "Pipelines de build que terminam, ambientes que se reproduzem e infraestrutura que seu time consegue entender às 3 da manhã. Herdamos sistemas na mesma frequência com que projetamos, e deixamos documentação que sobrevive ao projeto.",
      bullets: ["CI/CD abaixo de 10 min", "IaC e paridade de ambientes", "Observabilidade que se lê", "Corte de custo"],
    },
    {
      id: "ai",
      title: "Sistemas de IA",
      summary: "Features de LLM que sobrevivem ao contato com usuários reais.",
      detail:
        "Retrieval, eval, guardrails e controle de custo — as partes sem glamour que decidem se uma feature de IA vai ao ar ou volta atrás em silêncio. Instrumentamos antes de otimizar e medimos contra os seus dados, não contra um conjunto de demo.",
      bullets: ["Retrieval e desenho de contexto", "Evals e testes de regressão", "Orçamento de latência e custo", "Fluxos com humano no loop"],
    },
    {
      id: "rescue",
      title: "Resgate e modernização",
      summary: "Herdar o código que ninguém quer tocar.",
      detail:
        "Um release train congelado, um framework três majors atrás, o serviço que só uma pessoa entende. Mapeamos, estabilizamos e migramos em fatias que continuam entregando — sem reescrita de dezoito meses com virada big-bang no fim.",
      bullets: ["Migração strangler incremental", "Cobertura de testes do zero", "Upgrades de dependência e framework", "Conhecimento transferido por escrito"],
    },
    {
      id: "fractional",
      title: "Liderança fracionada",
      summary: "Direção técnica sem contratar em tempo integral.",
      detail:
        "Revisão de arquitetura, calibração de contratação, sequenciamento de roadmap e a decisão difícil entre construir e comprar. Para times que já têm engenheiros, mas ainda não têm quem decide como eles trabalham.",
      bullets: ["Revisão de arquitetura", "Loops de contratação e calibração", "Sequenciamento do roadmap", "Decisões de build ou buy"],
    },
  ],

  /* ------------------------------------------------------------------------ */
  /*  PROJETOS SELECIONADOS                                                   */
  /* ------------------------------------------------------------------------ */
  /*
   *  TRABALHOS SELECIONADOS — quatro dos projetos acima, detalhados.
   *
   *  `client`, `title`, `href` e todos os números de `outcomes` são REAIS.
   *
   *  ⚠️  Ainda falta corrigir: `stack` é um palpite a partir do que o produto
   *  mostra publicamente, não o que o time de fato usou, e `year` também é
   *  chute. Corrija os dois antes de publicar.
   *
   *  Vale também pedir o OK explícito de cada cliente para citar o nome e os
   *  números. Onde não der, marque `confidential: true` e tire o `href` — isso
   *  passa a exibir "Case sob NDA" no lugar do link.
   *  Espelhe cada edição em content/en.ts.
   */
  work: [
    {
      id: "learned-hand",
      client: "Learned Hand",
      title: "Uma plataforma de preparo de casos com IA em que um juiz confia",
      summary:
        "Extração de fatos, mapeamento de questões e análise de petições sobre autos — onde toda afirmação gerada precisa voltar a uma citação verificável no documento original, porque quem lê é um juiz. Hoje roda em mais de 300 gabinetes, e a empresa foi adquirida por causa disso.",
      outcomes: [
        { value: "300+", label: "juízes usando" },
        { value: "Adquirida", label: "desfecho da empresa" },
      ],
      stack: ["TypeScript", "Python", "Postgres", "Claude"],
      year: "2024",
      href: "https://www.learned-hand.ai/",
    },
    {
      id: "perch-insights",
      client: "Perch Insights",
      title: "Analytics em tempo real sobre toda a jornada do cliente",
      summary:
        "Dados de CRM, discador, marketing e billing unificados em um modelo só, com agentes vigiando anomalias e respondendo em linguagem natural em vez de esperar alguém montar um dashboard. Levantou uma rodada de três milhões de dólares depois do lançamento.",
      outcomes: [{ value: "US$ 3M", label: "captados após o lançamento" }],
      stack: ["TypeScript", "Python", "Snowflake", "React"],
      year: "2024",
      href: "https://www.perchinsights.com/",
    },
    {
      id: "sanarflix",
      client: "SanarFlix",
      title: "A maior plataforma de educação médica do Brasil, sob carga de prova",
      summary:
        "Duzentas mil questões, milhares de videoaulas e tutoria com IA para estudantes de medicina no Brasil — com tráfego que dispara perto das datas de residência e do ENAMED.",
      outcomes: [
        { value: "#1", label: "plataforma de educação médica do Brasil" },
        { value: "200 mil+", label: "questões" },
      ],
      stack: ["TypeScript", "React", "Node.js", "Postgres"],
      year: "2022",
      href: "https://sanarflix.com.br/",
    },
    {
      id: "hoag",
      client: "Hoag",
      title: "Experiência digital do paciente em uma rede de saúde regional",
      summary:
        "Navegação de cuidado por uma dúzia de institutos de especialidade, consultas virtuais e exames de imagem, para uma rede que atende mais de 450 mil pacientes por ano — o tipo de tela em que um botão ambíguo custa uma consulta de verdade para alguém.",
      outcomes: [{ value: "450 mil+", label: "pacientes por ano" }],
      stack: ["TypeScript", "React", "Node.js", "Azure"],
      year: "2023",
      href: "https://www.hoag.org/",
    },
  ],

  /* ------------------------------------------------------------------------ */
  /*  PROCESSO — a cascata literal. As etapas descem pela página.             */
  /* ------------------------------------------------------------------------ */
  process: [
    {
      title: "Ler o sistema",
      duration: "Semana 1",
      body: "Lemos o código, os incidentes e o backlog antes de escrever uma linha. Você recebe um mapa escrito do que existe e de onde dói — útil mesmo que nunca nos contrate.",
    },
    {
      title: "Entregar algo pequeno",
      duration: "Semana 2",
      body: "Uma mudança real em produção nas duas primeiras semanas. Isso prova o pipeline, os acessos e a relação de trabalho de uma vez só.",
    },
    {
      title: "Rodar como pod",
      duration: "Mês 1 →",
      body: "Dois a quatro engenheiros operando dentro do seu processo — seu board, seus code reviews, seu on-call se você quiser. Updates escritos toda semana, sem teatro de status.",
    },
    {
      title: "Devolver mais forte",
      duration: "Saída",
      body: "Documentação, runbooks e um time capaz de manter o que construímos. O projeto acaba; a alavancagem fica. Não nos incomoda ser substituíveis.",
    },
  ],

  /* ------------------------------------------------------------------------ */
  /*  PRODUTOS PRÓPRIOS — cada `slug` vira /products/<slug> e                 */
  /*  <slug>.<domain> via middleware. `slug` e `status` são identificadores.  */
  /* ------------------------------------------------------------------------ */
  products: [
    {
      slug: "zenda",
      name: "Zenda",
      kicker: "Nosso primeiro produto",
      tagline: "O WhatsApp de todas as clínicas em uma caixa só",
      description:
        "O Zenda é feito para quem cuida de agenda médica. Conecte o WhatsApp Business de cada clínica que você atende, trabalhe todas as conversas em uma tela só e mantenha a agenda e as confirmações de consulta ao lado do papo.",
      status: "beta",
      year: "2025",
    },
  ],

  /* ------------------------------------------------------------------------ */
  /*  ZENDA — conteúdo completo de zenda.<domain>                             */
  /*  ⚠️  TUDO PLACEHOLDER. Reescreva quando o posicionamento estiver de pé.  */
  /* ------------------------------------------------------------------------ */
  zenda: {
    name: "Zenda",
    // Curta de propósito: é tipografia display centralizada, e a frase inteira
    // ("O WhatsApp de todas as clínicas em um lugar") quebrava em quatro linhas
    // e jogava os CTAs para baixo da dobra. O "WhatsApp" aparece logo no lede.
    headline: { before: "Todas as clínicas em", accent: "uma", after: "tela" },
    lede: "O Zenda é onde trabalha quem cuida de agenda médica. Conecte o WhatsApp Business de cada clínica que você atende, responda tudo de uma tela só e marque, remarque e confirme consultas sem sair da conversa.",
    primaryCta: { label: "Pedir acesso", href: "#access" },
    secondaryCta: { label: "Como funciona", href: "#how" },
    status: { label: "Beta privado", detail: "Onboarding de um grupo pequeno de clínicas" },

    problem: {
      kicker: "O problema",
      headline: { before: "Uma pessoa, cinco celulares e uma", accent: "agenda", after: "que mais ninguém enxerga" },
      body: "Quem cuida da agenda de várias clínicas faz isso em várias contas de WhatsApp, quase sempre em aparelhos diferentes. As confirmações saem na mão, uma mensagem por vez. O paciente que escreveu ontem não tem histórico que outra pessoa consiga achar — e no dia em que essa pessoa folga, a agenda folga junto.",
    },

    features: [
      {
        id: "inbox",
        title: "Todos os números em uma caixa só",
        body: "Conecte a conta de WhatsApp Business de cada clínica que você atende. Toda conversa cai na mesma fila, marcada por clínica, em vez de em um celular diferente dentro de uma gaveta.",
      },
      {
        id: "calendar",
        title: "A agenda do lado da conversa",
        body: "Marque, remarque e cancele enquanto ainda está lendo o que o paciente escreveu. Sem trocar de sistema e digitar o nome de novo.",
      },
      {
        id: "confirmations",
        title: "Confirmação que roda sozinha",
        body: "Lembretes e pedidos de confirmação saem na hora certa, e as respostas atualizam a agenda. Confirmar um dia inteiro deixa de ser a manhã inteira de alguém.",
      },
      {
        id: "team",
        title: "Mais de uma pessoa no mesmo número",
        body: "Distribua conversas, deixe notas internas, passe um paciente adiante no meio do papo. Todo mundo vê o mesmo histórico, então ninguém precisa pedir para o paciente explicar tudo de novo.",
      },
    ],

    how: [
      { step: "Conectar", body: "Ligue o número de WhatsApp Business de cada clínica. Minutos por clínica, e nada muda para o paciente — ele continua escrevendo para o mesmo número de sempre." },
      { step: "Organizar", body: "As conversas chegam em uma caixa só, com a agenda do dia do lado. Distribua, marque por clínica, responda." },
      { step: "Confirmar", body: "Lembretes e pedidos de confirmação saem sozinhos. As respostas atualizam a agenda, e você vê num relance o que ainda está sem confirmar." },
    ],

    faq: [
      /** DEMO — confirme os detalhes de integração antes de publicar. */
      { q: "Usa a API oficial do WhatsApp Business?", a: "DEMO — troque pela resposta real. Precisa dizer exatamente como um número é conectado, se dá para migrar uma conta de WhatsApp Business que já existe e o que acontece com o histórico que já está naquele número." },
      /** DEMO — coloque um número real quando souber. */
      { q: "Quantas clínicas uma pessoa consegue tocar?", a: "DEMO — troque pela resposta real, de preferência com um número vindo do beta. Diga também se a cobrança é por clínica, por número ou por usuário." },
      { q: "O que acontece com os dados dos pacientes?", a: "DEMO — troque pela resposta real e seja específico sobre LGPD: onde os dados ficam, por quanto tempo as mensagens são guardadas, quem dentro da clínica pode ler e como os dados de um paciente são apagados quando ele pede. É essa pergunta que decide a venda para uma clínica." },
      { q: "Quem faz o Zenda?", a: "A Waterfall — a consultoria. O Zenda saiu de ver o mesmo problema em clínica atrás de clínica: agendar não é difícil, difícil é fazer isso em cinco contas de WhatsApp." },
    ],
  },

  /* ------------------------------------------------------------------------ */
  /*  CONTATO                                                                 */
  /* ------------------------------------------------------------------------ */
  contact: {
    headline: { before: "Conta pra gente o que", accent: "travou", after: "" },
    body: "Um e-mail, uma resposta real de um engenheiro em até dois dias úteis. Se não formos a escolha certa, dizemos isso e indicamos alguém melhor.",
    // Derivado de site.email para os dois não saírem de sincronia.
    cta: { label: "Escreva pra gente", href: `mailto:${EMAIL}` },
  },

  /* ------------------------------------------------------------------------ */
  /*  STUDIO — texto corrido da seção "quem somos"                            */
  /*  {name} e {base} são substituídos na renderização. Mantenha as chaves.   */
  /* ------------------------------------------------------------------------ */
  studio: {
    statement: {
      first:
        "A {name} é uma consultoria de tecnologia, e pequena de propósito. Pegamos poucos projetos por vez e colocamos em cada um engenheiros que já construíram aquilo que você está prestes a construir.",
      second: {
        // Frase montada para não depender de contração ("de" + "o Rio" = "do
        // Rio"). Assim {base} pode virar qualquer cidade sem quebrar a gramática.
        before:
          "Nossa base é {base} — perto o bastante do dia americano e cedo o bastante para o europeu. Todo mundo aqui já construiu sistemas e depois",
        emphasis: "ficou para mantê-los",
        after:
          ", que é a parte do trabalho que muda como você constrói o próximo.",
      },
    },
    ledger: { based: "Base", coverage: "Cobertura", founded: "Fundada em" },
    principles: [
      {
        title: "Senioridade em vez de headcount",
        body: "Colocar mais gente num projeto atrasado é o erro mais antigo do software e continua sendo cometido todo trimestre. Preferimos mandar três pessoas que já resolveram o seu problema a oito que vão aprender com o seu orçamento.",
      },
      {
        title: "Escreva",
        body: "Uma decisão que mora na cabeça de uma pessoa é uma decisão que seu time vai rediscutir em seis meses. Tudo que concluímos vira documento que seus engenheiros podem ler, contestar e reverter sem a gente na sala.",
      },
      {
        title: "Substituíveis de propósito",
        body: "O melhor resultado de um projeto é você parar de precisar dele. Planejamos a passagem de bastão já na primeira semana, o que nos custou uma renovação ou outra e nunca custou uma referência.",
      },
    ],
  },

  /* ------------------------------------------------------------------------ */
  /*  Vaga do próximo produto. Promova para `products` quando for real.       */
  /* ------------------------------------------------------------------------ */
  nextSlot: {
    title: "Próximo produto em andamento",
    clause:
      "Mesma origem do Zenda: algo de que precisávamos em projeto de cliente e não dava para comprar. Esse é sobre o que um time herda quando os engenheiros que construíram o sistema vão embora.",
  },

  /* ------------------------------------------------------------------------ */
  /*  CHROME DA INTERFACE — rótulos e strings de acessibilidade               */
  /* ------------------------------------------------------------------------ */
  ui: {
    skipToContent: "Pular para o conteúdo",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    primaryNav: "Principal",
    sectionNav: "Navegação por seções",
    footerNav: "Rodapé",
    languageSwitcher: "Mudar idioma",
    home: "{name} — início",
    menu: "{name} — menu",
    social: "Social",
    footerIndex: "Índice",
    footerProducts: "Produtos",
    confidential: "Confidencial",
    caseStudyUnderNda: "Case sob NDA",
    viewCaseStudy: "Ver o case",
    ndaNote:
      "Vários projetos estão cobertos por NDA e não aparecem aqui. Dá para conversar sobre o formato desse trabalho — o problema, a stack, o que mudou — sem citar a empresa.",
    productStatus: {
      live: "No ar",
      beta: "Beta privado",
      building: "Em desenvolvimento",
    },
    openProductPage: "Abrir a página do {name}",
    waterfallProduct: "Um produto Waterfall",
    faqHeading: "Perguntas",
    notFoundTitle: "Esta página não existe",
    notFoundBody:
      "O link pode estar desatualizado ou a página pode ter mudado de lugar. O resto está a um clique daqui.",
    backHome: "Voltar para o site",
  },
};
