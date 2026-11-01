# SIS #03 — Report: Smart Campus Room Availability Checker

<!-- The ONLY file you write prose in. Keep every numbered heading (## 1. … ## 13.) and every
     ### sub-heading, and the **Label:** words — the checker finds your answers by them.
     Replace every "(write here)" and "(paste here)". Delete these <!-- --> comments if you like. -->

## 1. Setup and reuse

<!-- Model: the exact model with its version, as the tool shows it ("ChatGPT" is a tool, not a
     model). If the tool does not show it, write: not displayed
     Reuse: week-05 if code/original/booking_v1.py is your Week 05 v1, copied unedited;
     week-06 if web/original/ is your Week 06 v1 export; fresh if you generated it for this SIS. -->

| Item | Value |
| --- | --- |
| Coding assistant (tool) | (write here) |
| Coding assistant model | (write here) |
| Bolt.new model | (write here) |
| Bolt project link | (write here) |
| Language | (write here) |
| Path | (write here) |
| Python v1 from | (write here) |
| Web v1 from | (write here) |

## 2. Baseline — before any new AI exchange

<!-- Written by you, without AI, before the first exchange of this SIS. Commit and push it
     first (README §2). Reusing Week 05/06 work does not exempt you: this section is new. -->

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

<!-- At least two. The brief's examples: endpoint overlap, starts-now. -->

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

1. All times refer to the same day and use minutes after midnight 
2. Existing bookings contain valid start and end times

**Checked manually:**

- Check that 11:00–12:00 is allowed when an existing booking ends at 11:00
- Check that a request starting exactly now is rejected
- Check twice with the same input and confirm existing bookings stay unchanged
- Check that the page works at approximately 375 pixels wide

## 3. Python v1 review

<!-- One row per conditional branch in code/original/booking_v1.py (your language's v1 on
     Path B). Quote the condition exactly. AC1-AC4 must all appear in the AC column. -->

| Branch in v1 (quoted) | AC | Satisfies it? | Why |
| --- | --- | --- | --- |
| (write here) | (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) | (write here) |

## 4. Prototype v1 in Bolt.new

**Prompt as sent:**

~~~~text
(paste here)
~~~~

<!-- Main generated files or components, with their path inside web/original/
     (for example src/App.tsx). At least two. -->

| Generated file or component | Path | Its role |
| --- | --- | --- |
| (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) |

**What v1 does:**

- (write here)

## 5. Test cases — executed on both artifacts

<!-- Base for every case unless the row says otherwise: now = 540, blocked = False,
     existing = [(600, 660)]. Do not change the first four columns.
     Python columns: True, False or Error (it raised) — what the call actually returned.
       T11: the result of the SECOND call. T12: n/a.
       Path A: the checker runs both of your files on T1-T11 and compares (C2, C3).
     Page columns: Available, Unavailable or Not testable — what the page actually showed.
     Never write a result you did not observe. -->

| Case | Name | Input | Expected | Python v1 | Python final | Page v1 | Page final |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T1 | Touching | 660–720 | Available | | | | |
| T2 | Overlap | 630–690 | Unavailable | | | | |
| T3 | Blocked | 660–720, blocked | Unavailable | | | | |
| T4 | Exactly 120 min | 720–840 | Available | | | | |
| T5 | 121 min | 720–841 | Unavailable | | | | |
| T6 | Starts now | 540–570 | Unavailable | | | | |
| T7 | Reversed | 720–660 | Unavailable | | | | |
| T8 | Ends at midnight | 1380–1440 | Available | | | | |
| T9 | Past midnight | 1380–1441 | Unavailable | | | | |
| T10 | Second booking | 720–780, existing (600–660), (700–760) | Unavailable | | | | |
| T11 | Same check twice | 660–720, twice | Available | | | | |
| T12 | Narrow screen | T1 at ~375 px wide | Available | n/a | n/a | | |

## 6. Traceability

<!-- His table. Implementation / file: where the rule lives (booking.py line, a component).
     Test input: the case IDs from section 5. v1 / final actual: what those cases gave. -->

| AC | Implementation / file | Test input | Expected | v1 actual | Final actual |
| --- | --- | --- | --- | --- | --- |
| AC1 | (write here) | (write here) | (write here) | (write here) | (write here) |
| AC2 | (write here) | (write here) | (write here) | (write here) | (write here) |
| AC3 | (write here) | (write here) | (write here) | (write here) | (write here) |
| AC4 | (write here) | (write here) | (write here) | (write here) | (write here) |
| AC5 | (write here) | (write here) | (write here) | (write here) | (write here) |
| AC6 | (write here) | (write here) | (write here) | (write here) | (write here) |

## 7. Issue log

<!-- At least two, from v1 — a functional defect and a usability or code-quality issue where you
     have them. If every case passed on v1, log the preventive cleanup and say why.
     Reproduction names a case (T1-T12) or an AC. Priority: High, Medium or Low.
     Prompt / change: the focused prompt you sent, and what changed. Never "make it better". -->

| # | Issue | Reproduction | Priority | Prompt / change | Retest result |
| --- | --- | --- | --- | --- | --- |
| 1 | (write here) | (write here) | (write here) | (write here) | (write here) |
| 2 | (write here) | (write here) | (write here) | (write here) | (write here) |

**Before / after:** `evidence/before-1.png` → `evidence/after-1.png` show issue (write here)

## 8. Critique decisions

<!-- The AI's review against AC1-AC6 (stage C), claim by claim. At least three rows.
     How I verified it: the case, test or run that confirmed or refuted the claim.
     Decision: accept, reject or modify. At least one reject or modify — the reflection asks for it. -->

| # | AI claim or recommendation | How I verified it | Decision | Reason (AC or case) |
| --- | --- | --- | --- | --- |
| 1 | (write here) | (write here) | (write here) | (write here) |
| 2 | (write here) | (write here) | (write here) | (write here) |
| 3 | (write here) | (write here) | (write here) | (write here) |

## 9. Coding-agent analysis

### 9.1 The loop

<!-- One real pass through the loop from this assignment — with your assistant or with Bolt. -->

| Step | What happened in this assignment |
| --- | --- |
| User goal | (write here) |
| Model / plan | (write here) |
| Tool call | (write here) |
| Observation | (write here) |
| Next step | (write here) |
| Human review | (write here) |

### 9.2 Context, tools and permissions

<!-- At least three rows. Last column: Observed (you saw it happen) or Assumed (you infer it
     about the internals). Use both at least once. -->

| Tool | Context it used | Tools or permissions | Observed or assumed |
| --- | --- | --- | --- |
| (write here) | (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) | (write here) |

### 9.3 Checkpoint and dependability

**Safety checkpoint:** (write here)

**Reliability, security, responsibility:** (write here)

## 10. Reflection

<!-- 100-200 words, in your own words, no AI. Compare AI-assisted coding (the Python part) with
     vibe coding (the Bolt part); one example each of a reliability, an availability/usability and
     a security risk; why review, tool permissions and tests stay human responsibilities; one AI
     recommendation you rejected or modified, and why; what you would improve next without
     expanding the scope. -->

(write here)

## 11. Appendix A — AI exchanges

<!-- At least four. Complete prompts and complete responses, as text — never screenshots. Paste
     each inside the ~~~~ block that follows its label.
     Stage: Plan, Generate, Critique or Repair (the brief's A-D) — at least one of each.
     Source: this SIS, week-05 or week-06. Reused exchanges keep their original date.
     The Generate exchange for Python must contain your v1 exactly as it is in code/original/.
     Add B5, B6 … if you ran more. -->

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
- **Model:** not displayed
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
- **Model:** Standard
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

- **Tool:** (write here)
- **Model:** (write here)
- **Date:** (write here)
- **Stage:** (write here)
- **Source:** (write here)

**Prompt:**

~~~~text
(paste here)
~~~~

**Response:**

~~~~text
(paste here)
~~~~

## 12. Appendix B — Test output

### 12.1 Your suite

<!-- The complete terminal output of your final suite. Path A: python -m unittest -v, run inside
     code/ — the part ending in "Ran N tests" and OK or FAILED. -->

~~~~text
(paste here)
~~~~

### 12.2 Path B only — three faults you planted

<!-- Path A: leave this table as it is. Path B: three rows — the line you broke, the AC it
     breaks, the test that failed. -->

| # | Line you broke | AC | Test that failed |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |

## 13. Remaining limitations and known fails

<!-- One row per check ID in submission.yml known_fails, and any limitation you know of.
     If the checker is clean and you know of none, one row that says so. -->

| Check ID or limitation | Why it stays | What I would do next |
| --- | --- | --- |
| (write here) | (write here) | (write here) |
