import { useProducts } from "@/api/use-product";

import { LayoutGrid } from "@/components/layout-grid";
import { CardProductWithActions } from "@/components/card-product/use-cases";
import { ProductContextType } from "@/types/products-context.types";
import { CartState } from "@/types/cart-state.types";
import { Profiler } from "react";

type PageProductsProps = {
  useCart: () => CartState;
  useProductsContext: () => ProductContextType;
  basePath: string;
};

export const PageProducts = ({
  basePath,
  useCart,
  useProductsContext,
}: PageProductsProps) => {
  const { products, setProducts } = useProductsContext();
  useProducts({ setProducts });

  return (
    <Profiler id={`${basePath}/page-products-list`} onRender={console.log}>
      <LayoutGrid>
        {products.map((product, index) => (
          <CardProductWithActions
            product={product}
            key={`${index}-product-${product.id}`}
            useCart={useCart}
            basePath={basePath}
          />
        ))}
      </LayoutGrid>
    </Profiler>
  );
};
