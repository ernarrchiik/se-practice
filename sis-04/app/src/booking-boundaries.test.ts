import { expect, test } from 'vitest';
import { canBook } from './booking';

test('B1 AC2: exactly 120 minutes is available', () => {
  expect(canBook({
    start: 720, end: 840, now: 540, blocked: false, bookings: [],
  })).toBe(true);
});

test('B2 AC2: 121 minutes is unavailable', () => {
  expect(canBook({
    start: 720, end: 841, now: 540, blocked: false, bookings: [],
  })).toBe(false);
});

test('B3 AC4: touching an existing booking is available', () => {
  expect(canBook({
    start: 660, end: 720, now: 540, blocked: false,
    bookings: [{ start: 600, end: 660 }],
  })).toBe(true);
});

test('B4 AC4: overlapping an existing booking is unavailable', () => {
  expect(canBook({
    start: 630, end: 690, now: 540, blocked: false,
    bookings: [{ start: 600, end: 660 }],
  })).toBe(false);
});

test('AC5: an available check preserves the original bookings', () => {
  const bookings = [{ start: 600, end: 660 }];
  const before = bookings.map(booking => ({ ...booking }));

  expect(canBook({
    start: 660, end: 720, now: 540, blocked: false, bookings,
  })).toBe(true);
  expect(bookings).toEqual(before);
});
