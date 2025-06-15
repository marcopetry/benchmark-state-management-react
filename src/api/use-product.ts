import { useEffect } from "react";
import { fetchMockData } from "./api";
import { Product } from "@/types/product.types";
import { useSearch } from "@tanstack/react-router";

type UseProductsParams = {
  setProducts: (products: Product[]) => void;
};

export const useProducts = ({ setProducts }: UseProductsParams) => {
  const search = useSearch({ strict: false });

  const amountItems = Number(search.items) || 100;

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchMockData({ amountItems });
      setProducts(data);
    };

    fetch();
  }, [amountItems]);
};
