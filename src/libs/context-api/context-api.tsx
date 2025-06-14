import { Layout } from "@/components/layout";
import { Outlet } from "@tanstack/react-router";
import { CartProvider, ProductProvider } from "./context-api-provider";

import { Drawer } from "@/components/drawer";
import { useCart } from "./context-api.hooks";

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
