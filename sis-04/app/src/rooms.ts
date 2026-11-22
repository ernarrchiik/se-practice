type Interval = { start: number; end: number };

export type Room = {
  id: string;
  name: string;
  capacity: number;
  equipment: string[];
  blocked: boolean;
  bookings: Interval[];
};

export const ROOMS: Room[] = [
  {
    id: 'a101',
    name: 'Room A-101',
    capacity: 12,
    equipment: ['whiteboard'],
    blocked: false,
    bookings: [{ start: 600, end: 660 }],
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
    equipment: ['projector', 'video conferencing'],
    blocked: false,
    bookings: [{ start: 780, end: 840 }],
  },
  {
    id: 'd102',
    name: 'Room D-102',
    capacity: 8,
    equipment: ['whiteboard'],
    blocked: true,
    bookings: [],
  },
];