# Week 07 — Lab report

**Name:**
**Group:**
**Date:**

Fill in every section. **Do not delete, rename or renumber the headings.** The checker and the
grader find your answers by them. You can add rows to any table, but never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Project I continue (`week-06` = my Week 06 Bolt project, `starter` = the provided starter) | |
| Bolt project link (or `not shared`, and why) | |
| Assistant that generated the tests (tool) | |
| Exact model (with its version, or `not displayed`) | |
| Where I ran the tests (Bolt terminal / my computer / Codespace) | |
| Vitest version (the `RUN  v…` line of a run) | |
| Test command | |

---

## 2. Task 1 — baseline and the booking function

**Before editing:** where did the booking decision live in the project you started from?

| | |
| --- | --- |
| File and function (or "inside the page component") | |
| Its inputs | |
| What it returned | |
| How the page used it | |

**What I changed to extract `canBook`.** Say which file it now lives in, what you moved, and why
the behaviour did not change. Also say which file of the page now calls it. 40 words or more.

<!-- Write below this line -->

---

## 3. Task 2 — the test plan

Default fixture: `now = 540`, `blocked = false`, `bookings = [{ start: 600, end: 660 }]`, fresh
for every test. **The Expected column comes from AC1–AC4, never from the code.** Write the
**reason** for each expected result **before** you send the generation prompt.

| ID | Candidate / changed input | Expected | AC | Reason (in your words) |
| --- | --- | --- | --- | --- |
| T01 | 660–720 (touching after) | true | AC4 |The request starts exactly when the existing booking ends, so there is no overlap |
| T02 | 540–570 (starts now) | false | AC1 |The start equals the current time, but it must be strictly later |
| T03 | 720–720 (zero duration) | false | AC1 |The start and end are equal, but the end must be later than the start |
| T04 | 750–720 (reversed) | false | AC1 |The end is earlier than the start, so the interval is invalid |
| T05 | 1380–1441 (past day end) | false | AC1 |	The end exceeds 1440, the last allowed minute of the day |
| T06 | 720–840 (120 minutes) | true | AC2 |	The duration is exactly 120 minutes, which is allowed |
| T07 | 720–841 (121 minutes) | false | AC2 |The duration is 121 minutes, exceeding the limit by one minute |
| T08 | 570–600 (touching before) | true | AC4 |The request ends exactly when the existing booking starts, so there is no overlap |
| T09 | 630–690 (partial overlap) | false | AC4 |The request overlaps the existing booking from 630 to 660 |
| T10 | 570–690 (contains booking) | false | AC4 |The request includes the entire existing booking |
| T11 | 615–645 (inside booking) | false | AC4 |The request falls entirely inside the existing booking |
| T12 | 600–660 (identical interval) | false | AC4 |The request has the same start and end as the existing booking |
| T13 | 660–720, blocked = true | false | AC3 |The room is blocked, so even an otherwise valid request must be rejected |
| T14 | 630–690, bookings = [] | true | AC4 |There are no existing bookings to overlap, and the other booking rules are satisfied |
| AC5 | an Available request — the bookings after the call equal the bookings before | true, data unchanged | AC5 |	Checking availability must not add, remove or modify existing bookings |
| X1 |1380–1440 |true |AC1 |Ending exactly at 1440 is allowed, and this 60-minute request satisfies the other rules |
| X2 |660–720; bookings = [{start:600,end:660},{start:720,end:780}] |true |AC4 |The request fits between two bookings, touching both without overlapping either |

X1 and X2 are **your own two cases**: a boundary or a state that T01–T14 do not reach. Fill all
five columns.

---

## 4. Task 3 — the generation prompt and the first suite

**The prompt exactly as I sent it.** Use the deck's prompt with `[our test framework]` replaced by
`Vitest`, followed by the case table from section 3:

```text
Generate tests for the existing booking function using Vitest. Use AC1–AC6 and the reviewed case table below.

Import the real function used by the page. Keep its code unchanged. Use fixed time and fresh fixtures. Assert exact decisions and unchanged booking data.

Return the test file, run command, and AC mapping. Flag unclear requirements. We will run the tests ourselves.

Assistant clarification before generation:
Please paste or attach:

The existing booking function and its file path.
The page’s import and call to that function, so the tests target the real implementation.
The reviewed case table—it wasn’t included in your message.
The exact AC1–AC6 text, if revised.
The workspace contains no project files, so I can’t verify the import, function signature, or exact return values yet.

I’ll return the Vitest test file, run command, and AC mapping, using fixed time and fresh fixtures, with assertions for exact decisions and unchanged booking data. I’ll keep the function unchanged and leave test execution to you.

One scope issue to clarify: if AC5–AC6 include visible feedback and mobile layout, function tests alone cannot verify those UI requirements.
Follow-up message supplying the missing materials:
Here are the missing materials for the previous request.
The function is in week-07/app/src/booking.ts.
Save the generated test as week-07/app/src/booking.test.ts
and import canBook from './booking'.
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
  
  export function canBook({
    start,
    end,
    now,
    blocked,
    bookings,
  }: BookingRequest): boolean {
    let ok = true;
  
    if (!(0 <= start && start < end && end <= 1440)) ok = false;
    else if (!(start > now)) ok = false;
    else if (end - start > 120) ok = false;
    else if (blocked) ok = false;
    else {
      for (const b of bookings) {
        if (start < b.end && end > b.start) {
          ok = false;
          break;
        }
      }
    }
  
    return ok;
  }
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
const fmt = (m: number) => ${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')};

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
        <p className={result ${result ? 'available' : 'unavailable'}}>{result ? 'Available' : 'Unavailable'}</p>
      )}
      <h2>Existing bookings</h2>
      <ul>{room.bookings.length ? room.bookings.map((b, i) => <li key={i}>{fmt(b.start)}–{fmt(b.end)}</li>) : <li>none</li>}</ul>
    </main>
  );
}

| ID | Candidate / changed input | Expected | AC | Reason (in your words) |
| --- | --- | --- | --- | --- |
| T01 | 660–720 (touching after) | true | AC4 |The request starts exactly when the existing booking ends, so there is no overlap |
| T02 | 540–570 (starts now) | false | AC1 |The start equals the current time, but it must be strictly later |
| T03 | 720–720 (zero duration) | false | AC1 |The start and end are equal, but the end must be later than the start |
| T04 | 750–720 (reversed) | false | AC1 |The end is earlier than the start, so the interval is invalid |
| T05 | 1380–1441 (past day end) | false | AC1 |	The end exceeds 1440, the last allowed minute of the day |
| T06 | 720–840 (120 minutes) | true | AC2 |	The duration is exactly 120 minutes, which is allowed |
| T07 | 720–841 (121 minutes) | false | AC2 |The duration is 121 minutes, exceeding the limit by one minute |
| T08 | 570–600 (touching before) | true | AC4 |The request ends exactly when the existing booking starts, so there is no overlap |
| T09 | 630–690 (partial overlap) | false | AC4 |The request overlaps the existing booking from 630 to 660 |
| T10 | 570–690 (contains booking) | false | AC4 |The request includes the entire existing booking |
| T11 | 615–645 (inside booking) | false | AC4 |The request falls entirely inside the existing booking |
| T12 | 600–660 (identical interval) | false | AC4 |The request has the same start and end as the existing booking |
| T13 | 660–720, blocked = true | false | AC3 |The room is blocked, so even an otherwise valid request must be rejected |
| T14 | 630–690, bookings = [] | true | AC4 |There are no existing bookings to overlap, and the other booking rules are satisfied |
| AC5 | an Available request — the bookings after the call equal the bookings before | true, data unchanged | AC5 |	Checking availability must not add, remove or modify existing bookings |
| X1 |1380–1440 |true |AC1 |Ending exactly at 1440 is allowed, and this 60-minute request satisfies the other rules |
| X2 |660–720; bookings = [{start:600,end:660},{start:720,end:780}] |true |AC4 |The request fits between two bookings, touching both without overlapping either |
AC1: Accept a candidate interval only when 0 ≤ start < end ≤ 1440 and start is after the supplied current time.
AC2: Reject a booking longer than 120 minutes.
AC3: Reject the request when the selected room is blocked.
AC4: Reject any interval that overlaps an existing booking; touching endpoints are allowed.
AC5: Show a clear Available / Unavailable decision without changing the existing booking data.
AC6: The page remains usable at desktop and narrow/mobile width and gives understandable validation feedback.
```

**The assistant's answer: run command, AC mapping and any unclear requirements it flagged,
pasted unedited.** Its test file goes to `suites/first/` and is not pasted here:

```text
Created booking.test.ts with **22 tests**. It imports the real named export `{ canBook }` from `'./booking'`, uses fixed supplied time and fresh fixtures, and checks exact booleans and unchanged booking data. The function was not modified. Tests were not run.

Run from your repository root:
cd week-07/app
npx vitest run src/booking.test.ts --reporter=verbose

| AC  | Coverage                                                                                  |
| --- | ----------------------------------------------------------------------------------------- |
| AC1 | T02–T05, X1, B01–B04: interval bounds, order and strict future start                      |
| AC2 | T06–T07: exactly 120 and 121 minutes                                                      |
| AC3 | T13: blocked room                                                                         |
| AC4 | T01, T08–T12, T14, X2, B05: touching, overlaps, empty and multiple bookings               |
| AC5 | Exact boolean and unchanged booking values/order in every case; repeated available checks |
| AC6 | Requires page-level validation and layout checks                                          |

Requirements to clarify:

- **AC5 labels:** function tests verify booleans; rendering “Available / Unavailable” needs a page test.
- **AC6:** understandable feedback and mobile usability need UI checks, including an agreed narrow width.
- **Input domain:** integer-only minutes, invalid existing intervals, and bounds for `now` are unspecified. B01/B04 use negative `now` to isolate the start boundary under the literal supplied-time rule.
```

The first suite was saved to `suites/first/` **before** I changed anything in it: yes 

---

## 5. Task 4 — review of the first suite

Review it **before** you run it. Look at the imports, the expected values, isolation, duplicates
and skipped tests. Make one row per decision. At least **two** rows, and each one names the kind of
weakness (the deck's table: *no exception occurred* · *expected = current output* · *only valid
requests* · *mocked booking function*, or your own) and the AC that decides it.

| # | Test or part of the suite | What is weak or wrong | Decision: accept / revise / reject | AC or reason |
| --- | --- | --- | --- | --- |
| 1 | | | accept / revise / reject | |
| 2 | | | accept / revise / reject | |

---

## 6. Task 5 — running, diagnosing, improving

### 6.1 The first run

The **real** terminal output of the first run of the first suite, pasted unedited. Include the
`RUN  v…` line and the `Tests` summary line. A build message or the assistant saying "tests pass"
is not a run.

```text
(paste here)
```

**Each failure, diagnosed** (the deck's table: import/runner error · assertion mismatch · result
changing per run · no tests discovered). Write `none` in the first row if nothing failed.

| Failing test | Observed failure | First check | Test repair or implementation fix? | Action taken |
| --- | --- | --- | --- | --- |
| | | | | |

### 6.2 The improvement prompt

The deck's improvement prompt exactly as sent, followed by the actual output from 6.1. Then
paste the assistant's answer, unedited:

```text
(paste here)
```

### 6.3 The final run

The **real** output of the final suite (`booking.test.*` beside your module), after every
change and after restoring the correct code from section 7. Every test must pass. If a real defect
is still open, leave its test failing and explain it in 9.1.

```text
(paste here)
```

---

## 7. Task 6 — deliberate defects

You need a reviewed, passing suite first. Then introduce **one** defect at a time in your booking
module, leave the tests unchanged, run, record, and **restore** the code. A syntax or import
error does not count as detection.

| Trial | Intentional change | Detected / Survived | Failing test ID(s) | If it survived: why, and what you added |
| --- | --- | --- | --- | --- |
| M1 | Reject duration >= 120 instead of > 120 | Detected / Survived | | |
| M2 | Treat touching endpoints as an overlap | Detected / Survived | | |
| M3 | Remove the blocked-room rejection | Detected / Survived | | |

**The run of each mutant, pasted unedited.** Paste the `Tests` summary line and the failing test
names at least:

```text
(paste here)
```

All three changes reverted, and the full suite run again (section 6.3): yes / no

---

## 8. Task 7 — manual UI checks

Use `now = 09:00` and an existing `10:00–11:00` booking. Do them in the page in a browser. Save a
screenshot of each as `evidence/ui-1.png` … `evidence/ui-5.png`. Take **ui-4 at phone width**
(about 375 px, portrait).

| # | Action | Expected observation | AC | What I observed | Pass / Fail / Not testable |
| --- | --- | --- | --- | --- | --- |
| U1 | Check 11:00–12:00, unblocked | Available, with the fixed sample booking | AC5 | | Pass / Fail / Not testable |
| U2 | Enable blocked, then check again | Unavailable replaces the earlier result | AC3, AC5 | | Pass / Fail / Not testable |
| U3 | Clear a required input and submit | Understandable validation feedback | AC6 | | Pass / Fail / Not testable |
| U4 | Use a narrow (phone) width | Controls and result remain usable | AC6 | | Pass / Fail / Not testable |
| U5 | Repeat the checks on the same data | Existing bookings remain unchanged | AC5 | | Pass / Fail / Not testable |

---

## 9. Comparison and what still fails

### 9.1 Checks I am keeping as FAIL or ERROR

Use the same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| | |

### 9.2 Original and improved suites

| Measure | First suite | Improved suite |
| --- | --- | --- |
| Executed / passed / failed | | |
| Requirements with meaningful tests (AC IDs and gaps) | | |
| Selected mutants detected | | |
| Accepted / revised / rejected tests | | |
| Remaining limitations | | |

### 9.3 What no AC decides

Call your function with `bookings = [{ start: 700, end: 650 }]` (a reversed existing booking)
and a request of 660–720. What does it return? Does any AC say what it should return? (This is
the value you declare in `submission.yml` under `assumptions.invalid_existing_booking`.)

-

---

## 10. Conclusion (120–180 words)

<!-- Answer all three in your own words, without the assistant:
     (a) Which mistake in the FIRST suite would have let a wrong canBook pass, and how did you find it?
     (b) What does your final green run prove, and what does it NOT prove? Use a mutant or a UI check.
     (c) One testing limitation that remains.
     Worthless: "The AI wrote good tests and they all passed."
     Worth everything: "The first suite expected T06 (exactly 120 minutes) to be rejected. That
     contradicts AC2, and it failed on a correct canBook. If I had changed the code to make it
     pass, M1 would have become the real behaviour." -->

<!-- Write your conclusion below this line -->
