# beTalent-Test

Repositório de testes que reúne **testes manuais** e **testes automatizados** para duas aplicações de referência: a interface web [SauceDemo](https://www.saucedemo.com/) e a API [Restful Booker](https://restful-booker.herokuapp.com). O objetivo é centralizar planejamento, execução e evidências de qualidade em um único lugar.

---

## Planos de teste

Na raiz do repositório estão os documentos de planejamento:

| Arquivo | Escopo |
|---------|--------|
| `Plano-de-Teste-Sauce-Demo.pdf` | Interface web (SauceDemo) |
| `Plano-de-Teste-Restful-Booker.pdf` | API (Restful Booker) |

Esses planos orientam **o que será testado** antes da execução. Em cada um há **cenários de teste** e o **objetivo** de cada validação — servindo como base tanto para os testes manuais quanto para os automatizados, sem substituir os detalhes de implementação em cada pasta.

---

## Estrutura do repositório

| Pasta / arquivo | Descrição |
|-----------------|-----------|
| `teste-manual/` | Execução manual: testes de UI no navegador, testes de API no Postman e relatórios de evidência em PDF. |
| `teste-automatizado/` | Automação com Playwright e TypeScript (cenários de API e de interface). |
| `Plano-de-Teste-*.pdf` | Planos de teste na raiz (ver seção acima). |

Para instalar dependências, rodar testes ou entender a arquitetura de cada parte, consulte o README da pasta correspondente:

- [teste-manual/README.md](teste-manual/README.md)
- [teste-automatizado/README.md](teste-automatizado/README.md)
