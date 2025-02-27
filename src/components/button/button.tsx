import { ReactNode } from "react";

import styles from "./button.module.css";

type ButtonVariant = "success" | "error" | "outlined";

interface ButtonProps {
  children: ReactNode;
  variant: ButtonVariant;
  onClick: () => void;
}

export const Button = ({ children, variant, onClick }: ButtonProps) => {
  const buttonClasses: Record<ButtonVariant, string> = {
    success: "btn-success",
    error: "btn-error",
    outlined: "btn-outlined",
  };

  const buttonClass = buttonClasses[variant];

  return (
    <button
      className={`${styles.btn} ${styles[buttonClass]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
