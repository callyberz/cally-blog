import React from "react";

interface Props {
  children: React.ReactNode;
}

export function TypographyH3({ children }: Props) {
  return (
    <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h1>
  );
}
