import { Drawer } from "@/components/drawer";
import { Layout } from "@/components/layout";
import { Outlet } from "@tanstack/react-router";
import { useCart } from "./zustand.hooks";

export const Zustand = () => {
  return (
    <Layout baseRoute="zustand" libName="Zustand">
      <>
        <Outlet />
        <Drawer basePath="zustand" useCart={useCart} />
      </>
    </Layout>
  );
};
