import styles from "./layout-grid.module.css";
import { ReactNode } from "react";

type LayoutGridProps = {
  children: ReactNode;
};

export const LayoutGrid = ({ children }: LayoutGridProps) => {
  return <div className={styles.layout}>{children}</div>;
};
