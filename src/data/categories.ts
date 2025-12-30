import { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'electromenager',
    name: 'Électroménager',
    icon: 'washing-machine',
    description: 'Lave-linge, sèche-linge, réfrigérateurs, fours...',
    image: '/images/electromenager.jpg'
  },
  {
    id: 'tv-son',
    name: 'TV & Son',
    icon: 'tv',
    description: 'Téléviseurs, barres de son, home cinéma...',
    image: '/images/tv-son.jpg'
  },
  {
    id: 'informatique',
    name: 'Informatique',
    icon: 'laptop',
    description: 'Ordinateurs, tablettes, accessoires...',
    image: '/images/informatique.jpg'
  },
  {
    id: 'telephonie',
    name: 'Téléphonie',
    icon: 'smartphone',
    description: 'Smartphones, accessoires, forfaits...',
    image: '/images/telephonie.jpg'
  },
  {
    id: 'cuisine',
    name: 'Cuisine',
    icon: 'chef-hat',
    description: 'Robots, cafetières, ustensiles...',
    image: '/images/cuisine.jpg'
  },
  {
    id: 'maison-connectee',
    name: 'Maison Connectée',
    icon: 'home',
    description: 'Domotique, assistants vocaux, sécurité...',
    image: '/images/maison-connectee.jpg'
  }
];
