import fs from "fs/promises";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const LIBS = process.env.LIBS ? process.env.LIBS.split(",") : [];
const ITEMS_LIST = process.env.ITEMS_LIST
  ? process.env.ITEMS_LIST.split(",").map(Number)
  : [];
const TOTAL_ACESSOS = Number(process.env.TOTAL_ACESSOS || "5");
const METRICS_DIR = path.resolve("metrics-lighthouse");
const ONLINE = process.env.ONLINE === "true"; // lê flag --online como variável de ambiente

if (LIBS.length === 0) {
  console.error("❌ LIBS não definido ou vazio.");
  process.exit(1);
}

if (ITEMS_LIST.length === 0) {
  console.error("❌ ITEMS_LIST não definido ou vazio.");
  process.exit(1);
}

await fs.mkdir(METRICS_DIR, { recursive: true });

async function rodarLighthouse(lib, items, indice) {
  // Definindo a URL dependendo da flag ONLINE
  const url = ONLINE
    ? `https://benchmark-state-management-react.vercel.app/${lib}/products?items=${items}`
    : `http://0.0.0.0:3000/${lib}/products?items=${items}`;

  console.log("Rodando os testes no servidor " + url);

  const outputPath = path.join(
    METRICS_DIR,
    `${lib}-qtd-items-${items}-run-${indice}.json`
  );

  await fs.mkdir(METRICS_DIR, { recursive: true });

  const comando = `lighthouse "${url}" \
    --output json \
    --output-path "${outputPath}" \
    --quiet \
    --only-categories=performance \
    --timeout=180 \
    --chrome-flags="--headless --no-sandbox --disable-gpu --disable-dev-shm-usage --disable-setuid-sandbox"`;

  try {
    await execAsync(comando);
    console.log(`✅ ${lib} [${items}] → ${path.basename(outputPath)}`);
  } catch (err) {
    console.error(
      `❌ Erro no lighthouse ${lib} [${items}] índice ${indice}:`,
      err.stderr || err.message
    );
  }
}

async function executarTestes() {
  for (const lib of LIBS) {
    for (const items of ITEMS_LIST) {
      console.log(`🚀 Iniciando testes para ${lib} com ${items} itens`);
      for (let i = 0; i < TOTAL_ACESSOS; i++) {
        await rodarLighthouse(lib, items, i);
      }
      console.log(`🏁 Finalizado ${lib} com ${items} itens`);
    }
  }
  console.log("🎉 Todos os benchmarks foram concluídos!");
}

await executarTestes();
