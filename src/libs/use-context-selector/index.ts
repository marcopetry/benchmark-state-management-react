import { withPages } from "@/hoc/withPages";

import { useCart, useProductsContext } from "./use-context-selector.hooks";
import { UseContextSelector } from "./use-context-selector";

const { PageCart, PageCheckout, PageProductDetails, PageProducts } = withPages({
  basePath: "use-context-selector",
  useCart: useCart,
  useProductsContext: useProductsContext,
});

export const UseContextSelectorPages = {
  UseContextSelector: UseContextSelector,
  UseContextSelectorPageCart: PageCart,
  UseContextSelectorPageCheckout: PageCheckout,
  UseContextSelectorPageProductDetails: PageProductDetails,
  UseContextSelectorPageProducts: PageProducts,
};
