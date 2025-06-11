import { Navbar } from "../navbar";
import styles from "./layout.module.css";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  baseRoute: string;
  libName: string;
};

export const Layout = ({ children, ...props }: LayoutProps) => {
  return (
    <div>
      <Navbar {...props} />
      <main className={styles.layout}>{children}</main>;
    </div>
  );
};
