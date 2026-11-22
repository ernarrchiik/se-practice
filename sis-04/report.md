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
| Baseline commit | d0936c0 |
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

I expanded the catalog to four fictional rooms with capacities from 8 to 40 seats. The equipment options are whiteboard, projector, and video conferencing. The page shows rooms that meet the attendee count and have every selected item. If no room matches, it shows an empty-state message and disables the availability check. Changing rooms clears the previous result, and the next check uses the newly selected room’s bookings and blocked status.

### 4.2 Demonstration

<!-- One row per screenshot in evidence/. Say what is on it: the filter values, the rooms shown,
     the room selected, the times entered and the result. -->

| Screenshot | What it shows |
| --- | --- |
| `evidence/filter-match.png` | With 24 attendees and projector selected, only B-204 and C-301 appear in the room list. |
| `evidence/filter-empty.png` | With 41 attendees and projector selected, the page says no rooms match and disables the availability check. |
| `evidence/switch-a.png` | With current time 09:00, A-101 is unavailable from 10:00 to 11:00 because it already has a booking for that interval. |
| `evidence/switch-b.png` | With the same current time and requested interval, B-204 is available. |
| `evidence/narrow.png` | The page in a portrait phone viewport, showing the filter controls and the availability result. |

## 5. Refactoring (Task 3)

<!-- The diagrams are diagrams/before.puml and diagrams/after.puml (README section 8). -->

### 5.1 Module responsibilities after

| Module or component | Responsibility |
| --- | --- |
| `src/rooms.ts` | Defines the `Room` type and holds the four-room catalog, including capacity, equipment, blocked status, and bookings. |
| `src/booking.ts` | `canBook()` enforces the original booking rules. `checkRoom()` looks up the selected room and passes its own bookings and blocked status to `canBook()`. |
| `src/filter.ts` | `filterRooms()` returns rooms that meet the attendee count and have all selected equipment. |
| `src/App.tsx` | Handles form inputs and room selection, calls the filtering and booking functions, and displays the result or empty state. |


### 5.2 Design decisions

<!-- At least two. The alternative is what you could have done instead (often what the assistant
     proposed). The why names an AC, an F-rule, a test or a risk from 3.1. -->

| Decision | Alternative I did not take | Why |
| --- | --- | --- |
| Keep blocked rooms visible with a blocked label when they match the filters. | Hide blocked rooms from the matching list. | Users can see which rooms meet their capacity and equipment needs, while `checkRoom()` still rejects blocked rooms as required by F3. |
| Clear the availability result when the selected room changes. | Keep showing the previous result until the next check. | F5 requires feedback to follow the selected room. The same 10:00–11:00 interval gives different results for A-101 and B-204. |

### 5.3 Duplication removed

<!-- One row per duplicated location that is gone. Count what you can point at, nothing else. -->

| Before (file / function, what was repeated) | After (where it lives now) |
| --- | --- |
| `src/booking.ts` declared the same request fields in `BookingRequest` and again in the inline parameter type of `canBook()`. | `canBook()` now uses the `BookingRequest` type directly. |

## 6. Automated tests (Task 4)

### 6.1 Test plan

<!-- One row per required ID. A test may carry several IDs in its title,
     e.g. test('T06 B1 AC2: exactly 120 minutes is available', …) covers B1 and AC2. -->

| ID | Test title (as in the file) | Input → expected |
| --- | --- | --- |
| AC1 | T02: AC1 rejects a start equal to now | Start 540, end 570, now 540 → `false`. |
| AC2 | B1 AC2: exactly 120 minutes is available | 720–840, now 540, room free → `true`. |
| AC3 | T13: AC3 rejects an otherwise valid request when blocked | An otherwise valid request with `blocked: true` → `false`. |
| AC4 | B3 AC4: touching an existing booking is available | 660–720 touches an existing booking at 660 → `true`. |
| AC5 | AC5: an available check preserves the original bookings | Check 660–720 with an existing 600–660 booking → `true`, and the bookings array contents stay the same. |
| F1 | F1: rooms at the requested capacity or above are included | 24 attendees, no required equipment → B-204 and C-301. |
| F2 | F2: a room must have all requested equipment | 1 attendee, whiteboard and projector required → only B-204. |
| F3 | F3: a blocked room is unavailable even with no bookings | Check 600–660 in a blocked room with no bookings → `false`. |
| F4 | F4: the filter returns an empty list when no room matches | 41 attendees and a maximum room capacity of 40 → `[]`. |
| F5 | F5: switching rooms checks the selected room’s bookings | Check 600–660 in a busy room, then a free room → `false`, then `true`. |
| B1 | B1 AC2: exactly 120 minutes is available | 720–840, duration 120 minutes → `true`. |
| B2 | B2 AC2: 121 minutes is unavailable | 720–841, duration 121 minutes → `false`. |
| B3 | B3 AC4: touching an existing booking is available | Existing 600–660, requested 660–720 → `true`. |
| B4 | B4 AC4: overlapping an existing booking is unavailable | Existing 600–660, requested 630–690 → `false`. |
| B5 | B5: a room with exactly enough seats is included | 24 attendees → the 24-seat B-204 is included. |
| B6 | B6: a room one seat below the requirement is excluded | 24 attendees → the 23-seat A-101 test fixture is excluded. |
| INT | INT: check availability for a room returned by the filter | Filter for 24 attendees, whiteboard, and projector → B-204. Check 600–660 in that room → `true`. |

### 6.2 Commands

<!-- The commands exactly as you typed them, from app/. -->

```text
npx vitest run src/filter.test.ts
npx vitest run
NO_COLOR=1 npx vitest run --reporter=verbose > /tmp/sis-04-final-vitest.txt
```

### 6.3 Final run

<!-- The REAL output of the full run on your final code. Every test passes, and the number of
     tests equals what your test files hold (R2). -->

```text

 RUN  v3.2.4 /Users/ernarberenbaj/Documents/se-practice/sis-04/app

 ✓ src/checkRoom.test.ts > F5: switching rooms checks the selected room’s bookings 1ms
 ✓ src/checkRoom.test.ts > F3: a blocked room is unavailable even with no bookings 0ms
 ✓ src/checkRoom.test.ts > checkRoom rejects an unknown room ID 0ms
 ✓ src/booking-boundaries.test.ts > B1 AC2: exactly 120 minutes is available 1ms
 ✓ src/booking-boundaries.test.ts > B2 AC2: 121 minutes is unavailable 0ms
 ✓ src/booking-boundaries.test.ts > B3 AC4: touching an existing booking is available 0ms
 ✓ src/booking-boundaries.test.ts > B4 AC4: overlapping an existing booking is unavailable 0ms
 ✓ src/booking-boundaries.test.ts > AC5: an available check preserves the original bookings 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T01 B3: AC4 allows touching after an existing booking 1ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T02: AC1 rejects a start equal to now 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T03: AC1 rejects zero duration 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T04: AC1 rejects a reversed interval 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T05: AC1 rejects an end past 1440 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T06 B1: AC2 allows exactly 120 minutes 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T07 B2: AC2 rejects 121 minutes 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T08: AC4 allows touching before an existing booking 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T09 B4: AC4 rejects partial overlap 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T10: AC4 rejects a request containing an existing booking 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T11: AC4 rejects a request inside an existing booking 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T12: AC4 rejects an identical interval 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T13: AC3 rejects an otherwise valid request when blocked 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T14: AC4 allows a valid request with no existing bookings 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > X1: AC1 allows an end exactly at 1440 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > X2: AC4 allows touching both neighbouring bookings 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B01: AC1 rejects a negative start 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B02: AC1 rejects a start before now 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B03: AC1 allows a start one minute after now 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B04: AC1 allows start zero with an earlier supplied now 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B05: AC4 rejects overlap in the second unsorted booking 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B06: AC2 allows 119 minutes 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B07: AC1 allows a one-minute duration 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B08: AC4 rejects overlap with the first minute of a booking 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B09: AC4 rejects overlap with the last minute of a booking 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B10: AC4 allows a request separated before a booking 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B11: AC4 allows a request separated after a booking 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B12: AC3 rejects a blocked room with no existing bookings 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B13: AC1 respects a different supplied current time 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > AC5: repeated available checks preserve unsorted booking data 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > BUG-A: allows a one-minute gap between two unsorted bookings 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > BUG-B: an available request preserves the existing bookings 0ms
 ✓ src/filter.test.ts > F1: rooms at the requested capacity or above are included 1ms
 ✓ src/filter.test.ts > F2: a room must have all requested equipment 0ms
 ✓ src/filter.test.ts > F4: the filter returns an empty list when no room matches 0ms
 ✓ src/filter.test.ts > B5: a room with exactly enough seats is included 0ms
 ✓ src/filter.test.ts > B6: a room one seat below the requirement is excluded 0ms
 ✓ src/filter.test.ts > INT: check availability for a room returned by the filter 0ms

 Test Files  4 passed (4)
      Tests  46 passed (46)
   Start at  21:05:28
   Duration  307ms (transform 105ms, setup 0ms, collect 153ms, tests 10ms, environment 0ms, prepare 228ms)


```

## 7. Quality evaluation (Task 5)

<!-- Original = your baseline commit. Final = what you submit. "How I obtained it" says how you
     measured, so someone else could repeat it: "1.1 and 6.3 runs", "counted in 5.3",
     "git ls-files app/src". Do not invent a metric. Tests: write passed/total, e.g. 19/19. -->

| Measure | Original | Final | How I obtained it |
| --- | --- | --- | --- |
| Automated tests passed / total | 32/32 | 46/46 | Compared the `Tests` lines from the baseline run in §1.1 and the final run in §6.3. |
| Duplicated logic locations removed | The booking request fields were declared twice in `booking.ts`. | 1 duplicate definition removed. `canBook()` now uses the existing `BookingRequest` type. | Compared `booking.ts` at baseline commit `d0936c0` with the final version. |
| Code structure: modules and their responsibilities | `App.tsx` held the room catalog and UI. `booking.ts` held the availability rules. | `rooms.ts` holds the catalog, `filter.ts` handles capacity and equipment matching, `booking.ts` checks availability, and `App.tsx` handles the UI. | Compared the source files and their imports with the before and after diagrams. |
| Remaining limitation | Room details and existing bookings were fixed demo data in `App.tsx`. | Room details and existing bookings are fixed demo data in `rooms.ts`. | Inspected the catalog in the baseline `App.tsx` and the final `rooms.ts`. |

## 8. AI evidence appendix

<!-- At least three exchanges, one ### 8.N block each: the analysis (Task 1), the plan, and at
     least one implementation, refactoring or test exchange. Copy the block for more.
     The prompt as you sent it; the output may be cut to the part you used, with "[…]" where
     you cut. Verified by: the test, run, file or check that confirmed it — not "it looked right". -->

### 8.1 Exchange 1

**Tool and model:** ChatGPT, GPT-6.2 Sol
**Date:** 2026-11-22
**Purpose:** Identify maintainability risks in the Week 08 baseline before editing the app

**Prompt:**

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

**Output used:**

```text
The supplied canBook() already implements AC1–AC5. Keep it as the booking-rule engine for SIS #04. The main changes are to move room data out of App.tsx, add capacity and equipment filtering, and make availability feedback follow the selected room. Use d0936c0 and its reported 32 passing Vitest tests as the regression baseline. The test and CSS files were listed but their contents weren’t supplied, so AC6 still needs browser verification.
Maintainability risks
Priority	Reference and code evidence	Risk
High	app/src/App.tsx → check() passes the checkbox state blocked to canBook(), even though each room already has room.blocked.	A room marked blocked in the catalog could appear available when the checkbox is unchecked.
High	app/src/App.tsx → the room selector’s onChange calls only setRoomId(e.target.value). result and error are stored separately.	The feedback can still describe the previous room after the selected room and its displayed bookings have changed.
High	app/src/App.tsx → ROOMS.find(r => r.id === roomId)! assumes the selected ID resolves to a room.	Once filtering is added, the selected ID can refer to a room outside the matching list. An empty match list also needs an explicit state before any room’s bookings can be read.
Medium	app/src/App.tsx owns the ROOMS catalog. app/src/booking.ts declares BookingRequest but repeats its shape inline in canBook(), and both files describe booking intervals.	Catalog data, UI behavior, and shared types can drift as fields and new entry points are added.
Medium	app/src/App.tsx → check() sets an error when s < e fails, then continues to canBook() and setResult(ok).	An invalid time range can show both a validation error and “Unavailable,” making it harder to distinguish an input mistake from a scheduling conflict.


Prioritized implementation plan
Step	Small change	Test or verification
1	Create rooms.ts with at least four fictional rooms. Give each a unique ID, name, capacity, equipment list, blocked flag, and its own bookings array. Include a blocked room whose schedule would otherwise allow a booking.	Verify four or more unique IDs, all required fields, and distinct booking arrays. Rerun the 32 baseline tests after moving the catalog.
2	Add checkRoom() in booking.ts. Have it pass the selected room’s blocked flag and bookings to canBook(). Reuse the existing BookingRequest type for canBook() and preserve its rules. Replace the manual blocked checkbox with the room’s catalog status.	Verify that the same time slot can be available in one room and rejected in another because of a booking conflict. Verify that a blocked room with an empty schedule is unavailable and that checks leave bookings unchanged.
3	Add filterRooms() in filter.ts for F1–F2. A room matches when its capacity is at least the attendee count and it has every selected equipment item. Keep blocked status and scheduling in checkRoom() so a room can match the search and still show “Unavailable.”	Test capacity exactly at the threshold, capacity one seat short, a room missing one of two selected items, no equipment selected, and zero matches.
4	Wire the attendee and equipment filters into App.tsx. Keep the selected room if it still matches, otherwise select the first match. If there are zero matches, show “No rooms match your filters” and disable the availability check.	Filter out the selected room and verify the replacement room’s bookings appear. Apply filters that match nothing, then relax them and verify that room selection and checking recover.
5	Use the baseline default of 09:00 as the fixed current time. After the first Check, refresh availability when the selected room changes, including when filters pick a replacement. For missing or invalid times, show the validation message and stop the check.	Check an available room, switch to a matching blocked or conflicting room, and verify the feedback changes immediately. Verify that a 09:00 start is rejected and that an invalid range shows only the validation message. Check the form, availability feedback, and no-match message at desktop and 375 px widths, then rerun the full suite.
```

**Problems found:** The availability check used a shared blocked checkbox, the room selector could leave stale feedback visible, and the room catalog was defined in `App.tsx`.  
**Changes made:** I recorded those risks in §3.1 and used them to prioritize the implementation plan.  
**Verified by:** I checked `check()`, the room selector’s `onChange` handler, and the `ROOMS` declaration in `App.tsx` at baseline commit `d0936c0`.


### 8.2 Exchange 2

**Tool and model:** ChatGPT, GPT-6.2 Sol
**Date:** 2026-11-22  
**Purpose:**  Review the implementation plan and compare combining versus splitting the catalog changes.


**Prompt:**

```text
Review my SIS #04 implementation plan against the Week 08 baseline. My plan was to extract the existing room catalog from App.tsx, expand it to four rooms, add checkRoom(), implement capacity and equipment filtering, and connect everything to the UI. I originally considered combining the catalog extraction and expansion. Explain the trade-off between doing them together and splitting them into separate commits. Give me a short ordered plan and one verification step for each change. Do not write code.
```

**Output used:**

```text
I’d split catalog extraction and expansion into two commits. The Week 08 baseline has two rooms defined in App.tsx. Moving them unchanged to rooms.ts gives you a commit you can verify against the baseline. The next commit then shows exactly what changed in the catalog. Combining them saves a commit and a test run, but if the room picker or booking display changes unexpectedly, you’ll have to check both the move and the new data.
Step	Change	Verification
1	Extract the two existing rooms into rooms.ts. Preserve their IDs, order, blocked flags, and bookings.	Open the app and confirm A-101 still shows 10:00–11:00 and B-204 still shows no bookings.
2	Expand the catalog to four fictional rooms. Give each a unique ID, name, capacity, equipment list, blocked status, and its own bookings array.	Check that all four entries have the required fields, unique IDs, and separate booking arrays.
3	Add checkRoom() in booking.ts. Delegate to canBook() using the selected room’s own blocked flag and bookings.	Run the 32 baseline tests plus checkRoom() cases that distinguish an open room, a blocked room, and a room with a booking conflict for the same slot.
4	Add filterRooms() in filter.ts. Require enough seats and every selected equipment item.	Test a search where a room with exactly enough seats qualifies, while rooms one seat short or missing one selected item are excluded.
5	Connect the filters and checkRoom() to the UI. Use 09:00 as the fixed current time, refresh feedback on room changes after the first check, and show a no-match message.	At desktop and 375 px widths, check an available room, switch to a blocked room and confirm the result updates immediately, then apply filters that yield zero matches.
```

**Problems found:** Combining the changes makes it harder to tell whether a regression came from moving the catalog or changing its contents. The assistant also suggested updating the result immediately on a room switch. My app clears the old result and checks the new room when the user presses Check availability.  
**Changes made:** I recorded the proposed split in §3.3. The actual catalog commit combined extraction and expansion, so I recorded that difference here.  
**Verified by:** The Git history records the combined catalog commit. `switch-a.png` and `switch-b.png` show the different results for the same time slot.

### 8.3 Exchange 3

**Tool and model:** ChatGPT, GPT-6.2 Sol
**Date:** 2026-11-22  
**Purpose:** Review how to verify the booking boundary tests, data preservation, and filter-to-booking integration.


**Prompt:**

```text
Review the automated tests for my SIS #04 Smart Campus app. The assignment requires fixed room fixtures, direct coverage of B1–B6, and an integration test that calls filterRooms() and then checkRoom(). My first checker run flagged AC5 and B1–B4 because it did not detect the required assertions in the test bodies. I added booking-boundaries.test.ts with direct canBook() calls and assertions. Review the attached test files and identify which assertions cover AC5, B1–B6, and INT. Flag any missing coverage and explain what I can verify with Vitest and the assignment checker.
```

**Output used:**

```text
I couldn’t locate the attached test files, and the sis-04 branch wasn’t available in the GitHub repository. I can review the verification approach, but I can’t identify the exact assertions or mark any requirement as covered from the files available.
Requirement	Assertion to look for in the test body
AC5	Assert the exact boolean returned by canBook() and compare bookings after the call with an independent copy of its original contents using toEqual. Use a request expected to return true so the test catches a booking accidentally added on success.
B1–B4	For each case, check that the test body directly calls canBook() with the required boundary inputs and asserts the expected value with toBe(true) or toBe(false). Your new booking-boundaries.test.ts addresses the structure the checker flagged. Whether it covers each case depends on the inputs and expected results.
B5–B6	Match each test’s inputs and expected result to the exact rubric wording. Keep the other inputs valid so a false result can only come from the rule being tested.
INT	In one test, call filterRooms() with fixed room fixtures, assert which room IDs match, then pass a room from that returned list to checkRoom() and assert its availability. Using a separate fixture for the second call leaves the connection between the functions untested.


Vitest verifies that the assertions execute and pass. From sis-04/app, run npx vitest run --reporter=verbose and confirm the output lists booking-boundaries.test.ts and the integration test, with no failures or skips. The assignment checker verifies that it recognizes the required cases in the submitted test bodies. Rerun it and check the individual results for AC5, B1–B6, and INT, especially the previously flagged AC5 and B1–B4.

Reattach the .test.ts files and the checker output or B1–B6 rubric so I can map each requirement to a specific assertion and flag any actual gaps.
```

**Problems found:** The assistant could not access the test files in that chat. My first local checker run had flagged AC5 and B1–B4.  
**Changes made:** Before this follow-up, I added direct booking assertions in `booking-boundaries.test.ts`. I used the reply as a checklist for reviewing the local tests.  
**Verified by:** Commit `c44d583` records the direct booking assertions. The Vitest output in §6.3 records the full test run. The checker results belong in §9.

## 9. Checker results and known fails

<!-- Every check still FAIL or ERROR in your last run of python tests/check_sis.py, and why.
     The same IDs go in submission.yml known_fails. None left? Write: none. -->

| Check | Why it still fails |
| --- | --- |
| none | All checks passed in the final run. |

## 10. AI reflection (Task 6)

<!-- 200–300 words, your own words, no assistant. Answer all five:
     What context did you provide the AI assistant? Which generated suggestions were useful or
     incorrect? What did you personally verify? How did tests influence your engineering
     decisions? What would you improve next? -->

I gave ChatGPT the App.tsx and booking.ts files from my Week 08 project, along with the baseline result of 32 passing tests. I explained the existing booking rules and the new requirements for a four-room catalog, capacity and equipment filters, and availability based on the selected room’s own bookings. I asked for a plan that would let me make and verify small changes.
The most useful suggestion was to separate room data, filtering, and booking rules into their own files. That made it easier to see where each rule belonged. One earlier suggestion was to add the B1–B4 labels to existing test titles. The checker still flagged those cases because it expected direct booking calls and assertions in the test bodies. I added explicit tests for those boundaries and a test that compares the bookings array with a copy after a successful availability check. The next checker run passed S4 and S6.
I verified that all 46 tests passed. I also checked the same 10:00–11:00 slot in two rooms. A-101 was unavailable because it already had a booking, while B-204 was available. The tests helped me verify the booking rules, and the screenshots showed how those rules appeared in the interface. Next time, I would commit the catalog extraction separately from the expansion and run the assignment checker earlier. That would make it easier to isolate regressions and spot missing evidence before writing the report.
