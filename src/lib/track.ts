export const EVENT_NAMES = [
  "cartao_visto",
  "cartao_fechado",
  "cartao_enviado",
  "modal_saida_visto",
  "modal_saida_fechado",
  "modal_saida_enviado",
  "balao_visto",
  "balao_clicado",
  "balao_fechado",
  "barra_clicada",
  "contato_passo1",
  "contato_enviado",
  "newsletter_enviada",
  "demo_whatsapp_aberto",
  "whatsapp_flutuante_clicado",
] as const;

export type EventName = (typeof EVENT_NAMES)[number];

export type EventOrigin = "cartao" | "modal" | "balao" | "barra" | "formulario" | "newsletter" | "flutuante" | "final";

export type EventProps = { origem?: EventOrigin; pagina?: string };

export type CleanProps = { origem?: string; pagina?: string };

export type Sink = {
  event: (name: EventName, props: CleanProps) => void;
  pageview: (path: string) => void;
};

const sinks = new Set<Sink>();

export function registerSink(sink: Sink): void {
  sinks.add(sink);
}

export function unregisterSink(sink: Sink): void {
  sinks.delete(sink);
}

export function isEventName(value: unknown): value is EventName {
  return typeof value === "string" && (EVENT_NAMES as readonly string[]).includes(value);
}

function currentPath(): string | undefined {
  return typeof location === "undefined" ? undefined : location.pathname;
}

function cleanProps(props: EventProps): CleanProps {
  const clean: CleanProps = {};
  if (typeof props.origem === "string") clean.origem = props.origem;
  const pagina = typeof props.pagina === "string" ? props.pagina : currentPath();
  if (pagina !== undefined) clean.pagina = pagina;
  return clean;
}

export function track(event: EventName, props: EventProps = {}): void {
  if (sinks.size === 0 || !isEventName(event)) return;
  const clean = cleanProps(props);
  for (const sink of sinks) sink.event(event, clean);
}

export function trackPageview(path: string): void {
  for (const sink of sinks) sink.pageview(path);
}
