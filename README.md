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

## Contatos no sistema

Contato, pedido de demonstração e newsletter também viram um contato no sistema (`src/lib/leads.ts`).
O e-mail sai primeiro; o contato é gravado depois, como espelho de melhor esforço: tempo limite de
4 segundos, qualquer falha é engolida e a resposta ao visitante nunca muda. Sem `ZENTRA_SITE_LEAD_TOKEN`
nada é chamado. `LEADS_URL` troca o endereço. Nenhum dado do contato vai para log, e o token só mora na
Vercel.

## Onde mora o quê

- Todo o texto: `src/content/site.ts`. Termos, privacidade e cookies (`terms.ts`, `privacy.ts`, `cookies.ts`) guardam só os metadados: o texto vigente vem do sistema, buscado no servidor e revalidado de hora em hora (`src/lib/legalDocuments.ts`; `LEGAL_DOCUMENTS_URL` troca a origem para teste local). O documento
  de referência é `docs/SITE_TEXTO.md`, na raiz do monorepo.
- Seções da página: `src/components/sections/`, na ordem de `src/app/page.tsx`.
- Rotas de API e proteção (Origin do próprio site, limite de 5 envios por IP a cada 10 minutos, campo
  armadilha): `src/app/api/` e `src/lib/requestGuard.ts`.

## Rotas

- `/`: página de venda. `/credito-consignado` e `/advocacia`: páginas de assunto, em
  `src/content/pages`. `/artigos` e `/artigos/{slug}`: artigos, em `src/content/articles`.
- `/privacidade`, `/termos` e `/cookies`. `/api/contato` e `/api/newsletter`.
- Consentimento de cookies: o banner e o painel de preferências gravam o cookie `zentra_cookie_consent` no mesmo formato e no mesmo domínio do sistema (`src/lib/cookieConsent.ts`), e `ConsentGate` segura qualquer tecnologia não essencial até o sim.
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

## Conversão

- Cinco gatilhos levam à mesma conversa com a Zentra (demonstração ou contato): cartão de engajamento,
  modal de saída, balão do WhatsApp, barra fixa no celular e contato em dois passos. A oferta é a
  demonstração gratuita de 20 minutos; o pedido vai por `POST /api/demonstracao` e chega por e-mail.
- Um gatilho aberto por vez, nunca na primeira tela, nunca repetido na mesma visita. A convivência
  mora em `src/lib/conversionState.ts`, com carimbos `zentra_` em `localStorage` e `sessionStorage`,
  sempre em try/catch, só com data, nunca com o que a pessoa digitou.
- Cartão e modal só a partir de 1024 px; no celular ficam a barra fixa e o balão, pequenos, sem cobrir
  o conteúdo. O balão aparece aos 15 s e espera a vez se o cartão ou o modal estiver aberto.
- Link externo (outro domínio, inclusive o do HTML dos documentos legais) abre em nova aba com
  `rel="noopener noreferrer"`; interno, âncora, `mailto` e `tel` ficam como estão (`src/lib/externalLink.ts`).
- Medição de uso (PostHog, região da União Europeia, e Google Analytics 4) só entra atrás do
  consentimento da categoria análise, por `ConsentGate` e `src/components/analytics/Measurement.tsx`, e
  só quando as três variáveis existirem. Desligar a análise desmonta a medição e apaga os cookies `_ga`.
- Textos só em `src/content/site.ts`; identificadores do código em inglês, textos em português.

## Medição

- Carrega 2,5 s depois da primeira pintura e só com a categoria análise ligada; sem `NEXT_PUBLIC_POSTHOG_KEY`
  ou sem `NEXT_PUBLIC_GA_MEASUREMENT_ID` não renderiza nada. `NEXT_PUBLIC_POSTHOG_HOST` tem padrão UE.
- Todo evento sai por `track()` em `src/lib/track.ts`, com as propriedades `origem` e `pagina` apenas.
  Eventos: `cartao_visto`, `cartao_fechado`, `cartao_enviado`, `modal_saida_visto`, `modal_saida_fechado`,
  `modal_saida_enviado`, `balao_visto`, `balao_clicado`, `balao_fechado`, `barra_clicada`, `contato_passo1`,
  `contato_enviado`, `newsletter_enviada`, `demo_whatsapp_aberto` e `whatsapp_flutuante_clicado`, mais a
  visita de página a cada troca de rota. Nunca nome, telefone, e-mail ou texto digitado.
- Passos do dono: criar o projeto no PostHog na região UE; criar a propriedade do GA4; cadastrar as três
  variáveis na Vercel; depois de uma semana, olhar no PostHog o funil por gatilho e origem e, no GA4, de
  onde vêm as visitas.

## Publicação

A CI deste repositório roda a verificação e, na `main`, espelha o código para
`reinaldodribeiro/zentra-website`, que é o repositório que a Vercel lê. O mesmo fluxo do `zentra-web`.

- Secret `MIRROR_DEPLOY_KEY` aqui: chave privada cuja pública é deploy key com escrita no espelho.
- Variável `RESEND_API_KEY` no projeto da Vercel.
- Variável `RESEND_AUDIENCE_ID` no projeto da Vercel: o id da lista (segmento) da Resend que recebe os assinantes da newsletter.
- Variável `ZENTRA_SITE_LEAD_TOKEN` no projeto da Vercel: o mesmo segredo da API; nunca no repositório. `LEADS_URL` é opcional.
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
