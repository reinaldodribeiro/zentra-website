import type { ArticleContent } from "./types";

export const enriquecimentoDeDadosCadastrais: ArticleContent = {
  slug: "enriquecimento-de-dados-cadastrais",
  path: "/artigos/enriquecimento-de-dados-cadastrais",
  metaTitle: "Enriquecimento de dados cadastrais no consignado",
  metaDescription:
    "Enriquecimento de dados cadastrais no consignado: o que entra no cadastro, como usar cada informação na abordagem e como enriquecer a carteira em lote.",
  h1: "Enriquecimento de dados cadastrais: o que entra no cadastro e como usar na operação",
  summary:
    "Um cadastro com nome e um telefone antigo não sustenta uma operação de consignado. Este artigo explica o que é enriquecimento de dados cadastrais, que informações ele acrescenta e como cada uma muda a abordagem da equipe.",
  publishedAt: "2026-10-06",
  updatedAt: "2026-10-06",
  topic: {
    label: "Higienização e enriquecimento de base para crédito consignado",
    href: "/credito-consignado",
  },
  sections: [
    {
      heading: "O que é enriquecimento de dados cadastrais",
      paragraphs: [
        "Enriquecer um cadastro é acrescentar a ele a informação que falta. A empresa parte do que já tem, normalmente o nome e o documento do cliente, e recebe de volta os dados que completam a ficha: outros telefones, e-mails, endereços e informações sobre trabalho e renda.",
        "Não é o mesmo que higienizar. A higienização confere o que já está no cadastro e aponta o que envelheceu. O enriquecimento traz o que nunca esteve lá. Na prática as duas coisas acontecem juntas, porque a mesma consulta que mostra que o telefone antigo perdeu a validade devolve o telefone novo.",
      ],
    },
    {
      heading: "O que entra no cadastro enriquecido",
      paragraphs: [
        "Na Zentra, uma consulta devolve o cadastro completo de uma vez, organizado em dez blocos.",
      ],
      items: [
        "Identificação do titular.",
        "Telefones, na ordem de quem atende primeiro.",
        "E-mails, com qualificação.",
        "Endereços, com qualificação.",
        "Pessoas ligadas ao titular.",
        "Participações em empresas.",
        "Vínculos de trabalho.",
        "Veículos.",
        "Renda presumida e ocupação.",
        "Score de crédito.",
      ],
      closing: [
        "Nem todo cliente tem informação em todos os blocos. O que existe volta junto, na mesma consulta, sem que a equipe precise pedir um bloco de cada vez.",
      ],
    },
    {
      heading: "Como cada informação muda a abordagem",
      paragraphs: [
        "Dado cadastral só vale quando muda uma decisão. Estes são os usos mais comuns em uma operação de consignado.",
      ],
      subsections: [
        {
          heading: "Contato: por onde começar",
          paragraphs: [
            "Cada telefone, e-mail e endereço chega com uma nota de qualificação, e o sistema mostra primeiro o contato com mais chance de funcionar. O operador não escolhe o número no palpite: começa pelo primeiro da lista e só passa ao seguinte se não der certo.",
          ],
        },
        {
          heading: "Perfil: quem cabe na oferta",
          paragraphs: [
            "Vínculos de trabalho, ocupação e renda presumida ajudam a separar quem ainda cabe na oferta de quem mudou de situação. A equipe gasta a ligação com quem pode contratar.",
          ],
        },
        {
          heading: "Alternativa: quando o titular não atende",
          paragraphs: [
            "Quando nenhum contato direto funciona, uma pessoa ligada ao cliente pode ser consultada em seguida. É uma consulta nova, com finalidade declarada e registro próprio, como qualquer outra.",
          ],
        },
        {
          heading: "Proteção: o que não deve ser discado",
          paragraphs: [
            "Quando a consulta aponta indicação de óbito, ela é bloqueada e sinalizada. O contato sai da fila antes de alguém ligar para a família.",
          ],
        },
      ],
    },
    {
      heading: "Enriquecimento em lote da carteira",
      paragraphs: [
        "Enriquecer um cliente por vez serve para o atendimento do dia. Para a carteira, existe a consulta em lote: você envia a planilha com o CPF de cada cliente, o sistema consulta linha por linha e devolve a planilha preenchida.",
        "A previsão de término aparece no envio e considera os outros lotes em andamento. Cada linha termina com um desfecho, encontrada, sem resultado ou bloqueada por óbito, e o aviso de conclusão chega quando o lote acaba. A consulta em lote depende do plano contratado.",
      ],
    },
    {
      heading: "Enriquecer com finalidade e registro",
      paragraphs: [
        "Enriquecimento de dados cadastrais é tratamento de dado pessoal. A LGPD pede que a empresa tenha um motivo legítimo para consultar e que consiga demonstrar o que fez.",
        "Por isso, na Zentra, toda consulta nasce com uma finalidade declarada e fica registrada com usuário, data e hora. O histórico pode ser pesquisado por mês e por documento, e os documentos de terceiros aparecem mascarados na tela. O acesso é por contrato, cada pessoa da equipe tem o próprio usuário, e o segundo fator de autenticação pode ser ativado por usuário.",
        "Esse cuidado não é detalhe jurídico. É o que permite à operação usar o dado enriquecido sem ficar exposta no dia em que um cliente ou uma fiscalização perguntar de onde veio aquela ligação.",
      ],
    },
    {
      heading: "Três erros comuns ao enriquecer uma base",
      paragraphs: ["Vale evitar os tropeços que mais aparecem."],
      items: [
        "Enriquecer sem ordenar: receber cinco telefones por cliente e deixar a equipe escolher qual discar.",
        "Enriquecer uma vez e nunca mais: o dado novo também envelhece, e a carteira volta ao ponto de partida.",
        "Enriquecer sem registro: resolver o contato e não conseguir provar por que o cliente foi consultado.",
      ],
    },
    {
      heading: "Por onde começar",
      paragraphs: [
        "Escolha uma parte da carteira em que o cadastro esteja mais pobre, por exemplo os contratos mais antigos, e processe em lote. Veja quantos clientes voltaram com contato novo e quanto a taxa de atendimento mudou.",
        "Para ver o resultado com a sua carteira, conheça a página de higienização e enriquecimento de base para crédito consignado ou fale com a equipe da Zentra.",
      ],
    },
  ],
};
