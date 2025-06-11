import { PageCart } from "@/components/page-cart";
import { useCartStore } from "@/libs/zustand/zustand.hooks";
import { useNavigate } from "@tanstack/react-router";

export const ValtioPageCart = () => {
  const { increaseQuantity, decreaseQuantity, items } = useCartStore();

  const navigate = useNavigate();
  const onCheckout = () => navigate({ to: "valtio/checkout" });

  return (
    <PageCart
      products={items}
      decreaseQuantity={decreaseQuantity}
      increaseQuantity={increaseQuantity}
      onCheckout={onCheckout}
    />
  );
};
