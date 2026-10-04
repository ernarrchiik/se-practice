# Week 04 — Lab report: Modeling the System with UML

> The single worksheet for this lab. Fill in every section. **Do not delete, rename or renumber
> the headings** — the checker and the grader find your work by them. Replace every `<...>`
> placeholder; a row that still contains `<...>` counts as empty.

---

## 1. Setup

| Field | Value |
| --- | --- |
| Name | Yernar |
| Group | Monday 16:00-19:00 |
| AI assistant | Gemini |
| Exact model | 3.5 Flash-lite |
| Renderer | PlantUML web server |
| Behaviour diagram | activity |
| Stories used | My revised Week 03 stories, with US-04 and the rule reference in US-06 corrected for Week 04. |

---

## 2. Prompts as sent

Before Task 1, I supplied the Smart Campus scenario, rules R1–R4 and my approved stories, followed by:

```text
This is the Smart Campus scenario, its rules R1-R4 and my approved user stories. I will ask you for several UML diagrams in PlantUML. Use only this scenario. Wait for my first request.
```

### 2.1 Task 1 — use-case prompt

```text
Using the supplied scenario and approved stories, generate PlantUML for a use-case diagram. Include Student and Administrator outside a named system boundary. Model their goals, show justified associations, and list assumptions. Use include or extend only with a clear reason.
```

### 2.2 Task 2 — class prompt

```text
Create a UML domain class diagram in PlantUML for Smart Campus. Start with Student, Room, and Booking. Add attributes, appropriate operations, and association multiplicities. Add other classes only when requirements justify them. Explain each relationship and list assumptions. Avoid unjustified inheritance or composition.
```

### 2.3 Task 3 — behaviour prompt (3B activity)

```text
Generate a UML activity diagram in PlantUML for Book room. Show the initial node, actions, guarded decisions, and final nodes. Check the time range, blocked-room status, and overlapping bookings. Show confirmation after success and rejection after failure. Use branches rather than parallel paths unless concurrency is required.
```

### 2.4 Focused correction prompts (if you sent any)

none

### 2.5 Critique prompt

In a new chat, I supplied models/approved-stories.md and the revised use-case, class and activity diagrams, followed by:

```text
Compare my diagrams with the requirements. Identify missing rules, inconsistent names, and unjustified elements. Cite each issue and propose a specific correction.
```

---

## 3. Task 1 — use-case review

**Assumptions the AI listed:** <one line each, or "the AI listed none" — that is a finding too>
- The system boundary contains only the capabilities from US-01–US-06 and excludes all out-of-scope features.
- Confirmation is a mandatory outcome of a successful booking, so Book room includes the confirmation use case.
- Student and Administrator interact only with the goals assigned to their roles.

These statements mainly explain modeling choices rather than introduce new scenario assumptions.

| # | Element | Problem | Rule or story | Fix |
| --- | --- | --- | --- | --- |
| 1 |UC1 — View availability |UC1 is declared twice with different labels. Both declarations represent the same goal. |US-01 defines one View availability goal. |Removed the duplicate declaration and kept one View availability use case. |
| 2 |UC2 → UC4 include relationship |The justification comment does not use the required ' why: format. |PlantUML conventions, README §4; R4 and US-04 justify the relationship. |Added a ' why: comment directly above the include relationship. |
| 3 |UC4 — Receive booking confirmation |The label describes receiving an outcome rather than the system action included in Book room. |R4 states that a successful booking produces confirmation; US-04 requires receiving it. |Renamed it Send confirmation, kept the justified include, and added a note limiting it to successful bookings. |

---

## 4. Task 2 — class diagram review

### 4.1 Relationships, read both ways

One row per association in your **revised** class diagram.

| Association | Read left → right | Read right → left | Multiplicities |
| --- | --- | --- | --- |
|Student — Booking |One student makes zero or many bookings. |Each booking belongs to exactly one student. |1 / 0..* |
|Room — Booking |One room has zero or many bookings.|Each booking reserves exactly one room. |1 / 0..*|

### 4.2 Constraints the multiplicities cannot show

- R2: A note on Booking states that ACTIVE bookings for the same room must not overlap. The overlap condition is startA < endB and startB < endA.
- R1: A note on Booking requires a future start and a duration greater than zero and at most two hours.
- R3: A note on Room states that a blocked room cannot accept a new booking.
- R4: A note on Booking states that a successful booking produces confirmation.
- US-03: A note on Booking states that only the owning student may cancel it.

### 4.3 Assumptions

- A1: Blocking a room preserves existing bookings. It prevents new bookings only.
- A2: Touching bookings are allowed. For example, 10:00–12:00 and 12:00–13:00 do not overlap.
- A3: Cancelled bookings are retained for usage review but do not prevent new bookings.
- A4: Confirmation is an output of successful booking, not a separately stored domain object.

### 4.4 Findings

| # | Element | Problem | Rule or story | Fix |
| --- | --- | --- | --- | --- |
| 1 | Booking | R2 appears in the AI explanation but is missing from the diagram. Multiplicities cannot express non-overlap. | R2 and README §4 require a note on Booking. | Added a note stating the non-overlap rule and the overlap condition. |
| 2 | Administrator — Room | The association requires every room to have exactly one administrator. The scenario does not define this restriction. | The scenario and US-06 allow administrators to block or unblock rooms without assigning one administrator per room. | Removed the association and Administrator class. Kept block and unblock operations on Room. |
| 3 | Booking.status : BookingStatus | The type is named, but its possible values are not defined. It is unclear which bookings count as active. | R2 applies to active bookings; US-03 requires cancellation. | Added BookingStatus with ACTIVE and CANCELLED values. |
| 4 | BookingConfirmation | A separate confirmation object introduces storage and identity choices that the requirements do not specify. This is a simplification, not a prohibited class. | R4 and US-04 require confirmation after success, but do not require storing it separately. | Removed the class and kept confirmationDetails on Booking with an R4 note. |

---

## 5. Task 3 — behaviour diagram review

**Option chosen and why:** <3A sequence / 3B activity — one sentence on why>

**Design components added beyond the domain model:** <name each one, e.g. `BookingService` —
what it does in one line; write "none" for an activity diagram>

| # | Element | Problem | Rule or story | Fix |
| --- | --- | --- | --- | --- |
| 1 |Decision branch labels |The branches use (yes) and (no), but the lab requires ([yes]) and ([no]). |README §4 — activity guard conventions. |Added square brackets to every branch label. |
| 2 |R2 overlap decision | The wording does not explicitly say that the requested time slot is compared with existing active bookings. The treatment of touching intervals is not stated. |R2 and assumption A2 in §4.3. |Clarified the decision and added a note with the overlap condition and the assumption that touching bookings are allowed. |


---

## 6. AI critique

Run the critique prompt once, on all your revised diagrams together. At least **three** rows. A
critique is another claim to evaluate, not a verdict: reject what is wrong and say why.

| # | Issue the AI raised | Element it cited | Verdict | Why |
| --- | --- | --- | --- | --- |
| 1 |Administrator class and management association are missing. | Administrator actor; US-05 and US-06; class diagram. | Reject | An actor does not automatically require a domain class. Room already has block and unblock operations. The proposed association would require exactly one administrator per room, which the scenario does not specify. |
| 2 |Usage review is described only in a note, without an operation. | Room note for US-05. | Accept | The existing bookings support usage review, but an explicit query makes the selected-period behavior clearer. Added bookingsForPeriod(startTime, endTime) to Room without introducing a reporting class. |
| 3 |Activity decisions must invoke Room.isAvailable. | Room.isAvailable and the three activity decisions. | Reject | An activity diagram describes workflow and does not have to show method calls. Separate decisions visibly check R1, R3 and R2, as Task 3B requires. Replacing them with one availability decision would hide the individual rejection reasons. |
| 4 |US-03 has no R2 mapping. | US-03 Rules column. | Reject | The approved stories table already maps US-03 to R2. Ownership is required by the scenario and US-03, rather than by a separate numbered rule. No correction is needed. |
| 5 |Send confirmation must be renamed to match Receive confirmation. | UC4 and US-04. | Reject | These describe the same outcome from different perspectives: the system sends confirmation and the student receives it. R4 justifies the included system action, and no actor is directly associated with it. |

---

## 7. Consistency table

One row for each of **R1–R4**, then one row for **every use case in your revised use-case
diagram**, spelled exactly as in the diagram, with the story ID it traces to.

| Requirement / story | Use case | Classes | Behaviour element |
| --- | --- | --- | --- |
| R1 | Book room | Booking.startTime, Booking.endTime; R1 note on Booking. | Valid time range? (R1): future start and duration greater than zero and at most two hours. |
| R2 | Book room | Room — Booking association; Booking.status; R2 note on Booking. | Requested slot overlaps an ACTIVE booking for this room? (R2). |
| R3 | Book room; Block or unblock room | Room.isBlocked, block(), unblock(); R3 note on Room. | Room blocked? (R3); rejection when blocked. |
| R4 | Book room; Send confirmation | Booking.confirmationDetails(); R4 note on Booking. | Send confirmation to Student (R4), after creation. |
| US-01 | View availability | Room.isAvailable(startTime, endTime); Room.isBlocked; associated bookings. | Availability browsing is outside the Book room activity. The activity checks availability for the selected room and slot. |
| US-02 | Book room | Student, Room, Booking; their associations and booking constraints. | Student selects room and time slot; three validation decisions; Create and save ACTIVE Booking. |
| US-03 | Cancel booking | Booking.cancel(), Booking.status; Student — Booking association and ownership note. | Cancellation is outside the Book room activity. Its overlap check considers only ACTIVE bookings. |
| US-04 | Send confirmation | Booking.confirmationDetails(); R4 note on Booking. | Send confirmation to Student (R4). |
| US-05 | Review usage | Room.bookingsForPeriod(startTime, endTime); Room — Booking association. | Usage review is outside the Book room activity. |
| US-06 | Block or unblock room | Room.isBlocked, block(), unblock(). | Administrative blocking and unblocking are outside this activity. Room blocked? (R3) checks the resulting state. |

---

## 8. Change log

At least **three** rows, and at least one for each required diagram (use case, class, your
behaviour diagram). "Before" is what the AI produced; "After" is what you submitted.

| # | Diagram | Before (AI's original) | After (your revision) | Reason |
| --- | --- | --- | --- | --- |
| 1 | Use case | UC1 was declared twice with different labels. | Kept one View availability declaration. | Both declarations represented the same US-01 goal. |
| 2 | Use case | The include justification used an ordinary comment. | Added a ' why: comment directly above the include relationship. | Required PlantUML convention in README §4; R4 and US-04 justify the include. |
| 3 | Class | R2 appeared only in the AI explanation. | Added an R2 note on Booking with the overlap condition and touching-interval assumption. | Multiplicities cannot express non-overlap; README §4 requires the note. |
| 4 | Class | Administrator — Room required exactly one administrator per room. | Removed Administrator and its association; retained block and unblock operations on Room. | The scenario and US-06 do not require a fixed administrator assignment. |
| 5 | Class | BookingStatus was used without defining its values. | Added ACTIVE and CANCELLED enum values. | Makes active bookings under R2 and cancellation under US-03 explicit. |
| 6 | Class | Usage review had no explicit query operation. | Added bookingsForPeriod(startTime, endTime) to Room after evaluating the AI critique. | Clarifies support for the selected period in US-05. |
| 7 | Activity | Branch labels used (yes) and (no). | Changed every branch label to ([yes]) or ([no]). | Required activity guard convention in README §4. |
| 8 | Activity | The overlap decision did not explicitly identify the requested interval or define touching intervals. | Clarified the decision and added the overlap condition and touching-interval assumption. | Makes R2 and assumption A2 explicit. |

---

## 9. Checker output

Paste the complete output of `python tests/check_models.py`, then explain **every FAIL you are
keeping**. The same IDs go in `submission.yml` under `checker.kept_fails`. A FAIL you report and explain costs you nothing. One you hide costs the whole criterion.

```text
Week 04 structural check - shape only, never quality

UC1  PASS  Student and Administrator declared
UC2  PASS  named system boundary: "Smart Campus Study Room Booking System"
UC3  PASS  all actors declared outside the boundary
UC4  PASS  all scenario goals present (6 use cases)
UC5  PASS  no actor is associated with a confirmation use case
UC6  PASS  actor responsibilities match the scenario
UC7  PASS  use cases are goals, not screens or components
UC8  PASS  every include / extend / generalization carries a ' why: comment (or there are none)
UC9  PASS  revised diagram differs from the AI's original
CL1  PASS  Student, Room and Booking present
CL2  PASS  Booking is associated with Student and with Room
CL3  PASS  every association has multiplicities at both ends
CL4  PASS  1 student / 1 room per booking, 0..* bookings per student and per room
CL5  PASS  every inheritance / composition / aggregation carries a ' why: comment (or there are none)
CL6  PASS  only domain concepts in the class diagram
CL7  PASS  attributes needed by R1-R3 are present
CL8  PASS  a note states R2 (no overlapping active bookings)
AC1  PASS  initial and final nodes present
AC2  PASS  separate decisions check R1, R3 and R2 (3 decisions)
AC3  PASS  every branch has a labelled guard
AC4  PASS  no parallel paths
AC5  PASS  confirmation on success, rejection on failure
AC6  PASS  creation comes after all rule checks
FI1  PASS  the AI's original output is kept for every diagram
FI2  PASS  a rendered image for every diagram
LR1  PASS  §1 setup filled (tool and model recorded)
LR2  PASS  5 prompts pasted in §2
LR3  PASS  3 use-case findings in §3
LR4  PASS  §4 relationships read both ways, 4 assumption(s) declared
LR5  PASS  2 behaviour-diagram findings in §5
LR6  PASS  5 critique issues with a verdict
LR7  PASS  8 change-log rows covering all three diagrams
CS1  PASS  6 approved stories
CS2  PASS  §7 traces R1-R4 into the diagrams
CS3  PASS  every use case traces to an approved story

SUMMARY pass=35 fail=0 error=0
A FAIL you report and explain in lab-report.md §9 costs you nothing. One you hide costs the criterion.
```

**FAILs I am keeping, and why:** * none

---

## 10. Conclusion (120–180 words)

The class diagram needed the most review. The original Administrator–Room association said that each room had exactly one administrator, although the scenario does not require this assignment. It also omitted the required R2 note on Booking and used BookingStatus without defining its values. Without review, the administrator multiplicity could have become an unnecessary database restriction, while the missing overlap constraint could have been overlooked during implementation.
The use-case diagram declared UC1 twice and did not use the required justification-comment format. The activity diagram already checked R1, R3 and R2 before saving, but its branch labels needed the required notation.
The critique identified that usage review had only a note, so I added a period-based query to Room. I rejected its claim that every actor needs a domain class and its suggestion to replace separate activity checks with one availability call. Separate decisions preserve the rejection reason and meet the lab requirements.