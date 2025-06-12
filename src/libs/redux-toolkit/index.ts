import { withPages } from "@/hoc/withPages";

import { useCart, useProductsContext } from "./redux-toolkit.hooks";
import { ReduxToolkit } from "./redux-toolkit";

const { PageCart, PageCheckout, PageProductDetails, PageProducts } = withPages({
  basePath: "redux-toolkit",
  useCart: useCart,
  useProductsContext: useProductsContext,
});

export const ReduxToolkitPages = {
  ReduxToolkit: ReduxToolkit,
  ReduxToolkitPageCart: PageCart,
  ReduxToolkitPageCheckout: PageCheckout,
  ReduxToolkitPageProductDetails: PageProductDetails,
  ReduxToolkitPageProducts: PageProducts,
};
