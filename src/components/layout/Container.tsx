import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

/** Centers content and sets the page gutters. */
export default function Container<T extends ElementType = "div">({
  as,
  className = "",
  ...props
}: ContainerProps<T>) {
  const Tag = as || "div";
  return <Tag className={`mx-auto w-full max-w-[1160px] px-5 sm:px-6 ${className}`} {...props} />;
}
