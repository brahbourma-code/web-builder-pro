# Web Builder Pro

A local-first no-code website builder core for Windows and Android, built around a shared JSON project model and a common rendering engine.

## Goals
- Create templates by activity sector (restaurant, portfolio, artisans, PME, e-commerce light)
- Keep project data local-first and exportable as standard HTML/CSS/JS/PHP
- Generate responsive, SEO-ready pages automatically from structured data
- Share one rendering core between Windows and Android environments

## Project structure
- `src/renderer.ts` — shared project-to-site renderer
- `src/seo-generator.ts` — sitemap, robots, metadata helpers
- `src/template-registry.ts` — template registry and manifest loading
- `src/example-project.ts` — example project data
- `scripts/generate_project_from_answers.ts` — wizard-style generation helper
- `templates/restaurant/` — sample template manifest and demo content
- `tests/renderer.spec.ts` — validation tests for core rendering

## Quick start

```bash
npm install
npm test
npm run build
```

## Example usage

```ts
import { exampleProject } from './src/example-project';
import { renderProject } from './src/renderer';

renderProject(exampleProject, './dist-output');
```

This will output generated files such as:
- `index.html`
- `styles.css`
- `sitemap.xml`
- `robots.txt`

## Notes
This repository is the architecture foundation for the no-code engine. It is intentionally designed to be reused by desktop and mobile apps while keeping a consistent data model and output.
