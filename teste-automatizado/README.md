# Arquitetura dos testes automatizados — [Playwright + TypeScript]

Projeto de automação E2E com **testes de API** e **testes de UI**, organizado em camadas para facilitar manutenção, reuso e leitura.

---

## Requisitos e instalação

Antes de executar qualquer teste, é necessário preparar o ambiente local. Siga os passos abaixo **dentro da pasta** `teste-automatizado/`.

### 1. Node.js (obrigatório)

O projeto usa **Node.js** e **npm** para instalar dependências e rodar o Playwright. Sem o Node instalado, os comandos `npm install` e `npm run test:*` não funcionam.

**Versão recomendada:** Node.js **18 ou superior** (LTS).

**Verificar se já está instalado:**

```bash
node -v
npm -v
```

Exemplo de saída esperada:

```text
v22.x.x
10.x.x
```

**Se não tiver Node.js instalado:**

1. Acesse [https://nodejs.org/](https://nodejs.org/)
2. Baixe a versão **LTS**
3. Instale seguindo o assistente do sistema operacional
4. Feche e abra o terminal novamente
5. Confirme com `node -v` e `npm -v`

No macOS, também é possível usar [Homebrew](https://brew.sh/):

```bash
brew install node
```

### 2. Clonar ou abrir o projeto

O repositório deve conter a pasta `teste-automatizado/` com os arquivos do projeto (`package.json`, `playwright.config.ts`, pasta `tests/`, etc.).

No terminal, entre **sempre** nesta pasta antes de instalar ou rodar testes:

```bash
cd caminho/para/beTalent-Test/teste-automatizado
```

> Todos os comandos `npm` deste README assumem que o terminal está em `teste-automatizado/`, não na pasta pai `beTalent-Test/`.

### 3. Instalar dependências do projeto

Na pasta `teste-automatizado/`, execute:

```bash
npm install
```

Esse comando:

- Cria a pasta `node_modules/` com Playwright, TypeScript e demais pacotes
- Executa automaticamente o script `postinstall`, que roda `playwright install` e baixa os browsers (Chromium, Firefox, WebKit)

A primeira instalação pode levar alguns minutos por causa do download dos browsers.

### 4. Variáveis de ambiente (opcional)

Por padrão, os testes usam as URLs públicas da API e do SauceDemo. Para alterá-las, copie o arquivo de exemplo:

```bash
cp .env.example .env
```

Edite o `.env` se necessário:

```env
BASE_URL=https://www.saucedemo.com/
API_BASE_URL=https://restful-booker.herokuapp.com
```

### 5. Validar a instalação

Confirme que o Playwright enxerga os testes:

```bash
npx playwright test --list
```

Execute um teste rápido de API:

```bash
npm run test:api
```

Execute um teste rápido de UI (Chromium):

```bash
npm run test:ui
```

Se ambos rodarem sem erro de *browser não encontrado* ou *comando não encontrado*, o ambiente está pronto.

### Problemas comuns na instalação

| Erro | Solução |
|------|---------|
| `command not found: npm` ou `node` | Instale o Node.js (passo 1) e reinicie o terminal |
| `Executable doesn't exist` (browser) | Rode `npm run test:ui-install` dentro de `teste-automatizado/` |
| Testes não aparecem na UI do Playwright | Use `npm run test:open` e marque os projetos `api` e `ui` no filtro |
| `ENOTFOUND` na API | Verifique conexão com a internet e a URL em `.env` |

---

## Stack

| Tecnologia | Uso |
|------------|-----|
| [Playwright Test](https://playwright.dev/) | Runner, assertions, API `request` e automação de browser |
| TypeScript | Tipagem estática e autocomplete |
| Page Object Model (POM) | Abstração das telas (UI) |
| API Clients | Abstração dos endpoints (API) |

## Aplicações sob teste

| Tipo | URL padrão | Pasta de testes |
|------|------------|-----------------|
| API | [Restful Booker](https://restful-booker.herokuapp.com) | `tests/e2e/api/` |
| UI | [SauceDemo / Swag Labs](https://www.saucedemo.com/) | `tests/e2e/ui/` |

URLs configuráveis via `.env` (veja `.env.example`).

---

## Estrutura de pastas

```
teste-automatizado/
├── tests/e2e/              # Specs (cenários de teste)
│   ├── api/                # Testes de API
│   └── ui/                 # Testes de interface
├── pages/                  # Page Objects (somente UI)
├── clients/                # Clientes HTTP (somente API)
├── data/                   # Massa de dados e constantes
├── types/                  # Contratos TypeScript (request/response)
├── fixtures/               # Fixtures customizadas do Playwright
├── helpers/                # Funções reutilizáveis entre specs
├── utils/                  # Utilitários genéricos
├── playwright.config.ts    # Config principal (CI, todos os browsers)
├── playwright.ui.config.ts # Config para UI Mode (API + UI juntos)
├── package.json
└── .env.example
```

---

## Arquitetura em camadas

A ideia é separar **o que testar** (specs), **como interagir** (pages/clients), **com o quê** (data) e **qual formato** (types).

```
┌─────────────────────────────────────────────────────────┐
│  tests/e2e/*.spec.ts     ← Cenários e asserções        │
├─────────────────────────────────────────────────────────┤
│  pages/ (UI)  │  clients/ (API)  │  helpers/           │
│  Interação com telas/endpoints                          │
├─────────────────────────────────────────────────────────┤
│  data/                   ← Dados de entrada esperados   │
├─────────────────────────────────────────────────────────┤
│  types/                  ← Tipos de payload e resposta    │
├─────────────────────────────────────────────────────────┤
│  fixtures/               ← Injeção de Page Objects      │
└─────────────────────────────────────────────────────────┘
```

### 1. `tests/e2e/` — Cenários de teste

Arquivos `*.spec.ts` com a lógica do cenário: preparação, ação e validação.

- **API** (`auth.spec.ts`, `booking.spec.ts`): usam `test`/`expect` do `@playwright/test` e o fixture `request` para chamadas HTTP.
- **UI** (`login.spec.ts`, `inventory.spec.ts`, `cart.spec.ts`): usam `test`/`expect` de `fixtures/test-fixtures.ts`, que já expõe os Page Objects.

Os specs devem permanecer **enxutos**: orquestram o fluxo; detalhes de seletores e URLs ficam nas camadas abaixo.

### 2. `pages/` — Page Object Model (UI)

Cada classe representa uma tela ou fluxo da aplicação web.

| Page Object | Responsabilidade |
|-------------|------------------|
| `LoginPage` | Login, mensagens de erro |
| `InventoryPage` | Listagem, ordenação, adicionar ao carrinho |
| `CartPage` | Carrinho, remover item, checkout |
| `CheckoutPage` | Formulário e resumo do pedido |
| `CheckoutCompletePage` | Confirmação da compra |

**Benefícios:** se o HTML mudar, altera-se um único arquivo; os testes continuam legíveis (`loginPage.login(user, pass)`).

O SauceDemo usa `data-test` como atributo de teste. Isso está configurado em `playwright.config.ts`:

```ts
testIdAttribute: 'data-test'
```

Assim, `getByTestId('username')` resolve para `data-test="username"`.

### 3. `clients/` — Clientes de API

Encapsulam chamadas HTTP, semelhante aos Page Objects, mas para REST.

| Client | Endpoints |
|--------|-----------|
| `AuthClient` | `POST /auth` |
| `BookingClient` | CRUD e filtros de `/booking` |

Usam `APIRequestContext` do Playwright com `baseURL` do projeto `api`. Paths são relativos (`/booking`, `/auth`).

### 4. `data/` — Dados de teste

Centraliza credenciais, payloads, produtos e opções de ordenação.

| Arquivo | Conteúdo |
|---------|----------|
| `auth.data.ts` | Usuário/senha válidos e inválidos (API) |
| `booking.data.ts` | Payloads de reserva, filtros, IDs |
| `saucedemo.data.ts` | Usuários, senha, produtos, checkout, sort |

Evita “magic strings” espalhadas nos testes e facilita ajuste de massa em um só lugar.

### 5. `types/` — Contratos TypeScript

Define formatos de request/response (`AuthRequest`, `BookingRequest`, `SaucedemoUser`, etc.).

Garante que clients, data e specs usem estruturas consistentes e detecta erros em tempo de compilação.

### 6. `fixtures/` — Fixtures customizadas

`fixtures/test-fixtures.ts` estende o `test` do Playwright injetando Page Objects:

```ts
test('exemplo', async ({ loginPage, inventoryPage }) => {
  await loginPage.goto();
});
```

Somente os testes de **UI** importam deste arquivo. Testes de **API** usam o `test` padrão do Playwright.

### 7. `helpers/` — Lógica compartilhada

Funções usadas por vários specs, por exemplo `getAuthToken()` em `auth.helper.ts`, que autentica via `AuthClient` e retorna o token para testes de booking que exigem autorização.

### 8. `utils/` — Utilitários genéricos

Funções sem vínculo com um domínio específico (ex.: `slugify`).

---

## Projetos Playwright

O `playwright.config.ts` define **projetos** independentes no mesmo repositório:

| Projeto | Escopo | `baseURL` |
|---------|--------|-----------|
| `api` | `tests/e2e/api/**/*.spec.ts` | Restful Booker |
| `ui-chromium` | `tests/e2e/ui/**/*.spec.ts` | SauceDemo + Chrome |
| `ui-firefox` | idem | SauceDemo + Firefox |
| `ui-webkit` | idem | SauceDemo + Safari |

Cada projeto pode ter `use` diferente (browser, `baseURL`, trace, vídeo).

O arquivo `playwright.ui.config.ts` é uma variante para o **UI Mode** (`npm run test:open`), listando projetos `api` e `ui` (Chromium) na interface gráfica.

---

## Fluxo típico

### Teste de API

```
spec → BookingClient → POST /booking (baseURL da API)
     → data/booking.data.ts (payload)
     → types/booking.types.ts (tipagem)
     → helpers/auth.helper.ts (token, se necessário)
```

### Teste de UI

```
spec → fixtures (loginPage, cartPage, …)
     → Page Object (ações e locators)
     → data/saucedemo.data.ts (usuário, produto, checkout)
     → browser (baseURL do SauceDemo)
```

---

## Variáveis de ambiente

As URLs padrão estão em `.env.example`. Para personalizar, copie para `.env` (detalhes no passo 4 de [Requisitos e instalação](#requisitos-e-instalação)).

---

## Convenções adotadas

1. **Separação API × UI** — pastas, projetos e configs distintas; sem misturar `request` com `page` no mesmo client.
2. **Page Object / API Client** — interação técnica isolada dos cenários.
3. **Data-driven** — dados sensíveis e massas em `data/`, não hardcoded nos specs.
4. **Tipagem** — `types/` para contratos de API e domínio UI.
5. **Testes explícitos** — um `test()` por cenário (sem loops), facilitando execução e manutenção individual.
6. **Seletores estáveis (UI)** — prioridade a `data-test` via `getByTestId`.

---

## Relatórios e evidências

- Relatório HTML: `playwright-report/` (após execução).
- Em falhas de UI: screenshot, vídeo e trace (conforme `playwright.config.ts`).
- Resultados temporários: `test-results/`.

---

## Extensão do projeto

| Adicionar… | Onde |
|------------|------|
| Novo cenário API | `tests/e2e/api/` + client em `clients/` se houver novo recurso |
| Novo cenário UI | `tests/e2e/ui/` + page em `pages/` + fixture em `fixtures/` |
| Novos dados | `data/*.data.ts` |
| Novo tipo de payload | `types/*.types.ts` |

---

## Como executar os testes

Com a estrutura e as convenções definidas acima, utilize os scripts do `package.json` para rodar os testes localmente.

> Se ainda não instalou o projeto, siga primeiro [Requisitos e instalação](#requisitos-e-instalação).

### Scripts npm (principais)

Todos os comandos abaixo devem ser executados na raiz do projeto (`teste-automatizado/`).

#### Execução geral

| Script | O que faz |
|--------|-----------|
| `npm test` | Executa **todos** os projetos (API + UI em Chromium, Firefox e WebKit) |
| `npm run test:report-all` | Executa tudo e **abre o relatório HTML** ao final |

```bash
npm test
```

```bash
npm run test:report-all
```

#### Somente API

| Script | O que faz |
|--------|-----------|
| `npm run test:api` | Testes da pasta `tests/e2e/api/` (Restful Booker) |
| `npm run test:api-report` | Testes de API e **abre o relatório** ao final |

```bash
npm run test:api
```

```bash
npm run test:api-report
```

#### Somente UI

| Script | O que faz |
|--------|-----------|
| `npm run test:ui` | Testes de UI no **Chromium** |
| `npm run test:ui-all` | Testes de UI no Chromium, Firefox e WebKit |
| `npm run test:ui-report` | UI no Chromium e **abre o relatório** ao final |
| `npm run test:headed` | UI com **browser visível** (Chromium) |
| `npm run test:ui-interactive` | UI Mode apenas dos testes de interface |

```bash
npm run test:ui
```

```bash
npm run test:ui-all
```

```bash
npm run test:headed
```

```bash
npm run test:ui-report
```

#### Interface gráfica do Playwright (UI Mode)

| Script | O que faz |
|--------|-----------|
| `npm run test:open` | Abre a UI do Playwright com projetos **api** e **ui** |
| `npm run test:open-all` | UI Mode com API e UI nos 3 browsers |

```bash
npm run test:open
```

Na janela do Playwright, use o filtro **Projects** e marque `api` e `ui` para listar todos os arquivos de teste.

#### Debug e relatório

| Script | O que faz |
|--------|-----------|
| `npm run test:debug` | Abre o **Playwright Inspector** (passo a passo) |
| `npm run test:report` | Abre o **último relatório HTML** gerado (sem rodar testes) |

```bash
npm run test:debug
```

```bash
npm run test:report
```

---

### Relatório HTML após os testes

O Playwright gera o relatório em `playwright-report/` a cada execução.

**Opção 1 — scripts com relatório automático**

```bash
npm run test:api-report    # API → abre relatório
npm run test:ui-report     # UI (Chromium) → abre relatório
npm run test:report-all    # Tudo → abre relatório
```

**Opção 2 — executar e abrir manualmente**

```bash
npm run test:api
npm run test:report
```

**Opção 3 — um único comando (API + relatório)**

```bash
npm run test:api && npm run test:report
```

---

### Executar um arquivo ou teste específico

Use `npx playwright test` com caminho, projeto ou nome do teste:

```bash
# Um arquivo de API
npx playwright test tests/e2e/api/booking.spec.ts --project=api

# Um arquivo de UI
npx playwright test tests/e2e/ui/cart.spec.ts --project=ui-chromium

# UI com browser visível
npx playwright test tests/e2e/ui/cart.spec.ts --project=ui-chromium --headed

# Filtrar por nome do teste
npx playwright test --project=ui-chromium -g "remover produto"
```
---

### Resumo rápido

| Objetivo | Comando |
|----------|---------|
| Só API | `npm run test:api` |
| Só UI (Chrome) | `npm run test:ui` |
| API + relatório | `npm run test:api-report` |
| UI + relatório | `npm run test:ui-report` |
| Tudo + relatório | `npm run test:report-all` |
| Ver browser | `npm run test:headed` |
| Interface gráfica | `npm run test:open` |
| Só abrir relatório | `npm run test:report` |
| Instalar browsers | `npm run test:ui-install` |

