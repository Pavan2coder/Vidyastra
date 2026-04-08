// ── Courses page — load from API ──────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('api-courses-row');
  if (!container) return;

  try {
    const data = await apiGetCourses();
    container.innerHTML = '';

    data.courses.forEach(course => {
      const emojis = { Language: '📜', Mathematics: '📐', Philosophy: '🏛️', Science: '🔬' };
      const icon   = emojis[course.category] || '📚';

      const card = document.createElement('a');
      card.href      = 'course-player.html';
      card.className = 'co-card';
      card.innerHTML = `
        <div class="co-thumb">${icon}</div>
        <div class="co-card-body">
          <h3>${course.title}</h3>
          <p>${course.description}</p>
          <span class="co-card-tag">${course.level} · ${course.duration}</span>
        </div>`;
      container.appendChild(card);
    });
  } catch (err) {
    console.warn('Could not load courses from API:', err.message);
  }
});
