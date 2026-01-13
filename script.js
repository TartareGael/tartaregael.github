/* ============================
   PostHog — Analytics global
============================ */

!function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init ts ns yi rs os Qr es capture Hi calculateEventProperties hs register register_once register_for_session unregister unregister_for_session fs getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty vs us createPersonProfile cs Yr ps opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing ls debug O ds getPageViewId captureTraceFeedback captureTraceMetric Vr".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

posthog.init('phc_TeGu9jR0isFTWgBTqAEOp0DjQHxqLAdS66Xab5QwNLe', {
  api_host: 'https://eu.i.posthog.com',
  defaults: '2025-11-30',
  person_profiles: 'identified_only',
});

window.track = function (event, props = {}) {
  if (window.posthog) {
    posthog.capture(event, {
      source: 'portfolio_html',
      ...props
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  track('page_loaded', {
    page: document.title,
    path: window.location.pathname
  });

  if (document.body.classList.contains('project-page')) {
    track('project_viewed', {
      project: document.querySelector('.project-title')?.innerText || 'unknown'
    });
  }
});

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-primary');
  if (!btn) return;

  track('cta_clicked', {
    text: btn.innerText.trim(),
    page: document.title
  });
});



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

// Lire le thème déjà défini dans <head>
const currentTheme = document.documentElement.classList.contains('theme-dark')
  ? 'dark'
  : 'light';

updateThemeLabel(currentTheme);


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

if (input && toggle && submit && message) {

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
      message.textContent = '✅ Connexion réussie, accès au projet !';
      message.classList.add('success');
      track('login_success');
    } else {
      message.textContent = '❌ Mot de passe incorrect';
      message.classList.add('error');
      track('login_error');
    }
  });

}

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

