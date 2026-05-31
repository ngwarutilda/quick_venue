import { delay } from "./client";
import { timetable, type TimetableEntry } from "./mockData";

let store: TimetableEntry[] = [...timetable];

export async function listEntries(): Promise<TimetableEntry[]> {
  return delay([...store]);
}

export async function addEntry(entry: Omit<TimetableEntry, "id">): Promise<TimetableEntry> {
  const created = { ...entry, id: `t${Date.now()}` };
  store = [...store, created];
  return delay(created);
}

export async function updateEntry(id: string, entry: Omit<TimetableEntry, "id">): Promise<TimetableEntry> {
  store = store.map((e) => (e.id === id ? { ...entry, id } : e));
  return delay({ ...entry, id });
}

export async function deleteEntry(id: string): Promise<void> {
  store = store.filter((e) => e.id !== id);
  return delay(undefined);
}
