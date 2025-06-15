import { Product } from "@/types/product.types";
import { MOCK } from "./mock";

type MockParams = {
  delay: number;
  amountItems: number;
};

export const fetchMockData = ({
  delay = 1000,
  amountItems = 100,
}: MockParams): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result: Product[] = [];

      for (let i = 0; i < amountItems; i++) {
        const original = MOCK[i % MOCK.length];
        result.push({
          ...original,
          id: i + 1,
        });
      }
      resolve(result);
    }, delay);
  });
};
