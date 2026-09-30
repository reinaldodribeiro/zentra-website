# zentra-website

O site de venda da Zentra Business Data. O contexto do produto, o vocabulário e as regras estão no
`CLAUDE.md` da raiz; o posicionamento de venda, em `docs/PROPOSTA_DE_POSICIONAMENTO.pdf` da raiz. A
skill que conduz o trabalho é `sites-cinematograficos`, em `.claude/skills/` da raiz.

## Regras

- Um `index.html` e a pasta `assets/`. Sem framework, sem build, sem npm em produção.
- Todo texto em português do Brasil, sem travessão. `npm run verificar` antes de todo commit; a CI roda o mesmo.
- Vender o resultado para quem opera crédito consignado, com a conformidade à LGPD na frente. Nunca
  descrever o produto como consulta de dados de pessoa física, nem sugerir uso avulso ou pelo público
  em geral: o acesso nasce de um contrato.
- Nenhum documento, custo do provedor, nome da Date Solutions ou tela real com dado de pessoa no site.
- Arquivos em minúsculas, sem acento, com hífen. Material bruto e de revisão em `bruto/` e `revisao/`,
  que o `.gitignore` deixa fora.
- Nenhum comentário no código.
- Este repositório é espelhado para um repositório público: nada interno entra aqui.
