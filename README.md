# io-creches

Sistema web de gestão de creches municipais: cadastro de crianças, turmas, responsáveis,
matrículas e registro de frequência.

> Estado atual: estrutura inicial com dados fictícios em memória. Ainda não há backend nem
> autenticação real.

## Stack

| Ferramenta | Uso |
| --- | --- |
| [Vue 3](https://vuejs.org/) | Framework (Composition API, `<script setup>`) |
| [Vuetify 4](https://vuetifyjs.com/) | Componentes de interface (Material Design), locale pt, tema claro/escuro |
| [Vue Router 5](https://router.vuejs.org/) | Rotas e proteção das páginas |
| [Pinia](https://pinia.vuejs.org/) | Gerenciamento de estado (stores) |
| [Bun](https://bun.sh/) | Gerenciador de pacotes e execução de scripts |
| [Vite](https://vite.dev/) | Servidor de desenvolvimento e build |
| ESLint + Oxlint + Prettier | Qualidade e formatação do código |

Linguagem: JavaScript.

## Como rodar

Pré-requisitos: [Bun](https://bun.sh/) 1.x (e Node.js 22.18+ ou 24.12+).

```bash
bun install        # instala as dependências
bun dev            # servidor de desenvolvimento em http://localhost:3000
bun run build      # build de produção na pasta dist/
bun run preview    # serve o build localmente
bun run lint       # oxlint + eslint (com correção automática)
bun run format     # formata o código com Prettier
```

Na tela de login, qualquer e-mail e senha são aceitos (login provisório).

## Estrutura

```
src/
├── components/    # Componentes reutilizáveis (PageHeader, StatCard, FormDialog, ConfirmDialog…)
├── composables/   # Lógica reutilizável (tema, telas de cadastro)
├── data/          # Dados fictícios (mock.js), opções de formulários e itens do menu
├── layouts/       # DefaultLayout (menu lateral + barra superior) e BlankLayout (login)
├── pages/         # Uma página por rota
├── plugins/       # Registro do Vuetify, Pinia e Router
├── router/        # Definição das rotas e guarda de autenticação
├── services/      # Camada de acesso a dados (api.js + adaptador mock)
├── stores/        # Stores Pinia (crianças, turmas, responsáveis, matrículas, frequência…)
├── styles/        # CSS global
├── utils/         # Formatação de datas/idade e regras de validação
├── App.vue
└── main.js
```

### Páginas

| Rota | Página |
| --- | --- |
| `/login` | Login (provisório) |
| `/` | Dashboard com indicadores e ocupação das turmas |
| `/criancas` | Cadastro de crianças |
| `/turmas` | Cadastro de turmas |
| `/responsaveis` | Cadastro de responsáveis |
| `/matriculas` | Matrículas por ano letivo |
| `/frequencia` | Registro diário de presença por turma |
| `/configuracoes` | Dados da instituição e tema |

## Camada de dados

Páginas e stores acessam dados **somente** por `src/services/api.js`, que expõe uma interface
simples (`list`, `get`, `create`, `update`, `remove`) por coleção. Hoje ela usa
`src/services/mockAdapter.js`, que guarda tudo em memória (os dados voltam ao estado inicial ao
recarregar a página).

Para integrar um backend real (por exemplo, Directus ou uma API REST própria), crie um novo
adaptador com a mesma interface e troque-o em `api.js`. A URL da API pode ser configurada em um
arquivo `.env` (veja `.env.example`).
