import { withPages } from "@/hoc/withPages";
import { useCart } from "./context-api.hooks";
import { useProductsContext } from "./context-api-provider";
import { ContextApi } from "./context-api";

const { PageCart, PageCheckout, PageProductDetails, PageProducts } = withPages({
  basePath: "react-context-api",
  useCart: useCart,
  useProductsContext: useProductsContext,
});

export const ContextApiPages = {
  ReactContextApi: ContextApi,
  ReactContextApiPageCart: PageCart,
  ReactContextApiPageCheckout: PageCheckout,
  ReactContextApiPageProductDetails: PageProductDetails,
  ReactContextApiPageProducts: PageProducts,
};
