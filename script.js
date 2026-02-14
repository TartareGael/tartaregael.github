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

// ---- Appliquer le thème sauvegardé ----
const savedTheme = localStorage.getItem('theme') || 'dark';
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

/* -------------------------
   "Ce que je fais" — Carousel responsive
   Desktop/Tablette: 3 visibles sur [1..5]
   Mobile: 1 visible sur [1,4,5,6]
   ------------------------- */
(function initServicesCarousel() {
  const root = document.querySelector('[data-carousel]');
  if (!root) return;

  const track = root.querySelector('.services-track');
  const btnPrev = document.querySelector('[data-carousel-prev]');
  const btnNext = document.querySelector('[data-carousel-next]');
  if (!track || !btnPrev || !btnNext) return;

  const allCards = Array.from(track.querySelectorAll('.service-card'));
  let index = 0;
  let maxIndex = 0;
  let windowSize = 3;

  const isMobile = () => window.matchMedia('(max-width: 600px)').matches;

  const getActiveCards = () => {
    if (isMobile()) {
      // Mobile: 1,4,5,6 (2 & 3 cachées)
      return allCards.filter((c) => !c.classList.contains('service-2') && !c.classList.contains('service-3'));
    }
    // Desktop/Tablette: 1..5 (6 cachée)
    return allCards.filter((c) => !c.classList.contains('service-6'));
  };

  const computeMetrics = () => {
    windowSize = isMobile() ? 1 : 3;
    const active = getActiveCards();
    maxIndex = Math.max(0, active.length - windowSize);
    if (index > maxIndex) index = 0;
    return active;
  };

  const getStep = (active) => {
    const first = active[0];
    if (!first) return 0;
    const cardW = first.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap || '0') || 0;
    return cardW + gap;
  };

  const render = () => {
    const active = computeMetrics();
    const step = getStep(active);
    track.style.transform = `translateX(${-index * step}px)`;
  };

  const goNext = () => {
    computeMetrics();
    index = (index >= maxIndex) ? 0 : index + 1;
    render();
  };

  const goPrev = () => {
    computeMetrics();
    index = (index <= 0) ? maxIndex : index - 1;
    render();
  };

  btnNext.addEventListener('click', goNext);
  btnPrev.addEventListener('click', goPrev);

  // clavier
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'ArrowLeft') goPrev();
  });

  window.addEventListener('resize', render);
  window.addEventListener('load', () => {
    document.documentElement.classList.add('loaded');
    render();
  });

  render();
})();

// ===============================
// CE QUE JE FAIS — CAROUSEL (UNE SEULE VERSION)
// + flèches grisées quand inutilisables
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("servicesTrack");
  const prev = document.getElementById("servicesPrev");
  const next = document.getElementById("servicesNext");

  if (!track || !prev || !next) return;

  function getStep() {
    // Prend une carte visible (la 6 est cachée en desktop via CSS)
    const card = track.querySelector(".service-card:not([style*='display: none'])");
    if (!card) return 0;

    const gap = parseFloat(getComputedStyle(track).gap || "0") || 0;
    return card.getBoundingClientRect().width + gap;
  }

  function setDisabled(btn, isDisabled) {
    btn.classList.toggle("disabled", isDisabled);
    btn.disabled = isDisabled;                 // bloque le click
    btn.setAttribute("aria-disabled", String(isDisabled));
  }

  function updateArrows() {
    const maxScroll = track.scrollWidth - track.clientWidth;

    // petite tolérance pour éviter les bugs d’arrondis
    const atStart = track.scrollLeft <= 1;
    const atEnd = track.scrollLeft >= maxScroll - 1;

    setDisabled(prev, atStart);
    setDisabled(next, atEnd);
  }

prev.addEventListener("click", () => {
  track.scrollTo({ left: 0, behavior: "smooth" });
});

next.addEventListener("click", () => {
  const maxScroll = track.scrollWidth - track.clientWidth;
  track.scrollTo({ left: maxScroll, behavior: "smooth" });
});


  // Met à jour pendant le scroll (smooth inclus)
  track.addEventListener("scroll", () => requestAnimationFrame(updateArrows));
  window.addEventListener("resize", () => {
    // après resize, recalcul des limites
    requestAnimationFrame(updateArrows);
  });

  // état initial
  requestAnimationFrame(updateArrows);
});

/* =========================================
   SERVICES TRACK — Drag to scroll (<= 1100px)
   ========================================= */
(function enableDragToScrollServices() {
  const track = document.getElementById("servicesTrack");
  if (!track) return;

  const mq = window.matchMedia("(max-width: 1100px)");

  let isDown = false;
  let startX = 0;
  let startScrollLeft = 0;

  const onPointerDown = (e) => {
    if (!mq.matches) return;           // desktop: OFF
    isDown = true;
    track.classList.add("is-dragging");
    startX = e.clientX;
    startScrollLeft = track.scrollLeft;

    // capture pour continuer à recevoir les events même si on sort du track
    try { track.setPointerCapture(e.pointerId); } catch (_) {}
  };

  const onPointerMove = (e) => {
    if (!mq.matches || !isDown) return;

    const dx = e.clientX - startX;
    track.scrollLeft = startScrollLeft - dx;

    // empêche la sélection de texte / comportements parasites
    e.preventDefault();
  };

  const endDrag = (e) => {
    if (!isDown) return;
    isDown = false;
    track.classList.remove("is-dragging");
    try { track.releasePointerCapture(e.pointerId); } catch (_) {}
  };

  track.addEventListener("pointerdown", onPointerDown, { passive: true });
  track.addEventListener("pointermove", onPointerMove, { passive: false });
  track.addEventListener("pointerup", endDrag);
  track.addEventListener("pointercancel", endDrag);
  track.addEventListener("pointerleave", endDrag);
})();

