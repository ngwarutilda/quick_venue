import { Link } from "@tanstack/react-router";
import { Users, MapPin, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { RoomResult } from "@/api/rooms";

export function RoomCard({ room }: { room: RoomResult }) {
  return (
    <Card
      className={`group overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg ${
        room.bestMatch ? "ring-2 ring-accent" : ""
      }`}
    >
      <CardContent className="p-5">
        {room.bestMatch && (
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
            <Crown className="h-3.5 w-3.5" />
            Best Match
          </div>
        )}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{room.name}</h3>
            <p className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {room.building}
            </p>
          </div>
          <Badge
            className={
              room.available
                ? "bg-accent text-accent-foreground hover:bg-accent"
                : "bg-destructive text-destructive-foreground hover:bg-destructive"
            }
          >
            {room.available ? "Available" : "Occupied"}
          </Badge>
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-sm text-foreground/80">
          <Users className="h-4 w-4 text-primary" />
          <span>Capacity: {room.capacity}</span>
        </div>
        <Button asChild variant="outline" className="mt-5 w-full">
          <Link to="/rooms/$id" params={{ id: room.id }}>
            View Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
