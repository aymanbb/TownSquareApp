import React from "react";
import { ReactNode } from "react";
type ScrollViewProps = {
  children?: ReactNode;
  className: string;
};
export const ScrollView = ({ children, className }: ScrollViewProps) => {
  return (
    <div className={`${className ?? ""} overflow-y-auto overflow-x-hidden`}>
      {children}
    </div>
  );
};
