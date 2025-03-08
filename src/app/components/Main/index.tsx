import type { ReactNode } from "react";

type MainProps = {
  children: ReactNode | ReactNode[];
};

export const Main = ({ children }: MainProps) => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      {children}
    </main>
  );
};
