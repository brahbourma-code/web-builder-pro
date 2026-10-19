import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

export const generateSitemap = (pages: Array<{ slug: string }>, baseUrl: string, outputDir: string): void => {
  const urls = pages
    .map((page) => {
      const loc = page.slug === 'index' ? baseUrl + '/' : `${baseUrl}/${page.slug}`;
      return `  <url><loc>${loc}</loc></url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(path.join(outputDir, 'sitemap.xml'), xml);
};

export const generateRobots = (outputDir: string, sitemapUrl: string = '/sitemap.xml'): void => {
  mkdirSync(outputDir, { recursive: true });
  const content = `User-agent: *\nAllow: /\nSitemap: ${sitemapUrl}\n`;
  writeFileSync(path.join(outputDir, 'robots.txt'), content);
};

export const pageJsonLd = (page: any, project: any): string => {
  if (page?.structured_data) {
    return JSON.stringify(page.structured_data, null, 2);
  }

  return JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': project?.template?.category === 'Restaurant' ? 'Restaurant' : 'Organization',
      name: project?.name || 'Site',
      description: page?.meta?.description || project?.description || ''
    },
    null,
    2
  );
};
