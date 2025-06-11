import { useProductDetails } from "@/api/use-product-details";

import { ProductDetail } from "@/components/product-details";
import { useCartStore } from "@/libs/zustand/zustand.hooks";
import { useParams } from "@tanstack/react-router";

export const ZustandPageProductDetails = () => {
  const { id } = useParams({ from: "/zustand/products/$id" });
  const { product } = useProductDetails({ id });

  const { addToCart } = useCartStore();

  if (!product) return <h1>Loading...</h1>;

  return <ProductDetail product={product} onAddToCart={addToCart} />;
};
