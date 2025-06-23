import fs from "fs/promises";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const LIBS = [
//  "react-context-api",
//  "zustand",
//  "jotai",
  "valtio",
  "recoil",
  "effector",
  "redux-toolkit",
  "rematch",
  "hookstate",
  "use-context-selector",
  "constate",
];

const ITEMS_LIST = [10, 100, 1000];

// ✅ Lendo da variável de ambiente, com fallback para 2
const TOTAL_ACESSOS = 20 // parseInt(process.env.TOTAL_ACESSOS || "20", 10);
const ONLINE = process.env.ONLINE === "true";

const METRICS_DIR = path.resolve("metrics-lighthouse");
await fs.mkdir(METRICS_DIR, { recursive: true });

async function rodarLighthouse(lib, items, indice) {
  const url = ONLINE
    ? `https://benchmark-state-management-react.vercel.app/${lib}/products?items=${items}`
    : `http://0.0.0.0:3000/${lib}/products?items=${items}`;

  const outputPath = path.join(
    METRICS_DIR,
    `${lib}-qtd-items-${items}-run-${indice}.json`
  );

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
