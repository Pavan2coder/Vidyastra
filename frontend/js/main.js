// ── Vidyastra main.js — appearance + scroll animations ────────

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.appearance-toggle');
  const panel  = document.getElementById('appearance-panel');

  // Inject close button into panel header
  if (panel) {
    const header = panel.querySelector('.appearance-panel-header');
    if (header && !header.querySelector('.appearance-close-btn')) {
      const closeBtn = document.createElement('button');
      closeBtn.className   = 'appearance-close-btn';
      closeBtn.innerHTML   = '✕';
      closeBtn.title       = 'Close';
      closeBtn.setAttribute('aria-label', 'Close appearance panel');
      closeBtn.addEventListener('click', closePanel);
      header.appendChild(closeBtn);
    }
  }

  function openPanel() {
    if (!panel) return;
    panel.removeAttribute('hidden');
    panel.setAttribute('aria-hidden', 'false');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
  }

  function closePanel() {
    if (!panel) return;
    panel.setAttribute('hidden', '');
    panel.setAttribute('aria-hidden', 'true');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle) toggle.addEventListener('click', () => {
    panel && panel.hasAttribute('hidden') ? openPanel() : closePanel();
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (panel && !panel.hasAttribute('hidden') &&
        !panel.contains(e.target) && e.target !== toggle) {
      closePanel();
    }
  });

  // Dark mode toggle
  const darkToggle = document.querySelector('.appearance-dark-toggle');
  if (darkToggle) {
    try { darkToggle.checked = JSON.parse(localStorage.getItem('vidyastra_appearance') || '{}').mode === 'dark'; } catch {}
    darkToggle.addEventListener('change', () => applyAppearance({ mode: darkToggle.checked ? 'dark' : 'light' }));
  }

  // Theme select
  const themeSelect = document.getElementById('appearance-theme-select');
  if (themeSelect) {
    try { themeSelect.value = JSON.parse(localStorage.getItem('vidyastra_appearance') || '{}').theme || 'default'; } catch {}
    themeSelect.addEventListener('change', () => applyAppearance({ theme: themeSelect.value }));
  }

  // Font select
  const fontSelect = document.getElementById('appearance-font-select');
  if (fontSelect) {
    try { fontSelect.value = JSON.parse(localStorage.getItem('vidyastra_appearance') || '{}').font || 'default'; } catch {}
    fontSelect.addEventListener('change', () => applyAppearance({ font: fontSelect.value }));
  }

  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

  // Page transition overlay
  const overlay = document.querySelector('.page-transition-overlay');
  if (overlay) setTimeout(() => overlay.style.opacity = '0', 50);
});

function applyAppearance(changes) {
  try {
    const stored  = JSON.parse(localStorage.getItem('vidyastra_appearance') || '{}');
    const updated = { ...stored, ...changes };
    localStorage.setItem('vidyastra_appearance', JSON.stringify(updated));
    const root = document.documentElement;
    ['theme-default','theme-vedic','theme-modern','theme-academic'].forEach(c => root.classList.remove(c));
    ['font-default','font-sans','font-classical'].forEach(c => root.classList.remove(c));
    root.classList.remove('mode-dark');
    if (updated.theme) root.classList.add('theme-' + updated.theme);
    if (updated.font)  root.classList.add('font-'  + updated.font);
    if (updated.mode === 'dark') root.classList.add('mode-dark');
  } catch {}
}
