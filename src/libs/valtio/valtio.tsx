import { Layout } from "@/components/layout";
import { Outlet } from "@tanstack/react-router";
import { ValtioDrawer } from "./valtio-drawer";

export const Valtio = () => {
  return (
    <Layout baseRoute="valtio" libName="Valtio">
      <>
        <Outlet />
        <ValtioDrawer />
      </>
    </Layout>
  );
};
