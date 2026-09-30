# zentra-website

Site de venda da Zentra Business Data, em `data.zentrabusiness.com.br`.

Next 16 (App Router), React 19, TypeScript e Tailwind 4, com CSS Modules nos componentes. Duas rotas de
API (`/api/contato` e `/api/newsletter`) falam com a Resend. A página inicial não tem capturas do sistema:
a primeira tela mostra uma consulta animada desenhada em código, com dados inventados.

## Rodar localmente

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint
npm run verificar    # idioma, posicionamento e regras do conteúdo
npm test             # conteúdo e rotas de API
npm run build
```

Para testar o envio real, copie `.env.example` para `.env.local` e preencha `RESEND_API_KEY` e
`RESEND_AUDIENCE_ID`. Sem elas, contato e newsletter respondem 503.

## Onde mora o quê

- Todo o texto: `src/content/site.ts` (termos em `terms.ts`, privacidade em `privacy.ts`). O documento
  de referência é `docs/SITE_TEXTO.md`, na raiz do monorepo.
- Seções da página: `src/components/sections/`, na ordem de `src/app/page.tsx`.
- Rotas de API e proteção (Origin do próprio site, limite de 5 envios por IP a cada 10 minutos, campo
  armadilha): `src/app/api/` e `src/lib/requestGuard.ts`.

## Movimento

Quatro componentes, todos feitos à mão, sem biblioteca, e todos parados com `prefers-reduced-motion`:

- `NetworkCanvas`: rede de pontos atrás da primeira tela.
- `LookupDemo`: a consulta de exemplo que se monta bloco a bloco.
- `Counter`: número que sobe até o valor ao entrar na tela, uma vez.
- `Marquee`: faixa corrida com os segmentos atendidos.

## Publicação

A CI deste repositório roda a verificação e, na `main`, espelha o código para
`reinaldodribeiro/zentra-website`, que é o repositório que a Vercel lê. O mesmo fluxo do `zentra-web`.

- Secret `MIRROR_DEPLOY_KEY` aqui: chave privada cuja pública é deploy key com escrita no espelho.
- Variável `RESEND_API_KEY` no projeto da Vercel.
- Variável `RESEND_AUDIENCE_ID` no projeto da Vercel: o id da lista (segmento) da Resend que recebe os assinantes da newsletter.
- Domínio `data.zentrabusiness.com.br` apontado para a Vercel (CNAME `cname.vercel-dns.com`).
