import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./rematch.hooks";

interface RematchProviderProps {
  children: ReactNode;
}

export const RematchProvider = ({ children }: RematchProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};
