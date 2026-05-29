"use client";

import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "cforge-onboarding-done";

function safeGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage full or blocked — silently skip
  }
}

function safeRemoveItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // Storage unavailable — silently skip
  }
}

export interface OnboardingStep {
  /** data-onboarding-target attribute value to anchor the tooltip to */
  target: string;
  /** Tooltip heading */
  title: string;
  /** Tooltip body text */
  text: string;
  /** Preferred side to render the tooltip relative to the target */
  position: "right" | "left" | "bottom" | "top";
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    target: "sidebar-categories",
    title: "Choose a Template",
    text: "Start by picking a character category — Cartoon, Fantasy, Modern, or Historical. Then select a template to begin customizing.",
    position: "right",
  },
  {
    target: "controls-tabs",
    title: "Customize Every Detail",
    text: "Use these tabs to tweak your character's body proportions, facial features, hair, clothing, accessories, and background.",
    position: "left",
  },
  {
    target: "undo-redo",
    title: "Undo Any Change",
    text: "Made a mistake? Use Undo (⌘Z) and Redo (⌘⇧Z) to step through every change. Your entire edit history is preserved during the session.",
    position: "bottom",
  },
  {
    target: "export-btn",
    title: "Export Your Character",
    text: "When you're happy with your design, export as a high-res PNG or JPEG image. Choose from Social Media, Profile Picture, or Full Body presets.",
    position: "bottom",
  },
];

export function useOnboarding() {
  const [step, setStep] = useState<number | null>(() => {
    // Default to null — will be resolved in useEffect to avoid hydration mismatch
    return null;
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const done = safeGetItem(STORAGE_KEY);
    setStep(done === "true" ? null : 0);
    setHydrated(true);
  }, []);

  const next = useCallback(() => {
    setStep((prev) => {
      if (prev === null) return null;
      const nextStep = prev + 1;
      if (nextStep >= ONBOARDING_STEPS.length) {
        safeSetItem(STORAGE_KEY, "true");
        return null;
      }
      return nextStep;
    });
  }, []);

  const dismiss = useCallback(() => {
    safeSetItem(STORAGE_KEY, "true");
    setStep(null);
  }, []);

  const reset = useCallback(() => {
    safeRemoveItem(STORAGE_KEY);
    setStep(0);
  }, []);

  const currentStep =
    step !== null && hydrated ? ONBOARDING_STEPS[step] : null;

  return {
    step,
    totalSteps: ONBOARDING_STEPS.length,
    currentStep,
    next,
    dismiss,
    reset,
    isActive: step !== null && hydrated,
    hydrated,
  };
}
