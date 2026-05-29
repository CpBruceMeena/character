"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "coral" | "disabled";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-amber-500 text-white hover:bg-amber-600 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2",
  coral:
    "bg-coral-500 text-white hover:bg-coral-600 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-coral-400 focus-visible:ring-offset-2",
  secondary:
    "bg-bg-card text-text-primary border border-border hover:border-border-hover hover:bg-gray-50 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2",
  ghost:
    "bg-transparent text-text-secondary hover:bg-gray-100 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2",
  disabled:
    "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-[15px] gap-2",
  lg: "px-7 py-3 text-base gap-2.5",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", disabled, children, ...props }, ref) => {
    const resolvedVariant = disabled ? "disabled" : variant;

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`
          inline-flex items-center justify-center rounded-[10px] font-[family-name:var(--font-body-dm-sans)]
          font-semibold leading-none transition-all duration-150 ease-out
          ${variantStyles[resolvedVariant]}
          ${sizeStyles[size]}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps, ButtonVariant };
