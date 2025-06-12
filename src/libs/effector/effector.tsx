import { Layout } from "@/components/layout";
import { Outlet } from "@tanstack/react-router";
import { EffectorDrawer } from "./effector-drawer";

export const Effector = () => {
  return (
    <Layout baseRoute="effector" libName="Effector">
      <>
        <Outlet />
        <EffectorDrawer />
      </>
    </Layout>
  );
};
