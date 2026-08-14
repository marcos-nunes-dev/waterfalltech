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
    lede: "O Zenda é onde trabalha quem cuida da agenda de vários médicos. Conecte o WhatsApp Business de cada cliente, atenda todos os pacientes numa lista só — e saiba quem precisa voltar antes de o paciente sumir.",
    primaryCta: { label: "Pedir acesso", href: "#access" },
    secondaryCta: { label: "Ver por dentro", href: "#showcase" },
    status: { label: "Beta privado", detail: "Onboarding de um grupo pequeno de operações" },

    problem: {
      kicker: "O problema",
      headline: { before: "Cinco celulares, nenhuma", accent: "memória", after: "" },
      body: "Quem cuida da agenda de vários médicos faz isso em várias contas de WhatsApp, quase sempre em aparelhos diferentes. Pior que a troca de tela é o que não fica registrado: o paciente que veio em março e deveria voltar em setembro não volta, porque ninguém lembra — e ninguém lembra porque não existe onde anotar. Cada retorno perdido é dinheiro que o seu cliente não faz e serviço que você não pode cobrar.",
    },

    featuresHeader: {
      kicker: "O que ele faz",
      headline: { before: "Quatro coisas, e todas as quatro na mesma", accent: "tela", after: "" },
    },
    features: [
      {
        id: "inbox",
        title: "Todos os pacientes numa lista só",
        body: "Conecte a conta de WhatsApp Business de cada médico ou clínica que você atende. Toda conversa cai na mesma fila, com a etiqueta de quem é — porque responder em nome do médico errado é o único erro que não dá para desfazer. Quem está esperando há três horas aparece diferente de quem escreveu agora.",
      },
      {
        id: "patients",
        title: "Uma ficha que se preenche sozinha",
        body: "O paciente nasce da conversa: chegou uma mensagem, o número virou uma ficha. Você anota o que descobrir — prefere manhã, vem com a filha, alérgica a látex — e o histórico de consultas, procedimentos e conversas fica junto. A ficha é por cliente: o que você anota para um médico não aparece na tela do outro.",
      },
      {
        id: "returns",
        title: "Quem está para voltar",
        body: "Cada procedimento tem o intervalo de retorno do consultório, e cada paciente pode ter o dele. Registrou o atendimento, a data de volta já fica marcada. A lista abre por quem está mais vencido: “venceu há 7 meses”, “volta em 20 dias”. É a diferença entre esperar o paciente lembrar e ligar antes.",
      },
      {
        id: "clients",
        title: "Seus clientes, do seu lado",
        body: "Quanto você cobra de cada médico e em que dia vence. Se o WhatsApp de algum deles caiu ou está sem forma de pagamento na Meta — o caso silencioso em que o número conecta e não envia. E quantos pacientes cada um deu no mês, que é o número que sustenta a conversa sobre reajuste.",
      },
    ],

    showcase: {
      kicker: "Por dentro",
      headline: { before: "Não é maquete. É o", accent: "produto", after: "rodando" },
      lede: "As telas abaixo saem do Zenda em funcionamento, com dados de demonstração. Nenhum paciente real aparece aqui.",
      shots: [
        {
          id: "inbox",
          src: "/zenda/inbox.png",
          alt: "Caixa de conversas do Zenda com pacientes de várias clínicas na mesma lista, cada um com a etiqueta do cliente",
          title: "A caixa unificada",
          body: "Pacientes de todos os seus clientes na mesma fila. Cada linha diz de qual clínica a pessoa vem, há quanto tempo espera resposta e quanto falta da janela de 24 h do WhatsApp — depois dela, só um template aprovado reabre a conversa.",
        },
        {
          id: "clients",
          src: "/zenda/clientes.png",
          alt: "Tabela de clientes do Zenda com cobrança, estado da conexão e volume de pacientes por mês",
          title: "Seus clientes",
          body: "Ordenados por quem precisa de atenção primeiro: conexão caída, cartão faltando na conta da Meta, qualidade em queda, mensalidade em atraso. O que quebra sozinho aparece antes de o médico ligar reclamando.",
        },
        {
          id: "patients",
          src: "/zenda/pacientes.png",
          alt: "Lista de pacientes de uma clínica no Zenda, ordenada por data de retorno, com etiquetas de vencido e a vencer",
          title: "Quem está para voltar",
          body: "A lista de pacientes de cada cliente, aberta por quem está mais vencido. Não há cadastro a fazer: ela se preenche com quem já mandou mensagem para aquele número.",
        },
        {
          id: "record",
          src: "/zenda/ficha.png",
          alt: "Ficha de paciente do Zenda com intervalo de retorno, procedimentos registrados, anotações e histórico",
          title: "A ficha do paciente",
          body: "Intervalo de retorno, procedimentos já feitos, anotações que só a sua equipe vê e o histórico de consultas e conversas. As alterações salvam sozinhas — botão de salvar em anotação é o que se esquece de clicar.",
        },
      ],
    },

    howTitle: "Como funciona",
    how: [
      { step: "Conectar", body: "O médico autoriza pela conta Meta dele, e o número continua sendo dele. Nada muda para o paciente: mesmo número de sempre, e o WhatsApp Business no celular continua funcionando igual. Se ele autorizar, as conversas anteriores daquele número vêm junto." },
      { step: "Atender", body: "Todas as conversas numa lista, com etiqueta de cliente, tags do seu jeito de organizar e o aviso de quem está esperando há tempo demais. A ficha do paciente abre do lado, com o que já sabemos dele." },
      { step: "Trazer de volta", body: "Registre o que foi feito e a data de retorno fica marcada sozinha. Todo dia a lista mostra quem venceu e quem vence em breve — e o trabalho deixa de depender da memória de alguém." },
    ],

    faq: [
      {
        q: "Usa a API oficial do WhatsApp Business?",
        a: "Sim, exclusivamente a Cloud API oficial da Meta. Bibliotecas não oficiais são proibidas no nosso código — e não é preciosismo: elas violam os termos da Meta e o risco é o banimento do número do médico, que é o ativo mais crítico do consultório. Conectamos por Coexistence: o WhatsApp Business no celular dele continua funcionando normalmente, o número não muda e o paciente não percebe diferença. Se o médico autorizar no momento da conexão, as conversas anteriores daquele número vêm junto.",
      },
      {
        q: "Quem paga a Meta pelas mensagens?",
        a: "O dono do número — o médico ou a clínica —, no CNPJ dele. É regra da Meta para o nosso tipo de parceria, não escolha nossa: a conta de cobrança fica com quem é dono do número. Desde julho de 2026 a cobrança no Brasil é em reais, faturada pela Facebook Brasil. Na prática costuma ser pouco, e o médico vê o próprio gasto quando quiser. Se ele preferir não cadastrar cartão, dá para você ser administradora da conta dele e usar o seu, embutindo o custo na sua mensalidade — o número continua sendo dele, e ele te remove quando quiser.",
      },
      {
        q: "O que acontece com os dados dos pacientes?",
        a: "Ficam separados por cliente, não juntos num balaio. A ficha é por par (cliente, paciente): a mesma pessoa atendida por dois médicos tem duas fichas, e a anotação de um nunca aparece na tela do outro — cada médico é o controlador dos dados dos pacientes dele. Corpo de mensagem e anotação clínica não vão para log, monitoramento ou relatório de erro. Não fazemos nenhum cruzamento de dado de saúde entre clientes, nem para métrica interna. E quando você perde um cliente, os dados daquele médico saem: o mapa de dados vive num documento público do projeto, com base legal e prazo de retenção por tabela.",
      },
      {
        q: "Quantos clientes uma pessoa consegue tocar?",
        a: "O produto não impõe limite: a caixa é uma só e o filtro por cliente serve para focar, não para navegar. O limite real é o de mensagens da Meta, que é por conta de cada cliente — e como cada um tem a conta dele, o volume de um não come a cota do outro, nem a reputação de um derruba a entrega dos demais. Ainda não temos número do beta para prometer, e preferimos não inventar um.",
      },
      {
        q: "Já dá para usar?",
        a: "Estamos em beta privado, com um grupo pequeno de operações. A conexão de números novos depende da aprovação do nosso aplicativo pela Meta, que é um processo dela e não nosso — por isso o acesso sai por lista, e a gente conduz a primeira conexão junto com você, por telefone. Peça acesso e a gente diz onde está a fila.",
      },
      {
        q: "Quem faz o Zenda?",
        a: "A Waterfall — a consultoria. O Zenda saiu de ver o mesmo problema em clínica atrás de clínica: agendar não é difícil, difícil é fazer isso em cinco contas de WhatsApp e lembrar de quem tinha que voltar.",
      },
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
