import { Product } from '@/types';

export const products: Record<string, Product[]> = {
  'lave-linge': [
    {
      id: 'll-1',
      name: 'Lave-linge EcoSilence Serie 6',
      brand: 'Bosch',
      price: 599,
      originalPrice: 749,
      image: '/images/products/lave-linge-bosch.png',
      rating: 4.7,
      reviews: 342,
      features: [
        'Capacité 9 kg',
        'Moteur EcoSilence Drive',
        '1400 tours/min',
        'Programme rapide 15 min',
        'Départ différé 24h'
      ],
      energyClass: 'A',
      services: [
        {
          id: 'install-1',
          name: 'Installation',
          price: 39,
          description: 'Installation et mise en service par un technicien',
          icon: 'wrench'
        },
        {
          id: 'reprise-1',
          name: 'Reprise ancien appareil',
          price: 0,
          description: 'Reprise gratuite de votre ancien lave-linge',
          icon: 'recycle'
        },
        {
          id: 'garantie-1',
          name: 'Garantie 5 ans',
          price: 89,
          description: 'Extension de garantie pièces et main d\'oeuvre',
          icon: 'shield'
        }
      ],
      matchScore: 95,
      matchReasons: [
        'Correspond à votre budget',
        'Capacité idéale pour famille de 4',
        'Classe énergie A pour économies',
        'Silencieux - parfait en appartement'
      ]
    },
    {
      id: 'll-2',
      name: 'Lave-linge QuickDrive',
      brand: 'Samsung',
      price: 699,
      originalPrice: 849,
      image: '/images/products/lave-linge-samsung.png',
      rating: 4.5,
      reviews: 256,
      features: [
        'Capacité 10 kg',
        'Technologie QuickDrive',
        'AddWash - ajout de linge',
        'Connecté WiFi',
        'Lavage vapeur hygiénique'
      ],
      energyClass: 'A',
      services: [
        {
          id: 'install-2',
          name: 'Installation',
          price: 39,
          description: 'Installation et mise en service par un technicien',
          icon: 'wrench'
        },
        {
          id: 'reprise-2',
          name: 'Reprise ancien appareil',
          price: 0,
          description: 'Reprise gratuite de votre ancien lave-linge',
          icon: 'recycle'
        },
        {
          id: 'garantie-2',
          name: 'Garantie 5 ans',
          price: 99,
          description: 'Extension de garantie pièces et main d\'oeuvre',
          icon: 'shield'
        }
      ],
      matchScore: 88,
      matchReasons: [
        'Grande capacité familiale',
        'Fonction AddWash pratique',
        'Connecté pour suivi à distance',
        'Légèrement au-dessus du budget'
      ]
    },
    {
      id: 'll-3',
      name: 'Lave-linge ProSense',
      brand: 'Electrolux',
      price: 549,
      image: '/images/products/lave-linge-electrolux.png',
      rating: 4.3,
      reviews: 189,
      features: [
        'Capacité 8 kg',
        'Technologie ProSense',
        '1400 tours/min',
        'Programme vapeur',
        'Moteur Inverter'
      ],
      energyClass: 'B',
      services: [
        {
          id: 'install-3',
          name: 'Installation',
          price: 39,
          description: 'Installation et mise en service par un technicien',
          icon: 'wrench'
        },
        {
          id: 'reprise-3',
          name: 'Reprise ancien appareil',
          price: 0,
          description: 'Reprise gratuite de votre ancien lave-linge',
          icon: 'recycle'
        }
      ],
      matchScore: 82,
      matchReasons: [
        'Excellent rapport qualité-prix',
        'Adapté à votre budget',
        'Capacité suffisante',
        'Classe B moins économe'
      ]
    }
  ],
  'tv': [
    {
      id: 'tv-1',
      name: 'TV OLED 55" 4K',
      brand: 'LG',
      price: 1299,
      originalPrice: 1499,
      image: '/images/products/tv-lg-oled.png',
      rating: 4.8,
      reviews: 523,
      features: [
        'Dalle OLED 4K',
        'Smart TV webOS',
        'Dolby Vision & Atmos',
        '4 ports HDMI 2.1',
        'Compatible gaming 120Hz'
      ],
      energyClass: 'G',
      services: [
        {
          id: 'install-tv-1',
          name: 'Installation murale',
          price: 79,
          description: 'Fixation murale et configuration',
          icon: 'wrench'
        },
        {
          id: 'garantie-tv-1',
          name: 'Garantie 5 ans',
          price: 149,
          description: 'Extension de garantie pièces et main d\'oeuvre',
          icon: 'shield'
        }
      ],
      matchScore: 94,
      matchReasons: [
        'Qualité d\'image exceptionnelle',
        'Idéal pour films et séries',
        'Parfait pour le gaming',
        'Smart TV complète'
      ]
    }
  ]
};
