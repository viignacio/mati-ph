import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  // Gradient fill — primary CTA with aquatic shimmer energy
  primary:
    "cta-gradient text-on-primary font-semibold hover:cta-gradient-hover active:scale-[0.97] shadow-ambient-md",
  // Soft-touch — surface-highest with primary text
  secondary:
    "bg-secondary text-on-secondary font-semibold hover:bg-secondary-dim active:scale-[0.97] shadow-ambient-md",
  // Hand-drawn cultural accent — text-only with tertiary underline
  tertiary:
    "bg-tertiary text-on-tertiary font-semibold hover:bg-tertiary-dim active:scale-[0.97] shadow-ambient-md",
  // Minimalist outline
  outline:
    "bg-transparent border-2 border-primary text-primary font-semibold hover:bg-primary/5 active:scale-[0.97]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 px-5 text-sm rounded-full",
  md: "h-12 px-7 text-base rounded-full",
  lg: "h-14 px-9 text-lg rounded-full",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 cursor-pointer",
          "transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
