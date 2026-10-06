import type { ArticleContent } from "./types";

export const higienizacaoDeMailingConsignado: ArticleContent = {
  slug: "higienizacao-de-mailing-consignado",
  path: "/artigos/higienizacao-de-mailing-consignado",
  metaTitle: "Higienização de mailing para consignado: como fazer",
  metaDescription:
    "Higienização de mailing para consignado: como limpar a lista antes de discar, o que conferir em cada contato e como processar tudo em lote com registro.",
  h1: "Higienização de mailing para consignado: como limpar a lista antes de discar",
  summary:
    "Um mailing sujo custa hora de operador, linha telefônica e paciência do cliente. Este artigo mostra o que é a higienização de mailing, o que conferir em cada contato e como limpar a lista inteira antes de a campanha começar.",
  publishedAt: "2026-10-06",
  updatedAt: "2026-10-06",
  topic: {
    label: "Higienização e enriquecimento de base para crédito consignado",
    href: "/credito-consignado",
  },
  sections: [
    {
      heading: "O que é higienização de mailing",
      paragraphs: [
        "Mailing é a lista de contatos que a operação usa em uma campanha: os clientes da carteira que vão receber a ligação, a mensagem ou a carta. Higienização de mailing é o trabalho de conferir essa lista antes de usar, para tirar o que não serve e corrigir o que mudou.",
        "A diferença para a higienização da base inteira é o momento. A base é o cadastro permanente da empresa. O mailing é o recorte que sai dela para uma ação com data marcada. Limpar o mailing é a última conferência antes de gastar o tempo da equipe.",
      ],
    },
    {
      heading: "Quanto custa discar um mailing sujo",
      paragraphs: [
        "O custo de uma lista ruim não aparece em uma linha só do relatório. Ele se espalha pela operação.",
      ],
      items: [
        "Hora de operador gasta com número que não existe mais ou que pertence a outra pessoa.",
        "Ligação para quem nunca foi cliente, que gera reclamação e desgasta o nome da empresa.",
        "Contato com a família de quem já faleceu, o pior atendimento que uma operação pode fazer.",
        "Campanha encerrada com a impressão de que a carteira não responde, quando o problema era o contato.",
      ],
      closing: [
        "Em todos os casos, a equipe trabalhou e a conversa não aconteceu. Higienizar o mailing antes de discar é mais barato do que descobrir o erro ligação por ligação.",
      ],
    },
    {
      heading: "O que conferir em cada contato",
      paragraphs: [
        "Uma higienização de mailing bem feita responde a quatro perguntas sobre cada cliente da lista.",
      ],
      items: [
        "O telefone ainda é dele? Se houver mais de um número, qual deve ser tentado primeiro?",
        "O e-mail e o endereço continuam válidos, para o caso de a campanha não ser por voz?",
        "O cliente ainda cabe na oferta, pelo vínculo de trabalho e pela renda presumida?",
        "Existe indicação de óbito? Se existe, o contato sai da lista.",
      ],
      closing: [
        "Na Zentra, a consulta devolve o cadastro completo de uma vez, e cada telefone, e-mail e endereço chega com uma nota de qualificação. O sistema põe na frente o contato com mais chance de funcionar. Quando há indicação de óbito, a consulta é bloqueada e sinalizada, e a linha não segue para a discagem.",
      ],
    },
    {
      heading: "Mailing higienizado em lote",
      paragraphs: [
        "Ninguém confere um mailing de milhares de linhas uma por uma. O caminho é a consulta em lote: você envia a planilha com o CPF de cada cliente, e o sistema consulta linha por linha e devolve a planilha preenchida.",
        "No envio, o sistema mostra a previsão de término, que considera os outros lotes em andamento. A equipe sabe se o mailing fica pronto para a campanha da tarde ou para a do dia seguinte. Quando o lote termina, o aviso chega sem que alguém precise ficar olhando a tela.",
        "Cada linha volta com um desfecho: encontrada, sem resultado ou bloqueada por óbito. A planilha de resultado traz o CPF que você enviou, para casar com a lista de origem, e os contatos na ordem em que vale tentar. A consulta em lote depende do plano contratado, e vale confirmar isso na proposta.",
      ],
    },
    {
      heading: "De quanto em quanto tempo higienizar",
      paragraphs: [
        "Não existe um prazo único, porque cada carteira envelhece em um ritmo. Três sinais mostram que chegou a hora.",
      ],
      items: [
        "A taxa de atendimento da campanha caiu em relação à anterior, com a mesma equipe e o mesmo horário.",
        "O mailing foi montado há meses e ficou parado esperando a campanha.",
        "A lista reúne contratos antigos, de clientes com quem a empresa não fala há muito tempo.",
      ],
      closing: [
        "Uma regra prática é higienizar toda vez que um mailing novo for montado, e não só quando o resultado piorar. O contato é conferido uma vez e a campanha inteira aproveita.",
      ],
    },
    {
      heading: "Mailing e LGPD: a finalidade vem antes",
      paragraphs: [
        "Higienizar um mailing é tratar dado pessoal, e a LGPD se aplica do começo ao fim. A empresa precisa saber dizer por que consultou cada cliente e quem fez a consulta.",
        "Na Zentra, toda consulta exige uma finalidade declarada, inclusive as do lote, e fica registrada com usuário, data e hora. O histórico pode ser pesquisado por mês e por documento. Se um cliente ou uma fiscalização perguntar por que aquele contato foi consultado, a resposta está no registro, e não na memória de alguém.",
        "O acesso também é controlado: cada pessoa da equipe entra com o próprio usuário, e o segundo fator de autenticação pode ser ativado por usuário. Um mailing limpo com acesso aberto a qualquer um troca um problema por outro.",
      ],
    },
    {
      heading: "Como começar com um mailing pequeno",
      paragraphs: [
        "O teste mais simples é pegar o mailing da próxima campanha, ou uma parte dele, e processar em lote antes de entregar para a equipe. Compare a taxa de atendimento com a da campanha anterior, feita sem higienização. O número mostra se vale repetir.",
        "Para ver como o lote funciona com a sua planilha, conheça a página de higienização e enriquecimento de base para crédito consignado ou fale com a equipe da Zentra.",
      ],
    },
  ],
};
