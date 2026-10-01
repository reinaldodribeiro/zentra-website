export type Trigger = "cartao" | "modal" | "balao" | "barra";

export type Stamp =
  | "cartao_fechado_em"
  | "cartao_enviado_em"
  | "modal_visto_em"
  | "demo_pedida_em"
  | "contato_enviado_em"
  | "balao_fechado";

export type Stamps = Partial<Record<Stamp, number>>;

const DAY_MS = 24 * 60 * 60 * 1000;
export const CARD_CLOSED_DAYS = 7;
export const CARD_SENT_DAYS = 30;
export const MODAL_SEEN_DAYS = 30;
export const DEMO_REQUESTED_DAYS = 30;

const KEY_PREFIX = "zentra_";
const SESSION_STAMPS: readonly Stamp[] = ["contato_enviado_em", "balao_fechado"];
const ALL_STAMPS: readonly Stamp[] = [
  "cartao_fechado_em",
  "cartao_enviado_em",
  "modal_visto_em",
  "demo_pedida_em",
  "contato_enviado_em",
  "balao_fechado",
];

const EXCLUSIVE_TRIGGERS: readonly Trigger[] = ["cartao", "modal"];

let currentTrigger: Trigger | null = null;
const listeners = new Set<() => void>();

function notifyListeners(): void {
  for (const listener of [...listeners]) listener();
}

export function getOpenTrigger(): Trigger | null {
  return currentTrigger;
}

export function onTriggerChange(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function openTrigger(trigger: Trigger): boolean {
  if (currentTrigger !== null && EXCLUSIVE_TRIGGERS.includes(currentTrigger) && currentTrigger !== trigger) return false;
  if (currentTrigger === trigger) return true;
  currentTrigger = trigger;
  notifyListeners();
  return true;
}

export function closeTrigger(trigger: Trigger): void {
  if (currentTrigger !== trigger) return;
  currentTrigger = null;
  notifyListeners();
}

function storageFor(stamp: Stamp): Storage | null {
  try {
    return SESSION_STAMPS.includes(stamp) ? globalThis.sessionStorage : globalThis.localStorage;
  } catch {
    return null;
  }
}

export function markStamp(stamp: Stamp, now = Date.now()): void {
  try {
    storageFor(stamp)?.setItem(KEY_PREFIX + stamp, String(now));
  } catch {
    return;
  }
}

export function readStamps(): Stamps {
  const stamps: Stamps = {};
  for (const stamp of ALL_STAMPS) {
    try {
      const value = Number(storageFor(stamp)?.getItem(KEY_PREFIX + stamp));
      if (Number.isFinite(value) && value > 0) stamps[stamp] = value;
    } catch {
      continue;
    }
  }
  return stamps;
}

export function clearAll(): void {
  for (const stamp of ALL_STAMPS) {
    try {
      storageFor(stamp)?.removeItem(KEY_PREFIX + stamp);
    } catch {
      continue;
    }
  }
  currentTrigger = null;
  notifyListeners();
}

function isWithinDays(since: number | undefined, days: number, now: number): boolean {
  return since !== undefined && now - since < days * DAY_MS;
}

function hasConverted(now: number, stamps: Stamps): boolean {
  return (
    isWithinDays(stamps.demo_pedida_em, DEMO_REQUESTED_DAYS, now) || stamps.contato_enviado_em !== undefined
  );
}

export function canOpenCard(now: number, stamps: Stamps, current: Trigger | null = currentTrigger): boolean {
  if (current !== null && current !== "balao" && current !== "barra") return false;
  if (hasConverted(now, stamps)) return false;
  if (isWithinDays(stamps.cartao_fechado_em, CARD_CLOSED_DAYS, now)) return false;
  return !isWithinDays(stamps.cartao_enviado_em, CARD_SENT_DAYS, now);
}

export function canOpenModal(now: number, stamps: Stamps, current: Trigger | null = currentTrigger): boolean {
  if (current === "cartao" || current === "modal") return false;
  if (hasConverted(now, stamps)) return false;
  return !isWithinDays(stamps.modal_visto_em, MODAL_SEEN_DAYS, now);
}
