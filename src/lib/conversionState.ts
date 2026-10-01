export type Gatilho = "cartao" | "modal" | "balao" | "barra";

export type Carimbo =
  | "cartao_fechado_em"
  | "cartao_enviado_em"
  | "modal_visto_em"
  | "demo_pedida_em"
  | "contato_enviado_em"
  | "balao_fechado";

export type Carimbos = Partial<Record<Carimbo, number>>;

const DIA_MS = 24 * 60 * 60 * 1000;
export const CARTAO_FECHADO_DIAS = 7;
export const CARTAO_ENVIADO_DIAS = 30;
export const MODAL_VISTO_DIAS = 30;
export const DEMO_PEDIDA_DIAS = 30;

const PREFIXO = "zentra_";
const DA_SESSAO: readonly Carimbo[] = ["contato_enviado_em", "balao_fechado"];
const TODOS: readonly Carimbo[] = [
  "cartao_fechado_em",
  "cartao_enviado_em",
  "modal_visto_em",
  "demo_pedida_em",
  "contato_enviado_em",
  "balao_fechado",
];

const EXCLUSIVOS: readonly Gatilho[] = ["cartao", "modal"];

let aberto: Gatilho | null = null;

export function gatilhoAberto(): Gatilho | null {
  return aberto;
}

export function abrirGatilho(gatilho: Gatilho): boolean {
  if (aberto !== null && EXCLUSIVOS.includes(aberto) && aberto !== gatilho) return false;
  aberto = gatilho;
  return true;
}

export function fecharGatilho(gatilho: Gatilho): void {
  if (aberto === gatilho) aberto = null;
}

function armazenamento(carimbo: Carimbo): Storage | null {
  try {
    return DA_SESSAO.includes(carimbo) ? globalThis.sessionStorage : globalThis.localStorage;
  } catch {
    return null;
  }
}

export function marcar(carimbo: Carimbo, agora = Date.now()): void {
  try {
    armazenamento(carimbo)?.setItem(PREFIXO + carimbo, String(agora));
  } catch {
    return;
  }
}

export function lerCarimbos(): Carimbos {
  const carimbos: Carimbos = {};
  for (const carimbo of TODOS) {
    try {
      const valor = Number(armazenamento(carimbo)?.getItem(PREFIXO + carimbo));
      if (Number.isFinite(valor) && valor > 0) carimbos[carimbo] = valor;
    } catch {
      continue;
    }
  }
  return carimbos;
}

export function limparTudo(): void {
  for (const carimbo of TODOS) {
    try {
      armazenamento(carimbo)?.removeItem(PREFIXO + carimbo);
    } catch {
      continue;
    }
  }
  aberto = null;
}

function dentroDoPrazo(desde: number | undefined, dias: number, agora: number): boolean {
  return desde !== undefined && agora - desde < dias * DIA_MS;
}

function jaConverteu(agora: number, carimbos: Carimbos): boolean {
  return (
    dentroDoPrazo(carimbos.demo_pedida_em, DEMO_PEDIDA_DIAS, agora) || carimbos.contato_enviado_em !== undefined
  );
}

export function podeAbrirCartao(agora: number, carimbos: Carimbos, atual: Gatilho | null = aberto): boolean {
  if (atual !== null && atual !== "balao" && atual !== "barra") return false;
  if (jaConverteu(agora, carimbos)) return false;
  if (dentroDoPrazo(carimbos.cartao_fechado_em, CARTAO_FECHADO_DIAS, agora)) return false;
  return !dentroDoPrazo(carimbos.cartao_enviado_em, CARTAO_ENVIADO_DIAS, agora);
}

export function podeAbrirModal(agora: number, carimbos: Carimbos, atual: Gatilho | null = aberto): boolean {
  if (atual === "cartao" || atual === "modal") return false;
  if (jaConverteu(agora, carimbos)) return false;
  return !dentroDoPrazo(carimbos.modal_visto_em, MODAL_VISTO_DIAS, agora);
}
