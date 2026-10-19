import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

export interface TemplateManifest {
  id: string;
  name: string;
  version: string;
  defaults?: Record<string, any>;
  description?: string;
  category?: string;
}

export class TemplateRegistry {
  private rootDir: string;

  constructor(rootDir: string) {
    this.rootDir = rootDir;
  }

  listTemplates(): TemplateManifest[] {
    if (!existsSync(this.rootDir)) {
      return [];
    }

    return readdirSync(this.rootDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => {
        const manifestPath = path.join(this.rootDir, entry.name, 'template.json');
        if (!existsSync(manifestPath)) {
          return { id: entry.name, name: entry.name, version: '0.0.0' };
        }

        const content = JSON.parse(readFileSync(manifestPath, 'utf8')) as TemplateManifest;
        return {
          id: content.id ?? entry.name,
          name: content.name ?? entry.name,
          version: content.version ?? '0.0.0',
          defaults: content.defaults ?? {},
          description: content.description ?? '',
          category: content.category ?? 'General'
        };
      });
  }
}
