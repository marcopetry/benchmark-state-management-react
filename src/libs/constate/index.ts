import { withPages } from "@/hoc/withPages";

import { useCart, useProductsContext } from "./constate.hooks";
import { Constate } from "./constate";

const { PageCart, PageCheckout, PageProductDetails, PageProducts } = withPages({
  basePath: "constate",
  useCart: useCart,
  useProductsContext: useProductsContext,
});

export const ConstatePages = {
  Constate: Constate,
  ConstatePageCart: PageCart,
  ConstatePageCheckout: PageCheckout,
  ConstatePageProductDetails: PageProductDetails,
  ConstatePageProducts: PageProducts,
};
