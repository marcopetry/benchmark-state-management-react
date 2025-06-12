import { withPages } from "@/hoc/withPages";

import { useCart, useProductsContext } from "./effector.hooks";
import { Effector } from "./effector";

const { PageCart, PageCheckout, PageProductDetails, PageProducts } = withPages({
  basePath: "effector",
  useCart: useCart,
  useProductsContext: useProductsContext,
});

export const EffectorPages = {
  Effector: Effector,
  EffectorPageCart: PageCart,
  EffectorPageCheckout: PageCheckout,
  EffectorPageProductDetails: PageProductDetails,
  EffectorPageProducts: PageProducts,
};
