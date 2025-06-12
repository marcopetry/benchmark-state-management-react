import { Layout } from "@/components/layout";
import { Outlet } from "@tanstack/react-router";
import { ReduxToolkitDrawer } from "./redux-toolkit-drawer";
import { ReduxProvider } from "./redux-toolkit-provider";

export const ReduxToolkit = () => {
  return (
    <Layout baseRoute="/redux-toolkit" libName="Redux Toolkit">
      <ReduxProvider>
        <Outlet />
        <ReduxToolkitDrawer />
      </ReduxProvider>
    </Layout>
  );
};
