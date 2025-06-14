import { withPages } from "@/hoc/withPages";
import { useCart } from "./react-context-api.hooks";
import { useProductsContext } from "./react-context-api-provider";
import { ContextApi } from "./react-context-api";

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
