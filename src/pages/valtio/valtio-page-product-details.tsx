import { useProductDetails } from "@/api/use-product-details";

import { ProductDetail } from "@/components/product-details";
import { useCart } from "@/libs/valtio/valtio.hooks";

import { useParams } from "@tanstack/react-router";

export const ValtioPageProductDetails = () => {
  const { id } = useParams({ from: "/valtio/products/$id" });
  const { product } = useProductDetails({ id });

  const { addToCart } = useCart();

  if (!product) return <h1>Loading...</h1>;

  return <ProductDetail product={product} onAddToCart={addToCart} />;
};
