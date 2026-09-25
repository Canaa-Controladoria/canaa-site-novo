@AGENTS.md

## Requisitos do README

O `README.md` deste projeto deve funcionar como o documento de regras de negócio. Ele deve conter:

1. **O que o app faz** — em português simples, sem jargão técnico.
2. **Definição de cada entidade** — seus campos, quais são armazenados e quais são derivados/calculados.

Mantenha o README atualizado conforme as regras de negócio evoluem. Se o código e o README divergirem, o README está errado — corrija-o.

## Disciplina de commits

- Siga a metodologia de **commits pequenos** — uma mudança lógica por commit. Não agrupe mudanças não relacionadas.
- Commits acontecem **depois** da etapa de ajuste/refactor, quando o código está limpo e (quando houver testes) eles estão verdes.
- Padrão de mensagem: `tipo(módulo): descrição breve`
  - `tipo` deve ser um de: `feat`, `fix`, `chore`
  - `módulo` é a área do projeto afetada: `blog`, `admin`, `leads`, `newsletter`, `site`, `app`
  - Exemplos:
    - `feat(admin): add login rate limiting`
    - `fix(blog): exclude draft posts from public listing`
    - `chore(app): update next.js to 16.3.5`
- Nunca commitar um teste falhando, a menos que seja explicitamente um spike WIP (e a mensagem do commit diga isso).
