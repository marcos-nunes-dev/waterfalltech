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
          "**Dos pacientes:** número de WhatsApp, nome de exibição, conteúdo das mensagens trocadas, datas e horários de consulta com o assunto que a atendente escrever nelas, e o que ela registrar na ficha: data de nascimento e anotações livres.",
        ],
        list: [
          "Conteúdo de mensagem e anotação de ficha são tratados como **dado sensível de saúde** (art. 5º II).",
          "Não coletamos dado de pagamento de paciente. O Zenda não processa pagamentos.",
          "Não usamos cookies de publicidade nem rastreadores de terceiros no site.",
        ],
      },
      {
        id: "cookies",
        heading: "Cookies e tecnologias semelhantes",
        body: [
          "O site usa **um único cookie**, chamado `waterfall_locale`, que guarda o idioma escolhido no seletor. Ele é estritamente funcional: sem ele, cada visita voltaria ao idioma detectado pelo navegador e ignoraria a sua escolha. Não identifica você e não é compartilhado com ninguém.",
          "**Não usamos cookies de publicidade, pixels de rastreamento, mapas de calor nem análise comportamental de terceiros.** É por isso que não há aviso de cookies neste site — não há nada a consentir.",
          "Dentro do Zenda, o token da sua sessão fica no armazenamento local do navegador, para manter você conectada. Sair da conta o apaga.",
        ],
      },
      {
        id: "base-legal",
        heading: "Com que base legal",
        body: [
          "Para dado de saúde, a base é a **tutela da saúde, em procedimento realizado por profissionais de saúde e serviços de saúde** (art. 11, II, “f”) — não consentimento. Isso é deliberado: consentimento pode ser revogado a qualquer momento, e um prontuário que some no meio de um tratamento é risco para o próprio paciente.",
          "Para dados de quem usa a plataforma e para dados cadastrais dos clientes, a base é a **execução de contrato** (art. 7º, V).",
          "Para segurança e prevenção a fraude, a base é o **legítimo interesse** (art. 7º, IX), com avaliação de impacto documentada.",
          "Para a guarda de registros de acesso à aplicação, a base é o **cumprimento de obrigação legal** (art. 7º, II): o Marco Civil da Internet (Lei 12.965/2014, art. 15) obriga o provedor de aplicação constituído como pessoa jurídica a manter esses registros por seis meses, sob sigilo e em ambiente controlado.",
        ],
      },
      {
        id: "criancas",
        heading: "Crianças e adolescentes",
        body: [
          "Pacientes menores de idade existem — pediatria, ortodontia e várias outras especialidades atendem crianças todos os dias. Isso muda o cuidado exigido, e por isso a seção é própria.",
          "O tratamento de dados de criança e adolescente é feito **sempre no seu melhor interesse** (LGPD art. 14). A base legal continua sendo a tutela da saúde (art. 11, II, “f”), exercida pelo profissional que atende — não um consentimento genérico coletado por nós.",
          "**Quem exerce os direitos do paciente menor é o pai, a mãe ou o responsável legal**, junto ao médico ou à clínica que o atende.",
          "O Zenda **não se destina a uso por menores de 18 anos**: nenhuma conta pode ser criada por menor. Também não coletamos dados de criança diretamente — o que chega a nós vem da conversa que o responsável ou o próprio profissional inicia.",
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
          "**Conversas e fichas:** enquanto durar a relação entre o profissional e o paciente. Se o controlador entender que algum registro integra o prontuário, aplica-se a regra do conselho profissional — a Resolução CFM 1.821/2007 estabelece guarda mínima de 20 anos a contar do último registro, e guarda permanente para o que estiver arquivado eletronicamente.",
          "**Registros de acesso à aplicação:** seis meses, por obrigação do Marco Civil da Internet (art. 15). Este prazo não é reduzível a pedido — é exigência legal, não escolha nossa.",
          "**Registros de auditoria** (quem abriu qual conversa, quando): cinco anos, para sustentar a prestação de contas do art. 37 da LGPD.",
          "**Dados de cadastro de quem usa a plataforma:** até 90 dias após o encerramento da conta.",
          "**Cópias de segurança:** o que é eliminado do sistema ativo pode permanecer em backup por até 30 dias adicionais, sem uso, até a rotação normal das cópias.",
        ],
      },
      {
        id: "direitos",
        heading: "Direitos do titular",
        body: [
          "A LGPD (art. 18) garante confirmação de tratamento, acesso, correção, anonimização, portabilidade, informação sobre compartilhamento e eliminação.",
          "**Se você é paciente:** procure o médico ou a clínica que te atende. É ele o controlador dos seus dados. Se escrever para nós, encaminharemos e avisaremos você de para quem foi.",
          "**Se você usa o Zenda ou é cliente da Waterfall:** escreva para hello@waterfalltech.xyz. Respondemos dentro do prazo legal, sem custo.",
          "**Você pode peticionar diretamente à ANPD** — Autoridade Nacional de Proteção de Dados — se entender que seus direitos não foram atendidos (art. 18, §1º). Não é preciso passar por nós antes.",
        ],
      },
      {
        id: "exclusao",
        heading: "Como pedir a exclusão dos seus dados",
        body: [
          "Esta seção é separada porque é a pergunta mais frequente — e porque a resposta muda conforme quem pergunta. Há uma página só com o passo a passo em **/legal/data-deletion**.",
          "**Se você é paciente:** o pedido vai para o médico ou a clínica que te atende, que é o controlador dos seus dados. Peça a ele por qualquer meio, inclusive pela própria conversa de WhatsApp. Ele executa a exclusão dentro do Zenda. Se escrever para nós por engano, encaminhamos ao controlador e avisamos você para quem foi.",
          "**Se você usa o Zenda:** peça pela própria conta ou escreva para hello@waterfalltech.xyz a partir do e-mail cadastrado. A conta e os dados associados são eliminados em até 15 dias.",
          "**Se você é médico ou clínica e quer sair:** quem administra a conta pode exportar tudo e pedir a eliminação. Executamos em até 30 dias.",
          "Em todos os casos a exclusão é **gratuita**. Sobrevive a ela apenas o que a lei obriga a guardar — os registros de acesso pelo prazo do Marco Civil e o mínimo para comprovar que o pedido foi cumprido.",
        ],
      },
      {
        id: "automatizado",
        heading: "Decisões automatizadas",
        body: [
          "O Zenda **não toma decisões automatizadas que afetem interesses do paciente**. Não há triagem por algoritmo, classificação de risco clínico nem priorização automática de atendimento.",
          "O que é automático é operacional e visível: o cálculo da data de retorno a partir do intervalo que o profissional definiu, e a ordenação de listas por quem espera há mais tempo. Toda mensagem enviada ao paciente parte de uma pessoa, ou de uma automação que o profissional configurou e pode desligar.",
          "Se isso mudar, esta seção muda antes — e o direito de revisão do art. 20 da LGPD será exercível junto ao controlador.",
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
          "**Encarregado pelo tratamento de dados pessoais** (LGPD art. 41): Marcos Nunes — hello@waterfalltech.xyz. É o canal para dúvidas sobre esta política e para o exercício de direitos por quem tem relação direta conosco.",
          "**Pacientes devem procurar o médico ou a clínica que os atende**, que é o controlador e nomeia o próprio encarregado.",
          "**Autoridade Nacional de Proteção de Dados (ANPD):** gov.br/anpd",
        ],
      },
    ],
  },

  deletion: {
    slug: "data-deletion",
    title: "Exclusão de Dados",
    updatedAt: UPDATED,
    lede: "Como pedir a exclusão de dados do Zenda, quem deve pedir, e em quanto tempo executamos. Página separada de propósito: quem chega aqui já sabe o que quer.",
    sections: [
      {
        id: "quem-pede",
        heading: "Primeiro: quem deve pedir a quem",
        body: [
          "A resposta muda conforme quem pergunta, e errar o destinatário só atrasa o pedido.",
          "**Paciente** → peça ao médico ou à clínica que te atende. Ele é o controlador dos seus dados: é ele quem decidiu coletá-los e é ele quem pode apagá-los. A Waterfall apenas opera o sistema em nome dele e não pode apagar dado de paciente por conta própria.",
          "**Quem usa o Zenda** (atendente, secretária) → peça a nós.",
          "**Médico ou clínica** que quer encerrar e levar embora os dados → peça a nós, pela pessoa que administra a conta.",
        ],
      },
      {
        id: "paciente",
        heading: "Se você é paciente",
        body: [
          "Fale com o consultório que te atende. Serve qualquer meio — inclusive responder na própria conversa de WhatsApp: “quero que meus dados sejam apagados”.",
          "O profissional executa a exclusão dentro do Zenda, e ela alcança as mensagens, a ficha e o histórico de atendimento daquele consultório.",
          "Se escrever para **hello@waterfalltech.xyz** por engano, nós encaminhamos ao controlador e avisamos você para quem foi. Não decidimos sobre dado que não é nosso — mas também não deixamos o pedido morrer.",
          "Se você não souber a quem se dirigir, ou se o consultório não responder, escreva para nós assim mesmo. Ajudamos a localizar o controlador.",
        ],
      },
      {
        id: "usuario",
        heading: "Se você usa o Zenda",
        body: [
          "Escreva para **hello@waterfalltech.xyz** a partir do e-mail cadastrado na conta — é assim que confirmamos que o pedido é seu.",
        ],
        list: [
          "Assunto: “Exclusão de dados”.",
          "Diga se quer apagar **a sua conta de usuário** ou **a operação inteira**, com os clientes e conversas dela.",
          "Confirmamos o recebimento em até 2 dias úteis.",
          "**Executamos em até 15 dias**, e confirmamos por escrito quando terminar.",
        ],
      },
      {
        id: "cliente",
        heading: "Se você é médico ou clínica",
        body: [
          "Você é o controlador dos dados dos seus pacientes. Pode pedir, a qualquer momento e sem custo:",
        ],
        list: [
          "**Exportação** de tudo que está no Zenda sobre o seu consultório — conversas, fichas, consultas — em formato legível por máquina.",
          "**Eliminação** desses dados, com prazo de execução de até 30 dias.",
          "**Exportação antes da eliminação**, que é o caminho normal quando a relação termina: você leva o histórico e nós apagamos a nossa cópia.",
          "O pedido pode vir de você ou da pessoa que administra sua conta no Zenda. Escreva para hello@waterfalltech.xyz.",
        ],
      },
      {
        id: "meta",
        heading: "Dados que estão com a Meta",
        body: [
          "As mensagens trafegam pelo WhatsApp, então parte dos dados fica na infraestrutura da Meta — e essa parte **não está sob nosso controle**. Apagar do Zenda não apaga do WhatsApp.",
          "Para dados que a Meta trata por conta própria, o pedido é com ela, pelos canais dela. Se você desconectar o número do Zenda, deixamos de receber e enviar por ele imediatamente, mas o que já passou pela Meta segue as regras dela.",
          "O aparelho do médico também guarda a própria cópia das conversas, no aplicativo WhatsApp Business. Essa cópia é dele, no aparelho dele, e se apaga por lá.",
        ],
      },
      {
        id: "excecoes",
        heading: "O que não é apagado, e por quê",
        body: [
          "A exclusão é ampla, mas não é absoluta — a própria LGPD (art. 16) preserva o que a lei obriga a guardar. Permanecem:",
        ],
        list: [
          "**Registros de acesso à aplicação**, por seis meses, conforme o Marco Civil da Internet (art. 15). É obrigação legal e não pode ser dispensada a pedido.",
          "**A prova de que o pedido foi cumprido** — data, tipo de pedido e confirmação —, sem o conteúdo apagado. É o que nos permite demonstrar que atendemos você.",
          "**Dados que o controlador seja obrigado a manter** por regra do conselho profissional, como o prazo de guarda de prontuário quando aplicável.",
          "**Cópias de segurança** podem conter o dado por até 30 dias adicionais, sem uso, até a rotação normal. Elas não são consultadas para nenhuma outra finalidade.",
        ],
      },
      {
        id: "contato",
        heading: "Contato",
        body: [
          "**hello@waterfalltech.xyz** — Waterfall, CNPJ 42.804.319/0001-10, Rio de Janeiro, Brasil.",
          "Encarregado pelo tratamento de dados pessoais: Marcos Nunes.",
          "Se preferir, você pode peticionar diretamente à **ANPD** (gov.br/anpd) — não é preciso passar por nós antes.",
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
          "Uma plataforma para atender pacientes por WhatsApp em nome de médicos e clínicas, organizar essas conversas num só lugar e cuidar da agenda de cada médico: disponibilidade, marcação de consulta e o assunto de cada uma.",
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
