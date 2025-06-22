import { useEffect, useState } from "react";
import { fetchMockDataSync } from "./api";
import { Product } from "@/types/product.types";

export const useProductDetails = ({ id }: { id: string }) => {
  const [product, setProduct] = useState<Product | undefined>();
  useEffect(() => {
    const data = fetchMockDataSync({ amountItems: 99999 });
    setProduct(data.find((d) => d.id.toString() === id));
  }, []);

  return { product };
};
