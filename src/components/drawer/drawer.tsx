import { useEffect, useRef, useState } from "react";

import { useNavigate, useRouter } from "@tanstack/react-router";

import { DrawerComp } from "./drawer-comp";
import { UseCartHook } from "@/types/cart-state.types";

type DrawerProps = {
  basePath: string;
  useCart: UseCartHook;
};

export const Drawer = ({ basePath, useCart }: DrawerProps) => {
  const { increaseQuantity, decreaseQuantity, items } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const firstRender = useRef(items.length);

  const navigate = useNavigate();
  const router = useRouter();

  useEffect(() => {
    const pathname = router.state.location.pathname;

    if (
      items.length &&
      firstRender.current !== items.length &&
      pathname.includes("product")
    ) {
      setIsOpen(true);
    } else {
      firstRender.current = items.length;
    }
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
