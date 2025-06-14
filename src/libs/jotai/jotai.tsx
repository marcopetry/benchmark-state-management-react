import { Layout } from "@/components/layout";
import { Outlet } from "@tanstack/react-router";
import { Drawer } from "@/components/drawer";
import { useCart } from "./jotai.hooks";

export const Jotai = () => {
  return (
    <Layout baseRoute="jotai" libName="Jotai">
      <>
        <Outlet />
        <Drawer basePath="jotai" useCart={useCart} />
      </>
    </Layout>
  );
};
