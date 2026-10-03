# Lab report — Practice #03, Requirements Engineering with AI

Fill in every section. **Do not delete or renumber the headings** — the README points at them and a
missing heading reads as a missing section.

Name:Yernar Berenbay
Student ID:24B031709
GitHub username:ernarrchiik


---

## 1. Setup

| | |
| --- | --- |
| AI assistant (tool) | Gemini |
| Exact model name and version | 3.5 Flash-lite|
| Date of the session | 27 September |
| Diagram renderer used | plantuml |

One tool and one model for all three prompts. If you switched, say why here — it changes what your
findings mean.

---

## 2. Original AI output — user stories (Part 1)

Paste the **unedited** response to Prompt 1. Do not tidy it. If it is long, paste all of it anyway;
this is the baseline everything else is measured against.

```
User Stories
1. Room Availability Search (Student)
Priority: High

As a student,

I want to filter and view available study rooms by date, time duration, and required equipment (e.g., projector, whiteboard),

So that I can find a suitable space for group projects or individual study without manual trial and error.

Assumption: Users have active campus credentials and the system has real-time access to the campus room inventory database.

2. Instant Room Reservation (Student)
Priority: High

As a student,

I want to instantly book an open study room time slot with a single confirmation,

So that I can secure a study space immediately when needed.

Assumption: Students are subject to a fair-use booking quota (e.g., maximum hours per week) to prevent monopolization.

3. Booking Management & Cancellation (Student)
Priority: Medium

As a student,

I want to view, modify, or cancel my upcoming room reservations through a dashboard,

So that I can free up space for others if my plans change.

Assumption: Cancellations made past a certain threshold (e.g., 15 minutes before the slot) release the room automatically.

4. Automated Notifications & Reminders (Student)
Priority: Low

As a student,

I want to receive push notifications or email reminders 15 minutes before my booked session starts,

So that I do not forget my reservation and lose the room.

Assumption: Students have notification permissions enabled on their registered mobile devices or email clients.

5. System Utilization Monitoring (Administrator)
Priority: High

As an administrator,

I want to view analytics reports on room occupancy rates and peak usage times,

So that I can make informed decisions about space allocation and resource purchasing.

Assumption: Usage data is securely logged and anonymized for administrative analytics reporting.

6. Facility and Resource Management (Administrator)
Priority: Medium

As an administrator,

I want to add, update, or deactivate study rooms and their associated equipment profiles,

So that the system accurately reflects real-world campus facility changes and maintenance status.

Assumption: Administrators have a dedicated web-based portal with elevated role-based access control (RBAC).

7. Manual Override & No-Show Management (Administrator)
Priority: Medium

As an administrator,

I want to manually cancel unattended bookings or override schedules in case of emergencies,

So that unutilized rooms can be dynamically reassigned to waiting students.

Assumption: Check-in mechanisms (such as QR codes or smart card taps at the room door) are available to automatically track attendance.
```

---

## 3. Story review (Part 2)

One row per change you made. "Kept unchanged" is a valid row and needs a reason too.

| Story (as generated) | What I did | Why | Final ID |
| 1. Room Availability Search(Student) |Removed the equipment filter. Kept availability by selected date and time.| Equipment filtering is outside the scenario in README section 1.  | US-01 |
|2. Instant Room Reservation(Student) |I removed:"instantly","with a single confirm" and weekly quota. |The weekly booking quota is not part of the scenario.The booking restrictions R1–R4 will be specified in the acceptance criteria. |US-02|
|3. Booking Management & Cancellation (Student) |I removed viewing, modifying, the dashboard and the 15 minute canceling condition |because there are dont required define booking,modification,canceling deadline or dashboard |US-03|
|4.Automated Notifications & Reminders (Student) |i replaced the reminder story with a story about receiving confirmation after a booking or cancellation. Removed the 15-minute timing, push/email delivery, and notification-permission assumption. Changed priority from Low to Medium. |Because the scenario does not specify a delivery channel. |US-04|
|5.System Utilization Monitoring (Administrator) |I removed specific analytics metrics, purchasing decisions, and the data-logging and anonymization |because the scenario does not specify particular metrics, purchasing workflows, or how usage data is stored. |US-05 |
|6. Facility and Resource Management (Administrator) |I replaced adding, updating and deactivating rooms with blocking and unblocking a room |because equipment, screens and authentications are out os scope;adding or editing rooms is not one of the six functions |US-6 |


All Final ID's in user-stories.

**Did the assistant invent anything outside the scenario?** Name it against the out-of-scope list in
README section 1, or write "no, and here is how I checked".

**How many stories did you end with, and why that number?**

---

## 4. Original AI output — acceptance criteria (Part 3)

```
US-02 - Book Room
Assumptions
The student is authenticated in the system with an active student account.

The system enforces a maximum booking duration of two hours.

Room schedules and booking rules (R1-R4) are fully configured and active in the database.

Acceptance Criteria
Successful Booking:

Given a student is viewing an available study room for a future time slot of 1 hour,

When the student selects the time slot and submits the booking request,

Then the system successfully creates the reservation and confirms the booked room for the student.

Validation - Past Time Restriction:

Given a student attempts to book a study room for a time slot in the past,

When the student submits the booking request,

Then the system rejects the booking and displays an error message stating that bookings must be made for future times.

Validation - Maximum Duration Exceeded:

Given a student selects a study room time slot spanning 3 hours,

When the student attempts to confirm the booking,

Then the system rejects the request and shows an error indicating that the maximum allowed duration is two hours.

Alternative/Error Case - Overlapping Bookings:

Given a study room is already booked for a specific time slot,

When another student attempts to book the same room for an overlapping time slot,

Then the system denies the request and displays a conflict message informing them that rooms cannot overlap.

Alternative/Error Case - Blocked Room:

Given a study room has been blocked by an administrator for maintenance,

When a student attempts to book that room for an available future time slot,

Then the system prevents the booking and notifies the student that blocked rooms cannot be booked.

US-03 - Cancel Booking
Assumptions
The student has an existing, active future booking in the system.

Canceling a booking immediately releases the time slot back to the available room inventory.

Acceptance Criteria
Successful Cancellation:

Given a student has an existing future booking for a study room,

When the student navigates to their dashboard and selects the cancel option for that booking,

Then the system removes the reservation and updates the room slot status to available.

Validation - Cancellation Confirmation:

Given a student clicks cancel on an active booking,

When the system prompts for confirmation to prevent accidental cancellations,

Then the student confirms, and the cancellation proceeds successfully.

Error Case - Non-Existent or Past Booking:

Given a student attempts to cancel a booking that has already passed or does not exist in their profile,

When the cancellation action is triggered,

Then the system displays an error message indicating that no valid active booking was found to cancel.

US-06 - Block or Unblock Room
Assumptions
The user is logged in with administrative privileges.

Changing a room's status immediately updates its availability across the booking interface.

Acceptance Criteria
Successful Room Blocking:

Given an administrator is viewing an active study room in the management portal,

When the administrator toggles the status to "Blocked" (e.g., for maintenance),

Then the system updates the room status and immediately prevents any student from booking it.

Successful Room Unblocking:

Given a study room is currently marked as blocked,

When the administrator toggles the status back to "In Service / Unblocked",

Then the system updates the status and restores the room as available for student bookings.

Validation - Booking Prevention on Blocked Rooms:

Given a study room has been blocked by an administrator,

When a student attempts to search for or book that room for a future time slot,

Then the system hides the room or blocks the reservation attempt, enforcing the rule that blocked rooms cannot be booked.
```

---

## 5. Criteria review (Part 3)

| Criterion (as generated) | Problem | What I changed it to | Final ID |
| US-02, 1. Successful Booking | "Student viewing" describes that student watch the screen.The initial conditions do not explicitly state that the passageway into the room is clear. | The Student requires the free room for a fruture one hour time slot;The system creates the booking and sends confirmation | AC-01 |
|US-02, 2. Past Time Restriction |It checks a past start time but misses the boundary case where the booking starts exactly now. R1 requires the start to be in the future. |Reject a booking with a start time that coincides with the current time.
 |AC-02 |
|US-02, 3. Maximum Duration Exceeded |It tests 3 hours but does not settle whether exactly 2 hours is allowed. It also refers to confirming a booking through an unspecified interface |Keep the 3-hour rejection; state separately in the assumptions that exactly 2 hours is allowed |AC-03 |
|US-02, 4. Overlapping Bookings |The time intervals are unspecified, and “rooms cannot overlap” incorrectly describes the conflict. R3 applies to bookings for the same room |Reject a booking from 14:30 to 15:30 when the same room is already booked from 14:00 to 15:00 |AC-04 |
|US-02, 5. Blocked Room |The maintenance reason is unnecessary, and the requested duration is unspecified |Reject a booking for a blocked room even when the requested future one-hour slot has no other bookings |AC-05 |
|US-03, 1. Successful Cancellation |The dashboard is out of scope. The criterion should explicitly identify the student as the booking owner |The student cancels their own booking; the system cancels it and releases the reserved time slot |AC-06 |
|US-03, 2. Cancellation Confirmation |The assistant invented an extra confirmation step. “Then” describes another student action instead of a system result |The system sends confirmation after successfully cancelling the student's own booking, as required by UC-06 |AC-07 |
|US-03, 3. Non-Existent or Past Booking |It combines two different cases and invents a restriction on cancelling past bookings. It also refers to a profile |Reject cancellation when no booking exists with the supplied ID |AC-08 | 
|US-03 Missing criterion: cancellation of another student's booking |The generated criteria do not check the ownership restriction in UC-03 |Reject cancellation when the booking belongs to another student; keep the booking unchanged |AC-09 |
|US-06, 1. Successful Room Blocking |The management portal and status toggle describe interface details that are out of scope |The administrator requests blocking; the system marks the room as blocked and prevents new bookings |AC-10 | 
|US-06, 2. Successful Room Unblocking |Unblocking does not guarantee that every time slot is available. R1–R3 still apply |The system unblocks the room and permits bookings that satisfy R1–R3 |AC-11 | 
|US-06, 3. Booking Prevention on Blocked Rooms |“Hides the room or blocks the reservation” gives two alternative results. R4 prohibits booking but does not require hiding the room |Reject a booking request for a blocked room without creating a booking |AC-12 | 

**The two open questions.** Write your decision and the reason. Either answer is accepted.

| Question | My decision | Why |
| --- | --- | --- |
| A booking ending exactly when another begins — overlap under R3? | allowed / not-allowed | |
| Is exactly two hours allowed under R2? | allowed / not-allowed | |

**Which invalid or boundary case did the assistant leave out?**

---

## 6. Original AI output — use-case diagram (Part 4)

```
left to right direction
skinparam packageStyle rectangle

actor "Student" as student
actor "Administrator" as admin

rectangle "Smart Campus Study Room Booking System" {
  usecase "View availability" as UC1
  usecase "Book room" as UC2
  usecase "Cancel booking" as UC3
  usecase "Send confirmation" as UC4
  usecase "Block or unblock room" as UC5
  usecase "Review usage" as UC6

  UC2 ..> UC4 : <<include>>
}

student --> UC1
student --> UC2
student --> UC3

admin --> UC5
admin --> UC6
admin --> UC1
```

Rendered diagram (image, or a link):

---

## 7. Diagram review (Part 4)

| Element | Problem | What I changed |
| Cancel booking → Send confirmation | Confirmation after cancellation is missing, although UC-06 requires it |Added an include relationship from Cancel booking to Send confirmation |
|Administrator → View availability |This association is not justified by the administrator responsibilities in the scenario |Removed the association |
|Use-case identifiers |The aliases do not follow the UC numbering in README |Aligned the identifiers with UC-01–UC-06 |
|PlantUML source |The supplied snippet has no diagram delimiters |Added @startuml and @enduml |

**Associations.** Which actor–use-case links did the assistant draw that a person does not actually
trigger? The Administrator–View availability association was not justified by the scenario, so I removed it. Neither actor directly triggers Send confirmation; it is included in booking and cancellation

**Did any screen, database or internal component appear as a use case or an actor?**
No screens, databases, or internal components appeared as actors or use cases

---

## 8. Traceability (Part 5)

Summarise what the table in `requirements/traceability.md` shows:

- Use cases with **no story** behind them:None. Each of the six use cases is covered by a revised story
- Stories with **no use case** they belong to:None. All six revised stories map to the defined use cases
- Criteria that test **no rule** from section 1:AC-06, AC-07, AC-08, AC-09 and AC-11 do not directly test R1–R4. They test cancellation, confirmation, ownership, error handling or unblocking behavior required by the use cases

**What does the largest gap tell you about the generated requirements?**
UC-01 and UC-05 have stories but no acceptance criteria in this submission. Their behavior has not been specified in testable detail. Structural coverage alone does not mean that every function is fully specified

---

## 9. Checker runs

Paste the **real terminal output** of both runs. A table with nothing behind it does not count.

```
$ python tests/check_requirements.py
(paste)
```

```
$ python tests/validate_submission.py
(paste)
```

| | PASS | FAIL | ERROR |
| --- | --- | --- | --- |
| `check_requirements.py` | | | |

Commit these numbers were produced at (`git rev-parse --short HEAD`):

**Every FAIL, one line each: what it is and what you decided to do about it.** A FAIL you report and
explain costs you nothing.

**Did you run the checks by hand instead of with Python?** Say so here — it costs nothing, but it
has to be said.

---

## 10. Conclusion (150–200 words)

Answer all three:

1. Which part of the generated requirements was most wrong, and how would you have caught it without
   a checker?
2. What did the assistant get right that would have taken you noticeably longer by hand?
3. You are handing these requirements to someone who will implement them, and you will not be in the
   room. Which single one would you rewrite first, and why?

Be specific. "The AI was useful" is worth nothing; "UC-06 had no story behind it until I wrote
US-07, and the checker is what told me" is worth everything.
