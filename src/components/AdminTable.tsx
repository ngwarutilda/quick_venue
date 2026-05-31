import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TimetableEntry } from "@/api/mockData";
import { rooms } from "@/api/mockData";

interface Props {
  entries: TimetableEntry[];
  onEdit: (entry: TimetableEntry) => void;
  onDelete: (id: string) => void;
}

export function AdminTable({ entries, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary/60">
            <TableHead>Room</TableHead>
            <TableHead>Day</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Lecturer</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                No timetable entries yet.
              </TableCell>
            </TableRow>
          )}
          {entries.map((e) => {
            const room = rooms.find((r) => r.id === e.roomId);
            return (
              <TableRow key={e.id}>
                <TableCell className="font-medium">{room?.name ?? e.roomId}</TableCell>
                <TableCell>{e.day}</TableCell>
                <TableCell>
                  {e.startTime} – {e.endTime}
                </TableCell>
                <TableCell>{e.course}</TableCell>
                <TableCell>{e.lecturer}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button size="icon" variant="ghost" onClick={() => onEdit(e)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onDelete(e.id)}
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
