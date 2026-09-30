# zentra-website

Site de venda da Zentra Business Data, em `data.zentrabusiness.com.br`.

HTML, CSS e JavaScript puros, sem build. Uma função da Vercel (`api/contato.js`) envia o formulário de
contato para `contato@zentrabusiness.com.br` pela Resend.

## Rodar localmente

```bash
npm run dev          # http://localhost:4000
npm run verificar    # idioma, posicionamento e sintaxe da função
```

O formulário só envia de verdade na Vercel, onde mora a `RESEND_API_KEY`.

## Publicação

A CI deste repositório roda a verificação e, na `main`, espelha o código para
`reinaldodribeiro/zentra-website`, que é o repositório que a Vercel lê. O mesmo fluxo do `zentra-web`.

- Secret `MIRROR_DEPLOY_KEY` aqui: chave privada cuja pública é deploy key com escrita no espelho.
- Variável `RESEND_API_KEY` no projeto da Vercel.
- Variável `RESEND_AUDIENCE_ID` no projeto da Vercel: o id da lista (segmento) da Resend que recebe os assinantes da newsletter.
- Domínio `data.zentrabusiness.com.br` apontado para a Vercel (CNAME `cname.vercel-dns.com`).
