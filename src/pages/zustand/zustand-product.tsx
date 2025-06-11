import { Button } from "@/components/button";
import { CardProductDefault } from "@/components/card-product/use-cases";
import { useCartStore } from "@/libs/zustand/zustand.hooks";

import { Product } from "@/types/product.types";
import { useNavigate } from "@tanstack/react-router";

type ZustandProductProps = {
  product: Product;
};

export const ZustandProduct = ({ product }: ZustandProductProps) => {
  const navigate = useNavigate();
  const { addToCart, removeFromCart, getProductInCart } = useCartStore();

  const productIsInCart = !!getProductInCart(product.id);

  return (
    <CardProductDefault
      key={product.id}
      product={product}
      onClickSeeDetails={() =>
        navigate({ to: `/zustand/products/${product.id}` })
      }
    >
      {productIsInCart ? (
        <Button onClick={() => removeFromCart(product)} variant="error">
          Remover do Carrinho
        </Button>
      ) : (
        <Button onClick={() => addToCart(product)} variant="success">
          Adicionar ao Carrinho
        </Button>
      )}
    </CardProductDefault>
  );
};
