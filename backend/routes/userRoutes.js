const express    = require('express');
const router     = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getProfile,
  getAllUsers,
  getUserById,
  updateProfile,
  deleteUser,
} = require('../controllers/userController');

// All routes require authentication
router.use(protect);

router.get('/profile',    getProfile);           // own profile
router.put('/profile',    updateProfile);         // update own profile
router.get('/',           authorize('teacher', 'mentor'), getAllUsers);  // list all users
router.get('/:id',        getUserById);           // get any user by id
router.delete('/:id',     deleteUser);            // delete user

module.exports = router;
