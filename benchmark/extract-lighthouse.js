import fs from "fs/promises";
import path from "path";

const METRICS_DIR = "./metrics-lighthouse";
const OUTPUT_DIR = "./insights-lighthouse";
const OUTPUT_FILE = "summary-metrics.json";

function parseFilename(filename) {
  const regex = /^(.+)-qtd-items-(\d+)-run-(\d+)\.json$/;

  const match = filename.match(regex);
  if (!match) return null;

  const [_, lib, items, run] = match;
  return {
    lib,
    items: Number(items),
    run: Number(run),
  };
}

async function main() {
  const files = await fs.readdir(METRICS_DIR);
  const grouped = {};

  for (const file of files) {
    const meta = parseFilename(file);
    if (!meta) continue;

    const filePath = path.join(METRICS_DIR, file);
    const content = await fs.readFile(filePath, "utf8");

    let json;
    try {
      json = JSON.parse(content);
    } catch (e) {
      console.warn(`❌ Erro ao parsear ${file}:`, e);
      continue;
    }

    const { lib, items } = meta;
    const fcp = json.audits?.["first-contentful-paint"]?.numericValue;
    const lcp = json.audits?.["largest-contentful-paint"]?.numericValue;

    if (fcp == null || lcp == null) {
      console.warn(`⚠️ Métricas ausentes em ${file}`);
      continue;
    }

    const key = `${lib}-${items}`;
    if (!grouped[key]) {
      grouped[key] = { lib, items, fcpValues: [], lcpValues: [] };
    }

    grouped[key].fcpValues.push(fcp);
    grouped[key].lcpValues.push(lcp);
  }

  // Calcular médias
  const summary = Object.values(grouped).map(
    ({ lib, items, fcpValues, lcpValues }) => {
      const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
      const std = (arr, mean) =>
        Math.sqrt(
          arr.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / arr.length
        );

      const avgFCP = avg(fcpValues);
      const avgLCP = avg(lcpValues);

      return {
        lib,
        items,
        runs: fcpValues.length,
        avgFCP,
        stdFCP: std(fcpValues, avgFCP),
        avgLCP,
        stdLCP: std(lcpValues, avgLCP),
      };
    }
  );

  // Cria o diretório de saída se não existir
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const outputPath = path.join(OUTPUT_DIR, OUTPUT_FILE);
  await fs.writeFile(outputPath, JSON.stringify(summary, null, 2), "utf8");

  console.log(`✅ Resumo salvo em ${outputPath}`);
}

main().catch((err) => {
  console.error("Erro geral:", err);
});
