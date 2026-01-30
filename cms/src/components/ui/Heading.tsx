import * as React from "react";
import { cn } from "@/lib/utils"

type HeadingProps<T extends React.ElementType> = {
  as?: T;
  children: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<T>;

export default function Heading<T extends React.ElementType = "h2">({
  as,
  children,
  className,
  ...props
}: HeadingProps<T>) {
  const Component = as || "h2";

  return (
    <Component
      className={cn(
        "scroll-m-20 font-semibold tracking-tight text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
