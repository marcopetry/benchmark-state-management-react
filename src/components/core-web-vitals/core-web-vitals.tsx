import { useEffect, useState } from "react";
import { onCLS, onLCP, onINP, onTTFB, type Metric } from "web-vitals";

import styles from "./core-web-vitals.module.css"; // use .css se preferir inline

export const CoreWebVitals: React.FC = () => {
  const [metrics, setMetrics] = useState<Record<string, number>>({});

  const handleMetric = (metric: Metric) => {
    setMetrics((prev) => ({
      ...prev,
      [metric.name]: parseFloat(metric.value.toFixed(2)),
    }));
  };

  useEffect(() => {
    onCLS(handleMetric);
    onLCP(handleMetric);
    onTTFB(handleMetric);
    onINP(handleMetric);
  }, []);

  return (
    <div className={styles.container}>
      {Object.entries(metrics).map(([name, value]) => (
        <div key={name} className={styles.card}>
          <span className={styles.label}>{name}</span>
          <span className={styles.value}>{value}</span>
        </div>
      ))}
    </div>
  );
};
