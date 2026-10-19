import type { Project } from './types';

export const exampleProject: Project = {
  id: 'project-restaurant-demo',
  name: 'Le Petit Bistrot',
  slug: 'le-petit-bistrot',
  description: 'Exemple de site vitrine pour un restaurant moderne et responsive.',
  globals: {
    brand: {
      logo: 'assets/logo.png',
      favicon: 'assets/favicon.ico',
      primaryColor: '#b12d2d',
      accentColor: '#f6d365',
      fontStack: 'Inter, system-ui, sans-serif',
      baseFontSize: 16
    },
    seoDefaults: {
      titleSuffix: ' — Le Petit Bistrot',
      defaultDescription: 'Cuisine locale, ambiance chaleureuse et terrasse.',
      defaultOgImage: 'assets/hero.jpg'
    }
  },
  assets: [
    { id: 'logo', type: 'image', path: 'assets/logo.png', alt: 'Logo du restaurant' },
    { id: 'hero', type: 'image', path: 'assets/hero.jpg', alt: 'Intérieur du restaurant' }
  ],
  pages: [
    {
      id: 'home',
      slug: 'index',
      title: 'Accueil',
      meta: {
        title: 'Accueil',
        description: 'Bienvenue au Petit Bistrot, cuisine locale et accueil chaleureux.',
        ogImage: 'assets/hero.jpg',
        robots: 'index,follow'
      },
      sections: [
        {
          id: 'hero-main',
          type: 'hero',
          props: {
            title: 'Bienvenue au Petit Bistrot',
            subtitle: 'Cuisine locale, ambiance chaleureuse et menu du jour.',
            background: 'assets/hero.jpg',
            href: '#contact',
            ctaLabel: 'Réserver'
          }
        },
        {
          id: 'about',
          type: 'text',
          props: {
            title: 'À propos',
            text: 'Chef et équipe élaborent des recettes généreuses à partir de produits frais et locaux.'
          }
        },
        {
          id: 'menu',
          type: 'menu',
          props: {
            title: 'Notre carte',
            items: [
              {
                id: 'starter-1',
                title: 'Terrine maison',
                description: 'Avec pain grillé et petits légumes.',
                price: 8.5,
                image: 'assets/terrine.jpg'
              },
              {
                id: 'main-1',
                title: 'Plat du jour',
                description: 'Selon l’ardoise et les saisons.',
                price: 14,
                image: 'assets/plat-du-jour.jpg'
              }
            ]
          }
        },
        {
          id: 'contact',
          type: 'contact',
          props: {
            title: 'Réservation & contact',
            email: 'hello@lepetitbistrot.example'
          }
        }
      ]
    }
  ],
  products: [
    {
      id: 'prod-1',
      slug: 'terrine-maison',
      title: 'Terrine maison',
      price: 8.5,
      description: 'Entrée généreuse et savoureuse.',
      image: 'assets/terrine.jpg',
      category: 'Entrées'
    }
  ],
  ecommerce: {
    enabled: true,
    currency: 'EUR',
    paymentGateways: ['stripe', 'paypal']
  }
};
