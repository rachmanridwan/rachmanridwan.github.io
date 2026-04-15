// ─── JS Active Flag ──────────────────────────────────────────
// Must run first — enables reveal animations in CSS.
// If JS crashes before this, content stays fully visible.
document.body.classList.add('js-ready');

// ─── Hamburger Menu ──────────────────────────────────────────
function toggleMenu() {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  menu.classList.toggle('open');
  icon.classList.toggle('open');
}

// ─── Scroll Reveal ────────────────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.05 }
);

// ─── Project Data ─────────────────────────────────────────────
const projects = [
  {
    title: 'Credit Monitoring App',
    client: 'PT. Bank Tabungan Negara',
    year: '2025',
    category: 'Full-stack',
    description:
      'Automated full-stack credit monitoring application replacing manual Excel workflows, delivering a 99% reduction in executive reporting time (60 min → <1 min). Enables real-time division-level visibility for management across 80+ branches and 9 regional offices.',
    tech: ['Python', 'SQL', 'JavaScript', 'REST API'],
    image: './assets/project-1.png',
    duration: '3 Months',
    teamSize: '2 Members',
    metrics: [
      { label: 'Time Saved', value: '99%' },
      { label: 'Branches', value: '80+' },
      { label: 'Records', value: '130K+' },
    ],
    url: null,
  },
  {
    title: 'Network Infrastructure Platform',
    client: 'PT. Telekomunikasi Indonesia',
    year: '2024',
    category: 'Full-stack',
    description:
      'Delivered 96% application performance improvement on a network infrastructure platform managing 10,000+ records across 13 regional offices in East Java. Resolved a systemic bottleneck through query optimization and caching refactoring, and built a real-time monitoring dashboard with Excel export.',
    tech: ['PHP', 'JavaScript', 'SQL', 'REST API'],
    image: './assets/project-2.png',
    duration: '4 Months',
    teamSize: '3 Members',
    metrics: [
      { label: 'Performance', value: '+96%' },
      { label: 'Records', value: '10K+' },
      { label: 'Offices', value: '13' },
    ],
    url: null,
  },
  {
    title: 'Bookstore E-Commerce',
    client: 'SME Client — Jexa IT Consulting',
    year: '2025',
    category: 'Web App',
    description:
      'Full-stack e-commerce platform for book retail with product catalog, cart management, order processing, inventory management, and an admin dashboard. End-to-end delivery from requirements scoping through UAT and deployment.',
    tech: ['PHP', 'JavaScript', 'SQL', 'Next.js'],
    image: './assets/project-3.png',
    duration: '3 Months',
    teamSize: '3 Members',
    metrics: [
      { label: 'Products', value: '500+' },
      { label: 'Uptime', value: '99%' },
      { label: 'Sales', value: '+45%' },
    ],
    url: null,
  },
  {
    title: 'ERP System',
    client: 'SME Client — Jexa IT Consulting',
    year: '2025',
    category: 'Full-stack',
    description:
      'Enterprise resource planning system for SME operations covering inventory management, procurement, HR modules, and financial reporting. Designed from scratch to fit the client's operational model and growth trajectory.',
    tech: ['PHP', 'SQL', 'JavaScript'],
    image: './assets/project-1.png',
    duration: '24 Weeks',
    teamSize: '3 Members',
    metrics: [
      { label: 'Modules', value: '5+' },
      { label: 'Users', value: '50+' },
    ],
    url: null,
  },
  {
    title: 'Habit Tracker App',
    client: 'Personal Project',
    year: '2024',
    category: 'Personal',
    description:
      'A productivity application for tracking daily habits and building consistency, featuring streak tracking, progress visualization, and habit analytics. Built as a personal project to explore full-stack app development.',
    tech: ['Python', 'JavaScript'],
    image: './assets/project-2.png',
    duration: '1 Month',
    teamSize: 'Solo',
    metrics: [],
    url: null,
  },
  {
    title: 'SingerHub',
    client: 'Bangkit Academy Capstone',
    year: '2023',
    category: 'Personal',
    description:
      'RESTful API backend for a platform connecting singers with gig owners. Supports user authentication (Register, Login, Logout) and user profile management. Deployed on Google Cloud Platform as part of the Bangkit Academy 2023 capstone project.',
    tech: ['Python', 'GCP', 'REST API', 'SQL'],
    image: './assets/project-3.png',
    duration: '2 Months',
    teamSize: '3 Members',
    metrics: [
      { label: 'Endpoints', value: '15+' },
      { label: 'Cloud', value: 'GCP' },
    ],
    url: null,
  },
];

// ─── Render Cards ─────────────────────────────────────────────
function renderProjects(filter) {
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = '';

  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  visible.forEach((project, idx) => {
    const card = document.createElement('div');
    card.className = 'project-card reveal';
    card.dataset.category = project.category;
    card.innerHTML = `
      <div class="project-card-image">
        <span class="project-category-badge">${project.category}</span>
        <img src="${project.image}" alt="${project.title}" class="project-img">
      </div>
      <div class="project-info">
        <div class="project-meta">
          <span>${project.client}</span>
          <span>${project.year}</span>
        </div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <button class="btn btn-color-1 project-view-btn">
          Quick View &nbsp;&rarr;
        </button>
      </div>
    `;
    card.querySelector('.project-view-btn').addEventListener('click', () => openModal(project));
    grid.appendChild(card);

    // trigger reveal observer on new cards
    revealObserver.observe(card);
  });
}

// ─── Category Filter ──────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(btn.dataset.filter);
  });
});

// ─── Modal Logic ──────────────────────────────────────────────
const modalOverlay = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');

function openModal(project) {
  document.getElementById('modal-img').src = project.image;
  document.getElementById('modal-img').alt = project.title;
  document.getElementById('modal-badge').textContent = project.category;
  document.getElementById('modal-meta').textContent =
    `${project.category} · ${project.client} · ${project.year}`;
  document.getElementById('modal-title').textContent = project.title;
  document.getElementById('modal-desc').textContent = project.description;

  // Tech tags
  const techEl = document.getElementById('modal-tech');
  techEl.innerHTML = project.tech
    .map((t) => `<span class="modal-tech-tag">${t}</span>`)
    .join('');

  // Stats
  const statsEl = document.getElementById('modal-stats');
  const metaStats = [];
  if (project.duration) metaStats.push({ label: 'Duration', value: project.duration });
  if (project.teamSize) metaStats.push({ label: 'Team', value: project.teamSize });
  const allStats = [...metaStats, ...project.metrics];

  if (allStats.length > 0) {
    statsEl.style.display = 'flex';
    statsEl.innerHTML = allStats
      .map(
        (s) => `
        <div class="modal-stat">
          <span class="modal-stat-value">${s.value}</span>
          <span class="modal-stat-label">${s.label}</span>
        </div>`
      )
      .join('');
  } else {
    statsEl.style.display = 'none';
  }

  // Visit link
  const linkEl = document.getElementById('modal-link');
  if (project.url) {
    linkEl.href = project.url;
    linkEl.classList.add('visible');
  } else {
    linkEl.classList.remove('visible');
  }

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ─── Init ─────────────────────────────────────────────────────
// Project cards get reveal animation (JS-generated, always safe).
// Static section content (skills, experience) is always visible — no reveal needed.
renderProjects('All');
