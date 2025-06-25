import fs from "fs/promises";
import path from "path";

// Diretórios e arquivo de saída
const METRICS_DIR = "./metrics-lighthouse";
const OUTPUT_DIR = "./insights-lighthouse";
const OUTPUT_FILE = "summary-metrics.json";

// Parse manual da flag --run
const args = process.argv.slice(2);
const runFlag = args.find((arg) => arg.startsWith("--run"));
let maxRuns = null;

if (runFlag) {
  const [, value] = runFlag.includes("=")
    ? runFlag.split("=")
    : [null, args[args.indexOf(runFlag) + 1]];
  maxRuns = Number(value);
  if (isNaN(maxRuns)) {
    console.error("❌ Valor inválido para --run");
    process.exit(1);
  }
}

function parseFilename(filename) {
  const regex = /^(.+)-qtd-items-(\d+)-run-(\d+)\.json$/;
  const match = filename.match(regex);
  if (!match) return null;

  const [_, lib, items, run] = match;
  return {
    lib,
    items: Number(items),
    run: Number(run),
    filename,
  };
}

async function main() {
  const files = await fs.readdir(METRICS_DIR);
  const parsedFiles = files.map(parseFilename).filter(Boolean);

  // Agrupar por lib-items
  const groupedFiles = {};
  for (const file of parsedFiles) {
    const key = `${file.lib}-${file.items}`;
    if (!groupedFiles[key]) groupedFiles[key] = [];
    groupedFiles[key].push(file);
  }

  const grouped = {};

  for (const [key, fileList] of Object.entries(groupedFiles)) {
    fileList.sort((a, b) => a.run - b.run);
    const selectedFiles = maxRuns ? fileList.slice(0, maxRuns) : fileList;

    for (const file of selectedFiles) {
      const filePath = path.join(METRICS_DIR, file.filename);
      const content = await fs.readFile(filePath, "utf8");

      let json;
      try {
        json = JSON.parse(content);
      } catch (e) {
        console.warn(`❌ Erro ao parsear ${file.filename}:`, e);
        continue;
      }

      const { lib, items } = file;

      const fcp = json.audits?.["first-contentful-paint"]?.numericValue;
      const lcp = json.audits?.["largest-contentful-paint"]?.numericValue;
      const tbt = json.audits?.["total-blocking-time"]?.numericValue;
      const tti = json.audits?.["interactive"]?.numericValue;
      const domSize = json.audits?.["dom-size"]?.numericValue;

      if (
        fcp == null ||
        lcp == null ||
        tbt == null ||
        tti == null ||
        domSize == null
      ) {
        console.warn(`⚠️ Métricas ausentes em ${file.filename}`);
        continue;
      }

      if (!grouped[key]) {
        grouped[key] = {
          lib,
          items,
          fcpValues: [],
          lcpValues: [],
          tbtValues: [],
          ttiValues: [],
          domSizeValues: [],
        };
      }

      grouped[key].fcpValues.push(fcp);
      grouped[key].lcpValues.push(lcp);
      grouped[key].tbtValues.push(tbt);
      grouped[key].ttiValues.push(tti);
      grouped[key].domSizeValues.push(domSize);
    }
  }

  const summary = Object.values(grouped).map(
    ({
      lib,
      items,
      fcpValues,
      lcpValues,
      tbtValues,
      ttiValues,
      domSizeValues,
    }) => {
      const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
      const std = (arr, mean) =>
        Math.sqrt(
          arr.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / arr.length
        );

      const avgFCP = avg(fcpValues);
      const avgLCP = avg(lcpValues);
      const avgTBT = avg(tbtValues);
      const avgTTI = avg(ttiValues);
      const avgDOM = avg(domSizeValues);

      return {
        lib,
        items,
        runs: fcpValues.length,
        avgFCP,
        stdFCP: std(fcpValues, avgFCP),
        avgLCP,
        stdLCP: std(lcpValues, avgLCP),
        avgTBT,
        stdTBT: std(tbtValues, avgTBT),
        avgTTI,
        stdTTI: std(ttiValues, avgTTI),
        avgDOM,
        stdDOM: std(domSizeValues, avgDOM),
      };
    }
  );

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const outputPath = path.join(OUTPUT_DIR, OUTPUT_FILE);
  await fs.writeFile(outputPath, JSON.stringify(summary, null, 2), "utf8");

  console.log(`✅ Resumo salvo em ${outputPath}`);
}

main().catch((err) => {
  console.error("Erro geral:", err);
});
