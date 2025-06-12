import { withPages } from "@/hoc/withPages";

import { useCart, useProductsContext } from "./valtio.hooks";
import { Valtio } from "./valtio";

const { PageCart, PageCheckout, PageProductDetails, PageProducts } = withPages({
  basePath: "valtio",
  useCart: useCart,
  useProductsContext: useProductsContext,
});

export const ValtioPages = {
  Valtio: Valtio,
  ValtioPageCart: PageCart,
  ValtioPageCheckout: PageCheckout,
  ValtioPageProductDetails: PageProductDetails,
  ValtioPageProducts: PageProducts,
};
