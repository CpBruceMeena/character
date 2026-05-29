"use client";

import { useEffect, useState } from "react";

type ToastType = "success" | "error" | "info";

interface ToastData {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContainerProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}

const typeStyles: Record<ToastType, string> = {
  success: "bg-[#ecfdf5] text-[#065f46] border-[#a7f3d0]",
  error: "bg-[#fef2f2] text-[#991b1b] border-[#fecaca]",
  info: "bg-amber-50 text-amber-800 border-amber-200",
};

const icons: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  info: "i",
};

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastData;
  onDismiss: (id: string) => void;
}) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onDismiss(toast.id), 300);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div
      role="alert"
      aria-live={toast.type === "error" ? "assertive" : "polite"}
      className={`
        flex items-center gap-3 rounded-[10px] border px-4 py-3 shadow-md
        ${typeStyles[toast.type]}
        ${exiting ? "animate-[slide-up_300ms_ease-out_forwards]" : "animate-[slide-down_300ms_ease-out]"}
      `}
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-current/10 text-sm font-bold">
        {icons[toast.type]}
      </span>
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        onClick={() => {
          setExiting(true);
          setTimeout(() => onDismiss(toast.id), 300);
        }}
        className="flex h-6 w-6 items-center justify-center rounded-full text-current/60 hover:text-current/90 transition-colors"
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  );
}

function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed left-1/2 top-4 z-50 flex w-full max-w-sm -translate-x-1/2 flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

export { ToastContainer };
export type { ToastData, ToastType };
