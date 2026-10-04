# Week 04 — Lab report: Modeling the System with UML

> The single worksheet for this lab. Fill in every section. **Do not delete, rename or renumber
> the headings** — the checker and the grader find your work by them. Replace every `<...>`
> placeholder; a row that still contains `<...>` counts as empty.

---

## 1. Setup

| Field | Value |
| --- | --- |
| Name | <your name> |
| Group | <your group> |
| AI assistant | <e.g. Claude, ChatGPT, Gemini, DeepSeek, Grok> |
| Exact model | <the exact model name with its version, e.g. claude-sonnet-4-5> |
| Renderer | <PlantUML web server / VS Code extension / IntelliJ plugin / local jar> |
| Behaviour diagram | <sequence / activity / both> |
| Stories used | <my week-03 stories, revised / the reference set from README §3> |

---

## 2. Prompts as sent

Paste every prompt **exactly as you sent it**, in the order you sent it, one code block each. The
AI's first replies are saved as files in `models/original/` — do not paste them here.

### 2.1 Task 1 — use-case prompt

```text
Understood! I have reviewed the Smart Campus study room booking scenario, rules R1–R4, the approved user stories US-01 through US-06, and the out-of-scope items.

I am ready. What is your first request?
```

### 2.2 Task 2 — class prompt

```text
<paste>
```

### 2.3 Task 3 — behaviour prompt (3A sequence or 3B activity)

```text
<paste>
```

### 2.4 Focused correction prompts (if you sent any)

```text
<paste, or write "none">
```

### 2.5 Critique prompt

```text
<paste>
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
| R1 | <use case> | <classes and attributes> | <message, guard or decision> |
| R2 | <use case> | <classes, note> | <message, guard or decision> |
| R3 | <use case> | <classes and attributes> | <message, guard or decision> |
| R4 | <use case> | <classes> | <message or action> |
| <US-01> | <Book room> | <Student, Booking, Room> | <message or action> |

---

## 8. Change log

At least **three** rows, and at least one for each required diagram (use case, class, your
behaviour diagram). "Before" is what the AI produced; "After" is what you submitted.

| # | Diagram | Before (AI's original) | After (your revision) | Reason |
| --- | --- | --- | --- | --- |
| 1 | <use case> | <before> | <after> | <rule, story or notation reason> |
| 2 | <class> | <before> | <after> | <reason> |
| 3 | <sequence / activity> | <before> | <after> | <reason> |

---

## 9. Checker output

Paste the complete output of `python tests/check_models.py`, then explain **every FAIL you are
keeping**. The same IDs go in `submission.yml` under `checker.kept_fails`. A FAIL you report and explain costs you nothing. One you hide costs the whole criterion.

```text
<paste the full output>
```

**FAILs I am keeping, and why:** <one line per check ID, or "none">

---

## 10. Conclusion (120–180 words)

<Which diagram did the AI get most wrong, and what exactly was wrong? Which error would have
reached the code if nobody had reviewed it? What did the critique find that you missed — and what
did it claim that was false? Be specific: "the AI got the multiplicities wrong" is worth nothing;
"the AI put 1..* on the Booking end, which says every room must already have a booking" is worth
everything.>
