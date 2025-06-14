import { Layout } from "@/components/layout";
import { Outlet } from "@tanstack/react-router";
import { RecoilProvider } from "./recoil-provider";
import { Drawer } from "@/components/drawer";
import { useCart } from "./recoil.hooks";

export const Recoil = () => {
  return (
    <Layout baseRoute="recoil" libName="Recoil">
      <RecoilProvider>
        <Outlet />
        <Drawer basePath="recoil" useCart={useCart} />
      </RecoilProvider>
    </Layout>
  );
};
