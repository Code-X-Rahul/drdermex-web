import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const MainWrapper = ({ children, className }: Props) => {
  return <div className={cn("max-w-7xl mx-auto", className)}>{children}</div>;
};

export default MainWrapper;
