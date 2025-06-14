import { withPages } from "@/hoc/withPages";

import { useCart, useProductsContext } from "./rematch.hooks";
import { Rematch } from "./rematch";

const { PageCart, PageCheckout, PageProductDetails, PageProducts } = withPages({
  basePath: "redux-toolkit",
  useCart: useCart,
  useProductsContext: useProductsContext,
});

export const RematchPages = {
  Rematch: Rematch,
  RematchPageCart: PageCart,
  RematchPageCheckout: PageCheckout,
  RematchPageProductDetails: PageProductDetails,
  RematchPageProducts: PageProducts,
};
