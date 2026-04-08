// In-memory data store (replaces a database)
// Passwords are pre-hashed with bcryptjs (plain: "password123")
const HASHED_PW = '$2b$10$4sfVmIj2hGBgCGV6xyvwwuB45KzfC22vskbqMCs1sKhhloJfkwnzW';

const users = [
  {
    id: 1,
    name: 'Arjun Sharma',
    email: 'arjun@vidyastra.in',
    password: HASHED_PW,
    role: 'student',
    phone: '9876543210',
    enrolledCourses: [1, 2],
    createdAt: '2026-01-10',
  },
  {
    id: 2,
    name: 'Priya Nair',
    email: 'priya@vidyastra.in',
    password: HASHED_PW,
    role: 'teacher',
    phone: '9123456780',
    subject: 'Mathematics',
    createdAt: '2026-01-05',
  },
  {
    id: 3,
    name: 'Ravi Menon',
    email: 'ravi@vidyastra.in',
    password: HASHED_PW,
    role: 'mentor',
    phone: '9988776655',
    expertise: 'Career Guidance',
    createdAt: '2026-01-08',
  },
];

const courses = [
  {
    id: 1,
    title: 'Foundations of Sanskrit',
    description: 'An introduction to the ancient language of knowledge.',
    teacherId: 2,
    category: 'Language',
    duration: '8 weeks',
    level: 'Beginner',
    createdAt: '2026-02-01',
  },
  {
    id: 2,
    title: 'Vedic Mathematics',
    description: 'Speed calculation techniques rooted in ancient sutras.',
    teacherId: 2,
    category: 'Mathematics',
    duration: '6 weeks',
    level: 'Intermediate',
    createdAt: '2026-02-10',
  },
  {
    id: 3,
    title: 'Indian Philosophy 101',
    description: 'Core concepts from Nyaya, Vedanta, and Samkhya schools.',
    teacherId: 2,
    category: 'Philosophy',
    duration: '10 weeks',
    level: 'Beginner',
    createdAt: '2026-02-15',
  },
];

const mentorSessions = [
  {
    id: 1,
    mentorId: 3,
    studentId: 1,
    topic: 'Career path in academia',
    scheduledAt: '2026-04-15T10:00:00',
    status: 'scheduled',
  },
];

// Auto-increment helpers
let nextUserId   = users.length + 1;
let nextCourseId = courses.length + 1;
let nextSessionId = mentorSessions.length + 1;

module.exports = {
  users,
  courses,
  mentorSessions,
  getNextUserId:    () => nextUserId++,
  getNextCourseId:  () => nextCourseId++,
  getNextSessionId: () => nextSessionId++,
};
