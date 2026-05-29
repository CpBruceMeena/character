"use client";

import type { ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  active?: boolean;
}

function IconButton({
  label,
  active = false,
  className = "",
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={`
        group relative flex h-9 w-9 items-center justify-center rounded-[10px] transition-all duration-150 ease-out
        ${
          active
            ? "bg-amber-100 text-amber-700"
            : "text-text-secondary hover:bg-gray-100 hover:text-text-primary"
        }
        disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent
        focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2
        ${className}
      `}
      aria-label={label}
      {...props}
    >
      {children}
      <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[6px] bg-text-primary px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        {label}
      </span>
    </button>
  );
}

export { IconButton };
