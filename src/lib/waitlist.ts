import { supabase } from "./supabase";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// No 0, 1, i, l or o, so codes are easy to read aloud.
const CODE_ALPHABET = "23456789abcdefghjkmnpqrstuvwxyz";

export function makeCode() {
  const bytes = new Uint8Array(7);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => CODE_ALPHABET[b % CODE_ALPHABET.length]).join("");
}


export interface JoinWaitlistArgs {
  email: string;
  contractType?: string | null;
  referredBy?: string | null;
}

export interface JoinWaitlistResult {
  status: "created" | "exists";
  refCode?: string;
}

export async function joinWaitlist({
  email,
  contractType,
  referredBy,
}: JoinWaitlistArgs): Promise<JoinWaitlistResult> {
  if (!supabase) {
    // Demo mode while you build: nothing is saved.
    if (import.meta.env.DEV) {
      console.info("Waitlist demo mode: nothing was saved. Add your Supabase keys to .env.local.");
      await new Promise((resolve) => setTimeout(resolve, 400));
      return { status: "created", refCode: makeCode() };
    }
    throw new Error("Supabase is not configured");
  }

  for (let attempt = 0; attempt < 3; attempt++) {
    const refCode = makeCode();
    const { error } = await supabase.from("waitlist").insert({
      email,
      contract_type: contractType || null,
      ref_code: refCode,
      referred_by: referredBy || null,
    });

    if (!error) return { status: "created", refCode };

    if (error.code === "23505") {
      // Unique violation: either this email is already in, or the invite code collided.
      const text = `${error.message ?? ""} ${error.details ?? ""}`;
      if (text.includes("waitlist_email_key")) return { status: "exists" };
      continue; // code collision: try a new code
    }
    throw error;
  }
  throw new Error("Could not create a unique invite code");
}

/** How many people joined through this invite code. Returns a number only. */
export async function getReferralCount(code: string): Promise<number> {
  if (!supabase || !code) return 0;
  const { data, error } = await supabase.rpc("referral_count", { code });
  if (error) return 0;
  return Number.isInteger(data) ? data : 0;
}