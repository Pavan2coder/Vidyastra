// ── Mentor connect / sessions ─────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  // Load mentors list
  const mentorListEl = document.getElementById('mentors-list');
  if (mentorListEl) await loadMentors(mentorListEl);

  // Load sessions
  const sessionsEl = document.getElementById('sessions-list');
  if (sessionsEl) await loadSessions(sessionsEl);

  // Book session form
  const bookForm = document.getElementById('book-session-form');
  if (bookForm) {
    bookForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        mentorId:    bookForm.querySelector('#mentor-id')?.value,
        topic:       bookForm.querySelector('#session-topic')?.value.trim(),
        scheduledAt: bookForm.querySelector('#session-date')?.value,
      };
      if (!payload.mentorId || !payload.topic || !payload.scheduledAt) {
        showMentorMsg('All fields are required.', 'error'); return;
      }
      try {
        await apiBookSession(payload);
        showMentorMsg('Session booked!', 'success');
        bookForm.reset();
        if (sessionsEl) await loadSessions(sessionsEl);
      } catch (err) {
        showMentorMsg(err.message, 'error');
      }
    });
  }
});

async function loadMentors(container) {
  try {
    const data = await apiGetMentors();
    container.innerHTML = data.mentors.map(m => `
      <div style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:8px;padding:1rem 1.25rem;margin-bottom:0.75rem;">
        <strong>${m.name}</strong>
        <span style="font-size:0.8rem;color:var(--color-text-muted);margin-left:0.5rem;">${m.expertise || 'General Guidance'}</span>
        <span style="font-size:0.75rem;color:var(--color-primary);margin-left:0.5rem;">ID: ${m.id}</span>
      </div>`).join('') || '<p>No mentors available.</p>';
  } catch (err) {
    container.innerHTML = '<p style="color:#991B1B">Could not load mentors.</p>';
  }
}

async function loadSessions(container) {
  try {
    const data = await apiGetSessions();
    container.innerHTML = data.sessions.length === 0
      ? '<p style="color:var(--color-text-muted)">No sessions yet.</p>'
      : data.sessions.map(s => `
          <div style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:8px;padding:1rem 1.25rem;margin-bottom:0.75rem;">
            <strong>${s.topic}</strong>
            <span style="font-size:0.8rem;color:var(--color-text-muted);margin-left:0.5rem;">${new Date(s.scheduledAt).toLocaleString()}</span>
            <span style="font-size:0.75rem;background:#DCFCE7;color:#166534;padding:2px 8px;border-radius:999px;margin-left:0.5rem;">${s.status}</span>
          </div>`).join('');
  } catch (err) {
    container.innerHTML = '<p style="color:#991B1B">Could not load sessions.</p>';
  }
}

function showMentorMsg(msg, type) {
  let el = document.getElementById('mentor-msg');
  if (!el) {
    el = document.createElement('div');
    el.id = 'mentor-msg';
    el.style.cssText = 'margin-top:1rem;padding:0.75rem 1rem;border-radius:6px;font-size:0.85rem;font-weight:600;text-align:center;';
    const form = document.getElementById('book-session-form');
    if (form) form.appendChild(el);
  }
  el.textContent      = msg;
  el.style.background = type === 'error' ? '#FEE2E2' : '#DCFCE7';
  el.style.color      = type === 'error' ? '#991B1B' : '#166534';
  el.style.border     = type === 'error' ? '1px solid #FECACA' : '1px solid #86EFAC';
}
