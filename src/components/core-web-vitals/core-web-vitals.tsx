import { useEffect, useState } from "react";
import { onCLS, onLCP, onINP, onTTFB, type Metric } from "web-vitals";

import styles from "./core-web-vitals.module.css";
import { CoreWebMetricCard } from "./core-web-metric";

export const CoreWebVitals: React.FC = () => {
  const [metrics, setMetrics] = useState<Record<string, string>>({});

  // Web-vitals (LCP, CLS, INP, TTFB)
  useEffect(() => {
    const handleMetric = (metric: Metric) => {
      setMetrics((prev) => ({
        ...prev,
        [metric.name]: `${metric.value.toFixed(2)} ms`,
      }));
    };

    onCLS(handleMetric);
    onLCP(handleMetric);
    onTTFB(handleMetric);
    onINP(handleMetric);
  }, []);

  // Paint timings (FCP, FP)
  useEffect(() => {
    const updatedMetrics: Record<string, string> = {};

    const paintObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === "first-paint") {
          updatedMetrics["First Paint (FP)"] = `${entry.startTime.toFixed(
            2
          )} ms`;
        }
        if (entry.name === "first-contentful-paint") {
          updatedMetrics[
            "First Contentful Paint (FCP)"
          ] = `${entry.startTime.toFixed(2)} ms`;
        }
      }

      setMetrics((prev) => ({ ...prev, ...updatedMetrics }));
    });

    paintObserver.observe({ type: "paint", buffered: true });

    return () => paintObserver.disconnect();
  }, []);

  // Navegação e tempo de carregamento total (após load)
  useEffect(() => {
    const handleLoad = () => {
      const navEntry = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;

      if (navEntry) {
        setMetrics((prev) => ({
          ...prev,
          "Time to Interactive": `${(
            navEntry.domInteractive - navEntry.startTime
          ).toFixed(2)} ms`,
          DOMContentLoaded: `${(
            navEntry.domContentLoadedEventEnd - navEntry.startTime
          ).toFixed(2)} ms`,
          Load: `${(navEntry.loadEventEnd - navEntry.startTime).toFixed(2)} ms`,
          "Render Time Total": `${(
            navEntry.loadEventEnd - navEntry.startTime
          ).toFixed(2)} ms`,
        }));
      }
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <div className={styles.container}>
      {Object.entries(metrics).map(([title, value]) => (
        <CoreWebMetricCard title={title} value={value} key={title} />
      ))}
    </div>
  );
};
