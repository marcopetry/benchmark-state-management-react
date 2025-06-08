import { useProducts } from "@/api/use-product";
import { ContextApiProduct } from "./context-api-product";
import { useProductContext } from "@/libs/context-api/context-api-provider";
import { LayoutGrid } from "@/components/layout-grid";

export const ContextApiPageProducts = () => {
  const { products, setProducts } = useProductContext();
  useProducts({ setProducts });

  return (
    <LayoutGrid>
      {products.map((product, index) => (
        <ContextApiProduct
          product={product}
          key={`${index}-product-${product.id}`}
        />
      ))}
    </LayoutGrid>
  );
};
