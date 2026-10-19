export type AssetType = 'image' | 'video' | 'file';

export interface Asset {
  id: string;
  type: AssetType;
  path: string;
  alt?: string;
  caption?: string;
}

export interface BrandConfig {
  logo: string;
  favicon: string;
  primaryColor: string;
  accentColor: string;
  fontStack: string;
  baseFontSize: number;
}

export interface SeoDefaults {
  titleSuffix: string;
  defaultDescription: string;
  defaultOgImage: string;
}

export interface ProjectGlobals {
  brand: BrandConfig;
  seoDefaults: SeoDefaults;
}

export interface MenuItem {
  id: string;
  title: string;
  description: string;
  price: number;
  image?: string;
}

export interface Section {
  id: string;
  type: 'hero' | 'text' | 'menu' | 'products' | 'contact';
  props: Record<string, any>;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  meta: {
    title: string;
    description: string;
    ogImage?: string;
    robots?: string;
  };
  sections: Section[];
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  price: number;
  description: string;
  image?: string;
  category?: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  globals: ProjectGlobals;
  assets: Asset[];
  pages: Page[];
  products?: Product[];
  ecommerce?: {
    enabled: boolean;
    currency: string;
    paymentGateways?: string[];
  };
}
