import { expect, test } from 'vitest';
import { checkRoom } from './booking';
import type { Room } from './rooms';

const rooms: Room[] = [
  {
    id: 'busy',
    name: 'Busy room',
    capacity: 12,
    equipment: [],
    blocked: false,
    bookings: [{ start: 600, end: 660 }],
  },
  {
    id: 'free',
    name: 'Free room',
    capacity: 24,
    equipment: [],
    blocked: false,
    bookings: [],
  },
  {
    id: 'blocked',
    name: 'Blocked room',
    capacity: 8,
    equipment: [],
    blocked: true,
    bookings: [],
  },
];

const request = { start: 600, end: 660, now: 540 };

test('F5: switching rooms checks the selected room’s bookings', () => {
  expect(checkRoom(rooms, 'busy', request)).toBe(false);
  expect(checkRoom(rooms, 'free', request)).toBe(true);
});

test('F3: a blocked room is unavailable even with no bookings', () => {
  expect(checkRoom(rooms, 'blocked', request)).toBe(false);
});

test('checkRoom rejects an unknown room ID', () => {
  expect(checkRoom(rooms, 'unknown', request)).toBe(false);
});
