import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Calendar, DoorClosed, LayoutDashboard, LogOut, Plus, Loader2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { AdminTable } from "@/components/AdminTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { listEntries, addEntry, updateEntry, deleteEntry } from "@/api/timetable";
import { DAYS, type TimetableEntry, type Day } from "@/api/mockData";

export const Route = createFileRoute("/admin")({
  component: Admin,
});

type View = "timetable" | "rooms" | "overview";

interface Room {
  _id: string;
  name: string;
  building: string;
  floor: string;
  capacity: number;
}

function Admin() {
  const [authed, setAuthed] = useState(false);
  const [view, setView] = useState<View>("timetable");

  if (!authed) return <Login onSuccess={() => setAuthed(true)} />;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="rounded-2xl bg-card p-3 shadow-sm ring-1 ring-border">
            <NavItem
              icon={<Calendar className="h-4 w-4" />}
              active={view === "timetable"}
              onClick={() => setView("timetable")}
            >
              Timetable
            </NavItem>
            <NavItem
              icon={<DoorClosed className="h-4 w-4" />}
              active={view === "rooms"}
              onClick={() => setView("rooms")}
            >
              Rooms
            </NavItem>
            <NavItem
              icon={<LayoutDashboard className="h-4 w-4" />}
              active={view === "overview"}
              onClick={() => setView("overview")}
            >
              Overview
            </NavItem>
            <div className="my-2 border-t border-border" />
            <NavItem icon={<LogOut className="h-4 w-4" />} onClick={() => setAuthed(false)}>
              Log out
            </NavItem>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          {view === "timetable" && <TimetableView />}
          {view === "rooms" && <RoomsView />}
          {view === "overview" && <OverviewView />}
        </main>
      </div>
    </div>
  );
}

function NavItem({
  children,
  icon,
  active,
  onClick,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        active ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:bg-secondary"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );
      const data = await res.json();
      if (data.success && data.data.role === "admin") {
        localStorage.setItem("token", data.data.token);
        onSuccess();
      } else {
        setError("Invalid credentials or not an admin");
      }
    } catch {
      setError("Server error. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4">
        <form
          onSubmit={submit}
          className="w-full max-w-md rounded-2xl bg-card p-8 shadow-lg ring-1 ring-border"
        >
          <h1 className="text-2xl font-bold text-primary">Admin Login</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to manage timetables and rooms.
          </p>
          <div className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@quickvenue.ub.cm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button
              type="submit"
              disabled={loading}
              className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Sign in
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}

const empty: Omit<TimetableEntry, "id"> = {
  roomId: "r1",
  day: "Monday",
  startTime: "08:00",
  endTime: "10:00",
  course: "",
  lecturer: "",
};

function TimetableView() {
  const [entries, setEntries] = useState<TimetableEntry[] | null>(null);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<TimetableEntry | null>(null);
  const [form, setForm] = useState<Omit<TimetableEntry, "id">>(empty);
  const [saving, setSaving] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);

  function refresh() {
    listEntries().then(setEntries);
  }

  useEffect(() => {
    refresh();
    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/classrooms`)
      .then((r) => r.json())
      .then((d) => setRooms(d.data || []));
  }, []);

  function openAdd() {
    setEditing(null);
    setForm(empty);
    setOpen(true);
  }
  function openEdit(e: TimetableEntry) {
    setEditing(e);
    const { id: _id, ...rest } = e;
    setForm(rest);
    setOpen(true);
  }
  async function save(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    if (editing) await updateEntry(editing.id, form);
    else await addEntry(form);
    setSaving(false);
    setOpen(false);
    refresh();
  }
  async function remove(id: string) {
    if (!confirm("Delete this entry?")) return;
    await deleteEntry(id);
    refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Timetable</h1>
          <p className="text-sm text-muted-foreground">Manage class schedules across all rooms.</p>
        </div>
        <Button
          onClick={openAdd}
          className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <Plus className="h-4 w-4" /> Add Entry
        </Button>
      </div>

      <div className="mt-6">
        {entries === null ? (
          <Skeleton className="h-72 w-full rounded-xl" />
        ) : (
          <AdminTable entries={entries} onEdit={openEdit} onDelete={remove} />
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Entry" : "Add Entry"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label>Room</Label>
              <Select value={form.roomId} onValueChange={(v) => setForm({ ...form, roomId: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {rooms.map((r) => (
                    <SelectItem key={r._id} value={r._id}>
                      {r.name} — {r.building}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Day</Label>
              <Select value={form.day} onValueChange={(v) => setForm({ ...form, day: v as Day })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DAYS.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div />
            <div className="space-y-1.5">
              <Label>Start Time</Label>
              <Input
                type="time"
                value={form.startTime}
                onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label>End Time</Label>
              <Input
                type="time"
                value={form.endTime}
                onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label>Course Name</Label>
              <Input
                value={form.course}
                onChange={(e) => setForm({ ...form, course: e.target.value })}
                required
                placeholder="MAT101 - Calculus I"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label>Lecturer Name</Label>
              <Input
                value={form.lecturer}
                onChange={(e) => setForm({ ...form, lecturer: e.target.value })}
                required
                placeholder="Dr. Tabi"
              />
            </div>
            <DialogFooter className="sm:col-span-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={saving}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {editing ? "Save Changes" : "Add Entry"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function RoomsView() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/classrooms`)
      .then((r) => r.json())
      .then((d) => setRooms(d.data || []));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary">Rooms</h1>
      <p className="text-sm text-muted-foreground">All venues registered in QuickVenue.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {rooms.map((r) => (
          <div key={r._id} className="rounded-xl bg-card p-5 shadow-sm ring-1 ring-border">
            <h3 className="font-semibold text-foreground">{r.name}</h3>
            <p className="text-sm text-muted-foreground">
              {r.building} · Floor {r.floor}
            </p>
            <p className="mt-2 text-sm text-foreground/80">
              Capacity: <span className="font-medium">{r.capacity}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function OverviewView() {
  const [stats, setStats] = useState({ total: 0, capacity: 0, departments: 0 });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/classrooms`)
      .then((r) => r.json())
      .then((d) => {
        const rooms: Room[] = d.data || [];
        setStats({
          total: rooms.length,
          capacity: rooms.reduce((s, r) => s + r.capacity, 0),
          departments: new Set(rooms.map((r) => r.building)).size,
        });
      });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary">Overview</h1>
      <p className="text-sm text-muted-foreground">A quick look at the QuickVenue network.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Stat label="Total Rooms" value={stats.total} />
        <Stat label="Total Capacity" value={stats.capacity} />
        <Stat label="Buildings" value={stats.departments} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-extrabold text-primary">{value}</p>
    </div>
  );
}
