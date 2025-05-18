import { useProducts } from "@/api/use-product";

import {
  CardProductCarShop,
  CardProductDefault,
  CardProductWithDiscount,
} from "@/components/card-product/use-cases";
import { Layout } from "@/components/layout";

export const ProductList = () => {
  const { products } = useProducts();

  const productsWithDiscount = products.slice(0, 4);
  const productsCardShop = products.slice(3, 5);

  return (
    <Layout>
      {productsWithDiscount.map((product) => (
        <CardProductWithDiscount key={product.id} product={product} />
      ))}

      {products.map((product) => (
        <CardProductDefault key={product.id} product={product} />
      ))}

      {productsCardShop.map((product) => (
        <CardProductCarShop key={product.id} product={product} />
      ))}
    </Layout>
  );
};
