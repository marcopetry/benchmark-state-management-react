import { useEffect, useState } from "react";
import { fetchMockData } from "./api";
import { Product } from "@/types/product.types";

export const useProductDetails = ({ id }: { id: string }) => {
  const [product, setProduct] = useState<Product | undefined>();
  useEffect(() => {
    const fetch = async () => {
      const data = await fetchMockData();
      setProduct(data.find((d) => d.id.toString() === id));
    };

    fetch();
  }, []);

  return { product };
};
