// ── Shared login handler for student / teacher / mentor ───────
document.addEventListener('DOMContentLoaded', () => {
  // Find the login button (works across all 3 login pages)
  const btn = document.querySelector('.login-btn');
  if (!btn) return;

  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();

    const emailEl    = document.querySelector('input[type="email"]');
    const passwordEl = document.querySelector('input[type="password"]');
    if (!emailEl || !passwordEl) return;

    const email    = emailEl.value.trim();
    const password = passwordEl.value.trim();

    if (!email || !password) {
      showMsg('Please enter email and password.', 'error');
      return;
    }

    btn.disabled    = true;
    btn.textContent = 'Signing in…';

    try {
      const data = await apiLogin(email, password);
      saveSession(data.token, data.user);

      // Redirect based on role
      const role = data.user.role;
      if (role === 'teacher')     window.location.href = 'teacher-home.html';
      else if (role === 'mentor') window.location.href = 'mentor-home.html';
      else                        window.location.href = 'learning-home.html';
    } catch (err) {
      showMsg(err.message || 'Login failed. Check your credentials.', 'error');
      btn.disabled    = false;
      btn.textContent = btn.dataset.label || 'Sign In';
    }
  });

  // Store original label
  const btn2 = document.querySelector('.login-btn');
  if (btn2) btn2.dataset.label = btn2.textContent;
});

function showMsg(msg, type = 'error') {
  let el = document.getElementById('api-msg');
  if (!el) {
    el = document.createElement('div');
    el.id = 'api-msg';
    el.style.cssText = 'margin-top:1rem;padding:0.75rem 1rem;border-radius:6px;font-size:0.85rem;font-weight:600;text-align:center;';
    const card = document.querySelector('.login-card');
    if (card) card.appendChild(el);
  }
  el.textContent   = msg;
  el.style.background = type === 'error' ? '#FEE2E2' : '#DCFCE7';
  el.style.color      = type === 'error' ? '#991B1B' : '#166534';
  el.style.border     = type === 'error' ? '1px solid #FECACA' : '1px solid #86EFAC';
}
