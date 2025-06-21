import { chromium } from "playwright";
import fs from "fs/promises";
import path from "path";

const LIB_NAME = process.env.LIB_NAME;
const ITEMS = Number(process.env.ITEMS || "100");
const TOTAL_ACESSOS = Number(process.env.TOTAL_ACESSOS || "5");
const PARALELO = Number(process.env.PARALELO || "5");
const METRICS_DIR = path.resolve("metrics-playwright");

if (!LIB_NAME) {
  console.error("❌ LIB_NAME não definido.");
  process.exit(1);
}

await fs.mkdir(METRICS_DIR, { recursive: true });

async function visitar(lib, items, indice) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const url = `https://benchmark-state-management-react.vercel.app/${lib}/products?items=${items}`;
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);

  const firstButton = await page
    .locator("button", { hasText: "Adicionar ao Carrinho" })
    .first();
  await firstButton.click();

  // Espera 1 segundo após o clique
  await page.waitForTimeout(1000);

  const metrics = await page.evaluate(() => {
    return window.__CWV_METRICS__;
  });

  const dir = path.join(METRICS_DIR, lib, `${items}`);
  await fs.mkdir(dir, { recursive: true });

  const filePath = path.join(dir, `metric-${indice}.json`);
  await fs.writeFile(filePath, JSON.stringify(metrics, null, 2));

  console.log(`✅ ${lib} [${items}] → metric-${indice}.json`);
  await browser.close();
}

async function executarTestes() {
  let emExecucao = [];

  for (let i = 0; i < TOTAL_ACESSOS; i++) {
    const execucao = visitar(LIB_NAME, ITEMS, i);
    emExecucao.push(execucao);

    if (emExecucao.length >= PARALELO) {
      await Promise.all(emExecucao);
      emExecucao = [];
    }
  }

  await Promise.all(emExecucao);
  console.log(`🏁 Concluído: ${LIB_NAME} [${ITEMS}]`);
}

await executarTestes();
