export const SITE_URL = "https://data.zentrabusiness.com.br";

export const SYSTEM_URL = "https://app-data.zentrabusiness.com.br";

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
  system: SYSTEM_URL,
  privacy: "/privacidade",
  terms: "/termos",
  contact: "#contato",
} as const;

export const nav = [
  { label: "Entregas", href: "#entregas" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "O sistema", href: "#sistema" },
  { label: "Conformidade", href: "#conformidade" },
  { label: "Perguntas", href: "#perguntas" },
] as const;

export const cta = {
  primary: "Fale com a Zentra",
  href: links.contact,
  system: "Acessar o sistema",
} as const;

export const hero = {
  kicker: "Para operações de crédito consignado",
  title: "Inteligência de dados para a sua carteira.",
  subtitle:
    "Localização e qualificação de contatos, higienização da base e registro de tudo que a equipe faz. Por contrato, por empresa, com finalidade declarada em cada operação.",
  clientLink: "Já é cliente? Acessar o sistema",
  screenAlt: "Visão geral do sistema da Zentra, com o uso do plano e as consultas da equipe.",
  proofs: [
    "Finalidade declarada em toda consulta",
    "Acesso por usuário, com segundo fator",
    "Histórico mês a mês",
  ],
} as const;

export const deliverables = {
  id: "entregas",
  kicker: "O que a Zentra entrega",
  title: "Contato certo, base limpa, operação com prova.",
  items: [
    {
      icon: "target",
      title: "Localizar e qualificar contatos.",
      body: "Os telefones chegam na ordem de quem atende primeiro. A equipe liga menos e fala com mais gente.",
    },
    {
      icon: "sheet",
      title: "Higienizar e enriquecer a base.",
      body: "A carteira inteira passa pela consulta em lote e volta preenchida, com o desfecho de cada linha e o motivo em português.",
    },
    {
      icon: "stamp",
      title: "Histórico e controle.",
      body: "Quem consultou, quando, o quê e com que finalidade. O gestor vê o consumo por usuário, e a operação inteira tem prova.",
    },
  ],
} as const;

export const howItWorks = {
  id: "como-funciona",
  kicker: "Como funciona",
  title: "Do contrato ao registro, em quatro passos.",
  steps: [
    {
      title: "Contrato por empresa.",
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
  kicker: "Finalidade",
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

export const screens = {
  id: "sistema",
  kicker: "O sistema",
  title: "Do jeito que a equipe vê.",
  items: [
    {
      src: "/images/tela-visao-geral.jpg",
      width: 1054,
      height: 420,
      caption: "A visão geral: quanto do plano foi usado e quem consultou.",
      alt: "Tela de visão geral do sistema, com o uso do plano e as consultas por usuário.",
    },
    {
      src: "/images/tela-lote.jpg",
      width: 1440,
      height: 560,
      caption: "A consulta em lote: a previsão antes de começar, a planilha no fim.",
      alt: "Tela da consulta em lote, com a previsão de término e a planilha de resultado.",
    },
    {
      src: "/images/tela-consumo.jpg",
      width: 1440,
      height: 645,
      caption: "O consumo por usuário, mês a mês.",
      alt: "Tela de consumo, com as consultas de cada usuário mês a mês.",
    },
  ],
} as const;

export const compliance = {
  id: "conformidade",
  kicker: "Conformidade",
  title: "Casa arrumada se mostra.",
  body: "Uma fiscalização olha o tratamento do dado: finalidade, base legal, registro de acesso, política de privacidade. A Zentra mostra tudo isso porque é assim que ela funciona.",
  points: [
    "Toda operação com finalidade declarada e registrada: quem fez, quando e o quê.",
    "Acesso por usuário, com segundo fator e desligamento imediato quando alguém sai da equipe.",
    "Contrato e plano por empresa. Nunca uso avulso, nunca consulta anônima.",
    "Política de privacidade, base legal e encarregado de dados publicados.",
  ],
  closing: "Para quem compra, é segurança. Para quem fiscaliza, é sinal de casa arrumada.",
} as const;

export const faq = {
  id: "perguntas",
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
        "Não. A Zentra atende empresas, por contrato. Não existe consulta avulsa nem acesso aberto ao público.",
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
  kicker: "Contato",
  title: "Fale com a Zentra.",
  body: "Conte o tamanho da operação e a gente volta com a proposta.",
  fields: [
    { name: "nome", label: "Nome", placeholder: "Como você se chama", required: true, type: "text" },
    {
      name: "empresa",
      label: "Empresa",
      placeholder: "Promotora, correspondente ou escritório",
      required: true,
      type: "text",
    },
    {
      name: "cargo",
      label: "Cargo",
      placeholder: "Gestor de operação, comercial, sócio",
      required: false,
      type: "text",
    },
    {
      name: "email",
      label: "E-mail corporativo",
      placeholder: "voce@suaempresa.com.br",
      required: true,
      type: "email",
    },
    { name: "telefone", label: "Telefone", placeholder: "(DDD) número", required: false, type: "tel" },
    {
      name: "mensagem",
      label: "Mensagem",
      placeholder: "Quantas pessoas na equipe, tamanho da carteira, o que mais quiser contar",
      required: false,
      type: "textarea",
    },
  ],
  submit: "Enviar",
  sending: "Enviando...",
  successTitle: "Recebemos.",
  successBody: "Respondemos em até um dia útil, pelo e-mail que você deixou.",
  channelsTitle: "Prefere falar agora?",
  whatsappButton: "Chamar no WhatsApp",
  hours: "Atendemos em horário comercial, de segunda a sexta.",
} as const;

export const footer = {
  legal: `© 2026 ${firm.name} · ${firm.legalName} · CNPJ ${firm.cnpj}`,
  links: [
    { label: "Política de privacidade", href: links.privacy },
    { label: "Termos de uso", href: links.terms },
    { label: "Encarregado de dados", href: links.dpo },
    { label: "Acessar o sistema", href: links.system },
  ],
} as const;

export const seo = {
  title: "Zentra Business Data | Inteligência de dados para operações de crédito consignado",
  description: hero.subtitle,
  ogTitle: hero.title,
} as const;
