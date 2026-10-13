import React from "react";
import type { ReactNode } from "react";

type HeaderProps = {
  children?: ReactNode;
};

export function Header({ children }: HeaderProps) {
  return (
    <header className="flex items-center bg-gray-700 min-h-[60px] px-4">
      {children}
    </header>
  );
}
