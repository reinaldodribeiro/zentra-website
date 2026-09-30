import { firm, links } from "./site";

export type PrivacySection = {
  heading: string;
  paragraphs?: readonly string[];
  items?: readonly string[];
  closing?: readonly string[];
  contact?: { label: string; href: string; after: string };
};

export const privacy: {
  path: string;
  banner: string;
  back: string;
  backLabel: string;
  kicker: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  updated: string;
  intro: string;
  sections: readonly PrivacySection[];
} = {
  path: "/privacidade",
  banner: "Versão em revisão jurídica",
  back: "Voltar ao site",
  backLabel: "Zentra Business Data, voltar ao site",
  kicker: "POLÍTICA DE PRIVACIDADE",
  title: "Como a Zentra trata dados.",
  metaTitle: "Política de privacidade | Zentra Business Data",
  metaDescription:
    "Como a Zentra Business Data trata dados: finalidade declarada em cada operação, legítimo interesse, registro de acesso, direitos do titular e canal do encarregado.",
  updated: "Versão preliminar, em revisão jurídica. Última atualização: 30/09/2026.",
  intro:
    "Este texto explica quem é responsável pelo tratamento, para que os dados são usados, em que base legal e como o titular exerce os direitos que a Lei Geral de Proteção de Dados (Lei 13.709/2018) lhe dá. Ele ainda passa por revisão jurídica e pode mudar antes da versão final.",
  sections: [
    {
      heading: "Quem somos",
      paragraphs: [
        "A Zentra Business Data, marca da Zentra Business Hub Ltda. (CNPJ 69.351.287/0001-09), é a controladora dos dados tratados na plataforma. Ela licencia o acesso por contrato a empresas e profissionais do crédito consignado. Não há uso avulso nem acesso do público em geral.",
      ],
    },
    {
      heading: "Para que os dados são usados",
      paragraphs: [
        "Toda operação na plataforma exige uma finalidade declarada por quem a executa. Sem finalidade, a operação não acontece. Os dados servem a atividades legítimas da operação de crédito, como localizar e qualificar contatos e manter a base da carteira atualizada.",
      ],
    },
    {
      heading: "Base legal",
      paragraphs: [
        "O tratamento se apoia no legítimo interesse, previsto no artigo 7º, inciso IX, da LGPD. O interesse é avaliado frente aos direitos do titular, e o tratamento se limita ao que a finalidade declarada exige. Os dados vêm de fontes licenciadas.",
      ],
    },
    {
      heading: "Registro de acesso",
      paragraphs: [
        "Cada operação grava quem a fez, quando, o que foi consultado e com qual finalidade. O cliente vê o histórico da própria equipe, mês a mês. Esse registro existe para que o tratamento possa ser fiscalizado e para que qualquer titular receba uma resposta verificável.",
      ],
    },
    {
      heading: "Como protegemos os dados",
      items: [
        "Acesso por contrato, com usuário individual para cada pessoa da equipe.",
        "Segundo fator de autenticação por aplicativo, disponível para todos os usuários.",
        "Desligamento imediato do acesso de quem sai da equipe.",
        "Documentos mascarados nas respostas e nos registros técnicos, salvo nas situações em que o próprio cliente já informou o dado.",
      ],
    },
    {
      heading: "Por quanto tempo guardamos",
      paragraphs: [
        "O prazo de retenção está em definição com a assessoria jurídica e será publicado aqui quando aprovado. Até lá, os dados são mantidos apenas pelo tempo necessário à finalidade e às obrigações legais.",
      ],
    },
    {
      heading: "Direitos do titular",
      paragraphs: ["O titular pode pedir à Zentra, a qualquer momento:"],
      items: [
        "confirmação de que existe tratamento e acesso aos dados;",
        "correção de dados incompletos, inexatos ou desatualizados;",
        "anonimização, bloqueio ou eliminação de dados desnecessários ou tratados fora da lei;",
        "informação sobre com quem os dados foram compartilhados;",
        "oposição ao tratamento feito com base no legítimo interesse;",
        "revisão de decisões tomadas apenas por tratamento automatizado.",
      ],
      closing: ["O titular também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD)."],
    },
    {
      heading: "Encarregado de dados",
      paragraphs: [
        "Para exercer qualquer direito ou tirar dúvidas sobre esta política, escreva para o encarregado de dados pelo e-mail ",
      ],
      contact: { label: firm.email, href: links.dpo, after: "." },
    },
    {
      heading: "Mudanças nesta política",
      paragraphs: [
        "Quando a revisão jurídica terminar, esta página será atualizada, a faixa de revisão sairá do topo e a data acima mudará.",
      ],
    },
  ],
};
