# Acceptance criteria — three selected stories

## Assumptions

- **Overlap:** A booking that ends exactly when another begins is allowed under R3 because the intervals do not overlap.
- **Duration:** A booking of exactly two hours is allowed under R2 because two hours is the maximum permitted duration.
- Unblocking a room does not remove existing bookings; R1–R3 still apply.

---

## US-02 — Book Room

### AC-01 — Successful booking
- **Given** a study room is unblocked and has no booking during a future one-hour time slot,
- **When** a student requests that room for that time slot,
- **Then** the system creates the booking and confirms it.

### AC-02 — Start time must be in the future
- **Given** the current time is 14:00 and a study room is unblocked and free from 14:00 to 15:00,
- **When** a student requests a booking for that interval,
- **Then** the system rejects the booking because its start time is not in the future.

### AC-03 — Duration exceeds two hours
- **Given** a study room is unblocked and free during a future three-hour interval,
- **When** a student requests to book it for that interval,
- **Then** the system rejects the booking because its duration exceeds two hours.

### AC-04 — Reject overlapping bookings
- **Given** an unblocked study room is already booked tomorrow from 14:00 to 15:00,
- **When** a student requests the same room tomorrow from 14:30 to 15:30,
- **Then** the system rejects the request because it overlaps an existing booking for that room.

### AC-05 — Reject booking of a blocked room
- **Given** a study room is blocked and has no booking tomorrow from 14:00 to 15:00,
- **When** a student requests that room for this interval,
- **Then** the system rejects the request because the room is blocked.

## US-03 — Cancel Booking

### AC-06 — Successful cancellation
- **Given** a student owns an existing booking for an unblocked study room tomorrow from 14:00 to 15:00,
- **When** that student requests cancellation of the booking,
- **Then** the system cancels the booking and releases the reserved time slot.

### AC-07 — Confirm cancellation
- **Given** a student owns an existing future booking,
- **When** the student requests cancellation of that booking,
- **Then** the system successfully cancels the booking and sends the student confirmation that it was cancelled.

### AC-08 — Reject cancellation of a non-existent booking
- **Given** no booking exists with the ID supplied by a student,
- **When** the student requests cancellation using that ID,
- **Then** the system rejects the request and reports that the booking was not found.

### AC-09 — Reject cancellation of another student's booking
- **Given** an existing future booking belongs to Student A,
- **When** Student B requests cancellation of that booking,
- **Then** the system rejects the request and keeps the booking unchanged.

## US-06 — Block or Unblock Room

### AC-10 — Successfully block a room
- **Given** a study room is unblocked,
- **When** an administrator requests to block that room,
- **Then** the system marks the room as blocked, preventing new bookings under R4.

### AC-11 — Successfully unblock a room
- **Given** a study room is blocked,
- **When** an administrator requests to unblock that room,
- **Then** the system marks the room as unblocked, allowing booking requests that satisfy R1–R3.

### AC-12 — Reject booking after blocking
- **Given** an administrator has blocked a room with no booking tomorrow from 14:00 to 15:00,
- **When** a student requests that room for this interval,
- **Then** the system rejects the request because the room is blocked and creates no booking.