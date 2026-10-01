# zentra-website

O site de venda da Zentra Business Data. O contexto do produto, o vocabulário e as regras estão no
`CLAUDE.md` da raiz; o posicionamento de venda, em `docs/PROPOSTA_DE_POSICIONAMENTO.pdf` da raiz. A
skill que conduz o trabalho é `sites-cinematograficos`, em `.claude/skills/` da raiz.

## Regras

- Next 16 (App Router), React 19, TypeScript e Tailwind 4, com CSS Modules. Todo o texto vive em
  `src/content/site.ts`; componente não carrega texto próprio. Variáveis de ambiente em `.env.example`.
- Todo texto em português do Brasil, sem travessão. `npm run lint`, `npm run verificar` e `npm test`
  antes de todo commit; a CI roda a verificação.
- Vender o resultado para quem opera crédito consignado e para escritórios de advocacia, com a
  conformidade à LGPD na frente. Nunca descrever o produto como consulta de dados de pessoa física, nem
  sugerir uso avulso ou pelo público em geral: o acesso nasce de um contrato.
- Nenhum documento, custo do provedor, nome da Date Solutions ou tela real com dado de pessoa no site.
  A consulta animada usa só dados inventados e incompletos.
- Nenhum link para o sistema (`app-data.zentrabusiness.com.br`); os termos podem citar o endereço em texto.
- Animação só à mão (canvas, `requestAnimationFrame`, keyframes), sem biblioteca, e sempre parada com
  `prefers-reduced-motion`. Uma única chamada para ação de página: `#contato`.
- Números do site (contadores) só entram com confirmação do dono; nada é inventado: sem avaliações,
  depoimentos nem nomes de clientes.
- Rotas de API só aceitam a Origin do próprio site, limitam envios por IP e nunca expõem chave.
- Arquivos em minúsculas, sem acento, com hífen. Material bruto e de revisão em `bruto/` e `revisao/`,
  que o `.gitignore` deixa fora.
- Nenhum comentário no código.
- SEO: uma página mira um termo principal só, presente no h1, no título, na descrição e no texto
  (lista em `docs/SITE_SEO.md`, seção 2, na raiz). Todo conteúdo tem `updatedAt` fixo, usado no sitemap
  e nos dados estruturados; nunca `new Date()`. O texto de páginas e artigos vive só em `src/content`
  (`pages/`, `articles/`). Cada rota monta os metadados por `pageMetadata` (título curto, o sufixo
  `| Zentra` vem do modelo do layout, descrição de 120 a 155 caracteres) e leva o seu `@graph` em
  `JsonLd`. A primeira tela nasce visível sem JavaScript: só o que está abaixo dela usa `data-reveal`.
- Velocidade: `npm run lighthouse` mede no celular (`/`, `/credito-consignado` e `/advocacia`, mediana
  de três) e exige 90 nas quatro notas e 2,5 s no maior elemento visível. Roda antes de publicar.
- Conversão: gatilhos, convivência e links externos seguem a seção abaixo.
- Este repositório é espelhado para um repositório público: nada interno entra aqui.

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
- Nenhum script de terceiro nem medição de uso; ferramenta de análise só entra atrás do consentimento
  de cookies, em outra unidade.
- Textos só em `src/content/site.ts`; identificadores do código em inglês, textos em português.
