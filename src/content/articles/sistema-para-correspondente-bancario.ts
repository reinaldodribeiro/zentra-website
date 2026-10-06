import type { ArticleContent } from "./types";

export const sistemaParaCorrespondenteBancario: ArticleContent = {
  slug: "sistema-para-correspondente-bancario",
  path: "/artigos/sistema-para-correspondente-bancario",
  metaTitle: "Sistema para correspondente bancário: onde entram os dados",
  metaDescription:
    "Sistema para correspondente bancário: o que o sistema de gestão resolve, o que fica de fora e onde entra a plataforma de dados que mantém a carteira viva.",
  h1: "Sistema para correspondente bancário: o que o sistema de gestão não resolve",
  summary:
    "Quem procura um sistema para correspondente bancário costuma pensar na esteira de propostas e na comissão. Este artigo mostra a parte que fica antes disso, o contato com o cliente, e que tipo de ferramenta cuida dela.",
  publishedAt: "2026-10-06",
  updatedAt: "2026-10-06",
  topic: {
    label: "Higienização e enriquecimento de base para crédito consignado",
    href: "/credito-consignado",
  },
  sections: [
    {
      heading: "Os dois sistemas de uma operação de consignado",
      paragraphs: [
        "Uma operação de correspondente bancário ou de promotora de crédito vive de duas coisas: falar com o cliente certo e levar a proposta até o pagamento. São trabalhos diferentes, e cada um pede uma ferramenta.",
        "O primeiro sistema é o de gestão: ele acompanha a proposta do cadastro à comissão. O segundo é o de dados: ele mantém a carteira em condição de ser trabalhada, com contato atualizado e informação para decidir a abordagem. Muita operação investe no primeiro e deixa o segundo por conta de planilhas antigas.",
      ],
    },
    {
      heading: "O que o sistema de gestão resolve",
      paragraphs: [
        "O sistema de gestão do correspondente, que o mercado também chama de sistema corban, organiza o que acontece depois que o cliente disse sim.",
      ],
      items: [
        "Cadastro e acompanhamento das propostas, do envio ao pagamento.",
        "Controle de produção por operador, loja ou parceiro.",
        "Cálculo e conferência de comissão.",
        "Relacionamento com os bancos e as tabelas de cada produto.",
      ],
      closing: [
        "É uma ferramenta necessária, e a Zentra não faz esse papel. A Zentra não digita proposta, não calcula comissão e não substitui o sistema de gestão que a operação já usa.",
      ],
    },
    {
      heading: "O que fica de fora: o contato com o cliente",
      paragraphs: [
        "O sistema de gestão parte do princípio de que a conversa com o cliente aconteceu. Ele não responde ao que vem antes: para quem ligar, em qual número e se o cliente ainda cabe na oferta.",
        "É aí que a operação perde tempo sem perceber. A carteira tem milhares de nomes, a equipe disca, e boa parte das ligações cai em número que mudou de dono ou em linha desligada. Nenhum relatório de produção mostra as propostas que não existiram porque o telefone estava errado.",
      ],
    },
    {
      heading: "Onde entra a plataforma de dados",
      paragraphs: [
        "A plataforma de dados trabalha ao lado do sistema de gestão e cuida da etapa anterior. Na Zentra, isso se traduz em quatro entregas.",
      ],
      items: [
        "Contato atualizado: telefones, e-mails e endereços do cliente, cada um com uma nota de qualificação, na ordem de quem atende primeiro.",
        "Perfil para a abordagem: vínculos de trabalho, ocupação, renda presumida e score de crédito, para saber quem cabe na oferta.",
        "Carteira inteira em lote: você envia a planilha com o CPF de cada cliente e recebe de volta a planilha preenchida, com previsão de término e desfecho por linha.",
        "Proteção na discagem: quando há indicação de óbito, a consulta é bloqueada e sinalizada, e a equipe não liga para a família.",
      ],
      closing: [
        "O resultado do lote sai em planilha. É ela que alimenta a discagem e os cadastros que a operação mantém nas outras ferramentas.",
      ],
    },
    {
      heading: "O que avaliar em um sistema de dados",
      paragraphs: [
        "Quem compara fornecedores de dados para correspondente bancário pode usar esta lista como roteiro.",
      ],
      items: [
        "A consulta devolve o cadastro completo de uma vez, ou cobra um pedaço por vez?",
        "Os contatos vêm ordenados, ou a equipe recebe uma lista de números para adivinhar?",
        "Existe consulta em lote, com previsão de término e aviso de conclusão?",
        "Cada consulta fica registrada, com usuário, data e finalidade?",
        "Cada pessoa da equipe tem o próprio acesso, com segundo fator de autenticação?",
        "O administrador consegue ver quanto cada operador consultou no mês?",
      ],
      closing: [
        "Na Zentra, a resposta às seis perguntas é sim. O acesso nasce de um contrato com a empresa, o administrador cria os usuários da equipe e acompanha o consumo de cada um.",
      ],
    },
    {
      heading: "LGPD: a parte que o correspondente responde",
      paragraphs: [
        "O correspondente trata dado pessoal de cliente todos os dias, e responde por isso. A LGPD pede finalidade para cada tratamento e capacidade de demonstrar o que foi feito.",
        "Um sistema de dados sem registro deixa a operação sem resposta quando alguém pergunta por que um cliente foi consultado. Na Zentra, toda consulta exige uma finalidade declarada, e o histórico pode ser pesquisado por mês e por documento. É o registro que a empresa apresenta ao banco, ao cliente ou à fiscalização.",
      ],
    },
    {
      heading: "Como as duas ferramentas trabalham juntas",
      paragraphs: [
        "A rotina fica simples quando cada sistema faz a sua parte. A carteira passa pelo lote e volta com contato atualizado e ordenado. A equipe liga para quem atende e para quem cabe na oferta. A proposta que nasce da conversa segue para o sistema de gestão, que cuida do resto.",
        "Se a sua operação já tem a gestão resolvida e sente que a carteira rende menos do que deveria, o próximo passo está nos dados. Conheça a página de higienização e enriquecimento de base para crédito consignado ou fale com a equipe da Zentra.",
      ],
    },
  ],
};
