import { PageCart } from "@/components/page-cart";
import { useCart, useCartActions } from "@/libs/context-api/context-api.hooks";
import { useCartStore } from "@/libs/zustand/zustand.hooks";
import { useNavigate } from "@tanstack/react-router";

export const ZustandPageCart = () => {
  const { increaseQuantity, decreaseQuantity, items } = useCartStore();

  const navigate = useNavigate();
  const onCheckout = () => navigate({ to: "zustand/checkout" });

  return (
    <PageCart
      products={items}
      decreaseQuantity={decreaseQuantity}
      increaseQuantity={increaseQuantity}
      onCheckout={onCheckout}
    />
  );
};
