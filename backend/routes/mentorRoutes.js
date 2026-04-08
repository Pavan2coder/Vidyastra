const express  = require('express');
const router   = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getAllMentors,
  getMySessions,
  bookSession,
  updateSession,
  deleteSession,
} = require('../controllers/mentorController');

router.get('/', getAllMentors);                                  // public

router.use(protect);                                            // auth required below

router.get('/sessions',       getMySessions);                   // own sessions
router.post('/sessions',      authorize('student'), bookSession); // student books
router.put('/sessions/:id',   updateSession);                   // mentor or student
router.delete('/sessions/:id', deleteSession);                  // mentor or student

module.exports = router;
