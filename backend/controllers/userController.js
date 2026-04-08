const bcrypt = require('bcryptjs');
const { users } = require('../data/store');

// Helper: strip password from user object
const sanitize = ({ password, ...rest }) => rest;

// GET /api/users/profile  (own profile)
const getProfile = (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
  res.json({ success: true, user: sanitize(user) });
};

// GET /api/users  (admin / teacher can list all)
const getAllUsers = (req, res) => {
  res.json({ success: true, count: users.length, users: users.map(sanitize) });
};

// GET /api/users/:id
const getUserById = (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
  res.json({ success: true, user: sanitize(user) });
};

// PUT /api/users/profile  (update own profile)
const updateProfile = async (req, res, next) => {
  try {
    const index = users.findIndex((u) => u.id === req.user.id);
    if (index === -1) return res.status(404).json({ success: false, message: 'User not found.' });

    const { name, phone, subject, expertise, password } = req.body;

    if (name)      users[index].name      = name;
    if (phone)     users[index].phone     = phone;
    if (subject)   users[index].subject   = subject;
    if (expertise) users[index].expertise = expertise;

    if (password) {
      users[index].password = await bcrypt.hash(password, 10);
    }

    res.json({ success: true, message: 'Profile updated.', user: sanitize(users[index]) });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/users/:id  (teacher/mentor can delete; student can delete own)
const deleteUser = (req, res) => {
  const targetId = parseInt(req.params.id);

  // Students can only delete their own account
  if (req.user.role === 'student' && req.user.id !== targetId) {
    return res.status(403).json({ success: false, message: 'You can only delete your own account.' });
  }

  const index = users.findIndex((u) => u.id === targetId);
  if (index === -1) return res.status(404).json({ success: false, message: 'User not found.' });

  users.splice(index, 1);
  res.json({ success: true, message: 'User deleted successfully.' });
};

module.exports = { getProfile, getAllUsers, getUserById, updateProfile, deleteUser };
