import type { TopicPageContent } from "./types";

export const analiseDeCredito: TopicPageContent = {
  path: "/analise-de-credito",
  metaTitle: "Análise de crédito de clientes e empresas",
  metaDescription:
    "Análise de crédito de clientes e empresas antes da proposta: score, restrições e cadastro positivo, em PDF e com registro. Fale com a Zentra.",
  updatedAt: "2026-11-13",
  kicker: "// ANÁLISE DE CRÉDITO",
  breadcrumbLabel: "Análise de crédito",
  h1: "Análise de crédito de clientes e empresas antes da proposta",
  intro: [
    "Antes de fechar uma proposta, aceitar uma portabilidade ou priorizar uma carteira de cobrança, a operação precisa saber como está o crédito de quem está do outro lado. A Zentra traz a análise de crédito de clientes e empresas para dentro do mesmo sistema em que a carteira é tratada: score com faixa, restrições, cadastro positivo e as empresas em que a pessoa participa, numa tela só e em PDF.",
    "A análise vem de um birô de crédito, com finalidade declarada e registro de quem consultou, como toda consulta da Zentra.",
  ],
  sections: [
    {
      heading: "O que a análise de crédito devolve",
      paragraphs: [
        "Com o CPF do cliente ou o CNPJ da empresa, a análise volta em segundos, organizada para a decisão:",
      ],
      items: [
        "Score de crédito com a faixa e a probabilidade de atraso, num medidor que mostra onde a pessoa está",
        "Renda presumida",
        "Restrições num quadro só: débitos, protestos, ações judiciais, falência e cheques sem fundo, devolvidos ou sustados",
        "Cadastro positivo, com as notas de comportamento de pagamento",
        "Empresas em que a pessoa é sócia, com a participação e desde quando",
        "Identificação, endereço e telefones",
        "Quantas vezes o documento foi consultado no mercado nos últimos meses, mês a mês",
      ],
      closing: [
        "Para empresas, a análise traz identificação, endereço, telefones, score e as consultas ao mercado.",
        "Quando a consulta aponta indicação de óbito, a análise é bloqueada antes de sair, para que ninguém faça proposta a quem não atende mais.",
      ],
    },
    {
      heading: "Quando a análise entra no dia da operação",
      paragraphs: ["O mesmo resultado serve a decisões diferentes."],
      subsections: [
        {
          heading: "Promotoras e correspondentes",
          paragraphs: [
            "Antes da proposta de consignado ou da portabilidade, o score e as restrições dizem se vale avançar e com que cuidado. A análise fica guardada em PDF no dossiê da proposta.",
          ],
        },
        {
          heading: "Equipes de cobrança",
          paragraphs: [
            "Quem tem restrição recente e quem está com o cadastro positivo em dia pedem abordagens diferentes. A análise ordena a carteira antes da discagem.",
          ],
        },
        {
          heading: "Advocacia e recuperação de crédito",
          paragraphs: [
            "Restrições, consultas ao mercado e as empresas em que o devedor participa, para instruir a cobrança e a execução, com a parte localizada na mesma plataforma.",
          ],
        },
      ],
    },
    {
      heading: "Pagou uma vez, usa por sete dias",
      paragraphs: [
        "A análise de crédito consome mais unidades da franquia do que uma consulta comum, e o sistema mostra quantas antes de confirmar. Quem pagou a análise de um documento a reabre e baixa o PDF por sete dias, sem novo débito.",
        "Quando a análise não encontra o documento, nada é cobrado.",
      ],
    },
    {
      heading: "Antes da análise, o contato certo",
      paragraphs: [
        "A análise de crédito completa a consulta de contatos e a consulta em lote: a carteira é higienizada, o cliente é localizado e a proposta é decidida com o crédito na mão.",
      ],
      link: { label: "Ver a higienização de base para consignado", href: "/credito-consignado" },
      highlight: { kicker: "// CRÉDITO CONSIGNADO" },
    },
    {
      heading: "Finalidade e registro, como em toda consulta",
      paragraphs: [
        "Nenhuma análise acontece sem finalidade declarada. Cada uma grava quem consultou, quando, o quê e para quê, e o histórico fica com a empresa, mês a mês, com o documento protegido. Quem perguntar por que o crédito de alguém foi analisado encontra a resposta ali.",
        "O acesso é por contrato, com plano mensal e franquia compartilhada entre os usuários da equipe. Não existe análise avulsa nem acesso aberto ao público.",
      ],
    },
  ],
  faq: {
    kicker: "// DÚVIDAS COMUNS",
    title: "Perguntas sobre a análise de crédito.",
    items: [
      {
        question: "Que documentos a análise aceita?",
        answer:
          "O CPF de um cliente ou o CNPJ de uma empresa. Com o CPF, volta a análise completa; com o CNPJ, identificação, endereço, telefones, score e consultas ao mercado.",
      },
      {
        question: "A análise entra na consulta em lote?",
        answer:
          "Não. A análise de crédito é feita uma a uma, na tela própria, porque é uma decisão por proposta.",
      },
      {
        question: "Quanto consome do plano?",
        answer:
          "Mais do que uma consulta comum: cada análise vale um número fixo de consultas da franquia, mostrado antes de confirmar. Reabrir a mesma análise em até sete dias não consome nada, e a análise que não encontra o documento também não.",
      },
      {
        question: "De onde vem o score?",
        answer:
          "De um birô de crédito, por contrato. O score e a faixa são os do birô, e a Zentra mostra ao lado do número o que a faixa significa.",
      },
      {
        question: "Posso baixar a análise?",
        answer: "Sim, em PDF, enquanto durar o prazo de sete dias, pela mesma tela.",
      },
      {
        question: "Precisa de contrato?",
        answer:
          "Sim. O acesso nasce de um contrato, com plano mensal e franquia de consultas compartilhada entre os usuários. Não existe análise avulsa nem acesso aberto ao público.",
      },
    ],
  },
  related: {
    title: "Continue pelo site",
    links: [
      { label: "Higienização e enriquecimento de base para crédito consignado", href: "/credito-consignado" },
      { label: "Consulta de processos e localização de partes para advogados", href: "/advocacia" },
      { label: "Disparo, atendimento e fluxos pelo WhatsApp oficial", href: "/disparo-whatsapp" },
    ],
  },
  serviceIndex: 3,
};
