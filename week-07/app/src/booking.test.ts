import { describe, expect, it } from 'vitest';
import { canBook } from './booking';

type BookingRequest = Parameters<typeof canBook>[0];

const NOW = 540;

function fixture(
  overrides: Partial<BookingRequest> = {},
): BookingRequest {
  return {
    start: 660,
    end: 720,
    now: NOW,
    blocked: false,
    ...overrides,
    bookings: (
      overrides.bookings ?? [{ start: 600, end: 660 }]
    ).map(booking => ({ ...booking })),
  };
}

// Checks both the original array and the data retained by the request.
// The decision assertion stays explicit inside every test.
function checkWithoutMutation(request: BookingRequest): boolean {
  const originalBookings = request.bookings;
  const before = originalBookings.map(booking => ({ ...booking }));

  const decision = canBook(request);

  expect.soft(originalBookings).toStrictEqual(before);
  expect.soft(request.bookings).toStrictEqual(before);

  return decision;
}

describe('canBook — reviewed decisions and booking data preservation', () => {
  it('T01: AC4 allows touching after an existing booking', () => {
    const request = fixture({ start: 660, end: 720 });

    expect(checkWithoutMutation(request)).toBe(true);
  });

  it('T02: AC1 rejects a start equal to now', () => {
    const request = fixture({ start: 540, end: 570 });

    expect(checkWithoutMutation(request)).toBe(false);
  });

  it('T03: AC1 rejects zero duration', () => {
    const request = fixture({ start: 720, end: 720 });

    expect(checkWithoutMutation(request)).toBe(false);
  });

  it('T04: AC1 rejects a reversed interval', () => {
    const request = fixture({ start: 750, end: 720 });

    expect(checkWithoutMutation(request)).toBe(false);
  });

  it('T05: AC1 rejects an end past 1440', () => {
    const request = fixture({ start: 1380, end: 1441 });

    expect(checkWithoutMutation(request)).toBe(false);
  });

  it('T06: AC2 allows exactly 120 minutes', () => {
    const request = fixture({ start: 720, end: 840 });

    expect(checkWithoutMutation(request)).toBe(true);
  });

  it('T07: AC2 rejects 121 minutes', () => {
    const request = fixture({ start: 720, end: 841 });

    expect(checkWithoutMutation(request)).toBe(false);
  });

  it('T08: AC4 allows touching before an existing booking', () => {
    const request = fixture({ start: 570, end: 600 });

    expect(checkWithoutMutation(request)).toBe(true);
  });

  it('T09: AC4 rejects partial overlap', () => {
    const request = fixture({ start: 630, end: 690 });

    expect(checkWithoutMutation(request)).toBe(false);
  });

  it('T10: AC4 rejects a request containing an existing booking', () => {
    const request = fixture({ start: 570, end: 690 });

    expect(checkWithoutMutation(request)).toBe(false);
  });

  it('T11: AC4 rejects a request inside an existing booking', () => {
    const request = fixture({ start: 615, end: 645 });

    expect(checkWithoutMutation(request)).toBe(false);
  });

  it('T12: AC4 rejects an identical interval', () => {
    const request = fixture({ start: 600, end: 660 });

    expect(checkWithoutMutation(request)).toBe(false);
  });

  it('T13: AC3 rejects an otherwise valid request when blocked', () => {
    const request = fixture({
      start: 660,
      end: 720,
      blocked: true,
    });

    expect(checkWithoutMutation(request)).toBe(false);
  });

  it('T14: AC4 allows a valid request with no existing bookings', () => {
    const request = fixture({
      start: 630,
      end: 690,
      bookings: [],
    });

    expect(checkWithoutMutation(request)).toBe(true);
  });

  it('X1: AC1 allows an end exactly at 1440', () => {
    const request = fixture({ start: 1380, end: 1440 });

    expect(checkWithoutMutation(request)).toBe(true);
  });

  it('X2: AC4 allows touching both neighbouring bookings', () => {
    const request = fixture({
      start: 660,
      end: 720,
      bookings: [
        { start: 600, end: 660 },
        { start: 720, end: 780 },
      ],
    });

    expect(checkWithoutMutation(request)).toBe(true);
  });

  it('B01: AC1 rejects a negative start', () => {
    // Earlier supplied now isolates the start >= 0 requirement.
    const request = fixture({
      start: -1,
      end: 30,
      now: -2,
      bookings: [],
    });

    expect(checkWithoutMutation(request)).toBe(false);
  });

  it('B02: AC1 rejects a start before now', () => {
    const request = fixture({ start: 539, end: 570 });

    expect(checkWithoutMutation(request)).toBe(false);
  });

  it('B03: AC1 allows a start one minute after now', () => {
    const request = fixture({ start: 541, end: 570 });

    expect(checkWithoutMutation(request)).toBe(true);
  });

  it('B04: AC1 allows start zero with an earlier supplied now', () => {
    // Follows literal AC1; permitted bounds for now remain unspecified.
    const request = fixture({
      start: 0,
      end: 30,
      now: -1,
      bookings: [],
    });

    expect(checkWithoutMutation(request)).toBe(true);
  });

  it('B05: AC4 rejects overlap in the second unsorted booking', () => {
    const request = fixture({
      start: 630,
      end: 690,
      bookings: [
        { start: 900, end: 960 },
        { start: 600, end: 660 },
      ],
    });

    expect(checkWithoutMutation(request)).toBe(false);
  });

  it('B06: AC2 allows 119 minutes', () => {
    const request = fixture({ start: 720, end: 839 });

    expect(checkWithoutMutation(request)).toBe(true);
  });

  it('B07: AC1 allows a one-minute duration', () => {
    const request = fixture({ start: 720, end: 721 });

    expect(checkWithoutMutation(request)).toBe(true);
  });

  it('B08: AC4 rejects overlap with the first minute of a booking', () => {
    const request = fixture({ start: 570, end: 601 });

    expect(checkWithoutMutation(request)).toBe(false);
  });

  it('B09: AC4 rejects overlap with the last minute of a booking', () => {
    const request = fixture({ start: 659, end: 720 });

    expect(checkWithoutMutation(request)).toBe(false);
  });

  it('B10: AC4 allows a request separated before a booking', () => {
    const request = fixture({ start: 570, end: 599 });

    expect(checkWithoutMutation(request)).toBe(true);
  });

  it('B11: AC4 allows a request separated after a booking', () => {
    const request = fixture({ start: 661, end: 720 });

    expect(checkWithoutMutation(request)).toBe(true);
  });

  it('B12: AC3 rejects a blocked room with no existing bookings', () => {
    const request = fixture({
      blocked: true,
      bookings: [],
    });

    expect(checkWithoutMutation(request)).toBe(false);
  });

  it('B13: AC1 respects a different supplied current time', () => {
    const request = fixture({
      start: 660,
      end: 720,
      now: 700,
    });

    expect(checkWithoutMutation(request)).toBe(false);
  });

  it('AC5: repeated available checks preserve unsorted booking data', () => {
    const request = fixture({
      start: 660,
      end: 720,
      bookings: [
        { start: 900, end: 960 },
        { start: 600, end: 660 },
      ],
    });
    const originalBookings = request.bookings;
    const before = originalBookings.map(booking => ({ ...booking }));

    const firstDecision = checkWithoutMutation(request);
    expect.soft(firstDecision).toBe(true);
    expect.soft(originalBookings).toStrictEqual(before);
    expect.soft(request.bookings).toStrictEqual(before);

    const secondDecision = checkWithoutMutation(request);
    expect.soft(secondDecision).toBe(true);
    expect.soft(originalBookings).toStrictEqual(before);
    expect.soft(request.bookings).toStrictEqual(before);
  });
});