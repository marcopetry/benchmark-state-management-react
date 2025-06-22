import { chromium } from "playwright";
import fs from "fs/promises";
import path from "path";

const LIBS = process.env.LIBS ? process.env.LIBS.split(",") : [];
const ITEMS_LIST = process.env.ITEMS_LIST
  ? process.env.ITEMS_LIST.split(",").map(Number)
  : [];
const TOTAL_ACESSOS = Number(process.env.TOTAL_ACESSOS || "5");
const ONLINE = process.env.ONLINE === "true";
const METRICS_DIR = path.resolve("metrics-playwright");

if (LIBS.length === 0) {
  console.error("❌ LIBS não definido ou vazio.");
  process.exit(1);
}

if (ITEMS_LIST.length === 0) {
  console.error("❌ ITEMS_LIST não definido ou vazio.");
  process.exit(1);
}

await fs.mkdir(METRICS_DIR, { recursive: true });

async function rodarPlaywright(lib, items, indice) {
  const url = ONLINE
    ? `https://benchmark-state-management-react.vercel.app/${lib}/products?items=${items}`
    : `http://0.0.0.0:3000/${lib}/products?items=${items}`;

  console.log("Visitando página no servidor " + url);

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(3000);

    const firstButton = await page
      .locator("button", { hasText: "Adicionar ao Carrinho" })
      .first();
    await firstButton.click();

    await page.waitForTimeout(1000);

    const metrics = await page.evaluate(() => window.__CWV_METRICS__);

    const outputPath = path.join(
      METRICS_DIR,
      `${lib}-qtd-items-${items}-run-${indice}.json`
    );

    await fs.writeFile(outputPath, JSON.stringify(metrics, null, 2));
    console.log(`✅ ${lib} [${items}] → ${path.basename(outputPath)}`);
  } catch (err) {
    console.error(
      `❌ Erro no playwright ${lib} [${items}] índice ${indice}:`,
      err.message
    );
  } finally {
    await browser.close();
  }
}

async function executarTestes() {
  for (const lib of LIBS) {
    for (const items of ITEMS_LIST) {
      console.log(`🚀 Iniciando testes para ${lib} com ${items} itens`);
      for (let i = 0; i < TOTAL_ACESSOS; i++) {
        await rodarPlaywright(lib, items, i);
      }
      console.log(`🏁 Finalizado ${lib} com ${items} itens`);
    }
  }
  console.log("🎉 Todos os benchmarks Playwright foram concluídos!");
}

await executarTestes();
