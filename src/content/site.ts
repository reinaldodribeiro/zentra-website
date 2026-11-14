import { voices } from "./voices.ts";
export const SITE_URL = "https://data.zentrabusiness.com.br";

export const firm = {
  name: "Zentra Business Data",
  shortName: "Zentra",
  legalName: "Zentra Business Hub Ltda.",
  cnpj: "69.351.287/0001-09",
  phoneDisplay: "(62) 3092-1845",
  phoneE164: "+556230921845",
  whatsappNumber: "556230921845",
  email: "contato@zentrabusiness.com.br",
  address: {
    street: "R. 261, quadra 80, lote 11",
    district: "Leste Universitário",
    city: "Goiânia",
    state: "GO",
    postalCode: "74610-250",
  },
  linkedin: "",
  instagram: "https://www.instagram.com/zentrabusinesshub",
} as const;

export const firmAddress = `${firm.address.street}, ${firm.address.district}, ${firm.address.city} - ${firm.address.state}, CEP ${firm.address.postalCode}`;

export const brandNotice =
  "WhatsApp e Meta são marcas da Meta Platforms, Inc. A Zentra não é afiliada, patrocinada nem endossada pela Meta: o disparo usa a API oficial do WhatsApp Business por meio de um provedor de tecnologia, com o número e a conta do próprio cliente.";

export const brandNoticeShort = "WhatsApp e Meta são marcas da Meta Platforms, Inc. A Zentra não é afiliada à Meta.";

export const siteUpdatedAt = "2026-11-13";

export const referralWhatsappNote = "Vim pela indicação {codigo}.";

export function whatsappLink(message: string): string {
  return `https://wa.me/${firm.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const links = {
  whatsapp: whatsappLink(voices.inicial.whatsapp.padrao),
  phone: `tel:${firm.phoneE164}`,
  email: `mailto:${firm.email}`,
  privacy: "/privacidade",
  terms: "/termos",
  cookies: "/cookies",
  contact: "#contato",
} as const;

export const legalSource = "https://app-data.zentrabusiness.com.br/api/legal/documents";

export const legalPage = {
  back: "Voltar ao site",
  backLabel: "Zentra Business Data, voltar ao site",
  version: "Versão",
  effectiveFrom: "vigente desde",
  unavailable: "Não foi possível carregar este documento agora. Tente de novo em alguns minutos ou peça o texto pelo e-mail",
  contactLabel: firm.email,
} as const;

export const cookieConsent = {
  bannerLabel: "Aviso de cookies",
  bannerText:
    "Este site usa cookies e armazenamentos essenciais, para lembrar os avisos que você já viu e guardar esta escolha. Com a sua permissão, usa também o Google Analytics e o PostHog para medir o uso e melhorar a conversão. Nada disso é carregado sem o seu sim.",
  policyLink: "Política de cookies",
  acceptAll: "Aceitar todos",
  rejectNonEssential: "Recusar não essenciais",
  configure: "Configurar",
  preferencesTitle: "Preferências de cookies",
  preferencesIntro:
    "Escolha o que pode ser usado neste navegador. A escolha vale também para o sistema da Zentra, e você pode mudar de ideia a qualquer momento pelo link Preferências de cookies no rodapé.",
  essentialTitle: "Essenciais",
  essentialBadge: "Sempre ativos",
  essentialText:
    "Guardam esta escolha e lembram os avisos e formulários do site que você já viu ou enviou. Sem eles o site não funciona como esperado, por isso não podem ser desligados.",
  analyticsTitle: "Análise e desempenho",
  analyticsText:
    "Liga o Google Analytics e o PostHog, que medem as páginas visitadas e os cliques nos convites do site, sem nome nem contato. Desligar esta opção apaga os cookies de análise e para a medição na hora. Nenhuma ferramenta de anúncio é usada.",
  save: "Salvar preferências",
  close: "Fechar",
} as const;

export const nav = [
  { label: "Soluções", href: "#solucoes" },
  { label: "Consignado", href: "/credito-consignado" },
  { label: "Advocacia", href: "/advocacia" },
  { label: "Análise de crédito", href: "/analise-de-credito" },
  { label: "WhatsApp", href: "/disparo-whatsapp" },
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
  kicker: "// inteligência de dados para crédito consignado e advocacia",
  title: "Contato certo, base limpa, operação com prova.",
  highlight: "operação com prova",
  subtitle:
    "A Zentra localiza e qualifica os contatos da sua carteira, higieniza a base em lote, analisa o crédito de clientes e empresas antes da proposta, fala com quem tem celular pelo WhatsApp oficial e registra cada operação. Sempre por contrato, dentro da LGPD.",
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
  title: "Uma plataforma. Seis frentes para a operação de consignado.",
  lead: "Tudo dentro do mesmo sistema, com o mesmo registro e o mesmo contrato.",
  linkLabel: "Saiba mais",
  items: [
    {
      color: "gold",
      href: "/credito-consignado",
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
      href: "/credito-consignado",
      title: "Consulta em lote",
      points: [
        "A planilha da carteira inteira",
        "Previsão de término antes de começar",
        "Filtros por score, renda, UF e margem",
        "Listas de servidores públicos prontas para discar",
      ],
    },
    {
      color: "coral",
      href: "/analise-de-credito",
      title: "Análise de crédito",
      points: [
        "Score com faixa e probabilidade de atraso",
        "Débitos, protestos, ações e cheques num quadro só",
        "Cadastro positivo e empresas em que participa",
        "Em PDF, para o dossiê da proposta",
      ],
    },
    {
      color: "green",
      href: "/advocacia",
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
      href: "/credito-consignado",
      title: "Histórico e controle",
      points: [
        "Quem, quando, o quê e com que finalidade",
        "Consumo por usuário, mês a mês",
        "Segundo fator e desligamento imediato",
        "Resumo do ciclo para o gestor",
      ],
    },
    {
      color: "teal",
      href: "/disparo-whatsapp",
      title: "WhatsApp oficial",
      points: [
        "Disparo em massa do seu número, com modelo aprovado",
        "Atendimento com funil, etiquetas e agenda",
        "Fluxos automáticos que respondem sozinhos",
        "Mais de um número na mesma conta",
      ],
    },
  ],
} as const;

export const creditAnalysis = {
  id: "analise-de-credito",
  kicker: "// ANÁLISE DE CRÉDITO",
  title: "Antes da proposta, o crédito do cliente numa tela só.",
  lead: "Score com faixa, restrições, cadastro positivo e as empresas em que a pessoa participa. Com o CPF do cliente ou o CNPJ da empresa, em segundos e em PDF.",
  points: [
    "Score com a faixa e a probabilidade de atraso",
    "Débitos, protestos, ações, falência e cheques num quadro só",
    "Cadastro positivo e participações em empresas",
    "Reabra a mesma análise por sete dias sem pagar de novo",
  ],
  pageLink: { label: "Ver a análise de crédito", href: "/analise-de-credito" },
  demo: {
    ariaLabel: "Exemplo ilustrativo de uma análise de crédito: números de exemplo",
    header: "análise de crédito · exemplo",
    score: 712,
    scoreMax: 1000,
    band: "faixa B",
    probability: "4,8% de chance de atraso em 12 meses",
    tiles: [
      { label: "Restrições", value: "nenhuma" },
      { label: "Cadastro positivo", value: "nota A" },
      { label: "Consultas ao mercado", value: "3 em 90 dias" },
      { label: "Renda presumida", value: "faixa 4" },
    ],
    footer: "registrado às 09:45 · ana.souza",
  },
} as const;

export const whatsappDispatch = {
  id: "disparo-whatsapp",
  kicker: "// DISPARO PELO WHATSAPP OFICIAL",
  title: "WhatsApp oficial, do número da sua empresa: disparo, atendimento e fluxos.",
  lead: "Tratou a base, fale com quem tem celular e atenda as respostas no mesmo lugar. Pela API da Meta, sem robô paralelo e sem chip descartável.",
  steps: [
    {
      title: "Conecte o seu número.",
      body: "O número de WhatsApp da empresa, pelo cadastro oficial da Meta, dentro do sistema. Mais de um, se a operação precisar.",
    },
    {
      title: "Dispare com modelo aprovado.",
      body: "Só sai modelo aprovado pela Meta, para o resultado do lote ou para a sua lista, com conferência antes e acompanhamento depois.",
    },
    {
      title: "Atenda e automatize.",
      body: "As respostas caem num funil de atendimento, com etiquetas e agenda, e os fluxos automáticos respondem as perguntas de sempre.",
    },
  ],
  pageLink: { label: "Ver o WhatsApp oficial na Zentra", href: "/disparo-whatsapp" },
  notice: brandNoticeShort,
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
    { without: "Lista para discar um a um", with: "Base tratada e mensagem pelo WhatsApp oficial para quem tem celular" },
    { without: "Ninguém sabe quem usou", with: "Cada operação registrada: quem, quando e finalidade" },
    { without: "Login compartilhado", with: "Acesso individual com segundo fator" },
    { without: "Risco na fiscalização", with: "Política, base legal e encarregado publicados" },
    { without: "Score num lugar, restrição em outro", with: "Análise de crédito com score, restrições e cadastro positivo numa tela só" },
    { without: "Lista de servidores de mão em mão", with: "Lista de servidores públicos montada de fontes oficiais, por cidade ou federal, com registro" },
    { without: "Fornecedor que some depois da venda", with: "Chamado dentro do sistema, com resposta da equipe" },
  ],
} as const;

export const howItWorks = {
  id: "como-funciona",
  kicker: "// COMO FUNCIONA",
  title: "Do contrato ao registro de cada consulta, em quatro passos.",
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
      title: "Uma consulta, a carteira inteira, a análise ou a mensagem.",
      body: "Na tela, com finalidade declarada. Em lote, com previsão de término e a planilha de volta. A análise de crédito antes da proposta. E, para quem tem celular, a conversa pelo WhatsApp oficial.",
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
    {
      label: "Analisar o crédito antes da proposta",
      record: [
        "finalidade: análise de crédito",
        "documento: cliente",
        "registrado às 09:45",
      ],
      returned: "Score com faixa, restrições, cadastro positivo e consultas ao mercado, em PDF.",
    },
  ],
} as const;

export const whyZentra = {
  id: "por-que",
  kicker: "// POR QUE A ZENTRA",
  title: "Feita para quem opera consignado.",
  items: [
    { title: "Uma consulta, tudo.", body: "Dez blocos de dados de uma vez, sem somar consulta por consulta." },
    { title: "Ordem de quem atende.", body: "Os telefones chegam ranqueados. A equipe liga menos e fala mais." },
    { title: "Lote com previsão.", body: "Você sabe quando termina antes de começar." },
    { title: "Crédito antes da proposta.", body: "Score, restrições e cadastro positivo do cliente ou da empresa, numa tela só e em PDF." },
    { title: "WhatsApp do começo ao fim.", body: "Disparo, atendimento com funil e fluxos automáticos, do número da sua empresa." },
    { title: "Registro de tudo.", body: "Quem, quando, o quê e com que finalidade. Prova para a operação inteira." },
    { title: "Acesso individual.", body: "Cada pessoa com o seu login, segundo fator e desligamento na hora." },
    { title: "Conformidade LGPD.", body: "Base legal, política e encarregado de dados publicados." },
  ],
} as const;

export const advocacy = {
  id: "advocacia",
  kicker: "// PARA ESCRITÓRIOS DE ADVOCACIA",
  title: "Soluções para escritórios de advocacia, por especialidade.",
  lead: "A mesma plataforma, com processos judiciais, localização de partes e registro de cada consulta.",
  linkPrefix: "Falar sobre",
  pageLink: { label: "Ver a página de advocacia", href: "/advocacia" },
  items: [
    {
      specialty: "Previdenciário",
      body: "Localize o contato atualizado de quem precisa do seu escritório e acompanhe os processos do cliente.",
      points: [
        "Contato atualizado do cliente",
        "Processos do cliente em todos os tribunais",
        "Consulta em lote da carteira do escritório",
      ],
    },
    {
      specialty: "Trabalhista",
      body: "Consulte processos, partes e movimentações, e encontre o contato de reclamantes e testemunhas.",
      points: [
        "Processos, partes e movimentações",
        "Contato de reclamantes e testemunhas",
        "Empresas, sócios e situação cadastral",
      ],
    },
    {
      specialty: "Bancário e revisional",
      body: "Identifique vínculos, empregador e situação cadastral para instruir revisões de consignado.",
      points: [
        "Vínculos de trabalho e empregador",
        "Situação cadastral",
        "Histórico de processos do cliente",
      ],
    },
    {
      specialty: "Cível",
      body: "Encontre pessoas e empresas por nome, cidade, telefone ou placa, com endereço e vínculos.",
      points: [
        "Busca por nome, cidade, telefone ou placa",
        "Endereços qualificados",
        "Pessoas e empresas ligadas",
      ],
    },
    {
      specialty: "Recuperação de crédito",
      body: "Localize o devedor, confira restrições e empresas ligadas a ele e processe a carteira inteira em lote.",
      points: ["Localização do devedor", "Análise de crédito e empresas ligadas", "Carteira inteira em lote"],
    },
  ],
  other: {
    specialty: "Outra especialidade",
    body: "A base e as consultas servem qualquer área do direito. Conte a sua.",
  },
} as const;

export function advocacyLink(specialty: string): string {
  return whatsappLink(`Olá, atuo com ${specialty.toLowerCase()} e quero conhecer a Zentra.`);
}

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
    "Escritórios de advocacia",
  ],
  footnote: "Não achou o seu? Se a operação é de crédito ou de advocacia, a Zentra atende.",
} as const;

export const finalCta = {
  kicker: "// PRÓXIMO PASSO",
} as const;

export const compliance = {
  id: "conformidade",
  kicker: "// CONFORMIDADE",
  title: "Conformidade com a LGPD: casa arrumada se mostra.",
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
  title: "Perguntas de quem opera crédito consignado e advocacia.",
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
      question: "Dá para mandar mensagem pela Zentra?",
      answer:
        "Sim, pelo WhatsApp oficial, com o número da sua empresa e um modelo aprovado pela Meta. O disparo sai para o resultado de um lote ou para uma lista sua, as respostas chegam num atendimento com funil dentro da Zentra, e cada envio fica registrado. A Meta cobra a mensagem; a Zentra, não.",
    },
    {
      question: "Dá para analisar o crédito antes da proposta?",
      answer:
        "Sim. A análise de crédito traz score com faixa, restrições, cadastro positivo e as empresas em que a pessoa participa, para o CPF do cliente ou o CNPJ da empresa, numa tela só e em PDF. Consome unidades da franquia, e o sistema mostra quantas antes de confirmar.",
    },
    {
      question: "Vocês têm listas de servidores públicos?",
      answer:
        "Sim, para quem opera consignado e por contrato: listas de servidores municipais, por cidade, e federais, a partir de portais de transparência e arquivos abertos do governo. Você escolhe a cidade ou a unidade e os filtros, e cada servidor identificado entra como uma consulta registrada.",
    },
    {
      question: "Serve para escritório de advocacia?",
      answer:
        "Sim. Escritórios usam a Zentra para consultar processos, localizar partes e clientes e processar carteiras em lote, sempre com finalidade declarada e registro de quem consultou.",
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
    { name: "whatsapp", label: "WhatsApp", placeholder: "(99) 9 9999-9999", required: true, type: "tel" },
    {
      name: "area",
      label: "Qual é a sua área de atuação?",
      placeholder: "Selecione sua área",
      required: true,
      type: "select",
      options: [
        "Crédito consignado",
        "Advocacia previdenciária",
        "Advocacia trabalhista",
        "Advocacia bancária e revisional",
        "Advocacia cível",
        "Recuperação de crédito e cobrança",
        "Disparo de WhatsApp",
        "Análise de crédito",
        "Outro",
      ],
    },
    {
      name: "mensagem",
      label: "Como podemos ajudar?",
      placeholder: "Tamanho da carteira ou do escritório, tamanho da equipe, o que mais quiser contar",
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

export const demo = {
  nameLabel: "Nome",
  namePlaceholder: "Como você se chama",
  phoneLabel: "WhatsApp",
  phonePlaceholder: "(99) 9 9999-9999",
  submit: "Quero a demonstração",
  sending: "Enviando...",
  successTitle: "Recebemos.",
  successBody: "Chamamos você no WhatsApp em até um dia útil.",
  openWhatsApp: "Abrir conversa agora",
} as const;

export const engagementCard = {
  close: "Fechar",
} as const;

export const exitModal = {
  close: "Fechar",
} as const;

export const whatsappBubble = {
  name: "Zentra",
  action: "Responder no WhatsApp",
  close: "Fechar",
} as const;

export const mobileBar = {
  label: "Falar com a Zentra",
} as const;

export const contactSteps = {
  stepLabel: "Passo {n} de 2",
  next: "Continuar",
  back: "Voltar",
  nameError: "Informe o seu nome.",
  phoneError: "Informe o WhatsApp com DDD.",
} as const;

export const newsletter = {
  id: "newsletter",
  title: "Assine nossa newsletter.",
  body: "Novidades do crédito consignado, da LGPD e da Zentra, sem excesso de e-mail.",
  nameLabel: "Nome",
  namePlaceholder: "Como você se chama",
  emailLabel: "E-mail",
  emailPlaceholder: "voce@exemplo.com.br",
  consentBefore: "Aceito receber e-mails da Zentra e li a",
  consentLink: "política de privacidade",
  submit: "Assinar",
  sending: "Assinando...",
  success: "Pronto. Você vai receber a próxima edição.",
} as const;

const socialLinks = ([
  { label: "LinkedIn", href: firm.linkedin },
  { label: "Instagram", href: firm.instagram, icon: "instagram" },
] as const).filter((item) => item.href !== "");

export const footer = {
  legal: `© 2026 ${firm.name} · ${firm.legalName} · CNPJ ${firm.cnpj}`,
  address: firmAddress,
  addressLines: [
    firm.address.street,
    `${firm.address.district}, ${firm.address.city} - ${firm.address.state}`,
    `CEP ${firm.address.postalCode}`,
  ],
  columns: [
    {
      title: "Soluções",
      links: [
        { label: "Crédito consignado", href: "/credito-consignado" },
        { label: "Advocacia", href: "/advocacia" },
        { label: "Análise de crédito", href: "/analise-de-credito" },
        { label: "WhatsApp oficial", href: "/disparo-whatsapp" },
        { label: "Artigos", href: "/artigos" },
      ],
    },
    {
      title: "Empresa",
      links: [
        { label: "Sobre a Zentra", href: "/sobre" },
        { label: "Fale com a Zentra", href: `/${links.contact}`, icon: "speech" },
        ...socialLinks,
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Política de privacidade", href: links.privacy },
        { label: "Termos de uso", href: links.terms },
        { label: "Política de cookies", href: links.cookies },
        { label: "Preferências de cookies", action: "cookie-preferences" },
      ],
    },
  ],
} as const;

export const services = [
  {
    name: "Localização e higienização de contatos para crédito consignado",
    serviceType: "Higienização e enriquecimento de base",
    audience: "Promotoras, correspondentes bancários e consultorias de crédito consignado",
  },
  {
    name: "Consulta de processos judiciais e localização de partes",
    serviceType: "Consulta de processos judiciais",
    audience: "Escritórios de advocacia",
  },
  {
    name: "Disparo de mensagens pelo WhatsApp oficial",
    serviceType: "Disparo de WhatsApp em massa",
    audience: "Promotoras, correspondentes bancários, consultorias de crédito consignado e escritórios de advocacia",
  },
  {
    name: "Análise de crédito de clientes e empresas",
    serviceType: "Análise de crédito",
    audience: "Promotoras, correspondentes bancários, equipes de cobrança e escritórios de advocacia",
  },
] as const;

export const seo = {
  defaultTitle: "Zentra | Dados para crédito consignado e advocacia",
  description:
    "Contatos, higienização de base, análise de crédito e processos, com finalidade registrada em toda consulta. Dentro da LGPD. Fale com a Zentra.",
} as const;

export const notFoundPage = {
  title: "Página não encontrada",
  kicker: "// ERRO 404",
  heading: "Página não encontrada.",
  body: "O endereço que você abriu não existe mais ou foi digitado errado. Volte ao início ou fale com a Zentra.",
  home: "Voltar ao início",
  contact: "Fale com a Zentra",
  contactAnchor: links.contact,
} as const;
