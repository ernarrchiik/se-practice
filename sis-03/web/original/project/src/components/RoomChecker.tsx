import { useMemo, useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Ban,
  Plus,
  Trash2,
  CalendarClock,
  DoorOpen,
  RotateCcw,
} from "lucide-react";
import { checkAvailability, fmt, type Interval, DAY_MINUTES, MAX_DURATION, parseMin } from "@/lib/time";

const DEFAULT_NOW = 540; // 09:00
const DEFAULT_BLOCKED = false;
const DEFAULT_EXISTING: Interval[] = [[600, 660]]; // 10:00–11:00
const DEFAULT_ROOM = "Library Study Room 204";

const ROOM_OPTIONS = [
  "Library Study Room 204",
  "Engineering Lab 110",
  "Business Classroom 305",
];

export default function RoomChecker() {
  const [room, setRoom] = useState(DEFAULT_ROOM);
  const [now, setNow] = useState(String(DEFAULT_NOW));
  const [blocked, setBlocked] = useState(DEFAULT_BLOCKED);
  const [existing, setExisting] = useState<Interval[]>(DEFAULT_EXISTING);

  const [startStr, setStartStr] = useState("");
  const [endStr, setEndStr] = useState("");
  const [result, setResult] = useState<{ available: boolean; valid: boolean; reason: string } | null>(null);

  // Snapshot of inputs at check time so the displayed verdict stays stable between checks (AC5 spirit)
  const [checked, setChecked] = useState<{ start: number; end: number } | null>(null);

  // New-interval add form
  const [newStart, setNewStart] = useState("");
  const [newEnd, setNewEnd] = useState("");

  const nowMin = parseMin(now) ?? -1;

  const resetAll = () => {
    setRoom(DEFAULT_ROOM);
    setNow(String(DEFAULT_NOW));
    setBlocked(DEFAULT_BLOCKED);
    setExisting(DEFAULT_EXISTING);
    setStartStr("");
    setEndStr("");
    setResult(null);
    setChecked(null);
    setNewStart("");
    setNewEnd("");
  };

  const handleCheck = () => {
    const s = parseMin(startStr);
    const e = parseMin(endStr);
    const n = parseMin(now) ?? DEFAULT_NOW;
    if (s === null || e === null) {
      setResult({ available: false, valid: false, reason: "Enter start and end as whole numbers of minutes." });
      setChecked(null);
      return;
    }
    // AC5: operate on a defensive copy so we never mutate the real existing list
    const snapshot = existing.map((iv) => [iv[0], iv[1]] as Interval);
    const r = checkAvailability(s, e, n, blocked, snapshot);
    setResult(r);
    setChecked({ start: s, end: e });
  };

  const addInterval = () => {
    const s = parseMin(newStart);
    const e = parseMin(newEnd);
    if (s === null || e === null || s < 0 || e > DAY_MINUTES || s >= e) {
      return;
    }
    setExisting((prev) => [...prev, [s, e] as Interval].sort((a, b) => a[0] - b[0]));
    setNewStart("");
    setNewEnd("");
    setResult(null);
    setChecked(null);
  };

  const removeInterval = (idx: number) => {
    setExisting((prev) => prev.filter((_, i) => i !== idx));
    setResult(null);
    setChecked(null);
  };

  const timeline = useMemo(() => {
    const markers: { at: number; label: string; kind: "now" | "block" }[] = [];
    if (nowMin >= 0 && nowMin <= DAY_MINUTES) markers.push({ at: nowMin, label: `Now ${fmt(nowMin)}`, kind: "now" });
    existing.forEach(([s, e]) => markers.push({ at: (s + e) / 2, label: `${fmt(s)}–${fmt(e)}`, kind: "block" }));
    return markers;
  }, [nowMin, existing]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center px-4 py-6 sm:py-10">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <header className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sky-600 text-white mb-3">
            <DoorOpen className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Room Availability Checker</h1>
          <p className="text-slate-500 text-sm mt-1.5 max-w-md mx-auto">
            Check whether a single campus room is free for a requested time. This tool checks availability only — it does not create or confirm bookings.
          </p>
        </header>

        {/* Selected room card */}
        <section className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-5 mb-4">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400 mb-2">
            <DoorOpen className="w-3.5 h-3.5" /> Selected room
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <select
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full sm:w-auto text-base font-semibold bg-slate-50 ring-1 ring-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {ROOM_OPTIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <span
              className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full ${
                blocked ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${blocked ? "bg-red-500" : "bg-emerald-500"}`} />
              {blocked ? "Blocked" : "Open"}
            </span>
          </div>
        </section>

        {/* Availability check */}
        <section className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-5 mb-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-4">
            <CalendarClock className="w-4 h-4 text-sky-600" /> Check availability
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <label className="block">
              <span className="text-xs font-medium text-slate-500">Start (min after midnight)</span>
              <input
                type="number"
                inputMode="numeric"
                value={startStr}
                onChange={(e) => { setStartStr(e.target.value); setResult(null); }}
                placeholder="e.g. 555"
                className="mt-1 w-full rounded-lg bg-slate-50 ring-1 ring-slate-200 px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              {startStr && parseMin(startStr) !== null && (
                <span className="text-xs text-slate-400 mt-1 block">{fmt(parseMin(startStr)!)}</span>
              )}
            </label>
            <label className="block">
              <span className="text-xs font-medium text-slate-500">End (min after midnight)</span>
              <input
                type="number"
                inputMode="numeric"
                value={endStr}
                onChange={(e) => { setEndStr(e.target.value); setResult(null); }}
                placeholder="e.g. 570"
                className="mt-1 w-full rounded-lg bg-slate-50 ring-1 ring-slate-200 px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              {endStr && parseMin(endStr) !== null && (
                <span className="text-xs text-slate-400 mt-1 block">{fmt(parseMin(endStr)!)}</span>
              )}
            </label>
          </div>

          <button
            onClick={handleCheck}
            className="mt-4 w-full bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-medium rounded-lg px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Check availability
          </button>

          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Intervals are [start, end). Maximum duration is {MAX_DURATION} minutes. Times run 0–{DAY_MINUTES} (00:00–24:00).
          </p>

          {/* Result */}
          {result && (
            <div
              role="status"
              className={`mt-4 rounded-xl p-4 flex items-start gap-3 transition-all ${
                result.available
                  ? "bg-emerald-50 ring-1 ring-emerald-200"
                  : "bg-red-50 ring-1 ring-red-200"
              }`}
            >
              {result.available ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className={`font-semibold ${result.available ? "text-emerald-800" : "text-red-800"}`}>
                  {result.available ? "Available" : "Unavailable"}
                </p>
                <p className={`text-sm mt-0.5 ${result.available ? "text-emerald-700" : "text-red-700"}`}>
                  {result.reason}
                </p>
                {checked && (
                  <p className="text-xs text-slate-500 mt-1">
                    Checked {fmt(checked.start)}–{fmt(checked.end)} · existing bookings unchanged.
                  </p>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Demonstration data controls */}
        <section className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Clock className="w-4 h-4 text-sky-600" /> Demonstration data
            </div>
            <button
              onClick={resetAll}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          {/* now + blocked */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <label className="block">
              <span className="text-xs font-medium text-slate-500">Current time (min after midnight)</span>
              <input
                type="number"
                inputMode="numeric"
                value={now}
                onChange={(e) => { setNow(e.target.value); setResult(null); setChecked(null); }}
                className="mt-1 w-full rounded-lg bg-slate-50 ring-1 ring-slate-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <span className="text-xs text-slate-400 mt-1 block">{nowMin !== null && nowMin >= 0 ? fmt(nowMin) : "—"}</span>
            </label>
            <label className="flex flex-col">
              <span className="text-xs font-medium text-slate-500">Room blocked status</span>
              <button
                type="button"
                onClick={() => { setBlocked((b) => !b); setResult(null); setChecked(null); }}
                className={`mt-1 inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium ring-1 transition-colors ${
                  blocked
                    ? "bg-red-50 text-red-700 ring-red-200 hover:bg-red-100"
                    : "bg-emerald-50 text-emerald-700 ring-emerald-200 hover:bg-emerald-100"
                }`}
              >
                <Ban className="w-4 h-4" />
                {blocked ? "Blocked — all requests unavailable" : "Open"}
              </button>
            </label>
          </div>

          {/* Existing bookings */}
          <div className="mt-5">
            <div className="text-xs font-medium text-slate-500 mb-2">Existing bookings (fictional)</div>
            {existing.length === 0 ? (
              <p className="text-sm text-slate-400 italic">No existing bookings.</p>
            ) : (
              <ul className="space-y-2">
                {existing.map(([s, e], i) => (
                  <li key={i} className="flex items-center justify-between bg-slate-50 ring-1 ring-slate-200 rounded-lg px-3 py-2">
                    <span className="text-sm text-slate-700 font-medium">
                      {fmt(s)}–{fmt(e)} <span className="text-slate-400">({e - s} min)</span>
                    </span>
                    <button
                      onClick={() => removeInterval(i)}
                      aria-label={`Remove booking ${fmt(s)} to ${fmt(e)}`}
                      className="text-slate-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Add interval */}
            <div className="mt-3 grid grid-cols-[1fr_1fr_auto] gap-2">
              <input
                type="number"
                inputMode="numeric"
                value={newStart}
                onChange={(e) => setNewStart(e.target.value)}
                placeholder="Start"
                className="w-full rounded-lg bg-slate-50 ring-1 ring-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <input
                type="number"
                inputMode="numeric"
                value={newEnd}
                onChange={(e) => setNewEnd(e.target.value)}
                placeholder="End"
                className="w-full rounded-lg bg-slate-50 ring-1 ring-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                onClick={addInterval}
                className="inline-flex items-center justify-center gap-1 rounded-lg bg-slate-800 hover:bg-slate-900 text-white px-3 py-2 text-sm font-medium transition-colors"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-1.5">These edits change local demo data only. They do not create real bookings.</p>
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-5 mb-6">
          <div className="text-xs font-medium text-slate-500 mb-3">Day timeline (00:00 – 24:00)</div>
          <div className="relative h-10 bg-slate-100 rounded-lg overflow-hidden">
            {/* Existing bookings */}
            {existing.map(([s, e], i) => (
              <div
                key={i}
                className="absolute top-0 bottom-0 bg-slate-800/80"
                style={{ left: `${(s / DAY_MINUTES) * 100}%`, width: `${((e - s) / DAY_MINUTES) * 100}%` }}
                title={`${fmt(s)}–${fmt(e)}`}
              />
            ))}
            {/* Now marker */}
            {nowMin >= 0 && nowMin <= DAY_MINUTES && (
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-sky-500"
                style={{ left: `${(nowMin / DAY_MINUTES) * 100}%` }}
                title={`Now: ${fmt(nowMin)}`}
              />
            )}
            {/* Checked interval */}
            {checked && (
              <div
                className={`absolute top-0 bottom-0 ${result?.available ? "bg-emerald-400/60" : "bg-red-400/60"}`}
                style={{ left: `${(checked.start / DAY_MINUTES) * 100}%`, width: `${((checked.end - checked.start) / DAY_MINUTES) * 100}%` }}
                title={`Checked ${fmt(checked.start)}–${fmt(checked.end)}`}
              />
            )}
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
          </div>
          <div className="flex flex-wrap gap-3 mt-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 bg-slate-800/80 rounded-sm" /> Booking</span>
            <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 bg-sky-500 rounded-sm" /> Now</span>
            <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 bg-emerald-400/60 rounded-sm" /> Checked</span>
          </div>
          {timeline.length === 0 && (
            <p className="text-xs text-slate-400 italic mt-2">No markers to show.</p>
          )}
        </section>

        <p className="text-center text-xs text-slate-400">
          Read-only checker · no login, backend, or database · all data is fictional and held in memory.
        </p>
      </div>
    </div>
  );
}
