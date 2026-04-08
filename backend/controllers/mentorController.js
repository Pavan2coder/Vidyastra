const { users, mentorSessions, getNextSessionId } = require('../data/store');

// GET /api/mentors  — list all mentors
const getAllMentors = (req, res) => {
  const mentors = users
    .filter((u) => u.role === 'mentor')
    .map(({ password, ...rest }) => rest);
  res.json({ success: true, count: mentors.length, mentors });
};

// GET /api/mentors/sessions  — get sessions for logged-in user
const getMySessions = (req, res) => {
  const sessions = mentorSessions.filter(
    (s) => s.mentorId === req.user.id || s.studentId === req.user.id
  );
  res.json({ success: true, count: sessions.length, sessions });
};

// POST /api/mentors/sessions  — student books a session
const bookSession = (req, res) => {
  const { mentorId, topic, scheduledAt } = req.body;

  if (!mentorId || !topic || !scheduledAt) {
    return res.status(400).json({ success: false, message: 'mentorId, topic and scheduledAt are required.' });
  }

  const mentor = users.find((u) => u.id === parseInt(mentorId) && u.role === 'mentor');
  if (!mentor) return res.status(404).json({ success: false, message: 'Mentor not found.' });

  const session = {
    id: getNextSessionId(),
    mentorId: parseInt(mentorId),
    studentId: req.user.id,
    topic,
    scheduledAt,
    status: 'scheduled',
  };

  mentorSessions.push(session);
  res.status(201).json({ success: true, message: 'Session booked.', session });
};

// PUT /api/mentors/sessions/:id  — update session status
const updateSession = (req, res) => {
  const index = mentorSessions.findIndex((s) => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Session not found.' });

  const session = mentorSessions[index];
  if (session.mentorId !== req.user.id && session.studentId !== req.user.id) {
    return res.status(403).json({ success: false, message: 'Access denied.' });
  }

  const { status, topic, scheduledAt } = req.body;
  if (status)      mentorSessions[index].status      = status;
  if (topic)       mentorSessions[index].topic       = topic;
  if (scheduledAt) mentorSessions[index].scheduledAt = scheduledAt;

  res.json({ success: true, message: 'Session updated.', session: mentorSessions[index] });
};

// DELETE /api/mentors/sessions/:id
const deleteSession = (req, res) => {
  const index = mentorSessions.findIndex((s) => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Session not found.' });

  const session = mentorSessions[index];
  if (session.mentorId !== req.user.id && session.studentId !== req.user.id) {
    return res.status(403).json({ success: false, message: 'Access denied.' });
  }

  mentorSessions.splice(index, 1);
  res.json({ success: true, message: 'Session cancelled.' });
};

module.exports = { getAllMentors, getMySessions, bookSession, updateSession, deleteSession };
