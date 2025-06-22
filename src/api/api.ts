import { Product } from "@/types/product.types";
import { MOCK } from "./mock";

type MockParams = {
  amountItems: number;
};

export const fetchMockDataSync = ({
  amountItems = 100,
}: MockParams): Product[] => {
  const result: Product[] = [];

  for (let i = 0; i < amountItems; i++) {
    const original = MOCK[i % MOCK.length];
    result.push({
      ...original,
      id: i + 1,
    });
  }

  return result;
};
