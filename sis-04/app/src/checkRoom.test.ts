import { expect, test } from 'vitest';
import { checkRoom } from './booking';
import { ROOMS } from './rooms';

test('F5: the same time gives different results for two rooms', () => {
  const request = { start: 600, end: 660, now: 540 };

  expect(checkRoom(ROOMS, 'a101', request)).toBe(false);
  expect(checkRoom(ROOMS, 'b204', request)).toBe(true);
});

test('F3: a blocked room is unavailable even with no bookings', () => {
  const request = { start: 600, end: 660, now: 540 };

  expect(checkRoom(ROOMS, 'd102', request)).toBe(false);
});

test('checkRoom rejects an unknown room ID', () => {
  const request = { start: 600, end: 660, now: 540 };

  expect(checkRoom(ROOMS, 'unknown', request)).toBe(false);
});