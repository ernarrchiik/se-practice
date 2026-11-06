# AI Usage Disclosure — Week 07

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Used for | Which files it touched |
| --- | --- | --- | --- |
|ChatGPT |GPT-6.1 Sol | Generating the first 22-test suite |suites/first/booking.test.ts; app/src/booking.test.ts |
|ChatGPT |GPT-6.1 Sol | Reviewing and improving the suite to 30 separately declared tests |app/src/booking.test.ts  |
|ChatGPT |GPT-6.1 Sol |Extracting canBook, explaining tests, preparing mutation commands, drafting the report and disclosure |app/src/booking.ts; app/src/App.tsx; lab-report.md; AI_USAGE.md |

**I used an assistant to extract `canBook` (Task 1), or to fix a defect in it:** yes 
<!-- If "yes": which change, in which file, and how you checked that the behaviour did not change. -->
The assistant supplied the extracted function in `app/src/booking.ts` and instructions for importing and calling it from `app/src/App.tsx`. The original conditions were preserved. I checked Available for 11:00–12:00 and Unavailable when the room was blocked. No implementation fix was needed after the first test run.
**I used another assistant as well (to explain a failure, to draft text in lab-report.md, …):** No
<!-- If "yes": which one, the exact model, and for which section. -->

**`suites/first/` holds the assistant's first test file exactly as it generated it:** yes 


**Every terminal output in lab-report.md was pasted from a real run, unedited:** yes 

**I can explain every test in my final suite — its input, its expected result and the AC behind
it — without the assistant:** yes 

**Anything I accepted from the AI without fully understanding it:**
None

Signed: Berenbay Yernar
Date: 6 November 2026
