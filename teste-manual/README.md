# Testes manuais

Esta pasta reúne os **artefatos da execução manual** de testes de **front-end** e de **API**, além dos **relatórios de evidência** que comprovam que os testes foram realizados.

Os **planos de teste** (cenários, passos e resultados esperados) estão na **raiz do repositório**:

- `Plano-de-Teste-Sauce-Demo.pdf` — interface (SauceDemo)
- `Plano-de-Teste-Restful-Booker.pdf` — API (Restful Booker)

---

## O que há neste diretório

| Item | Descrição |
|------|-----------|
| `Restful-booker.postman_collection.json` | Collection Postman para execução manual da API Restful Booker |
| `evidencia-testes/` | Relatórios em PDF com capturas e registros da execução manual |
| `README.md` | Este guia |

---

## 1. Testes manuais de front-end (browser)

Os testes de interface da aplicação [SauceDemo / Swag Labs](https://www.saucedemo.com/) foram executados **manualmente no navegador** (Chrome, Firefox, Edge ou Safari), seguindo o plano de testes da raiz do repositório.

Não é necessário Postman para esta parte: a validação ocorre diretamente na UI (telas, formulários, mensagens e fluxos da aplicação).

A comprovação da execução está no relatório:

- `evidencia-testes/Relatório de Evidências de Testes - SauceDemo v1.pdf`

---

## 2. Testes manuais de API (Postman)

Os testes da API [Restful Booker](https://restful-booker.herokuapp.com) foram executados com o **Postman**, importando a collection desta pasta.

### Pré-requisito

É necessário ter o [Postman](https://www.postman.com/downloads/) instalado. Em seguida: **Import** → `Restful-booker.postman_collection.json`.

### Variáveis da collection

Crie ou preencha as **variáveis da collection** (aba *Variables* da collection **Restful-booker**) com os nomes e valores abaixo **antes** de executar os requests:

| Variável | Valor |
|----------|-------|
| `username` | `admin` |
| `password` | `password123` |
| `invalid_user` | `banana` |
| `wrong_password` | `banana` |
| `id_invalid` | `123456` |

As variáveis `auth_token` e `bookingid` são preenchidas automaticamente pelos scripts da collection durante a execução; não precisam ser definidas manualmente de início.

A comprovação da execução está no relatório:

- `evidencia-testes/Relatório de Evidências de Testes de API — Restful-Booker v1.pdf`

---

## 3. Relatórios de evidência

A pasta `evidencia-testes/` contém os **relatórios de evidências** usados para **demonstrar que os testes manuais foram realizados** — com registros visuais (screenshots, respostas, telas percorridas) alinhados aos planos de teste da raiz do projeto.

| Relatório | Escopo |
|-----------|--------|
| `Relatório de Evidências de Testes - SauceDemo v1.pdf` | Front-end (browser) |
| `Relatório de Evidências de Testes de API — Restful-Booker v1.pdf` | API (Postman) |

Consulte esses PDFs para auditoria, revisão ou entrega do trabalho de teste manual.
