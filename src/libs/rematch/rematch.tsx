import { Layout } from "@/components/layout";
import { Outlet } from "@tanstack/react-router";
import { RematchProvider } from "./rematch-provider";
import { Drawer } from "@/components/drawer";
import { useCart } from "./rematch.hooks";

export const Rematch = () => {
  return (
    <Layout baseRoute="rematch" libName="Rematch">
      <RematchProvider>
        <Outlet />
        <Drawer basePath="rematch" useCart={useCart} />
      </RematchProvider>
    </Layout>
  );
};
