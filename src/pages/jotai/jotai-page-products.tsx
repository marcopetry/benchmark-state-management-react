import { JotaiProduct } from "./jotai-product";
import { LayoutGrid } from "@/components/layout-grid";
import { useProductContext } from "@/libs/jotai/jotai.hooks";
import { useProducts } from "@/api/use-product";

export const JotaiPageProducts = () => {
  const { products, setProducts } = useProductContext();
  useProducts({ setProducts });

  return (
    <LayoutGrid>
      {products.map((product, index) => (
        <JotaiProduct
          product={product}
          key={`${index}-product-${product.id}`}
        />
      ))}
    </LayoutGrid>
  );
};
