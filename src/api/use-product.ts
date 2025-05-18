import { useEffect, useState } from "react";
import { fetchMockData } from "./api";
import { Product } from "@/types/product.types";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const data = await fetchMockData();
      setProducts(data);
    };

    fetch();
  }, []);

  return { products };
};
