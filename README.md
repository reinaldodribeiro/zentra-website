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
npm run lighthouse   # nota e maior elemento visível no celular; sobe next start sozinho
```

Para testar o envio real, copie `.env.example` para `.env.local` e preencha `RESEND_API_KEY` e
`RESEND_AUDIENCE_ID`. Sem elas, contato e newsletter respondem 503.

## Onde mora o quê

- Todo o texto: `src/content/site.ts` (termos em `terms.ts`, privacidade em `privacy.ts`). O documento
  de referência é `docs/SITE_TEXTO.md`, na raiz do monorepo.
- Seções da página: `src/components/sections/`, na ordem de `src/app/page.tsx`.
- Rotas de API e proteção (Origin do próprio site, limite de 5 envios por IP a cada 10 minutos, campo
  armadilha): `src/app/api/` e `src/lib/requestGuard.ts`.

## Rotas

- `/`: página de venda. `/credito-consignado` e `/advocacia`: páginas de assunto, em
  `src/content/pages`. `/artigos` e `/artigos/{slug}`: artigos, em `src/content/articles`.
- `/privacidade` e `/termos`. `/api/contato` e `/api/newsletter`.
- `robots.txt` (bloqueia `/api/`), `sitemap.xml` (lista todas as rotas com a data fixa de cada
  conteúdo), `manifest.webmanifest` e uma imagem de compartilhamento por página, gerada em código.

## Velocidade

`npm run lighthouse` roda `next start` numa porta livre, mede com o Lighthouse (celular, três rodadas,
mediana) as três páginas principais e falha se alguma nota ficar abaixo de 90 ou o maior elemento
visível passar de 2,5 s. Precisa do Google Chrome instalado (ou `CHROME_PATH`). A medição usa o
estrangulamento aplicado pelo próprio navegador, que é estável; a simulação padrão do Lighthouse
oscila entre 2,0 s e 2,6 s na mesma página.

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
- Variável `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` no projeto da Vercel: o código da meta tag do Search
  Console. Sem ela, a meta de verificação não sai.
- Domínio principal: na Vercel, adicionar `zentrabusiness.com.br` e `www.zentrabusiness.com.br` ao
  projeto com redirecionamento 308 para `data.zentrabusiness.com.br`; no registro.br, A
  `76.76.21.21` para o domínio raiz e CNAME `cname.vercel-dns.com` para `www`, como a Vercel indicar.
- Search Console: criar a propriedade, verificar pela variável acima e, depois do deploy, enviar
  `https://data.zentrabusiness.com.br/sitemap.xml`.
- Redes: `firm.linkedin` e `firm.instagram` em `src/content/site.ts`, vazios até o dono passar os
  endereços; vazio não entra no rodapé nem no `sameAs`.
