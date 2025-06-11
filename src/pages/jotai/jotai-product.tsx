import { Button } from "@/components/button";
import { CardProductDefault } from "@/components/card-product/use-cases";
import { useCart } from "@/libs/jotai/jotai.hooks";

import { Product } from "@/types/product.types";
import { useNavigate } from "@tanstack/react-router";

type ZustandProductProps = {
  product: Product;
};

export const JotaiProduct = ({ product }: ZustandProductProps) => {
  const navigate = useNavigate();
  const { addToCart, removeFromCart, getProductInCart } = useCart();

  const productIsInCart = !!getProductInCart(product.id);

  return (
    <CardProductDefault
      key={product.id}
      product={product}
      onClickSeeDetails={() =>
        navigate({ to: `/jotai/products/${product.id}` })
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
