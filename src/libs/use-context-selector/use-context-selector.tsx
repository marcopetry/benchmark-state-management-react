import { Drawer } from "@/components/drawer";
import { Layout } from "@/components/layout";
import { Outlet } from "@tanstack/react-router";
import {
  CartProvider,
  ProductsProvider,
  useCart,
} from "./use-context-selector.hooks";

export const UseContextSelector = () => {
  return (
    <Layout baseRoute="use-context-selector" libName="Use Content Selector">
      <ProductsProvider>
        <CartProvider>
          <Outlet />
          <Drawer basePath="use-context-selector" useCart={useCart} />
        </CartProvider>
      </ProductsProvider>
    </Layout>
  );
};
