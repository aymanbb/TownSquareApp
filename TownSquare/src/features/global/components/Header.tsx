import React from "react";
import type { ReactNode } from "react";

type HeaderProps = {
  children?: ReactNode;
};

export function Header({ children }: HeaderProps) {
  return (
    <header
      className="h-55 w-full
      bg-[url('/assets/textures/png/HeaderBackground-texture.png')]
      bg-[length:100%_auto]
      bg-center bg-no-repeat"
    >
      {children}
    </header>
  );
}
