import { brandNoticeShort } from "../site.ts";
import type { TopicPageContent } from "./types";

export const disparoWhatsapp: TopicPageContent = {
  path: "/disparo-whatsapp",
  metaTitle: "Disparo, atendimento e fluxos pelo WhatsApp oficial",
  metaDescription:
    "Disparo em massa, atendimento com funil e fluxos automáticos pelo WhatsApp oficial, pela API da Meta, com o número da sua empresa. Fale com a Zentra.",
  updatedAt: "2026-11-13",
  kicker: "// WHATSAPP OFICIAL",
  breadcrumbLabel: "WhatsApp oficial",
  h1: "WhatsApp oficial para a operação: disparo em massa, atendimento e fluxos",
  intro: [
    "Mensagem em massa só ajuda a operação quando sai por um caminho que não põe o número da empresa em risco, e só vale quando alguém atende quem responde. A Zentra faz as duas coisas pelo WhatsApp oficial, pela API da Meta: você conecta o seu próprio número, dispara com modelo aprovado, atende as respostas num funil dentro do sistema e deixa os fluxos automáticos cuidarem das perguntas de sempre.",
    "Sem robô paralelo, sem aplicativo paralelo e sem chip descartável. O envio e o atendimento saem do número da empresa e ficam dentro do mesmo sistema em que a carteira é tratada.",
  ],
  sections: [
    {
      heading: "Disparo em massa pelo WhatsApp oficial",
      paragraphs: [
        "É a etapa que vem depois de tratar a base. Com a carteira higienizada e os contatos localizados, a equipe precisa falar com quem tem celular válido. O disparo faz isso pelo canal oficial do WhatsApp, a partir do número da própria empresa.",
      ],
      items: [
        "O número de WhatsApp da empresa, conectado pelo cadastro oficial da Meta, dentro do sistema",
        "Somente modelo de mensagem aprovado pela Meta",
        "Disparo para o resultado de uma consulta em lote ou para uma lista própria de telefones",
        "Conferência da planilha antes do envio, com a lista de quem fica de fora",
        "Acompanhamento de cada envio, com cancelamento e reenvio das mensagens que falharam",
        "Mensagens que saem em ritmo controlado",
      ],
    },
    {
      heading: "Como funciona o disparo de WhatsApp em três passos",
      paragraphs: [
        "O caminho é o mesmo para qualquer operação, do correspondente bancário ao escritório de advocacia.",
      ],
      subsections: [
        {
          heading: "1. Conecte o número da empresa",
          paragraphs: [
            "Dentro do sistema, você conecta o seu número de WhatsApp pelo cadastro oficial da Meta. O número continua sendo o da empresa: não há chip descartável nem aplicativo paralelo no meio.",
          ],
        },
        {
          heading: "2. Escreva o modelo de mensagem e acompanhe a aprovação",
          paragraphs: [
            "O texto que sai nos disparos é um modelo de mensagem, e a Meta precisa aprová-lo antes. Você escreve o modelo no próprio sistema, marca as lacunas que serão preenchidas para cada pessoa e acompanha a situação até a aprovação. Mensagem sem modelo aprovado não é enviada.",
          ],
        },
        {
          heading: "3. Escolha quem recebe e dispare",
          paragraphs: [
            "Com o modelo aprovado, você define o público, revisa quem vai receber e envia. O sistema manda as mensagens em ritmo controlado e mostra o andamento até o fim.",
          ],
        },
      ],
    },
    {
      heading: "Dois jeitos de montar a lista de quem recebe a mensagem em massa",
      paragraphs: [
        "A mensagem em massa pode partir de uma consulta em lote que a equipe já fez ou de uma lista que a empresa já tem.",
      ],
      subsections: [
        {
          heading: "A partir de uma consulta em lote concluída",
          paragraphs: [
            "O disparo usa as pessoas do lote e escolhe o melhor celular de cada uma. Você aplica filtros para limitar o público e revisa a lista de quem vai receber antes de enviar, podendo tirar alguém da lista. Em vez de montar uma planilha à mão, a equipe dispara direto do resultado da higienização.",
          ],
        },
        {
          heading: "A partir de uma lista própria de telefones",
          paragraphs: [
            "Se a empresa já tem a lista, basta importar a planilha, em .xlsx ou .csv. Cada coluna preenche uma lacuna do modelo de mensagem, e por isso cada pessoa recebe um texto personalizado: o nome, o valor, a data ou o que mais o modelo pedir.",
          ],
        },
      ],
    },
    {
      heading: "Conferência antes do envio e acompanhamento depois",
      paragraphs: [
        "Antes de enviar, o sistema confere a planilha. Ele aponta telefone inválido, lacuna vazia e número repetido, e mostra quem fica de fora e por quê. A equipe corrige o que for possível e só então dispara.",
        "Depois do envio, o acompanhamento é por mensagem. Você vê quantas saíram, quantas falharam e o motivo de cada falha. Se for preciso, cancela o disparo no meio do caminho e reenvia as mensagens que falharam, sem recomeçar do zero.",
      ],
      items: [
        "Telefone inválido, lacuna vazia e repetidos apontados antes de enviar",
        "Lista de quem fica de fora do disparo",
        "Quantidade de mensagens enviadas e de falhas",
        "Motivo de cada falha",
        "Cancelamento do disparo em andamento",
        "Reenvio das mensagens que falharam",
      ],
    },
    {
      heading: "Por que o WhatsApp oficial, pela API da Meta",
      paragraphs: [
        "Disparo em massa por robô, por aplicativo paralelo ou por chip descartável trata o número da empresa como se fosse descartável. Para quem vive de carteira de clientes, o número é patrimônio: é por ele que o cliente reconhece a empresa.",
        "A Zentra usa só o WhatsApp oficial, pela API da Meta. O número é o da empresa, a mensagem é um modelo aprovado e cada envio fica registrado no sistema.",
      ],
      notice: brandNoticeShort,
    },
    {
      heading: "Só para quem aceitou receber mensagens da empresa",
      paragraphs: [
        "O disparo deve ser enviado apenas a quem aceitou receber mensagens da empresa. A escolha do público e a finalidade do envio são da empresa que dispara, e o sistema deixa registrado o que foi enviado, para quem e quando.",
      ],
    },
    {
      heading: "Atendimento: as respostas chegam num funil, dentro da Zentra",
      paragraphs: [
        "Quem recebe a mensagem responde. O atendimento abre em tela cheia dentro da Zentra, para quem tem o direito ao atendimento no plano, com todos os números conectados da empresa na mesma tela.",
      ],
      items: [
        "Funil em kanban: Novos, Em atendimento, Aguardando e Finalizados",
        "Conversa com anexos, áudio, emoji e notas privadas da equipe",
        "Etiquetas, follow-up e agenda",
        "Busca por contato, empresa ou documento",
        "Reativar a conversa depois das 24 horas com um modelo aprovado",
      ],
    },
    {
      heading: "Fluxos automáticos: o número responde sozinho",
      paragraphs: [
        "Para o primeiro atendimento fora do horário, a triagem por interesse e as respostas às perguntas de sempre, o administrador monta fluxos automáticos num editor visual: o gatilho é uma mensagem no número da empresa, as condições separam os caminhos e as respostas saem sozinhas.",
      ],
      items: [
        "Editor visual, sem código",
        "Gatilho no número, condições e respostas automáticas",
        "Um fluxo ativo responde a todo mundo que escreve para o número, por isso só o administrador o liga e desliga",
      ],
      closing: ["O fluxo entrega a conversa pronta para a equipe continuar no funil de atendimento."],
    },
    {
      heading: "Para quem serve o WhatsApp oficial na Zentra",
      paragraphs: [
        "Qualquer operação que precise falar com muita gente, com texto próprio, a partir de uma base organizada.",
      ],
      items: [
        "Promotoras, correspondentes bancários e consultorias de crédito consignado, para retomar o contato com a carteira depois da higienização",
        "Escritórios de advocacia, para avisar clientes e reativar quem já procurou o escritório um dia",
        "Equipes que já têm uma lista própria de telefones e querem enviar uma mensagem personalizada para cada pessoa",
      ],
      closing: [
        "O WhatsApp oficial se soma à consulta de contatos, à consulta em lote e à análise de crédito: a base é tratada, os celulares válidos aparecem, a mensagem sai pelo canal oficial e a resposta é atendida no mesmo lugar. O acesso, como o do restante da Zentra, nasce de um contrato.",
      ],
    },
  ],
  faq: {
    kicker: "// DÚVIDAS COMUNS",
    title: "Perguntas sobre o WhatsApp oficial na Zentra.",
    items: [
      {
        question: "Como funciona o disparo de WhatsApp em massa da Zentra?",
        answer:
          "Você conecta o número de WhatsApp da empresa pelo cadastro oficial da Meta, escreve um modelo de mensagem, espera a aprovação e escolhe quem recebe: as pessoas de uma consulta em lote ou uma lista própria de telefones. O envio sai em ritmo controlado e você acompanha cada mensagem.",
      },
      {
        question: "Quem paga as mensagens?",
        answer:
          "A Meta cobra cada mensagem direto no cartão do cliente. A Zentra não cobra por mensagem.",
      },
      {
        question: "Posso enviar qualquer texto?",
        answer:
          "Não. Só sai modelo de mensagem aprovado pela Meta. Você escreve o modelo no sistema, acompanha a aprovação e, com ele aprovado, faz o disparo.",
      },
      {
        question: "Posso usar uma lista de telefones que eu já tenho?",
        answer:
          "Pode. Importe a planilha em .xlsx ou .csv. Cada coluna preenche uma lacuna do modelo, e a mensagem sai personalizada para cada pessoa. O sistema confere a planilha antes de enviar e mostra quem fica de fora.",
      },
      {
        question: "É robô ou aplicativo paralelo?",
        answer:
          "Não. É o WhatsApp oficial, pela API da Meta. Não há robô, aplicativo paralelo nem chip descartável: o envio sai do número da sua empresa.",
      },
      {
        question: "Para quem posso enviar?",
        answer:
          "Somente para quem aceitou receber mensagens da empresa. Depois do envio, você acompanha quantas mensagens saíram, quantas falharam e por quê, e pode cancelar ou reenviar as que falharam.",
      },
      {
        question: "O atendimento é um chat ao vivo?",
        answer:
          "Sim. A conversa com quem respondeu acontece dentro da Zentra, num funil por etapas, com etiquetas, agenda e notas da equipe. O atendimento faz parte do plano que inclui o WhatsApp oficial com atendimento.",
      },
      {
        question: "Posso ter um chatbot?",
        answer:
          "Sim, pelos fluxos automáticos: o administrador monta o fluxo num editor visual, com gatilho no número, condições e respostas. Um fluxo ativo responde a todo mundo que escreve, por isso só o administrador o liga e desliga.",
      },
      {
        question: "Posso ter mais de um número?",
        answer:
          "Sim, até o limite definido no contrato. Cada modelo de mensagem pertence a um número, e o atendimento mostra todos na mesma tela.",
      },
    ],
  },
  related: {
    title: "Continue pelo site",
    links: [
      { label: "Análise de crédito de clientes e empresas", href: "/analise-de-credito" },
      { label: "Higienização e enriquecimento de base para crédito consignado", href: "/credito-consignado" },
      { label: "Consulta de processos e localização de partes para advogados", href: "/advocacia" },
      { label: "Artigos sobre consignado, LGPD e processos", href: "/artigos" },
    ],
  },
  serviceIndex: 2,
};
