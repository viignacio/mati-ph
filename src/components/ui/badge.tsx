import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

type BadgeVariant = "primary" | "secondary" | "tertiary" | "surface";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: "bg-primary-container text-primary",
  secondary: "bg-secondary-container text-secondary",
  tertiary: "bg-tertiary-container text-tertiary",
  surface: "bg-surface-highest text-on-surface-variant",
};

export function Badge({
  variant = "surface",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export type { BadgeProps, BadgeVariant };
