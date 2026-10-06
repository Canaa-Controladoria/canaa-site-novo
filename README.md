# Canaã Controladoria — site novo

Reconstrução do site institucional + blog da Canaã Controladoria, migrado do WordPress para
Next.js. Ver `escopo-projeto.md` (em `C:\escopo`) para o escopo original combinado.

## O que o app faz

É o site público da Canaã Controladoria (páginas institucionais, soluções, formulários de
contato/proposta) mais um blog com painel de administração:

- Qualquer visitante lê os posts publicados, navega por categoria, busca por texto e vê os mais
  lidos do mês.
- O cliente (dono do site) tem um login de administrador em `/admin`. Nesse painel ele cria,
  edita, apaga ou oculta posts (voltando o status para rascunho tira o post do ar na hora),
  organiza por categoria/tags e escreve os campos de SEO — tudo sem precisar mexer em código ou
  fazer novo deploy. **Isso só é verdade rodando localmente hoje** — ver
  [Banco de dados em produção (Vercel)](#banco-de-dados-em-produção-vercel--ainda-não-é-persistente)
  antes de liberar o painel pra cliente usar no site publicado.
- Formulários do site (proposta, contato, trabalhe conosco, newsletter) gravam o lead no banco e,
  se o SMTP estiver configurado, também disparam um e-mail de aviso.

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4** + **daisyUI** (tema customizado `canaa` em `src/app/globals.css`)
- **SQLite** (`better-sqlite3`) para o blog — arquivo em `data/canaa.db`, criado automaticamente
- **Tiptap** para o editor de texto rico do painel admin
- Sessão de admin via cookie assinado (JWT/`jose`), sem serviço externo

## Blog no Sanity (migração em andamento)

O blog está sendo migrado do SQLite + painel próprio para o **Sanity CMS** (hospedagem de
conteúdo + CDN de imagens). O que já existe no repo:

- **Studio embutido** em `/studio` (`src/app/studio/`), configurado em `sanity.config.ts`. O
  cliente edita posts direto nessa rota, no mesmo domínio do site.
- **Modelo de conteúdo** em `src/sanity/schemaTypes/` (`post`, `category`, `tag`, `short`).
- **Cliente de leitura** em `src/sanity/client.ts` + helper de imagem em `src/sanity/image.ts`.
- **Script de migração** `scripts/migrate-to-sanity.ts` (`npm run migrate:sanity`): lê
  `content/data/posts.json`/`taxonomy.json`, converte o HTML do WordPress em Portable Text,
  **sobe as imagens antigas do WordPress para o CDN do Sanity** e cria os documentos. É
  idempotente (usa `_id` determinístico `post-<wpId>`/`category-<slug>`) — rodar de novo
  atualiza em vez de duplicar, e o Sanity deduplica imagens por hash.

Ainda **não** está wired: a leitura pública (`src/lib/blog.ts`) e o painel `/admin` continuam no
SQLite até a migração ser validada. Formulários (leads/newsletter) e o ranking "mais lidos"
continuarão precisando de um banco próprio — ver seção do banco em produção.

### Entregar/popular na conta da Canaã

O projeto Sanity usado no desenvolvimento está na conta pessoal do desenvolvedor. Quando a conta
da Canaã existir, nada no código muda — tudo vem de variáveis de ambiente. Passos:

1. Em https://sanity.io/manage, logado na conta da Canaã, **crie um projeto** e um dataset
   `production`. (Alternativa: transferir o projeto de desenvolvimento para a organização da
   Canaã, evitando repetir a migração.)
2. Gere **dois tokens** (API → Tokens): um `Viewer` e um `Editor`.
3. Preencha no `.env.local` (e nas env vars da Vercel): `NEXT_PUBLIC_SANITY_PROJECT_ID`,
   `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`, `SANITY_API_WRITE_TOKEN`
   (ver `.env.example`).
4. Em API → CORS origins, adicione `http://localhost:3000` e o domínio de produção (com
   credentials).
5. Rode `npm run migrate:sanity` **enquanto o WordPress antigo ainda estiver no ar** — o script
   baixa as imagens de `canaacontroladoria.com.br` para subir ao Sanity.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000. O banco (`data/canaa.db`) é criado e populado automaticamente na
primeira execução do script de seed (ver abaixo) — se o arquivo já existir, os dados persistem.

## Painel do blog (admin)

Acesse **/admin/login**.

- E-mail: valor de `ADMIN_EMAIL` em `.env.local`
- Senha: valor de `ADMIN_PASSWORD` em `.env.local` (gerada automaticamente na primeira seed —
  troque depois de conferir o site, editando `.env.local` e rodando o seed de novo)

No painel dá para criar/editar/excluir posts, escolher categoria e tags, subir imagem destacada,
preencher SEO (título, meta descrição, palavra-chave) e publicar ou salvar como rascunho — tudo
sem precisar mexer em código ou fazer novo deploy **localmente**. Em produção (Vercel) isso ainda
não persiste — ver próxima seção.

## Banco de dados em produção (Vercel) — ainda não é persistente

**Login do admin não funciona no deploy da Vercel hoje, e mesmo que funcionasse, nada que fosse
escrito pelo painel sobreviveria.** Duas causas, ambas intencionais e documentadas no código
(`src/lib/db.ts`, comentário no topo do arquivo):

1. **`admin_users` foi excluída de propósito do banco versionado** (`data/seed.db`, commit
   `6191460`) — critério de segurança pra não commitar hash de senha no repo. Sem essa tabela, o
   login em `/admin/login` falha em qualquer deploy (preview ou produção).
2. **O filesystem da Vercel é somente-leitura fora de `/tmp`** (Serverless/Edge Functions não têm
   disco persistente). Por isso `src/lib/db.ts` copia `data/seed.db` pra `/tmp/canaa.db` a cada
   cold start (commit `c30c623`) e abre o SQLite a partir de lá. Isso resolve "o site consegue
   *ler* o conteúdo" pro preview funcionar, mas qualquer `INSERT`/`UPDATE` feito através do painel
   admin (post novo, edição, lead de formulário, inscrição de newsletter) só vive enquanto aquela
   instância serverless específica estiver de pé — some no próximo cold start, e nem é
   compartilhado entre instâncias rodando em paralelo nesse meio tempo.

Hoje o fluxo real de publicação é: editar/criar posts **localmente** (onde `data/canaa.db` é um
arquivo comum em disco, persistente de verdade) e depois decidir como levar esse banco pro ar —
não existe ainda um passo automatizado pra isso.

**O que falta pra resolver antes da cliente usar o painel sozinha em produção:** trocar o SQLite em
arquivo por um banco alcançável pelas funções serverless da Vercel pela rede, não pelo disco local.
Opções via Vercel Marketplace (Vercel Postgres/KV nativos foram descontinuados):

- **Neon Postgres** — provavelmente a troca mais direta; exige reescrever as queries de
  `better-sqlite3` (síncronas) pro client Postgres (`@neondatabase/serverless` ou `pg`, assíncronas)
  em `src/lib/db.ts` e nos módulos que fazem query direta (`src/lib/blog.ts`,
  `src/lib/admin-blog.ts`, `src/lib/admin-shorts.ts`, `src/lib/auth.ts`). O `migrate()` em `db.ts` já
  documenta o schema inteiro (tabelas, colunas, índices) — é a referência pra escrever o schema SQL
  equivalente em Postgres (tipos, `SERIAL` no lugar de `AUTOINCREMENT`, etc.).
- **Turso** (libSQL, compatível com SQLite) — migração mais parecida com o que já existe hoje (SQL
  quase idêntico), mas ainda exige trocar `better-sqlite3` pelo client `@libsql/client` (também
  assíncrono) nos mesmos arquivos acima.

Qualquer uma das duas elimina a necessidade do `seedTmpDb()`/`/tmp` inteiramente — o banco vive
fora do processo serverless, então lê e escreve normalmente em qualquer ambiente (local, preview,
produção) apontando pra mesma connection string via variável de ambiente.

## Repopular o banco a partir do export do WordPress

Os scripts em `scripts/` só precisam rodar de novo se `C:\escopo\canaa-content-export.json` mudar:

```bash
node scripts/extract-pages.js   # dump de texto das páginas institucionais (referência)
node scripts/extract-posts.js   # gera content/data/posts.json e taxonomy.json (limpos)
npx tsx --env-file=.env.local scripts/seed.ts   # popula data/canaa.db
```

`seed.ts` faz upsert por `(categoria, slug)` — rodar de novo não duplica posts, mas **sobrescreve**
qualquer edição feita depois pelo painel admin para os posts que vieram do WordPress. Rode com
cuidado depois que o site estiver em produção.

## Variáveis de ambiente (`.env.local`)

| Variável | Uso |
|---|---|
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | login do painel `/admin` |
| `SESSION_SECRET` | assina o cookie de sessão do admin |
| `SMTP_*` / `CONTACT_TO_EMAIL` | envio de e-mail dos formulários (proposta, contato, trabalhe conosco). Sem isso configurado, os envios ficam só registrados no banco (tabela `leads`) e um aviso aparece no log do servidor |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | número usado no botão flutuante de WhatsApp e nos links de diagnóstico |
| `NEXT_PUBLIC_SITE_URL` / `SITE_URL` | usado no sitemap.xml e metadados |

## Estrutura

- `src/app/(site)/` — páginas institucionais + blog público (header/footer completos)
- `src/app/(lp)/` — landing pages de captação (`lp-controller-cfo`, diagnóstico, obrigado) com layout enxuto
- `src/app/admin/` — painel do blog (login público + área protegida)
- `src/app/api/` — rotas de formulário, upload e CRUD do admin
- `src/lib/blog.ts` — leitura pública do blog (só posts publicados)
- `src/lib/admin-blog.ts` — CRUD completo usado pelo painel
- `src/lib/solutions-content.ts` — conteúdo das páginas de soluções genéricas (listadas em `src/lib/site.ts`); a
  página "Controller terceirizado" é uma página própria, fora desse template
  (`src/app/(site)/solucoes/controller-terceirizado/`)

## Entidades

Tudo abaixo vive em `data/canaa.db` (SQLite, schema em `src/lib/db.ts`). Campos marcados
**(derivado)** não existem como coluna — são calculados em tempo de leitura ou de escrita.

### Post (`posts`)

| Campo | Origem |
|---|---|
| `id`, `title`, `slug` | armazenado |
| `primary_category_slug` | armazenado — categoria dona da URL (`/categoria/slug`) |
| `status` | armazenado — `draft` ou `published`. Só `published` aparece no site público |
| `published_at` | armazenado — nulo enquanto `status = draft` |
| `updated_at` | armazenado — atualizado a cada save |
| `seo_title`, `seo_description`, `focus_keyword`, `excerpt` | armazenado |
| `content_html` | armazenado — HTML gerado pelo editor rich text |
| `featured_image` | armazenado — caminho em `public/uploads/posts/...` |
| `reading_time_minutes` | **(derivado)** calculado a partir da contagem de palavras do `content_html` a cada save (`admin-blog.ts`) |
| `path` | **(derivado)** `/${primary_category_slug}/${slug}`, montado na leitura |
| `categories`, `tags` | **(derivado)** join com `post_categories`/`post_tags` na leitura |
| `toc` | **(derivado)** extraído dos `<h2>`/`<h3>` do `content_html` na leitura, não é salvo |

### Category (`categories`) / Tag (`tags`)

`id`, `name`, `slug` — armazenados. Tag é criada automaticamente (upsert) quando usada num post
pela primeira vez; não existe tela própria de gestão de tags/categorias.

### PostView (`post_views`)

`id`, `post_id`, `viewed_at` — um registro por visualização de post publicado (armazenado via
`recordPostView`). O ranking "mais lidos do mês" é **(derivado)**: conta linhas dos últimos N dias
agrupadas por post; sem nenhuma view no período, cai para os posts mais recentes.

### AdminUser (`admin_users`)

`id`, `email`, `name` — armazenado. `password_hash` — armazenado como hash bcrypt, nunca a senha
em texto puro. Não há tela de autoatendimento para trocar a senha; troca-se rodando o seed de novo
com `ADMIN_PASSWORD` atualizado no `.env.local`.

### Lead (`leads`)

`id`, `source` (identifica qual formulário enviou, ex. "proposta"), `name`, `company`, `whatsapp`,
`email`, `revenue_range` (faixa de faturamento anual, só preenchida pelo formulário da página
Controller Terceirizado), `lgpd_consent`, `created_at` — armazenados como enviados pelo formulário
(`src/app/api/leads/route.ts`). A coluna `message` existe no schema mas nenhum formulário atual a
preenche (fica sempre `NULL`) — reservada para um futuro campo de mensagem livre.

### NewsletterSubscriber (`newsletter_subscribers`)

`id`, `email`, `created_at` — armazenado.

## Pendências conhecidas / próximos passos sugeridos

- **Migrar o banco pra algo persistente antes da cliente usar o painel admin em produção** — ver
  [Banco de dados em produção (Vercel)](#banco-de-dados-em-produção-vercel--ainda-não-é-persistente).
  Sem isso, ela não consegue postar sozinha no site publicado.
- Configurar SMTP real em produção para os formulários enviarem e-mail de fato.
- As imagens (logos de clientes, fotos de posts antigos) ainda apontam para o domínio WordPress
  atual (`canaacontroladoria.com.br/wp-content/...`). Migrar para `public/uploads` ou um storage
  próprio antes de desligar o WordPress antigo, senão essas imagens somem.
- Trocar a senha do admin após o primeiro acesso.
