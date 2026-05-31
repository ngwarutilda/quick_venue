export type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
export const DAYS: Day[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export interface Room {
  id: string;
  name: string;
  building: string;
  floor: string;
  capacity: number;
  facilities: string[];
  department: string;
}

export interface TimetableEntry {
  id: string;
  roomId: string;
  day: Day;
  startTime: string; // "08:00"
  endTime: string; // "10:00"
  course: string;
  lecturer: string;
}

export const rooms: Room[] = [
  { id: "r1", name: "AMP 150", building: "Amphitheatre Block", floor: "Ground", capacity: 150, facilities: ["Projector", "Whiteboard", "AC", "Microphone"], department: "Science" },
  { id: "r2", name: "AMP 250", building: "Amphitheatre Block", floor: "1st", capacity: 250, facilities: ["Projector", "Whiteboard", "AC"], department: "Arts" },
  { id: "r3", name: "FET Hall A", building: "Faculty of Engineering", floor: "Ground", capacity: 80, facilities: ["Projector", "Whiteboard"], department: "Engineering" },
  { id: "r4", name: "FET Hall B", building: "Faculty of Engineering", floor: "1st", capacity: 60, facilities: ["Whiteboard", "AC"], department: "Engineering" },
  { id: "r5", name: "Law Auditorium", building: "Faculty of Law", floor: "Ground", capacity: 200, facilities: ["Projector", "Microphone", "AC"], department: "Law" },
  { id: "r6", name: "FHS Room 12", building: "Health Sciences", floor: "2nd", capacity: 40, facilities: ["Whiteboard", "Projector"], department: "Health" },
  { id: "r7", name: "FEMS 101", building: "Faculty of Economics", floor: "1st", capacity: 100, facilities: ["Projector", "AC"], department: "Economics" },
  { id: "r8", name: "FEMS 202", building: "Faculty of Economics", floor: "2nd", capacity: 75, facilities: ["Whiteboard"], department: "Economics" },
  { id: "r9", name: "Library Hall", building: "Central Library", floor: "Ground", capacity: 120, facilities: ["AC", "Projector", "Whiteboard"], department: "General" },
  { id: "r10", name: "FET Lab 3", building: "Faculty of Engineering", floor: "2nd", capacity: 35, facilities: ["Computers", "Projector", "AC"], department: "Engineering" },
];

export const timetable: TimetableEntry[] = [
  { id: "t1", roomId: "r1", day: "Monday", startTime: "08:00", endTime: "10:00", course: "MAT101 - Calculus I", lecturer: "Dr. Tabi" },
  { id: "t2", roomId: "r1", day: "Monday", startTime: "10:00", endTime: "12:00", course: "PHY110 - Mechanics", lecturer: "Prof. Nkeng" },
  { id: "t3", roomId: "r2", day: "Tuesday", startTime: "09:00", endTime: "11:00", course: "ENG201 - Literature", lecturer: "Dr. Ayuk" },
  { id: "t4", roomId: "r3", day: "Monday", startTime: "13:00", endTime: "15:00", course: "EEF310 - Circuits", lecturer: "Dr. Mbua" },
  { id: "t5", roomId: "r4", day: "Wednesday", startTime: "08:00", endTime: "10:00", course: "CEF220 - Algorithms", lecturer: "Dr. Forba" },
  { id: "t6", roomId: "r5", day: "Thursday", startTime: "10:00", endTime: "12:00", course: "LAW202 - Civil Law", lecturer: "Prof. Eposi" },
  { id: "t7", roomId: "r6", day: "Friday", startTime: "08:00", endTime: "10:00", course: "MED101 - Anatomy", lecturer: "Dr. Ngu" },
  { id: "t8", roomId: "r7", day: "Monday", startTime: "08:00", endTime: "10:00", course: "ECO100 - Microeconomics", lecturer: "Dr. Asaba" },
  { id: "t9", roomId: "r8", day: "Tuesday", startTime: "14:00", endTime: "16:00", course: "MGT204 - Management", lecturer: "Prof. Lyonga" },
  { id: "t10", roomId: "r10", day: "Thursday", startTime: "08:00", endTime: "11:00", course: "CEF430 - Software Eng.", lecturer: "Dr. Nkwetta" },
  { id: "t11", roomId: "r3", day: "Friday", startTime: "10:00", endTime: "12:00", course: "EEF205 - Signals", lecturer: "Dr. Mbua" },
  { id: "t12", roomId: "r9", day: "Saturday", startTime: "09:00", endTime: "11:00", course: "GST100 - Seminar", lecturer: "Various" },
];
