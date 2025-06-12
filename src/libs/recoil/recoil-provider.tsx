import { ReactNode } from "react";
import { RecoilRoot } from "recoil";

type RecoilProviderProps = {
  children: ReactNode;
};

export function RecoilProvider({ children }: RecoilProviderProps) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
