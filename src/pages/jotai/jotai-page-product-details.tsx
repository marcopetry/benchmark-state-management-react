import { useProductDetails } from "@/api/use-product-details";

import { ProductDetail } from "@/components/product-details";
import { useCart } from "@/libs/jotai/jotai.hooks";
import { useParams } from "@tanstack/react-router";

export const JotaiPageProductDetails = () => {
  const { id } = useParams({ from: "/jotai/products/$id" });
  const { product } = useProductDetails({ id });

  const { addToCart } = useCart();

  if (!product) return <h1>Loading...</h1>;

  return <ProductDetail product={product} onAddToCart={addToCart} />;
};
