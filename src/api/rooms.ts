import { delay } from "./client";
import { rooms, timetable, type Room, type TimetableEntry, type Day } from "./mockData";

export type { Room, TimetableEntry, Day };

function timeToMin(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + (m || 0);
}

export function isRoomOccupiedAt(roomId: string, day: Day, time: string): boolean {
  const t = timeToMin(time);
  return timetable.some(
    (e) =>
      e.roomId === roomId &&
      e.day === day &&
      t >= timeToMin(e.startTime) &&
      t < timeToMin(e.endTime)
  );
}

export interface SearchParams {
  day: Day;
  time: string;
  capacity: number;
}

export interface RoomResult extends Room {
  available: boolean;
  bestMatch?: boolean;
}

export async function searchRooms(params: SearchParams): Promise<RoomResult[]> {
  const results: RoomResult[] = rooms
    .filter((r) => r.capacity >= params.capacity)
    .map((r) => ({ ...r, available: !isRoomOccupiedAt(r.id, params.day, params.time) }));

  // best match = smallest capacity that satisfies and is available
  const available = results.filter((r) => r.available).sort((a, b) => a.capacity - b.capacity);
  if (available[0]) {
    const best = available[0];
    return delay(results.map((r) => (r.id === best.id ? { ...r, bestMatch: true } : r)));
  }
  return delay(results);
}

export async function getRoom(id: string): Promise<Room | null> {
  return delay(rooms.find((r) => r.id === id) ?? null);
}

export async function getAllRooms(): Promise<Room[]> {
  return delay(rooms);
}

export async function getRoomSchedule(roomId: string): Promise<TimetableEntry[]> {
  return delay(timetable.filter((e) => e.roomId === roomId));
}

export async function getStats() {
  const now = new Date();
  const dayIdx = now.getDay(); // 0=Sun
  const dayMap: Record<number, Day | null> = {
    0: null, 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday",
  };
  const day = dayMap[dayIdx];
  const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const availableNow = day
    ? rooms.filter((r) => !isRoomOccupiedAt(r.id, day, time)).length
    : rooms.length;
  const departments = new Set(rooms.map((r) => r.department)).size;
  return delay({ total: rooms.length, available: availableNow, departments });
}
