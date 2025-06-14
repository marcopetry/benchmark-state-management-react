import { useEffect, useRef, useState } from "react";

import { useNavigate, useRouter } from "@tanstack/react-router";

import { DrawerComp } from "./drawer-comp";
import { UseCartHook } from "@/types/cart-state.types";

type DrawerProps = {
  basePath: string;
  useCart: UseCartHook;
};

export const Drawer = ({ basePath, useCart }: DrawerProps) => {
  const firstRender = useRef(true);

  const { increaseQuantity, decreaseQuantity, items } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const router = useRouter();

  useEffect(() => {
    const pathname = router.state.location.pathname;
    if (items.length && !firstRender.current && pathname.includes("product")) {
      setIsOpen(true);
    }

    firstRender.current = false;
  }, [JSON.stringify(items)]);

  if (!isOpen) return null;

  return (
    <DrawerComp
      products={items}
      onClose={() => setIsOpen(false)}
      onCheckout={() => navigate({ to: `/${basePath}/checkout` })}
      decreaseQuantity={decreaseQuantity}
      increaseQuantity={increaseQuantity}
    />
  );
};
