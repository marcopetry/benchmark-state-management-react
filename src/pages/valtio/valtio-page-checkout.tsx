import { PageCheckout } from "@/components/page-checkout";
import { useCartStore } from "@/libs/zustand/zustand.hooks";
import { useNavigate } from "@tanstack/react-router";

export const ValtioPageCheckout = () => {
  const { items } = useCartStore();
  const navigate = useNavigate();
  return (
    <PageCheckout
      products={items}
      onSubmit={() => navigate({ to: "/valtio/products" })}
    />
  );
};
