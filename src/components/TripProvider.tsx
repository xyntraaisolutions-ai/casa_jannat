"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { emptyTrip, sanitizeTrip, type LineHold, type TripState, type VillaHold } from "@/lib/trip";

const STORAGE_KEY = "casa-jannat-trip";

type TripContextValue = {
  trip: TripState;
  ready: boolean;
  count: number;
  setVilla: (villa: VillaHold) => void;
  addLine: (line: Omit<LineHold, "id">) => void;
  updateLine: (id: string, patch: Partial<LineHold>) => void;
  removeLine: (id: string) => void;
  setPackageSlug: (slug: string | null) => void;
  replaceTrip: (next: TripState) => void;
  clear: () => void;
};

const TripContext = createContext<TripContextValue | null>(null);

export function TripProvider({ children }: { children: React.ReactNode }) {
  const [trip, setTrip] = useState<TripState>(emptyTrip);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setTrip(sanitizeTrip(JSON.parse(raw)));
    } catch {
      setTrip(emptyTrip);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trip));
  }, [trip, ready]);

  const value = useMemo<TripContextValue>(
    () => ({
      trip,
      ready,
      count: (trip.villa ? 1 : 0) + trip.lines.length,
      setVilla: (villa) => setTrip((current) => ({ ...current, villa })),
      addLine: (line) =>
        setTrip((current) => ({
          ...current,
          lines: [...current.lines, { ...line, id: `${line.slug}-${crypto.randomUUID()}` }],
        })),
      updateLine: (id, patch) =>
        setTrip((current) => ({
          ...current,
          lines: current.lines.map((line) => (line.id === id ? { ...line, ...patch } : line)),
        })),
      removeLine: (id) =>
        setTrip((current) => ({ ...current, lines: current.lines.filter((line) => line.id !== id) })),
      setPackageSlug: (packageSlug) => setTrip((current) => ({ ...current, packageSlug })),
      replaceTrip: (next) => setTrip(sanitizeTrip(next)),
      clear: () => setTrip(emptyTrip),
    }),
    [trip, ready],
  );

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export function useTrip() {
  const value = useContext(TripContext);
  if (!value) throw new Error("useTrip must be used inside TripProvider");
  return value;
}
