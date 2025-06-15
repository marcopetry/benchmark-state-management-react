import { useEffect, useRef, useState } from "react";
import { onCLS, onLCP, onINP, onTTFB, type Metric } from "web-vitals";

import styles from "./core-web-vitals.module.css"; // use .css se preferir inline
import { CoreWebMetricCard } from "./core-web-metric";
import { convertToLocalTime } from "@/utils/convert-to-localtime";
import { diffMsBetweenDates } from "@/utils/diff-ms-between-datetimes";

export const CoreWebVitals: React.FC = () => {
  const [metrics, setMetrics] = useState<Record<string, number>>({});
  const [loadTime, setLoadTime] = useState<Date | null>(null);

  const refInitialRenderTime = useRef(new Date());

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

  useEffect(() => {
    function handleLoad() {
      setLoadTime(new Date());
    }

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  const diffMs = loadTime
    ? diffMsBetweenDates(refInitialRenderTime.current, loadTime)
    : null;

  return (
    <div className={styles.container}>
      <CoreWebMetricCard
        title="Inicio do render"
        value={convertToLocalTime(refInitialRenderTime.current)}
      />

      {loadTime && (
        <CoreWebMetricCard
          title="Fim do render"
          value={convertToLocalTime(loadTime)}
        />
      )}

      {diffMs && (
        <CoreWebMetricCard
          title="Tempo total de renderização"
          value={diffMs.toString()}
        />
      )}
      {Object.entries(metrics).map(([title, value]) => (
        <CoreWebMetricCard title={title} value={value.toString()} key={title} />
      ))}
    </div>
  );
};
