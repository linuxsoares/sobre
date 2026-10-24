# sobre.gilsoares.dev

Página pessoal com tema Star Wars. HTML, CSS e JS puros, sem build.

- `content.js`: todo o conteúdo (PT/EN). É o único arquivo que precisa editar.
- `main.js`: renderização, campo de estrelas com salto para o hiperespaço, abertura em letreiro, troca de idioma e cor do sabre.
- `style.css`: visual.

## Rodar localmente

```sh
python3 -m http.server 8642
# abra http://localhost:8642 — para ver a abertura de novo, clique em "Rever abertura"
```

## Publicar (GitHub Pages)

O arquivo `CNAME` já aponta para `sobre.gilsoares.dev` e o `.nojekyll` faz o Pages servir os arquivos como estão.

1. Suba esta pasta para um repositório público no GitHub (ex.: `sobre`).
2. Settings → Pages → Source: "Deploy from a branch", branch `main`, pasta `/ (root)`.
3. No DNS do domínio, crie um registro `CNAME` com nome `sobre` e valor `<usuario>.github.io`.
4. Volte em Settings → Pages, espere o check de DNS ficar verde e marque "Enforce HTTPS".
   Domínios `.dev` só abrem com HTTPS, então o site só carrega depois que o certificado for emitido (alguns minutos).
5. Recomendado: verifique o domínio em github.com/settings/pages para ninguém mais usá-lo no GitHub.
