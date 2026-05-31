const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Classroom = require('./models/Classroom');
const Timetable = require('./models/Timetable');
const User = require('./models/User');

dotenv.config({ path: '../.env' });

mongoose.connect(process.env.MONGO_URI);

const classrooms = [
  { name: 'C101', building: 'Block C', floor: 'Ground Floor', capacity: 60, facilities: { projector: true, whiteboard: true, ac: false, microphone: false } },
  { name: 'C102', building: 'Block C', floor: 'Ground Floor', capacity: 80, facilities: { projector: true, whiteboard: true, ac: true, microphone: true } },
  { name: 'C201', building: 'Block C', floor: 'First Floor', capacity: 50, facilities: { projector: false, whiteboard: true, ac: false, microphone: false } },
  { name: 'A101', building: 'Block A', floor: 'Ground Floor', capacity: 120, facilities: { projector: true, whiteboard: true, ac: true, microphone: true } },
  { name: 'A102', building: 'Block A', floor: 'Ground Floor', capacity: 100, facilities: { projector: true, whiteboard: true, ac: false, microphone: false } },
  { name: 'LH1',  building: 'Lecture Hall', floor: 'Ground Floor', capacity: 200, facilities: { projector: true, whiteboard: true, ac: true, microphone: true } },
  { name: 'LH2',  building: 'Lecture Hall', floor: 'Ground Floor', capacity: 200, facilities: { projector: true, whiteboard: true, ac: true, microphone: true } },
  { name: 'B201', building: 'Block B', floor: 'First Floor', capacity: 40, facilities: { projector: false, whiteboard: true, ac: false, microphone: false } },
];

const seed = async () => {
  try {
    await Classroom.deleteMany();
    await Timetable.deleteMany();
    await User.deleteMany();

    const createdRooms = await Classroom.insertMany(classrooms);
    console.log(`✅ ${createdRooms.length} classrooms seeded`);

    const timetableEntries = [
      { classroom: createdRooms[0]._id, day: 'Monday', startTime: '08:00', endTime: '10:00', courseName: 'Software Construction', courseCode: 'CEC418', lecturerName: 'Dr. Nkwenti', department: 'Computer Engineering' },
      { classroom: createdRooms[0]._id, day: 'Monday', startTime: '12:00', endTime: '14:00', courseName: 'Data Structures', courseCode: 'CEC312', lecturerName: 'Prof. Mbah', department: 'Computer Engineering' },
      { classroom: createdRooms[1]._id, day: 'Monday', startTime: '08:00', endTime: '10:00', courseName: 'Database Systems', courseCode: 'CEC410', lecturerName: 'Dr. Fomukong', department: 'Computer Engineering' },
      { classroom: createdRooms[1]._id, day: 'Tuesday', startTime: '10:00', endTime: '12:00', courseName: 'Operating Systems', courseCode: 'CEC415', lecturerName: 'Dr. Tanyi', department: 'Computer Engineering' },
      { classroom: createdRooms[2]._id, day: 'Wednesday', startTime: '14:00', endTime: '16:00', courseName: 'Computer Networks', courseCode: 'CEC420', lecturerName: 'Prof. Nfor', department: 'Computer Engineering' },
      { classroom: createdRooms[3]._id, day: 'Thursday', startTime: '08:00', endTime: '10:00', courseName: 'Calculus II', courseCode: 'MAT201', lecturerName: 'Dr. Nji', department: 'Mathematics' },
      { classroom: createdRooms[4]._id, day: 'Friday', startTime: '10:00', endTime: '12:00', courseName: 'Linear Algebra', courseCode: 'MAT301', lecturerName: 'Prof. Wung', department: 'Mathematics' },
      { classroom: createdRooms[5]._id, day: 'Monday', startTime: '10:00', endTime: '12:00', courseName: 'Engineering Maths', courseCode: 'MAT401', lecturerName: 'Dr. Bih', department: 'Engineering' },
    ];

    await Timetable.insertMany(timetableEntries);
    console.log(`✅ ${timetableEntries.length} timetable entries seeded`);

    // Create default admin user
    await User.create({
      name: 'Admin QuickVenue',
      email: 'admin@quickvenue.ub.cm',
      password: 'admin123',
      role: 'admin',
    });
    console.log('✅ Admin user created: admin@quickvenue.ub.cm / admin123');

    process.exit();
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seed();
