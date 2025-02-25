import { ReactNode } from "react";

import styles from "./button.module.css";

type ButtonVariant = "success" | "error";

interface ButtonProps {
  children: ReactNode;
  variant: ButtonVariant;
  onClick: () => void;
}

export const Button = ({ children, variant, onClick }: ButtonProps) => {
  const buttonClass = variant === "success" ? "btn-success" : "btn-error";

  return (
    <button
      className={`${styles.btn} ${styles[buttonClass]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
