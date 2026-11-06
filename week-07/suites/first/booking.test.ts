import { describe, expect, it } from 'vitest';
import { canBook } from './booking';

type Request = Parameters<typeof canBook>[0];

// Time is supplied explicitly: no wall clock or fake timers are needed.
const NOW = 540;
const fixture = (overrides: Partial<Request> = {}): Request => ({
  start: 660,
  end: 720,
  now: NOW,
  blocked: false,
  bookings: [{ start: 600, end: 660 }],
  ...overrides,
  // Clone overrides too, so table rows never share mutable booking objects.
  ...('bookings' in overrides
    ? { bookings: overrides.bookings!.map(b => ({ ...b })) }
    : {}),
});

type Case = {
  id: string;
  rule: string;
  input: Partial<Request>;
  expected: boolean;
};

const cases: Case[] = [
  { id: 'T01', rule: 'AC4 touching after', input: {}, expected: true },
  { id: 'T02', rule: 'AC1 starts now', input: { start: 540, end: 570 }, expected: false },
  { id: 'T03', rule: 'AC1 zero duration', input: { start: 720, end: 720 }, expected: false },
  { id: 'T04', rule: 'AC1 reversed', input: { start: 750, end: 720 }, expected: false },
  { id: 'T05', rule: 'AC1 past day end', input: { start: 1380, end: 1441 }, expected: false },
  { id: 'T06', rule: 'AC2 exactly 120 minutes', input: { start: 720, end: 840 }, expected: true },
  { id: 'T07', rule: 'AC2 exceeds 120 minutes', input: { start: 720, end: 841 }, expected: false },
  { id: 'T08', rule: 'AC4 touching before', input: { start: 570, end: 600 }, expected: true },
  { id: 'T09', rule: 'AC4 partial overlap', input: { start: 630, end: 690 }, expected: false },
  { id: 'T10', rule: 'AC4 contains booking', input: { start: 570, end: 690 }, expected: false },
  { id: 'T11', rule: 'AC4 inside booking', input: { start: 615, end: 645 }, expected: false },
  { id: 'T12', rule: 'AC4 identical interval', input: { start: 600, end: 660 }, expected: false },
  { id: 'T13', rule: 'AC3 blocked room', input: { blocked: true }, expected: false },
  { id: 'T14', rule: 'AC4 no bookings', input: { start: 630, end: 690, bookings: [] }, expected: true },
  { id: 'X1', rule: 'AC1 ends exactly at 1440', input: { start: 1380, end: 1440 }, expected: true },
  { id: 'X2', rule: 'AC4 touches both neighbours', input: { bookings: [{ start: 600, end: 660 }, { start: 720, end: 780 }] }, expected: true },
  // Additional boundary checks derived directly from AC1 and AC4.
  { id: 'B01', rule: 'AC1 negative start', input: { start: -1, end: 30, now: -2, bookings: [] }, expected: false },
  { id: 'B02', rule: 'AC1 starts before now', input: { start: 539, end: 570 }, expected: false },
  { id: 'B03', rule: 'AC1 starts one minute after now', input: { start: 541, end: 570 }, expected: true },
  { id: 'B04', rule: 'AC1 lower bound zero with earlier supplied now', input: { start: 0, end: 30, now: -1, bookings: [] }, expected: true },
  { id: 'B05', rule: 'AC4 overlap in second unsorted booking', input: { start: 630, end: 690, bookings: [{ start: 900, end: 960 }, { start: 600, end: 660 }] }, expected: false },
];

describe('canBook — reviewed decisions and booking data preservation', () => {
  it.each(cases)('$id: $rule => $expected', ({ input, expected }) => {
    const request = fixture(input);
    const before = request.bookings.map(b => ({ ...b }));

    const decision = canBook(request);

    // Assert preservation before the decision so it is checked even on a wrong result.
    expect(request.bookings).toStrictEqual(before);
    expect(decision).toBe(expected);
  });

  it('AC5: repeated available checks leave unsorted booking data unchanged', () => {
    const request = fixture({
      bookings: [{ start: 900, end: 960 }, { start: 600, end: 660 }],
    });
    const before = request.bookings.map(b => ({ ...b }));

    for (let attempt = 0; attempt < 2; attempt += 1) {
      const decision = canBook(request);
      expect(request.bookings).toStrictEqual(before);
      expect(decision).toBe(true);
    }
  });
});
