<<<<<<< HEAD
# SIS #02 — AI-Assisted UML Modeling: University Course Registration

**AI-Driven Software Engineering · KBTU SITE · Fall 2026**
**SIS #02 · 2 points · individual · deadline Sunday 18 October 2026, 23:59**
**AI use: required** — Level D, and the working process below is built around it.

> **Your choice, frozen once made.** Use any AI assistant you have access to — ChatGPT, Claude,
> Gemini, DeepSeek or another. One assistant is enough for all four prompts. Record the **exact
> model** it shows: "ChatGPT" is a tool, not a model. If the tool does not show the model, write
> `not displayed` — that is an accepted answer.
>
> **What stays identical for everyone:** the scenario, rules R1–R5, the four prompts word for word
> except their bracketed fields, the four validation cases, the word limits, the evidence tables,
> the four class names `Student`, `Course`, `CourseOffering`, `Enrollment`, and the file names in
> this folder. That is what makes forty sets of diagrams comparable and gradeable.
>
> **No code, and no language choice this time.** A working application is not required. Both
> diagrams are **PlantUML** for everyone, because the checker reads the source.

This is **Assignment #02** of the course — the same scenario, rules, prompts and validation cases
that every group receives. The report is a Markdown file and the diagrams are PlantUML files in
your repository; you get a checker you can run yourself, and the rubric is written below.

**The submission is the link to your open pull request, pasted into the Teams assignment** — not a
file upload.

---

## What you hand in

```
sis-02/
├── README.md               this file — read-only
├── report.md               ← the ONLY file you write prose in: 13 numbered sections,
│                             appendices included
├── AI_USAGE.md             ← your AI disclosure, as every week
├── submission.yml          ← the declaration: facts only, filled in last (§13)
├── models/
│   ├── sequence.puml       ← your FINAL sequence diagram
│   ├── classes.puml        ← your FINAL class diagram — classes, plural
│   ├── original/
│   │   ├── sequence.puml   ← the AI's first sequence diagram (Prompt B), unedited
│   │   └── classes.puml    ← the AI's first class diagram (Prompt B), unedited
│   └── img/
│       ├── sequence.png              renders of the four files above,
│       ├── classes.png               .png or .svg, these exact names
│       ├── original-sequence.png
│       └── original-classes.png
└── tests/
    ├── check_sis.py              checks the SHAPE of report.md and models/ — do not edit
    └── validate_submission.py    checks submission.yml against them — do not edit
```

**Time:** plan for about 5–6 hours in total, spread over at least two days. The walkthroughs
(§8) and the source checks (§10) take longer than the prompts.

---

## 1. The system (read it twice)

Use only this scenario and these rules. Treat anything else the assistant suggests as a proposal
you accept or reject — explicitly, in section 7.

> A student browses an electronic course catalog, chooses a course offering and requests
> registration. Each offering has a limited number of places.
>
> A Course describes a subject. A CourseOffering is one scheduled section in one semester.
> Registration always targets a specific offering.
>
> Assume that the student is signed in, the selected offering exists, and its capacity is a
> positive whole number.
>
> Exclude payments, prerequisites, timetable clashes, waiting lists and cancellation. Use
> fictional students and courses.

| Rule | |
| --- | --- |
| **R1. Catalog** | Show the course code, title, offering and available places for one semester. |
| **R2. Capacity** | Recheck current availability when registering. Enrollment must never exceed the offering's capacity. |
| **R3. Duplicates** | A student may have at most one enrollment in the same offering. Reject a repeat request. |
| **R4. Success** | Create exactly one Enrollment linking the student and offering, update availability and return a confirmation. |
| **R5. Rejection** | Explain "course full" or "already enrolled". Create no enrollment and leave the enrollment count unchanged. |

These rules define this assignment. **A catalog view does not reserve a place.** Model the final
checks and enrollment creation as one atomic operation so competing requests cannot take the same
last place. A note describing the atomic operation is sufficient; database implementation is
outside this assignment.

## 2. The working process

| Stage | You do | The AI does | Evidence | Where it goes |
| --- | --- | --- | --- | --- |
| 0. Before AI | Write a short scope statement and your initial assumptions | — | first commit, pushed | §10 |
| A. Requirements | Approve scope and rule coverage; correct every criterion | Drafts 3 stories and 6 criteria | Prompt A + response | §11 B1 → §1, §2 |
| B. Modeling | Save, render and inspect both drafts | Drafts both UML diagrams | Prompt B + response; `models/original/` | §11 B2, §12 |
| C. Critique | Judge each suggestion yourself | Checks the models against the rules | Prompt C + response; your decisions | §11 B3, §7 |
| D. Revision | Validate and finalize the models; walk T1–T4 through them | Applies **your** accepted changes | Prompt D + response; final models | §11 B4, §3–§6 |
| Write | Explanation, reflection, source checks | — | | §8, §9, §13 |

At least **four exchanges**, saved with the exact prompts and complete responses.

**Commit as you go — three commits minimum; this is the order we expect to see:**

```
git commit -m "sis-02: scope and initial assumptions, before Prompt A"
git commit -m "sis-02: approved requirements and the AI's original diagrams"
git commit -m "sis-02: final models, walkthroughs, review and report"
git commit -m "sis-02: declaration"
```

The first commit, pushed before you run Prompt A, is your evidence that the baseline was yours.

## 3. Task 1 — the requirements baseline → `report.md` §10, §1, §2

1. **Before using AI**, fill section 10: a **Scope:** statement (15 words or more) and at least
   two numbered initial assumptions. Commit and push. Never edit section 10 again — your final
   version goes in section 1.
2. Run **Prompt A** (§4). Paste the scenario and R1–R5 where it says `[paste them]`, and your
   section 10 assumptions where it says `[paste]`.
3. Review all six criteria yourself. Correct ambiguity, **remove anything outside the scope**,
   and write the approved result into section 2 in the template's shape:

   ```
   ### US-02 — Register for an offering

   **US-02:** As a student, I want …, so that …

   - **AC-03** (R2, R4): Given …, When …, Then …
   - **AC-04** (R2, R4): Given …, When …, Then …
   ```

   Three stories — browsing offerings, registering, receiving a clear rejection — IDs `US-01` to
   `US-03`. Two criteria under each, IDs `AC-01` to `AC-06`, each naming the rule(s) it maps to.
   Between them, the six criteria must cover all of R1–R5.
4. Section 2 must not mention any excluded feature — payments, prerequisites, timetable clashes,
   waiting lists, cancellation. The checker searches for them by name. Say they are out of scope
   in section 1.

## 4. The four prompts — use them word for word

Replace **every** `[bracketed field]` with your own text, change nothing else, and run them in
order. Save the **complete** prompt you actually sent and the **complete** response, before
editing anything. The checker looks for fixed sentences from each prompt and for any bracket you
forgot.

**Prompt A — requirements** → §11, B1

```text
Act as a requirements analyst. Use only this course registration scenario and rules R1–R5: [paste them]. My initial assumptions are [paste].
Draft 3 user stories and 2 Given / When / Then acceptance criteria for each. Use IDs US-01 to US-03 and AC-01 to AC-06. Map each criterion to rule IDs.
Cover normal and rejection behavior. List uncertainty separately. Do not add excluded features or invent university policies.
```

Keep the first response before making corrections.

**Prompt B — UML drafts** → §11, B2. Under the prompt text, paste your **approved** section 2:
all three stories and all six criteria, with their IDs.

```text
Using my approved scenario, R1–R5, stories and criteria below, return separate PlantUML code blocks for a sequence diagram and a domain class diagram.
Sequence: include catalog browsing and guarded success, full-course and duplicate outcomes. Model final checks and creation as one atomic operation.
Class: show domain concepts, useful attributes and multiplicities. State the capacity and uniqueness constraints. Explain assumptions and any technical lifelines.
```

Copy the two PlantUML blocks of the response **unedited** into `models/original/sequence.puml`
and `models/original/classes.puml`. Commit.

**Prompt C — model critique** → §11, B3. Under the prompt text, paste both original PlantUML
blocks and your acceptance criteria. **Use a new chat** — an assistant critiquing its own draft
in the same conversation tends to defend it.

```text
Review these two UML models against R1–R5 and my acceptance criteria. Check message order, guards, state changes, multiplicities and naming.
Inspect the four validation cases: available places, exactly one place, full course after a stale catalog view, and duplicate registration.
For each issue, cite the affected rule and model element. Explain the impact and propose a focused correction. Separate genuine defects from optional design choices.
```

**The critique is another claim to evaluate, not a verdict.** Accept, reject or modify each point
yourself, and record the substantive ones in section 7.

**Prompt D — focused revision** → §11, B4

```text
Revise the UML sources using only my accepted review decisions: [list]. Keep justified existing elements and explain each change.
Preserve the agreed scope and rule IDs. Return both updated PlantUML blocks and a concise change log. Flag any unresolved issue.
Approved requirements: [paste]. Original sources: [paste]. My review decisions and evidence: [paste].
```

`Original sources: [paste]` is the two files in `models/original/`, in full. Then read the
revision, **edit it yourself where it is still wrong**, and save the result as
`models/sequence.puml` and `models/classes.puml`.

## 5. Task 2 — the sequence diagram → `models/sequence.puml`, `report.md` §3

What it must show (his task, unchanged):

- catalog browsing, selection of an offering and the registration request;
- every participant declared and every message named;
- the **final duplicate and capacity checks before the Enrollment is created** — after the
  request, not only in the catalog view;
- success, full-course and duplicate alternatives, each labelled with a **guard**;
- the confirmation **after** successful creation;
- rejection paths that return a reason and **change no state**;
- the atomic operation, stated in a note or a group.

**How the checker reads it.** It cannot understand a diagram, so it reads words. Use them and it
needs no luck:

| Element | Write it like this | Checker |
| --- | --- | --- |
| participants | `actor Student`, `participant RegistrationService` … — declared before use | SQ1 |
| catalog, then request | a message naming the **catalog** or the **offerings**, then a message naming **register** or **enrol** | SQ2 |
| alternatives | `alt already enrolled` · `else course full` · `else not enrolled and places left` — **no square brackets**: PlantUML draws them itself, and `[already enrolled]` would become a broken link | SQ3 |
| the final checks | messages or guards naming the **duplicate** / **already** / **exists** check and the **capacity** / **count** / **places** check, between the request and the creation | SQ4 |
| creation | a message naming **create** (or insert / save) the Enrollment | SQ4–SQ6 |
| confirmation | a message naming **confirm**, after the creation | SQ5 |
| rejections | inside the full and duplicate branches: a message returning **course full** / **already enrolled**, and nothing that creates, saves, updates or confirms | SQ6, SQ7 |
| atomicity | a `note` or a `group` containing the word **atomic** (or a `critical` block) | SQ8 |

A guard that starts with `not` — `else not full`, `else not enrolled` — is read as a success
branch, not a rejection.

**Section 3** embeds the render and names the participants, the atomic step and the message that
creates the Enrollment. A service or repository lifeline that is not in the class diagram is fine
— **name it under Technical lifelines** and explain the difference in abstraction (CN1).

## 6. Task 3 — the class diagram → `models/classes.puml`, `report.md` §4

- **The four classes are required, spelled exactly** `Student`, `Course`, `CourseOffering`,
  `Enrollment`, so every diagram in the class can be compared. Any extra class needs a
  `' why: <reason>` comment on the line directly above its `class` line (CL6).
- Useful identifiers and attributes: at least a student identifier, `Course` code and title,
  `CourseOffering` semester and **capacity** (CL2). Operations only where they fit.
- Associations with **multiplicities at both ends** (CL3), written PlantUML's way:

  ```
  Student "1" -- "0..*" Enrollment : holds >
  CourseOffering "1" -- "0..*" Enrollment : receives >
  Course "1" -- "1..*" CourseOffering : is offered as >
  ```

  Each Enrollment links **one** student to **one** offering (CL4).
- **Capacity and uniqueness constraints stated separately**, in notes — multiplicity alone cannot
  express them (CL5):

  ```
  note "Capacity (R2): …" as N1
  N1 .. CourseOffering
  ```

**Section 4** embeds the render, reads **every association in both directions** — one table row
per association in your file (CN2) — explains how an Enrollment links a student to an offering,
and states the two constraints.

## 7. Render, save, embed

Render with the PlantUML web server (`https://www.plantuml.com/plantuml`), or an IDE extension if
you already have one working. Export each of the four files to `models/img/` under these names:
`sequence`, `classes`, `original-sequence`, `original-classes` — `.png` or `.svg` (F2).

The template already embeds them: §3 and §4 show the final diagrams, §12 the originals. If you
export `.svg`, change the extension in the link; the checker opens every link and fails one that
points nowhere (F3).

**Your final may be identical to the AI's original** — if the critique found no genuine defect
and your own walkthroughs pass. Then section 7 has to say what you verified and why you kept the
design. Do not invent an error to fill the log.

## 8. Validate the models → `report.md` §5, §6, §7

**The four validation cases** — walk each one through **your final sequence diagram**:

| Case | Starting state | Expected result |
| --- | --- | --- |
| **T1. Available** | Capacity 2, enrolled 0. New student. | Accept. Create one enrollment. Count becomes 1. |
| **T2. Last place** | Capacity 2, enrolled 1. New student. | Accept. Count becomes 2. No places remain. |
| **T3. Full** | Catalog showed a place. Current count is 2 of 2. | Reject as full. No new record. Count stays 2. |
| **T4. Duplicate** | Capacity 2, enrolled 1. That student requests again. | Reject as duplicate. Count stays 1. |

**Section 5 — traceability.** One row per rule, R1 to R5, including the catalog fields and
availability: the rule with the criteria that cover it (`R2 + AC-03, AC-05`), the model evidence
(a message, guard, class or constraint), and the T-ID that exercises it — or the extra check you
did instead, since R1 has no T case (T1).

**Section 6 — walkthroughs.** For each case, the **actual steps** through your diagram, message
by message, and the state change (10 words or more). The judgment starts with **Pass** or
**Fail**, then the location — the message, guard or note where you saw it (T2). **An honest Fail
is a finding, not a penalty**: report it, declare it in `submission.yml`, and fix it or explain
why you did not.

**Section 7 — review decisions.** At least three substantive decisions: the AI suggestion or
model element, your decision, your reason (a full sentence — 8 words or more), the affected rule
(T3). Fix genuine errors; a justified acceptance or rejection of advice also counts. The
assignment's own example:

> **Issue:** the AI confirms enrollment before the final capacity check.
> **Correction:** move the confirmation after successful creation and preserve the rejection path.

| Worthless | Worth something |
| --- | --- |
| "Sequence diagram — accepted — looks good — R4" | "Original: `confirm registration` sent before `countEnrollments` — moved after `createEnrollment`, success branch only — in T3 the student was told they were registered and then rejected as full — R4, R2" |

## 9. Explanation and reflection → `report.md` §8, §9

| Section | Content | Words |
| --- | --- | --- |
| 8. Modeling explanation | Your main design choices; how the class and sequence diagrams complement each other; why an activity diagram could also help explain the workflow | **200–300** |
| 9. Reflection | Where AI helped, one decision you made yourself, one remaining limitation — **in your own words** | **150–200** |

**How words are counted:** every whitespace-separated token with a letter or digit in it,
`<!-- comments -->` excluded. The checker prints each count; trust it over your editor.

## 10. AI use and source verification → `report.md` §11, §13

- Record each exchange's **Tool, Model, Date (YYYY-MM-DD) and Purpose**. Prompts and responses
  as text, never screenshots.
- Keep original AI output separate from your final work: `models/original/` and section 12.
- **Verify at least two modeling decisions** in the lectures, the textbook or the UML / PlantUML
  documentation, with an **exact locator**: slide, page, section, chapter or figure — or a URL with
  an access date (T4). **Slide numbers refer to the decks posted in our Teams.** The assignment's
  references are Sommerville, *Software Engineering*, 10th ed., chapter 5 (exercises 5.5 and 5.8),
  Lesson #03 (*Modeling and Requirements*) and Lesson #04 (*UML practice and validation*) — our
  Week 03 and Week 04 materials.
- List every source in **References**, one per line; every URL in the source-checks table must
  also appear there (R1).

## 11. Responsibility

- Use fictional students and courses. No personal information in any prompt.
- Write section 10, the walkthroughs and the reflection yourself.
- **Do not fabricate prompts, responses, walkthroughs or references.** A source you did not open is
  a fabricated source; a walkthrough you did not actually trace is a fabricated one. This follows
  the university's academic-integrity policy, and it is the one failure the rubric cannot forgive.
- Be ready to explain, without the assistant: *Where is the Enrollment created? What stops two
  students taking the last place? Why is uniqueness a note and not a multiplicity?*

## 12. Check your work

The checker reads `report.md` and `models/` and runs **44 checks** of their shape: sections and
word counts, stories and criteria, the sequence diagram (SQ1–SQ8), the class diagram (CL1–CL6),
consistency between them (CN1–CN2), files and renders (F1–F3), the evidence tables (T1–T4, R1),
and the four exchanges (E1–E10).

**It checks shape, never quality.** 44 PASS means your submission can be graded — not that your
model is good. Your review, your walkthroughs and your explanation are read by a person.

```
PASS   the check is satisfied
FAIL   the thing is there but wrong: a word count outside its range, an association with no
       multiplicity, a prompt with a [bracketed field] never replaced
ERROR  the thing cannot be checked at all: report.md or a diagram missing, a heading deleted
```

**Path A — you have Python 3 (any version from 3.8):**

```
cd sis-02
python tests/check_sis.py
```

**Path B — no Python on your machine:** you lose nothing and install nothing. On GitHub, open
your repository → **Code → Codespaces → Create codespace on sis-02**. The terminal at the bottom
of that browser editor has Python; run the same two commands there.

The shipped template gives `pass=5 fail=23 error=16` on the first run. That is the intended start.

## 13. The declaration — `submission.yml` (≈ 5 min, last)

Facts only — who you are, the assistant and exact model (the one in B1), your checker numbers,
your counts, your four walkthrough verdicts, and the IDs of any check still failing.

```
python tests/check_sis.py             # the final run — copy its three numbers
git add . && git commit -m "sis-02: final models and report"
git rev-parse --short HEAD            # this hash goes in checker.commit
python tests/validate_submission.py   # then fix anything it flags
git add submission.yml && git commit -m "sis-02: declaration" && git push
```

Two things that decide marks:

- **Your numbers are re-run at the head of your pull request.** We run `check_sis.py` on the
  commit you submit. Numbers that match are settled automatically. Numbers that do not match cost
  the whole workflow criterion — so after your final run, **change nothing in `report.md` or
  `models/`**. If you do, run the checker again and update the declaration.
- **A FAIL you report costs you nothing extra.** If your explanation is 310 words and you decided
  that was right, list `W1` under `known_fails` and say why in a section 7 row. Hiding it is what
  costs.

## 14. Submit

```
git checkout main
git pull
git checkout -b sis-02
# unzip SIS_02.zip into the root of your se-practice repository, then work and commit
git push -u origin sis-02
```

1. Branch **`sis-02`** off `main`, folder **`sis-02/`** at the top of your `se-practice`
   repository. Never commit to `main`.
2. At least **3 meaningful commits**, authored by your own GitHub account; the first one before
   Prompt A (§2 shows the order).
3. Open **one pull request `sis-02 → main`** in your own repository.
   Title: `SIS 02 - Course registration - <Surname Name>`.
   Description: the five-section shape from `SETUP.md` §4 — What I built · AI tools used · What the
   AI got wrong · Time spent · What I would do differently. **All five headings are checked.**
4. **Leave the PR open. Do not merge it.**
5. In the Teams assignment: **+ Add work → Link → paste the pull request URL.**
   It looks like `https://github.com/<you>/se-practice/pull/N`. Not the repository URL.

**Deadline: Sunday 18 October 2026, 23:59 (Almaty).** Lateness is read from GitHub's server-side
push time, not from commit dates. Late work follows the course policy.

## 15. Grading — 2 points, 8 criteria × 0.25

| # | Criterion | Full 0.25 | Half 0.125 | Zero |
| --- | --- | --- | --- | --- |
| 1 | **Requirements baseline** | Scope and assumptions written before Prompt A and kept in Appendix A; US-01 to US-03; AC-01 to AC-06 in Given/When/Then, each mapped to R1–R5; reviewed, nothing out of scope | A criterion untestable or unmapped, or an out-of-scope feature left in | No stories or criteria, or the unreviewed Prompt A output |
| 2 | **Sequence diagram** | Catalog browsing, selection and registration; every participant and message named; duplicate and capacity checks before creation, as one atomic operation; guarded success, full and duplicate paths; a rejection changes no state | One element missing: a guard, the atomic note, or a path that creates or confirms when it should not | Missing, not PlantUML, does not render, or an AI draft that breaks a rule left as it came |
| 3 | **Class diagram** | Student, Course, CourseOffering, Enrollment with identifiers and capacity; multiplicities at both ends; each Enrollment links one student to one offering; capacity and uniqueness constraints stated separately; extra classes justified | A multiplicity missing or wrong, a constraint not stated, or an extra class unjustified | Missing, not PlantUML, does not render, or no multiplicities |
| 4 | **Consistency & traceability** | Same names and IDs in stories, criteria, diagrams and cases; technical lifelines explained; every rule R1–R5 traced to a criterion, model evidence and a validation case | A rule untraced, or names that differ between the two diagrams | No traceability table, or IDs that do not resolve |
| 5 | **Walkthroughs & review decisions** | T1–T4 each walked through the actual diagram: path, state change, verdict and location; three substantive decisions, each with the element, the decision, a reason and the rule | A case asserted without its path, or decisions with generic reasons | No walkthroughs, AI advice accepted wholesale, or a defect invented to fill the log |
| 6 | **Explanation & reflection** | Main design choices; how the two diagrams complement each other; why an activity diagram could help; a specific reflection in your own words: where AI helped, one own decision, one limitation | Generic, or a required point missing | Missing, or written by the assistant |
| 7 | **AI evidence & source checks** | Four complete exchanges with tool, model, date, purpose; Prompts A–D as given, brackets replaced; original AI diagrams kept separate from the final ones; two modeling decisions checked in sources actually read, exact locators | One exchange incomplete, metadata missing, or a source check with a vague locator | Missing, paraphrased or fabricated |
| 8 | **Structure & workflow** | Word counts in range or declared in `known_fails`; `sis-02` branch, 3+ own commits, the first before Prompt A; open PR in the standard shape; `AI_USAGE.md`; `submission.yml` validating | One element missing | Committed to `main`, PR merged, no disclosure, **or declared checker numbers that don't match the re-run** |

**A FAIL you report and explain costs you nothing; one you hide costs the whole criterion.**
A walkthrough honestly marked Fail with its location scores on criterion 5. The assistant you
chose never affects the mark.

**Not accepted (0 for the SIS):** a file upload instead of a pull-request link · a report that is
not in `sis-02/report.md` · diagrams as images only, without PlantUML source · a merged PR, a
repository link or a branch with no PR · fabricated prompts, responses, walkthroughs or references.

## 16. FAQ

**Can I upload a PDF or a Word file to Teams instead?** No. The report is `sis-02/report.md`,
the diagrams are `sis-02/models/*.puml`, and the only thing you paste into Teams is the
pull-request link.

**My file is `models/class.puml`.** Rename it to `classes.puml` — plural, unlike Week 04. The
checker says so when it finds the old name.

**I accepted none of the critique. Do I still run Prompt D?** Yes. Replace `[list]` with "no
changes accepted" and the reason; Prompt D still counts as your fourth exchange. Section 7 then
records what you verified and why you kept the design.

**My final diagram is the same as the original.** Allowed — see §7. Nothing fails for it.

**My tool does not show the model.** Write `not displayed` in B1–B4 and in `submission.yml`.

**The AI's response contains ``` blocks and breaks my report.** The template already wraps every
prompt and response in `~~~~` fences for that reason. Keep them.

**My guard text shows up as a blue link.** You wrote `alt [already enrolled]`. Drop the square
brackets: `alt already enrolled`.

**Do I have to draw an activity diagram?** No. Section 8 asks why one *could* help explain the
workflow; drawing it is optional and not graded.

**My explanation is 310 words and I think it is right.** Then say so: list `W1` under
`known_fails` and give the reason in a section 7 row. That is a decision, not a violation.

**Can I delete the `<!-- -->` guidance comments?** Yes. Never delete the headings, the
`### US-0N` and `### B1`–`### B4` sub-headings, or the **Label:** words.

**The checker says E8: only 40% of original/sequence.puml is in the Prompt B response.** The
original must be the AI's output exactly as returned. Copy it again from B2's response — your
corrections belong in `models/sequence.puml`, not in `original/`.
=======
# Week 01 — AI in Software Engineering: First Contact

**Course:** AI-Driven Software Engineering (Fall 2026, KBTU SITE)
**Practice work #01** · 1 point · AI-use level: **D (AI-integrated, disclosure required)**

---

## The idea of this lab

You will build the **same small program twice**:

1. **By hand**, with no AI at all.
2. **With an AI app builder** (Rocket), from a single natural-language prompt.

Then you will compare the two flows and write a short, honest reflection.

**Main message of this lab:** AI can speed up development, but the software engineer stays
responsible for correctness, testing, maintainability and security. This lab is your baseline —
in later weeks you will compare everything back to what happened here.

**Time budget:** ~50 min in class + ~40 min at home.

---

## Deliverables

By the deadline, your branch `week-01` must contain:

```
week-01/
├── manual/          # your hand-written solution + how to run it
├── ai/
│   ├── prompts.md   # every prompt you typed + Rocket's rewritten prompt
│   └── screenshots/ # at least 3 screenshots (see Part 2)
├── comparison.md    # filled-in comparison table + reflection
└── AI_USAGE.md      # AI disclosure (required by the course policy)
```

Templates for `comparison.md` and `AI_USAGE.md` are already in this folder. Fill them in — do not
delete the headings.

---

## Part 0 — Repository setup (once per course)

If you have not created your practice repository yet, follow **[SETUP.md](../SETUP.md)** first.
Short version:

```bash
git clone https://github.com/<your-username>/se-practice.git
cd se-practice
git checkout -b week-01
mkdir -p week-01/manual week-01/ai/screenshots
```

---

## Part 1 — Build it manually (no AI) — ~20 min

> **Rule:** no Copilot, no ChatGPT/Claude, no autocomplete-by-AI in this part. Standard library,
> documentation and your own head only. If your IDE has an AI assistant, turn it off now. This part
> is not graded on elegance — it is graded on being *yours*.

### Specification

Write a program that takes a list of student marks and prints:

| Output | Format |
| --- | --- |
| Number of valid marks | integer |
| Average | 2 decimals |
| Highest | as given |
| Lowest | as given |
| Pass rate | percentage, 1 decimal |

Rules:

- A **valid mark** is a number from **0 to 100 inclusive**. Anything else (text, empty value,
  `-5`, `101`) is **ignored** — the program must not crash.
- A mark **passes** if it is **≥ 50** (KBTU grade D starts at 50%).
- Pass rate = passing marks ÷ valid marks × 100.
- If there are **no valid marks**, print a clear message instead of statistics — no crash, no
  division by zero.

Input: hard-code the list, read it from `marks.txt`, or read it from the console — your choice.
Language: any language you can run and explain. Python is the easiest here.

### Test data — your program must produce exactly this

| # | Input | Valid | Average | Highest | Lowest | Pass rate |
| --- | --- | --- | --- | --- | --- | --- |
| A | `85, 23, 45, 90, 92` | 5 | 67.00 | 92 | 23 | 60.0% |
| B | `88, 47, -5, 101, abc, 73, 50, , 100` | 5 | 71.60 | 100 | 47 | 80.0% |
| C | `10, 20, 30` | 3 | 20.00 | 30 | 10 | 0.0% |
| D | `abc, , xyz` | 0 | — | — | — | message, no crash |

Run all four cases before you continue. **Case B and case D are where most solutions break** —
that is the point.

### Record your time

Write down, in `comparison.md`:

- minutes until your **first version ran** at all;
- minutes until **all four cases passed**;
- which case broke your first version.

Commit:

```bash
git add week-01/manual
git commit -m "week-01: manual solution for marks statistics"
```

---

## Part 2 — Build it with Rocket — ~15 min

**Tool:** [rocket.new](https://www.rocket.new/) — an AI app builder ("vibe solutioning" platform).
Register with your email; the free tier is enough for this lab. Use the **web** version, not the
mobile app — code download and screenshots are web-only features.

### Steps

1. **Start a new project.** In the prompt box, paste **exactly this**, and nothing else:

   ```
   Build a small program that processes a list of student marks and prints:
   average, highest, lowest, and pass rate.
   ```

   Do **not** add your rules from Part 1 yet. We want to see what the tool does with a vague,
   realistic, one-line request.

2. **Screenshot #1** — the prompt and Rocket's first reaction. Rocket scores prompt completeness
   and may refuse to build until the score is high enough; it will ask you clarifying questions.
   **Write down every question it asks** in `ai/prompts.md`. Those questions are requirements
   engineering — Lesson 03 of this course.

3. **Answer the questions**, then **screenshot #2** — Rocket's *rewritten / enhanced* prompt.
   Copy that rewritten prompt into `ai/prompts.md` word for word. Note what the tool **added by
   itself** that you never asked for (a tech stack, a UI, a threshold, extra features).

4. **Let it build**, then open the preview. **Screenshot #3** — the running app with test data.

5. **Test it with the same four cases from Part 1.** For each case write down in `ai/prompts.md`:
   the input, what the app printed, and whether it matches the specification.

6. **Fix one defect with a follow-up prompt.** Pick the worst wrong behaviour you found, ask
   Rocket to fix it, and record the prompt and the result. Did the fix work? Did it break
   something else?

7. If Rocket lets you **download the code**, put it in `week-01/ai/`. If not, screenshots plus the
   published/preview link are enough — say so in `comparison.md`.

> **Do not commit any API key, token or password.** If a generated file contains one, delete the
> value before committing.

Commit:

```bash
git add week-01/ai
git commit -m "week-01: Rocket prompt log, screenshots and test results"
```

---

## Part 3 — Compare and reflect — ~20 min

Open `comparison.md` and fill in every row of the table, then answer the four reflection
questions in 200–300 words total.

Be specific. "AI was faster" is worth nothing. "AI produced a running UI in 4 minutes but silently
accepted 101 as a valid mark, and case D showed NaN" is worth everything.

Then fill in `AI_USAGE.md`. Disclosure is mandatory in this course — an undisclosed AI tool is an
academic-integrity problem, not a style problem.

Commit:

```bash
git add week-01/comparison.md week-01/AI_USAGE.md
git commit -m "week-01: comparison and reflection"
```

---

## Part 4 — Submit

```bash
git push -u origin week-01
```

Then on GitHub:

1. Open a **Pull Request** from `week-01` into `main` **in your own repository**.
2. Title: `Week 01 — AI in Software Engineering: First Contact`
3. In the PR description answer three lines: *what I built*, *what the AI got wrong*,
   *how long each version took*.
4. **Do not merge it.** Leave the PR open — that is how it gets reviewed.
5. Paste the **PR link** into the Week 01 assignment on **MS Teams**.

A PR link that is already merged, or a link to the repository instead of the PR, counts as not
submitted.

---

## Grading (1 point)

| Criterion | Points |
| --- | --- |
| Manual solution runs and handles all four test cases | 0.25 |
| Rocket attempt documented: prompt log, rewritten prompt, 3+ screenshots, test results | 0.25 |
| `comparison.md` complete — table filled + specific, honest reflection | 0.25 |
| Workflow correct: `week-01` branch, ≥3 commits, open PR, link in Teams, `AI_USAGE.md` present | 0.25 |

**Not accepted:** merged or empty PR · committing straight to `main` · a manual part that is
obviously AI-generated · a reflection with no concrete example · a missing AI disclosure.

Late submissions follow the general course policy — see the syllabus.

---

## Frequently hit problems

- **"Rocket won't build, my prompt score is too low."** Good — that is the lesson. Answer its
  questions and record them. The tool is doing requirements elicitation for you.
- **"Rocket built a full web app, my manual version is a console script."** That is expected and
  it is one of the comparison rows: the AI chose a stack and a scope you never asked for.
- **"The AI version is better than mine."** Then say so and explain why, precisely. Honest
  reflection scores higher than defensive reflection.
- **"I can't verify what the AI generated."** Write that down too — it is the most important
  finding you can make in Week 1.
# se-practice
>>>>>>> origin/main
