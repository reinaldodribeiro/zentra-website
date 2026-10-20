import { brandNotice, firm, firmAddress } from "../site.ts";
import type { TopicSection } from "./types";

export const sobre = {
  path: "/sobre",
  metaTitle: "Sobre a Zentra Business Data",
  metaDescription:
    "Quem é a Zentra Business Data: empresa de Goiânia que atende correspondentes, promotoras e escritórios de advocacia, por contrato. CNPJ e contato.",
  updatedAt: "2026-10-20",
  kicker: "// SOBRE A ZENTRA",
  breadcrumbLabel: "Sobre",
  h1: "Sobre a Zentra Business Data",
  intro: [
    `A ${firm.name} é a marca da ${firm.legalName}, empresa de Goiânia que atende outras empresas, por contrato: correspondentes bancários, promotoras de crédito consignado, equipes de cobrança e escritórios de advocacia.`,
    "O cliente usa a plataforma da Zentra para localizar e qualificar os contatos da própria carteira, consultar processos judiciais e falar com quem tem celular pelo WhatsApp, com a finalidade de cada consulta registrada e em conformidade com a LGPD.",
  ],
  sections: [
    {
      heading: "Dados da empresa",
      items: [
        `Razão social: ${firm.legalName}`,
        `Nome fantasia: ${firm.name}`,
        `CNPJ: ${firm.cnpj}`,
        `Endereço: ${firmAddress}`,
        `Telefone e WhatsApp: ${firm.phoneDisplay}`,
        `E-mail: ${firm.email}`,
      ],
    },
    {
      heading: "O que a Zentra faz",
      items: [
        "Localização e qualificação de contatos da carteira do cliente, na tela ou em lote",
        "Consulta de processos judiciais, com partes, advogados e movimentações",
        "Disparo de mensagens pelo WhatsApp, do número da empresa cliente, com modelo de mensagem aprovado",
      ],
      link: { label: "Ver as soluções para crédito consignado", href: "/credito-consignado" },
    },
    {
      heading: "Como a Zentra trabalha",
      paragraphs: [
        "O acesso à plataforma nasce de um contrato com a empresa cliente. A Zentra não atende o público em geral nem vende consulta avulsa.",
        "Toda consulta exige uma finalidade declarada e fica registrada com usuário, data e horário, para a empresa cliente prestar contas sob a LGPD.",
        "A Zentra nunca pede senha, código de verificação, número de cartão ou dados bancários por WhatsApp, e-mail ou formulário do site. O formulário do site serve só para a Zentra responder a quem pediu contato.",
      ],
    },
    {
      heading: "Marcas de terceiros",
      paragraphs: [brandNotice],
    },
  ] satisfies readonly TopicSection[],
} as const;
