# Approved stories — Smart Campus study room booking

**Source of this set:** 
My revised Week 03 stories, with US-04
and the rule reference in US-06 corrected for Week 04.
Original story IDs are preserved.

## Scenario (from the Lesson 04 practice deck, slide 7)

Students view room availability, book a room, and cancel their own bookings. Administrators block
or unblock rooms and review usage.

- **R1** Future start, with duration greater than 0 and at most 2 hours.
- **R2** Active bookings for the same room cannot overlap.
- **R3** A blocked room cannot accept a new booking.
- **R4** A successful booking produces a confirmation.

## Approved stories

| ID | Story | Rules |
| --- | --- | --- |
|US-01 |As a student, I want to see which study rooms are available at a selected time, so that I can choose a room for studying. | — |
|US-02 |As a student, I want to book an available study room for a time slot, so that I have a room reserved for studying. | R1, R2, R3, R4 |
|US-03 |As a student, I want to cancel my own booking, so that other students can book the released time slot. | R2 |
|US-04 |As a student, I want to receive confirmation after a successful room booking, so that I know my room is reserved. | R4 |
|US-05 |As an administrator, I want to see how the rooms were used over a selected period, so that I can understand their usage. | — |
|US-06 |As an administrator, I want to block or unblock a study room, so that students can book only rooms that are in service. | R3 |
**Out of scope** (do not model): payments, equipment in rooms, recurring bookings, waiting lists,
notifications other than the booking confirmation, user registration.
