import { withPages } from "@/hoc/withPages";
import { Jotai } from "./jotai";
import { useCart, useProductsContext } from "./jotai.hooks";

const { PageCart, PageCheckout, PageProductDetails, PageProducts } = withPages({
  basePath: "jotai",
  useCart: useCart,
  useProductsContext: useProductsContext,
});

export const JotaiPages = {
  Jotai: Jotai,
  JotaiPageCart: PageCart,
  JotaiPageCheckout: PageCheckout,
  JotaiPageProductDetails: PageProductDetails,
  JotaiPageProducts: PageProducts,
};
