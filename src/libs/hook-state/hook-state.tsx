import { Drawer } from "@/components/drawer";
import { Layout } from "@/components/layout";
import { Outlet } from "@tanstack/react-router";
import { useCart } from "./hook-state.hooks";

export const HookState = () => {
  console.log({ u: useCart() });
  return (
    <Layout baseRoute="hookstate" libName="Hook State">
      <>
        <Outlet />
        <Drawer basePath="hookstate" useCart={useCart} />
      </>
    </Layout>
  );
};
