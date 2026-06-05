const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Classroom = require('./models/Classroom');
const Timetable = require('./models/Timetable');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const classrooms = [
  { name: 'U-BLOCK E', building: 'U-Block', floor: 'Ground Floor', capacity: 180, facilities: { hasProjector: false, hasWhiteboard: false, hasAC: false, hasComputers: false, hasChalkboard: true, hasLight: true }, isActive: true },
  { name: 'PEDAGOB 1', building: 'Postgraduate Block', floor: 'Ground Floor', capacity: 200, facilities: { hasProjector: false, hasWhiteboard: false, hasAC: false, hasComputers: false, hasChalkboard: true, hasLight: false }, isActive: true },
  { name: 'PEDAGOB 2', building: 'Postgraduate Block', floor: 'Ground Floor', capacity: 200, facilities: { hasProjector: false, hasWhiteboard: false, hasAC: false, hasComputers: false, hasChalkboard: true, hasLight: false }, isActive: true },
  { name: 'PEDAGOB 3', building: 'Postgraduate Block', floor: 'Ground Floor', capacity: 50, facilities: { hasProjector: false, hasWhiteboard: false, hasAC: false, hasComputers: false, hasChalkboard: true, hasLight: false }, isActive: true },
  { name: 'PEDAGOB 4', building: 'Postgraduate Block', floor: 'Ground Floor', capacity: 200, facilities: { hasProjector: false, hasWhiteboard: false, hasAC: false, hasComputers: false, hasChalkboard: true, hasLight: false }, isActive: true },
  { name: 'CB II 50F', building: 'Classroom Block II', floor: 'Ground Floor', capacity: 80, facilities: { hasProjector: false, hasWhiteboard: false, hasAC: false, hasComputers: false, hasChalkboard: true, hasLight: true }, isActive: true },
  { name: 'CRB II 50G', building: 'Classroom Block II', floor: 'Ground Floor', capacity: 50, facilities: { hasProjector: false, hasWhiteboard: false, hasAC: false, hasComputers: false, hasChalkboard: true, hasLight: true }, isActive: true },
  { name: 'CRB II 150B', building: 'Classroom Block II', floor: 'Ground Floor', capacity: 150, facilities: { hasProjector: false, hasWhiteboard: false, hasAC: false, hasComputers: false, hasChalkboard: true, hasLight: true }, isActive: true },
  { name: 'CT2', building: 'College of Technology', floor: 'Second Floor', capacity: 110, facilities: { hasProjector: false, hasWhiteboard: true, hasAC: false, hasComputers: false, hasChalkboard: false, hasLight: true }, isActive: true },
  { name: 'OPEN CT', building: 'College of Technology', floor: 'Ground Floor', capacity: 50, facilities: { hasProjector: false, hasWhiteboard: false, hasAC: false, hasComputers: false, hasChalkboard: true, hasLight: true }, isActive: true },
  { name: 'AMPHI 600', building: 'Amphitheatre', floor: 'Ground Floor', capacity: 600, facilities: { hasProjector: false, hasWhiteboard: false, hasAC: false, hasComputers: false, hasChalkboard: true, hasLight: true }, isActive: true },
  { name: 'BASEMENT', building: 'College of Technology', floor: 'Basement', capacity: 30, facilities: { hasProjector: false, hasWhiteboard: false, hasAC: false, hasComputers: false, hasChalkboard: true, hasLight: true }, isActive: true },
  { name: 'E-LAB', building: 'College of Technology', floor: 'Ground Floor', capacity: 30, facilities: { hasProjector: false, hasWhiteboard: true, hasAC: false, hasComputers: true, hasChalkboard: false, hasLight: true }, isActive: true },
  { name: 'CV1', building: 'Cultural Village', floor: 'Ground Floor', capacity: 70, facilities: { hasProjector: false, hasWhiteboard: false, hasAC: false, hasComputers: false, hasChalkboard: true, hasLight: true }, isActive: true },
];

const seed = async () => {
  try {
    await Classroom.deleteMany();
    await Timetable.deleteMany();
    await User.deleteMany();

    const createdRooms = await Classroom.insertMany(classrooms);
    console.log(`✅ ${createdRooms.length} classrooms seeded`);

    const getRoomId = (name) => createdRooms.find(r => r.name === name)?._id;

    const timetableEntries = [
      // ── COMPUTER ENGINEERING ──
      { classroom: getRoomId('U-BLOCK E'), day: 'Monday', startTime: '07:00', endTime: '09:00', courseName: 'Computer Engineering Lab', courseCode: 'CEC224', lecturerName: 'Mr BALOKO', department: 'Computer Engineering' },
      { classroom: getRoomId('PEDAGOB 1'), day: 'Monday', startTime: '07:00', endTime: '11:00', courseName: 'Computer Engineering', courseCode: 'CEC214', lecturerName: 'Dr MELINGUI', department: 'Computer Engineering' },
      { classroom: getRoomId('U-BLOCK E'), day: 'Monday', startTime: '09:00', endTime: '13:00', courseName: 'Computer Engineering', courseCode: 'CEC320', lecturerName: 'Mr TCHINDA', department: 'Computer Engineering' },
      { classroom: getRoomId('PEDAGOB 1'), day: 'Monday', startTime: '11:00', endTime: '15:00', courseName: 'Computer Engineering', courseCode: 'CEC616', lecturerName: 'Dr TCHAPGA', department: 'Computer Engineering' },
      { classroom: getRoomId('PEDAGOB 2'), day: 'Monday', startTime: '11:00', endTime: '15:00', courseName: 'Computer Engineering', courseCode: 'CEC442', lecturerName: 'Mr ANUMOH', department: 'Computer Engineering' },
      { classroom: getRoomId('PEDAGOB 2'), day: 'Monday', startTime: '15:00', endTime: '19:00', courseName: 'Computer Engineering', courseCode: 'CEC450', lecturerName: 'Mr KOLE', department: 'Computer Engineering' },
      { classroom: getRoomId('U-BLOCK E'), day: 'Tuesday', startTime: '07:00', endTime: '09:00', courseName: 'Computer Engineering', courseCode: 'CEC226', lecturerName: 'MEGOZE H', department: 'Computer Engineering' },
      { classroom: getRoomId('CB II 50F'), day: 'Tuesday', startTime: '07:00', endTime: '11:00', courseName: 'Computer Engineering', courseCode: 'CEC322', lecturerName: 'Mr KOLE', department: 'Computer Engineering' },
      { classroom: getRoomId('U-BLOCK E'), day: 'Tuesday', startTime: '09:00', endTime: '11:00', courseName: 'Computer Engineering', courseCode: 'CEC304', lecturerName: 'Prof SONE M.', department: 'Computer Engineering' },
      { classroom: getRoomId('U-BLOCK E'), day: 'Tuesday', startTime: '11:00', endTime: '15:00', courseName: 'Computer Engineering', courseCode: 'CEC328', lecturerName: 'TCHINGA T', department: 'Computer Engineering' },
      { classroom: getRoomId('PEDAGOB 1'), day: 'Tuesday', startTime: '11:00', endTime: '15:00', courseName: 'Computer Engineering', courseCode: 'CEC228', lecturerName: 'Mr KOLE', department: 'Computer Engineering' },
      { classroom: getRoomId('PEDAGOB 2'), day: 'Tuesday', startTime: '11:00', endTime: '15:00', courseName: 'Computer Engineering', courseCode: 'CEC306', lecturerName: 'Dr NYANGA', department: 'Computer Engineering' },
      { classroom: getRoomId('OPEN CT'), day: 'Tuesday', startTime: '11:00', endTime: '15:00', courseName: 'Computer Engineering', courseCode: 'CEC434', lecturerName: 'MEGOZE H', department: 'Computer Engineering' },
      { classroom: getRoomId('CB II 50F'), day: 'Tuesday', startTime: '11:00', endTime: '15:00', courseName: 'Computer Engineering', courseCode: 'CEC330', lecturerName: 'MR TATSACHOU N.', department: 'Computer Engineering' },
      { classroom: getRoomId('CB II 50F'), day: 'Tuesday', startTime: '15:00', endTime: '19:00', courseName: 'Computer Engineering', courseCode: 'CEC322', lecturerName: 'Mr KOLE', department: 'Computer Engineering' },
      { classroom: getRoomId('PEDAGOB 2'), day: 'Tuesday', startTime: '15:00', endTime: '19:00', courseName: 'Computer Engineering', courseCode: 'CEC446', lecturerName: 'MR TATSACHOU N.', department: 'Computer Engineering' },
      { classroom: getRoomId('PEDAGOB 1'), day: 'Tuesday', startTime: '15:00', endTime: '19:00', courseName: 'Computer Engineering', courseCode: 'CEC324', lecturerName: 'Mr ANUMOH', department: 'Computer Engineering' },
      { classroom: getRoomId('CB II 50F'), day: 'Wednesday', startTime: '07:00', endTime: '11:00', courseName: 'Computer Engineering', courseCode: 'CEC412', lecturerName: 'Prof MOFFO L', department: 'Computer Engineering' },
      { classroom: getRoomId('U-BLOCK E'), day: 'Wednesday', startTime: '07:00', endTime: '11:00', courseName: 'Computer Engineering', courseCode: 'CEC318', lecturerName: 'Dr TCHANGA A.', department: 'Computer Engineering' },
      { classroom: getRoomId('U-BLOCK E'), day: 'Wednesday', startTime: '11:00', endTime: '13:00', courseName: 'Computer Engineering', courseCode: 'CEC304', lecturerName: 'Prof SONE M.', department: 'Computer Engineering' },
      { classroom: getRoomId('CB II 50F'), day: 'Wednesday', startTime: '11:00', endTime: '15:00', courseName: 'Computer Engineering', courseCode: 'CEC224', lecturerName: 'Mr BALOKO', department: 'Computer Engineering' },
      { classroom: getRoomId('CT2'), day: 'Wednesday', startTime: '13:00', endTime: '17:00', courseName: 'Computer Engineering', courseCode: 'CEC612', lecturerName: 'Prof MOFFO L / Prof SONE M.', department: 'Computer Engineering' },
      { classroom: getRoomId('PEDAGOB 2'), day: 'Wednesday', startTime: '15:00', endTime: '19:00', courseName: 'Computer Engineering', courseCode: 'CEC448', lecturerName: 'TATSACHOU N.', department: 'Computer Engineering' },
      { classroom: getRoomId('PEDAGOB 1'), day: 'Wednesday', startTime: '15:00', endTime: '19:00', courseName: 'Computer Engineering', courseCode: 'CEC430', lecturerName: 'Dr MELINGUI / Dr TCHAPGA', department: 'Computer Engineering' },
      { classroom: getRoomId('U-BLOCK E'), day: 'Thursday', startTime: '07:00', endTime: '11:00', courseName: 'Computer Engineering', courseCode: 'CEC436', lecturerName: 'MEGOZE H', department: 'Computer Engineering' },
      { classroom: getRoomId('U-BLOCK E'), day: 'Thursday', startTime: '13:00', endTime: '15:00', courseName: 'Computer Engineering', courseCode: 'CEC226', lecturerName: 'MEGOZE H', department: 'Computer Engineering' },
      { classroom: getRoomId('PEDAGOB 4'), day: 'Thursday', startTime: '15:00', endTime: '19:00', courseName: 'Computer Engineering', courseCode: 'COT312', lecturerName: 'Mr NGATTA', department: 'Computer Engineering' },
      { classroom: getRoomId('PEDAGOB 2'), day: 'Friday', startTime: '07:00', endTime: '11:00', courseName: 'Computer Engineering', courseCode: 'CEC220', lecturerName: 'Mr BALOKO', department: 'Computer Engineering' },
      { classroom: getRoomId('PEDAGOB 4'), day: 'Friday', startTime: '07:00', endTime: '11:00', courseName: 'Computer Engineering', courseCode: 'CEC302', lecturerName: 'Dr NKWETEYIM D', department: 'Computer Engineering' },
      { classroom: getRoomId('U-BLOCK E'), day: 'Friday', startTime: '09:00', endTime: '13:00', courseName: 'Computer Engineering', courseCode: 'CEC218', lecturerName: 'Dr TCHAGNA A / Mr BALOKO', department: 'Computer Engineering' },
      { classroom: getRoomId('PEDAGOB 1'), day: 'Friday', startTime: '11:00', endTime: '15:00', courseName: 'Software Construction and Evolution', courseCode: 'CEC418', lecturerName: 'Mr KOMETA', department: 'Computer Engineering' },
      { classroom: getRoomId('CT2'), day: 'Friday', startTime: '13:00', endTime: '17:00', courseName: 'Computer Engineering', courseCode: 'COT602', lecturerName: 'Dr TCHAGNA A / Dr MIH T', department: 'Computer Engineering' },
      { classroom: getRoomId('PEDAGOB 2'), day: 'Friday', startTime: '15:00', endTime: '19:00', courseName: 'Computer Engineering', courseCode: 'CEC452', lecturerName: 'ANUMOH', department: 'Computer Engineering' },
      { classroom: getRoomId('PEDAGOB 4'), day: 'Friday', startTime: '15:00', endTime: '19:00', courseName: 'Computer Engineering', courseCode: 'COT308', lecturerName: 'Dr TABAH', department: 'Computer Engineering' },
      { classroom: getRoomId('PEDAGOB 1'), day: 'Saturday', startTime: '07:00', endTime: '11:00', courseName: 'Computer Engineering', courseCode: 'CEC420', lecturerName: 'MR KOMETA', department: 'Computer Engineering' },
      { classroom: getRoomId('PEDAGOB 1'), day: 'Saturday', startTime: '11:00', endTime: '15:00', courseName: 'Computer Engineering', courseCode: 'CEC424', lecturerName: 'Dr TCHAGNA A', department: 'Computer Engineering' },
      { classroom: getRoomId('PEDAGOB 2'), day: 'Saturday', startTime: '11:00', endTime: '15:00', courseName: 'Computer Engineering', courseCode: 'CEC610', lecturerName: 'Mr KOMETA', department: 'Computer Engineering' },
      { classroom: getRoomId('PEDAGOB 1'), day: 'Saturday', startTime: '15:00', endTime: '19:00', courseName: 'Computer Engineering', courseCode: 'CEC444', lecturerName: 'Mr ANUMOH', department: 'Computer Engineering' },
      { classroom: getRoomId('PEDAGOB 2'), day: 'Saturday', startTime: '15:00', endTime: '19:00', courseName: 'Computer Engineering', courseCode: 'CEC618', lecturerName: 'Dr NYANGA', department: 'Computer Engineering' },

      // ── ELECTRICAL & ELECTRONIC ENGINEERING ──
      { classroom: getRoomId('CB II 50F'), day: 'Monday', startTime: '07:00', endTime: '11:00', courseName: 'EEE', courseCode: 'EEC602', lecturerName: 'KENGNOU', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('PEDAGOB 3'), day: 'Monday', startTime: '07:00', endTime: '11:00', courseName: 'EEE', courseCode: 'EEC236', lecturerName: 'OMBICK / AGBOR', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('PEDAGOB 2'), day: 'Monday', startTime: '09:00', endTime: '11:00', courseName: 'EEE', courseCode: 'EEC340', lecturerName: 'FEUDJIO / OMBICK / TCHINDA', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('CB II 50F'), day: 'Monday', startTime: '11:00', endTime: '15:00', courseName: 'EEE', courseCode: 'EEC696', lecturerName: 'ALL STAFF', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('PEDAGOB 3'), day: 'Monday', startTime: '11:00', endTime: '13:00', courseName: 'EEE', courseCode: 'EEC410', lecturerName: 'FEUDJIO / EBUDE', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('PEDAGOB 4'), day: 'Monday', startTime: '11:00', endTime: '15:00', courseName: 'EEE', courseCode: 'EEC614', lecturerName: 'SONE', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('U-BLOCK E'), day: 'Monday', startTime: '15:00', endTime: '17:00', courseName: 'EEE', courseCode: 'EEC306', lecturerName: 'FOFANG', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('CB II 50F'), day: 'Monday', startTime: '15:00', endTime: '19:00', courseName: 'EEE', courseCode: 'EEC220', lecturerName: 'WONTCHUI / TCHINDA', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('PEDAGOB 1'), day: 'Monday', startTime: '15:00', endTime: '19:00', courseName: 'EEE', courseCode: 'EEC464', lecturerName: 'TAKEMBO', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('PEDAGOB 4'), day: 'Monday', startTime: '15:00', endTime: '19:00', courseName: 'EEE', courseCode: 'EEC612', lecturerName: 'SONE', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('PEDAGOB 3'), day: 'Tuesday', startTime: '07:00', endTime: '09:00', courseName: 'EEE', courseCode: 'EEC220', lecturerName: 'WONTCHUI / TCHINDA', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('PEDAGOB 1'), day: 'Tuesday', startTime: '07:00', endTime: '09:00', courseName: 'EEE', courseCode: 'EEC338', lecturerName: 'NANA / MBAPTE', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('CRB II 150B'), day: 'Tuesday', startTime: '09:00', endTime: '11:00', courseName: 'EEE', courseCode: 'EEC204', lecturerName: 'NANA / ATEUAFACK / MBAPTE / TAKEMBO', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('PEDAGOB 4'), day: 'Tuesday', startTime: '07:00', endTime: '09:00', courseName: 'EEE', courseCode: 'EEC436', lecturerName: 'WONTCHUI / EBUDE', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('PEDAGOB 3'), day: 'Tuesday', startTime: '09:00', endTime: '13:00', courseName: 'EEE', courseCode: 'EEC402', lecturerName: 'ACHIRI / EBUDE', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('CT2'), day: 'Tuesday', startTime: '09:00', endTime: '13:00', courseName: 'EEE', courseCode: 'EEC608', lecturerName: 'MOFFO', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('PEDAGOB 3'), day: 'Tuesday', startTime: '13:00', endTime: '15:00', courseName: 'EEE', courseCode: 'EEC420', lecturerName: 'MIH / ACHIRI', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('PEDAGOB 3'), day: 'Tuesday', startTime: '15:00', endTime: '17:00', courseName: 'EEE', courseCode: 'EEC616', lecturerName: 'TCHAPGA / NINGO', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('E-LAB'), day: 'Tuesday', startTime: '15:00', endTime: '17:00', courseName: 'EEE', courseCode: 'EEC604', lecturerName: 'FEUDJIO', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('U-BLOCK E'), day: 'Tuesday', startTime: '15:00', endTime: '17:00', courseName: 'EEE', courseCode: 'EEC424', lecturerName: 'MEGAM / OMBICK', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('PEDAGOB 1'), day: 'Wednesday', startTime: '07:00', endTime: '09:00', courseName: 'EEE', courseCode: 'EEC348', lecturerName: 'MEGAM', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('PEDAGOB 3'), day: 'Wednesday', startTime: '07:00', endTime: '11:00', courseName: 'EEE', courseCode: 'EEC218', lecturerName: 'TCHINDA / EBUDE', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('PEDAGOB 4'), day: 'Wednesday', startTime: '07:00', endTime: '11:00', courseName: 'EEE', courseCode: 'EEC344', lecturerName: 'DEUSSOM', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('PEDAGOB 3'), day: 'Wednesday', startTime: '11:00', endTime: '13:00', courseName: 'EEE', courseCode: 'EEC246', lecturerName: 'MIH / AGBOR', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('PEDAGOB 1'), day: 'Wednesday', startTime: '11:00', endTime: '15:00', courseName: 'EEE', courseCode: 'EEC456', lecturerName: 'TABE', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('U-BLOCK E'), day: 'Wednesday', startTime: '15:00', endTime: '19:00', courseName: 'EEE', courseCode: 'EEC434', lecturerName: 'WONTCHUI / DEUSSOM', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('PEDAGOB 3'), day: 'Wednesday', startTime: '15:00', endTime: '19:00', courseName: 'EEE', courseCode: 'EEC346', lecturerName: 'OMBICK', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('PEDAGOB 1'), day: 'Thursday', startTime: '07:00', endTime: '09:00', courseName: 'EEE', courseCode: 'EEC338', lecturerName: 'NANA / MBAPTE', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('PEDAGOB 4'), day: 'Thursday', startTime: '07:00', endTime: '11:00', courseName: 'EEE', courseCode: 'EEC426', lecturerName: 'KENFACK', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('E-LAB'), day: 'Thursday', startTime: '09:00', endTime: '11:00', courseName: 'EEE', courseCode: 'EEC604', lecturerName: 'FEUDJIO', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('PEDAGOB 3'), day: 'Thursday', startTime: '09:00', endTime: '11:00', courseName: 'EEE', courseCode: 'EEC462', lecturerName: 'KENGNOU / ATEUAFACK', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('PEDAGOB 4'), day: 'Thursday', startTime: '11:00', endTime: '13:00', courseName: 'EEE', courseCode: 'EEC452', lecturerName: 'AGBOR / DONGHO', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('PEDAGOB 2'), day: 'Thursday', startTime: '11:00', endTime: '15:00', courseName: 'EEE', courseCode: 'EEC606', lecturerName: 'KENFACK', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('PEDAGOB 1'), day: 'Friday', startTime: '07:00', endTime: '09:00', courseName: 'EEE', courseCode: 'EEC438', lecturerName: 'KENGNOU', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('CB II 50F'), day: 'Friday', startTime: '07:00', endTime: '11:00', courseName: 'EEE', courseCode: 'EEC246', lecturerName: 'MIH / AGBOR', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('PEDAGOB 3'), day: 'Friday', startTime: '07:00', endTime: '11:00', courseName: 'EEE', courseCode: 'EEC406', lecturerName: 'EBUDE / MBIEDA', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('CB II 50F'), day: 'Friday', startTime: '11:00', endTime: '15:00', courseName: 'EEE', courseCode: 'EEC462', lecturerName: 'KENGNOU / ATEUAFACK', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('PEDAGOB 2'), day: 'Friday', startTime: '11:00', endTime: '15:00', courseName: 'EEE', courseCode: 'EEC244', lecturerName: 'MEGAM', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('CB II 50F'), day: 'Saturday', startTime: '07:00', endTime: '11:00', courseName: 'EEE', courseCode: 'EEC406', lecturerName: 'EBUDE / MBIEDA', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('AMPHI 600'), day: 'Saturday', startTime: '09:00', endTime: '11:00', courseName: 'EEE', courseCode: 'EEC204', lecturerName: 'NANA / ATEUAFACK / MBAPTE / TAKEMBO', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('CB II 50F'), day: 'Saturday', startTime: '11:00', endTime: '15:00', courseName: 'EEE', courseCode: 'EEC420', lecturerName: 'MIH / ACHIRI', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('PEDAGOB 3'), day: 'Saturday', startTime: '15:00', endTime: '17:00', courseName: 'EEE', courseCode: 'EEC430', lecturerName: 'MBIEDA / DEUSSOM', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('PEDAGOB 4'), day: 'Saturday', startTime: '15:00', endTime: '19:00', courseName: 'EEE', courseCode: 'EEC242', lecturerName: 'AGBOR / SUH', department: 'Electrical and Electronic Engineering' },
      { classroom: getRoomId('CB II 50F'), day: 'Saturday', startTime: '15:00', endTime: '19:00', courseName: 'EEE', courseCode: 'EEC498', lecturerName: 'ALL STAFF', department: 'Electrical and Electronic Engineering' },

      // ── MECHANICAL ENGINEERING ──
      { classroom: getRoomId('CRB II 50G'), day: 'Monday', startTime: '07:00', endTime: '11:00', courseName: 'Mechanical Engineering', courseCode: 'MET310', lecturerName: 'Dr TSAPLA', department: 'Mechanical Engineering' },
      { classroom: getRoomId('PEDAGOB 4'), day: 'Monday', startTime: '07:00', endTime: '11:00', courseName: 'Mechanical Engineering', courseCode: 'MET658', lecturerName: 'Dr POH\'SIE', department: 'Mechanical Engineering' },
      { classroom: getRoomId('CRB II 50G'), day: 'Monday', startTime: '11:00', endTime: '13:00', courseName: 'Mechanical Engineering', courseCode: 'MET432', lecturerName: 'Dr KANA', department: 'Mechanical Engineering' },
      { classroom: getRoomId('CRB II 50G'), day: 'Monday', startTime: '13:00', endTime: '15:00', courseName: 'Mechanical Engineering', courseCode: 'MET432', lecturerName: 'Dr KANA', department: 'Mechanical Engineering' },
      { classroom: getRoomId('CRB II 50G'), day: 'Monday', startTime: '15:00', endTime: '19:00', courseName: 'Mechanical Engineering', courseCode: 'MET312', lecturerName: 'TALA TAZA', department: 'Mechanical Engineering' },
      { classroom: getRoomId('CRB II 50G'), day: 'Tuesday', startTime: '07:00', endTime: '11:00', courseName: 'Mechanical Engineering', courseCode: 'MET424', lecturerName: 'MONGSHI', department: 'Mechanical Engineering' },
      { classroom: getRoomId('PEDAGOB 4'), day: 'Tuesday', startTime: '09:00', endTime: '11:00', courseName: 'Mechanical Engineering', courseCode: 'MET460', lecturerName: 'Dr TSAMO', department: 'Mechanical Engineering' },
      { classroom: getRoomId('PEDAGOB 2'), day: 'Tuesday', startTime: '07:00', endTime: '11:00', courseName: 'Mechanical Engineering', courseCode: 'MET442', lecturerName: 'Dr NSAHKO / LOKENDO', department: 'Mechanical Engineering' },
      { classroom: getRoomId('BASEMENT'), day: 'Tuesday', startTime: '11:00', endTime: '13:00', courseName: 'Mechanical Engineering', courseCode: 'MET654', lecturerName: 'Pr TOKO / Dr POH\'SIE', department: 'Mechanical Engineering' },
      { classroom: getRoomId('CRB II 50G'), day: 'Tuesday', startTime: '13:00', endTime: '15:00', courseName: 'Mechanical Engineering', courseCode: 'MET302', lecturerName: 'TALA TAZA', department: 'Mechanical Engineering' },
      { classroom: getRoomId('BASEMENT'), day: 'Tuesday', startTime: '15:00', endTime: '19:00', courseName: 'Mechanical Engineering', courseCode: 'MET642', lecturerName: 'Pr TOKO / Dr NGUEPNANG', department: 'Mechanical Engineering' },
      { classroom: getRoomId('U-BLOCK E'), day: 'Tuesday', startTime: '17:00', endTime: '19:00', courseName: 'Mechanical Engineering', courseCode: 'MET412', lecturerName: 'Dr TSAPLA', department: 'Mechanical Engineering' },
      { classroom: getRoomId('CRB II 50G'), day: 'Wednesday', startTime: '07:00', endTime: '11:00', courseName: 'Mechanical Engineering', courseCode: 'MET304', lecturerName: 'Dr NGUEPNANG', department: 'Mechanical Engineering' },
      { classroom: getRoomId('PEDAGOB 2'), day: 'Wednesday', startTime: '11:00', endTime: '13:00', courseName: 'Mechanical Engineering', courseCode: 'MET444', lecturerName: 'Dr NSAHKO / LOKENDO', department: 'Mechanical Engineering' },
      { classroom: getRoomId('CRB II 50G'), day: 'Wednesday', startTime: '11:00', endTime: '15:00', courseName: 'Mechanical Engineering', courseCode: 'MET426', lecturerName: 'Dr TSAMO', department: 'Mechanical Engineering' },
      { classroom: getRoomId('U-BLOCK E'), day: 'Wednesday', startTime: '13:00', endTime: '15:00', courseName: 'Mechanical Engineering', courseCode: 'MET452', lecturerName: 'Dr POH\'SIE', department: 'Mechanical Engineering' },
      { classroom: getRoomId('PEDAGOB 3'), day: 'Wednesday', startTime: '13:00', endTime: '15:00', courseName: 'Mechanical Engineering', courseCode: 'MET620', lecturerName: 'Dr MBELLE', department: 'Mechanical Engineering' },
      { classroom: getRoomId('PEDAGOB 4'), day: 'Wednesday', startTime: '15:00', endTime: '19:00', courseName: 'Mechanical Engineering', courseCode: 'MET650', lecturerName: 'Pr TOKO / Dr MBIEDA', department: 'Mechanical Engineering' },
      { classroom: getRoomId('CT2'), day: 'Thursday', startTime: '07:00', endTime: '11:00', courseName: 'Mechanical Engineering', courseCode: 'MET626', lecturerName: 'Pr FOBA', department: 'Mechanical Engineering' },
      { classroom: getRoomId('PEDAGOB 2'), day: 'Thursday', startTime: '07:00', endTime: '09:00', courseName: 'Mechanical Engineering', courseCode: 'MET456', lecturerName: 'Dr POH\'SIE', department: 'Mechanical Engineering' },
      { classroom: getRoomId('BASEMENT'), day: 'Thursday', startTime: '07:00', endTime: '11:00', courseName: 'Mechanical Engineering', courseCode: 'MET646', lecturerName: 'Pr TOKO', department: 'Mechanical Engineering' },
      { classroom: getRoomId('PEDAGOB 3'), day: 'Thursday', startTime: '07:00', endTime: '09:00', courseName: 'Mechanical Engineering', courseCode: 'MET640', lecturerName: 'Dr NSAHKO', department: 'Mechanical Engineering' },
      { classroom: getRoomId('PEDAGOB 2'), day: 'Thursday', startTime: '09:00', endTime: '11:00', courseName: 'Mechanical Engineering', courseCode: 'MET360', lecturerName: 'MBITEKAMBOH', department: 'Mechanical Engineering' },
      { classroom: getRoomId('CRB II 50G'), day: 'Thursday', startTime: '11:00', endTime: '13:00', courseName: 'Mechanical Engineering', courseCode: 'MET624', lecturerName: 'Dr MBIEDA / Dr TSAPLA', department: 'Mechanical Engineering' },
      { classroom: getRoomId('CRB II 50G'), day: 'Thursday', startTime: '13:00', endTime: '15:00', courseName: 'Mechanical Engineering', courseCode: 'MET422', lecturerName: 'MONGSHI', department: 'Mechanical Engineering' },
      { classroom: getRoomId('PEDAGOB 3'), day: 'Thursday', startTime: '13:00', endTime: '15:00', courseName: 'Mechanical Engineering', courseCode: 'MET204', lecturerName: 'Pr TOKO', department: 'Mechanical Engineering' },
      { classroom: getRoomId('PEDAGOB 2'), day: 'Thursday', startTime: '15:00', endTime: '17:00', courseName: 'Mechanical Engineering', courseCode: 'MET208', lecturerName: 'Pr FOBA / TALATAZA', department: 'Mechanical Engineering' },
      { classroom: getRoomId('U-BLOCK E'), day: 'Thursday', startTime: '15:00', endTime: '17:00', courseName: 'Mechanical Engineering', courseCode: 'MET314', lecturerName: 'Dr POH\'SIE', department: 'Mechanical Engineering' },
      { classroom: getRoomId('CRB II 50G'), day: 'Thursday', startTime: '15:00', endTime: '19:00', courseName: 'Mechanical Engineering', courseCode: 'MET434', lecturerName: 'MBITEKAMBOH', department: 'Mechanical Engineering' },
      { classroom: getRoomId('CRB II 50G'), day: 'Friday', startTime: '11:00', endTime: '15:00', courseName: 'Mechanical Engineering', courseCode: 'MET208', lecturerName: 'Pr FOBA / TALATAZA', department: 'Mechanical Engineering' },
      { classroom: getRoomId('PEDAGOB 3'), day: 'Friday', startTime: '11:00', endTime: '15:00', courseName: 'Mechanical Engineering', courseCode: 'MET402', lecturerName: 'MONGSHI', department: 'Mechanical Engineering' },
      { classroom: getRoomId('U-BLOCK E'), day: 'Friday', startTime: '13:00', endTime: '15:00', courseName: 'Mechanical Engineering', courseCode: 'MET462', lecturerName: 'MBITEKAMBOH', department: 'Mechanical Engineering' },
      { classroom: getRoomId('PEDAGOB 3'), day: 'Friday', startTime: '15:00', endTime: '17:00', courseName: 'Mechanical Engineering', courseCode: 'MET450', lecturerName: 'NTIAYA', department: 'Mechanical Engineering' },
      { classroom: getRoomId('CRB II 50G'), day: 'Saturday', startTime: '09:00', endTime: '13:00', courseName: 'Mechanical Engineering', courseCode: 'MET422', lecturerName: 'MONGSHI', department: 'Mechanical Engineering' },
      { classroom: getRoomId('PEDAGOB 3'), day: 'Saturday', startTime: '07:00', endTime: '09:00', courseName: 'Mechanical Engineering', courseCode: 'MET448', lecturerName: 'Dr KANA', department: 'Mechanical Engineering' },
      { classroom: getRoomId('PEDAGOB 2'), day: 'Saturday', startTime: '07:00', endTime: '11:00', courseName: 'Mechanical Engineering', courseCode: 'MET630', lecturerName: 'Dr NJITACKE', department: 'Mechanical Engineering' },
      { classroom: getRoomId('PEDAGOB 4'), day: 'Saturday', startTime: '07:00', endTime: '11:00', courseName: 'Mechanical Engineering', courseCode: 'MET436', lecturerName: 'NTIAYA', department: 'Mechanical Engineering' },
      { classroom: getRoomId('PEDAGOB 4'), day: 'Saturday', startTime: '11:00', endTime: '15:00', courseName: 'Mechanical Engineering', courseCode: 'MET202', lecturerName: 'MBITEKAMBOH / NTIAYA', department: 'Mechanical Engineering' },
      { classroom: getRoomId('CRB II 50G'), day: 'Saturday', startTime: '13:00', endTime: '15:00', courseName: 'Mechanical Engineering', courseCode: 'MET204', lecturerName: 'Pr TOKO', department: 'Mechanical Engineering' },
      { classroom: getRoomId('PEDAGOB 3'), day: 'Saturday', startTime: '13:00', endTime: '15:00', courseName: 'Mechanical Engineering', courseCode: 'MET622', lecturerName: 'Dr MEGAM / Dr MELINGUI', department: 'Mechanical Engineering' },
      { classroom: getRoomId('CT2'), day: 'Saturday', startTime: '07:00', endTime: '11:00', courseName: 'Mechanical Engineering', courseCode: 'MET632', lecturerName: 'Dr MBELLE / Dr TSAPLA', department: 'Mechanical Engineering' },

      // ── RENEWABLE ENERGY ──
      { classroom: getRoomId('U-BLOCK E'), day: 'Monday', startTime: '13:00', endTime: '15:00', courseName: 'Renewable Energy', courseCode: 'REC304', lecturerName: 'FOFANG/SUH', department: 'Renewable Energy' },
      { classroom: getRoomId('PEDAGOB 3'), day: 'Monday', startTime: '13:00', endTime: '15:00', courseName: 'Renewable Energy', courseCode: 'EEC242', lecturerName: 'SUH ELVICE', department: 'Renewable Energy' },
      { classroom: getRoomId('PEDAGOB 4'), day: 'Tuesday', startTime: '11:00', endTime: '13:00', courseName: 'Renewable Energy', courseCode: 'REC302', lecturerName: 'FOFANG T', department: 'Renewable Energy' },
      { classroom: getRoomId('PEDAGOB 4'), day: 'Tuesday', startTime: '13:00', endTime: '15:00', courseName: 'Renewable Energy', courseCode: 'REC306', lecturerName: 'NTIAYA C', department: 'Renewable Energy' },
      { classroom: getRoomId('PEDAGOB 2'), day: 'Wednesday', startTime: '07:00', endTime: '09:00', courseName: 'Renewable Energy', courseCode: 'REC204', lecturerName: 'SUH ELVICE / NTIAYA C', department: 'Renewable Energy' },
      { classroom: getRoomId('U-BLOCK E'), day: 'Wednesday', startTime: '11:00', endTime: '13:00', courseName: 'Renewable Energy', courseCode: 'REC304', lecturerName: 'FOFANG/SUH', department: 'Renewable Energy' },
      { classroom: getRoomId('PEDAGOB 2'), day: 'Wednesday', startTime: '13:00', endTime: '15:00', courseName: 'Renewable Energy', courseCode: 'EEC242', lecturerName: 'SUH ELVICE', department: 'Renewable Energy' },
      { classroom: getRoomId('CRB II 50G'), day: 'Thursday', startTime: '07:00', endTime: '09:00', courseName: 'Renewable Energy', courseCode: 'REC204', lecturerName: 'SUH ELVICE / NTIAYA C', department: 'Renewable Energy' },
      { classroom: getRoomId('PEDAGOB 1'), day: 'Thursday', startTime: '11:00', endTime: '15:00', courseName: 'Renewable Energy', courseCode: 'EEC248', lecturerName: 'FOFANG T', department: 'Renewable Energy' },
      { classroom: getRoomId('PEDAGOB 1'), day: 'Thursday', startTime: '15:00', endTime: '17:00', courseName: 'Renewable Energy', courseCode: 'REC202', lecturerName: 'FOFANG T / SUH ELVICE', department: 'Renewable Energy' },
      { classroom: getRoomId('U-BLOCK E'), day: 'Thursday', startTime: '17:00', endTime: '19:00', courseName: 'Renewable Energy', courseCode: 'REC306', lecturerName: 'NTIAYA C', department: 'Renewable Energy' },
      { classroom: getRoomId('PEDAGOB 4'), day: 'Friday', startTime: '11:00', endTime: '13:00', courseName: 'Renewable Energy', courseCode: 'EEC450', lecturerName: 'FOFANG T', department: 'Renewable Energy' },
      { classroom: getRoomId('PEDAGOB 4'), day: 'Friday', startTime: '13:00', endTime: '15:00', courseName: 'Renewable Energy', courseCode: 'REC302', lecturerName: 'FOFANG/SUH', department: 'Renewable Energy' },
      { classroom: getRoomId('CRB II 50G'), day: 'Friday', startTime: '15:00', endTime: '17:00', courseName: 'Renewable Energy', courseCode: 'REC202', lecturerName: 'FOFANG T / SUH ELVICE', department: 'Renewable Energy' },
      { classroom: getRoomId('U-BLOCK E'), day: 'Saturday', startTime: '07:00', endTime: '09:00', courseName: 'Renewable Energy', courseCode: 'MET316', lecturerName: 'NTIAYA C', department: 'Renewable Energy' },
      { classroom: getRoomId('PEDAGOB 4'), day: 'Saturday', startTime: '07:00', endTime: '11:00', courseName: 'Renewable Energy', courseCode: 'MET436', lecturerName: 'NTIAYA C', department: 'Renewable Energy' },
      { classroom: getRoomId('PEDAGOB 4'), day: 'Saturday', startTime: '11:00', endTime: '15:00', courseName: 'Renewable Energy', courseCode: 'MET202', lecturerName: 'NTIAYA C', department: 'Renewable Energy' },
    ];

    const validEntries = timetableEntries.filter(e => e.classroom);
    await Timetable.insertMany(validEntries);
    console.log(`✅ ${validEntries.length} timetable entries seeded`);

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