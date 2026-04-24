/* ─── Utilities ─────────────────────────────────────────── */
function createCard(article) {
  return `
    <article class="card">
      <div class="card__color-bar"></div>
      <div class="card__body">
        <span class="card__topic">${article.topic}</span>
        <h3 class="card__title">${article.title}</h3>
        <p class="card__excerpt">${article.excerpt}</p>
        <div class="card__footer">
          <span>${article.date}</span>
          <span>${article.readTime}</span>
          <a href="article.html?id=${article.id}" class="card__read-link">Read &rarr;</a>
        </div>
      </div>
    </article>
  `;
}

/* ─── Navigation ────────────────────────────────────────── */
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('open');
}

/* ─── Footer Year ───────────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ─── Daily Quote ───────────────────────────────────────── */
const quoteEl = document.getElementById('dailyQuote');
if (quoteEl && typeof DAILY_QUOTES !== 'undefined') {
  const dayIndex = new Date().getDate() % DAILY_QUOTES.length;
  const q = DAILY_QUOTES[dayIndex];
  quoteEl.querySelector('.quote-band__text').textContent = q.text;
  quoteEl.querySelector('.quote-band__author').textContent = `— ${q.author}`;
}

/* ─── Homepage: Featured Articles ───────────────────────── */
const featuredGrid = document.getElementById('featuredGrid');
if (featuredGrid && typeof ARTICLES !== 'undefined') {
  const featured = ARTICLES.filter(a => a.featured).slice(0, 3);
  featuredGrid.innerHTML = featured.map(createCard).join('');
}

/* ─── Articles Page ─────────────────────────────────────── */
let activeTopicFilter = 'all';

const articlesGrid = document.getElementById('articlesGrid');
if (articlesGrid && typeof ARTICLES !== 'undefined') {
  const urlTopic = new URLSearchParams(window.location.search).get('topic');
  if (urlTopic) {
    activeTopicFilter = urlTopic;
    const btn = document.querySelector(`[data-topic="${urlTopic}"]`);
    if (btn) {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('filter-btn--active'));
      btn.classList.add('filter-btn--active');
    }
  }
  renderArticles();
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('filter-btn--active'));
    btn.classList.add('filter-btn--active');
    activeTopicFilter = btn.dataset.topic;
    renderArticles();
  });
});

function filterArticles() {
  renderArticles();
}

function renderArticles() {
  const grid = document.getElementById('articlesGrid');
  const noResults = document.getElementById('noResults');
  if (!grid) return;

  const query = (document.getElementById('searchInput')?.value || '').toLowerCase();

  const filtered = ARTICLES.filter(a => {
    const matchesTopic = activeTopicFilter === 'all' || a.topic === activeTopicFilter;
    const matchesSearch = !query ||
      a.title.toLowerCase().includes(query) ||
      a.excerpt.toLowerCase().includes(query) ||
      a.topic.toLowerCase().includes(query);
    return matchesTopic && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (noResults) noResults.hidden = false;
  } else {
    if (noResults) noResults.hidden = true;
    grid.innerHTML = filtered.map(createCard).join('');
  }
}

/* ─── Article Detail Page ───────────────────────────────── */
const articlePage = document.getElementById('articlePage');
if (articlePage && typeof ARTICLES !== 'undefined') {
  const id = new URLSearchParams(window.location.search).get('id');
  const article = ARTICLES.find(a => a.id === id);

  if (!article) {
    articlePage.innerHTML = `
      <div class="container">
        <p class="article-loading">Article not found. <a href="articles.html">Browse all articles &rarr;</a></p>
      </div>`;
  } else {
    document.title = `${article.title} — High Determination`;
    articlePage.innerHTML = `
      <div class="container">
        <a href="articles.html" class="article-back">&larr; All Articles</a>
        <header class="article-header">
          <span class="article-topic">${article.topic}</span>
          <h1 class="article-title">${article.title}</h1>
          <div class="article-meta">
            <span>${article.date}</span>
            <span>${article.readTime}</span>
          </div>
        </header>
        <div class="article-body">${article.body}</div>
      </div>`;

    const relatedSection = document.getElementById('relatedSection');
    const relatedGrid = document.getElementById('relatedGrid');
    if (relatedSection && relatedGrid) {
      const related = ARTICLES.filter(a => a.id !== article.id && a.topic === article.topic).slice(0, 3);
      if (related.length > 0) {
        relatedGrid.innerHTML = related.map(createCard).join('');
        relatedSection.hidden = false;
      }
    }
  }
}

/* ─── Newsletter ────────────────────────────────────────── */
function handleSubscribe(e) {
  e.preventDefault();
  const msg = document.getElementById('subscribeMsg');
  if (msg) {
    msg.hidden = false;
    e.target.reset();
  }
}
