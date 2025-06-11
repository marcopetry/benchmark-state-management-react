import { PageCart } from "@/components/page-cart";
import { useCart } from "@/libs/jotai/jotai.hooks";

import { useNavigate } from "@tanstack/react-router";

export const JotaiPageCart = () => {
  const { increaseQuantity, decreaseQuantity, items } = useCart();

  const navigate = useNavigate();
  const onCheckout = () => navigate({ to: "jotai/checkout" });

  return (
    <PageCart
      products={items}
      decreaseQuantity={decreaseQuantity}
      increaseQuantity={increaseQuantity}
      onCheckout={onCheckout}
    />
  );
};
