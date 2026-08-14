import type { Legal } from "@/content/types";

/* ============================================================================
 *  DOCUMENTOS JURÍDICOS — pt-BR
 * ----------------------------------------------------------------------------
 *  Escritos para o caso concreto do Zenda, e não a partir de um modelo:
 *
 *  · dado de saúde é sensível (LGPD art. 5º II) e a base legal é a do art. 11
 *    II "f" — tutela da saúde —, não consentimento;
 *  · quem decide a finalidade é o médico ou a clínica, então ele é o
 *    CONTROLADOR e nós somos OPERADORES (art. 5º VI e VII);
 *  · a Meta é suboperadora para o conteúdo que trafega, e controladora
 *    independente dos metadados de entrega dela.
 *
 *  Cada afirmação aqui tem contrapartida técnica no produto. Uma política que
 *  promete o que o sistema não faz é pior que não ter política — vira prova
 *  contra quem a publicou.
 * ========================================================================= */

const UPDATED = "2026-08-14";

export const legalPtBR: Legal = {
  label: "Legal",
  updatedLabel: "Última atualização",
  tocLabel: "Nesta página",

  privacy: {
    slug: "privacy",
    title: "Política de Privacidade",
    updatedAt: UPDATED,
    lede: "Como a Waterfall trata dados pessoais no Zenda — inclusive dados de saúde, que exigem cuidado maior e regra própria.",
    sections: [
      {
        id: "quem-somos",
        heading: "Quem somos",
        body: [
          "A Waterfall é uma consultoria de tecnologia brasileira, inscrita no CNPJ 42.804.319/0001-10, e desenvolvedora do **Zenda** — plataforma de atendimento a pacientes por WhatsApp usada por profissionais que administram a agenda de médicos e clínicas.",
          "Esta política vale para o site waterfalltech.xyz, para a página do produto em zenda.waterfalltech.xyz e para o uso do Zenda.",
        ],
      },
      {
        id: "papeis",
        heading: "Quem é responsável por quais dados",
        body: [
          "Esta é a parte mais importante do documento, e a que define a quem você deve dirigir um pedido.",
          "**O médico ou a clínica é o controlador** dos dados dos pacientes dele (LGPD art. 5º VI). É ele quem decide para que os dados são usados, quem coleta o telefone do paciente e quem define por quanto tempo guardar.",
          "**A Waterfall é operadora** (art. 5º VII). Tratamos dados de paciente exclusivamente para prestar o serviço, sob instrução do controlador, e nunca para finalidade própria. Não vendemos dados, não os usamos para publicidade e não treinamos modelos de inteligência artificial com conteúdo de mensagem de paciente.",
          "**A pessoa que usa o Zenda** — a atendente ou secretária — trata os dados em nome do controlador. O sigilo profissional alcança auxiliares (Res. CFM 2.217/2018, art. 73).",
          "Consequência prática: **um paciente que queira acessar ou apagar seus dados deve procurar o médico ou a clínica**, não a Waterfall. Se o pedido chegar a nós, encaminhamos ao controlador — não podemos decidir sobre dado que não é nosso.",
        ],
      },
      {
        id: "dados",
        heading: "Que dados são tratados",
        body: [
          "**De quem usa o Zenda:** nome, e-mail, senha (guardada apenas como hash, nunca em texto), e registros de acesso.",
          "**Dos clientes da conta:** nome do médico ou da clínica, especialidade, CRM, telefone de contato, e os dados comerciais que a própria pessoa anota — valor combinado e dia de cobrança.",
          "**Dos pacientes:** número de WhatsApp, nome de exibição, conteúdo das mensagens trocadas, datas e horários de consulta e o que a atendente registrar na ficha — procedimentos realizados, intervalo de retorno e anotações.",
        ],
        list: [
          "Conteúdo de mensagem e anotação de ficha são tratados como **dado sensível de saúde** (art. 5º II).",
          "Não coletamos dado de pagamento de paciente. O Zenda não processa pagamentos.",
          "Não usamos cookies de publicidade nem rastreadores de terceiros no site.",
        ],
      },
      {
        id: "base-legal",
        heading: "Com que base legal",
        body: [
          "Para dado de saúde, a base é a **tutela da saúde, em procedimento realizado por profissionais de saúde e serviços de saúde** (art. 11, II, “f”) — não consentimento. Isso é deliberado: consentimento pode ser revogado a qualquer momento, e um prontuário que some no meio de um tratamento é risco para o próprio paciente.",
          "Para dados de quem usa a plataforma e para dados cadastrais dos clientes, a base é a **execução de contrato** (art. 7º, V).",
          "Para segurança, prevenção a fraude e registros de acesso, a base é o **legítimo interesse** (art. 7º, IX), com avaliação de impacto documentada.",
        ],
      },
      {
        id: "saude",
        heading: "O cuidado específico com dado de saúde",
        body: [
          "Estas não são intenções: são características verificáveis do sistema.",
        ],
        list: [
          "**Conteúdo de mensagem nunca entra em log, monitoramento ou relatório de erro.** O filtro de telemetria funciona por lista de permissão — um campo novo só sai se for explicitamente liberado — e há teste automatizado que falha se algo vazar.",
          "**A ficha do paciente é separada por cliente.** A mesma pessoa atendida por dois médicos tem duas fichas independentes, e a anotação feita para um nunca aparece na tela do outro.",
          "**Não há cruzamento de dados de saúde entre clientes**, nem para estatística interna (art. 11, §4º).",
          "**Isolamento no banco de dados.** Cada conta só enxerga as próprias linhas, imposto pelo próprio banco e não apenas pela aplicação, com escopo adicional por médico.",
          "**Acesso de leitura a conversa é registrado** — quem abriu, quando e de onde. Acesso indevido de leitura é o incidente típico nesse tipo de sistema, e sem registro ele não deixa rastro.",
          "**Mensagens automáticas não contêm especialidade, procedimento ou diagnóstico**, porque trafegam pela infraestrutura da Meta. Há validação que bloqueia o envio se isso for tentado.",
        ],
      },
      {
        id: "meta",
        heading: "A Meta e o WhatsApp",
        body: [
          "O Zenda usa exclusivamente a **API oficial do WhatsApp Business (Cloud API)**, da Meta. Não usamos bibliotecas não oficiais: além de violarem os termos da Meta, elas expõem o número do consultório a banimento.",
          "A **Meta Platforms** é suboperadora quanto ao conteúdo das mensagens, que necessariamente passa pela infraestrutura dela para chegar ao paciente. Quanto aos metadados de entrega que a Meta gera e mantém por conta própria — status de entrega, número de telefone, sinais de qualidade —, a Meta atua como controladora independente, sob os termos dela.",
          "A conta de faturamento do WhatsApp pertence ao próprio médico ou clínica. A Waterfall não tem acesso aos dados de pagamento dessa conta.",
        ],
      },
      {
        id: "suboperadores",
        heading: "Com quem compartilhamos",
        body: [
          "Só com quem é necessário para o serviço funcionar, e sempre sob contrato de tratamento:",
        ],
        list: [
          "**Meta Platforms** — envio e recebimento de mensagens de WhatsApp.",
          "**Amazon Web Services** — hospedagem. A infraestrutura fica na região de São Paulo (sa-east-1); dados em repouso são cifrados.",
          "**Ferramenta de monitoramento de erros** — recebe apenas identificadores técnicos e rastreamento de falha, com conteúdo de mensagem descartado antes do envio.",
          "Autoridades, quando houver obrigação legal ou ordem judicial.",
        ],
      },
      {
        id: "internacional",
        heading: "Transferência internacional",
        body: [
          "Parte dos suboperadores acima opera fora do Brasil. Nesses casos a transferência se apoia em cláusulas contratuais padrão, nos moldes da Resolução CD/ANPD nº 19/2024.",
          "A hospedagem dos dados do produto fica no Brasil. O que sai são as mensagens — que precisam sair, porque é assim que o WhatsApp funciona — e dados técnicos de monitoramento.",
        ],
      },
      {
        id: "retencao",
        heading: "Por quanto tempo guardamos",
        body: [
          "O prazo é definido pelo controlador, dentro dos limites da lei e da regulamentação profissional. Na ausência de instrução específica:",
        ],
        list: [
          "**Conversas e fichas:** enquanto durar a relação entre o profissional e o paciente, observado o prazo de guarda de prontuário aplicável.",
          "**Registros de acesso e auditoria:** conforme a exigência legal aplicável a cada tipo de registro.",
          "**Dados de cadastro de quem usa a plataforma:** até 90 dias após o encerramento da conta.",
          "**Quando um cliente é encerrado**, os dados daquele médico ou clínica podem ser exportados e depois eliminados a pedido do controlador.",
        ],
      },
      {
        id: "direitos",
        heading: "Direitos do titular",
        body: [
          "A LGPD (art. 18) garante confirmação de tratamento, acesso, correção, anonimização, portabilidade, informação sobre compartilhamento e eliminação.",
          "**Se você é paciente:** procure o médico ou a clínica que te atende. É ele o controlador dos seus dados. Se escrever para nós, encaminharemos e avisaremos você de para quem foi.",
          "**Se você usa o Zenda ou é cliente da Waterfall:** escreva para hello@waterfalltech.xyz. Respondemos dentro do prazo legal, sem custo.",
        ],
      },
      {
        id: "seguranca",
        heading: "Segurança e incidentes",
        body: [
          "Cifragem em trânsito e em repouso, autenticação com segundo fator, acesso por menor privilégio e registro de acesso a dado sensível.",
          "Se houver incidente de segurança com risco relevante, comunicamos o controlador em até 24 horas do conhecimento, para que ele cumpra o dever de comunicar a ANPD e os titulares (art. 48).",
        ],
      },
      {
        id: "alteracoes",
        heading: "Alterações",
        body: [
          "Mudanças materiais são comunicadas por e-mail a quem tem conta ativa, com antecedência mínima de 30 dias. A data no topo desta página é sempre a da versão vigente.",
        ],
      },
      {
        id: "contato",
        heading: "Contato",
        body: [
          "Waterfall — CNPJ 42.804.319/0001-10 — Rio de Janeiro, Brasil.",
          "Encarregado pelo tratamento de dados pessoais: hello@waterfalltech.xyz",
        ],
      },
    ],
  },

  terms: {
    slug: "terms",
    title: "Termos de Uso",
    updatedAt: UPDATED,
    lede: "As regras de uso do Zenda. Vale a pena ler a seção sobre o WhatsApp — ela envolve regras da Meta que não são nossas e que, se descumpridas, custam o número do seu cliente.",
    sections: [
      {
        id: "aceite",
        heading: "Aceite",
        body: [
          "Ao criar uma conta ou usar o Zenda, você concorda com estes termos. Se estiver aceitando em nome de uma empresa, declara ter poderes para isso.",
          "O Zenda é operado pela Waterfall, CNPJ 42.804.319/0001-10.",
        ],
      },
      {
        id: "servico",
        heading: "O que o Zenda é",
        body: [
          "Uma plataforma para atender pacientes por WhatsApp em nome de médicos e clínicas, organizar essas conversas num só lugar e registrar informações de acompanhamento — procedimentos realizados e data de retorno.",
          "**O que o Zenda não é:** não é prontuário eletrônico, não emite documento médico, não presta serviço de saúde e não substitui julgamento clínico. Também não emite nota fiscal, boleto nem processa pagamento entre você e seus clientes — o controle de cobrança é apenas um lembrete para você.",
        ],
      },
      {
        id: "conta",
        heading: "Sua conta",
        body: [
          "Você é responsável pelas credenciais e pelo que é feito com elas. Avise imediatamente se suspeitar de acesso indevido.",
          "É necessário ter 18 anos ou mais e capacidade civil.",
          "Ao conectar o WhatsApp de um cliente, você declara ter autorização dele para atender os pacientes dele em seu nome.",
        ],
      },
      {
        id: "whatsapp",
        heading: "Regras do WhatsApp que não são nossas",
        body: [
          "O Zenda funciona sobre a Plataforma WhatsApp Business, da Meta. Algumas regras vêm dela e nós não podemos flexibilizá-las:",
        ],
        list: [
          "**A conta de cobrança do WhatsApp pertence ao dono do número** — o médico ou a clínica. A Meta cobra as mensagens diretamente dele. Sem forma de pagamento válida, o número conecta e não envia.",
          "**Fora da janela de 24 horas** desde a última mensagem do paciente, só é possível enviar modelos de mensagem previamente aprovados pela Meta.",
          "**Envio em massa não solicitado leva a bloqueio.** A qualidade do número é avaliada pela Meta, e bloqueios de pacientes derrubam o limite de envio — em casos graves, o número é suspenso.",
          "**O número continua sendo do seu cliente.** Se a relação de vocês terminar, ele sai com o número.",
          "Regras de conteúdo e políticas comerciais da Meta se aplicam integralmente e podem mudar sem aviso nosso.",
        ],
      },
      {
        id: "uso-aceitavel",
        heading: "Uso aceitável",
        body: ["É proibido usar o Zenda para:"],
        list: [
          "Enviar mensagem a quem não pediu contato nem tem relação com o profissional atendido.",
          "Divulgar diagnóstico, procedimento ou qualquer informação de saúde a quem não seja o próprio paciente.",
          "Contornar limites técnicos, testar segurança sem autorização escrita ou acessar dado de outra conta.",
          "Qualquer finalidade ilícita, ou que viole o Código de Ética Médica e as resoluções do CFM.",
          "Revender o acesso à plataforma como se fosse produto próprio.",
        ],
      },
      {
        id: "dados",
        heading: "Dados e privacidade",
        body: [
          "O tratamento de dados pessoais é regido pela nossa Política de Privacidade. Em resumo: o médico ou a clínica é o controlador, e a Waterfall é operadora.",
          "Você se compromete a ter, com cada cliente, a base legal necessária para que possamos tratar os dados dos pacientes dele — e a manter sigilo profissional sobre tudo que acessar.",
          "Você pode exportar os dados da sua conta a qualquer momento.",
        ],
      },
      {
        id: "disponibilidade",
        heading: "Disponibilidade",
        body: [
          "O Zenda está em **beta privado**. Isso significa: funcionalidades podem mudar, instabilidade pode acontecer, e não há garantia formal de disponibilidade neste estágio.",
          "Dependemos de serviços de terceiros — a Meta, principalmente. Interrupção do lado deles interrompe o nosso, e não temos controle sobre isso.",
          "Avisamos com antecedência razoável antes de descontinuar funcionalidade relevante.",
        ],
      },
      {
        id: "responsabilidade",
        heading: "Limitação de responsabilidade",
        body: [
          "O serviço é fornecido no estado em que se encontra. Não respondemos por perda de receita, oportunidade ou dado decorrente de uso indevido, de falha de terceiro ou de caso fortuito.",
          "Nada aqui exclui responsabilidade que a lei não permita excluir — inclusive as decorrentes do Código de Defesa do Consumidor e da LGPD, quando aplicáveis.",
          "**Você continua responsável pelo atendimento que presta.** O Zenda é ferramenta; a relação com o paciente é sua e do profissional que você atende.",
        ],
      },
      {
        id: "encerramento",
        heading: "Encerramento",
        body: [
          "Você pode encerrar sua conta quando quiser. Podemos suspender ou encerrar contas que violem estes termos, com aviso prévio sempre que possível — e sem aviso quando houver risco imediato a terceiros ou determinação legal.",
          "Encerrada a conta, você tem 30 dias para exportar seus dados antes da eliminação.",
        ],
      },
      {
        id: "geral",
        heading: "Disposições gerais",
        body: [
          "Alterações materiais nestes termos são comunicadas com 30 dias de antecedência a quem tem conta ativa.",
          "Estes termos são regidos pelas leis brasileiras. Fica eleito o foro da comarca do Rio de Janeiro, salvo quando a lei garantir ao consumidor o foro do seu domicílio.",
          "Dúvidas: hello@waterfalltech.xyz",
        ],
      },
    ],
  },
};
