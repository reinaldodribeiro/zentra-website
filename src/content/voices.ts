export type VoiceKey = "inicial" | "consignado" | "advocacia" | "disparo";

export type Voice = {
  demoTitle: string;
  demoBody: string;
  exitTitle: string;
  bubbleText: string;
  finalTitle: string;
  finalBody: string;
  whatsapp: { padrao: string; demo: string; balao: string };
};

export const voices: Record<VoiceKey, Voice> = {
  inicial: {
    demoTitle: "Veja a Zentra funcionando com a sua operação.",
    demoBody: "Uma demonstração de 20 minutos, no seu horário, com a sua operação como exemplo.",
    exitTitle: "Antes de ir: uma demonstração de 20 minutos.",
    bubbleText: "Quer ver o que a Zentra faz pela sua operação?",
    finalTitle: "Pare de ligar no escuro.",
    finalBody: "Conte o tamanho da operação. Em uma conversa você já sai sabendo o que a Zentra devolve para a sua operação.",
    whatsapp: {
      padrao: "Olá, vim pelo site e quero conhecer a Zentra para a minha operação.",
      demo: "Olá, acabei de pedir uma demonstração pelo site. Meu nome é {nome}.",
      balao: "Olá, vim pelo site e quero ver o que a Zentra faz pela minha operação.",
    },
  },
  consignado: {
    demoTitle: "Veja a Zentra funcionando com a sua carteira.",
    demoBody: "Uma demonstração de 20 minutos, no seu horário, com a sua carteira como exemplo.",
    exitTitle: "Antes de ir: uma demonstração de 20 minutos.",
    bubbleText: "Quer saber o que a Zentra devolve para a sua carteira?",
    finalTitle: "Pare de ligar no escuro.",
    finalBody: "Conte o tamanho da operação. Em uma conversa você já sai sabendo o que a Zentra devolve para a sua carteira.",
    whatsapp: {
      padrao: "Olá, vim pelo site e quero conhecer a Zentra para a minha carteira de consignado.",
      demo: "Olá, acabei de pedir uma demonstração para a minha carteira de consignado pelo site. Meu nome é {nome}.",
      balao: "Olá, vim pelo site e quero saber o que a Zentra devolve para a minha carteira de consignado.",
    },
  },
  advocacia: {
    demoTitle: "Veja a Zentra funcionando com os casos do seu escritório.",
    demoBody: "Uma demonstração de 20 minutos, no seu horário, com os processos e as partes do seu escritório como exemplo.",
    exitTitle: "Antes de ir: uma demonstração de 20 minutos para o seu escritório.",
    bubbleText: "Quer ver como a Zentra localiza partes e processos?",
    finalTitle: "Localize a parte. Acompanhe o processo.",
    finalBody: "Conte o tamanho do escritório. Em uma conversa você já sai sabendo o que a Zentra devolve para os seus casos.",
    whatsapp: {
      padrao: "Olá, sou de escritório de advocacia e quero conhecer a consulta de processos da Zentra.",
      demo: "Olá, acabei de pedir uma demonstração para o meu escritório de advocacia pelo site. Meu nome é {nome}.",
      balao: "Olá, vim pelo site e quero ver como a Zentra localiza partes e processos.",
    },
  },
  disparo: {
    demoTitle: "Veja o disparo pelo WhatsApp oficial funcionando.",
    demoBody: "Uma demonstração de 20 minutos, no seu horário, com um disparo de exemplo do começo ao fim.",
    exitTitle: "Antes de ir: uma demonstração do disparo pelo WhatsApp oficial.",
    bubbleText: "Quer ver o disparo pelo WhatsApp oficial?",
    finalTitle: "Trate a base e fale com ela.",
    finalBody: "Conte o tamanho da operação. Em uma conversa você já sai sabendo como o disparo pelo WhatsApp oficial funciona para ela.",
    whatsapp: {
      padrao: "Olá, vim pelo site e quero conhecer o disparo pelo WhatsApp oficial da Zentra.",
      demo: "Olá, acabei de pedir uma demonstração do disparo de WhatsApp pelo site. Meu nome é {nome}.",
      balao: "Olá, vim pelo site e quero ver o disparo pelo WhatsApp oficial da Zentra.",
    },
  },
};

const voiceByPath: Record<string, VoiceKey> = {
  "/credito-consignado": "consignado",
  "/advocacia": "advocacia",
  "/disparo-whatsapp": "disparo",
};

export function voiceForPath(path: string): VoiceKey {
  return voiceByPath[path] ?? "inicial";
}
