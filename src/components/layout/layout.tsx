// import { CoreWebVitals } from "../core-web-vitals";
// import { Navbar } from "../navbar";
// import { QueryControls } from "../query-controls/query-controls";
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
      {/* <Navbar {...props} />
      <QueryControls /> */}
      {/* <CoreWebVitals /> */}
      <main className={styles.layout}>{children}</main>;
    </div>
  );
};
