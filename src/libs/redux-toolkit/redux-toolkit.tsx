import { Layout } from "@/components/layout";
import { Outlet } from "@tanstack/react-router";
import { ReduxProvider } from "./redux-toolkit-provider";
import { Drawer } from "@/components/drawer";
import { useCart } from "./redux-toolkit.hooks";

export const ReduxToolkit = () => {
  return (
    <Layout baseRoute="redux-toolkit" libName="Redux Toolkit">
      <ReduxProvider>
        <Outlet />
        <Drawer basePath="redux-toolkit" useCart={useCart} />
      </ReduxProvider>
    </Layout>
  );
};
