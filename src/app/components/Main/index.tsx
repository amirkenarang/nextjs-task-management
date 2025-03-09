import type { ReactNode } from "react";

type MainProps = {
  children: ReactNode | ReactNode[];
};

export const Main = ({ children }: MainProps) => {
  return <main className="flex flex-col justify-center">{children}</main>;
};
