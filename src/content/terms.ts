import { firm, links, SITE_URL } from "./site";

const SYSTEM_HOST = "app-data.zentrabusiness.com.br";
import type { PrivacySection } from "./privacy";

export const terms: {
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
  path: links.terms,
  banner: "Versão em revisão jurídica",
  back: "Voltar ao site",
  backLabel: "Zentra Business Data, voltar ao site",
  kicker: "TERMOS DE USO",
  title: "Como a Zentra pode ser usada.",
  metaTitle: "Termos de uso | Zentra Business Data",
  metaDescription:
    "Termos de uso da Zentra Business Data: acesso por contrato, finalidade declarada, usos proibidos, registro de operações, suspensão e responsabilidades.",
  updated: "Versão preliminar, em revisão jurídica. Última atualização: 30/09/2026.",
  intro:
    "Este texto define o que a Zentra oferece e o que o cliente se compromete a fazer ao usar o sistema. Ele ainda passa por revisão jurídica e pode mudar antes da versão final.",
  sections: [
    {
      heading: "Quem somos e a quem estes termos se aplicam",
      paragraphs: [
        `A Zentra Business Hub Ltda., CNPJ 69.351.287/0001-09, atua sob a marca ${firm.name}. Estes termos valem para o site ${SITE_URL.replace("https://", "")} e para o sistema em ${SYSTEM_HOST}, usados por clientes com contrato.`,
      ],
    },
    {
      heading: "Acesso só por contrato",
      paragraphs: [
        "A Zentra atende empresas e profissionais do crédito consignado, sempre por contrato. Não existe uso avulso nem acesso aberto ao público. O contrato e o plano contratado definem a franquia de consultas e as demais condições.",
      ],
    },
    {
      heading: "Contas de usuário",
      items: [
        "Cada pessoa da equipe tem o próprio acesso.",
        "É proibido compartilhar login e senha.",
        "O segundo fator de autenticação é recomendado a todos os usuários.",
        "O administrador do cliente responde pelos usuários que cria e deve desligar o acesso de quem sai da equipe.",
      ],
    },
    {
      heading: "Finalidade declarada",
      paragraphs: [
        "Toda consulta exige uma finalidade verdadeira, ligada à operação de crédito do cliente. O cliente responde pela finalidade que declara.",
      ],
    },
    {
      heading: "Usos proibidos",
      paragraphs: ["É proibido ao cliente e aos seus usuários:"],
      items: [
        "revender ou repassar dados a terceiros;",
        "usar os dados para finalidade diferente da declarada;",
        "tentar burlar limites ou acessar o que não é do cliente;",
        "automatizar o acesso fora das ferramentas oferecidas, como a consulta em lote.",
      ],
    },
    {
      heading: "Registro e auditoria",
      paragraphs: [
        "Toda operação fica registrada: quem fez, quando, o que foi consultado e com qual finalidade. O registro pode ser usado para apurar uso indevido e para atender autoridades.",
      ],
    },
    {
      heading: "Suspensão e encerramento",
      paragraphs: [
        "A Zentra pode suspender um acesso em caso de uso indevido. O encerramento da relação segue o que o contrato define.",
      ],
    },
    {
      heading: "Disponibilidade e responsabilidade",
      paragraphs: [
        "O sistema pode ter pausas para manutenção ou por indisponibilidade de fornecedores. Os dados vêm de fontes licenciadas e podem conter imprecisões. A decisão de crédito é sempre do cliente.",
      ],
    },
    {
      heading: "Propriedade",
      paragraphs: [
        "A marca, o sistema e o site são da Zentra. O cliente não pode copiar nem reproduzir o sistema.",
      ],
    },
    {
      heading: "Privacidade",
      paragraphs: [
        "O tratamento de dados está descrito na política de privacidade, disponível em ",
      ],
      contact: { label: links.privacy, href: links.privacy, after: "." },
    },
    {
      heading: "Alterações",
      paragraphs: [
        "Estes termos podem mudar. A data da última atualização fica sempre no topo desta página.",
      ],
    },
    {
      heading: "Lei e foro",
      paragraphs: [
        "Valem as leis brasileiras. O foro é a definir no contrato.",
      ],
    },
    {
      heading: "Contato",
      paragraphs: ["Para dúvidas sobre estes termos, escreva para "],
      contact: { label: "contato@zentrabusiness.com.br", href: links.email, after: "." },
    },
  ],
};
