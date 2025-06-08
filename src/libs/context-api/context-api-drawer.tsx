import { useEffect, useRef, useState } from "react";
import { Drawer } from "@/components/drawer";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useCart, useCartActions } from "@/libs/context-api/context-api.hooks";

export const ContextApiDrawer = () => {
  const firstRender = useRef(true);

  const { state } = useCart();
  const { increaseQuantity, decreaseQuantity } = useCartActions();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const router = useRouter();

  useEffect(() => {
    const pathname = router.state.location.pathname;
    if (
      state.items.length &&
      !firstRender.current &&
      pathname.includes("product")
    ) {
      setIsOpen(true);
    }

    firstRender.current = false;
  }, [JSON.stringify(state.items)]);

  if (!isOpen) return null;

  return (
    <Drawer
      products={state.items}
      onClose={() => setIsOpen(false)}
      onCheckout={() => navigate({ to: "/context-api/checkout" })}
      decreaseQuantity={decreaseQuantity}
      increaseQuantity={increaseQuantity}
    />
  );
};
