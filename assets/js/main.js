// =========================
// BLOQUE UI GENERAL (tema, menú, hero, protección imágenes)
// =========================

(function () {
  const root = document.documentElement;
  const toggleTheme = document.querySelector('[data-theme-toggle]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobilePanel = document.querySelector('[data-mobile-panel]');

  // =========================
  // SETTINGS DESDE SANITY PARA TODO EL SITIO
  // =========================

  let SITE_SETTINGS = null;

  async function loadSiteSettings() {
    if (SITE_SETTINGS) return SITE_SETTINGS;

    const projectId = 'qq8wzii5';
    const dataset = 'production';
    const query = `*[_type == "siteSettings"][0]{
      siteTitle,
      siteTagline,
      siteDescription,
      heroMode,
      heroTitle,
      heroDescription,
      "heroVideoUrl": heroVideo.asset->url,
      worksSectionEyebrow,
      worksSectionTitle,
      worksSectionIntro,
      seriesSectionEyebrow,
      seriesSectionTitle,
      seriesSectionIntro,
      journalSectionEyebrow,
      journalSectionTitle,
      journalSectionIntro,
      artistEyebrow,
      artistTitle,
      artistDescription,
      artistQuote,
      artistImageAlt,
      contactEyebrow,
      contactTitle,
      contactDescription,
      contactEmailPlaceholder,
      contactButtonText,
      footerText,
      contactEmail,
      instagram,
      tiktok
    }`;

    const url = `https://${projectId}.api.sanity.io/v2021-10-21/data/query/${dataset}?query=${encodeURIComponent(
      query
    )}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('No se pudo cargar siteSettings desde Sanity');
      const data = await res.json();
      SITE_SETTINGS = data.result || {};
    } catch (e) {
      console.warn('No se pudieron cargar los ajustes del sitio desde Sanity:', e);
      SITE_SETTINGS = {};
    }
    return SITE_SETTINGS;
  }

  async function loadGlobalTexts() {
    const settings = await loadSiteSettings();

    // Hero textos
    const heroTitle = document.querySelector('[data-site-title]');
    const heroTagline = document.querySelector('[data-site-tagline]');
    const heroDescription = document.querySelector('[data-site-description]');
    if (heroTitle && settings.heroTitle) heroTitle.textContent = settings.heroTitle;
    if (heroTagline && settings.siteTagline) heroTagline.textContent = settings.siteTagline;
    if (heroDescription && settings.heroDescription) heroDescription.textContent = settings.heroDescription;

    // Sección Obras
    const worksEyebrow = document.querySelector('[data-home-works-eyebrow]');
    const worksTitle = document.querySelector('[data-home-works-title]');
    const worksIntro = document.querySelector('[data-home-works-intro]');
    if (worksEyebrow && settings.worksSectionEyebrow) worksEyebrow.textContent = settings.worksSectionEyebrow;
    if (worksTitle && settings.worksSectionTitle) worksTitle.textContent = settings.worksSectionTitle;
    if (worksIntro && settings.worksSectionIntro) worksIntro.textContent = settings.worksSectionIntro;

    // Sección Series
    const seriesEyebrow = document.querySelector('[data-home-series-eyebrow]');
    const seriesTitle = document.querySelector('[data-home-series-title]');
    const seriesIntro = document.querySelector('[data-home-series-intro]');
    if (seriesEyebrow && settings.seriesSectionEyebrow) seriesEyebrow.textContent = settings.seriesSectionEyebrow;
    if (seriesTitle && settings.seriesSectionTitle) seriesTitle.textContent = settings.seriesSectionTitle;
    if (seriesIntro && settings.seriesSectionIntro) seriesIntro.textContent = settings.seriesSectionIntro;

    // Sección Journal
    const journalEyebrow = document.querySelector('[data-home-journal-eyebrow]');
    const journalTitle = document.querySelector('[data-home-journal-title]');
    const journalIntro = document.querySelector('[data-home-journal-intro]');
    if (journalEyebrow && settings.journalSectionEyebrow) journalEyebrow.textContent = settings.journalSectionEyebrow;
    if (journalTitle && settings.journalSectionTitle) journalTitle.textContent = settings.journalSectionTitle;
    if (journalIntro && settings.journalSectionIntro) journalIntro.textContent = settings.journalSectionIntro;

    // Sección Artista
    const artistEyebrow = document.querySelector('[data-i18n="artist.eyebrow"]');
    const artistTitle = document.querySelector('[data-i18n="artist.title"]');
    const artistDescription = document.querySelector('[data-i18n="artist.description1"]');
    const artistQuote = document.querySelector('[data-i18n="artist.quote"]');
    const artistImageAlt = document.querySelector('[data-i18n-alt="artist.image_alt"]');
    if (artistEyebrow && settings.artistEyebrow) artistEyebrow.textContent = settings.artistEyebrow;
    if (artistTitle && settings.artistTitle) artistTitle.textContent = settings.artistTitle;
    if (artistDescription && settings.artistDescription) artistDescription.textContent = settings.artistDescription;
    if (artistQuote && settings.artistQuote) artistQuote.textContent = settings.artistQuote;
    if (artistImageAlt && settings.artistImageAlt) artistImageAlt.setAttribute('alt', settings.artistImageAlt);

    // Sección Contacto
    const contactEyebrow = document.querySelector('[data-i18n="contact.eyebrow"]');
    const contactTitle = document.querySelector('[data-i18n="contact.title"]');
    const contactDescription = document.querySelector('[data-i18n="contact.description"]');
    const contactPlaceholder = document.querySelector('[data-i18n-placeholder="contact.email_placeholder"]');
    const contactButton = document.querySelector('[data-i18n="contact.submit"]');
    if (contactEyebrow && settings.contactEyebrow) contactEyebrow.textContent = settings.contactEyebrow;
    if (contactTitle && settings.contactTitle) contactTitle.textContent = settings.contactTitle;
    if (contactDescription && settings.contactDescription) contactDescription.textContent = settings.contactDescription;
    if (contactPlaceholder && settings.contactEmailPlaceholder) contactPlaceholder.setAttribute('placeholder', settings.contactEmailPlaceholder);
    if (contactButton && settings.contactButtonText) contactButton.textContent = settings.contactButtonText;

    // Footer (solo texto principal, el crédito NO es editable)
    const footerText = document.querySelector('[data-footer-text]');
    const contactEmailEl = document.querySelector('[data-contact-email]');
    if (footerText && settings.footerText) footerText.textContent = settings.footerText;
    if (contactEmailEl && settings.contactEmail) contactEmailEl.textContent = settings.contactEmail;

    // Redes sociales
    const instagramLink = document.querySelector('.footer-social a[href*="instagram"]');
    const tiktokLink = document.querySelector('.footer-social a[href*="tiktok"]');
    if (instagramLink && settings.instagram) instagramLink.href = settings.instagram;
    if (tiktokLink && settings.tiktok) tiktokLink.href = settings.tiktok;

    // Meta tags SEO
    if (settings.siteDescription) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) metaDescription.setAttribute('content', settings.siteDescription);
    }
    if (settings.siteTitle) {
      document.title = settings.siteTitle;
    }
  }

  async function initHero() {
    const heroBand = document.querySelector('.hero-band');
    if (!heroBand) return;

    const settings = await loadSiteSettings();

    const mode = settings.heroMode === 'video' ? 'video' : 'image';
    const videoUrl = settings.heroVideoUrl || '';

    heroBand.setAttribute(
      'data-hero-type',
      mode === 'video' && videoUrl ? 'video' : 'image'
    );

    // --- VIDEO DESDE SANITY ---
    if (mode === 'video' && videoUrl) {
      const videoEl = heroBand.querySelector('[data-hero-video]');
      const sourceEl = videoEl ? videoEl.querySelector('source') : null;

      if (videoEl && sourceEl) {
        sourceEl.setAttribute('src', videoUrl);
        videoEl.load();
      }
    }
  }

  // =========================
  // TEMA: claro por defecto con preferencia guardada
  // =========================

  const saved = localStorage.getItem('theme');
  const initial =
    saved === 'dark' || saved === 'light'
      ? saved
      : 'light';
  root.setAttribute('data-theme', initial);

  if (toggleTheme) {
    toggleTheme.addEventListener('click', function () {
      const current =
        root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // =========================
  // HAMBURGUESA: abre/cierra panel móvil
  // =========================

  if (menuToggle && mobilePanel) {
    menuToggle.addEventListener('click', function () {
      const isOpen = mobilePanel.classList.contains('open');
      mobilePanel.classList.toggle('open', !isOpen);
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  // =========================
  // FORMULARIO (home)
  // =========================

  const form = document.querySelector('.newsletter-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Formulario listo para conectar con CMS o email marketing.');
    });
  }

  // =========================
  // BOTÓN "Ver colección" en el header (inyectar si falta)
  // =========================

  const headerActions = document.querySelector('.header-actions');
  const headerCta = document.querySelector('.header-actions .btn-collection');
  if (headerActions && !headerCta) {
    const cta = document.createElement('a');
    cta.href = '#works';
    cta.className = 'btn btn-primary btn-collection';
    cta.textContent = 'Ver colección';
    headerActions.prepend(cta);
  }

  // =========================
  // SISTEMA DE IDIOMAS (i18n)
  // =========================

  let TRANSLATIONS = {};
  let CURRENT_LANG = localStorage.getItem('lang') || 'es';

  async function loadTranslations() {
    if (Object.keys(TRANSLATIONS).length) return TRANSLATIONS;

    const query = `*[_type == "translation"]{
      key,
      es,
      en,
      de
    }`;

    const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      TRANSLATIONS = {};
      (data.result || []).forEach(t => {
        TRANSLATIONS[t.key] = { 
          es: t.es, 
          en: t.en, 
          de: t.de 
        };
      });
      console.log('Traducciones cargadas:', TRANSLATIONS);
    } catch (e) {
      console.warn('Error cargando traducciones:', e);
    }
    return TRANSLATIONS;
  }

  function t(key) {
    const translation = TRANSLATIONS[key];
    if (!translation) return key;
    // Soporte para es, en, de
    if (CURRENT_LANG === 'de' && translation.de) return translation.de;
    if (CURRENT_LANG === 'en' && translation.en) return translation.en;
    return translation.es || key;
  }

  async function applyTranslations() {
    await loadTranslations();

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translated = t(key);
      if (translated && translated !== key) el.textContent = translated;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translated = t(key);
      if (translated && translated !== key) el.setAttribute('placeholder', translated);
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      const key = el.getAttribute('data-i18n-alt');
      const translated = t(key);
      if (translated && translated !== key) el.setAttribute('alt', translated);
    });
  }

  function setLanguage(lang) {
    CURRENT_LANG = lang;
    localStorage.setItem('lang', lang);
    applyTranslations();

    document.querySelectorAll('.lang-btn').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      btn.classList.toggle('active', btnLang === lang);
    });
  }

  // =========================
  // SELECTOR DE IDIOMA
  // =========================

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang') || 'es';
      setLanguage(lang);
    });
  });

  // =========================
  // INIT HERO + TEXTOS + IDIOMAS + PROTECCIÓN DE IMÁGENES
  // =========================

  document.addEventListener('DOMContentLoaded', async () => {
    // Cargar textos globales desde Sanity
    await loadGlobalTexts();
    
    // Hero desde settings
    await initHero();

    // Aplicar traducciones
    await applyTranslations();

    // Bloquear menú contextual solo sobre <img>
    document.addEventListener('contextmenu', (event) => {
      const target = event.target;
      if (target && target.tagName === 'IMG') {
        event.preventDefault();
      }
    });

    // Evitar arrastrar imágenes
    document.querySelectorAll('img').forEach((img) => {
      img.setAttribute('draggable', 'false');
      img.addEventListener('dragstart', (event) => {
        event.preventDefault();
      });
    });
  });
})();

// =========================
// Carga de datos desde Sanity (en vez de JSON local)
// =========================

let WORKS = [];
let SERIES = [];
let JOURNAL = [];

const SANITY_PROJECT_ID = 'qq8wzii5';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2021-10-21';

function buildSanityUrl(groqQuery) {
  return `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodeURIComponent(
    groqQuery
  )}`;
}

async function loadWorks() {
  if (WORKS.length) return WORKS;

  const query = `*[_type == "work"] | order(year desc){
    title,
    "slug": slug.current,
    year,
    medium,
    size,
    status,
    excerpt,
    description,
    "image": image.asset->url,
    featuredOnHome
  }`;

  try {
    const res = await fetch(buildSanityUrl(query));
    if (!res.ok) throw new Error('Error al cargar obras desde Sanity');
    const data = await res.json();
    WORKS = data.result || [];
  } catch (e) {
    console.warn('No se pudieron cargar las obras desde Sanity:', e);
    WORKS = [];
  }

  return WORKS;
}

async function loadSeries() {
  if (SERIES.length) return SERIES;

  const query = `*[_type == "series"] | order(orderRank asc){
    title,
    subtitle,
    description,
    period,
    notes,
    "slug": slug.current,
    "image": image.asset->url,
    featuredOnHome
  }`;

  try {
    const res = await fetch(buildSanityUrl(query));
    if (!res.ok) throw new Error('Error al cargar series desde Sanity');
    const data = await res.json();
    SERIES = data.result || [];
  } catch (e) {
    console.warn('No se pudieron cargar las series desde Sanity:', e);
    SERIES = [];
  }

  return SERIES;
}

async function loadJournal() {
  if (JOURNAL.length) return JOURNAL;

  const query = `*[_type == "journalEntry"] | order(date desc){
    title,
    excerpt,
    category,
    date,
    "slug": slug.current,
    contentHtml,
    featuredOnHome
  }`;

  try {
    const res = await fetch(buildSanityUrl(query));
    if (!res.ok) throw new Error('Error al cargar journal desde Sanity');
    const data = await res.json();
    JOURNAL = data.result || [];
  } catch (e) {
    console.warn('No se pudieron cargar los textos de journal desde Sanity:', e);
    JOURNAL = [];
  }

  return JOURNAL;
}

// =========================
// Listados según la ruta actual
// =========================

(async function renderListsByPath() {
  const path = window.location.pathname;

  // -------------------------
  // HOME: destacados de obras, series y journal
  // -------------------------
  if (path.endsWith('/') || path.endsWith('/index.html')) {
    // Obras destacadas
    const homeWorksGrid = document.querySelector('[data-home-works-grid]');
    if (homeWorksGrid) {
      const works = await loadWorks();
      const featuredWorks = works.filter((w) => w.featuredOnHome).slice(0, 3);

      homeWorksGrid.innerHTML = featuredWorks
        .map((work) => {
          const detailUrl = `obras/obra.html?slug=${encodeURIComponent(work.slug)}`;

          const statusLabel =
            work.status === 'vendida'
              ? 'Vendida'
              : work.status === 'reservada'
              ? 'Reservada'
              : 'Disponible';

          const statusMeta =
            work.status === 'vendida'
              ? 'Obra vendida'
              : work.status === 'reservada'
              ? 'Obra reservada'
              : 'Consulta disponible';

          return `
            <article class="card">
              <div class="framed-media">
                <div class="frame-inner">
                  <a href="${detailUrl}">
                    <img src="${work.image}" alt="Obra ${work.title} de Breidy Cobo" />
                  </a>
                </div>
              </div>
              <div class="card-body">
                <div class="kicker">${statusLabel}</div>
                <h3><a href="${detailUrl}">${work.title}</a></h3>
                <p>${work.excerpt || ''}</p>
                <div class="meta">
                  <span>${work.medium || ''}</span>
                  <span>${work.year || ''}</span>
                  <span>${statusMeta}</span>
                </div>
              </div>
            </article>
          `;
        })
        .join('');
    }

    // Series destacadas
    const homeSeriesGrid = document.querySelector('[data-home-series-grid]');
    if (homeSeriesGrid) {
      const seriesList = await loadSeries();
      const featuredSeries = seriesList.filter((s) => s.featuredOnHome).slice(0, 3);

      homeSeriesGrid.innerHTML = featuredSeries
        .map((series) => {
          const detailUrl = `series/serie.html?slug=${encodeURIComponent(series.slug)}`;

          return `
            <article class="card">
              <div class="framed-media">
                <div class="frame-inner">
                  <a href="${detailUrl}">
                    <img src="${
                      series.image || 'assets/img/placeholder-serie.jpg'
                    }" alt="Serie ${series.title}" />
                  </a>
                </div>
              </div>
              <div class="card-body">
                <div class="kicker">Serie</div>
                <h3><a href="${detailUrl}">${series.title}</a></h3>
                <p>${series.description || ''}</p>
              </div>
            </article>
          `;
        })
        .join('');
    }

    // Journal destacado
    const homeJournalGrid = document.querySelector('[data-home-journal-grid]');
    if (homeJournalGrid) {
      const entries = await loadJournal();
      const featuredEntries = entries.filter((e) => e.featuredOnHome).slice(0, 3);

      homeJournalGrid.innerHTML = featuredEntries
        .map((entry) => {
          const detailUrl = `journal/texto.html?slug=${encodeURIComponent(entry.slug)}`;

          return `
            <article class="journal-card">
              <header class="journal-card-header">
                <p class="journal-card-meta">
                  <span class="journal-card-date">${entry.date || ''}</span>
                  <span class="journal-card-separator">·</span>
                  <span class="journal-card-category">${entry.category || ''}</span>
                </p>
                <h3 class="journal-card-title">
                  <a href="${detailUrl}">${entry.title}</a>
                </h3>
              </header>
              <p class="journal-card-excerpt">
                ${entry.excerpt || ''}
              </p>
            </article>
          `;
        })
        .join('');
    }
  }

  // -------------------------
  // Listado de obras en /obras/
  // -------------------------
  if (path.endsWith('/obras/') || path.endsWith('/obras/index.html')) {
    const list = document.getElementById('works-list');
    if (list) {
      const works = await loadWorks();

      list.innerHTML = works
        .map((work) => {
          const detailUrl = `obra.html?slug=${encodeURIComponent(work.slug)}`;

          const statusLabel =
            work.status === 'vendida'
              ? 'Vendida'
              : work.status === 'reservada'
              ? 'Reservada'
              : 'Disponible';

          const statusMeta =
            work.status === 'vendida'
              ? 'Obra vendida'
              : work.status === 'reservada'
              ? 'Obra reservada'
              : 'Consulta disponible';

          return `
          <article class="card">
            <div class="framed-media">
              <div class="frame-inner">
                <a href="${detailUrl}">
                  <img src="${work.image}" alt="Obra ${work.title} de Breidy Cobo" />
                </a>
              </div>
            </div>
            <div class="card-body">
              <div class="kicker">${statusLabel}</div>
              <h3><a href="${detailUrl}">${work.title}</a></h3>
              <p>${work.excerpt}</p>
              <div class="meta">
                <span>${work.medium}</span>
                <span>${work.year}</span>
                <span>${statusMeta}</span>
              </div>
            </div>
          </article>
        `;
        })
        .join('');
    }
  }

  // -------------------------
  // Listado de series en /series/
  // -------------------------
  if (path.endsWith('/series/') || path.endsWith('/series/index.html')) {
    const seriesGrid = document.querySelector('.series-grid');
    if (seriesGrid) {
      const seriesList = await loadSeries();

      seriesGrid.innerHTML = seriesList
        .map((series) => {
          const detailUrl = `serie.html?slug=${encodeURIComponent(series.slug)}`;

          return `
          <article class="card">
            <div class="framed-media">
              <div class="frame-inner">
                <img src="${series.image || '../assets/img/placeholder-serie.jpg'}" alt="Serie ${series.title}" />
              </div>
            </div>
            <div class="card-body">
              <div class="kicker">Serie</div>
              <h2>${series.title}</h2>
              <p>${series.description}</p>
              <div class="meta">
                <span>${series.subtitle}</span>
                <span>${series.period}</span>
              </div>
              <div class="work-card-actions">
                <a href="${detailUrl}" class="btn btn-ghost">
                  Ver serie
                </a>
              </div>
            </div>
          </article>
        `;
        })
        .join('');
    }
  }

  // -------------------------
  // Listado de textos en /journal/
  // -------------------------
  if (path.endsWith('/journal/') || path.endsWith('/journal/index.html')) {
    const journalGrid = document.getElementById('journal-list');
    if (journalGrid) {
      const entries = await loadJournal();

      journalGrid.innerHTML = entries
        .map((entry) => {
          const detailUrl = `texto.html?slug=${encodeURIComponent(entry.slug)}`;

          return `
          <article class="journal-card">
            <header class="journal-card-header">
              <p class="journal-card-meta">
                <span class="journal-card-date">${entry.date}</span>
                <span class="journal-card-separator">·</span>
                <span class="journal-card-category">${entry.category}</span>
              </p>
              <h2 class="journal-card-title">
                <a href="${detailUrl}">${entry.title}</a>
              </h2>
            </header>
            <p class="journal-card-excerpt">
              ${entry.excerpt}
            </p>
            <p class="journal-card-link">
              <a href="${detailUrl}">Leer texto completo</a>
            </p>
          </article>
        `;
        })
        .join('');
    }
  }
})();

// =========================
// Detalle de obra: /obras/obra.html?slug=...
// =========================

(async function renderWorkDetail() {
  const path = window.location.pathname;

  if (!path.endsWith('/obras/obra.html')) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  if (!slug) return;

  const works = await loadWorks();
  const work = works.find((w) => w.slug === slug);
  if (!work) return;

  const titleEl = document.getElementById('work-title');
  const imageEl = document.getElementById('work-image');
  const yearEl = document.getElementById('work-year');
  const sizeEl = document.getElementById('work-size');
  const mediumEl = document.getElementById('work-medium');
  const statusEl = document.getElementById('work-status');
  const descriptionEl = document.getElementById('work-description');

  if (titleEl) titleEl.textContent = work.title;
  if (yearEl) yearEl.textContent = work.year;
  if (sizeEl) sizeEl.textContent = work.size;
  if (mediumEl) mediumEl.textContent = work.medium;
  if (statusEl) statusEl.textContent = work.status;
  if (descriptionEl) descriptionEl.textContent = work.description;

  if (imageEl) {
    imageEl.src = work.image;
    imageEl.alt = work.title;
  }

  document.title = `${work.title} — Breidy Cobo`;
})();

// =========================
// Detalle de serie: /series/serie.html?slug=...
// =========================

(async function renderSeriesDetail() {
  const path = window.location.pathname;

  if (!path.endsWith('/series/serie.html')) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  if (!slug) return;

  const seriesList = await loadSeries();
  const series = seriesList.find((s) => s.slug === slug);
  if (!series) return;

  const titleEl = document.getElementById('series-title');
  const subtitleEl = document.getElementById('series-subtitle');
  const descriptionEl = document.getElementById('series-description');
  const periodEl = document.getElementById('series-period');
  const notesEl = document.getElementById('series-notes');
  const worksListEl = document.getElementById('series-works-list');

  if (titleEl) titleEl.textContent = series.title;
  if (subtitleEl) subtitleEl.textContent = series.subtitle;
  if (descriptionEl) descriptionEl.textContent = series.description;
  if (periodEl) periodEl.textContent = series.period;
  if (notesEl) notesEl.textContent = series.notes;

  document.title = `${series.title} — Breidy Cobo`;

  // Futuro: mostrar obras de esta serie si el JSON trae relación.
  // if (worksListEl) { ... }
})();

// =========================
// Detalle de texto: /journal/texto.html?slug=...
// =========================

(async function renderJournalDetail() {
  const path = window.location.pathname;

  if (!path.endsWith('/journal/texto.html')) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  if (!slug) return;

  const journal = await loadJournal();
  const entry = journal.find((item) => item.slug === slug);
  if (!entry) return;

  const titleEl = document.getElementById('journal-title');
  const dateEl = document.getElementById('journal-date');
  const categoryEl = document.getElementById('journal-category');
  const contentEl = document.getElementById('journal-content');

  if (titleEl) titleEl.textContent = entry.title;
  if (dateEl) dateEl.textContent = entry.date;
  if (categoryEl) categoryEl.textContent = entry.category;
  if (contentEl) contentEl.innerHTML = entry.contentHtml;

  document.title = `${entry.title} — Breidy Cobo`;
})();