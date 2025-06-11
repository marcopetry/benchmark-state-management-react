import { useProducts } from "@/api/use-product";
import { ZustandProduct } from "./zustand-product";
import { useProductContext } from "@/libs/context-api/context-api-provider";
import { LayoutGrid } from "@/components/layout-grid";
import { useProductStore } from "@/libs/zustand/zustand.hooks";

export const ZustandPageProducts = () => {
  const { products, setProducts } = useProductStore();
  useProducts({ setProducts });

  return (
    <LayoutGrid>
      {products.map((product, index) => (
        <ZustandProduct
          product={product}
          key={`${index}-product-${product.id}`}
        />
      ))}
    </LayoutGrid>
  );
};
