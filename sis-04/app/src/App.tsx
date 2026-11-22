import { useState } from 'react';
import { checkRoom } from './booking';
import { filterRooms } from './filter';
import { ROOMS } from './rooms';

const EQUIPMENT = [...new Set(ROOMS.flatMap(room => room.equipment))];

function toMinutes(value: string) {
  const [hours, minutes] = value.split(':').map(Number);
  return hours * 60 + minutes;
}

function formatTime(minutes: number) {
  const hours = String(Math.floor(minutes / 60)).padStart(2, '0');
  const remainder = String(minutes % 60).padStart(2, '0');
  return `${hours}:${remainder}`;
}

export default function App() {
  const [attendees, setAttendees] = useState('1');
  const [equipment, setEquipment] = useState<string[]>([]);
  const [roomId, setRoomId] = useState('a101');
  const [now, setNow] = useState('09:00');
  const [start, setStart] = useState('11:00');
  const [end, setEnd] = useState('12:00');
  const [endOfDay, setEndOfDay] = useState(false);
  const [result, setResult] = useState<boolean | null>(null);
  const [error, setError] = useState('');

  const matchingRooms = filterRooms(ROOMS, {
    attendees: Number(attendees),
    equipment,
  });
  const room = matchingRooms.find(candidate => candidate.id === roomId)
    ?? matchingRooms[0];

  function clearFeedback() {
    setResult(null);
    setError('');
  }

  function toggleEquipment(item: string, checked: boolean) {
    setEquipment(current =>
      checked ? [...current, item] : current.filter(value => value !== item),
    );
    clearFeedback();
  }

  function check() {
    clearFeedback();
    if (!room) return;

    if (!start || !now || (!end && !endOfDay)) {
      setError('Fill in the current time, the start and the end.');
      return;
    }

    const request = {
      start: toMinutes(start),
      end: endOfDay ? 1440 : toMinutes(end),
      now: toMinutes(now),
    };

    const available = checkRoom(ROOMS, room.id, request);
    if (!available && request.start >= request.end) {
      setError('The end time must be after the start time.');
    }
    setResult(available);
  }

  return (
    <main className="page">
      <h1>Smart Campus Room Availability</h1>

      <fieldset>
        <legend>Room filters</legend>
        <div className="row">
          <label>
            Attendees
            <input
              type="number"
              min="1"
              step="1"
              value={attendees}
              onChange={event => {
                setAttendees(event.target.value);
                clearFeedback();
              }}
            />
          </label>

          {EQUIPMENT.map(item => (
            <label className="inline" key={item}>
              <input
                type="checkbox"
                checked={equipment.includes(item)}
                onChange={event => toggleEquipment(item, event.target.checked)}
              />
              {item}
            </label>
          ))}
        </div>
      </fieldset>

      {!room && <p role="status">No rooms match the selected requirements.</p>}

      <div className="row">
        <label>
          Room
          <select
            value={room?.id ?? ''}
            disabled={!room}
            onChange={event => {
              setRoomId(event.target.value);
              clearFeedback();
            }}
          >
            {!room && <option value="">No matching rooms</option>}
            {matchingRooms.map(candidate => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.name} ({candidate.capacity} seats)
                {candidate.blocked ? ' — blocked' : ''}
              </option>
            ))}
          </select>
        </label>

        <label>
          Current time
          <input type="time" value={now} onChange={event => {
            setNow(event.target.value);
            clearFeedback();
          }} />
        </label>
        <label>
          Start
          <input type="time" value={start} onChange={event => {
            setStart(event.target.value);
            clearFeedback();
          }} />
        </label>
        <label>
          End
          <input type="time" value={end} disabled={endOfDay} onChange={event => {
            setEnd(event.target.value);
            clearFeedback();
          }} />
        </label>
        <label className="inline">
          <input type="checkbox" checked={endOfDay} onChange={event => {
            setEndOfDay(event.target.checked);
            clearFeedback();
          }} />
          Ends at 24:00
        </label>
      </div>

      <button onClick={check} disabled={!room}>Check availability</button>

      <div aria-live="polite">
        {error && <p className="error">{error}</p>}
        {result !== null && room && (
          <p className={`result ${result ? 'available' : 'unavailable'}`}>
            {room.name}: {result ? 'Available' : 'Unavailable'}
          </p>
        )}
      </div>

      {room && (
        <>
          <h2>Existing bookings</h2>
          <ul>
            {room.bookings.length === 0 ? <li>None</li> : room.bookings.map(booking => (
              <li key={`${booking.start}-${booking.end}`}>
                {formatTime(booking.start)}–{formatTime(booking.end)}
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}