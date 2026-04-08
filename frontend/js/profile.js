// ── Profile page — load from API & save changes ───────────────
document.addEventListener('DOMContentLoaded', async () => {
  const nameEl  = document.getElementById('pf-name');
  const emailEl = document.getElementById('pf-email');
  const roleEl  = document.getElementById('pf-role');
  const avatar  = document.getElementById('pf-avatar');
  const badge   = document.querySelector('.pf-role-badge');

  // Load profile from API
  try {
    const data = await apiGetProfile();
    const u    = data.user;
    if (nameEl)  nameEl.value  = u.name;
    if (emailEl) emailEl.value = u.email;
    if (roleEl)  roleEl.value  = u.role.charAt(0).toUpperCase() + u.role.slice(1);
    if (badge)   badge.textContent = u.role.charAt(0).toUpperCase() + u.role.slice(1);
    setAvatar(avatar, u.name);
    saveSession(localStorage.getItem('vidyastra_token'), u);
  } catch (err) {
    // Fallback to localStorage
    const u = getUser();
    if (u) {
      if (nameEl)  nameEl.value  = u.name  || '';
      if (emailEl) emailEl.value = u.email || '';
      if (roleEl)  roleEl.value  = u.role  || 'Student';
      setAvatar(avatar, u.name || 'S');
    }
  }

  // Wire save button
  window.saveProfile = async function () {
    const newName = nameEl?.value.trim();
    if (!newName) { nameEl?.focus(); return; }

    try {
      const data = await apiUpdateProfile({ name: newName });
      saveSession(localStorage.getItem('vidyastra_token'), data.user);
      setAvatar(avatar, newName);
      const toast = document.getElementById('pf-toast');
      if (toast) { toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3000); }
    } catch (err) {
      alert('Could not save: ' + err.message);
    }
  };
});

function setAvatar(el, name) {
  if (!el || !name) return;
  const parts = name.trim().split(' ');
  el.textContent = parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase();
}
