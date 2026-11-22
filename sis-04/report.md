# SIS #04 — Report: Evolving the Smart Campus Room Availability Checker

<!-- The ONLY file you write prose in. Keep every numbered heading (## 1. … ## 10.), every
     ### sub-heading and every **Label:** word — the checker finds your answers by them.
     Replace every "(write here)" and "(paste here)". Delete these <!-- --> comments if you like. -->

## 1. Setup and starting point

<!-- Model: the exact model with its version, as the tool shows it ("ChatGPT" is a tool, not a
     model). If the tool does not show it, write: not displayed
     Starting point: week-08 | week-07 | sis-03 | starter   (README section 3)
     Baseline commit: the commit that brings your starting point into sis-04/app/ UNCHANGED —
     git rev-parse --short HEAD right after that commit. It is your "initial version". -->

| Item | Value |
| --- | --- |
| Assistant (tool) | ChatGPT |
| Assistant model | GPT - 6.2 Sol |
| Starting point | week-08 |
| Baseline commit | fb9294a |
| Language (ts or js) | ts |
| Vitest version | 3.2.4 |
| Where I ran the tests | VS Code terminal on macOS, Node.js v24.13.1 |

### 1.1 Baseline run

<!-- Before you change anything: run the tests of your starting point inside app/ and paste the
     REAL output. No tests yet (starter, sis-03)? Paste the run anyway: Vitest prints
     "No test files found". That is your honest "original" number, 0/0. -->

```text
RUN  v3.2.4 /Users/ernarberenbaj/Documents/se-practice/sis-04/app

 ✓ src/booking.test.ts (32 tests) 4ms
   ✓ canBook — reviewed decisions and booking data preservation > T01: AC4 allows touching after an existing booking 1ms
   ✓ canBook — reviewed decisions and booking data preservation > T02: AC1 rejects a start equal to now 0ms
   ✓ canBook — reviewed decisions and booking data preservation > T03: AC1 rejects zero duration 0ms
   ✓ canBook — reviewed decisions and booking data preservation > T04: AC1 rejects a reversed interval 0ms
   ✓ canBook — reviewed decisions and booking data preservation > T05: AC1 rejects an end past 1440 0ms
   ✓ canBook — reviewed decisions and booking data preservation > T06: AC2 allows exactly 120 minutes 0ms
   ✓ canBook — reviewed decisions and booking data preservation > T07: AC2 rejects 121 minutes 0ms
   ✓ canBook — reviewed decisions and booking data preservation > T08: AC4 allows touching before an existing booking 0ms
   ✓ canBook — reviewed decisions and booking data preservation > T09: AC4 rejects partial overlap 0ms
   ✓ canBook — reviewed decisions and booking data preservation > T10: AC4 rejects a request containing an existing booking 0ms
   ✓ canBook — reviewed decisions and booking data preservation > T11: AC4 rejects a request inside an existing booking 0ms
   ✓ canBook — reviewed decisions and booking data preservation > T12: AC4 rejects an identical interval 0ms
   ✓ canBook — reviewed decisions and booking data preservation > T13: AC3 rejects an otherwise valid request when blocked 0ms
   ✓ canBook — reviewed decisions and booking data preservation > T14: AC4 allows a valid request with no existing bookings 0ms
   ✓ canBook — reviewed decisions and booking data preservation > X1: AC1 allows an end exactly at 1440 0ms
   ✓ canBook — reviewed decisions and booking data preservation > X2: AC4 allows touching both neighbouring bookings 0ms
   ✓ canBook — reviewed decisions and booking data preservation > B01: AC1 rejects a negative start 0ms
   ✓ canBook — reviewed decisions and booking data preservation > B02: AC1 rejects a start before now 0ms
   ✓ canBook — reviewed decisions and booking data preservation > B03: AC1 allows a start one minute after now 0ms
   ✓ canBook — reviewed decisions and booking data preservation > B04: AC1 allows start zero with an earlier supplied now 0ms
   ✓ canBook — reviewed decisions and booking data preservation > B05: AC4 rejects overlap in the second unsorted booking 0ms
   ✓ canBook — reviewed decisions and booking data preservation > B06: AC2 allows 119 minutes 0ms
   ✓ canBook — reviewed decisions and booking data preservation > B07: AC1 allows a one-minute duration 0ms
   ✓ canBook — reviewed decisions and booking data preservation > B08: AC4 rejects overlap with the first minute of a booking 0ms
   ✓ canBook — reviewed decisions and booking data preservation > B09: AC4 rejects overlap with the last minute of a booking 0ms
   ✓ canBook — reviewed decisions and booking data preservation > B10: AC4 allows a request separated before a booking 0ms
   ✓ canBook — reviewed decisions and booking data preservation > B11: AC4 allows a request separated after a booking 0ms
   ✓ canBook — reviewed decisions and booking data preservation > B12: AC3 rejects a blocked room with no existing bookings 0ms
   ✓ canBook — reviewed decisions and booking data preservation > B13: AC1 respects a different supplied current time 0ms
   ✓ canBook — reviewed decisions and booking data preservation > AC5: repeated available checks preserve unsorted booking data 0ms
   ✓ canBook — reviewed decisions and booking data preservation > BUG-A: allows a one-minute gap between two unsorted bookings 0ms
   ✓ canBook — reviewed decisions and booking data preservation > BUG-B: an available request preserves the existing bookings 0ms

 Test Files  1 passed (1)
      Tests  32 passed (32)
   Start at  20:00:05
   Duration  424ms (transform 75ms, setup 0ms, collect 68ms, tests 4ms, environment 0ms, prepare 76ms)
```

## 2. Context for the assistant

### 2.1 Repository map

<!-- The concise map you gave the assistant: the files that matter and one line each on what
     they do. A tree is fine:  src/App.tsx — the page, holds the rooms and the form … -->

```text
app/src/App.tsx — Holds the two-room catalog, form state, time parsing, room selection, and availability feedback.
app/src/booking.ts — Implements canBook(), the boolean availability decision for AC1–AC5.
app/src/booking.test.ts — Contains 32 tests for booking rules and preservation of booking data.
app/src/index.css — Styles the page and availability feedback.
```

### 2.2 The context message as sent

<!-- The whole first message of your analysis chat: the map, AC1–AC6, F1–F5 and the constraints
     (no login, payments, live APIs or database; fictional data only). Unedited. -->

```text
import { useState } from 'react';
import { canBook } from './booking';
// Starter for students with no Week 06 project. The availability decision lives INSIDE this
// component on purpose: Task 1 of Practice #07 is to extract it into src/booking.ts as
// canBook({ start, end, now, blocked, bookings }) without changing what the page does.

type Interval = { start: number; end: number };
type Room = { id: string; name: string; blocked: boolean; bookings: Interval[] };

const ROOMS: Room[] = [
  { id: 'a101', name: 'Room A-101', blocked: false, bookings: [{ start: 600, end: 660 }] },
  { id: 'b204', name: 'Room B-204', blocked: false, bookings: [] },
];

const toMinutes = (value: string) => {
  const [h, m] = value.split(':').map(Number);
  return h * 60 + m;
};
const fmt = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;

export default function App() {
  const [roomId, setRoomId] = useState('a101');
  const [now, setNow] = useState('09:00');
  const [blocked, setBlocked] = useState(false);
  const [start, setStart] = useState('11:00');
  const [end, setEnd] = useState('12:00');
  const [endOfDay, setEndOfDay] = useState(false);
  const [result, setResult] = useState<boolean | null>(null);
  const [error, setError] = useState('');

  const room = ROOMS.find(r => r.id === roomId)!;

  function check() {
    setResult(null);
    if (!start || !now || (!end && !endOfDay)) {
      setError('Fill in the current time, the start and the end.');
      return;
    }
    const s = toMinutes(start);
    const e = endOfDay ? 1440 : toMinutes(end);
    const n = toMinutes(now);
    if (!(s < e)) {
      setError('The end time must be after the start time.');
    } else {
      setError('');
    }

    const ok = canBook({
      start: s,
      end: e,
      now: n,
      blocked,
      bookings: room.bookings,
    });
    
    setResult(ok);
  }

  return (
    <main className="page">
      <h1>Smart Campus Room Availability</h1>
      <div className="row">
        <label>Room
          <select value={roomId} onChange={e => setRoomId(e.target.value)}>
            {ROOMS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </label>
        <label>Current time<input type="time" value={now} onChange={e => setNow(e.target.value)} /></label>
        <label>Start<input type="time" value={start} onChange={e => setStart(e.target.value)} /></label>
        <label>End<input type="time" value={end} disabled={endOfDay} onChange={e => setEnd(e.target.value)} /></label>
        <label className="inline"><input type="checkbox" checked={endOfDay} onChange={e => setEndOfDay(e.target.checked)} /> Ends at 24:00</label>
        <label className="inline"><input type="checkbox" checked={blocked} onChange={e => setBlocked(e.target.checked)} /> Room blocked</label>
      </div>
      <button onClick={check}>Check availability</button>
      {error && <p className="error">{error}</p>}
      {result !== null && (
        <p className={`result ${result ? 'available' : 'unavailable'}`}>{result ? 'Available' : 'Unavailable'}</p>
      )}
      <h2>Existing bookings</h2>
      <ul>{room.bookings.length ? room.bookings.map((b, i) => <li key={i}>{fmt(b.start)}–{fmt(b.end)}</li>) : <li>none</li>}</ul>
    </main>
  );
}

type Interval = {
    start: number;
    end: number;
  };
  
  type BookingRequest = {
    start: number;
    end: number;
    now: number;
    blocked: boolean;
    bookings: Interval[];
  };
  
  export function canBook({ start, end, now, blocked, bookings }: {
    start: number;
    end: number;
    now: number;
    blocked: boolean;
    bookings: { start: number; end: number }[];
  }): boolean {
    if (!(0 <= start && start < end && end <= 1440)) return false;
    if (!(start > now)) return false;
    if (end - start > 120) return false;
    if (blocked) return false;
    for (const b of bookings) {
      if (start < b.end && end > b.start) return false;
    }
    
    return true;
  }

I’m starting SIS #04 from my Week 08 TypeScript app. Baseline commit d0936c0 passed all 32 Vitest tests.

Repository map:
app/src/App.tsx — Two-room catalog, form state, room selection, time parsing, and feedback.
app/src/booking.ts — canBook() implements the booking rules.
app/src/booking.test.ts — 32 booking rule and data-preservation tests.
app/src/index.css — Page and feedback styles.

Preserve AC1–AC6:
AC1: Enforce 0 ≤ start < end ≤ 1440 and start > now.
AC2: Allow at most 120 minutes.
AC3: Reject blocked rooms.
AC4: Reject overlaps and allow touching endpoints.
AC5: Return Available or Unavailable without changing booking data.
AC6: Give clear, responsive feedback on desktop and mobile.

Add a fictional catalog of at least four rooms. Each room needs an ID, name, capacity, equipment list, blocked status, and its own bookings.
F1: Room capacity must meet or exceed the requested attendee count.
F2: A room must have all selected equipment.
F3: A blocked room cannot be available. Check the selected room's own blocked status and bookings.
F4: Show a clear message when no rooms match.
F5: Refresh the availability feedback when the selected room changes.

Use fictional data and a fixed current time. No login, payments, live APIs, or database. The required modules are rooms.ts, filter.ts with filterRooms(), and booking.ts with canBook() and checkRoom().

Review the baseline files I supplied. Identify at least three maintainability risks with exact file or function references and code evidence. Propose a prioritized plan of small changes, with a test or verification step for each. Give me analysis and a plan only. Do not write code yet.
```

## 3. Codebase analysis (Task 1)

### 3.1 Maintainability risks

<!-- At least three, found in YOUR starting code. "Where" names a file or a function(),
     e.g. src/App.tsx, check(). Evidence is what you saw, not what the assistant said.
     Priority: High / Medium / Low. -->

| # | Risk | Where (file / function) | Evidence | Priority |
| --- | --- | --- | --- | --- |
| 1 | 	The blocked status used for availability is shared across room selections | src/App.tsx, check() | Each room defines blocked, but check() passes the checkbox state to canBook. Switching rooms preserves that checkbox state. | High |
| 2 | 	Switching rooms can leave feedback from the previous room visible | src/App.tsx, room selector onChange | The handler only calls setRoomId. The existing result and error stay visible until another check. | High |
| 3 | The catalog is coupled to the page and assumes a valid selection | src/App.tsx, ROOMS and room lookup | The two-room catalog and its type live in the component file. ROOMS.find(...)! assumes a match, which will be unsafe when filtering can leave zero selectable rooms | Medium |

### 3.2 Improvement plan — before editing

<!-- Numbered, in the order you will do it, smallest safe step first. Written BEFORE you change
     code: the commit that adds this section comes before the commit that changes app/src. -->

1. Move the two existing room entries into rooms.ts, add capacity and equipment, and expand the catalog to at least four rooms. Run the full existing suite after the change.
2. Write failing tests for checkRoom, including a blocked room and two rooms with different bookings. Implement checkRoom by delegating to the existing canBook, then rerun the full suite.
3. Write failing tests for the capacity boundary, all-required-equipment matching, and zero matches. Implement filterRooms and rerun the full suite.
4. Connect the filters and room selector to the page. Clear stale feedback when the selection changes, show an empty state when no rooms match, and verify both desktop and narrow layouts.

### 3.3 One AI suggestion I rejected or modified

| Suggestion (as the assistant made it) | Decision | Why — with the AC, F-rule, test or file behind it |
| --- | --- | --- |
|Move the two existing room entries into `rooms.ts`, add capacity and equipment, and expand the catalog to at least four rooms. | Modified | I will first move the existing catalog from `App.tsx` to `rooms.ts` and rerun the 32 baseline tests. Then I will add capacity, equipment, and two new rooms. Keeping these changes separate makes it easier to tell whether a regression came from the refactor or from the catalog expansion. |

## 4. Feature extension (Task 2)

### 4.1 What I added

<!-- Short: the catalog (how many rooms, which equipment), how the filter is chosen on the page,
     what the empty state says, what happens to an old result when the room changes. -->

(write here)

### 4.2 Demonstration

<!-- One row per screenshot in evidence/. Say what is on it: the filter values, the rooms shown,
     the room selected, the times entered and the result. -->

| Screenshot | What it shows |
| --- | --- |
| `evidence/filter-match.png` | (write here) |
| `evidence/filter-empty.png` | (write here) |
| `evidence/switch-a.png` | (write here) |
| `evidence/switch-b.png` | (write here) |
| `evidence/narrow.png` | (write here) |

## 5. Refactoring (Task 3)

<!-- The diagrams are diagrams/before.puml and diagrams/after.puml (README section 8). -->

### 5.1 Module responsibilities after

| Module or component | Responsibility |
| --- | --- |
| `src/rooms.ts` | (write here) |
| `src/booking.ts` | (write here) |
| `src/filter.ts` | (write here) |
| (write here) | (write here) |

### 5.2 Design decisions

<!-- At least two. The alternative is what you could have done instead (often what the assistant
     proposed). The why names an AC, an F-rule, a test or a risk from 3.1. -->

| Decision | Alternative I did not take | Why |
| --- | --- | --- |
| (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) |

### 5.3 Duplication removed

<!-- One row per duplicated location that is gone. Count what you can point at, nothing else. -->

| Before (file / function, what was repeated) | After (where it lives now) |
| --- | --- |
| (write here) | (write here) |

## 6. Automated tests (Task 4)

### 6.1 Test plan

<!-- One row per required ID. A test may carry several IDs in its title,
     e.g. test('T06 B1 AC2: exactly 120 minutes is available', …) covers B1 and AC2. -->

| ID | Test title (as in the file) | Input → expected |
| --- | --- | --- |
| AC1 | (write here) | (write here) |
| AC2 | (write here) | (write here) |
| AC3 | (write here) | (write here) |
| AC4 | (write here) | (write here) |
| AC5 | (write here) | (write here) |
| F1 | (write here) | (write here) |
| F2 | (write here) | (write here) |
| F3 | (write here) | (write here) |
| F4 | (write here) | (write here) |
| F5 | (write here) | (write here) |
| B1 | (write here) | (write here) |
| B2 | (write here) | (write here) |
| B3 | (write here) | (write here) |
| B4 | (write here) | (write here) |
| B5 | (write here) | (write here) |
| B6 | (write here) | (write here) |
| INT | (write here) | (write here) |

### 6.2 Commands

<!-- The commands exactly as you typed them, from app/. -->

```text
(paste here)
```

### 6.3 Final run

<!-- The REAL output of the full run on your final code. Every test passes, and the number of
     tests equals what your test files hold (R2). -->

```text
(paste here)
```

## 7. Quality evaluation (Task 5)

<!-- Original = your baseline commit. Final = what you submit. "How I obtained it" says how you
     measured, so someone else could repeat it: "1.1 and 6.3 runs", "counted in 5.3",
     "git ls-files app/src". Do not invent a metric. Tests: write passed/total, e.g. 19/19. -->

| Measure | Original | Final | How I obtained it |
| --- | --- | --- | --- |
| Automated tests passed / total | (write here) | (write here) | (write here) |
| Duplicated logic locations removed | (write here) | (write here) | (write here) |
| Code structure: modules and their responsibilities | (write here) | (write here) | (write here) |
| Remaining limitation | (write here) | (write here) | (write here) |

## 8. AI evidence appendix

<!-- At least three exchanges, one ### 8.N block each: the analysis (Task 1), the plan, and at
     least one implementation, refactoring or test exchange. Copy the block for more.
     The prompt as you sent it; the output may be cut to the part you used, with "[…]" where
     you cut. Verified by: the test, run, file or check that confirmed it — not "it looked right". -->

### 8.1 Exchange 1

**Tool and model:** (write here)
**Date:** (write here)
**Purpose:** (write here)

**Prompt:**

```text
(paste here)
```

**Output used:**

```text
(paste here)
```

**Problems found:** (write here)
**Changes made:** (write here)
**Verified by:** (write here)

### 8.2 Exchange 2

**Tool and model:** (write here)
**Date:** (write here)
**Purpose:** (write here)

**Prompt:**

```text
(paste here)
```

**Output used:**

```text
(paste here)
```

**Problems found:** (write here)
**Changes made:** (write here)
**Verified by:** (write here)

### 8.3 Exchange 3

**Tool and model:** (write here)
**Date:** (write here)
**Purpose:** (write here)

**Prompt:**

```text
(paste here)
```

**Output used:**

```text
(paste here)
```

**Problems found:** (write here)
**Changes made:** (write here)
**Verified by:** (write here)

## 9. Checker results and known fails

<!-- Every check still FAIL or ERROR in your last run of python tests/check_sis.py, and why.
     The same IDs go in submission.yml known_fails. None left? Write: none. -->

| Check | Why it still fails |
| --- | --- |
| (write here) | (write here) |

## 10. AI reflection (Task 6)

<!-- 200–300 words, your own words, no assistant. Answer all five:
     What context did you provide the AI assistant? Which generated suggestions were useful or
     incorrect? What did you personally verify? How did tests influence your engineering
     decisions? What would you improve next? -->

(write here)
