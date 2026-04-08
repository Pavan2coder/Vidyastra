// ── Teacher dashboard — course management ────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  // Load teacher's courses
  const listEl = document.getElementById('teacher-courses-list');
  if (listEl) await loadTeacherCourses(listEl);

  // Create course form
  const createForm = document.getElementById('create-course-form');
  if (createForm) {
    createForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        title:       createForm.querySelector('#course-title')?.value.trim(),
        description: createForm.querySelector('#course-desc')?.value.trim(),
        category:    createForm.querySelector('#course-category')?.value.trim(),
        duration:    createForm.querySelector('#course-duration')?.value.trim(),
        level:       createForm.querySelector('#course-level')?.value.trim(),
      };
      if (!payload.title || !payload.description || !payload.category) {
        showTeacherMsg('Title, description and category are required.', 'error'); return;
      }
      try {
        await apiCreateCourse(payload);
        showTeacherMsg('Course created successfully!', 'success');
        createForm.reset();
        if (listEl) await loadTeacherCourses(listEl);
      } catch (err) {
        showTeacherMsg(err.message, 'error');
      }
    });
  }
});

async function loadTeacherCourses(container) {
  try {
    const data = await apiGetCourses();
    const user = getUser();
    const mine = data.courses.filter(c => c.teacherId === user?.id);

    container.innerHTML = mine.length === 0
      ? '<p style="color:var(--color-text-muted)">No courses yet. Create your first one below.</p>'
      : mine.map(c => `
          <div class="teacher-course-item" style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:8px;padding:1rem 1.25rem;margin-bottom:0.75rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;">
            <div>
              <strong>${c.title}</strong>
              <span style="font-size:0.8rem;color:var(--color-text-muted);margin-left:0.5rem;">${c.category} · ${c.level}</span>
            </div>
            <button onclick="deleteCourse(${c.id})" style="background:#FEE2E2;color:#991B1B;border:none;padding:0.4rem 0.85rem;border-radius:6px;cursor:pointer;font-weight:600;font-size:0.8rem;">Delete</button>
          </div>`).join('');
  } catch (err) {
    container.innerHTML = '<p style="color:#991B1B">Could not load courses.</p>';
  }
}

async function deleteCourse(id) {
  if (!confirm('Delete this course?')) return;
  try {
    await apiDeleteCourse(id);
    const listEl = document.getElementById('teacher-courses-list');
    if (listEl) await loadTeacherCourses(listEl);
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

function showTeacherMsg(msg, type) {
  let el = document.getElementById('teacher-msg');
  if (!el) {
    el = document.createElement('div');
    el.id = 'teacher-msg';
    el.style.cssText = 'margin-top:1rem;padding:0.75rem 1rem;border-radius:6px;font-size:0.85rem;font-weight:600;text-align:center;';
    const form = document.getElementById('create-course-form');
    if (form) form.appendChild(el);
  }
  el.textContent      = msg;
  el.style.background = type === 'error' ? '#FEE2E2' : '#DCFCE7';
  el.style.color      = type === 'error' ? '#991B1B' : '#166534';
  el.style.border     = type === 'error' ? '1px solid #FECACA' : '1px solid #86EFAC';
}
