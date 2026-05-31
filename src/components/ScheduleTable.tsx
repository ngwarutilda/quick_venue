import { DAYS, type TimetableEntry } from "@/api/mockData";

const SLOTS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

function timeToMin(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + (m || 0);
}

export function ScheduleTable({ entries }: { entries: TimetableEntry[] }) {
  function entryAt(day: string, slot: string) {
    const t = timeToMin(slot);
    return entries.find(
      (e) => e.day === day && t >= timeToMin(e.startTime) && t < timeToMin(e.endTime)
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full min-w-[700px] text-sm">
        <thead>
          <tr className="bg-secondary/60">
            <th className="px-3 py-3 text-left font-semibold text-primary">Time</th>
            {DAYS.map((d) => (
              <th key={d} className="px-3 py-3 text-left font-semibold text-primary">
                {d.slice(0, 3)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SLOTS.map((slot) => (
            <tr key={slot} className="border-t border-border">
              <td className="px-3 py-2 font-medium text-foreground/70">{slot}</td>
              {DAYS.map((d) => {
                const e = entryAt(d, slot);
                return (
                  <td key={d} className="px-2 py-2">
                    <div
                      className={`rounded-md px-2 py-1.5 text-xs ${
                        e
                          ? "bg-destructive/10 text-destructive"
                          : "bg-accent/10 text-accent"
                      }`}
                    >
                      {e ? e.course.split(" - ")[0] : "Free"}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
