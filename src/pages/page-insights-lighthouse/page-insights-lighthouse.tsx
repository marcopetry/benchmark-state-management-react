import styles from "./page-insights.module.css";
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

import * as dataDefault from "../../../insights-lighthouse/summary-metrics.json";
import { MetricLighthouse } from "@/types/metric-lighthouse.types";

const data = (dataDefault as unknown as { default: MetricLighthouse[] })
  .default;

// Organiza os dados por lib para gráficos com várias linhas
const groupedData = data.reduce((acc, item) => {
  if (!acc[item.lib]) acc[item.lib] = [];
  acc[item.lib].push(item);
  return acc;
}, {} as Record<string, typeof data>);

const colors = {
  jotai: "#8884d8",
  "react-context-api": "#82ca9d",
  valtio: "#ffc658",
  zustand: "#d88484",
};

export function PageInsights() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Métricas de Performance: FCP e LCP por Biblioteca e Quantidade de Itens
      </h1>

      <section className={styles.section}>
        <h2>Sobre os dados</h2>
        <p>
          Esta tabela e gráficos mostram as métricas de desempenho para
          diferentes bibliotecas de gerenciamento de estado em React, avaliadas
          com diferentes quantidades de itens (10, 100 e 1000).
        </p>
        <p>
          <strong>FCP (First Contentful Paint):</strong> tempo em milissegundos
          para o navegador renderizar o primeiro conteúdo visível da página. É
          importante para a percepção de rapidez inicial.
        </p>
        <p>
          <strong>LCP (Largest Contentful Paint):</strong> tempo para renderizar
          o maior elemento visível na viewport, indicando o momento em que a
          página parece completamente carregada ao usuário.
        </p>
        <p>
          Os dados também trazem o número de execuções (runs) para cálculo de
          média e desvio padrão (std), que indicam a variabilidade dos
          resultados.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Tabela de Métricas</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Biblioteca</th>
              <th>Itens</th>
              <th>Execuções</th>
              <th>FCP (média) [ms]</th>
              <th>FCP (std)</th>
              <th>LCP (média) [ms]</th>
              <th>LCP (std)</th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              ({ lib, items, runs, avgFCP, stdFCP, avgLCP, stdLCP }, i) => (
                <tr key={i}>
                  <td>{lib}</td>
                  <td>{items}</td>
                  <td>{runs}</td>
                  <td>{avgFCP.toFixed(2)}</td>
                  <td>{stdFCP.toFixed(2)}</td>
                  <td>{avgLCP.toFixed(2)}</td>
                  <td>{stdLCP.toFixed(2)}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <h2>Gráfico de FCP (First Contentful Paint)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="items"
              label={{
                value: "Quantidade de Itens",
                position: "insideBottomRight",
                offset: -5,
              }}
              type="number"
              domain={["dataMin", "dataMax"]}
              allowDuplicatedCategory={false}
            />
            <YAxis
              label={{
                value: "Tempo (ms)",
                angle: -90,
                position: "insideLeft",
              }}
              domain={["dataMin - 50", "dataMax + 50"]}
            />
            <Tooltip />
            <Legend />
            {Object.entries(groupedData).map(([lib, items]) => (
              <Line
                key={lib}
                data={items}
                dataKey="avgFCP"
                name={lib}
                stroke={colors[lib as keyof typeof colors] || "#000"}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                isAnimationActive={false}
                connectNulls
                type="monotone"
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section className={styles.section}>
        <h2>Gráfico de LCP (Largest Contentful Paint)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="items"
              label={{
                value: "Quantidade de Itens",
                position: "insideBottomRight",
                offset: -5,
              }}
              type="number"
              domain={["dataMin", "dataMax"]}
              allowDuplicatedCategory={false}
            />
            <YAxis
              label={{
                value: "Tempo (ms)",
                angle: -90,
                position: "insideLeft",
              }}
              domain={["dataMin - 50", "dataMax + 50"]}
            />
            <Tooltip />
            <Legend />
            {Object.entries(groupedData).map(([lib, items]) => (
              <Line
                key={lib}
                data={items}
                dataKey="avgLCP"
                name={lib}
                stroke={colors[lib as keyof typeof colors] || "#000"}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                isAnimationActive={false}
                connectNulls
                type="monotone"
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
}
