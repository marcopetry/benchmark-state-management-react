import { Product } from "../types/product.types";
import { MOCK } from "./mock";

export const fetchMockData = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK);
    }, 1000);
  });
};
