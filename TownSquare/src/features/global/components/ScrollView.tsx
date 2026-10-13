import React from "react";
import { ReactNode } from "react";
type ScrollViewProps = {
  children?: ReactNode;
  className: string;
};
export const ScrollView = ({ children, className }: ScrollViewProps) => {
  return (
    <div
      className={`${className ?? ""} overflow-y-auto overflow-x-hidden 
         [scrollbar-gutter:auto]
  [scrollbar-width:thin]
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-transparent`}
    >
      {children}
    </div>
  );
};
