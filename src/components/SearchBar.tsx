import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DAYS } from "@/api/mockData";

export function SearchBar() {
  const navigate = useNavigate();
  const [day, setDay] = useState<string>("Monday");
  const [time, setTime] = useState<string>("09:00");
  const [capacity, setCapacity] = useState<number>(30);
  const [loading, setLoading] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate({ to: "/results", search: { day, time, capacity } });
    }, 300);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid w-full grid-cols-1 gap-4 rounded-2xl bg-card p-6 shadow-lg ring-1 ring-border md:grid-cols-4"
    >
      <div className="space-y-1.5">
        <Label htmlFor="day">Day</Label>
        <Select value={day} onValueChange={setDay}>
          <SelectTrigger id="day" className="h-11">
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
      <div className="space-y-1.5">
        <Label htmlFor="time">Time</Label>
        <Input
          id="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="h-11"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="capacity">Capacity needed</Label>
        <Input
          id="capacity"
          type="number"
          min={1}
          value={capacity}
          onChange={(e) => setCapacity(Number(e.target.value) || 0)}
          className="h-11"
        />
      </div>
      <div className="flex items-end">
        <Button
          type="submit"
          disabled={loading}
          className="h-11 w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          Find Room
        </Button>
      </div>
    </form>
  );
}
