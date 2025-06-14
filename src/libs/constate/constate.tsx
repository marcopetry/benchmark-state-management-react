import { Drawer } from "@/components/drawer";
import { Layout } from "@/components/layout";
import { Outlet } from "@tanstack/react-router";
import { CartProvider, ProductsProvider, useCart } from "./constate.hooks";

export const Constate = () => {
  return (
    <Layout baseRoute="constate" libName="Constate">
      <ProductsProvider>
        <CartProvider>
          <Outlet />
          <Drawer basePath="constate" useCart={useCart} />
        </CartProvider>
      </ProductsProvider>
    </Layout>
  );
};
