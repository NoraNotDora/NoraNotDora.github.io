function applyLinkBadges() {
  const BADGE_SRC = {
    arxiv: 'https://img.shields.io/badge/arXiv-paper-B31B1B?logo=arXiv&logoColor=white&style=flat',
    github: 'https://img.shields.io/badge/GitHub-repo-24292F?logo=github&logoColor=white&style=flat',
    huggingface: 'https://img.shields.io/badge/HuggingFace-dataset-ff7e21?logo=huggingface&logoColor=white&style=flat'
  };
  function toBadge(a, type) {
    const src = BADGE_SRC[type];
    if (!src) return;
    a.classList.add('link-badge');
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener');
    const alt = type === 'huggingface' ? 'Hugging Face' : type.charAt(0).toUpperCase() + type.slice(1);
    const img = document.createElement('img');
    img.setAttribute('src', src);
    img.setAttribute('alt', alt);
    img.setAttribute('loading', 'lazy');
    a.textContent = '';
    a.appendChild(img);
  }
  document.querySelectorAll('.md-typeset a[href]').forEach(function (a) {
    if (a.classList.contains('hero-chip')) return;
    if (a.classList.contains('link-badge')) return;
    const href = a.getAttribute('href') || '';
    const label = a.textContent.trim().toLowerCase();
    if (href.includes('arxiv.org') || label === 'arxiv') { toBadge(a, 'arxiv'); return; }
    if (href.includes('github.com') || label === 'github') { toBadge(a, 'github'); return; }
    if (href.includes('huggingface.co') || label.includes('hugging')) { toBadge(a, 'huggingface'); return; }
  });
}

document.addEventListener('DOMContentLoaded', applyLinkBadges);
if (window.document$ && typeof window.document$.subscribe === 'function') {
  window.document$.subscribe(applyLinkBadges);
}