import React from "react";
import type { ReactNode } from "react";

type HeaderProps = {
  children?: ReactNode;
};

export function Header({ children }: HeaderProps) {
  return (
    <header
      className="flex flex-col justify-end items-end
      min-h-48 w-full pt-20 md:h-80 md:pt-0
      short:h-auto short:min-h-0 short:pt-16
      bg-[url('/assets/textures/png/HeaderBackground-texture.png')]
      bg-cover lg:bg-[length:100%_auto]
      bg-center bg-no-repeat"
    >
      {children}
    </header>
  );
}
