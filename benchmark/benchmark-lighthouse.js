import { exec } from "child_process";
import fs from "fs/promises";
import path from "path";
import { promisify } from "util";

const execAsync = promisify(exec);

const LIB_NAME = process.env.LIB_NAME;
const ITEMS = Number(process.env.ITEMS || "100");
const TOTAL_ACESSOS = Number(process.env.TOTAL_ACESSOS || "5");
const PARALELO = Number(process.env.PARALELO || "5");
const METRICS_DIR = path.resolve("metrics-lighthouse");

if (!LIB_NAME) {
  console.error("❌ LIB_NAME não definido.");
  process.exit(1);
}

await fs.mkdir(METRICS_DIR, { recursive: true });

async function rodarLighthouse(lib, items, indice) {
  const url = `https://benchmark-state-management-react.vercel.app/${lib}/products?items=${items}`;
  const outputDir = path.join(METRICS_DIR, lib, `${items}`);
  const outputPath = path.join(outputDir, `lighthouse-${indice}.json`);

  await fs.mkdir(outputDir, { recursive: true });

  const comando = `lighthouse "${url}" \
  --output json \
  --output-path "${outputPath}" \
  --quiet \
  --chrome-flags="--headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage --disable-setuid-sandbox"`;

  try {
    await execAsync(comando);
    console.log(`✅ ${lib} [${items}] → lighthouse-${indice}.json`);
  } catch (err) {
    console.error(
      `❌ Erro no lighthouse ${indice}:`,
      err.stderr || err.message
    );
  }
}

async function executarTestes() {
  let emExecucao = [];

  for (let i = 0; i < TOTAL_ACESSOS; i++) {
    const execucao = rodarLighthouse(LIB_NAME, ITEMS, i);
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
