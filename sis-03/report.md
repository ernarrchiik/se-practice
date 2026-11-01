# SIS #03 — Report: Smart Campus Room Availability Checker

## 1. Setup and reuse

| Item | Value |
| --- | --- |
| Coding assistant (tool) | ChatGPT |
| Coding assistant model | GPT-6.1 Sol |
| Bolt.new model | not displayed |
| Bolt project link | https://bolt.new/~/sb1-bz1yqymx |
| Language | Python |
| Path | A |
| Python v1 from | fresh |
| Web v1 from | fresh |

Both artifacts were generated fresh for this assignment. Practice #05 and Practice #06 were not reused.

## 2. Baseline — before any new AI exchange

### 2.1 Scope in my own words

**Scope:** So i will make a room availability checker, students can check room availability. It helps students save time on searching space for study.

### 2.2 The acceptance criteria in my own words

| AC | In my own words |
| --- | --- |
| AC1 | Use whole number of minutes between 0 and 1440. And starting must be strictly later than completed time |
| AC2 | A request can last up only two hours, including exactly two hours |
| AC3 | If the room blocked, every request is rejected |
| AC4 | Requesting starting exactly when another ends is allowed |
| AC5 | Show Available and Unavailable clearly |
| AC6 | Explai invalid inputs clearly and make the page usable on a phone |

### 2.3 Likely failure points

| # | Failure point | AC | How I will check it |
| --- | --- | --- | --- |
| 1 | The code might reject bookings that only touch on endpoint | AC4 | Existing book:10:00-11:00, Request 11:00-12:00. It should be available |
| 2 | The code might allow a request starting exactly now | AC1 | Current time:9:00, Requesr 9:00-9:30. It should be unavailable |

### 2.4 The contract

| Parameter | Meaning | Type and allowed values |
| --- | --- | --- |
| `start` | Requested starting time, in minutes after midnight | Integer; 0 <= start < end |
| `end` | Requested ending time, in minutes after midnight | Integer; start < end <= 1440 |
| `now` | Current time, in minutes after midnight | Integer from 0 to 1439 |
| `blocked` | Whether the selected room blocked | Boolean true or false |
| `existing` | The room's existing booking intervals | Collection of (start,end) pairs |
| returns | Whether the request satisfies all booking rules | Boolean: True if allowed; otherwise False |

### 2.5 Initial assumptions and manual checks

**Assumptions:**

1. All times refer to the same day and use minutes after midnight.
2. Existing bookings contain valid start and end times.

**Checked manually:**

- Check that 11:00–12:00 is allowed when an existing booking ends at 11:00.
- Check that a request starting exactly now is rejected.
- Check twice with the same input and confirm existing bookings stay unchanged.
- Check that the page works at approximately 375 pixels wide.

## 3. Python v1 review

| Branch in v1 (quoted) | AC | Satisfies it? | Why |
| --- | --- | --- | --- |
| `type(start) is not int or type(end) is not int` | AC1 | Yes | Rejects non-integer candidate times, including Boolean values. |
| `not (0 <= start < end <= 1440)` | AC1 | Yes | Rejects invalid order, equal times and values outside the day bounds. |
| `start <= now` | AC1 | Yes | Rejects starts in the past and starts exactly at the current time. |
| `end - start > 120` | AC2 | Yes | Rejects durations above 120 minutes while allowing exactly 120. |
| `blocked` | AC3 | Yes | Rejects every request when the room is blocked. |
| `start < existing_end and end > existing_start` | AC4 | Yes | Detects overlap using strict comparisons, so touching endpoints are allowed. The loop checks every existing interval. |

The final Python implementation matches v1. No functional defect justified changing it.

The AI-assisted suite contains 25 tests covering the required cases, additional boundaries, Boolean return values, repeated calls and unchanged input contents and ordering. In the assistant's execution environment, all 25 tests passed and the suite caught all ten faulty implementations supplied by the checker. The student must also run this same suite in the local repository.

## 4. Prototype v1 in Bolt.new

**Prompt as sent:**

~~~~text
Build a responsive one-page Smart Campus Room Availability Checker
for one selected room, using fictional booking data.
The page checks availability only. It must not create or confirm bookings.
Implement these fixed acceptance criteria:
AC1: Candidate times are integer minutes after midnight:
0 <= start < end <= 1440. Start must be strictly later than now.
AC2: Maximum duration is 120 minutes. Exactly 120 is allowed.
AC3: Every request is unavailable when the room is blocked.
AC4: Reject overlap with any existing booking. Touching endpoints
do not overlap. Intervals include their start and exclude their end.
AC5: Display Available or Unavailable clearly. Never modify existing
bookings when checking, including when checking twice.
AC6: Show understandable validation feedback and provide a usable
mobile layout at approximately 375 pixels wide.
Use default fictional data:
now = 540 (09:00)
blocked = false
existing = [(600, 660)] (10:00–11:00)
Provide labelled start and end inputs and a Check availability button.
Allow changing the fictional current time, blocked status and existing
intervals so I can test the acceptance criteria. These controls only
edit the local demonstration data; they do not create real bookings.
Explicitly exclude login, backend and database.
Do not add authentication, network calls, external APIs, storage,
analytics, payments or a Book button. Keep everything in local memory.
Use system fonts and no externally hosted assets.
~~~~

| Generated file or component | Path | Its role |
| --- | --- | --- |
| RoomChecker | src/components/RoomChecker.tsx | Inputs, feedback, demonstration controls and timeline. |
| Time helpers | src/lib/time.ts | Parsing, formatting and availability rules. |
| App | src/App.tsx | Renders RoomChecker. |
**What v1 does:**

The page checks availability for one selected room using fictional data held in memory. It provides numeric start and end inputs, an explicit Available or Unavailable result, editable demonstration data and a timeline.

The numeric inputs allow both 1440 and the deliberately invalid 1441 to be entered for boundary testing. The page does not create or confirm real bookings.

## 5. Test cases — executed on both artifacts

Base data unless a row states otherwise: `now = 540`, `blocked = False`, `existing = [(600, 660)]`.

Python results below were executed by the supplied checker in the assistant's environment. Page v1 results were observed and reported by the student. T3 and T10 were repeated after correcting the test setup; the initial unexpected results were setup mistakes, not established code defects.

Final page tests remain unexecuted. `Not executed` is an explicit pending marker and is not a passing result.

| Case | Name | Input | Expected | Python v1 | Python final | Page v1 | Page final |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T1 | Touching | 660–720 | Available | True | True | Available | Not executed |
| T2 | Overlap | 630–690 | Unavailable | False | False | Unavailable | Not executed |
| T3 | Blocked | 660–720, blocked | Unavailable | False | False | Unavailable | Not executed |
| T4 | Exactly 120 min | 720–840 | Available | True | True | Available | Not executed |
| T5 | 121 min | 720–841 | Unavailable | False | False | Unavailable | Not executed |
| T6 | Starts now | 540–570 | Unavailable | False | False | Unavailable | Not executed |
| T7 | Reversed | 720–660 | Unavailable | False | False | Unavailable | Not executed |
| T8 | Ends at midnight | 1380–1440 | Available | True | True | Available | Not executed |
| T9 | Past midnight | 1380–1441 | Unavailable | False | False | Unavailable | Not executed |
| T10 | Second booking | 720–780, existing (600–660), (700–760) | Unavailable | False | False | Unavailable | Not executed |
| T11 | Same check twice | 660–720, twice | Available | True | True | Available | Not executed |
| T12 | Narrow screen | T1 at ~375 px wide | Available | n/a | n/a | Available | Not executed |

The v1 narrow-screen screenshot shows readable inputs and the Available result for 660–720. Full-page overflow checking and final narrow verification remain outstanding.

## 6. Traceability

| AC | Implementation / file | Test input | Expected | v1 actual | Final actual |
| --- | --- | --- | --- | --- | --- |
| AC1 | code/booking.py; project/src/lib/time.ts | T6–T9 | Reject starts-now, reversed and out-of-day requests; accept an end of 1440 | Python and page results match expected | Python matches; final page not executed |
| AC2 | Duration conditional in both availability functions | T4, T5 | Accept 120 minutes; reject 121 | True / Available; False / Unavailable | Python matches; final page not executed |
| AC3 | Blocked conditional in both availability functions | T3 | Unavailable | False / Unavailable after correcting setup | False; final page not executed |
| AC4 | Strict overlap comparisons in both functions | T1, T2, T10 | Allow touching and reject overlaps with any booking | True, False, False; page matches | Python matches; final page not executed |
| AC5 | Python read-only iteration; RoomChecker defensive copy and result display | T11; nonmutation tests | Stable repeated result and unchanged input contents and ordering | True / Available; source only reads inputs | Python repeated and nonmutation tests pass; final page not executed |
| AC6 | RoomChecker labels, feedback and responsive layout | T7, T9, T12; invalid fictional interval | Clear validation feedback and a usable narrow layout | Request errors displayed; narrow Available screenshot; fictional interval labels missing | Repair source present; final browser verification pending |

## 7. Issue log

The observed v1 availability cases matched the expected rules after correcting the test setup. Cleanup therefore targeted demonstration-input feedback and accessibility rather than inventing an availability defect.

| # | Issue | Reproduction | Priority | Prompt / change | Retest result |
| --- | --- | --- | --- | --- | --- |
| 1 | Invalid fictional intervals are silently ignored | AC6: enter 720–660 in the fictional interval editor and press Add; original addInterval returns without an explanation | Medium | B5 requested inline feedback for blank/non-integer values, invalid bounds and reversed intervals; Bolt reported adding validation | Final source inspected and after screenshot supplied; student confirmation of the browser retest remains pending |
| 2 | Fictional interval inputs lack associated labels | AC6: inspect newStart and newEnd in original RoomChecker; only placeholders identify them | Medium | B5 requested visible associated labels and a usable layout at 375 px | Final source includes labels; accessible-name and final narrow-layout verification remain pending |
| 3 | Invalid editable current time silently falls back to 540 | AC6: original handleCheck uses parseMin(now) ?? DEFAULT_NOW and does not reject out-of-range integers | Medium | B5 requested integer validation from 0 to 1439 and no silent substitution | Source review indicates the repair; final invalid-input browser retest remains pending |

**Before / after:** `evidence/before-1.png` → `evidence/after-1.png` relate to issue 1. Before submission, confirm that both screenshots show the same invalid fictional interval and that the after capture shows the new feedback.

## 8. Critique decisions

These decisions were drafted with AI assistance and require the student's review.

| # | AI claim or recommendation | How I verified it | Decision | Reason (AC or case) |
| --- | --- | --- | --- | --- |
| 1 | Strict overlap comparisons allow touching endpoints | T1 page observation and automated tests for touching in both directions | accept | AC4 explicitly permits endpoint touching. |
| 2 | Keep numeric minute inputs | T8 accepts 1440 and T9 rejects 1441 in the observed v1 page tests | accept | Numeric inputs preserve direct testing of AC1 day boundaries. |
| 3 | Validate the editable demonstration current time | Compared the original fallback in handleCheck with the reported repair and final source | modify | Limit this repair to editable web demonstration controls. Keep the Python contract's assumption that now is valid. |

The critique was evaluated against evidence rather than treated as proof. In particular, a successful build or a displayed “existing bookings unchanged” message alone cannot establish all acceptance criteria.

## 9. Coding-agent analysis

### 9.1 The loop

| Step | What happened in this assignment |
| --- | --- |
| User goal | Check a requested room interval against the fixed acceptance criteria. |
| Model / plan | ChatGPT proposed ordered validation, overlap checks and boundary tests in B1. |
| Tool call | The Bolt repair transcript reports reading RoomChecker.tsx, editing the component and building the project. |
| Observation | Bolt reported inline validation, visible interval labels and removal of the current-time fallback. The downloaded final source was available for inspection. |
| Next step | Retest the changed demonstration controls and execute all twelve final page cases. |
| Human review | The student corrected the T3 and T10 test setup instead of treating the initial results as confirmed defects. Final page verification remains pending. |

### 9.2 Context, tools and permissions

| Tool | Context it used | Tools or permissions | Observed or assumed |
| --- | --- | --- | --- |
| ChatGPT | Assignment brief, pasted Python implementation, uploaded exports and student observations | Source inspection and Python checker execution were reported in this conversation | Observed |
| Bolt.new | The prompt and current project source | Its visible transcript reports reading RoomChecker.tsx, editing files and running a build | Observed |
| Bolt.new | Internal context selection and model orchestration | Exact internal sandbox permissions and orchestration were not shown | Assumed |

### 9.3 Checkpoint and dependability

**Safety checkpoint:** Before accepting generated changes, inspect the diff against AC1–AC6, preserve both originals, and check for unwanted network calls, storage or credentials. Execute boundary and nonmutation tests, then manually verify the page rather than accepting a build-success message as proof.

**Reliability, security, responsibility:** Reliability requires expected results derived from the criteria, including touching intervals and starts exactly now. Usability requires understandable feedback and a real narrow-screen check. Security depends on keeping this fictional checker local and avoiding unnecessary service dependencies or credentials. Human responsibility remains with the student: inspect changes, restrict tool access, distinguish observed output from assumptions, and disclose incomplete verification honestly.

## 10. Reflection

Reflection is not yet supplied. Before submission, the student must replace this paragraph with 100–200 words written independently: compare Python AI-assisted coding with Bolt vibe coding, explain reliability, usability and security risks, discuss human responsibility, identify a modified recommendation, and suggest a next improvement within scope.

## 11. Appendix A — AI exchanges

### B1

- **Tool:** ChatGPT
- **Model:** GPT-6.1 Sol
- **Date:** 2026-10-31
- **Stage:** Plan
- **Source:** this SIS

**Prompt:**

~~~~text
Plan a Python function with this exact signature:
can_book(start, end, now, blocked, existing).
Do not write code yet. Give a short plan covering checks,
assumptions and boundary tests.
Rules:
- start and end must be integer minutes: 0 <= start < end <= 1440.
- start must be strictly later than now.
- Maximum duration is 120 minutes; exactly 120 is allowed.
- A blocked room is always unavailable.
- Reject overlap with any existing (start, end) pair.
- Touching endpoints do not overlap.
- Return True only when every rule holds; otherwise False.
- Never change existing bookings.
- Use only the Python standard library.
Assume now is valid, from 0 to 1439.
Do not add booking creation or any extra features.
~~~~

**Response:**

~~~~text
The function will check each rule and return False as soon as one fails:
1. Verify that start and end are integers. Reject Boolean values, which Python otherwise treats as integers.
2. Check 0 <= start < end <= 1440.
3. Check that start > now.
4. Reject durations greater than 120 minutes.
5. Reject the request if blocked is True.
6. Read each existing booking without modifying it. Overlap occurs when start < existing_end and end > existing_start. Strict comparisons allow touching endpoints.
7. Return True if every check passes.
Assumptions: now is valid, blocked is Boolean, and existing contains valid integer-minute booking pairs for the same day. Existing bookings may be unsorted.
Boundary tests will cover:
- Touching endpoints in both directions and overlapping intervals.
- Exactly 120 minutes versus 121 minutes.
- Starting exactly now versus one minute later.
- Equal or reversed times, negative times, non-integers and Booleans.
- Ending at 1440 versus 1441.
- Blocked rooms, empty bookings and conflicts with a second booking.
- Repeated calls and unchanged input contents and ordering.
No imports or additional features are needed.
~~~~

### B2

- **Tool:** ChatGPT
- **Model:** GPT-6.1 Sol
- **Date:** 2026-10-31
- **Stage:** Generate
- **Source:** this SIS

**Prompt:**

~~~~text
I approve the plan. Generate the first implementation of
can_book(start, end, now, blocked, existing) exactly as planned.
Use only the Python standard library. Provide the complete
booking_v1.py code without tests or additional features.
~~~~

**Response:**

~~~~text
def can_book(start, end, now, blocked, existing):
    if type(start) is not int or type(end) is not int:
        return False

    if not (0 <= start < end <= 1440):
        return False

    if start <= now:
        return False

    if end - start > 120:
        return False

    if blocked:
        return False

    for existing_start, existing_end in existing:
        if start < existing_end and end > existing_start:
            return False

    return True
~~~~

### B3

- **Tool:** Bolt.new
- **Model:** not displayed
- **Date:** 2026-11-01
- **Stage:** Generate
- **Source:** this SIS

**Prompt:**

~~~~text
Build a responsive one-page Smart Campus Room Availability Checker
for one selected room, using fictional booking data.
The page checks availability only. It must not create or confirm bookings.
Implement these fixed acceptance criteria:
AC1: Candidate times are integer minutes after midnight:
0 <= start < end <= 1440. Start must be strictly later than now.
AC2: Maximum duration is 120 minutes. Exactly 120 is allowed.
AC3: Every request is unavailable when the room is blocked.
AC4: Reject overlap with any existing booking. Touching endpoints
do not overlap. Intervals include their start and exclude their end.
AC5: Display Available or Unavailable clearly. Never modify existing
bookings when checking, including when checking twice.
AC6: Show understandable validation feedback and provide a usable
mobile layout at approximately 375 pixels wide.
Use default fictional data:
now = 540 (09:00)
blocked = false
existing = [(600, 660)] (10:00–11:00)
Provide labelled start and end inputs and a Check availability button.
Allow changing the fictional current time, blocked status and existing
intervals so I can test the acceptance criteria. These controls only
edit the local demonstration data; they do not create real bookings.
Explicitly exclude login, backend and database.
Do not add authentication, network calls, external APIs, storage,
analytics, payments or a Book button. Keep everything in local memory.
Use system fonts and no externally hosted assets.
~~~~

**Response:**

~~~~text
I'll build a self-contained room availability checker that runs entirely in local memory (no backend, auth, or database — matching your explicit constraints). Let me start by creating the time/availability logic, then the UI.


0123456789
actions taken
Build passes. Here's what I built.

A single-page room availability checker for one selected campus room, running entirely in local memory — no login, backend, database, network calls, or Book button. Everything uses fictional data you can edit to test each criterion.

The check itself enforces every acceptance criterion: integer minutes with 0 ≤ start < end ≤ 1440 and start strictly later than now (AC1), a 120-minute max where exactly 120 is allowed (AC2), always-unavailable when blocked (AC3), overlap rejection using half-open (start, end) intervals where touching endpoints don't overlap (AC4), a clear Available/Unavailable verdict that never mutates existing bookings even on repeated checks (AC5), and readable validation messages with a layout that works at ~375px wide (AC6).

Defaults are preloaded: now = 540 (09:00), blocked = false, one existing booking 600–660 (10:00–11:00). Below the checker you'll find controls to change the fictional current time, toggle the blocked status, and add or remove existing intervals — these edit local demo data only, not real bookings. A day timeline visualizes bookings, the current-time marker, and the interval you just checked.

You can try it now: enter Start 555 / End 600 and tap "Check availability" to see an Available result, or Start 630 / End 700 to see an Unavailable overlap result.
~~~~

### B4

- **Tool:** ChatGPT
- **Model:** GPT-6.1 Sol
- **Date:** 2026-11-01
- **Stage:** Critique
- **Source:** this SIS

**Prompt:**

~~~~text
Review my Python can_book function from this conversation and
the original Bolt project ZIP I uploaded against AC1–AC6.

Identify concrete defects or usability issues, citing file paths
and conditions. Distinguish source inspection from executed tests.
Consider the page results I reported, including the corrected
T3 and T10 setup and the narrow-screen screenshot.

Evaluate whether the numeric time inputs need replacing with
time-picker inputs, especially for testing 1440 and 1441.

Do not change code, add features or change the acceptance criteria.
Give recommendations that I can independently accept, reject or modify.
~~~~

**Response:**

~~~~text
The Python function and the page’s availability logic appear consistent with AC1–AC5. The page has concrete validation and accessibility issues under AC6.

This review uses the Python code in this conversation, the uploaded Bolt source, your reported page tests and your narrow-screen screenshot. I have not executed the Python tests or browser tests myself.

Criterion Evidence and assessment
AC1 Python rejects non-integer and Boolean candidate times, invalid day bounds, reversed intervals and starts at or before now. In src/lib/time.ts, checkAvailability performs equivalent checks. Your page results for T6–T9 support the boundary behaviour.
AC2 Both implementations reject durations greater than 120 using a strict > comparison. Your T4 and T5 results confirm the page accepts 120 and rejects 121 minutes.
AC3 Both implementations reject blocked rooms. Your corrected T3 setup resolved the earlier discrepancy; that earlier result is not evidence of a code defect.
AC4 Both use strict overlap comparisons, allowing endpoint touching. Your T1, T2 and corrected T10 testing support this behaviour.
AC5 Python only reads existing. The page checks a defensive copy and displays explicit result text. Your repeated-check result supports stable behaviour, but the displayed “unchanged” message alone does not prove non-mutation; automated input-comparison tests are still needed.
AC6 Main request inputs have labels and validation messages. The narrow screenshot shows readable inputs and a readable Available result. However, the fictional interval editor has the issues below. Full-page horizontal overflow still needs manual checking.

Concrete findings and recommendations:

Finding: Invalid fictional intervals fail silently.
Source evidence: In src/components/RoomChecker.tsx, addInterval simply returns when parsing fails, bounds fail or s >= e.
Recommendation and independent verification: Show an inline explanation without changing the existing data. Verify by adding 720–660, blank values and an end above 1440; then verify a valid interval still works.

Finding: Fictional interval inputs lack accessible labels.
Source evidence: The newStart and newEnd inputs in RoomChecker.tsx use placeholders without associated labels or aria-label attributes.
Recommendation and independent verification: Add visible, associated labels identifying the fictional interval’s start and end. Verify their accessible names in DevTools and check the layout at 375 px.

Finding: Invalid current-time input is silently substituted.
Source evidence: In handleCheck, parseMin(now) ?? DEFAULT_NOW replaces blank or non-integer current-time input with 540. Out-of-range integers are also not rejected there.
Recommendation and independent verification: Validate the editable demonstration current time and explain invalid values. This improves the demo controls; the Python contract may continue assuming valid now. Verify blank, fractional, negative and 1440 current-time values.

Keep the numeric minute inputs. Replacing them with ordinary time pickers is unnecessary: numeric inputs directly support the contract and let you enter 1440 and the deliberately invalid 1441. Time pickers could make those boundary tests harder. The existing human-readable time hints already help users interpret minutes.

No Python repair is justified by this source review alone. Preserve v1, run the automated suite, and make targeted page changes based on independently confirmed findings.
~~~~

### B5

- **Tool:** Bolt.new
- **Model:** not displayed
- **Date:** 2026-11-01
- **Stage:** Repair
- **Source:** this SIS

**Prompt:**

~~~~text
Make targeted changes in src/components/RoomChecker.tsx:

1. The fictional interval Add action silently ignores invalid input.
Show an inline validation message for blank/non-integer values,
times outside 0–1440, or start >= end. Invalid submissions must
leave existing intervals unchanged.

2. Add visible associated labels to the fictional interval start
and end inputs. Keep these controls usable at 375 px width.

3. Validate the editable fictional current time as an integer
from 0 to 1439. Do not silently substitute 540 when it is invalid.
Show clear feedback and do not calculate availability until corrected.

Keep numeric minute inputs, existing availability rules and AC1–AC6.
Do not add features, network calls, storage, login, backend or database.
~~~~

**Response:**

~~~~text
Make targeted changes in src/components/RoomChecker.tsx:

The fictional interval Add action silently ignores invalid input. Show an inline validation message for blank/non-integer values, times outside 0–1440, or start >= end. Invalid submissions must leave existing intervals unchanged.
Add visible associated labels to the fictional interval start and end inputs. Keep these controls usable at 375 px width.
Validate the editable fictional current time as an integer from 0 to 1439. Do not silently substitute 540 when it is invalid. Show clear feedback and do not calculate availability until corrected. Keep numeric minute inputs, existing availability rules and AC1–AC6. Do not add features, network calls, storage, login, backend or database.

Thoughts
I'll read the current RoomChecker to make targeted edits.

Read
src/components/RoomChecker.tsx

Now I'll make the targeted edits: add-interval validation with inline messages, visible labels on those inputs, and proper current-time validation.

0123456789
actions taken
Build passes. Here's what changed in the room checker.

Adding a fictional booking now validates inline instead of failing silently: you get a clear message for blank or non-integer values, times outside 0–1440, or when end isn't greater than start. Invalid submissions leave the existing bookings list untouched. Those two interval inputs now also have visible "Interval start (min)" and "Interval end (min)" labels, stacked vertically so they stay usable around 375 px wide.

The editable current time is now validated as an integer from 0 to 1439. If it's blank, non-integer, or out of range, you see a red inline message and the field is marked invalid — and the Check button won't run a calculation until it's corrected (it surfaces the current-time error instead). The previous behavior of silently substituting 540 has been removed.

All existing availability rules and AC1–AC6 are unchanged.
~~~~

## 12. Appendix B — Test output

### 12.1 Your suite

The following is real output from the assistant's execution environment, running `python -m unittest -v` inside `code/` with the generated 25-test suite. It must correspond to the test file included in the repository.

~~~~text
test_after_midnight (test_booking.BookingTests.test_after_midnight) ... ok
test_blocked (test_booking.BookingTests.test_blocked) ... ok
test_boolean (test_booking.BookingTests.test_boolean) ... ok
test_contains_booking (test_booking.BookingTests.test_contains_booking) ... ok
test_duration_121 (test_booking.BookingTests.test_duration_121) ... ok
test_empty (test_booking.BookingTests.test_empty) ... ok
test_equal (test_booking.BookingTests.test_equal) ... ok
test_exactly_120 (test_booking.BookingTests.test_exactly_120) ... ok
test_float_end (test_booking.BookingTests.test_float_end) ... ok
test_float_start (test_booking.BookingTests.test_float_start) ... ok
test_inside_booking (test_booking.BookingTests.test_inside_booking) ... ok
test_midnight (test_booking.BookingTests.test_midnight) ... ok
test_negative (test_booking.BookingTests.test_negative) ... ok
test_nonmutation_available (test_booking.BookingTests.test_nonmutation_available) ... ok
test_nonmutation_conflict (test_booking.BookingTests.test_nonmutation_conflict) ... ok
test_one_minute_future (test_booking.BookingTests.test_one_minute_future) ... ok
test_overlap (test_booking.BookingTests.test_overlap) ... ok
test_overlap_end (test_booking.BookingTests.test_overlap_end) ... ok
test_past (test_booking.BookingTests.test_past) ... ok
test_repeated (test_booking.BookingTests.test_repeated) ... ok
test_reversed (test_booking.BookingTests.test_reversed) ... ok
test_second_booking (test_booking.BookingTests.test_second_booking) ... ok
test_starts_now (test_booking.BookingTests.test_starts_now) ... ok
test_touching_end (test_booking.BookingTests.test_touching_end) ... ok
test_touching_start (test_booking.BookingTests.test_touching_start) ... ok

----------------------------------------------------------------------
Ran 25 tests in 0.001s

OK
~~~~

### 12.2 Path B only — three faults you planted

| # | Line you broke | AC | Test that failed |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |

## 13. Remaining limitations and known fails

This table records current limitations, not a claim that the submission is complete. The exact checker IDs and numbers must be updated after the final local run.

| Check ID or limitation | Why it stays | What I would do next |
| --- | --- | --- |
| C1, C4 | Final page cases have not been executed; their cells explicitly say Not executed. | Run all twelve cases on the final page and record actual results. |
| E3 | No final narrow screenshot has been verified. | Capture the repaired checker at approximately 375 px in portrait and save evidence/final-narrow.png. |
| Q1 | The student's independent reflection is unfinished. | Write 100–200 words covering the required comparison, risks, responsibilities, modified recommendation and next step. |
| W3 | The last inspected final export retained an unused database dependency, and the checker flagged footer wording. | Remove the unused dependency from the final project, update the lockfile, inspect source and rerun the build and checker. Preserve v1. |
| X1 | Standard is retained as the Bolt label recorded by the student, although the checker rejects it as an exact model name. | Obtain the actual model name if Bolt exposes it; otherwise disclose this known failure. |
| Final repair verification | Issue-log retests and screenshot interpretation still need confirmation. | Reproduce invalid inputs, check associated labels and confirm before/after screenshots. |
| Declaration | Student ID, group, final checker numbers, final commit and honesty confirmations are not yet completed. | Fill submission.yml after the final run and validate it. |
| AI disclosure | Tests and technical report sections were written with AI assistance. | Ensure AI_USAGE.md records this assistance and review every submitted claim. |