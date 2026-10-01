import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { whatsappMessages } from "../src/content/site.ts";
import {
  abrirGatilho,
  aoMudarGatilho,
  fecharGatilho,
  gatilhoAberto,
  lerCarimbos,
  limparTudo,
  marcar,
  podeAbrirCartao,
  podeAbrirModal,
} from "../src/lib/conversionState.ts";
import { linkWhatsapp, mensagemWhatsapp } from "../src/lib/demoWhatsapp.ts";
import { balaoVisivel, restanteMs } from "../src/lib/whatsappBubble.ts";
import { maskPhone, validPhone } from "../src/lib/phone.ts";

const DIA = 24 * 60 * 60 * 1000;
const agora = Date.UTC(2026, 9, 1);

class Memoria {
  dados = new Map<string, string>();
  getItem(chave: string): string | null {
    return this.dados.get(chave) ?? null;
  }
  setItem(chave: string, valor: string): void {
    this.dados.set(chave, valor);
  }
  removeItem(chave: string): void {
    this.dados.delete(chave);
  }
}

const global = globalThis as Record<string, unknown>;

function armazenamentoFalso(): { local: Memoria; sessao: Memoria } {
  const local = new Memoria();
  const sessao = new Memoria();
  global.localStorage = local;
  global.sessionStorage = sessao;
  return { local, sessao };
}

afterEach(() => {
  limparTudo();
  delete global.localStorage;
  delete global.sessionStorage;
});

test("sem carimbo e sem gatilho aberto, cartão e modal podem abrir", () => {
  assert.equal(podeAbrirCartao(agora, {}, null), true);
  assert.equal(podeAbrirModal(agora, {}, null), true);
});

test("cartão fechado há menos de 7 dias não volta, e com 7 dias volta", () => {
  assert.equal(podeAbrirCartao(agora, { cartao_fechado_em: agora - 6 * DIA }, null), false);
  assert.equal(podeAbrirCartao(agora, { cartao_fechado_em: agora - 7 * DIA }, null), true);
});

test("cartão enviado há menos de 30 dias não volta, e com 30 dias volta", () => {
  assert.equal(podeAbrirCartao(agora, { cartao_enviado_em: agora - 29 * DIA }, null), false);
  assert.equal(podeAbrirCartao(agora, { cartao_enviado_em: agora - 30 * DIA }, null), true);
});

test("modal visto há menos de 30 dias não volta, e com 30 dias volta", () => {
  assert.equal(podeAbrirModal(agora, { modal_visto_em: agora - 29 * DIA }, null), false);
  assert.equal(podeAbrirModal(agora, { modal_visto_em: agora - 30 * DIA }, null), true);
});

test("demonstração pedida ou contato enviado bloqueiam cartão e modal", () => {
  for (const carimbos of [{ demo_pedida_em: agora - DIA }, { contato_enviado_em: agora }]) {
    assert.equal(podeAbrirCartao(agora, carimbos, null), false);
    assert.equal(podeAbrirModal(agora, carimbos, null), false);
  }
});

test("cartão aberto impede o modal, e modal aberto impede o cartão", () => {
  assert.equal(podeAbrirModal(agora, {}, "cartao"), false);
  assert.equal(podeAbrirCartao(agora, {}, "modal"), false);
});

test("balão e barra abertos não impedem cartão nem modal", () => {
  for (const atual of ["balao", "barra"] as const) {
    assert.equal(podeAbrirCartao(agora, {}, atual), true);
    assert.equal(podeAbrirModal(agora, {}, atual), true);
  }
});

test("um gatilho exclusivo aberto recusa o outro, e o balão cede a vez", () => {
  assert.equal(abrirGatilho("balao"), true);
  assert.equal(abrirGatilho("cartao"), true);
  assert.equal(gatilhoAberto(), "cartao");
  assert.equal(abrirGatilho("modal"), false);
  assert.equal(abrirGatilho("balao"), false);
  fecharGatilho("modal");
  assert.equal(gatilhoAberto(), "cartao");
  fecharGatilho("cartao");
  assert.equal(gatilhoAberto(), null);
});

test("os carimbos vão para o armazenamento certo e voltam na leitura", () => {
  const { local, sessao } = armazenamentoFalso();
  marcar("cartao_fechado_em", agora);
  marcar("contato_enviado_em", agora + 1);
  assert.equal(local.getItem("zentra_cartao_fechado_em"), String(agora));
  assert.equal(sessao.getItem("zentra_contato_enviado_em"), String(agora + 1));
  assert.deepEqual(lerCarimbos(), { cartao_fechado_em: agora, contato_enviado_em: agora + 1 });
  limparTudo();
  assert.deepEqual(lerCarimbos(), {});
});

test("sem armazenamento disponível nada quebra", () => {
  marcar("modal_visto_em", agora);
  assert.deepEqual(lerCarimbos(), {});
  limparTudo();
});

test("armazenamento que lança nunca derruba a leitura nem a gravação", () => {
  const quebrado = {
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
  global.localStorage = quebrado;
  global.sessionStorage = quebrado;
  marcar("cartao_fechado_em", agora);
  assert.deepEqual(lerCarimbos(), {});
  limparTudo();
});

test("a mensagem do WhatsApp muda por origem e leva o nome na demonstração", () => {
  assert.equal(mensagemWhatsapp("cartao", "Ana"), "Olá, acabei de pedir uma demonstração pelo site. Meu nome é Ana.");
  assert.equal(mensagemWhatsapp("modal", " Bruno "), "Olá, acabei de pedir uma demonstração pelo site. Meu nome é Bruno.");
  assert.equal(mensagemWhatsapp("balao"), whatsappMessages.balao);
  assert.equal(mensagemWhatsapp("barra", "Ana"), whatsappMessages.padrao);
  assert.equal(mensagemWhatsapp("cartao", "  "), whatsappMessages.padrao);
});

test("o link do WhatsApp leva o número e a mensagem codificada", () => {
  const link = linkWhatsapp("cartao", "Ana");
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
  const vistos: Array<string | null> = [];
  const parar = aoMudarGatilho(() => vistos.push(gatilhoAberto()));
  abrirGatilho("cartao");
  abrirGatilho("cartao");
  fecharGatilho("modal");
  fecharGatilho("cartao");
  parar();
  abrirGatilho("modal");
  assert.deepEqual(vistos, ["cartao", null]);
});

test("o balão só aparece vencido, sem dispensa, sem bloqueio e sem o contato na tela", () => {
  const base = { vencido: true, dispensado: false, bloqueado: false, contatoNaTela: false };
  assert.equal(balaoVisivel(base), true);
  assert.equal(balaoVisivel({ ...base, vencido: false }), false);
  assert.equal(balaoVisivel({ ...base, dispensado: true }), false);
  assert.equal(balaoVisivel({ ...base, bloqueado: true }), false);
  assert.equal(balaoVisivel({ ...base, contatoNaTela: true }), false);
});

test("o tempo restante do balão só diminui e nunca fica negativo", () => {
  assert.equal(restanteMs(12_000, 3_000), 9_000);
  assert.equal(restanteMs(9_000, 20_000), 0);
  assert.equal(restanteMs(9_000, -5), 9_000);
});
