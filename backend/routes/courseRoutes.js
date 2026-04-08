const express  = require('express');
const router   = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');

router.get('/',     getAllCourses);                              // public
router.get('/:id',  getCourseById);                             // public

router.use(protect);                                            // auth required below

router.post('/',    authorize('teacher'), createCourse);        // teacher only
router.put('/:id',  authorize('teacher'), updateCourse);        // teacher only
router.delete('/:id', authorize('teacher'), deleteCourse);      // teacher only

module.exports = router;
