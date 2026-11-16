# Week 08 — Lab report

**Name:** Berenbay Yernar
**Group:** Mon 16:00-19:00
**Date:** 16-11-2026

Fill in every section. **Do not delete, rename or renumber the headings.** The checker and the
grader find your answers by them. You can add rows to any table, but never remove its header.

---

## 1. Setup

| | |
| --- | --- |
| Assistant I debugged with (tool) | ChatGPT |
| Exact model (with its version, or `not displayed`) | GPT-6.1 Sol |
| Where the skill was installed (ChatGPT / Claude web / Claude Code / prompt-only simulation) | prompt-only simulation |
| Where I ran the tests (Bolt terminal / my computer / Codespace) | My computer, in the VS Code terminal |
| Vitest version (the `RUN  v…` line of a run) | 3.2.4 |
| Language of my booking module (`ts` or `js`) — the file I copied from `buggy/` | `ts` |

---

## 2. Task 1 — baseline, buggy code, failing tests

### 2.1 My Week 07 suite on my own code

The **real** output of your Week 07 suite, run in `week-08/app/` **before** you replace
anything. It should be green. If it is not, say why under the block.

```text
RUN  v3.2.4 /Users/ernarberenbaj/Documents/kbtu/se-practice/week-08/app

 ✓ src/booking.test.ts (30 tests) 4ms
   ✓ canBook — reviewed decisions and booking data preservation (30)
     ✓ T01: AC4 allows touching after an existing booking 1ms
     ✓ T02: AC1 rejects a start equal to now 0ms
     ✓ T03: AC1 rejects zero duration 0ms
     ✓ T04: AC1 rejects a reversed interval 0ms
     ✓ T05: AC1 rejects an end past 1440 0ms
     ✓ T06: AC2 allows exactly 120 minutes 0ms
     ✓ T07: AC2 rejects 121 minutes 0ms
     ✓ T08: AC4 allows touching before an existing booking 0ms
     ✓ T09: AC4 rejects partial overlap 0ms
     ✓ T10: AC4 rejects a request containing an existing booking 0ms
     ✓ T11: AC4 rejects a request inside an existing booking 0ms
     ✓ T12: AC4 rejects an identical interval 0ms
     ✓ T13: AC3 rejects an otherwise valid request when blocked 0ms
     ✓ T14: AC4 allows a valid request with no existing bookings 0ms
     ✓ X1: AC1 allows an end exactly at 1440 0ms
     ✓ X2: AC4 allows touching both neighbouring bookings 0ms
     ✓ B01: AC1 rejects a negative start 0ms
     ✓ B02: AC1 rejects a start before now 0ms
     ✓ B03: AC1 allows a start one minute after now 0ms
     ✓ B04: AC1 allows start zero with an earlier supplied now 0ms
     ✓ B05: AC4 rejects overlap in the second unsorted booking 0ms
     ✓ B06: AC2 allows 119 minutes 0ms
     ✓ B07: AC1 allows a one-minute duration 0ms
     ✓ B08: AC4 rejects overlap with the first minute of a booking 0ms
     ✓ B09: AC4 rejects overlap with the last minute of a booking 0ms
     ✓ B10: AC4 allows a request separated before a booking 0ms
     ✓ B11: AC4 allows a request separated after a booking 0ms
     ✓ B12: AC3 rejects a blocked room with no existing bookings 0ms
     ✓ B13: AC1 respects a different supplied current time 0ms
     ✓ AC5: repeated available checks preserve unsorted booking data 0ms

 Test Files  1 passed (1)
      Tests  30 passed (30)
   Start at  16:29:06
```

### 2.2 The same suite on the provided canBook

You copied the whole `canBook` function from `buggy/booking.ts` (or `.js`) over yours and changed
nothing else. This is the real output:

```text
RUN  v3.2.4 /Users/ernarberenbaj/Documents/kbtu/se-practice/week-08/app

 × src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T01: AC4 allows touching after an existing booking 4ms
   → expected false to be true // Object.is equality
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T02: AC1 rejects a start equal to now 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T03: AC1 rejects zero duration 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T04: AC1 rejects a reversed interval 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T05: AC1 rejects an end past 1440 0ms
 × src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T06: AC2 allows exactly 120 minutes 2ms
   → expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]
   → expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T07: AC2 rejects 121 minutes 0ms
 × src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T08: AC4 allows touching before an existing booking 0ms
   → expected false to be true // Object.is equality
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T09: AC4 rejects partial overlap 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T10: AC4 rejects a request containing an existing booking 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T11: AC4 rejects a request inside an existing booking 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T12: AC4 rejects an identical interval 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T13: AC3 rejects an otherwise valid request when blocked 0ms
 × src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T14: AC4 allows a valid request with no existing bookings 1ms
   → expected [ { start: 630, end: 690 } ] to strictly equal []
   → expected [ { start: 630, end: 690 } ] to strictly equal []
 × src/booking.test.ts > canBook — reviewed decisions and booking data preservation > X1: AC1 allows an end exactly at 1440 0ms
   → expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]
   → expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]
 × src/booking.test.ts > canBook — reviewed decisions and booking data preservation > X2: AC4 allows touching both neighbouring bookings 0ms
   → expected false to be true // Object.is equality
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B01: AC1 rejects a negative start 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B02: AC1 rejects a start before now 0ms
 × src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B03: AC1 allows a start one minute after now 0ms
   → expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]
   → expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]
 × src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B04: AC1 allows start zero with an earlier supplied now 0ms
   → expected [ { start: +0, end: 30 } ] to strictly equal []
   → expected [ { start: +0, end: 30 } ] to strictly equal []
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B05: AC4 rejects overlap in the second unsorted booking 0ms
 × src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B06: AC2 allows 119 minutes 0ms
   → expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]
   → expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]
 × src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B07: AC1 allows a one-minute duration 0ms
   → expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]
   → expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B08: AC4 rejects overlap with the first minute of a booking 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B09: AC4 rejects overlap with the last minute of a booking 0ms
 × src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B10: AC4 allows a request separated before a booking 0ms
   → expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]
   → expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]
 × src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B11: AC4 allows a request separated after a booking 0ms
   → expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]
   → expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B12: AC3 rejects a blocked room with no existing bookings 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B13: AC1 respects a different supplied current time 0ms
 × src/booking.test.ts > canBook — reviewed decisions and booking data preservation > AC5: repeated available checks preserve unsorted booking data 0ms
   → expected false to be true // Object.is equality
   → expected false to be true // Object.is equality

⎯⎯⎯⎯⎯⎯ Failed Tests 13 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T01: AC4 allows touching after an existing booking
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:41:43
     39|     const request = fixture({ start: 660, end: 720 });
     40| 
     41|     expect(checkWithoutMutation(request)).toBe(true);
       |                                           ^
     42|   });
     43| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/23]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T06: AC2 allows exactly 120 minutes
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 840,
+     "start": 720,
+   },
  ]

 ❯ checkWithoutMutation src/booking.test.ts:31:33
     29|   const decision = canBook(request);
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
       |                                 ^
     32|   expect.soft(request.bookings).toStrictEqual(before);
     33| 
 ❯ src/booking.test.ts:71:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/23]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T06: AC2 allows exactly 120 minutes
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 840,
+     "start": 720,
+   },
  ]

 ❯ checkWithoutMutation src/booking.test.ts:32:33
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
     32|   expect.soft(request.bookings).toStrictEqual(before);
       |                                 ^
     33| 
     34|   return decision;
 ❯ src/booking.test.ts:71:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/23]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T08: AC4 allows touching before an existing booking
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:83:43
     81|     const request = fixture({ start: 570, end: 600 });
     82| 
     83|     expect(checkWithoutMutation(request)).toBe(true);
       |                                           ^
     84|   });
     85| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[4/23]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T14: AC4 allows a valid request with no existing bookings
AssertionError: expected [ { start: 630, end: 690 } ] to strictly equal []

- Expected
+ Received

- []
+ [
+   {
+     "end": 690,
+     "start": 630,
+   },
+ ]

 ❯ checkWithoutMutation src/booking.test.ts:31:33
     29|   const decision = canBook(request);
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
       |                                 ^
     32|   expect.soft(request.bookings).toStrictEqual(before);
     33| 
 ❯ src/booking.test.ts:127:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[5/23]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T14: AC4 allows a valid request with no existing bookings
AssertionError: expected [ { start: 630, end: 690 } ] to strictly equal []

- Expected
+ Received

- []
+ [
+   {
+     "end": 690,
+     "start": 630,
+   },
+ ]

 ❯ checkWithoutMutation src/booking.test.ts:32:33
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
     32|   expect.soft(request.bookings).toStrictEqual(before);
       |                                 ^
     33| 
     34|   return decision;
 ❯ src/booking.test.ts:127:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[6/23]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > X1: AC1 allows an end exactly at 1440
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 1440,
+     "start": 1380,
+   },
  ]

 ❯ checkWithoutMutation src/booking.test.ts:31:33
     29|   const decision = canBook(request);
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
       |                                 ^
     32|   expect.soft(request.bookings).toStrictEqual(before);
     33| 
 ❯ src/booking.test.ts:133:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[7/23]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > X1: AC1 allows an end exactly at 1440
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 1440,
+     "start": 1380,
+   },
  ]

 ❯ checkWithoutMutation src/booking.test.ts:32:33
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
     32|   expect.soft(request.bookings).toStrictEqual(before);
       |                                 ^
     33| 
     34|   return decision;
 ❯ src/booking.test.ts:133:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[8/23]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > X2: AC4 allows touching both neighbouring bookings
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:146:43
    144|     });
    145| 
    146|     expect(checkWithoutMutation(request)).toBe(true);
       |                                           ^
    147|   });
    148| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[9/23]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B03: AC1 allows a start one minute after now
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 570,
+     "start": 541,
+   },
  ]

 ❯ checkWithoutMutation src/booking.test.ts:31:33
     29|   const decision = canBook(request);
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
       |                                 ^
     32|   expect.soft(request.bookings).toStrictEqual(before);
     33| 
 ❯ src/booking.test.ts:170:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[10/23]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B03: AC1 allows a start one minute after now
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 570,
+     "start": 541,
+   },
  ]

 ❯ checkWithoutMutation src/booking.test.ts:32:33
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
     32|   expect.soft(request.bookings).toStrictEqual(before);
       |                                 ^
     33| 
     34|   return decision;
 ❯ src/booking.test.ts:170:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[11/23]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B04: AC1 allows start zero with an earlier supplied now
AssertionError: expected [ { start: +0, end: 30 } ] to strictly equal []

- Expected
+ Received

- []
+ [
+   {
+     "end": 30,
+     "start": 0,
+   },
+ ]

 ❯ checkWithoutMutation src/booking.test.ts:31:33
     29|   const decision = canBook(request);
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
       |                                 ^
     32|   expect.soft(request.bookings).toStrictEqual(before);
     33| 
 ❯ src/booking.test.ts:182:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[12/23]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B04: AC1 allows start zero with an earlier supplied now
AssertionError: expected [ { start: +0, end: 30 } ] to strictly equal []

- Expected
+ Received

- []
+ [
+   {
+     "end": 30,
+     "start": 0,
+   },
+ ]

 ❯ checkWithoutMutation src/booking.test.ts:32:33
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
     32|   expect.soft(request.bookings).toStrictEqual(before);
       |                                 ^
     33| 
     34|   return decision;
 ❯ src/booking.test.ts:182:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[13/23]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B06: AC2 allows 119 minutes
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 839,
+     "start": 720,
+   },
  ]

 ❯ checkWithoutMutation src/booking.test.ts:31:33
     29|   const decision = canBook(request);
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
       |                                 ^
     32|   expect.soft(request.bookings).toStrictEqual(before);
     33| 
 ❯ src/booking.test.ts:201:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[14/23]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B06: AC2 allows 119 minutes
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 839,
+     "start": 720,
+   },
  ]

 ❯ checkWithoutMutation src/booking.test.ts:32:33
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
     32|   expect.soft(request.bookings).toStrictEqual(before);
       |                                 ^
     33| 
     34|   return decision;
 ❯ src/booking.test.ts:201:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[15/23]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B07: AC1 allows a one-minute duration
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 721,
+     "start": 720,
+   },
  ]

 ❯ checkWithoutMutation src/booking.test.ts:31:33
     29|   const decision = canBook(request);
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
       |                                 ^
     32|   expect.soft(request.bookings).toStrictEqual(before);
     33| 
 ❯ src/booking.test.ts:207:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[16/23]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B07: AC1 allows a one-minute duration
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 721,
+     "start": 720,
+   },
  ]

 ❯ checkWithoutMutation src/booking.test.ts:32:33
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
     32|   expect.soft(request.bookings).toStrictEqual(before);
       |                                 ^
     33| 
     34|   return decision;
 ❯ src/booking.test.ts:207:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[17/23]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B10: AC4 allows a request separated before a booking
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 599,
+     "start": 570,
+   },
  ]

 ❯ checkWithoutMutation src/booking.test.ts:31:33
     29|   const decision = canBook(request);
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
       |                                 ^
     32|   expect.soft(request.bookings).toStrictEqual(before);
     33| 
 ❯ src/booking.test.ts:225:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[18/23]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B10: AC4 allows a request separated before a booking
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 599,
+     "start": 570,
+   },
  ]

 ❯ checkWithoutMutation src/booking.test.ts:32:33
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
     32|   expect.soft(request.bookings).toStrictEqual(before);
       |                                 ^
     33| 
     34|   return decision;
 ❯ src/booking.test.ts:225:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[19/23]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B11: AC4 allows a request separated after a booking
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 720,
+     "start": 661,
+   },
  ]

 ❯ checkWithoutMutation src/booking.test.ts:31:33
     29|   const decision = canBook(request);
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
       |                                 ^
     32|   expect.soft(request.bookings).toStrictEqual(before);
     33| 
 ❯ src/booking.test.ts:231:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[20/23]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B11: AC4 allows a request separated after a booking
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 720,
+     "start": 661,
+   },
  ]

 ❯ checkWithoutMutation src/booking.test.ts:32:33
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
     32|   expect.soft(request.bookings).toStrictEqual(before);
       |                                 ^
     33| 
     34|   return decision;
 ❯ src/booking.test.ts:231:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[21/23]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > AC5: repeated available checks preserve unsorted booking data
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:266:32
    264| 
    265|     const firstDecision = checkWithoutMutation(request);
    266|     expect.soft(firstDecision).toBe(true);
       |                                ^
    267|     expect.soft(originalBookings).toStrictEqual(before);
    268|     expect.soft(request.bookings).toStrictEqual(before);

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[22/23]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > AC5: repeated available checks preserve unsorted booking data
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:271:33
    269| 
    270|     const secondDecision = checkWithoutMutation(request);
    271|     expect.soft(secondDecision).toBe(true);
       |                                 ^
    272|     expect.soft(originalBookings).toStrictEqual(before);
    273|     expect.soft(request.bookings).toStrictEqual(before);

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[23/23]⎯


 Test Files  1 failed (1)
      Tests  13 failed | 17 passed (30)
   Start at  16:32:33
```

### 2.3 One failing test per bug

Add the two regression tests from README Part 1, step 5: one named `BUG-A` and one named `BUG-B`.
Run them **on the buggy code**. Both must fail here. That is the evidence that each test can see
its bug.

```text

ernarberenbaj@MacBook-Air-10 app % cd ~/Documents/kbtu/se-practice/week-08/app &&
cmdand> npx vitest run --reporter=verbose

 RUN  v3.2.4 /Users/ernarberenbaj/Documents/kbtu/se-practice/week-08/app

 ❯ src/booking.test.ts (32 tests | 15 failed) 14ms
   ❯ canBook — reviewed decisions and booking data preservation (32)
     × T01: AC4 allows touching after an existing booking 4ms
     ✓ T02: AC1 rejects a start equal to now 0ms
     ✓ T03: AC1 rejects zero duration 0ms
     ✓ T04: AC1 rejects a reversed interval 0ms
     ✓ T05: AC1 rejects an end past 1440 0ms
     × T06: AC2 allows exactly 120 minutes 2ms
     ✓ T07: AC2 rejects 121 minutes 0ms
     × T08: AC4 allows touching before an existing booking 0ms
     ✓ T09: AC4 rejects partial overlap 0ms
     ✓ T10: AC4 rejects a request containing an existing booking 0ms
     ✓ T11: AC4 rejects a request inside an existing booking 0ms
     ✓ T12: AC4 rejects an identical interval 0ms
     ✓ T13: AC3 rejects an otherwise valid request when blocked 0ms
     × T14: AC4 allows a valid request with no existing bookings 1ms
     × X1: AC1 allows an end exactly at 1440 0ms
     × X2: AC4 allows touching both neighbouring bookings 0ms
     ✓ B01: AC1 rejects a negative start 0ms
     ✓ B02: AC1 rejects a start before now 0ms
     × B03: AC1 allows a start one minute after now 1ms
     × B04: AC1 allows start zero with an earlier supplied now 0ms
     ✓ B05: AC4 rejects overlap in the second unsorted booking 0ms
     × B06: AC2 allows 119 minutes 0ms
     × B07: AC1 allows a one-minute duration 1ms
     ✓ B08: AC4 rejects overlap with the first minute of a booking 0ms
     ✓ B09: AC4 rejects overlap with the last minute of a booking 0ms
     × B10: AC4 allows a request separated before a booking 0ms
     × B11: AC4 allows a request separated after a booking 0ms
     ✓ B12: AC3 rejects a blocked room with no existing bookings 0ms
     ✓ B13: AC1 respects a different supplied current time 0ms
     × AC5: repeated available checks preserve unsorted booking data 0ms
     × BUG-A: allows a one-minute gap between two unsorted bookings 0ms
     × BUG-B: an available request preserves the existing bookings 0ms

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 15 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T01: AC4 allows touching after an existing booking
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:41:43
     39|     const request = fixture({ start: 660, end: 720 });
     40| 
     41|     expect(checkWithoutMutation(request)).toBe(true);
       |                                           ^
     42|   });
     43| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/25]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T06: AC2 allows exactly 120 minutes
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 840,
+     "start": 720,
+   },
  ]

 ❯ checkWithoutMutation src/booking.test.ts:31:33
     29|   const decision = canBook(request);
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
       |                                 ^
     32|   expect.soft(request.bookings).toStrictEqual(before);
     33| 
 ❯ src/booking.test.ts:71:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/25]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T06: AC2 allows exactly 120 minutes
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 840,
+     "start": 720,
+   },
  ]

 ❯ checkWithoutMutation src/booking.test.ts:32:33
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
     32|   expect.soft(request.bookings).toStrictEqual(before);
       |                                 ^
     33| 
     34|   return decision;
 ❯ src/booking.test.ts:71:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/25]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T08: AC4 allows touching before an existing booking
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:83:43
     81|     const request = fixture({ start: 570, end: 600 });
     82| 
     83|     expect(checkWithoutMutation(request)).toBe(true);
       |                                           ^
     84|   });
     85| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[4/25]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T14: AC4 allows a valid request with no existing bookings
AssertionError: expected [ { start: 630, end: 690 } ] to strictly equal []

- Expected
+ Received

- []
+ [
+   {
+     "end": 690,
+     "start": 630,
+   },
+ ]

 ❯ checkWithoutMutation src/booking.test.ts:31:33
     29|   const decision = canBook(request);
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
       |                                 ^
     32|   expect.soft(request.bookings).toStrictEqual(before);
     33| 
 ❯ src/booking.test.ts:127:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[5/25]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T14: AC4 allows a valid request with no existing bookings
AssertionError: expected [ { start: 630, end: 690 } ] to strictly equal []

- Expected
+ Received

- []
+ [
+   {
+     "end": 690,
+     "start": 630,
+   },
+ ]

 ❯ checkWithoutMutation src/booking.test.ts:32:33
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
     32|   expect.soft(request.bookings).toStrictEqual(before);
       |                                 ^
     33| 
     34|   return decision;
 ❯ src/booking.test.ts:127:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[6/25]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > X1: AC1 allows an end exactly at 1440
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 1440,
+     "start": 1380,
+   },
  ]

 ❯ checkWithoutMutation src/booking.test.ts:31:33
     29|   const decision = canBook(request);
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
       |                                 ^
     32|   expect.soft(request.bookings).toStrictEqual(before);
     33| 
 ❯ src/booking.test.ts:133:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[7/25]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > X1: AC1 allows an end exactly at 1440
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 1440,
+     "start": 1380,
+   },
  ]

 ❯ checkWithoutMutation src/booking.test.ts:32:33
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
     32|   expect.soft(request.bookings).toStrictEqual(before);
       |                                 ^
     33| 
     34|   return decision;
 ❯ src/booking.test.ts:133:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[8/25]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > X2: AC4 allows touching both neighbouring bookings
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:146:43
    144|     });
    145| 
    146|     expect(checkWithoutMutation(request)).toBe(true);
       |                                           ^
    147|   });
    148| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[9/25]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B03: AC1 allows a start one minute after now
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 570,
+     "start": 541,
+   },
  ]

 ❯ checkWithoutMutation src/booking.test.ts:31:33
     29|   const decision = canBook(request);
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
       |                                 ^
     32|   expect.soft(request.bookings).toStrictEqual(before);
     33| 
 ❯ src/booking.test.ts:170:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[10/25]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B03: AC1 allows a start one minute after now
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 570,
+     "start": 541,
+   },
  ]

 ❯ checkWithoutMutation src/booking.test.ts:32:33
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
     32|   expect.soft(request.bookings).toStrictEqual(before);
       |                                 ^
     33| 
     34|   return decision;
 ❯ src/booking.test.ts:170:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[11/25]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B04: AC1 allows start zero with an earlier supplied now
AssertionError: expected [ { start: +0, end: 30 } ] to strictly equal []

- Expected
+ Received

- []
+ [
+   {
+     "end": 30,
+     "start": 0,
+   },
+ ]

 ❯ checkWithoutMutation src/booking.test.ts:31:33
     29|   const decision = canBook(request);
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
       |                                 ^
     32|   expect.soft(request.bookings).toStrictEqual(before);
     33| 
 ❯ src/booking.test.ts:182:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[12/25]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B04: AC1 allows start zero with an earlier supplied now
AssertionError: expected [ { start: +0, end: 30 } ] to strictly equal []

- Expected
+ Received

- []
+ [
+   {
+     "end": 30,
+     "start": 0,
+   },
+ ]

 ❯ checkWithoutMutation src/booking.test.ts:32:33
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
     32|   expect.soft(request.bookings).toStrictEqual(before);
       |                                 ^
     33| 
     34|   return decision;
 ❯ src/booking.test.ts:182:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[13/25]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B06: AC2 allows 119 minutes
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 839,
+     "start": 720,
+   },
  ]

 ❯ checkWithoutMutation src/booking.test.ts:31:33
     29|   const decision = canBook(request);
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
       |                                 ^
     32|   expect.soft(request.bookings).toStrictEqual(before);
     33| 
 ❯ src/booking.test.ts:201:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[14/25]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B06: AC2 allows 119 minutes
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 839,
+     "start": 720,
+   },
  ]

 ❯ checkWithoutMutation src/booking.test.ts:32:33
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
     32|   expect.soft(request.bookings).toStrictEqual(before);
       |                                 ^
     33| 
     34|   return decision;
 ❯ src/booking.test.ts:201:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[15/25]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B07: AC1 allows a one-minute duration
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 721,
+     "start": 720,
+   },
  ]

 ❯ checkWithoutMutation src/booking.test.ts:31:33
     29|   const decision = canBook(request);
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
       |                                 ^
     32|   expect.soft(request.bookings).toStrictEqual(before);
     33| 
 ❯ src/booking.test.ts:207:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[16/25]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B07: AC1 allows a one-minute duration
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 721,
+     "start": 720,
+   },
  ]

 ❯ checkWithoutMutation src/booking.test.ts:32:33
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
     32|   expect.soft(request.bookings).toStrictEqual(before);
       |                                 ^
     33| 
     34|   return decision;
 ❯ src/booking.test.ts:207:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[17/25]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B10: AC4 allows a request separated before a booking
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 599,
+     "start": 570,
+   },
  ]

 ❯ checkWithoutMutation src/booking.test.ts:31:33
     29|   const decision = canBook(request);
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
       |                                 ^
     32|   expect.soft(request.bookings).toStrictEqual(before);
     33| 
 ❯ src/booking.test.ts:225:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[18/25]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B10: AC4 allows a request separated before a booking
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 599,
+     "start": 570,
+   },
  ]

 ❯ checkWithoutMutation src/booking.test.ts:32:33
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
     32|   expect.soft(request.bookings).toStrictEqual(before);
       |                                 ^
     33| 
     34|   return decision;
 ❯ src/booking.test.ts:225:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[19/25]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B11: AC4 allows a request separated after a booking
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 720,
+     "start": 661,
+   },
  ]

 ❯ checkWithoutMutation src/booking.test.ts:31:33
     29|   const decision = canBook(request);
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
       |                                 ^
     32|   expect.soft(request.bookings).toStrictEqual(before);
     33| 
 ❯ src/booking.test.ts:231:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[20/25]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > B11: AC4 allows a request separated after a booking
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to strictly equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 720,
+     "start": 661,
+   },
  ]

 ❯ checkWithoutMutation src/booking.test.ts:32:33
     30| 
     31|   expect.soft(originalBookings).toStrictEqual(before);
     32|   expect.soft(request.bookings).toStrictEqual(before);
       |                                 ^
     33| 
     34|   return decision;
 ❯ src/booking.test.ts:231:12

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[21/25]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > AC5: repeated available checks preserve unsorted booking data
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:266:32
    264| 
    265|     const firstDecision = checkWithoutMutation(request);
    266|     expect.soft(firstDecision).toBe(true);
       |                                ^
    267|     expect.soft(originalBookings).toStrictEqual(before);
    268|     expect.soft(request.bookings).toStrictEqual(before);

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[22/25]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > AC5: repeated available checks preserve unsorted booking data
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:271:33
    269| 
    270|     const secondDecision = checkWithoutMutation(request);
    271|     expect.soft(secondDecision).toBe(true);
       |                                 ^
    272|     expect.soft(originalBookings).toStrictEqual(before);
    273|     expect.soft(request.bookings).toStrictEqual(before);

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[23/25]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > BUG-A: allows a one-minute gap between two unsorted bookings
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ src/booking.test.ts:282:7
    280|     expect(
    281|       canBook({start: 660, end: 661, now:540, blocked: false,bookings}),
    282|     ).toBe(true);
       |       ^
    283|   });
    284| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[24/25]⎯

 FAIL  src/booking.test.ts > canBook — reviewed decisions and booking data preservation > BUG-B: an available request preserves the existing bookings
AssertionError: expected [ { start: 600, end: 660 }, …(1) ] to deeply equal [ { start: 600, end: 660 } ]

- Expected
+ Received

  [
    {
      "end": 660,
      "start": 600,
    },
+   {
+     "end": 780,
+     "start": 720,
+   },
  ]

 ❯ src/booking.test.ts:293:22
    291| 
    292|     ).toBe(true);
    293|     expect(bookings).toEqual(before);
       |                      ^
    294|   });
    295| 

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[25/25]⎯


 Test Files  1 failed (1)
      Tests  15 failed | 17 passed (32)
   Start at  17:29:40
   Duration  302ms (transform 32ms, setup 0ms, collect 28ms, tests 14ms, environment 0ms, prepare 51ms)

```

---

## 3. Defect log

One row per defect. At least **BUG-A and BUG-B**. "Suspected cause" is your hypothesis
**before** you ask any assistant: the line and why.

| Defect | Test ID | Input | Expected | Actual | Suspected cause (line and why) |
| --- | --- | --- | --- | --- | --- |
| BUG-A | BUG-A | Request 660–661, now = 540, room unblocked, two bookings touching the request at its endpoints | `true` under AC4 | Returned `false` | The overlap condition uses `<=` and `>=`, so equal endpoints are treated as an overlap. |
| BUG-B | BUG-B | Request 720–780, room unblocked, existing booking 600–660 | `true`, with the original array unchanged under AC5 | Returned `true` and appended the request to the array | `bookings.push({ start, end })` writes directly to the caller's array. |
---

## 4. Tasks 2–3 — the skill

**The checks from the deck, before you zip it.** Answer each one yes / no:

| Check | yes / no |
| --- | --- |
| The file is plain UTF-8 text, named exactly `SKILL.md` (not `SKILL.md.txt`) | yes  |
| The first and the closing YAML delimiter are exactly three hyphens: `---` | yes |
| `name` is lowercase with hyphens, and `description` says WHEN to use it | yes |
| I read the whole file once: no passwords, API keys or private student data | yes |

**The contents of `skills/bug-detector.zip`.** Paste the listing (Windows: open the ZIP and copy
the paths; macOS/Linux: `unzip -l skills/bug-detector.zip`):PK    e�p]���a  9    bug-detector/SKILL.mdUT	 m��jo��jux �     m�Mj1��s
A�C�!�6��Zz ��LDflc�Ir��n]tcғ����}�q�
���;�R�(��Q8�
lG2Ֆ�.���68�����(�-�*�#�w0 O�.�%��1�yHtb:�ʁ`7cx�9���md�[���t�e��/d�Z�{
�\I��� t�����}�t�o0ՙ�
c
����rhDy�iRf����}�l�},b�;����4-�B�X�dݕh�zѲ�l�{;��P�-��Ӭ ���aHa���̵�A��8V�J�H0�e��P� ^��c���B
�hj$�^u��(gͯ�ߘ�uU�\&U<x+��6?$p����8�-]�r}�,�PK    e�p]���a  9           ��    bug-detector/SKILL.mdUT m��jux �     PK      [   �    

```text
I used a prompt-only simulation in ChatGPT. I sent the contents of SKILL.md as the first message in a fresh chat and captured the setup in evidence/install.png.
```

**Installation.** Where you uploaded it, what the upload said, and whether a new chat showed the
skill as enabled. If upload was not available, write `prompt-only simulation` and say why.
Screenshot of the result: `evidence/install.png`.

<!-- Write below this line -->

---

## 5. Task 4 — without the skill

A **fresh chat, with no skill enabled**. Paste exactly what you sent: the deck's question, then
the same input you will use in section 6 (AC1–AC6, the failing test output, the code of
`canBook`):

```text
Find the root cause of the failed room-booking test. Propose minimal patch and regression test. Do not edit code.

Acceptance criteria:
AC1 Reject start ≥ end and requests in the past.
AC2 Enforce the maximum allowed duration (120 minutes).
AC3 Reject a blocked room.
AC4 Reject overlaps; allow bookings that only touch at endpoints.
AC5 Return Available / Unavailable without changing booking data.
AC6 Preserve clear UI feedback on desktop and mobile.

Observed failure from the original suite:
FAIL src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T01: AC4 allows touching after an existing booking
AssertionError: expected false to be true // Object.is equality

Provided canBook:

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
    if (start <= b.end && end >= b.start) return false;
  }
  // keep the room's list current with the slot that was just found free
  bookings.push({ start, end });
  return true;
}
```

**The assistant's answer, pasted unedited:**

```text
Root cause: The overlap check uses <= and >=, so it counts shared endpoints as an overlap. For an existing booking from 600 to 660 and a request from 660 to 720, start <= b.end is true because both values are 660. The function returns false, violating AC4.

Minimal patch: Use strict comparisons. Also remove the push and its comment. The push is a separate AC5 defect that the T01 failure currently masks. Once the overlap check is fixed, a successful check would otherwise change the room’s bookings.
-    if (start <= b.end && end >= b.start) return false;
+    if (start < b.end && end > b.start) return false;
   }
-  // keep the room's list current with the slot that was just found free
-  bookings.push({ start, end });
   return true;

Regression test: Keep the original T01 and add a booking-preservation assertion if it lacks one.
it("T01: AC4 allows touching after an existing booking", () => {
  const bookings = [{ start: 600, end: 660 }];

  const result = canBook({
    start: 660,
    end: 720,
    now: 540,
    blocked: false,
    bookings,
  });

  expect(result).toBe(true);
  expect(bookings).toEqual([{ start: 600, end: 660 }]);
});

The first assertion catches the endpoint bug. The second catches a patch that fixes the comparison but leaves the push in place. No code was edited or tests run.
```

---

## 6. Task 5 — with the skill

**Another fresh chat, with `bug-detector` enabled.** Send exactly the same input as in section 5.
Only the question changes, to the deck's skill question:

```text
Use the bug-detector skill to diagnose the failed room-booking test.

Acceptance criteria:
AC1 Reject start ≥ end and requests in the past.
AC2 Enforce the maximum allowed duration (120 minutes).
AC3 Reject a blocked room.
AC4 Reject overlaps; allow bookings that only touch at endpoints.
AC5 Return Available / Unavailable without changing booking data.
AC6 Preserve clear UI feedback on desktop and mobile.

Observed failure from the original suite:
FAIL src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T01: AC4 allows touching after an existing booking
AssertionError: expected false to be true // Object.is equality

Provided canBook:

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
    if (start <= b.end && end >= b.start) return false;
  }
  // keep the room's list current with the slot that was just found free
  bookings.push({ start, end });
  return true;
}
```

**The assistant's answer, pasted unedited:**

```text
T01 fails because the overlap check treats a shared endpoint as an overlap. For an existing booking from 600 to 660 and a request from 660 to 720, the expression 660 <= 660 && 720 >= 600 is true, so canBook returns false. AC4 requires true.
Defect	Evidence	Root cause	Minimal fix	Regression test
AC4 · Touching bookings are rejected	With now = 540, blocked = false, and one existing booking 600–660, the request 660–720 passes all preliminary checks and fails in the overlap loop.	start <= b.end && end >= b.start counts equality as overlap.	Use start < b.end && end > b.start.	Expect 660–720 and 540–600 to return true with now = 539. Expect 659–720 to return false because it overlaps by one minute. Use fresh booking data for each case.
AC5 · A successful check changes booking data	A free request such as 720–780 reaches bookings.push(...), appending the proposed slot to the caller’s array.	The availability check writes to the same array it receives.	Remove bookings.push({ start, end }) and its comment.	Call canBook twice with 720–780 and the same array [{ start: 600, end: 660 }]. Expect true both times and verify the array still equals its original contents after each call.


Both defects follow directly from tracing the supplied code. I did not edit the code or run the suite.
```

Did the environment show that the skill was invoked? yes / no / not shown

---

## 7. Comparison — judged against the actual code

Do not assume the skill did better. Judge both answers against the code and against what your
tests showed. Write a short verdict in each cell, and give a reason where they differ.

| Criterion | No skill | With skill |
| --- | --- | --- |
| Correct root cause | Correctly identified the inclusive overlap check as the cause of T01 and identified `bookings.push(...)` as a separate AC5 defect. | Correctly identified both causes and traced the endpoint case using `660 <= 660` and `720 >= 600`. |
| Reproducible test | Gave a complete Vitest example for 660–720. The availability assertion catches BUG-A. The mutation assertion can catch BUG-B after BUG-A is fixed. | Gave concrete cases for touching and overlapping intervals. The separate 720–780 request can expose BUG-B while BUG-A is still present, as the failing BUG-B test in §2.3 showed. |
| Minimal proposed patch | Proposed strict overlap comparisons and removal of the push and its comment. Both changes appeared in one diff. | Proposed the same changes in separate rows, making it easier to review and apply each fix separately. |
| Unsupported claims | No unsupported claims about execution. The answer explicitly said no code was edited and no tests were run. | No unsupported claims about execution. The answer explicitly said no code was edited and the suite was not run. |
| Clarity of explanation | Clear explanation and a complete test snippet. | The table made it easy to match each defect with its evidence, fix, and regression test. |

**Which bugs did each answer find?** Both answers found BUG-A and BUG-B. The main difference was that the answer with the skill simulation proposed a separate test that could expose BUG-B before BUG-A was fixed.

**Which bugs did each answer find?** Both answers found BUG-A and BUG-B. The main difference was that the answer with the skill simulation proposed a separate test that could expose BUG-B before BUG-A was fixed.

-

---

## 8. Task 6 — repair and regression

Review the proposed patch yourself, then make **one minimal change per bug**, one commit each.
Rerun the test that was failing, then the full suite.

### 8.1 The BUG-A patch

The change as a diff (`git diff`, or the old and the new line), then the real run:

```text
-    if (start <= b.end && end >= b.start) return false;
+    if (start < b.end && end > b.start) return false;
 RUN  v3.2.4 /Users/ernarberenbaj/Documents/kbtu/se-practice/week-08/app

 ✓ src/booking.test.ts (32 tests | 31 skipped) 1ms
   ✓ canBook — reviewed decisions and booking data preservation (32)
     ↓ T01: AC4 allows touching after an existing booking
     ↓ T02: AC1 rejects a start equal to now
     ↓ T03: AC1 rejects zero duration
     ↓ T04: AC1 rejects a reversed interval
     ↓ T05: AC1 rejects an end past 1440
     ↓ T06: AC2 allows exactly 120 minutes
     ↓ T07: AC2 rejects 121 minutes
     ↓ T08: AC4 allows touching before an existing booking
     ↓ T09: AC4 rejects partial overlap
     ↓ T10: AC4 rejects a request containing an existing booking
     ↓ T11: AC4 rejects a request inside an existing booking
     ↓ T12: AC4 rejects an identical interval
     ↓ T13: AC3 rejects an otherwise valid request when blocked
     ↓ T14: AC4 allows a valid request with no existing bookings
     ↓ X1: AC1 allows an end exactly at 1440
     ↓ X2: AC4 allows touching both neighbouring bookings
     ↓ B01: AC1 rejects a negative start
     ↓ B02: AC1 rejects a start before now
     ↓ B03: AC1 allows a start one minute after now
     ↓ B04: AC1 allows start zero with an earlier supplied now
     ↓ B05: AC4 rejects overlap in the second unsorted booking
     ↓ B06: AC2 allows 119 minutes
     ↓ B07: AC1 allows a one-minute duration
     ↓ B08: AC4 rejects overlap with the first minute of a booking
     ↓ B09: AC4 rejects overlap with the last minute of a booking
     ↓ B10: AC4 allows a request separated before a booking
     ↓ B11: AC4 allows a request separated after a booking
     ↓ B12: AC3 rejects a blocked room with no existing bookings
     ↓ B13: AC1 respects a different supplied current time
     ↓ AC5: repeated available checks preserve unsorted booking data
     ✓ BUG-A: allows a one-minute gap between two unsorted bookings 1ms
     ↓ BUG-B: an available request preserves the existing bookings

 Test Files  1 passed (1)
      Tests  1 passed | 31 skipped (32)
   Start at  16:49:56
```

### 8.2 The BUG-B patch and the final run

The change as a diff, then the real output of the **full** suite. Every test must pass.

```text
-  // keep the room's list current with the slot that was just found free
-  bookings.push({ start, end });
RUN  v3.2.4 /Users/ernarberenbaj/Documents/kbtu/se-practice/week-08/app

 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T01: AC4 allows touching after an existing booking 1ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T02: AC1 rejects a start equal to now 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T03: AC1 rejects zero duration 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T04: AC1 rejects a reversed interval 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T05: AC1 rejects an end past 1440 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T06: AC2 allows exactly 120 minutes 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T07: AC2 rejects 121 minutes 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T08: AC4 allows touching before an existing booking 0ms
 ✓ src/booking.test.ts > canBook — reviewed decisions and booking data preservation > T09: AC4 rejects partial overlap 0ms
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

 Test Files  1 passed (1)
      Tests  32 passed (32)
   Start at  16:51:07
   Duration  233ms (transform 24ms, setup 0ms, collect 23ms, tests 4ms, environment 0ms, prepare 44ms)
```

---

## 9. What still fails, and what AI-assisted debugging cannot do

### 9.1 Checks I am keeping as FAIL or ERROR

| Check | Why it stays |
| --- | --- |
| Pending | I will update this section after rerunning the checker. |

### 9.2 One limitation of AI-assisted debugging

Both ChatGPT answers traced the supplied function and proposed fixes using the failure output. I still had to run Vitest locally to verify the changes against my full test suite.

---

## 10. Conclusion (80–150 words)

Both answers found the endpoint bug and the mutation bug, and the skill simulation helped most in the reproducible-test row of section 7. The answer with the simulation proposed a separate 720–780 request that could expose the mutation even while touching requests were still rejected. Both regression tests failed on the buggy code, and all 32 tests passed after I applied the two fixes separately. The runs confirmed that touching requests were allowed and booking data stayed unchanged for the tested cases, while the desktop and mobile layout remained outside the scope of these unit tests.