import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import type { Page, Project, Section } from './types';

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const renderHero = (section: Section): string => {
  const title = escapeHtml(String(section.props.title ?? ''));
  const subtitle = escapeHtml(String(section.props.subtitle ?? ''));
  const ctaLabel = escapeHtml(String(section.props.ctaLabel ?? 'En savoir plus'));
  const href = escapeHtml(String(section.props.href ?? '#'));
  const bg = escapeHtml(String(section.props.background ?? ''));

  return `
    <section class="hero" style="background-image:url('${bg}')" aria-label="Bannière d'accueil">
      <div class="container hero-inner">
        <div class="hero-copy">
          <p class="eyebrow">Restaurant</p>
          <h1>${title}</h1>
          <p>${subtitle}</p>
          <a class="button" href="${href}">${ctaLabel}</a>
        </div>
      </div>
    </section>
  `;
};

const renderText = (section: Section): string => {
  const title = escapeHtml(String(section.props.title ?? ''));
  const text = escapeHtml(String(section.props.text ?? ''));
  const id = escapeHtml(String(section.id ?? 'text-section'));

  return `
    <section class="container" aria-labelledby="${id}">
      <h2 id="${id}">${title}</h2>
      <p>${text}</p>
    </section>
  `;
};

const renderMenu = (section: Section): string => {
  const title = escapeHtml(String(section.props.title ?? 'Notre carte'));
  const items = Array.isArray(section.props.items) ? section.props.items : [];

  const cards = items
    .map((item: any) => {
      const image = item.image ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}">` : '';
      const price = Number(item.price ?? 0).toFixed(2).replace('.', ',');
      return `
        <article class="card">
          ${image}
          <div class="card-body">
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description ?? '')}</p>
            <span class="price">${price} €</span>
          </div>
        </article>
      `;
    })
    .join('');

  return `
    <section class="container" id="menu">
      <h2>${title}</h2>
      <div class="grid cards">${cards}</div>
    </section>
  `;
};

const renderProducts = (section: Section): string => {
  const title = escapeHtml(String(section.props.title ?? 'Nos produits'));
  const items = Array.isArray(section.props.items) ? section.props.items : [];

  const cards = items
    .map((item: any) => {
      const price = Number(item.price ?? 0).toFixed(2).replace('.', ',');
      return `
        <article class="product">
          <img src="${escapeHtml(item.image ?? '')}" alt="${escapeHtml(item.title)}">
          <div class="product-body">
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description ?? '')}</p>
            <div class="product-row">
              <span>${price} €</span>
              <button type="button" class="mini-button" data-add-cart="true" data-product-id="${escapeHtml(item.id ?? '')}" data-product-name="${escapeHtml(item.title)}" data-price="${Number(item.price ?? 0)}">Ajouter</button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  return `
    <section class="container">
      <h2>${title}</h2>
      <div class="grid products">${cards}</div>
    </section>
  `;
};

const renderContact = (section: Section): string => {
  const title = escapeHtml(String(section.props.title ?? 'Contact'));
  const email = escapeHtml(String(section.props.email ?? 'contact@example.com'));

  return `
    <section class="container" id="contact">
      <h2>${title}</h2>
      <form class="contact-form" action="contact_form.php" method="POST">
        <label>
          Nom
          <input name="name" type="text" required />
        </label>
        <label>
          Email
          <input name="email" type="email" required />
        </label>
        <label>
          Message
          <textarea name="message" required></textarea>
        </label>
        <button type="submit" class="button">Envoyer</button>
      </form>
      <p><a href="mailto:${email}">${email}</a></p>
    </section>
  `;
};

const renderSection = (section: Section): string => {
  switch (section.type) {
    case 'hero':
      return renderHero(section);
    case 'text':
      return renderText(section);
    case 'menu':
      return renderMenu(section);
    case 'products':
      return renderProducts(section);
    case 'contact':
      return renderContact(section);
    default:
      return '<section class="container"><p>Section non prise en charge</p></section>';
  }
};

const renderMeta = (page: Page, project: Project): string => {
  const title = `${page.meta.title} — ${project.name}`;
  const description = page.meta.description || project.description || '';
  const ogImage = page.meta.ogImage || project.globals.seoDefaults.defaultOgImage || '';

  return `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:image" content="${escapeHtml(ogImage)}">
    <meta name="robots" content="${escapeHtml(page.meta.robots ?? 'index,follow')}">
  `;
};

export const renderPage = (project: Project, page: Page): string => {
  const body = page.sections.map(renderSection).join('\n');

  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${renderMeta(page, project)}
    <link rel="icon" href="${escapeHtml(project.globals.brand.favicon)}">
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <header class="site-header">
      <div class="container header-inner">
        <img class="logo" src="${escapeHtml(project.globals.brand.logo)}" alt="${escapeHtml(project.name)}">
        <nav aria-label="Navigation principale">
          <a href="/">Accueil</a>
          <a href="#menu">Carte</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>

    <main>
      ${body}
    </main>

    <footer class="site-footer">
      <div class="container">
        <p>© ${new Date().getFullYear()} ${escapeHtml(project.name)}</p>
      </div>
    </footer>

    <script src="script.js" defer></script>
  </body>
</html>`;
};

export const renderProject = (project: Project, outputDir: string): void => {
  mkdirSync(outputDir, { recursive: true });

  const css = `:root {
    --primary: ${project.globals.brand.primaryColor};
    --accent: ${project.globals.brand.accentColor};
    --bg: #fff;
    --text: #1d1d1d;
    --muted: #5c5c5c;
    --max: 1100px;
  }

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    margin: 0;
    font-family: ${project.globals.brand.fontStack};
    background: var(--bg);
    color: var(--text);
    line-height: 1.6;
  }

  .container {
    max-width: var(--max);
    margin: 0 auto;
    padding: 1rem 1.2rem;
  }

  .site-header {
    background: rgba(255,255,255,.96);
    border-bottom: 1px solid #eee;
    position: sticky;
    top: 0;
    z-index: 20;
  }

  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 70px;
  }

  nav {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  nav a {
    color: var(--text);
    text-decoration: none;
    font-weight: 600;
  }

  .logo {
    max-height: 44px;
    width: auto;
  }

  .hero {
    min-height: 420px;
    display: flex;
    align-items: center;
    background-size: cover;
    background-position: center;
    color: white;
  }

  .hero-inner { width: 100%; }

  .hero-copy {
    max-width: 560px;
    background: rgba(0,0,0,.35);
    padding: 2rem;
    border-radius: 18px;
  }

  .button, .mini-button {
    display: inline-block;
    text-decoration: none;
    background: var(--primary);
    color: white;
    border: 0;
    border-radius: 8px;
    padding: 0.8rem 1.2rem;
    cursor: pointer;
    font-weight: 700;
  }

  .mini-button { padding: 0.5rem 0.8rem; }
  h1, h2, h3 { line-height: 1.2; }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }

  .card, .product {
    background: #fff;
    border: 1px solid #ececec;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0,0,0,.04);
  }

  .card img, .product img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    display: block;
  }

  .card-body, .product-body { padding: 1rem; }
  .price { font-weight: 700; color: var(--primary); }

  .product-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .contact-form {
    display: grid;
    gap: 0.9rem;
    max-width: 680px;
  }

  .contact-form label {
    display: grid;
    gap: 0.4rem;
    font-weight: 600;
  }

  input, textarea {
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 0.8rem 0.9rem;
    font: inherit;
  }

  textarea { min-height: 150px; resize: vertical; }

  .site-footer {
    border-top: 1px solid #eee;
    margin-top: 2rem;
    padding: 1rem 0 2rem;
  }

  @media (max-width: 720px) {
    .header-inner {
      flex-direction: column;
      justify-content: center;
      padding: 1rem 0;
    }

    .hero {
      min-height: 320px;
    }

    .hero-copy {
      padding: 1.25rem;
    }
  }
`;

  writeFileSync(path.join(outputDir, 'styles.css'), css);

  const script = `document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const payload = Object.fromEntries(data.entries());
      if (!payload.name || !payload.email || !payload.message) {
        alert('Veuillez remplir tous les champs.');
        return;
      }
      alert('Message envoyé. Merci !');
      form.reset();
    });
  }

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    if (!target || !target.dataset.addCart) return;
    const cart = JSON.parse(localStorage.getItem('project_cart_v1') || '[]');
    const productId = target.dataset.productId || 'unknown';
    const productName = target.dataset.productName || 'Produit';
    const productPrice = Number(target.dataset.price || 0);

    const existing = cart.find((item: any) => item.productId === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ productId, productName, price: productPrice, quantity: 1 });
    }

    localStorage.setItem('project_cart_v1', JSON.stringify(cart));
    alert(`${productName} ajouté au panier.`);
  });
});
`;

  writeFileSync(path.join(outputDir, 'script.js'), script);

  project.pages.forEach((page) => {
    const html = renderPage(project, page);
    const fileName = page.slug === 'index' ? 'index.html' : `${page.slug}.html`;
    writeFileSync(path.join(outputDir, fileName), html);
  });

  const robots = 'User-agent: *\nAllow: /\nSitemap: /sitemap.xml\n';
  writeFileSync(path.join(outputDir, 'robots.txt'), robots);

  const urls = project.pages
    .map((page) => {
      const loc = page.slug === 'index' ? 'https://example.com/' : `https://example.com/${page.slug}`;
      return `  <url><loc>${loc}</loc></url>`;
    })
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  writeFileSync(path.join(outputDir, 'sitemap.xml'), sitemap);
};
