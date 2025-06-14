import { Layout } from "@/components/layout";
import { Outlet } from "@tanstack/react-router";
import { Drawer } from "@/components/drawer";
import { useCart } from "./effector.hooks";

export const Effector = () => {
  return (
    <Layout baseRoute="effector" libName="Effector">
      <>
        <Outlet />
        <Drawer basePath="effector" useCart={useCart} />
      </>
    </Layout>
  );
};
