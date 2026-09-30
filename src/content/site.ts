export const SITE_URL = "https://data.zentrabusiness.com.br";

export const firm = {
  name: "Zentra Business Data",
  shortName: "Zentra",
  legalName: "Zentra Business Hub Ltda.",
  cnpj: "69.351.287/0001-09",
  phoneDisplay: "(99) 9 9999-9999",
  phoneE164: "+5599999999999",
  whatsappNumber: "5599999999999",
  email: "contato@zentrabusiness.com.br",
} as const;

const whatsappMessage = "Olá, quero conhecer a Zentra para a minha operação.";

export const links = {
  whatsapp: `https://wa.me/${firm.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
  phone: `tel:${firm.phoneE164}`,
  email: `mailto:${firm.email}`,
  dpo: `mailto:${firm.email}?subject=${encodeURIComponent("Encarregado de dados")}`,
  privacy: "/privacidade",
  terms: "/termos",
  contact: "#contato",
} as const;

export const nav = [
  { label: "Soluções", href: "#solucoes" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Por que a Zentra", href: "#por-que" },
  { label: "Conformidade", href: "#conformidade" },
  { label: "Perguntas", href: "#perguntas" },
] as const;

export const cta = {
  primary: "Fale com a Zentra",
  href: links.contact,
  secondary: "Ver como funciona",
  secondaryHref: "#como-funciona",
} as const;

export const hero = {
  kicker: "// INTELIGÊNCIA DE DADOS PARA CRÉDITO CONSIGNADO",
  title: "Contato certo, base limpa, operação com prova.",
  highlight: "operação com prova",
  subtitle:
    "A Zentra localiza e qualifica os contatos da sua carteira, higieniza a base em lote e registra cada consulta com finalidade declarada. Sempre por contrato, dentro da LGPD.",
  badges: [
    "Acesso por contrato",
    "Finalidade em toda consulta",
    "Segundo fator por usuário",
    "Conformidade LGPD",
  ],
} as const;

export const lookupDemo = {
  ariaLabel: "Exemplo ilustrativo de uma consulta: nomes e números são de exemplo",
  header: "nova consulta · exemplo",
  purposeLine: "finalidade: recuperação de contato",
  blocks: [
    { title: "Telefones", count: 3, example: "(11) 9 ••••-4821 · atende primeiro" },
    { title: "E-mails", count: 2, example: "a•••••@gmail.com" },
    { title: "Endereço", count: 1, example: "São Paulo, SP · Vila Mariana" },
    { title: "Vínculos", count: 2, example: "empregador atual · desde 2021" },
    { title: "Renda e ocupação", count: 1, example: "renda presumida · faixa 3" },
    { title: "Score", count: 1, example: "faixa B · sem consignado ativo" },
  ],
  footer: "registrado às 09:41 · ana.souza",
} as const;

export const stats = {
  id: "numeros",
  items: [
    { value: 260, prefix: "+", suffix: " mi", label: "pessoas consultáveis em todo o Brasil" },
    { value: 60, prefix: "+", suffix: " mi", label: "empresas consultáveis" },
    { value: 10, prefix: "", suffix: "", label: "blocos de dados em uma consulta" },
    { value: 100, prefix: "", suffix: "%", label: "das consultas com finalidade registrada" },
  ],
} as const;

export const diagnosis = {
  id: "diagnostico",
  kicker: "// DIAGNÓSTICO",
  title: "Você se reconhece em alguma dessas situações?",
  items: [
    {
      title: "Telefone que não atende.",
      body: "A equipe liga o dia inteiro e fala com pouca gente. O contato existe, mas não está na ordem certa.",
    },
    {
      title: "Carteira parada no tempo.",
      body: "Clientes que mudaram de número, de endereço e de emprego. A base existe, mas não conversa mais com ninguém.",
    },
    {
      title: "Acionamento sem prova.",
      body: "Alguém pergunta de onde veio o dado e com que finalidade foi usado, e ninguém sabe responder.",
    },
  ],
  closing: "Nos três casos o problema é o mesmo: dado sem qualidade e sem registro. A Zentra resolve os dois.",
} as const;

export const solutions = {
  id: "solucoes",
  kicker: "// O QUE A ZENTRA ENTREGA",
  title: "Uma plataforma. Quatro frentes.",
  lead: "Tudo dentro do mesmo sistema, com o mesmo registro e o mesmo contrato.",
  items: [
    {
      color: "gold",
      title: "Consulta de contatos",
      points: [
        "Telefones na ordem de quem atende primeiro",
        "E-mails e endereços com qualificação",
        "Pessoas ligadas e vínculos de trabalho",
        "Renda presumida, ocupação e score",
      ],
    },
    {
      color: "blue",
      title: "Consulta em lote",
      points: [
        "A planilha da carteira inteira",
        "Previsão de término antes de começar",
        "Desfecho e motivo em cada linha",
        "A planilha de volta, pronta para discar",
      ],
    },
    {
      color: "green",
      title: "Empresas e processos",
      points: [
        "Situação cadastral, sócios e funcionários",
        "Processos judiciais com partes e movimentações",
        "Busca por nome, cidade, telefone ou placa",
        "Tudo com o mesmo registro",
      ],
    },
    {
      color: "purple",
      title: "Histórico e controle",
      points: [
        "Quem, quando, o quê e com que finalidade",
        "Consumo por usuário, mês a mês",
        "Segundo fator e desligamento imediato",
        "Resumo do ciclo para o gestor",
      ],
    },
  ],
} as const;

export const comparison = {
  id: "comparacao",
  kicker: "// O PROBLEMA",
  title: "Enquanto outros vendem lista, a Zentra entrega prova.",
  body: "Uma lista resolve a semana. Um sistema com registro resolve a operação, inclusive no dia em que alguém perguntar de onde veio o dado.",
  withoutLabel: "Mailing avulso",
  withLabel: "Com a Zentra",
  rows: [
    { without: "Telefones sem ordem", with: "Telefones na ordem de quem atende primeiro" },
    { without: "Base de meses atrás", with: "Dado renovado a cada consulta" },
    { without: "Planilha por e-mail, sem controle", with: "Consulta em lote com previsão e desfecho por linha" },
    { without: "Ninguém sabe quem usou", with: "Cada operação registrada: quem, quando e finalidade" },
    { without: "Login compartilhado", with: "Acesso individual com segundo fator" },
    { without: "Risco na fiscalização", with: "Política, base legal e encarregado publicados" },
  ],
} as const;

export const howItWorks = {
  id: "como-funciona",
  kicker: "// COMO FUNCIONA",
  title: "Do contrato ao registro, em quatro passos.",
  steps: [
    {
      title: "Contrato com a Zentra.",
      body: "Um plano mensal com franquia de consultas, compartilhada entre os usuários da equipe. Sem uso avulso, sem consulta anônima.",
    },
    {
      title: "Cada pessoa com o próprio acesso.",
      body: "Usuário individual, segundo fator por aplicativo e desligamento na hora quando alguém sai.",
    },
    {
      title: "Uma consulta ou a carteira inteira.",
      body: "Na tela, com finalidade declarada. Em lote, com previsão de término antes de começar e a planilha de volta.",
    },
    {
      title: "Tudo registrado.",
      body: "Cada operação deixa quem, quando e o quê. O histórico é seu, mês a mês.",
    },
  ],
} as const;

export const purposes = {
  id: "finalidade",
  kicker: "// FINALIDADE",
  title: "Toda consulta começa com uma finalidade.",
  lead: "Escolha uma e veja o que fica registrado e o que volta para a equipe.",
  panelLabel: "Exemplo ilustrativo: nomes e números são de exemplo.",
  recordedLabel: "O que fica registrado",
  returnedLabel: "O que volta",
  options: [
    {
      label: "Recuperar contato da carteira",
      record: [
        "finalidade: recuperação de contato",
        "usuário: ana.souza",
        "registrado às 09:41",
      ],
      returned: "Os contatos do cliente, na ordem de quem atende primeiro.",
    },
    {
      label: "Higienizar a carteira",
      record: [
        "finalidade: higienização de base",
        "lote: 1.200 linhas",
        "previsão: 22 min",
      ],
      returned: "A planilha de volta, com o desfecho de cada linha e o motivo.",
    },
    {
      label: "Verificar um parceiro",
      record: [
        "finalidade: verificação cadastral",
        "tipo: empresa",
        "registrado às 09:43",
      ],
      returned: "Situação cadastral e jurídica de empresas e parceiros da operação.",
    },
  ],
} as const;

export const whyZentra = {
  id: "por-que",
  kicker: "// POR QUE A ZENTRA",
  title: "Feita para quem opera consignado.",
  items: [
    { title: "Foco em consignado.", body: "Vocabulário, fluxo e resultado pensados para a operação de crédito." },
    { title: "Uma consulta, tudo.", body: "Dez blocos de dados de uma vez, sem somar consulta por consulta." },
    { title: "Ordem de quem atende.", body: "Os telefones chegam ranqueados. A equipe liga menos e fala mais." },
    { title: "Lote com previsão.", body: "Você sabe quando termina antes de começar." },
    { title: "Registro de tudo.", body: "Quem, quando, o quê e com que finalidade. Prova para a operação inteira." },
    { title: "Acesso individual.", body: "Cada pessoa com o seu login, segundo fator e desligamento na hora." },
    { title: "Acesso por contrato.", body: "Plano, franquia e usuários da sua equipe. Sem uso avulso." },
    { title: "Conformidade LGPD.", body: "Base legal, política e encarregado de dados publicados." },
  ],
} as const;

export const segments = {
  id: "para-quem",
  kicker: "// PARA QUEM É",
  title: "Funciona para a sua operação.",
  items: [
    "Promotoras de crédito",
    "Correspondentes bancários",
    "Consultorias de consignado",
    "Escritórios de recuperação de crédito",
    "Cooperativas de crédito",
    "Financeiras",
    "Equipes de cobrança",
    "Operações de portabilidade",
  ],
  footnote: "Não achou o seu? Se a operação é de crédito consignado, a Zentra atende.",
} as const;

export const finalCta = {
  kicker: "// PRÓXIMO PASSO",
  title: "Pare de ligar no escuro.",
  body: "Conte o tamanho da operação. Em uma conversa você já sai sabendo o que a Zentra devolve para a sua carteira.",
} as const;

export const compliance = {
  id: "conformidade",
  kicker: "// CONFORMIDADE",
  title: "Casa arrumada se mostra.",
  body: "Uma fiscalização olha o tratamento do dado: finalidade, base legal, registro de acesso, política de privacidade. A Zentra mostra tudo isso porque é assim que ela funciona.",
  points: [
    "Toda operação com finalidade declarada e registrada: quem fez, quando e o quê.",
    "Acesso por usuário, com segundo fator e desligamento imediato quando alguém sai da equipe.",
    "Contrato e plano definidos com a Zentra. Nunca uso avulso, nunca consulta anônima.",
    "Política de privacidade, base legal e encarregado de dados publicados.",
  ],
  closing: "Para quem compra, é segurança. Para quem fiscaliza, é sinal de casa arrumada.",
} as const;

export const faq = {
  id: "perguntas",
  kicker: "// DÚVIDAS COMUNS",
  title: "Perguntas de quem opera.",
  items: [
    {
      question: "De onde vêm os dados?",
      answer:
        "De fontes licenciadas, tratadas sob legítimo interesse, com finalidade declarada em cada operação e registro de quem acessou. A política de privacidade descreve a base legal.",
    },
    {
      question: "Qualquer pessoa pode contratar?",
      answer:
        "Não. A Zentra atende empresas e profissionais do crédito consignado, sempre por contrato. Não existe consulta avulsa nem acesso aberto ao público.",
    },
    {
      question: "Como a equipe é controlada?",
      answer:
        "Cada pessoa tem o próprio acesso, com segundo fator. O administrador vê o consumo por usuário e desliga um acesso na hora.",
    },
    {
      question: "Funciona para a carteira inteira?",
      answer:
        "Sim. A consulta em lote recebe a planilha, mostra a previsão de término antes de começar e devolve a planilha preenchida, linha a linha.",
    },
    {
      question: "Quanto custa?",
      answer:
        "Depende do tamanho da operação. Fale com a Zentra e receba a proposta para a sua carteira.",
    },
    {
      question: "Tem teste?",
      answer:
        "O acesso nasce de um contrato. Na conversa inicial mostramos o sistema funcionando e definimos o plano para a sua operação.",
    },
  ],
} as const;

export const contact = {
  id: "contato",
  fields: [
    { name: "nome", label: "Nome completo", placeholder: "Como você se chama", required: true, type: "text" },
    { name: "email", label: "E-mail", placeholder: "voce@exemplo.com.br", required: true, type: "email" },
    { name: "whatsapp", label: "WhatsApp", placeholder: "(DD) 9 9999-9999", required: true, type: "tel" },
    {
      name: "perfil",
      label: "Você é",
      placeholder: "Selecione",
      required: true,
      type: "select",
      options: ["Promotora de crédito", "Correspondente bancário", "Consultoria", "Profissional autônomo", "Outro"],
    },
    {
      name: "convenio",
      label: "Qual convênio você opera?",
      placeholder: "Selecione o convênio",
      required: true,
      type: "select",
      options: [
        "INSS",
        "SIAPE (servidor federal)",
        "Forças Armadas",
        "Governos estaduais",
        "Prefeituras",
        "Consignado privado (CLT)",
        "Cartão consignado e benefício",
        "Precatórios",
        "Outro",
      ],
    },
    {
      name: "interesse",
      label: "Qual solução te interessa?",
      placeholder: "Selecione",
      required: true,
      type: "select",
      options: ["Consulta de contatos", "Consulta em lote", "Empresas e processos", "Ainda não sei"],
    },
    {
      name: "mensagem",
      label: "Como podemos ajudar?",
      placeholder: "Tamanho da carteira, tamanho da equipe, o que mais quiser contar",
      required: false,
      type: "textarea",
    },
  ],
  submit: "Quero falar com a Zentra",
  sending: "Enviando...",
  successTitle: "Recebemos.",
  successBody: "Respondemos em até um dia útil, pelo e-mail que você deixou.",
  channelsTitle: "Prefere falar agora?",
  whatsappButton: "Chamar no WhatsApp",
  hours: "Atendemos em horário comercial, de segunda a sexta.",
  privacy: "// dados tratados com sigilo · conformidade LGPD",
} as const;

export const newsletter = {
  id: "newsletter",
  title: "Assine nossa newsletter.",
  body: "Novidades do crédito consignado, da LGPD e da Zentra, sem excesso de e-mail.",
  nameLabel: "Nome",
  emailLabel: "E-mail",
  consentBefore: "Aceito receber e-mails da Zentra e li a",
  consentLink: "política de privacidade",
  submit: "Assinar",
  sending: "Assinando...",
  success: "Pronto. Você vai receber a próxima edição.",
} as const;

export const footer = {
  legal: `© 2026 ${firm.name} · ${firm.legalName} · CNPJ ${firm.cnpj}`,
  links: [
    { label: "Política de privacidade", href: links.privacy },
    { label: "Termos de uso", href: links.terms },
    { label: "Encarregado de dados", href: links.dpo },
  ],
} as const;

export const seo = {
  title: "Zentra Business Data | Inteligência de dados para operações de crédito consignado",
  description: hero.subtitle,
  ogTitle: hero.title,
} as const;
