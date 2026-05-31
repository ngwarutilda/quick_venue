import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { Skeleton } from "@/components/ui/skeleton";
import { getStats } from "@/api/rooms";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [stats, setStats] = useState<{ total: number; available: number; departments: number } | null>(null);

  useEffect(() => {
    getStats().then(setStats);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-[#0f2647] text-primary-foreground">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
                University of Buea · Smart Venue Finder
              </span>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Find a Free Classroom <span className="text-accent">in Seconds</span>
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/80 sm:text-lg">
                Search by day, time, and capacity. We'll show you what's open right now across every faculty.
              </p>
            </div>
            <div className="mx-auto mt-10 max-w-4xl">
              <SearchBar />
            </div>
          </div>
        </section>

        <section className="mx-auto -mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 rounded-2xl bg-card p-6 shadow-md ring-1 ring-border sm:grid-cols-3">
            <Stat label="Total Rooms" value={stats?.total} />
            <Stat label="Rooms Available Now" value={stats?.available} accent />
            <Stat label="Departments Covered" value={stats?.departments} />
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { t: "Real-time", d: "See availability based on the current timetable." },
              { t: "Capacity-aware", d: "Filter by how many people you need to seat." },
              { t: "Campus-wide", d: "Every faculty and building, one search." },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
                <h3 className="font-semibold text-primary">{f.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value?: number; accent?: boolean }) {
  return (
    <div className="text-center">
      {value === undefined ? (
        <Skeleton className="mx-auto h-9 w-16" />
      ) : (
        <div className={`text-3xl font-extrabold ${accent ? "text-accent" : "text-primary"}`}>
          {value}
        </div>
      )}
      <div className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
