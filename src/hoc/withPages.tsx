import { PageCart } from "@/pages/page-cart";
import { PageCheckout } from "@/pages/page-checkout";
import { PageProducts } from "@/pages/page-products";
import { ProductDetail } from "@/pages/page-product-details";
import { CartState } from "@/types/cart-state.types";
import { ProductContextType } from "@/types/products-context.types";

type WithPagesParams = {
  useCart: () => CartState;
  useProductsContext: () => ProductContextType;
  basePath: string;
};

export const withPages = ({
  basePath,
  useCart,
  useProductsContext,
}: WithPagesParams) => {
  return {
    PageProducts: () => (
      <PageProducts
        basePath={basePath}
        useCart={useCart}
        useProductsContext={useProductsContext}
      />
    ),
    PageProductDetails: () => (
      <ProductDetail basePath={basePath} useCart={useCart} />
    ),
    PageCheckout: () => <PageCheckout basePath={basePath} useCart={useCart} />,
    PageCart: () => <PageCart basePath={basePath} useCart={useCart} />,
  };
};
