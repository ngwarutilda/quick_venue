const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Classroom = require("../models/Classroom");
const Timetable = require("../models/Timetable");
const User = require("../models/User");

dotenv.config();

const classrooms = [
  { name: "C101", building: "Block C", floor: "Ground Floor", capacity: 60, facilities: { hasProjector: true, hasWhiteboard: true, hasAC: false, hasComputers: false } },
  { name: "C102", building: "Block C", floor: "Ground Floor", capacity: 80, facilities: { hasProjector: true, hasWhiteboard: true, hasAC: true, hasComputers: false } },
  { name: "C201", building: "Block C", floor: "First Floor", capacity: 50, facilities: { hasProjector: false, hasWhiteboard: true, hasAC: false, hasComputers: false } },
  { name: "LH1",  building: "Main Block", floor: "Ground Floor", capacity: 200, facilities: { hasProjector: true, hasWhiteboard: true, hasAC: true, hasComputers: false } },
  { name: "LH2",  building: "Main Block", floor: "Ground Floor", capacity: 150, facilities: { hasProjector: true, hasWhiteboard: true, hasAC: false, hasComputers: false } },
  { name: "Lab1", building: "FET Block", floor: "First Floor", capacity: 40, facilities: { hasProjector: true, hasWhiteboard: true, hasAC: true, hasComputers: true } },
  { name: "Lab2", building: "FET Block", floor: "Second Floor", capacity: 40, facilities: { hasProjector: false, hasWhiteboard: true, hasAC: false, hasComputers: true } },
  { name: "A101", building: "Block A", floor: "Ground Floor", capacity: 70, facilities: { hasProjector: false, hasWhiteboard: true, hasAC: false, hasComputers: false } },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await Classroom.deleteMany();
    await Timetable.deleteMany();
    await User.deleteMany();
    console.log("🗑️  Cleared existing data");

    // Insert classrooms
    const createdRooms = await Classroom.insertMany(classrooms);
    console.log(`✅ Seeded ${createdRooms.length} classrooms`);

    // Seed timetable entries
    const timetable = [
      { classroom: createdRooms[0]._id, day: "Monday", startTime: "08:00", endTime: "10:00", courseName: "Software Construction", courseCode: "CEC418", lecturerName: "Dr. Nkemeni", department: "Computer Engineering" },
      { classroom: createdRooms[0]._id, day: "Monday", startTime: "12:00", endTime: "14:00", courseName: "Database Systems", courseCode: "CEC312", lecturerName: "Dr. Ambe", department: "Computer Engineering" },
      { classroom: createdRooms[1]._id, day: "Tuesday", startTime: "10:00", endTime: "12:00", courseName: "Computer Networks", courseCode: "CEC405", lecturerName: "Prof. Fokum", department: "Computer Engineering" },
      { classroom: createdRooms[2]._id, day: "Wednesday", startTime: "08:00", endTime: "10:00", courseName: "Calculus", courseCode: "MAT201", lecturerName: "Dr. Fomum", department: "Mathematics" },
      { classroom: createdRooms[3]._id, day: "Thursday", startTime: "14:00", endTime: "16:00", courseName: "Engineering Mathematics", courseCode: "MAT301", lecturerName: "Dr. Ngwa", department: "Mathematics" },
      { classroom: createdRooms[4]._id, day: "Friday", startTime: "10:00", endTime: "12:00", courseName: "Physics", courseCode: "PHY201", lecturerName: "Dr. Tabi", department: "Physics" },
      { classroom: createdRooms[5]._id, day: "Monday", startTime: "14:00", endTime: "16:00", courseName: "Programming Lab", courseCode: "CEC211", lecturerName: "Mr. Che", department: "Computer Engineering" },
      { classroom: createdRooms[6]._id, day: "Wednesday", startTime: "12:00", endTime: "14:00", courseName: "Web Development", courseCode: "CEC320", lecturerName: "Mr. Mbah", department: "Computer Engineering" },
    ];

    await Timetable.insertMany(timetable);
    console.log(`✅ Seeded ${timetable.length} timetable entries`);

    // Seed admin user
    await User.create({
      name: "Admin User",
      email: "admin@quickvenue.ub.cm",
      password: "admin123",
      role: "admin",
    });
    console.log("✅ Seeded admin user: admin@quickvenue.ub.cm / admin123");

    console.log("\n🎉 Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error.message);
    process.exit(1);
  }
};

seedDB();
