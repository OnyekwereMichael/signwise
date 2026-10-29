import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

const base =
  "inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-lg border px-5 text-base font-medium transition-colors cursor-pointer disabled:cursor-progress";

const variants = {
  primary: "border-transparent bg-pen text-white hover:bg-pen-dark disabled:bg-[#7c88e6]",
  quiet: "border-field bg-transparent text-ink hover:border-ink",
} as const;

const sizes = {
  md: "",
  sm: "min-h-10 px-4 text-[0.9375rem]",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: ReactNode;
};

type AnchorProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type ButtonProps = AnchorProps | NativeButtonProps;

/** Renders a <button>, or an <a> when you pass href. */
export default function Button({
  variant = "primary",
  size = "md",
  href,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();
  if (href) {
    return <a href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  }
  return <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)} />;
}
