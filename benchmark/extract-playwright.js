import fs from "fs/promises";
import path from "path";

const METRICS_DIR = "./metrics-playwright";
const OUTPUT_DIR = "./insights-playwright";
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

function parseMs(value) {
  if (typeof value === "string") {
    return parseFloat(value.replace(" ms", "").trim());
  }
  return Number(value);
}

function avg(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function std(arr, mean) {
  return Math.sqrt(
    arr.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / arr.length
  );
}

async function main() {
  const files = await fs.readdir(METRICS_DIR);
  const grouped = {};

  for (const file of files) {
    const meta = parseFilename(file);
    if (!meta) continue;

    const filePath = path.join(METRICS_DIR, file);
    let json;
    try {
      json = JSON.parse(await fs.readFile(filePath, "utf8"));
    } catch (e) {
      console.warn(`❌ Erro ao parsear ${file}:`, e);
      continue;
    }

    const { lib, items } = meta;
    const key = `${lib}-${items}`;

    if (!grouped[key]) {
      grouped[key] = {
        lib,
        items,
        count: 0,
        metricArrays: {}, // { metricName: [val1, val2, ...] }
      };
    }

    grouped[key].count += 1;

    for (const [metricName, rawValue] of Object.entries(json)) {
      const parsed = parseMs(rawValue);
      if (isNaN(parsed)) continue;

      if (!grouped[key].metricArrays[metricName]) {
        grouped[key].metricArrays[metricName] = [];
      }
      grouped[key].metricArrays[metricName].push(parsed);
    }
  }

  // Monta o resumo
  const summary = Object.values(grouped).map(
    ({ lib, items, count, metricArrays }) => {
      const result = {
        lib,
        items,
        runs: count,
      };

      for (const [metricName, values] of Object.entries(metricArrays)) {
        const media = avg(values);
        const desvio = std(values, media);
        const normalizedName = metricName
          .replace(/\s+/g, "") // remove espaços
          .replace(/[()]/g, ""); // remove parênteses

        result[`avg${normalizedName}`] = media;
        result[`std${normalizedName}`] = desvio;
      }

      return result;
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
