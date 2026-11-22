import type { Room } from './rooms';

type Interval = {
  start: number;
  end: number;
};

type BookingRequest = {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: Interval[];
};

export function canBook({
  start,
  end,
  now,
  blocked,
  bookings,
}: BookingRequest): boolean {
  if (!(0 <= start && start < end && end <= 1440)) return false;
  if (!(start > now)) return false;
  if (end - start > 120) return false;
  if (blocked) return false;

  for (const b of bookings) {
    if (start < b.end && end > b.start) return false;
  }

  return true;
}

export function checkRoom(
  rooms: Room[],
  roomId: string,
  request: { start: number; end: number; now: number },
): boolean {
  const room = rooms.find(candidate => candidate.id === roomId);
  if (!room) return false;

  return canBook({
    ...request,
    blocked: room.blocked,
    bookings: room.bookings,
  });
}