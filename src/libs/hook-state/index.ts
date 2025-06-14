import { withPages } from "@/hoc/withPages";

import { useCart, useProductsContext } from "./hook-state.hooks";
import { HookState } from "./hook-state";

const { PageCart, PageCheckout, PageProductDetails, PageProducts } = withPages({
  basePath: "hookstate",
  useCart: useCart,
  useProductsContext: useProductsContext,
});

export const HookStatePages = {
  HookState: HookState,
  HookStatePageCart: PageCart,
  HookStatePageCheckout: PageCheckout,
  HookStatePageProductDetails: PageProductDetails,
  HookStatePageProducts: PageProducts,
};
