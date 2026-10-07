import React from "react";
import type { ReactNode } from "react";

type HeaderProps = {
  children?: ReactNode;
};

export function Header({ children }: HeaderProps) {
  return (
    <header>
      <h1>Header</h1>
      {children}
    </header>
  );
}
