import { expect, test } from 'vitest';
import { checkRoom } from './booking';
import { filterRooms } from './filter';
import type { Room } from './rooms';

const rooms: Room[] = [
  {
    id: 'a101',
    name: 'Room A-101',
    capacity: 23,
    equipment: ['whiteboard'],
    blocked: false,
    bookings: [],
  },
  {
    id: 'b204',
    name: 'Room B-204',
    capacity: 24,
    equipment: ['whiteboard', 'projector'],
    blocked: false,
    bookings: [],
  },
  {
    id: 'c301',
    name: 'Room C-301',
    capacity: 40,
    equipment: ['projector'],
    blocked: false,
    bookings: [],
  },
];

test('F1: rooms at the requested capacity or above are included', () => {
  const matches = filterRooms(rooms, { attendees: 24, equipment: [] });
  expect(matches.map(room => room.id)).toEqual(['b204', 'c301']);
});

test('F2: a room must have all requested equipment', () => {
  const matches = filterRooms(rooms, {
    attendees: 1,
    equipment: ['whiteboard', 'projector'],
  });
  expect(matches.map(room => room.id)).toEqual(['b204']);
});

test('F4: the filter returns an empty list when no room matches', () => {
  const matches = filterRooms(rooms, { attendees: 41, equipment: [] });
  expect(matches).toEqual([]);
});

test('B5: a room with exactly enough seats is included', () => {
  const matches = filterRooms(rooms, { attendees: 24, equipment: [] });
  expect(matches.map(room => room.id)).toContain('b204');
});

test('B6: a room one seat below the requirement is excluded', () => {
  const matches = filterRooms(rooms, { attendees: 24, equipment: [] });
  expect(matches.map(room => room.id)).not.toContain('a101');
});

test('INT: check availability for a room returned by the filter', () => {
  const matches = filterRooms(rooms, {
    attendees: 24,
    equipment: ['whiteboard', 'projector'],
  });

  expect(matches.map(room => room.id)).toEqual(['b204']);
  expect(checkRoom(matches, matches[0]!.id, {
    start: 600,
    end: 660,
    now: 540,
  })).toBe(true);
});
