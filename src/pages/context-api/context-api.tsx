import { useProducts } from "@/api/use-product";
import { CardProductDefault } from "@/components/card-product/use-cases";
import { Layout } from "@/components/layout";

export const ContextApi = () => {
  const { products } = useProducts();
  return (
    <Layout>
      {products.map((product) => (
        <CardProductDefault key={product.id} product={product} />
      ))}
    </Layout>
  );
};
