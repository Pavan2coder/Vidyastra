const { courses, getNextCourseId } = require('../data/store');

// GET /api/courses
const getAllCourses = (req, res) => {
  const { category, level } = req.query;
  let result = [...courses];
  if (category) result = result.filter((c) => c.category.toLowerCase() === category.toLowerCase());
  if (level)    result = result.filter((c) => c.level.toLowerCase()    === level.toLowerCase());
  res.json({ success: true, count: result.length, courses: result });
};

// GET /api/courses/:id
const getCourseById = (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).json({ success: false, message: 'Course not found.' });
  res.json({ success: true, course });
};

// POST /api/courses  (teacher only)
const createCourse = (req, res) => {
  const { title, description, category, duration, level } = req.body;

  if (!title || !description || !category) {
    return res.status(400).json({ success: false, message: 'Title, description and category are required.' });
  }

  const newCourse = {
    id: getNextCourseId(),
    title,
    description,
    teacherId: req.user.id,
    category,
    duration: duration || 'TBD',
    level: level || 'Beginner',
    createdAt: new Date().toISOString().split('T')[0],
  };

  courses.push(newCourse);
  res.status(201).json({ success: true, message: 'Course created.', course: newCourse });
};

// PUT /api/courses/:id  (teacher who owns it)
const updateCourse = (req, res) => {
  const index = courses.findIndex((c) => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Course not found.' });

  if (courses[index].teacherId !== req.user.id) {
    return res.status(403).json({ success: false, message: 'You can only edit your own courses.' });
  }

  const { title, description, category, duration, level } = req.body;
  if (title)       courses[index].title       = title;
  if (description) courses[index].description = description;
  if (category)    courses[index].category    = category;
  if (duration)    courses[index].duration    = duration;
  if (level)       courses[index].level       = level;

  res.json({ success: true, message: 'Course updated.', course: courses[index] });
};

// DELETE /api/courses/:id  (teacher who owns it)
const deleteCourse = (req, res) => {
  const index = courses.findIndex((c) => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Course not found.' });

  if (courses[index].teacherId !== req.user.id) {
    return res.status(403).json({ success: false, message: 'You can only delete your own courses.' });
  }

  courses.splice(index, 1);
  res.json({ success: true, message: 'Course deleted.' });
};

module.exports = { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse };
