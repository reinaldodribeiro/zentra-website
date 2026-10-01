import type { TopicPageContent } from "./types";

export const advocacia: TopicPageContent = {
  path: "/advocacia",
  metaTitle: "Consulta de processos judiciais para advogados",
  metaDescription:
    "Consulta de processos judiciais e localização de partes para advogados, com finalidade registrada em cada consulta. Fale com a Zentra.",
  updatedAt: "2026-10-01",
  kicker: "// ADVOCACIA",
  breadcrumbLabel: "Advocacia",
  h1: "Consulta de processos judiciais e localização de partes para advogados",
  intro: [
    "Um processo tem partes, advogados e movimentações, e o escritório precisa de cada uma dessas informações a tempo. Precisa também encontrar quem está do outro lado: o cliente que mudou de número, o devedor que sumiu, a testemunha que ninguém localiza.",
    "A Zentra reúne a consulta de processos judiciais e a localização de partes no mesmo sistema, com finalidade declarada e registro de quem consultou.",
  ],
  sections: [
    {
      heading: "Processos em todos os tribunais, com partes e movimentações",
      paragraphs: [
        "Informe o número do processo e a Zentra devolve o processo com as partes, os advogados e as movimentações. Também é possível buscar pelo CPF ou pelo CNPJ e receber o conjunto de processos em que o documento aparece, com o total.",
      ],
      items: [
        "Número do processo no padrão do CNJ",
        "Partes e advogados de cada processo",
        "Movimentações do processo",
        "Todos os processos de um CPF ou de um CNPJ, com o total encontrado",
      ],
      closing: [
        "Consulta de processo, de pessoa e de empresa somam na mesma franquia, então o escritório acompanha uma conta só. Cada consulta fica registrada, com finalidade, usuário e horário. Em vez de conferir andamento por andamento em lugares diferentes, a equipe consulta o número e lê tudo no mesmo lugar.",
      ],
    },
    {
      heading: "Localize a parte, a testemunha ou o cliente",
      paragraphs: [
        "Saber o nome nem sempre basta. A busca sem documento aceita nome, cidade, telefone, e-mail ou placa e devolve uma lista de candidatos, com cidade, UF e idade, para você escolher o certo.",
        "Escolhido o candidato, a consulta seguinte abre o cadastro completo: telefones na ordem de quem atende primeiro, e-mails, endereços, vínculos de trabalho e empresas em que participa. Quem aparece como parte de um processo também pode ser consultado a partir do próprio processo, sem digitar o documento.",
        "O caminho também funciona a partir de empresas: a empresa consultada mostra sócios e funcionários, e cada um deles pode virar uma nova consulta.",
        "Cada uma dessas etapas é uma consulta com a sua finalidade e o seu registro.",
      ],
    },
    {
      heading: "Para cada especialidade, uma solução",
      paragraphs: [
        "A mesma plataforma serve a áreas diferentes do direito. O que muda é o ponto de partida de cada caso.",
      ],
      subsections: [
        {
          heading: "Previdenciário",
          paragraphs: [
            "O escritório previdenciário depende de encontrar o segurado e de acompanhar o processo dele. A Zentra localiza o contato atualizado do cliente, traz os processos em todos os tribunais e processa em lote a carteira do escritório, para reativar quem já procurou o escritório um dia.",
          ],
        },
        {
          heading: "Trabalhista",
          paragraphs: [
            "No trabalhista, o processo tem reclamante, reclamada e testemunhas. Consulte processos, partes e movimentações, encontre o contato de reclamantes e testemunhas e confira empresas, sócios e situação cadastral antes de ajuizar ou de negociar.",
          ],
        },
        {
          heading: "Bancário e revisional",
          paragraphs: [
            "Para instruir uma revisão de consignado, o advogado precisa saber onde o cliente trabalha, desde quando e qual é a situação cadastral dele. A Zentra devolve vínculos de trabalho, empregador e situação cadastral, além do histórico de processos do cliente.",
          ],
        },
        {
          heading: "Cível",
          paragraphs: [
            "No cível, o ponto de partida muda a cada caso: um nome, uma cidade, um telefone, uma placa. A busca sem documento aceita qualquer um deles, e a consulta seguinte traz endereços qualificados e as pessoas e empresas ligadas.",
          ],
        },
        {
          heading: "Recuperação de crédito",
          paragraphs: [
            "Localizar o devedor é o começo da recuperação. A Zentra traz o contato e o endereço, as empresas e os sócios ligados a ele e processa a carteira inteira em lote, com o desfecho de cada linha.",
          ],
        },
        {
          heading: "Outra especialidade",
          paragraphs: [
            "A base e as consultas servem a qualquer área do direito. Conte a sua na conversa com a Zentra.",
          ],
        },
      ],
    },
    {
      heading: "A carteira do escritório em lote",
      paragraphs: [
        "Escritório com muitos clientes ou muitos processos não consulta um a um. Você envia a planilha e escolhe o tipo do lote. O sistema consulta linha por linha, mostra a previsão de término e devolve a planilha preenchida, com o desfecho de cada linha.",
      ],
      items: [
        "Lote de clientes, para atualizar o contato da carteira",
        "Lote de empresas, para conferir situação cadastral, sócios e funcionários",
        "Lote de processos, pelo número do CNJ",
        "Lote por nome e UF, para achar candidatos quando falta o documento",
      ],
      closing: [
        "A planilha volta pronta para o trabalho do dia seguinte: quem foi encontrado, quem não teve resultado e o motivo de cada linha. Quando o lote termina, o sistema avisa quem o enviou.",
      ],
    },
    {
      heading: "Finalidade declarada e registro de quem consultou",
      paragraphs: [
        "Consultar dado de parte, de cliente ou de testemunha exige finalidade. Na Zentra, nenhuma consulta começa sem ela. O sistema grava quem consultou, quando, o quê e para quê, e o escritório guarda esse histórico, mês a mês.",
        "Cada pessoa da equipe entra com o próprio acesso e segundo fator. O administrador acompanha o consumo de cada uma e desliga um acesso na hora. O acesso é por contrato, nunca avulso, e a política de privacidade e o encarregado de dados são públicos.",
      ],
    },
  ],
  faq: {
    kicker: "// DÚVIDAS COMUNS",
    title: "Perguntas de advogados sobre consulta de processos.",
    items: [
      {
        question: "Como consulto um processo?",
        answer:
          "Informe o número único do processo, no padrão do CNJ. Você recebe as partes, os advogados e as movimentações. Também dá para buscar pelo CPF ou pelo CNPJ e ver os processos em que o documento aparece.",
      },
      {
        question: "Consigo localizar uma parte só pelo nome?",
        answer:
          "Sim. A busca sem documento aceita nome e UF, e também cidade, telefone, e-mail ou placa. Ela devolve uma lista de candidatos, e você escolhe quem consultar.",
      },
      {
        question: "Posso consultar a carteira do escritório de uma vez?",
        answer:
          "Sim. A consulta em lote recebe a planilha, mostra a previsão de término e devolve a planilha preenchida. Há lote de clientes, de empresas, de processos e por nome e UF.",
      },
      {
        question: "Como fica registrado quem consultou?",
        answer:
          "Cada consulta grava quem consultou, quando, o quê e com que finalidade. O histórico mostra tudo mês a mês, com busca por documento, e o administrador acompanha o consumo de cada usuário.",
      },
      {
        question: "Precisa de contrato?",
        answer:
          "Sim. O acesso nasce de um contrato, com plano mensal e franquia de consultas compartilhada entre os usuários. O plano define se inclui a consulta em lote. Não existe consulta avulsa nem acesso aberto ao público.",
      },
    ],
  },
  related: {
    title: "Continue pelo site",
    links: [
      { label: "Higienização e enriquecimento de base para crédito consignado", href: "/credito-consignado" },
      { label: "Artigos sobre consignado, LGPD e processos", href: "/artigos" },
    ],
  },
  serviceIndex: 1,
};
