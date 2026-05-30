"use client";

import { useSyncExternalStore, useCallback } from "react";

const STORAGE_KEY = "cforge-theme";

type Theme = "light" | "dark";

function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // localStorage unavailable
  }
  return null;
}

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getResolvedTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme();
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

function subscribeToChanges(onChange: () => void): () => void {
  // Listen to system preference changes
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const handleChange = () => onChange();
  mq.addEventListener("change", handleChange);

  // Listen to storage events (for cross-tab sync)
  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) onChange();
  };
  window.addEventListener("storage", handleStorage);

  return () => {
    mq.removeEventListener("change", handleChange);
    window.removeEventListener("storage", handleStorage);
  };
}

function getSnapshot(): Theme {
  return getResolvedTheme();
}

function getServerSnapshot(): Theme {
  return "light";
}

/**
 * Reactive theme hook that:
 * - Reads the persisted theme from localStorage (or system preference fallback)
 * - Applies/removes `.dark` on `<html>`
 * - Persists toggle to localStorage
 * - Reacts to system preference changes and cross-tab storage events
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribeToChanges, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((t: Theme) => {
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      // localStorage unavailable
    }
    applyTheme(t);
    // Dispatch a real StorageEvent to trigger the onChange callback in useSyncExternalStore
    window.dispatchEvent(
      new StorageEvent("storage", { key: STORAGE_KEY, newValue: t }),
    );
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  return { theme, setTheme, toggleTheme, isDark: theme === "dark" };
}

/**
 * Self-contained inline script for the root layout `<head>`.
 * This is a plain string — NOT a function — because it runs as an inline
 * `<script>` before any JS module code loads. Everything is inlined to
 * avoid referencing module-scoped symbols (getResolvedTheme, STORAGE_KEY, etc.)
 * that won't exist in the script's execution context.
 *
 * Reads the persisted theme from localStorage (or system preference), applies
 * the `.dark` class to `<html>` before first paint to prevent FOUC.
 */
export const THEME_INLINE_SCRIPT = `(function(){try{var k="cforge-theme",t=localStorage.getItem(k);if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light";localStorage.setItem(k,t)}document.documentElement.classList.toggle("dark",t==="dark")}catch(e){}})()`;
