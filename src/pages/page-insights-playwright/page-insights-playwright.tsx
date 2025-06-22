import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import styles from "./page-insights-playwright.module.css";

import * as dataDefault from "../../../insights-playwright/summary-metrics.json";
import { MetricPlayWright } from "@/types/metric-playwright.types";

const data = (dataDefault as unknown as { default: MetricPlayWright[] })
  .default;

const libs = [...new Set(data.map((d) => d.lib))];

const comparativeData = Array.from(new Set(data.map((d) => d.items)))
  .sort((a, b) => a - b)
  .map((items) => {
    const entry: any = { items };
    for (const lib of libs) {
      const match = data.find((d) => d.items === items && d.lib === lib);
      entry[lib] = match?.avgTimetoInteractive ?? null;
    }
    return entry;
  });

export function PageInsightsPlaywright() {
  const [selectedLib, setSelectedLib] = useState(libs[0]);

  const filteredData = data
    .filter((d) => d.lib === selectedLib)
    .sort((a, b) => a.items - b.items);

  return (
    <div className={styles.container}>
      <h2>Resumo de Métricas - {selectedLib}</h2>

      <label className={styles.selectLabel}>
        Selecione a biblioteca:{" "}
        <select
          value={selectedLib}
          onChange={(e) => setSelectedLib(e.target.value)}
        >
          {libs.map((lib) => (
            <option key={lib} value={lib}>
              {lib}
            </option>
          ))}
        </select>
      </label>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="items"
              label={{
                value: "Qtd Itens",
                position: "insideBottomRight",
                offset: -5,
              }}
            />
            <YAxis
              label={{ value: "ms", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="avgTimetoInteractive"
              stroke="#8884d8"
              name="Time to Interactive"
            />
            <Line
              type="monotone"
              dataKey="avgDOMContentLoaded"
              stroke="#82ca9d"
              name="DOMContentLoaded"
            />
            <Line
              type="monotone"
              dataKey="avgLCP"
              stroke="#ff7300"
              name="LCP"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h3>Tabela Completa</h3>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Lib</th>
              <th className={styles.th}>Itens</th>
              <th className={styles.th}>Runs</th>
              <th className={styles.th}>Avg TTI (ms)</th>
              <th className={styles.th}>Std TTI (ms)</th>
              <th className={styles.th}>Avg DOMContentLoaded (ms)</th>
              <th className={styles.th}>Std DOMContentLoaded (ms)</th>
              <th className={styles.th}>Avg Render Time (ms)</th>
              <th className={styles.th}>Std Render Time (ms)</th>
              <th className={styles.th}>Avg FP (ms)</th>
              <th className={styles.th}>Std FP (ms)</th>
              <th className={styles.th}>Avg TTFB (ms)</th>
              <th className={styles.th}>Std TTFB (ms)</th>
              <th className={styles.th}>Avg FCP (ms)</th>
              <th className={styles.th}>Std FCP (ms)</th>
              <th className={styles.th}>Avg LCP (ms)</th>
              <th className={styles.th}>Std LCP (ms)</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, i) => (
              <tr key={i} className={styles.trRow}>
                <td className={styles.td}>{row.lib}</td>
                <td className={styles.td}>{row.items}</td>
                <td className={styles.td}>{row.runs}</td>
                <td className={styles.td}>
                  {row.avgTimetoInteractive.toFixed(2)}
                </td>
                <td className={styles.td}>
                  {row.stdTimetoInteractive.toFixed(2)}
                </td>
                <td className={styles.td}>
                  {row.avgDOMContentLoaded.toFixed(2)}
                </td>
                <td className={styles.td}>
                  {row.stdDOMContentLoaded.toFixed(2)}
                </td>
                <td className={styles.td}>
                  {row.avgRenderTimeTotal.toFixed(2)}
                </td>
                <td className={styles.td}>
                  {row.stdRenderTimeTotal.toFixed(2)}
                </td>
                <td className={styles.td}>{row.avgFirstPaintFP.toFixed(2)}</td>
                <td className={styles.td}>{row.stdFirstPaintFP.toFixed(2)}</td>
                <td className={styles.td}>{row.avgTTFB.toFixed(2)}</td>
                <td className={styles.td}>{row.stdTTFB.toFixed(2)}</td>
                <td className={styles.td}>
                  {row.avgFirstContentfulPaintFCP.toFixed(2)}
                </td>
                <td className={styles.td}>
                  {row.stdFirstContentfulPaintFCP.toFixed(2)}
                </td>
                <td className={styles.td}>{row.avgLCP.toFixed(2)}</td>
                <td className={styles.td}>{row.stdLCP.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>Comparativo Geral entre Bibliotecas</h3>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <LineChart data={comparativeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="items"
              label={{
                value: "Qtd Itens",
                position: "insideBottomRight",
                offset: -5,
              }}
            />
            <YAxis
              label={{ value: "ms", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            {libs.map((lib, index) => (
              <Line
                key={lib + "-tti"}
                type="monotone"
                dataKey={lib}
                stroke={`hsl(${(index * 60) % 360}, 70%, 50%)`}
                name={`TTI - ${lib}`}
                dot={false}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.tableWrapper}>
        <h3>Todos os Dados</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Lib</th>
              <th className={styles.th}>Itens</th>
              <th className={styles.th}>Avg TTI</th>
              <th className={styles.th}>Avg DOMContentLoaded</th>
              <th className={styles.th}>Avg LCP</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className={styles.trRow}>
                <td className={styles.td}>{row.lib}</td>
                <td className={styles.td}>{row.items}</td>
                <td className={styles.td}>
                  {row.avgTimetoInteractive.toFixed(2)}
                </td>
                <td className={styles.td}>
                  {row.avgDOMContentLoaded.toFixed(2)}
                </td>
                <td className={styles.td}>{row.avgLCP.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
