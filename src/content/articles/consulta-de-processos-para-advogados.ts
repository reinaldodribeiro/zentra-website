import type { ArticleContent } from "./types";

export const consultaDeProcessosParaAdvogados: ArticleContent = {
  slug: "consulta-de-processos-para-advogados",
  path: "/artigos/consulta-de-processos-para-advogados",
  metaTitle: "Consulta de processos judiciais para advogados",
  metaDescription:
    "Consulta de processos judiciais para advogados: partes, movimentações e localização de quem está do outro lado, com finalidade e registro de cada consulta.",
  h1: "Consulta de processos judiciais para advogados: partes, movimentações e localização",
  summary:
    "Acompanhar o processo é metade do trabalho. A outra metade é encontrar as pessoas por trás dele. Veja como a consulta de processos judiciais para advogados une partes, movimentações e localização.",
  publishedAt: "2026-10-01",
  updatedAt: "2026-10-01",
  topic: {
    label: "Consulta de processos judiciais e localização de partes para advogados",
    href: "/advocacia",
  },
  sections: [
    {
      heading: "O processo é o começo, não o fim",
      paragraphs: [
        "Para o advogado, o número do processo abre uma lista de perguntas. Quem são as partes? Quem as representa? O que andou desde a última vez? E, quase sempre, uma pergunta a mais: como falar com alguém que está nos autos, mas que mudou de endereço e de telefone?",
        "Responder a tudo isso costuma exigir lugares diferentes: um para os andamentos, outro para o cadastro, outro para o contato. Cada troca de tela é tempo do escritório, e tempo de escritório é custo.",
        "Este artigo mostra como reunir o acompanhamento e a localização no mesmo fluxo, sem perder o registro de quem consultou o quê.",
      ],
    },
    {
      heading: "Partes, advogados e número do processo",
      paragraphs: [
        "A consulta começa pelo número do processo, no padrão do CNJ. A Zentra devolve o processo com as partes, os advogados e as movimentações. O número é validado antes da consulta, o que evita gastar uma consulta com um número digitado errado.",
        "Quando o ponto de partida não é o número, e sim a pessoa, o caminho é buscar pelo CPF ou pelo CNPJ. A resposta traz o conjunto de processos em que aquele documento aparece, com o total encontrado. É um jeito rápido de saber se o devedor, o reclamante ou o ex-cliente tem outras ações em andamento.",
      ],
      items: [
        "Número do processo no padrão do CNJ.",
        "Partes e advogados de cada processo.",
        "Movimentações do processo.",
        "Todos os processos de um documento, com o total.",
      ],
    },
    {
      heading: "Movimentações: o que andou no processo",
      paragraphs: [
        "A movimentação é o histórico do processo, em ordem. Ler as movimentações permite conferir em que fase o caso está, se houve decisão recente e se existe prazo correndo.",
        "Uma consulta por processo mostra as movimentações junto com as partes. O escritório não precisa montar o quadro a partir de fontes separadas: o andamento, as pessoas e os advogados chegam na mesma resposta.",
        "A consulta de um processo pode ser repetida quando o escritório precisa conferir novidades, e cada repetição fica registrada, com usuário e horário.",
      ],
    },
    {
      heading: "Localizar a parte a partir do processo",
      paragraphs: [
        "Esta é a etapa que mais pesa na rotina de muitos escritórios. A parte aparece nos autos, mas o endereço é antigo, o telefone não atende e a intimação volta. Para o escritório que cobra, negocia ou precisa da testemunha, sem contato não há próximo passo.",
        "A partir de uma parte do processo, a consulta seguinte abre o cadastro dela: telefones na ordem de quem atende primeiro, e-mails, endereços, vínculos de trabalho e empresas em que participa. O operador escolhe a parte na lista e a consulta segue, sem digitar o documento de novo.",
        "Quando só se tem o nome, a busca aceita outros critérios, como cidade, telefone, e-mail ou placa, e devolve uma lista de candidatos com cidade, UF e idade. Escolhido o candidato certo, abre-se o cadastro completo.",
      ],
    },
    {
      heading: "Carteira do escritório em lote",
      paragraphs: [
        "Escritórios previdenciários, trabalhistas e de recuperação de crédito trabalham com carteiras grandes. Consultar cliente por cliente não escala.",
        "No lote, o escritório envia uma planilha e recebe de volta o resultado por linha, com previsão de término e aviso quando termina. Dá para consultar processos por número, por documento, ou localizar pessoas e empresas da carteira de uma vez. A consulta em lote depende do plano contratado.",
      ],
    },
    {
      heading: "Finalidade declarada e registro",
      paragraphs: [
        "Dados de processo e de pessoas são dados pessoais, e a LGPD vale para o escritório como vale para qualquer empresa. Toda consulta na Zentra exige uma finalidade, como o acompanhamento de um processo do cliente ou a localização de uma parte para uma cobrança, e o sistema grava quem consultou e quando.",
        "O histórico pode ser filtrado por mês e pesquisado por documento ou pelo número do processo. Se um dia alguém questionar por que um dado foi consultado, o escritório responde com um registro, e não de memória.",
        "Esta é uma visão geral e não substitui a análise jurídica de cada escritório sobre a base legal e os deveres de sigilo que valem para a sua atuação.",
      ],
    },
    {
      heading: "Para começar",
      paragraphs: [
        "Pegue um caso em que você precisa de duas coisas: o andamento do processo e o contato da outra parte. Consulte o número, abra a parte e veja quanto do trabalho cabe em um só lugar.",
        "Para entender como a consulta serve a cada especialidade, conheça a página de consulta de processos judiciais e localização de partes para advogados ou fale com a equipe da Zentra.",
      ],
    },
  ],
};
