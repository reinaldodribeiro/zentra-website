import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { whatsappMessages } from "../src/content/site.ts";
import {
  openTrigger,
  onTriggerChange,
  closeTrigger,
  getOpenTrigger,
  readStamps,
  clearAll,
  markStamp,
  canOpenCard,
  canOpenModal,
} from "../src/lib/conversionState.ts";
import { buildWhatsappLink, whatsappMessage } from "../src/lib/demoWhatsapp.ts";
import { isBubbleVisible, remainingMs } from "../src/lib/whatsappBubble.ts";
import { maskPhone, validPhone } from "../src/lib/phone.ts";

const DAY = 24 * 60 * 60 * 1000;
const now = Date.UTC(2026, 9, 1);

class MemoryStorage {
  entries = new Map<string, string>();
  getItem(key: string): string | null {
    return this.entries.get(key) ?? null;
  }
  setItem(key: string, value: string): void {
    this.entries.set(key, value);
  }
  removeItem(key: string): void {
    this.entries.delete(key);
  }
}

const global = globalThis as Record<string, unknown>;

function fakeStorage(): { local: MemoryStorage; session: MemoryStorage } {
  const local = new MemoryStorage();
  const session = new MemoryStorage();
  global.localStorage = local;
  global.sessionStorage = session;
  return { local, session };
}

afterEach(() => {
  clearAll();
  delete global.localStorage;
  delete global.sessionStorage;
});

test("sem carimbo e sem gatilho aberto, cartão e modal podem abrir", () => {
  assert.equal(canOpenCard(now, {}, null), true);
  assert.equal(canOpenModal(now, {}, null), true);
});

test("cartão fechado há menos de 7 dias não volta, e com 7 dias volta", () => {
  assert.equal(canOpenCard(now, { cartao_fechado_em: now - 6 * DAY }, null), false);
  assert.equal(canOpenCard(now, { cartao_fechado_em: now - 7 * DAY }, null), true);
});

test("cartão enviado há menos de 30 dias não volta, e com 30 dias volta", () => {
  assert.equal(canOpenCard(now, { cartao_enviado_em: now - 29 * DAY }, null), false);
  assert.equal(canOpenCard(now, { cartao_enviado_em: now - 30 * DAY }, null), true);
});

test("modal visto há menos de 30 dias não volta, e com 30 dias volta", () => {
  assert.equal(canOpenModal(now, { modal_visto_em: now - 29 * DAY }, null), false);
  assert.equal(canOpenModal(now, { modal_visto_em: now - 30 * DAY }, null), true);
});

test("demonstração pedida ou contato enviado bloqueiam cartão e modal", () => {
  for (const stamps of [{ demo_pedida_em: now - DAY }, { contato_enviado_em: now }]) {
    assert.equal(canOpenCard(now, stamps, null), false);
    assert.equal(canOpenModal(now, stamps, null), false);
  }
});

test("cartão aberto impede o modal, e modal aberto impede o cartão", () => {
  assert.equal(canOpenModal(now, {}, "cartao"), false);
  assert.equal(canOpenCard(now, {}, "modal"), false);
});

test("balão e barra abertos não impedem cartão nem modal", () => {
  for (const current of ["balao", "barra"] as const) {
    assert.equal(canOpenCard(now, {}, current), true);
    assert.equal(canOpenModal(now, {}, current), true);
  }
});

test("um gatilho exclusivo aberto recusa o outro, e o balão cede a vez", () => {
  assert.equal(openTrigger("balao"), true);
  assert.equal(openTrigger("cartao"), true);
  assert.equal(getOpenTrigger(), "cartao");
  assert.equal(openTrigger("modal"), false);
  assert.equal(openTrigger("balao"), false);
  closeTrigger("modal");
  assert.equal(getOpenTrigger(), "cartao");
  closeTrigger("cartao");
  assert.equal(getOpenTrigger(), null);
});

test("os carimbos vão para o armazenamento certo e voltam na leitura", () => {
  const { local, session } = fakeStorage();
  markStamp("cartao_fechado_em", now);
  markStamp("contato_enviado_em", now + 1);
  assert.equal(local.getItem("zentra_cartao_fechado_em"), String(now));
  assert.equal(session.getItem("zentra_contato_enviado_em"), String(now + 1));
  assert.deepEqual(readStamps(), { cartao_fechado_em: now, contato_enviado_em: now + 1 });
  clearAll();
  assert.deepEqual(readStamps(), {});
});

test("sem armazenamento disponível nada quebra", () => {
  markStamp("modal_visto_em", now);
  assert.deepEqual(readStamps(), {});
  clearAll();
});

test("armazenamento que lança nunca derruba a leitura nem a gravação", () => {
  const broken = {
    getItem() {
      throw new Error("bloqueado");
    },
    setItem() {
      throw new Error("bloqueado");
    },
    removeItem() {
      throw new Error("bloqueado");
    },
  };
  global.localStorage = broken;
  global.sessionStorage = broken;
  markStamp("cartao_fechado_em", now);
  assert.deepEqual(readStamps(), {});
  clearAll();
});

test("a mensagem do WhatsApp muda por origem e leva o nome na demonstração", () => {
  assert.equal(whatsappMessage("cartao", "Ana"), "Olá, acabei de pedir uma demonstração pelo site. Meu nome é Ana.");
  assert.equal(whatsappMessage("modal", " Bruno "), "Olá, acabei de pedir uma demonstração pelo site. Meu nome é Bruno.");
  assert.equal(whatsappMessage("balao"), whatsappMessages.balao);
  assert.equal(whatsappMessage("barra", "Ana"), whatsappMessages.padrao);
  assert.equal(whatsappMessage("cartao", "  "), whatsappMessages.padrao);
});

test("o link do WhatsApp leva o número e a mensagem codificada", () => {
  const link = buildWhatsappLink("cartao", "Ana");
  assert.ok(link.startsWith("https://wa.me/5562994773610?text="));
  assert.ok(decodeURIComponent(link).includes("Meu nome é Ana."));
});

test("a máscara de telefone e a validação de dez ou onze dígitos", () => {
  assert.equal(maskPhone("11988887777"), "(11) 9 8888-7777");
  assert.equal(maskPhone("1133334444"), "(11) 3333-4444");
  assert.equal(maskPhone(""), "");
  assert.equal(validPhone("(11) 9 8888-7777"), true);
  assert.equal(validPhone("(11) 3333-4444"), true);
  assert.equal(validPhone("(11) 8888"), false);
});

test("quem escuta é avisado ao abrir e ao fechar um gatilho, e para ao cancelar", () => {
  const seen: Array<string | null> = [];
  const stop = onTriggerChange(() => seen.push(getOpenTrigger()));
  openTrigger("cartao");
  openTrigger("cartao");
  closeTrigger("modal");
  closeTrigger("cartao");
  stop();
  openTrigger("modal");
  assert.deepEqual(seen, ["cartao", null]);
});

test("o balão só aparece vencido, sem dispensa, sem bloqueio e sem o contato na tela", () => {
  const base = { due: true, dismissed: false, blocked: false, contactOnScreen: false };
  assert.equal(isBubbleVisible(base), true);
  assert.equal(isBubbleVisible({ ...base, due: false }), false);
  assert.equal(isBubbleVisible({ ...base, dismissed: true }), false);
  assert.equal(isBubbleVisible({ ...base, blocked: true }), false);
  assert.equal(isBubbleVisible({ ...base, contactOnScreen: true }), false);
});

test("o tempo restante do balão só diminui e nunca fica negativo", () => {
  assert.equal(remainingMs(12_000, 3_000), 9_000);
  assert.equal(remainingMs(9_000, 20_000), 0);
  assert.equal(remainingMs(9_000, -5), 9_000);
});
