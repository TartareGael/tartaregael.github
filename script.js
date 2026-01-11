function updateThemeLabel(theme) {
  document.querySelectorAll('.theme-dropdown .dropdown-button')
    .forEach(button => {
      const label = theme === 'dark' ? 'Dark' : 'Light';

      // On garde le chevron
      const chevron = button.querySelector('.chevron');
      button.textContent = label + ' ';
      if (chevron) button.appendChild(chevron);
    });
}



// ================================
// THEME PERSISTANT + MENU STABLE
// ================================

// ---- Appliquer le thème sauvegardé ----
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.classList.remove('theme-light', 'theme-dark');
document.documentElement.classList.add(`theme-${savedTheme}`);

// ---- Sélecteurs ----
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const themeDropdowns = document.querySelectorAll('.theme-dropdown');
const themeButtons = document.querySelectorAll('[data-theme]');

// ================================
// MENU HAMBURGER
// ================================
navToggle.addEventListener('click', (e) => {
  e.stopPropagation();

  const isOpen = nav.getAttribute('aria-expanded') === 'true';
  nav.setAttribute('aria-expanded', String(!isOpen));
});

// ================================
// DROPDOWN THEME
// ================================
themeDropdowns.forEach(dropdown => {
  const button = dropdown.querySelector('.dropdown-button');

  button.addEventListener('click', (e) => {
    e.stopPropagation();

    // Ferme les autres dropdowns
    themeDropdowns.forEach(d => {
      if (d !== dropdown) d.classList.remove('open');
    });

    dropdown.classList.toggle('open');
  });
});

// ================================
// CHANGEMENT DE THÈME
// ================================
themeButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation();

    const theme = button.dataset.theme;

    document.documentElement.classList.remove('theme-light', 'theme-dark');
    document.documentElement.classList.add(`theme-${theme}`);

    localStorage.setItem('theme', theme);

    // Ferme les dropdowns après sélection
    themeDropdowns.forEach(d => d.classList.remove('open'));

  });
});

// ================================
// CLICK EN DEHORS → FERMETURE
// ================================
document.addEventListener('click', (e) => {
  // Ferme les dropdowns
  themeDropdowns.forEach(dropdown => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });

  // Ferme le menu hamburger
  if (!e.target.closest('.nav')) {
    nav.setAttribute('aria-expanded', 'false');
  }
});

window.addEventListener("load", () => {
  document.documentElement.classList.add("loaded");
});

function updateThemeLabel(theme) {
  document.querySelectorAll('.theme-dropdown .label')
    .forEach(label => {
      label.textContent = theme === 'dark' ? 'Dark' : 'Light';
      label.classList.remove('is-placeholder');
    });
}

document.querySelectorAll('[data-theme]').forEach(button => {
  button.addEventListener('click', () => {
    const theme = button.dataset.theme;

    document.documentElement.classList.remove('theme-dark', 'theme-light');
    document.documentElement.classList.add(`theme-${theme}`);

    localStorage.setItem('theme', theme);
  });
});

const input = document.getElementById('password');
const toggle = document.getElementById('toggle');
const submit = document.getElementById('submit');
const message = document.getElementById('message');

toggle.addEventListener('click', () => {
  input.type = input.type === 'password' ? 'text' : 'password';
});

submit.addEventListener('click', async () => {
  message.textContent = '';
  message.className = 'message';

  const password = input.value.trim();
  if (!password) return;

  submit.disabled = true;
  submit.textContent = 'Vérification…';

  const res = await fetch('/auth/constel', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  });

  submit.disabled = false;
  submit.textContent = 'Continuer';

  if (res.ok) {
    message.textContent = '✅ Connexion réussi, accès au projet !';
    message.classList.add('success');

    setTimeout(() => {
      window.location.href = 'constel-mentorat.html';
    }, 900);
  } else {
    message.textContent = '❌ Mot de passe incorrect, veuillez réessayer.';
    message.classList.add('error');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('password');
  const toggle = document.getElementById('toggle');

  if (!input || !toggle) return;

  toggle.addEventListener('click', () => {
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  });
});

