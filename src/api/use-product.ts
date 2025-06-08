import { useEffect } from "react";
import { fetchMockData } from "./api";
import { Product } from "@/types/product.types";

type UseProductsParams = {
  setProducts: (products: Product[]) => void;
};

export const useProducts = ({ setProducts }: UseProductsParams) => {
  useEffect(() => {
    const fetch = async () => {
      const data = await fetchMockData();
      setProducts(data);
    };

    fetch();
  }, []);
};
