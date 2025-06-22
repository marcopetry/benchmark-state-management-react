# 📊 Benchmark de Bibliotecas de Gerenciamento de Estado em React

Este projeto realiza benchmarks automatizados para comparar o desempenho de diversas bibliotecas de gerenciamento de estado no React, usando:

- [Playwright](https://playwright.dev/) para interações reais com a interface
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/) para análise de métricas de performance

A aplicação testa diferentes bibliotecas em três níveis de carga: com 10, 100 e 1000 itens, e repete os testes múltiplas vezes para garantir confiabilidade estatística.

---

## ⚙️ Pré-requisitos

- Node.js ≥ 18
- Docker
- Linux/macOS (scripts usam `bash`, permissões etc.)

---

## 📦 Uso dos Scripts do `package.json`

Todos os testes e processamento de resultados podem ser feitos com **scripts `npm` já prontos**. Abaixo está o guia completo do que cada comando faz e o que esperar.

---

## 🧱 Build da Aplicação

### `npm run build`

## Se for rodar local

```bash
npm i
npm build
npm serve
```

> Gera o bundle da aplicação com Vite para servir localmente ou ser usado pelos containers.

- O build é salvo em `dist/`
- Usado quando a aplicação será servida via `npm run serve` ou pelo container Lighthouse/Playwright
- **Necessário antes de qualquer benchmark local**

---

## 🎭 Benchmarks com Playwright

Playwright executa testes reais simulando um usuário acessando a página, clicando no botão “Adicionar ao Carrinho” e capturando as métricas de Web Vitals da aplicação renderizada.

### 🔨 `npm run build:playwright`

```bash
npm run build:playwright
```

> Cria a imagem Docker `benchmark-playwright`.

**O que acontece:**

- Usa `Dockerfile.playwright`
- Baseado em `mcr.microsoft.com/playwright`
- Instala dependências e copia o projeto para dentro do container
- Garante que a pasta `/app/metrics-playwright` exista com permissões corretas
- **Resultado:** imagem Docker pronta para executar benchmarks com `chromium`

---

### 🧪 `npm run test:playwright`

```bash
npm run test:playwright
```

> Executa todo o fluxo Playwright: rodar os testes e gerar o relatório final.

Este script encadeia dois outros:

#### 1. `npm run test:playwright:run`

```bash
sudo rm -rf metrics-playwright && sudo ./benchmark/benchmark-script.sh playwright
```

- Apaga resultados anteriores de `metrics-playwright`
- Roda o script `benchmark-script.sh` com argumento `playwright`
- Esse script:
  - Define variáveis como `LIBS`, `ITEMS_LIST` e `TOTAL_ACESSOS`
  - Roda o container `benchmark-playwright`
  - Dentro do container, o script `benchmark-playwright.js`:
    - Acessa URLs como `/zustand/products?items=100`
    - Simula um clique no botão "Adicionar ao Carrinho"
    - Lê `window.__CWV_METRICS__` com FCP, LCP etc.
    - Salva arquivos como `zustand-qtd-items-100-run-2.json`

#### 2. `npm run test:playwright:post`

```bash
sudo rm -rf insights-playwright && node benchmark/extract-playwright.js
```

- Apaga relatórios anteriores de `insights-playwright`
- Executa `extract-playwright.js`, que:
  - Agrupa os `.json` da pasta `metrics-playwright`
  - Calcula métricas agregadas por lib e quantidade de itens:
    - Média
    - Desvio padrão
    - Quantidade de execuções
  - Salva o resumo estruturado em `insights-playwright/`

---

## 💡 Benchmarks com Lighthouse

Lighthouse mede métricas como FCP, LCP, TTI, TBT, CLS com base na renderização do bundle da aplicação (gerado com Vite).

### 🔨 `npm run build:lighthouse`

```bash
npm run build:lighthouse
```

> Cria a imagem Docker `benchmark-lighthouse`.

- Usa `Dockerfile.lighthouse`
- Instala Lighthouse e configura ambiente para rodar contra as páginas da aplicação
- **Resultado:** imagem Docker pronta para análise automatizada de performance

---

### 🧪 `npm run test:lighthouse`

```bash
npm run test:lighthouse
```

> Executa todo o fluxo Lighthouse: testes + processamento de resultados.

Este script encadeia dois outros:

#### 1. `npm run test:lighthouse:run`

```bash
sudo rm -rf metrics-lighthouse && sudo ./benchmark/benchmark-script.sh lighthouse
```

- Apaga dados antigos
- Executa container `benchmark-lighthouse`
- Faz múltiplas rodadas de análise Lighthouse em cada lib e configuração de itens
- Salva resultados em `metrics-lighthouse/*.json`

#### 2. `npm run test:lighthouse:post`

```bash
sudo rm -rf insights-lighthouse && node benchmark/extract-lighthouse.js
```

- Processa os dados brutos
- Calcula médias e desvios padrão para cada biblioteca e quantidade de itens
- Salva resultados agregados em `insights-lighthouse/`

---

## 🌐 Executando contra Aplicação Online

Você pode executar os benchmarks Lighthouse ou Playwright contra uma aplicação hospedada, como Vercel, usando o flag `--online`:

```bash
./benchmark/benchmark-script.sh both --online
```

- Usa o domínio: `https://benchmark-state-management-react.vercel.app`
- Exemplo de URL testada:  
  `https://benchmark-state-management-react.vercel.app/jotai/products?items=100`

---

## 📁 Estrutura de Resultados

| Pasta                  | Conteúdo                                                    |
| ---------------------- | ----------------------------------------------------------- |
| `metrics-playwright/`  | Métricas cruas extraídas do navegador (1 JSON por execução) |
| `metrics-lighthouse/`  | Resultados brutos do Lighthouse (1 JSON por execução)       |
| `insights-playwright/` | Relatórios agregados (por lib e quantidade de itens)        |
| `insights-lighthouse/` | Relatórios agregados Lighthouse                             |

---

## 📌 Observações Finais

- Todos os dados gerados são usados para comparar bibliotecas com base em métricas **reais de UX e performance**.
- Os testes são reproduzíveis e automatizados com Docker para garantir **consistência entre execuções**.
- Os scripts foram projetados para rodar tanto localmente quanto online com uma única flag.

---

Se quiser, posso adicionar uma seção com **gráficos em Recharts** ou gerar os dados em formato CSV/Excel. É só pedir!
