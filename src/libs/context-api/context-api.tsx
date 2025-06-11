import { Layout } from "@/components/layout";
import { Outlet } from "@tanstack/react-router";
import { CartProvider, ProductProvider } from "./context-api-provider";
import { ContextApiDrawer } from "./context-api-drawer";

export const ContextApi = () => {
  return (
    <Layout libName="React Context Api" baseRoute="react-context-api">
      <ProductProvider>
        <CartProvider>
          <Outlet />
          <ContextApiDrawer />
        </CartProvider>
      </ProductProvider>
    </Layout>
  );
};
