import { Layout } from "@/components/layout";
import { Outlet } from "@tanstack/react-router";
import { CartProvider, ProductProvider } from "./react-context-api-provider";

import { Drawer } from "@/components/drawer";
import { useCart } from "./react-context-api.hooks";

export const ContextApi = () => {
  return (
    <Layout libName="React Context Api" baseRoute="react-context-api">
      <ProductProvider>
        <CartProvider>
          <Outlet />
          <Drawer basePath="react-context-api" useCart={useCart} />
        </CartProvider>
      </ProductProvider>
    </Layout>
  );
};
