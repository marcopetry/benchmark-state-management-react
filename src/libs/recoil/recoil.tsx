import { Layout } from "@/components/layout";
import { Outlet } from "@tanstack/react-router";
import { RecoilDrawer } from "./recoil-drawer";
import { RecoilProvider } from "./recoil-provider";

export const Recoil = () => {
  return (
    <Layout baseRoute="recoil" libName="Recoil">
      <RecoilProvider>
        <Outlet />
        <RecoilDrawer />
      </RecoilProvider>
    </Layout>
  );
};
