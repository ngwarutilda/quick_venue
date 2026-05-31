import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { ArrowLeft, Filter } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RoomCard } from "@/components/RoomCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { searchRooms, type RoomResult } from "@/api/rooms";
import { rooms as allRooms, type Day } from "@/api/mockData";

const searchSchema = z.object({
  day: z.string().default("Monday"),
  time: z.string().default("09:00"),
  capacity: z.coerce.number().default(30),
});

export const Route = createFileRoute("/results")({
  validateSearch: searchSchema,
  component: Results,
});

function Results() {
  const { day, time, capacity } = Route.useSearch();
  const [results, setResults] = useState<RoomResult[] | null>(null);
  const buildings = Array.from(new Set(allRooms.map((r) => r.building)));
  const [selectedBuildings, setSelectedBuildings] = useState<string[]>([]);
  const [minCap, setMinCap] = useState<number>(0);
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  useEffect(() => {
    setResults(null);
    searchRooms({ day: day as Day, time, capacity }).then(setResults);
  }, [day, time, capacity]);

  const filtered = (results ?? []).filter(
    (r) =>
      (selectedBuildings.length === 0 || selectedBuildings.includes(r.building)) &&
      r.capacity >= minCap &&
      (!onlyAvailable || r.available)
  );
  const best = filtered.find((r) => r.bestMatch);
  const others = filtered.filter((r) => !r.bestMatch);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" size="sm" className="mb-3 -ml-2">
          <Link to="/">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-primary sm:text-3xl">Search Results</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {day} · {time} · seats ≥ {capacity}
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="h-fit rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border lg:sticky lg:top-20">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <Filter className="h-4 w-4" />
              <h2 className="font-semibold">Filters</h2>
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Buildings</Label>
              {buildings.map((b) => (
                <label key={b} className="flex cursor-pointer items-center gap-2 text-sm">
                  <Checkbox
                    checked={selectedBuildings.includes(b)}
                    onCheckedChange={(c) =>
                      setSelectedBuildings((prev) =>
                        c ? [...prev, b] : prev.filter((x) => x !== b)
                      )
                    }
                  />
                  {b}
                </label>
              ))}
            </div>

            <div className="mt-5 space-y-3">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                Min capacity: {minCap}
              </Label>
              <Slider value={[minCap]} onValueChange={(v) => setMinCap(v[0])} min={0} max={300} step={10} />
            </div>

            <label className="mt-5 flex cursor-pointer items-center gap-2 text-sm">
              <Checkbox
                checked={onlyAvailable}
                onCheckedChange={(c) => setOnlyAvailable(!!c)}
              />
              Only available
            </label>
          </aside>

          <section>
            {results === null ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-52 rounded-xl" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="rounded-2xl bg-card p-10 text-center shadow-sm ring-1 ring-border">
                <p className="text-muted-foreground">No rooms match your criteria.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {best && (
                  <div>
                    <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      Recommended
                    </h2>
                    <RoomCard room={best} />
                  </div>
                )}
                <div>
                  {best && (
                    <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      Other rooms
                    </h2>
                  )}
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {others.map((r) => (
                      <RoomCard key={r.id} room={r} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
