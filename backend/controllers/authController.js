const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const { users, getNextUserId } = require('../data/store');

const generateToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

// POST /api/auth/signup
const signup = async (req, res, next) => {
  try {
    const { name, email, password, role = 'student', phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required.' });
    }

    const validRoles = ['student', 'teacher', 'mentor'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ success: false, message: 'Role must be student, teacher, or mentor.' });
    }

    const exists = users.find((u) => u.email === email);
    if (exists) {
      return res.status(409).json({ success: false, message: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: getNextUserId(),
      name,
      email,
      password: hashedPassword,
      role,
      phone: phone || null,
      enrolledCourses: [],
      createdAt: new Date().toISOString().split('T')[0],
    };

    users.push(newUser);

    const token = generateToken(newUser);
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const token = generateToken(user);
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Login successful.',
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, login };
