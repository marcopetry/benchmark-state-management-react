import { Layout } from "@/components/layout";
import { Outlet } from "@tanstack/react-router";
import { ZustandDrawer } from "./zustand-drawer";

export const Zustand = () => {
  return (
    <Layout baseRoute="zustand" libName="Zustand">
      <>
        <Outlet />
        <ZustandDrawer />
      </>
    </Layout>
  );
};
