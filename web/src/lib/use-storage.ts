"use client";

import { useMemo, useSyncExternalStore } from "react";
import { readStoredIds, type ProductCombo, type RoomSize, writeStoredIds } from "@/lib/site";

const EVENT = "home-update-storage";

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function readRaw(key: string) {
  try {
    return window.localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}

/** Server snapshot is always empty so hydration stays deterministic. */
const serverSnapshot = () => "";

/** Hydration detection without an extra render pass. */
export function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

/**
 * Subscribe to a localStorage key. Uses useSyncExternalStore so there is no
 * extra render pass on mount and every mounted component stays in sync.
 */
export function useStoredValue(key: string) {
  return useSyncExternalStore(subscribe, () => readRaw(key), serverSnapshot);
}

export function useStoredIds(key: string): string[] {
  const raw = useStoredValue(key);
  return useMemo(() => {
    if (!raw) return [];
    try {
      const parsed: unknown = JSON.parse(raw);
      return Array.isArray(parsed)
        ? parsed.filter((v): v is string => typeof v === "string")
        : [];
    } catch {
      return [];
    }
  }, [raw]);
}

export function useStoredRoom(): RoomSize | null {
  const raw = useStoredValue("home-update-room");
  return useMemo(() => {
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw) as Partial<RoomSize>;
      if (
        typeof parsed.lengthM === "number" &&
        typeof parsed.widthM === "number" &&
        parsed.lengthM > 0 &&
        parsed.widthM > 0
      ) {
        return { lengthM: parsed.lengthM, widthM: parsed.widthM };
      }
      return null;
    } catch {
      return null;
    }
  }, [raw]);
}

/** Toggle a value in a stored id list, capped at `max` entries. */
export function useToggleStored(key: string, max = Number.POSITIVE_INFINITY) {
  const ids = useStoredIds(key);
  const toggle = (id: string): "ok" | "full" => {
    const current = readStoredIds(key);
    if (!current.includes(id) && current.length >= max) return "full";
    const next = current.includes(id) ? current.filter((i) => i !== id) : [...current, id];
    writeStoredIds(key, next);
    return "ok";
  };
  return { ids, toggle };
}

/** The visitor's saved fabric/colour/timber combo for one product. */
export function useStoredCombo(productId: string) {
  const raw = useStoredValue("home-update-combos");
  return useMemo(() => {
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw) as Record<string, ProductCombo>;
      return parsed[productId] ?? null;
    } catch {
      return null;
    }
  }, [raw, productId]);
}