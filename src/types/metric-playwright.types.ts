export interface MetricPlayWright {
  lib: string;
  items: number;
  runs: number;
  avgTimetoInteractive: number;
  stdTimetoInteractive: number;
  avgDOMContentLoaded: number;
  stdDOMContentLoaded: number;
  avgRenderTimeTotal: number;
  stdRenderTimeTotal: number;
  avgFirstPaintFP: number;
  stdFirstPaintFP: number;
  avgTTFB: number;
  stdTTFB: number;
  avgFirstContentfulPaintFCP: number;
  stdFirstContentfulPaintFCP: number;
  avgLCP: number;
  stdLCP: number;
}
