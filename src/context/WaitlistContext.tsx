import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getReferralCount, joinWaitlist, type JoinWaitlistResult } from "../lib/waitlist";

export interface WaitlistContextType {
  joined: boolean;
  already: boolean;
  code: string | null;
  count: number;
  join: (args: { email: string; contractType?: string | null }) => Promise<JoinWaitlistResult>;
  reset: () => void;
}

const WaitlistContext = createContext<WaitlistContextType | null>(null);

const STORE_CODE = "sw_code";
const STORE_REF = "sw_ref";

const storage = {
  get(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* storage unavailable */
    }
  },
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {
      /* storage unavailable */
    }
  },
};

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [joined, setJoined] = useState(false);
  const [already, setAlready] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  // On first load: remember who invited this visitor, and recognise someone who already joined here.
  useEffect(() => {
    const ref = (new URLSearchParams(window.location.search).get("ref") || "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 12);
    if (ref.length >= 4) storage.set(STORE_REF, ref);

    const saved = storage.get(STORE_CODE);
    if (saved) {
      setCode(saved);
      setJoined(true);
    }
  }, []);

  // Once someone has joined, look up how many friends came through their link.
  useEffect(() => {
    if (!joined || !code) return;
    let cancelled = false;
    getReferralCount(code).then((n) => {
      if (!cancelled) setCount(n);
    });
    return () => {
      cancelled = true;
    };
  }, [joined, code]);

  const join = useCallback(async ({ email, contractType }: { email: string; contractType?: string | null }) => {
    const result = await joinWaitlist({
      email,
      contractType,
      referredBy: storage.get(STORE_REF),
    });
    if (result.refCode) {
      storage.set(STORE_CODE, result.refCode);
      setCode(result.refCode);
    }
    setAlready(result.status === "exists");
    setJoined(true);
    return result;
  }, []);

  const reset = useCallback(() => {
    storage.remove(STORE_CODE);
    setCode(null);
    setCount(0);
    setAlready(false);
    setJoined(false);
  }, []);

  const value = useMemo(
    () => ({ joined, already, code, count, join, reset }),
    [joined, already, code, count, join, reset]
  );

  return <WaitlistContext.Provider value={value}>{children}</WaitlistContext.Provider>;
}

export function useWaitlist() {
  const ctx = useContext(WaitlistContext);
  if (!ctx) throw new Error("useWaitlist must be used inside <WaitlistProvider>");
  return ctx;
}
