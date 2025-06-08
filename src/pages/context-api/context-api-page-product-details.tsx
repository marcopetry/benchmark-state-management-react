import { useProductDetails } from "@/api/use-product-details";

import { ProductDetail } from "@/components/product-details";
import { useCartActions } from "@/libs/context-api/context-api.hooks";
import { useParams } from "@tanstack/react-router";

export const ContextApiPageProductDetails = () => {
  const { id } = useParams({ from: "/context-api/products/$id" });
  const { product } = useProductDetails({ id });

  const { addToCart } = useCartActions();

  if (!product) return <h1>Loading...</h1>;

  return <ProductDetail product={product} onAddToCart={addToCart} />;
};
