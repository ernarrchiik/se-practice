// Pure time + availability helpers. No side effects, no mutation of inputs.

export type Interval = [number, number];

export const DAY_MINUTES = 1440;
export const MAX_DURATION = 120;

export function fmt(min: number): string {
  if (min === DAY_MINUTES) return "24:00";
  const h = Math.floor(min / 60);
  const m = Math.round(min % 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function parseMin(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === "") return null;
  if (!/^-?\d+$/.test(trimmed)) return null;
  const n = parseInt(trimmed, 10);
  if (!Number.isInteger(n)) return null;
  return n;
}

export interface CheckResult {
  available: boolean;
  reason: string;
  valid: boolean;
}

// AC1–AC5. `existing` is read-only here; callers must never mutate it.
export function checkAvailability(
  start: number,
  end: number,
  now: number,
  blocked: boolean,
  existing: readonly Interval[]
): CheckResult {
  // AC1: integer minutes, 0 <= start < end <= 1440
  if (!Number.isInteger(start) || !Number.isInteger(end)) {
    return { available: false, valid: false, reason: "Start and end must be whole-minute values." };
  }
  if (start < 0 || end > DAY_MINUTES) {
    return { available: false, valid: false, reason: `Times must stay within 0–${DAY_MINUTES} minutes (00:00–24:00).` };
  }
  if (start >= end) {
    return { available: false, valid: false, reason: "End time must be greater than start time." };
  }
  // AC1: start strictly later than now
  if (start <= now) {
    return { available: false, valid: false, reason: `Start must be strictly later than the current time (${fmt(now)}).` };
  }
  // AC2: max duration 120, exactly 120 allowed
  const duration = end - start;
  if (duration > MAX_DURATION) {
    return { available: false, valid: false, reason: `Requested duration is ${duration} min. The maximum is ${MAX_DURATION} min.` };
  }
  // AC3: blocked room is always unavailable
  if (blocked) {
    return { available: false, valid: true, reason: "Unavailable: this room is currently blocked." };
  }
  // AC4: reject overlap. Intervals are [start, end); touching endpoints do NOT overlap.
  for (const [bs, be] of existing) {
    if (start < be && bs < end) {
      return { available: false, valid: true, reason: `Unavailable: overlaps an existing booking (${fmt(bs)}–${fmt(be)}).` };
    }
  }
  return { available: true, valid: true, reason: `Available: ${fmt(start)}–${fmt(end)} (${duration} min) is free.` };
}
