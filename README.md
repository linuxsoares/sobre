# gilsoares.dev

Página pessoal com tema Star Wars. HTML, CSS e JS puros, sem build.

- `content.js`: todo o conteúdo (PT/EN). É o único arquivo que precisa editar.
- `main.js`: renderização, campo de estrelas com salto para o hiperespaço, abertura em letreiro, troca de idioma e cor do sabre.
- `style.css`: visual.

## Rodar localmente

```sh
python3 -m http.server 8642
# abra http://localhost:8642 — para ver a abertura de novo, clique em "Rever abertura"
```

## Publicação (GitHub Pages + Cloudflare DNS)

O site é publicado pelo GitHub Pages a partir da branch `main` (pasta raiz). O arquivo `CNAME` define o domínio
`gilsoares.dev` e o `.nojekyll` faz o Pages servir os arquivos como estão. Basta dar push para atualizar.

Registros na Cloudflare, todos com o proxy desligado ("DNS only"):

| Tipo | Nome | Conteúdo |
|------|------|----------|
| A | `@` | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (um registro cada) |
| AAAA | `@` | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
| CNAME | `www` | `linuxsoares.github.io` (o GitHub redireciona `www` para o domínio raiz) |

Domínios `.dev` só abrem com HTTPS: o site carrega depois que o GitHub emite o certificado e "Enforce HTTPS" é ativado.
