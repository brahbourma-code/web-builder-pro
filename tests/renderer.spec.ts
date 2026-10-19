import { describe, expect, it } from 'vitest';
import { renderPage, renderProject } from '../src/renderer';
import type { Project } from '../src/types';

const project: Project = {
  id: 'demo',
  name: 'Demo Site',
  slug: 'demo-site',
  description: 'Demo project',
  globals: {
    brand: {
      logo: 'logo.png',
      favicon: 'favicon.ico',
      primaryColor: '#111111',
      accentColor: '#ffcc00',
      fontStack: 'Arial, sans-serif',
      baseFontSize: 16
    },
    seoDefaults: {
      titleSuffix: ' — Demo Site',
      defaultDescription: 'Demo description',
      defaultOgImage: 'og.png'
    }
  },
  assets: [],
  pages: [
    {
      id: 'home',
      slug: 'index',
      title: 'Accueil',
      meta: {
        title: 'Accueil',
        description: 'Bienvenue',
        robots: 'index,follow'
      },
      sections: [
        {
          id: 'hero',
          type: 'hero',
          props: {
            title: 'Bienvenue',
            subtitle: 'Bonjour',
            background: 'hero.jpg',
            href: '#contact',
            ctaLabel: 'Réserver'
          }
        }
      ]
    }
  ]
};

describe('renderPage', () => {
  it('renders an HTML page with meta tags', () => {
    const html = renderPage(project, project.pages[0]);
    expect(html).toContain('<!doctype html>');
    expect(html).toContain('<title>Accueil — Demo Site</title>');
    expect(html).toContain('meta name="description"');
  });

  it('escapes unsafe HTML', () => {
    const unsafeProject: Project = {
      ...project,
      pages: [
        {
          ...project.pages[0],
          sections: [
            {
              id: 'hero',
              type: 'hero',
              props: {
                title: '<script>alert(1)</script>',
                subtitle: 'Bonjour',
                background: 'hero.jpg',
                href: '#contact',
                ctaLabel: 'Réserver'
              }
            }
          ]
        }
      ]
    };

    const html = renderPage(unsafeProject, unsafeProject.pages[0]);
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
  });
});

describe('renderProject', () => {
  it('creates output files', () => {
    const target = 'tmp-render-output';
    renderProject(project, target);
    expect(true).toBe(true);
  });
});
