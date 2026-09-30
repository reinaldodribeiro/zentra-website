const DESTINO = 'contato@zentrabusiness.com.br';
const REMETENTE = 'Site Zentra Business Data <noreply@zentrabusiness.com.br>';
const LIMITES = { nome: 120, empresa: 160, cargo: 120, email: 200, telefone: 40, mensagem: 2000 };
const ROTULOS = { nome: 'Nome', empresa: 'Empresa', cargo: 'Cargo', email: 'E-mail', telefone: 'Telefone', mensagem: 'Mensagem' };
const OBRIGATORIOS = ['nome', 'empresa', 'email'];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function texto(valor, limite) {
  return typeof valor === 'string' ? valor.trim().slice(0, limite) : '';
}

function escapar(valor) {
  const trocas = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return valor.replace(/[&<>"']/g, (c) => trocas[c]);
}

function resposta(status, corpo) {
  return Response.json(corpo, { status });
}

function lerCampos(dados) {
  return Object.fromEntries(Object.entries(LIMITES).map(([campo, limite]) => [campo, texto(dados[campo], limite)]));
}

function corpoDoEmail(campos) {
  const linhas = Object.keys(ROTULOS)
    .filter((campo) => campos[campo])
    .map((campo) => `<p><strong>${ROTULOS[campo]}:</strong> ${escapar(campos[campo]).replace(/\n/g, '<br>')}</p>`);
  return `<h2>Novo contato pelo site</h2>${linhas.join('')}`;
}

export async function POST(request) {
  let dados;
  try {
    dados = await request.json();
  } catch {
    return resposta(400, { erro: 'Não conseguimos ler o formulário. Tente de novo.' });
  }

  if (texto(dados?.site, 200)) {
    return resposta(200, { ok: true });
  }

  const campos = lerCampos(dados ?? {});
  if (OBRIGATORIOS.some((campo) => !campos[campo]) || !EMAIL.test(campos.email)) {
    return resposta(422, { erro: 'Preencha nome, empresa e um e-mail válido.' });
  }

  const chave = process.env.RESEND_API_KEY;
  if (!chave) {
    return resposta(503, { erro: 'O envio está fora do ar agora. Escreva para contato@zentrabusiness.com.br.' });
  }

  const envio = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${chave}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: REMETENTE,
      to: [DESTINO],
      reply_to: campos.email,
      subject: `Contato pelo site: ${campos.empresa}`,
      html: corpoDoEmail(campos),
    }),
  });

  if (!envio.ok) {
    return resposta(502, { erro: 'Não conseguimos enviar agora. Escreva para contato@zentrabusiness.com.br.' });
  }

  return resposta(200, { ok: true });
}
