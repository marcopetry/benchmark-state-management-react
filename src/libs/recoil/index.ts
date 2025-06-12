import { withPages } from "@/hoc/withPages";

import { useCart, useProductsContext } from "./recoil.hooks";
import { Recoil } from "./recoil";

const { PageCart, PageCheckout, PageProductDetails, PageProducts } = withPages({
  basePath: "recoil",
  useCart: useCart,
  useProductsContext: useProductsContext,
});

export const RecoilPages = {
  Recoil: Recoil,
  RecoilPageCart: PageCart,
  RecoilPageCheckout: PageCheckout,
  RecoilPageProductDetails: PageProductDetails,
  RecoilPageProducts: PageProducts,
};
