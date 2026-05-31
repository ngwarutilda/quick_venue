import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { ArrowLeft, Building2, Users, Layers, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScheduleTable } from "@/components/ScheduleTable";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getRoom, getRoomSchedule, isRoomOccupiedAt, type Room } from "@/api/rooms";
import type { TimetableEntry, Day } from "@/api/mockData";

const search = z.object({
  day: z.string().optional(),
  time: z.string().optional(),
  capacity: z.coerce.number().optional(),
});

export const Route = createFileRoute("/rooms/$id")({
  validateSearch: search,
  component: RoomDetail,
});

function RoomDetail() {
  const { id } = Route.useParams();
  const { day, time } = Route.useSearch();
  const [room, setRoom] = useState<Room | null | undefined>(undefined);
  const [entries, setEntries] = useState<TimetableEntry[] | null>(null);

  useEffect(() => {
    getRoom(id).then(setRoom);
    getRoomSchedule(id).then(setEntries);
  }, [id]);

  const matchesQuery =
    day && time && room && !isRoomOccupiedAt(room.id, day as Day, time);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" size="sm" className="mb-3 -ml-2">
          <Link to="/results" search={{ day: day || "Monday", time: time || "09:00", capacity: 30 }}>
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to results
          </Link>
        </Button>

        {room === undefined ? (
          <Skeleton className="h-10 w-64" />
        ) : room === null ? (
          <p className="text-muted-foreground">Room not found.</p>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-primary sm:text-4xl">{room.name}</h1>
            <p className="mt-1 text-muted-foreground">{room.building} · {room.department}</p>

            {matchesQuery && (
              <div className="mt-5 flex items-center gap-3 rounded-xl bg-accent/10 p-4 text-accent ring-1 ring-accent/30">
                <CheckCircle2 className="h-5 w-5" />
                <div>
                  <p className="font-semibold">This room is available at your requested time</p>
                  <p className="text-sm text-accent/80">{day} at {time}</p>
                </div>
              </div>
            )}

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <InfoCard icon={<Users className="h-5 w-5" />} label="Capacity" value={String(room.capacity)} />
              <InfoCard icon={<Building2 className="h-5 w-5" />} label="Building" value={room.building} />
              <InfoCard icon={<Layers className="h-5 w-5" />} label="Floor" value={room.floor} />
              <div className="rounded-xl bg-card p-4 shadow-sm ring-1 ring-border">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Facilities</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {room.facilities.map((f) => (
                    <Badge key={f} variant="secondary" className="bg-secondary text-secondary-foreground">
                      {f}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <h2 className="mt-10 text-xl font-bold text-primary">Weekly Schedule</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              <span className="mr-3 inline-block h-2 w-2 rounded-full bg-accent" />
              Free
              <span className="ml-4 mr-3 inline-block h-2 w-2 rounded-full bg-destructive" />
              Occupied
            </p>
            <div className="mt-4">
              {entries === null ? (
                <Skeleton className="h-80 w-full rounded-xl" />
              ) : (
                <ScheduleTable entries={entries} />
              )}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-card p-4 shadow-sm ring-1 ring-border">
      <div className="flex items-center gap-2 text-primary">
        {icon}
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      </div>
      <p className="mt-2 text-lg font-semibold text-foreground">{value}</p>
    </div>
  );
}
