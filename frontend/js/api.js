// ── Vidyastra API Client ──────────────────────────────────────
const API_BASE = 'http://localhost:5000/api';

function getToken() {
  return localStorage.getItem('vidyastra_token');
}

function saveSession(token, user) {
  localStorage.setItem('vidyastra_token', token);
  localStorage.setItem('auth_user', JSON.stringify(user));
  localStorage.setItem('userName', user.name);
  localStorage.setItem('user_role', user.role);
}

function clearSession() {
  localStorage.removeItem('vidyastra_token');
  localStorage.removeItem('auth_user');
  localStorage.removeItem('userName');
  localStorage.removeItem('user_role');
}

function getUser() {
  try { return JSON.parse(localStorage.getItem('auth_user') || 'null'); } catch { return null; }
}

async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

// ── Auth ──────────────────────────────────────────────────────
async function apiLogin(email, password) {
  return apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
}

async function apiSignup(payload) {
  return apiFetch('/auth/signup', { method: 'POST', body: JSON.stringify(payload) });
}

// ── Users ─────────────────────────────────────────────────────
async function apiGetProfile() {
  return apiFetch('/users/profile');
}

async function apiUpdateProfile(payload) {
  return apiFetch('/users/profile', { method: 'PUT', body: JSON.stringify(payload) });
}

// ── Courses ───────────────────────────────────────────────────
async function apiGetCourses(params = '') {
  return apiFetch(`/courses${params}`);
}

async function apiCreateCourse(payload) {
  return apiFetch('/courses', { method: 'POST', body: JSON.stringify(payload) });
}

async function apiUpdateCourse(id, payload) {
  return apiFetch(`/courses/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
}

async function apiDeleteCourse(id) {
  return apiFetch(`/courses/${id}`, { method: 'DELETE' });
}

// ── Mentors ───────────────────────────────────────────────────
async function apiGetMentors() {
  return apiFetch('/mentors');
}

async function apiGetSessions() {
  return apiFetch('/mentors/sessions');
}

async function apiBookSession(payload) {
  return apiFetch('/mentors/sessions', { method: 'POST', body: JSON.stringify(payload) });
}
