"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/shared/Button";
import type { OnboardingStep } from "@/lib/utils/use-onboarding";

interface OnboardingTooltipProps {
  step: OnboardingStep;
  currentIndex: number;
  totalSteps: number;
  onNext: () => void;
  onDismiss: () => void;
}

interface Pos {
  top: number;
  left: number;
}

const TOOLTIP_WIDTH = 320;
const GAP = 14;

export function OnboardingTooltip({
  step,
  currentIndex,
  totalSteps,
  onNext,
  onDismiss,
}: OnboardingTooltipProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<Pos>({ top: 0, left: 0 });
  const [arrowPos, setArrowPos] = useState<Pos>({ top: 0, left: 0 });
  const [arrowTransformed, setArrowTransformed] = useState(false);

  const compute = useCallback(() => {
    const el = document.querySelector(
      `[data-onboarding-target="${CSS.escape(step.target)}"]`
    );
    if (!el) return;
    const rect = el.getBoundingClientRect();

    const tooltipH = cardRef.current?.offsetHeight ?? 160;
    const tooltipW = TOOLTIP_WIDTH;
    let top = 0;
    let left = 0;
    let aTop = 0;
    let aLeft = 0;

    switch (step.position) {
      case "right": {
        top = rect.top + rect.height / 2 - tooltipH / 2;
        left = rect.right + GAP;
        aTop = tooltipH / 2 - 6;
        aLeft = -6;
        break;
      }
      case "left": {
        top = rect.top + rect.height / 2 - tooltipH / 2;
        left = rect.left - tooltipW - GAP;
        aTop = tooltipH / 2 - 6;
        aLeft = tooltipW - 6;
        break;
      }
      case "bottom": {
        top = rect.bottom + GAP;
        left = rect.left + rect.width / 2 - tooltipW / 2;
        aTop = -6;
        aLeft = tooltipW / 2 - 6;
        break;
      }
      case "top": {
        top = rect.top - tooltipH - GAP;
        left = rect.left + rect.width / 2 - tooltipW / 2;
        aTop = tooltipH - 6;
        aLeft = tooltipW / 2 - 6;
        break;
      }
    }

    const idealTop = top;
    const idealLeft = left;

    // Clamp to viewport padding
    const padding = 12;
    const clampedTop = Math.max(padding, Math.min(top, window.innerHeight - tooltipH - padding));
    const clampedLeft = Math.max(padding, Math.min(left, window.innerWidth - tooltipW - padding));

    // If clamping moved the tooltip, hide the arrow to avoid pointing at empty space.
    setArrowTransformed(clampedTop !== idealTop || clampedLeft !== idealLeft);

    setPos({ top: clampedTop, left: clampedLeft });
    setArrowPos({ top: aTop, left: aLeft });
  }, [step]);

  // Initial position and scroll/resize tracking
  useEffect(() => {
    compute();

    const handle = () => compute();
    window.addEventListener("scroll", handle, { capture: true, passive: true });
    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("scroll", handle, { capture: true });
      window.removeEventListener("resize", handle);
    };
  }, [compute]);

  // Recompute after layout settles (tooltip height might change)
  useEffect(() => {
    const ro = new ResizeObserver(() => compute());
    if (cardRef.current) ro.observe(cardRef.current);
    return () => ro.disconnect();
  }, [compute]);

  // Escape dismisses
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onDismiss]);

  return createPortal(
    <>
      {/* Backdrop — clicking does nothing, dismiss via button only */}
      <div
        className="fixed inset-0 z-50 bg-black/15 backdrop-blur-[1px] transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Tooltip card */}
      <div
        className="fixed z-50 animate-in fade-in slide-in-from-bottom-2 duration-200"
        style={{ top: pos.top, left: pos.left, width: TOOLTIP_WIDTH }}
        role="dialog"
        aria-modal="false"
        aria-label={step.title}
      >
        {/* Arrow — hidden via opacity when viewport clamping pushes tooltip off-target */}
        <div
          className={`absolute h-3 w-3 rotate-45 bg-white transition-opacity duration-150 ${
            arrowTransformed ? "opacity-0" : "opacity-100"
          }`}
          style={{ top: arrowPos.top, left: arrowPos.left }}
          aria-hidden="true"
        />

        <div className="rounded-[16px] bg-white p-5 shadow-xl ring-1 ring-black/5">
          {/* Step indicator */}
          <div className="mb-1 flex items-center gap-1.5">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "w-6 bg-amber-500"
                    : i < currentIndex
                      ? "w-1.5 bg-amber-300"
                      : "w-1.5 bg-gray-200"
                }`}
              />
            ))}
          </div>

          {/* Title */}
          <h3 className="mb-1 font-[family-name:var(--font-display-fredoka)] text-base font-semibold text-gray-800">
            {step.title}
          </h3>

          {/* Body */}
          <p className="mb-4 text-sm leading-relaxed text-gray-500">
            {step.text}
          </p>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={onDismiss}
              className="text-xs font-medium text-gray-400 transition-colors hover:text-gray-600"
            >
              Skip tour
            </button>
            <div className="flex items-center gap-2">
              {currentIndex < totalSteps - 1 ? (
                <Button variant="coral" size="sm" onClick={onNext} autoFocus>
                  Next
                  <svg
                    className="ml-1 h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Button>
              ) : (
                <Button variant="coral" size="sm" onClick={onDismiss} autoFocus>
                  Got it
                  <svg
                    className="ml-1 h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
