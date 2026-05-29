"use client";

import { useState, type ReactNode } from "react";

interface ControlSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function ControlSection({ title, children, defaultOpen = false }: ControlSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-[10px] border border-border">
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm font-medium text-text-primary transition-colors hover:bg-gray-50"
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <svg
          className={`h-3.5 w-3.5 text-text-tertiary transition-transform duration-150 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && <div className="space-y-2.5 border-t border-border px-3 py-3">{children}</div>}
    </div>
  );
}
