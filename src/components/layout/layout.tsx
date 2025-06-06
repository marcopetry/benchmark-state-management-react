import { Navbar } from "../navbar";
import styles from "./layout.module.css";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navbar />
      <main className={styles.layout}>{children}</main>;
    </div>
  );
};
