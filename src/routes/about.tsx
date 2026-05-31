import { createFileRoute } from "@tanstack/react-router";
import { Search, ListChecks, DoorOpen } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  const steps = [
    { icon: Search, t: "Search", d: "Enter the day, time, and how many seats you need." },
    { icon: ListChecks, t: "View Results", d: "Browse rooms with live availability and capacity info." },
    { icon: DoorOpen, t: "Pick a Room", d: "Check the schedule and head to your venue." },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          Built for the University of Buea
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
          About QuickVenue
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          QuickVenue is a Smart Venue Finder built to help University of Buea students, lecturers, and admins
          locate available classrooms in seconds — based on real-time timetable data, capacity, and faculty.
        </p>

        <h2 className="mt-12 text-2xl font-bold text-primary">How it works</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.t} className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <s.icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Step {i + 1}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-foreground">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-primary p-8 text-primary-foreground shadow-md">
          <h3 className="text-xl font-bold">Save time. Find space.</h3>
          <p className="mt-2 text-sm text-white/80">
            QuickVenue cuts the search for an empty room from minutes of walking to a few taps.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
