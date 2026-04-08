// ── Shared signup handler ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Detect role from page URL
  const page = window.location.pathname;
  let role = 'student';
  if (page.includes('teacher') || page.includes('enrollment')) role = 'teacher';
  if (page.includes('mentor') || page.includes('application'))  role = 'mentor';

  // Find the form (works across all signup pages)
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameEl     = form.querySelector('#full-name');
    const emailEl    = form.querySelector('#email');
    const passwordEl = form.querySelector('#password');
    const confirmEl  = form.querySelector('#confirm-password');
    const phoneEl    = form.querySelector('#phone');
    const subjectEl  = form.querySelector('#expertise');

    const name     = nameEl?.value.trim();
    const email    = emailEl?.value.trim();
    const password = passwordEl?.value.trim();
    const confirm  = confirmEl?.value.trim();
    const phone    = phoneEl?.value.trim() || null;
    const subject  = subjectEl?.value.trim() || null;

    if (!name || !email || !password) {
      showMsg('Name, email and password are required.', 'error', form);
      return;
    }
    if (confirm && password !== confirm) {
      showMsg('Passwords do not match.', 'error', form);
      return;
    }

    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Creating account…'; }

    try {
      const payload = { name, email, password, role };
      if (phone)   payload.phone   = phone;
      if (subject) payload.subject = subject;

      const data = await apiSignup(payload);
      saveSession(data.token, data.user);

      showMsg('Account created! Redirecting…', 'success', form);

      setTimeout(() => {
        if (role === 'teacher')     window.location.href = 'teacher-home.html';
        else if (role === 'mentor') window.location.href = 'mentor-home.html';
        else                        window.location.href = 'learning-home.html';
      }, 1000);
    } catch (err) {
      showMsg(err.message || 'Signup failed. Try again.', 'error', form);
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Create Account'; }
    }
  });
});

function showMsg(msg, type, form) {
  let el = document.getElementById('signup-msg');
  if (!el) {
    el = document.createElement('div');
    el.id = 'signup-msg';
    el.style.cssText = 'margin-top:1rem;padding:0.75rem 1rem;border-radius:6px;font-size:0.85rem;font-weight:600;text-align:center;';
    form.appendChild(el);
  }
  el.textContent      = msg;
  el.style.background = type === 'error' ? '#FEE2E2' : '#DCFCE7';
  el.style.color      = type === 'error' ? '#991B1B' : '#166534';
  el.style.border     = type === 'error' ? '1px solid #FECACA' : '1px solid #86EFAC';
}
