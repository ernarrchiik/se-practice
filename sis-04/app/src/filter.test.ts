import { expect, test } from 'vitest';
import { filterRooms } from './filter';
import { ROOMS } from './rooms';

test('F1: rooms at the requested capacity or above are included', () => {
  const result = filterRooms(ROOMS, { attendees: 24, equipment: [] });

  expect(result.map(room => room.id)).toEqual(['b204', 'c301']);
});

test('F2: a room must have all requested equipment', () => {
  const result = filterRooms(ROOMS, {
    attendees: 1,
    equipment: ['whiteboard', 'projector'],
  });

  expect(result.map(room => room.id)).toEqual(['b204']);
});

test('F4: the filter returns an empty list when no room matches', () => {
  const result = filterRooms(ROOMS, { attendees: 41, equipment: [] });

  expect(result).toEqual([]);
});