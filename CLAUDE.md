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
- Este repositório é espelhado para um repositório público: nada interno entra aqui.
