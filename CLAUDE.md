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
- Este repositório é espelhado para um repositório público: nada interno entra aqui.
