'use strict';

const PLACEHOLDER = 'images/placeholder.svg';
const lang = new URLSearchParams(window.location.search).get('lang') || 'tr';

// RTL ve dil ayarları
if (lang === 'ar') {
  document.documentElement.dir = 'rtl';
  document.documentElement.lang = 'ar';
} else {
  document.documentElement.lang = lang;
}

async function loadData() {
  const res = await fetch('data/menu-data.json');
  if (!res.ok) throw new Error('Veri yüklenemedi');
  return res.json();
}

function getName(item) {
  if (lang === 'ar' && item.name_ar) return item.name_ar;
  if (lang === 'en' && item.name_en) return item.name_en;
  return item.name_tr;
}

function getSecondaryName(item) {
  if (lang === 'ar') return item.name_tr;
  if (lang === 'en') return null;
  return item.name_en;
}

function getCatName(cat) {
  if (lang === 'ar' && cat.name_ar) return cat.name_ar;
  if (lang === 'en' && cat.name_en) return cat.name_en;
  return cat.name_tr;
}

function getSubName(sub) {
  if (lang === 'ar' && sub.name_ar) return sub.name_ar;
  if (lang === 'en' && sub.name_en) return sub.name_en;
  return sub.name_tr;
}

const PRICE_ASK = {
  tr: 'Fiyat için personele danışınız',
  en: 'Please ask for price',
  ar: 'يُرجى السؤال عن السعر'
};

const KG_LABEL = { tr: '/ kg', en: '/ kg', ar: '/ كجم' };

function formatPrice(item) {
  if (item.price === null) {
    return `<span class="price-ask">${PRICE_ASK[lang]}</span>`;
  }
  const formatted = item.price.toLocaleString('tr-TR');
  if (item.unit === 'kg') {
    return `<span class="item-price">${formatted} ₺ <span class="price-unit">${KG_LABEL[lang]}</span></span>`;
  }
  return `<span class="item-price">${formatted} ₺</span>`;
}

function buildItemCard(item) {
  const name    = getName(item);
  const secondary = getSecondaryName(item);
  const imgSrc  = item.image || PLACEHOLDER;
  return `
    <div class="item-card">
      <div class="item-image-wrap">
        <img class="item-image" src="${imgSrc}" alt="${name}" loading="lazy"
             onerror="this.src='${PLACEHOLDER}'">
      </div>
      <div class="item-info">
        <div class="item-name-tr">${name}</div>
        ${secondary ? `<div class="item-name-en">${secondary}</div>` : ''}
        ${formatPrice(item)}
      </div>
    </div>`;
}

function buildDrinksHTML(category) {
  let html = '<div class="drinks-container">';
  for (const sub of category.subcategories) {
    html += `<div class="drink-subcategory">
      <div class="drink-subcategory-title">${getSubName(sub)}</div>`;
    for (const item of sub.items) {
      const hasPrice  = item.price !== null;
      const priceText = hasPrice ? item.price.toLocaleString('tr-TR') + ' ₺' : '—';
      const priceClass = hasPrice ? 'drink-price has-price' : 'drink-price';
      html += `
        <div class="drink-item">
          <div class="drink-info">
            <div class="drink-name">${item.name_tr}</div>
            ${item.sizes ? `<div class="drink-size">${item.sizes}</div>` : ''}
          </div>
          <div class="${priceClass}">${priceText}</div>
        </div>`;
    }
    html += '</div>';
  }
  html += '</div>';
  return html;
}

function buildSection(cat) {
  const section = document.createElement('section');
  section.id = 'section-' + cat.id;
  section.className = 'menu-section';

  let inner = `
    <div class="section-header">
      <h2 class="section-title-tr">${getCatName(cat)}</h2>
      <div class="section-divider"></div>
      ${lang !== 'ar' && cat.name_en ? `<p class="section-title-en">${lang === 'tr' ? cat.name_en : cat.name_tr}</p>` : ''}
    </div>`;

  if (cat.type === 'drinks') {
    inner += buildDrinksHTML(cat);
  } else {
    inner += '<div class="items-grid">';
    for (const item of cat.items) inner += buildItemCard(item);
    inner += '</div>';
  }

  section.innerHTML = inner;
  return section;
}

function buildNav(categories) {
  const container = document.getElementById('nav-tabs');
  categories.forEach((cat, i) => {
    const btn = document.createElement('button');
    btn.className = 'nav-tab' + (i === 0 ? ' active' : '');
    btn.dataset.target = cat.id;
    btn.textContent = getCatName(cat);
    btn.addEventListener('click', () => {
      document.getElementById('section-' + cat.id)?.scrollIntoView({ behavior: 'smooth' });
    });
    container.appendChild(btn);
  });
}

function buildLangSwitcher() {
  const sw = document.createElement('div');
  sw.className = 'lang-switcher';
  [
    { code: 'tr', flag: '🇹🇷' },
    { code: 'en', flag: '🇬🇧' },
    { code: 'ar', flag: '🇸🇦' }
  ].forEach(l => {
    const a = document.createElement('a');
    a.href = 'menu.html?lang=' + l.code;
    a.className = 'lang-sw-btn' + (l.code === lang ? ' active' : '');
    a.textContent = l.flag;
    sw.appendChild(a);
  });
  document.getElementById('site-header').appendChild(sw);
}

function setupScrollSpy(categories) {
  const tabs   = document.querySelectorAll('.nav-tab');
  const offset = document.getElementById('site-header').offsetHeight
               + document.getElementById('category-nav').offsetHeight;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id.replace('section-', '');
      tabs.forEach(tab => {
        const active = tab.dataset.target === id;
        tab.classList.toggle('active', active);
      });
      document.querySelector(`.nav-tab[data-target="${id}"]`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  }, {
    rootMargin: `-${offset + 4}px 0px -55% 0px`,
    threshold: 0
  });

  categories.forEach(cat => {
    const el = document.getElementById('section-' + cat.id);
    if (el) observer.observe(el);
  });
}

async function init() {
  try {
    const data = await loadData();
    const content = document.getElementById('menu-content');

    document.getElementById('footer-text').textContent = data.restaurant.copyright;

    buildNav(data.categories);
    buildLangSwitcher();

    const frag = document.createDocumentFragment();
    data.categories.forEach(cat => frag.appendChild(buildSection(cat)));
    content.innerHTML = '';
    content.appendChild(frag);

    setupScrollSpy(data.categories);
  } catch (err) {
    console.error(err);
    document.getElementById('menu-content').innerHTML =
      '<p style="text-align:center;padding:60px 16px;color:#999">Menü yüklenirken hata oluştu.</p>';
  }
}

document.addEventListener('DOMContentLoaded', init);
