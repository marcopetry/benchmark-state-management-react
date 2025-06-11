import { useProducts } from "@/api/use-product";
import { ValtioProduct } from "./valtio-product";
import { LayoutGrid } from "@/components/layout-grid";
import { useProductsContext } from "@/libs/valtio/valtio.hooks";

export const ValtioPageProducts = () => {
  const { products, setProducts } = useProductsContext();
  useProducts({ setProducts });

  return (
    <LayoutGrid>
      {products.map((product, index) => (
        <ValtioProduct
          product={product}
          key={`${index}-product-${product.id}`}
        />
      ))}
    </LayoutGrid>
  );
};
