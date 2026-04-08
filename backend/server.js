const path = require('path');
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes    = require('./routes/authRoutes');
const userRoutes    = require('./routes/userRoutes');
const courseRoutes  = require('./routes/courseRoutes');
const mentorRoutes  = require('./routes/mentorRoutes');
const errorHandler  = require('./middleware/errorHandler');

const app = express();

// ── Middleware ──────────────────────────────────────────────
app.use(cors({
  origin: '*',   // allow all origins (file://, localhost:*, etc.)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// ── Routes ──────────────────────────────────────────────────
app.use('/api/auth',    authRoutes);
app.use('/api/users',   userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/mentors', mentorRoutes);

// ── Serve frontend static files ─────────────────────────────
app.use(express.static(path.join(__dirname, '../frontend')));

// ── Health check ────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'Vidyastra API is running', version: '1.0.0' });
});

// ── 404 handler ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ── Global error handler ────────────────────────────────────
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Vidyastra API running on http://localhost:${PORT}`);
});
