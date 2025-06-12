import { withPages } from "@/hoc/withPages";

import { useCart, useProductsContext } from "./zustand.hooks";
import { Zustand } from "./zustand";

const { PageCart, PageCheckout, PageProductDetails, PageProducts } = withPages({
  basePath: "zustand",
  useCart: useCart,
  useProductsContext: useProductsContext,
});

export const ZustandPages = {
  Zustand: Zustand,
  ZustandPageCart: PageCart,
  ZustandPageCheckout: PageCheckout,
  ZustandPageProductDetails: PageProductDetails,
  ZustandPageProducts: PageProducts,
};
