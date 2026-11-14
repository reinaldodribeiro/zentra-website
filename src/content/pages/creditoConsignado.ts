import { brandNoticeShort } from "../site.ts";
import type { TopicPageContent } from "./types";

export const creditoConsignado: TopicPageContent = {
  path: "/credito-consignado",
  metaTitle: "Higienização de base para crédito consignado",
  metaDescription:
    "Higienização e enriquecimento de base para crédito consignado: telefone atualizado, consulta em lote e registro de cada consulta. Fale com a Zentra.",
  updatedAt: "2026-11-13",
  kicker: "// CRÉDITO CONSIGNADO",
  breadcrumbLabel: "Crédito consignado",
  h1: "Higienização e enriquecimento de base para crédito consignado",
  intro: [
    "Toda carteira de consignado envelhece. O cliente troca de número, muda de endereço, sai do emprego, e a equipe continua ligando para telefones que já não atendem. A Zentra devolve contatos atualizados e na ordem de quem atende primeiro, para que a operação fale com mais gente e ligue menos.",
    "Esta página mostra como funciona a higienização e o enriquecimento de base para crédito consignado: o que volta em cada consulta, como processar a carteira inteira em lote, como montar listas de servidores públicos prontas para discar e como cada consulta fica registrada, com finalidade, para o dia em que alguém perguntar.",
  ],
  sections: [
    {
      heading: "Por que a carteira para de atender",
      paragraphs: [
        "Uma base de consignado é construída em momentos diferentes e cada cadastro envelhece no seu ritmo. Com o tempo, três problemas se somam.",
      ],
      items: [
        "Telefones que mudaram ou que nunca foram do cliente, e que a equipe só descobre depois de discar.",
        "Endereços e e-mails antigos, que fazem a comunicação voltar sem resposta.",
        "Clientes que trocaram de emprego ou de situação e já não cabem na oferta que a equipe ia fazer.",
      ],
      closing: [
        "O resultado é tempo de discagem gasto com contato errado e uma carteira que parece grande no papel e pequena na prática. Higienizar é devolver à carteira o contato certo, com a qualidade que permite trabalhar.",
      ],
    },
    {
      heading: "O que a Zentra devolve em uma consulta",
      paragraphs: [
        "Uma consulta traz o cadastro completo de uma vez, sem somar consulta por consulta. São dez blocos de dados:",
      ],
      items: [
        "Identificação do titular",
        "Telefones, na ordem de quem atende primeiro",
        "E-mails, com qualificação",
        "Endereços, com qualificação",
        "Pessoas ligadas",
        "Participações em empresas",
        "Vínculos de trabalho",
        "Veículos",
        "Renda presumida e ocupação",
        "Score de crédito",
      ],
      closing: [
        "A ordem dos telefones é o ponto que mais muda o dia da equipe. Cada telefone, e-mail e endereço chega com uma nota de qualificação, e o sistema mostra primeiro o contato com mais chance de funcionar. A equipe liga menos e fala mais.",
        "Os outros blocos ajudam a decidir a abordagem. Vínculos de trabalho e renda presumida mostram quem ainda cabe na oferta. Quando o contato direto falha, uma pessoa ligada ao cliente pode ser consultada em seguida, como uma consulta nova, com finalidade e registro.",
        "Quando a consulta aponta indicação de óbito, ela é bloqueada e sinalizada, para que ninguém ligue para quem não atende mais.",
        "Para servidor, aposentado ou pensionista federal, a consulta traz ainda o vínculo, a remuneração publicada e a margem consignável estimada para empréstimo, cartão e cartão benefício, calculada sobre a remuneração publicada. É uma estimativa para orientar a abordagem, nunca a margem oficial do órgão pagador.",
      ],
    },
    {
      heading: "Higienização em lote da carteira inteira",
      paragraphs: [
        "Quando o problema é a carteira e não um cliente, a consulta em lote resolve na escala. Você envia a planilha, escolhe o tipo do lote e o sistema consulta linha por linha, sem que ninguém precise ficar na tela.",
      ],
      items: [
        "Envie a planilha da carteira, com o CPF de cada cliente. O nome é opcional.",
        "Veja a previsão de término, que já conta os outros lotes abertos na fila.",
        "Deixe rodar. Os lotes abertos se revezam, e nenhum fica parado esperando outro acabar.",
        "Receba a planilha de volta, preenchida, com o desfecho e o motivo de cada linha.",
        "Filtre o resultado por score, renda, UF, aposentado, consignado, nota do telefone e margem estimada mínima, e baixe só as linhas que passam no filtro.",
        "Use o resultado direto na discagem, com os telefones já na ordem certa.",
      ],
      closing: [
        "Quando o lote termina, o sistema avisa quem o enviou. Para higienizar quem não tem CPF na planilha, existe um tipo de lote por nome e UF, que devolve os candidatos encontrados com o cadastro básico.",
        "A planilha traz também a margem estimada de quem é servidor federal, nas colunas de empréstimo, cartão e cartão benefício.",
      ],
    },
    {
      id: "servidores",
      heading: "Listas de servidores públicos prontas para discar",
      paragraphs: [
        "Além da carteira que você já tem, a Zentra monta listas de servidores públicos para a operação de consignado, a partir das folhas publicadas nos portais de transparência das prefeituras e dos arquivos abertos do governo federal.",
      ],
      items: [
        "Servidores municipais, por cidade, com órgão, cargo, admissão e faixa de líquido",
        "Servidores federais ativos, por UF, aposentados e pensionistas",
        "Filtros por órgão, tipo de vínculo e faixa de líquido e, nas listas federais, margem estimada mínima e indício de consignado",
        "Cada servidor da lista identificado, para a proposta sair certa",
        "Cidade já preparada: a lista fica pronta em segundos. Cidade nova: pronta no dia seguinte, e o sistema avisa",
      ],
      closing: [
        "Cada servidor que entra na lista é uma consulta registrada, com finalidade, e consome a franquia como as outras. A lista sai em planilha, pronta para a discagem.",
        "A margem que a lista federal traz é estimada sobre a remuneração publicada, para orientar a abordagem, nunca a margem oficial do órgão pagador.",
      ],
    },
    {
      heading: "Depois da base tratada, a mensagem para quem tem celular válido",
      paragraphs: [
        "Com a carteira higienizada, o disparo de WhatsApp leva a mensagem aos clientes que têm celular válido. Ele sai pelo WhatsApp oficial, pela API da Meta, com modelo de mensagem aprovado e o número da própria empresa. Pode partir de um lote concluído ou de uma lista própria de telefones, sempre para quem aceitou receber mensagens da empresa.",
      ],
      link: { label: "Ver o disparo pelo WhatsApp oficial", href: "/disparo-whatsapp" },
      highlight: { kicker: "// DISPARO PELO WHATSAPP OFICIAL" },
      notice: brandNoticeShort,
    },
    {
      heading: "Para promotoras, correspondentes e consultorias",
      paragraphs: [
        "A Zentra foi pensada para quem opera crédito consignado todos os dias. O uso muda de uma operação para outra, mas o ganho é o mesmo: menos ligação perdida e mais cliente encontrado.",
      ],
      items: [
        "Promotoras de crédito: reativar a carteira e atualizar o contato antes de cada campanha.",
        "Correspondentes bancários: localizar o cliente para retomar uma proposta que parou.",
        "Consultorias de consignado: higienizar a base do cliente antes de começar o trabalho.",
        "Operações de portabilidade: encontrar o contato certo de quem tem contrato em outro banco.",
        "Equipes de cobrança: achar o telefone que atende, em vez de repetir o que não atende.",
      ],
      closing: [
        "Cada pessoa da equipe entra com o próprio acesso, com segundo fator por aplicativo. O administrador vê o consumo de cada usuário, mês a mês, e desliga um acesso na hora quando alguém sai.",
      ],
    },
    {
      heading: "Antes da proposta, a análise de crédito",
      paragraphs: [
        "Localizado o cliente, a análise de crédito mostra score com faixa, restrições e cadastro positivo antes de a proposta sair, numa tela só e em PDF.",
      ],
      link: { label: "Ver a análise de crédito de clientes e empresas", href: "/analise-de-credito" },
      highlight: { kicker: "// ANÁLISE DE CRÉDITO" },
    },
    {
      heading: "LGPD no consignado: finalidade e registro em toda consulta",
      paragraphs: [
        "A LGPD pede que todo uso de dado tenha finalidade, base legal e registro. Uma fiscalização olha o tratamento: para que o dado foi usado, por quem e quando.",
        "Na Zentra, nenhuma consulta acontece sem finalidade declarada. Cada uma grava quem consultou, quando, o quê e para quê, e o histórico fica com o cliente, organizado por mês e com busca por documento. Quem perguntar de onde veio o contato e para que ele foi usado encontra a resposta ali, com nome, data e finalidade.",
        "O acesso é sempre por contrato, com plano mensal e franquia de consultas compartilhada entre os usuários da equipe. Não existe consulta avulsa, nem consulta anônima. A política de privacidade, a base legal e o encarregado de dados são públicos.",
      ],
    },
  ],
  faq: {
    kicker: "// DÚVIDAS COMUNS",
    title: "Perguntas sobre higienização de base para consignado.",
    items: [
      {
        question: "Quanto tempo leva um lote?",
        answer:
          "Depende do tamanho da planilha e de quantos lotes estão abertos na fila. O sistema mostra a previsão de término ao enviar e avisa quem enviou quando o lote termina.",
      },
      {
        question: "Funciona com a minha planilha?",
        answer:
          "Funciona com a planilha da sua carteira, desde que cada linha traga o CPF do cliente. O nome é opcional. Quando você só tem nome e UF, o lote por nome devolve os candidatos encontrados. Ao enviar, você escolhe o tipo do lote.",
      },
      {
        question: "Como sei quem consultou?",
        answer:
          "Cada consulta grava quem consultou, quando, o quê e com que finalidade. O histórico mostra tudo mês a mês, com busca por documento, e o administrador acompanha o consumo de cada usuário.",
      },
      {
        question: "A consulta traz só telefone?",
        answer:
          "Não. Uma consulta traz dez blocos: identificação, telefones, e-mails, endereços, pessoas ligadas, participações em empresas, vínculos de trabalho, veículos, renda e ocupação e score.",
      },
      {
        question: "Precisa de contrato?",
        answer:
          "Sim. O acesso nasce de um contrato, com plano mensal e franquia de consultas compartilhada entre os usuários. O plano define se inclui a consulta em lote. Não existe consulta avulsa nem acesso aberto ao público.",
      },
      {
        question: "Vocês vendem lista de servidores?",
        answer:
          "A Zentra monta a lista por contrato, dentro do plano, para quem opera consignado: você escolhe a cidade ou a unidade federal e os filtros, e cada servidor identificado entra como uma consulta registrada. Não existe venda avulsa de lista.",
      },
      {
        question: "O que é a margem estimada?",
        answer:
          "Uma conta feita sobre a remuneração publicada do servidor, aposentado ou pensionista federal, separada em empréstimo, cartão e cartão benefício. Serve para orientar a abordagem; a margem oficial é a do órgão pagador.",
      },
    ],
  },
  related: {
    title: "Continue pelo site",
    links: [
      { label: "Análise de crédito de clientes e empresas", href: "/analise-de-credito" },
      { label: "Consulta de processos e localização de partes para advogados", href: "/advocacia" },
      { label: "Disparo em massa pelo WhatsApp oficial", href: "/disparo-whatsapp" },
      { label: "Artigos sobre consignado, LGPD e higienização", href: "/artigos" },
    ],
  },
  serviceIndex: 0,
};
