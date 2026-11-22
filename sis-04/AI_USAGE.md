# AI Usage Disclosure — SIS #04

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Date | Used for | Which files it touched |
| --- | --- | --- | --- | --- |
| ChatGPT | GPT-6.2 Sol | 2026-11-22 | Reviewed the Week 08 baseline and suggested maintainability risks for Task 1. | `report.md` |
| ChatGPT | GPT-6.2 Sol | 2026-11-22 | Helped order the implementation steps and review the catalog extraction plan. | `report.md` |
| ChatGPT | GPT-6.2 Sol | 2026-11-22 | Proposed the four-room catalog, filtering logic, availability checks, and UI changes for Task 2. | `app/src/rooms.ts`, `app/src/filter.ts`, `app/src/booking.ts`, `app/src/App.tsx` |
| ChatGPT | GPT-6.2 Sol | 2026-11-22 | Helped separate module responsibilities and draft the before and after diagrams for Task 3. | `app/src/rooms.ts`, `app/src/booking.ts`, `diagrams/before.puml`, `diagrams/after.puml`, `report.md` |
| ChatGPT | GPT-6.2 Sol | 2026-11-22 | Helped write room checks, filter tests, booking boundary assertions, and an integration test for Task 4. | `app/src/booking.test.ts`, `app/src/checkRoom.test.ts`, `app/src/filter.test.ts`, `app/src/booking-boundaries.test.ts` |
| ChatGPT | GPT-6.2 Sol | 2026-11-22 | Drafted report wording, provided a reflection draft for reference, and helped prepare the declaration and run instructions. | `report.md`, `submission.yml`, `app/README.md`, `AI_USAGE.md` |

<!-- Delete rows you did not use the assistant for; add rows for anything else. The optional
     extension (an existing skill or a read-only MCP server) goes here too, with its permissions. -->

**The assistant wrote, or helped write, tests in `app/`:** yes 
I checked the expected values against the assignment rules

**Every run pasted in report.md was produced by my code on my machine (or Codespace), unedited:** yes

**Every number in report.md section 7 was measured the way its row says:** yes 

**I shared no credentials, keys or private data with any tool:** yes 

**Everything I submitted, I can explain and defend in class — including filterRooms, checkRoom and
why each module exists:** yes 

**Anything I accepted from the AI without fully understanding it:**
None

Signed: Berenbay Yernar
Date: 22-11-2026
