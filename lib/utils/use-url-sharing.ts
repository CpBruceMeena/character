"use client";

import { useEffect, useRef } from "react";
import { useCharacterStore, type CharacterState } from "@/lib/stores/character-store";

const PARAM_KEY = "c";

/**
 * Encode character state into a compact URL query parameter string.
 *
 * Strategy: JSON-stringify a minimal subset of the character state,
 * then base64-encode for URL safety (avoids encoding issues with
 * special characters in hex colors like #D4A574).
 */
function encodeState(): string {
  const state = useCharacterStore.getState();
  const payload = {
    g: state.gender,
    b: state.bodyType,
    cc: state.categoryId,
    ct: state.templateId,
    h: state.height,
    w: state.width,
    hs: state.headSize,
    lp: state.limbProportions,
    es: state.eyeSize,
    e: state.expression,
    sk: state.skinTone,
    hc: state.hairColor,
    o: state.outfit,
    oc: state.outfitColors,
    bm: state.backgroundMode,
  };
  try {
    const json = JSON.stringify(payload);
    return btoa(encodeURIComponent(json));
  } catch {
    return "";
  }
}

interface DecodedState {
  gender?: string;
  bodyType?: string;
  categoryId?: string | null;
  templateId?: string | null;
  height?: number;
  width?: number;
  headSize?: number;
  limbProportions?: number;
  eyeSize?: number;
  expression?: string;
  skinTone?: string;
  hairColor?: string;
  outfit?: string;
  outfitColors?: Record<string, string>;
  backgroundMode?: string;
}

function decodeParam(param: string): DecodedState | null {
  try {
    const json = decodeURIComponent(atob(param));
    const parsed = JSON.parse(json);
    return {
      gender: parsed.g,
      bodyType: parsed.b,
      categoryId: parsed.cc ?? null,
      templateId: parsed.ct ?? null,
      height: parsed.h,
      width: parsed.w,
      headSize: parsed.hs,
      limbProportions: parsed.lp,
      eyeSize: parsed.es,
      expression: parsed.e,
      skinTone: parsed.sk,
      hairColor: parsed.hc,
      outfit: parsed.o,
      outfitColors: parsed.oc,
      backgroundMode: parsed.bm,
    };
  } catch {
    return null;
  }
}

/**
 * Read character state from URL query params on mount.
 * If a valid `?c=` param is found, hydrate the store with it.
 */
function hydrateFromUrl(): boolean {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get(PARAM_KEY);
  if (!encoded) return false;

  const decoded = decodeParam(encoded);
  if (!decoded) return false;

  const store = useCharacterStore.getState();
  if (decoded.gender) store.setGender(decoded.gender as CharacterState["gender"]);
  if (decoded.bodyType) store.setBodyType(decoded.bodyType);
  if (decoded.categoryId !== undefined) store.selectCategory(decoded.categoryId ?? "cartoon");
  if (decoded.templateId !== undefined) store.selectTemplate(decoded.templateId ?? "");
  if (decoded.height !== undefined) store.setHeight(decoded.height);
  if (decoded.width !== undefined) store.setWidth(decoded.width);
  if (decoded.headSize !== undefined) store.setHeadSize(decoded.headSize);
  if (decoded.limbProportions !== undefined) store.setLimbProportions(decoded.limbProportions);
  if (decoded.eyeSize !== undefined) store.setEyeSize(decoded.eyeSize);
  if (decoded.expression) store.setExpression(decoded.expression);
  if (decoded.skinTone) store.setSkinTone(decoded.skinTone);
  if (decoded.hairColor) store.setHairColor(decoded.hairColor);
  if (decoded.outfit) store.setOutfit(decoded.outfit);
  if (decoded.outfitColors) {
    Object.entries(decoded.outfitColors).forEach(([zone, color]) => {
      store.setOutfitColor(zone, color);
    });
  }
  if (decoded.backgroundMode) store.setBackgroundMode(decoded.backgroundMode as CharacterState["backgroundMode"]);
  return true;
}

/**
 * Sync the current character state to the URL query param.
 * Debounced to avoid excessive history entries during slider drags.
 */
function syncUrl(): void {
  if (typeof window === "undefined") return;
  const encoded = encodeState();
  if (!encoded) return;

  const url = new URL(window.location.href);
  url.searchParams.set(PARAM_KEY, encoded);

  // Use replaceState to avoid polluting browser history on every slider change
  window.history.replaceState(null, "", url.toString());
}

/**
 * Hook that syncs character state to/from URL query parameters.
 *
 * - On mount, reads `?c=` param and hydrates the store if present.
 * - Subscribes to store changes and debounced-syncs the URL.
 *
 * Usage: add `<UrlStateSync />` somewhere inside the editor layout.
 */
export function UrlStateSync() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Hydrate from URL if present
    hydrateFromUrl();

    // Debounced sync: update URL ~300ms after last store change
    let timeout: ReturnType<typeof setTimeout> | null = null;
    const unsub = useCharacterStore.subscribe(() => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(syncUrl, 300);
    });

    return () => {
      unsub();
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return null;
}
