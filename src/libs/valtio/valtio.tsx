import { Drawer } from "@/components/drawer";
import { Layout } from "@/components/layout";
import { Outlet } from "@tanstack/react-router";
import { useCart } from "./valtio.hooks";

export const Valtio = () => {
  return (
    <Layout baseRoute="valtio" libName="Valtio">
      <>
        <Outlet />
        <Drawer basePath="valtio" useCart={useCart} />
      </>
    </Layout>
  );
};
