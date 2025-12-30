export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  specs: string[];
}

export const products: Record<string, Product> = {
  // === MAC ===
  'macbook-air-m3': {
    id: 'macbook-air-m3',
    name: 'MacBook Air M3 13"',
    category: 'ordinateur',
    price: 1299,
    image: '💻',
    description: 'Parfait pour le développement quotidien. Léger, silencieux, autonomie exceptionnelle.',
    specs: ['Puce M3', '8 Go RAM', '256 Go SSD', '18h autonomie']
  },
  'macbook-pro-m3': {
    id: 'macbook-pro-m3',
    name: 'MacBook Pro M3 14"',
    category: 'ordinateur',
    price: 1999,
    image: '💻',
    description: 'Pour les développeurs exigeants. Puissance et écran ProMotion.',
    specs: ['Puce M3 Pro', '18 Go RAM', '512 Go SSD', 'Écran ProMotion']
  },
  'macbook-pro-m3-max': {
    id: 'macbook-pro-m3-max',
    name: 'MacBook Pro M3 Max 16"',
    category: 'ordinateur',
    price: 3499,
    image: '💻',
    description: 'La puissance ultime. Pour les projets les plus ambitieux.',
    specs: ['Puce M3 Max', '36 Go RAM', '1 To SSD', 'Écran 16" ProMotion']
  },

  // === WINDOWS - TRAVAIL ===
  'dell-xps-15': {
    id: 'dell-xps-15',
    name: 'Dell XPS 15',
    category: 'ordinateur',
    price: 1599,
    image: '💻',
    description: 'Le laptop Windows premium pour les professionnels.',
    specs: ['Intel i7-13700H', '16 Go RAM', '512 Go SSD', 'Écran OLED 3.5K']
  },
  'lenovo-thinkpad-x1': {
    id: 'lenovo-thinkpad-x1',
    name: 'Lenovo ThinkPad X1 Carbon',
    category: 'ordinateur',
    price: 1899,
    image: '💻',
    description: 'La référence business. Robuste, léger, clavier légendaire.',
    specs: ['Intel i7-1365U', '32 Go RAM', '1 To SSD', '14" 2.8K']
  },
  'hp-spectre-x360': {
    id: 'hp-spectre-x360',
    name: 'HP Spectre x360 14"',
    category: 'ordinateur',
    price: 1449,
    image: '💻',
    description: 'Convertible élégant pour le travail nomade.',
    specs: ['Intel i7-1355U', '16 Go RAM', '512 Go SSD', 'Écran tactile OLED']
  },

  // === WINDOWS - GAMING ===
  'asus-rog-strix': {
    id: 'asus-rog-strix',
    name: 'ASUS ROG Strix G16',
    category: 'ordinateur',
    price: 1799,
    image: '🎮',
    description: 'Puissance gaming avec RTX 4070. Pour jouer en Ultra.',
    specs: ['Intel i7-13650HX', 'RTX 4070', '16 Go RAM', '165Hz QHD']
  },
  'msi-raider-ge78': {
    id: 'msi-raider-ge78',
    name: 'MSI Raider GE78 HX',
    category: 'ordinateur',
    price: 2999,
    image: '🎮',
    description: 'Le monstre de puissance. RTX 4080 pour les gamers exigeants.',
    specs: ['Intel i9-13980HX', 'RTX 4080', '32 Go RAM', '240Hz QHD+']
  },
  'lenovo-legion-pro': {
    id: 'lenovo-legion-pro',
    name: 'Lenovo Legion Pro 7i',
    category: 'ordinateur',
    price: 2499,
    image: '🎮',
    description: 'Performance et refroidissement optimal pour les sessions longues.',
    specs: ['Intel i9-13900HX', 'RTX 4080', '32 Go RAM', '240Hz WQXGA']
  },

  // === LINUX ===
  'system76-lemur': {
    id: 'system76-lemur',
    name: 'System76 Lemur Pro',
    category: 'ordinateur',
    price: 1199,
    image: '🐧',
    description: 'Conçu pour Linux. Léger, open-source friendly.',
    specs: ['Intel i7-1355U', '16 Go RAM', '500 Go SSD', 'Pop!_OS']
  },
  'dell-xps-dev': {
    id: 'dell-xps-dev',
    name: 'Dell XPS 13 Plus Developer',
    category: 'ordinateur',
    price: 1499,
    image: '🐧',
    description: 'Ubuntu préinstallé. Parfait pour le développement.',
    specs: ['Intel i7-1360P', '16 Go RAM', '512 Go SSD', 'Ubuntu 22.04']
  },
  'thinkpad-linux': {
    id: 'thinkpad-linux',
    name: 'ThinkPad T14s Linux',
    category: 'ordinateur',
    price: 1399,
    image: '🐧',
    description: 'ThinkPad certifié Linux. Fiabilité et compatibilité.',
    specs: ['AMD Ryzen 7 Pro', '16 Go RAM', '512 Go SSD', 'Fedora']
  },

  // === ÉTUDIANT ===
  'macbook-air-m2': {
    id: 'macbook-air-m2',
    name: 'MacBook Air M2',
    category: 'ordinateur',
    price: 1099,
    image: '💻',
    description: 'Idéal pour les études. Léger et endurant.',
    specs: ['Puce M2', '8 Go RAM', '256 Go SSD', '15h autonomie']
  },
  'hp-pavilion-15': {
    id: 'hp-pavilion-15',
    name: 'HP Pavilion 15',
    category: 'ordinateur',
    price: 699,
    image: '💻',
    description: 'Excellent rapport qualité-prix pour les étudiants.',
    specs: ['Intel i5-1335U', '8 Go RAM', '256 Go SSD', 'Windows 11']
  },
  'acer-aspire-5': {
    id: 'acer-aspire-5',
    name: 'Acer Aspire 5',
    category: 'ordinateur',
    price: 549,
    image: '💻',
    description: 'Budget serré ? L\'Aspire 5 fait le job.',
    specs: ['AMD Ryzen 5', '8 Go RAM', '256 Go SSD', '15.6" Full HD']
  },

  // === ÉCRANS ===
  'ecran-dell-27': {
    id: 'ecran-dell-27',
    name: 'Écran Dell UltraSharp 27" 4K',
    category: 'ecran',
    price: 549,
    image: '🖥️',
    description: 'Écran 4K USB-C, connexion directe avec un seul câble.',
    specs: ['27 pouces 4K', 'USB-C 90W', 'Pivot/Rotation', 'Couleurs calibrées']
  },
  'ecran-lg-27': {
    id: 'ecran-lg-27',
    name: 'Écran LG 27" 4K USB-C',
    category: 'ecran',
    price: 449,
    image: '🖥️',
    description: 'Excellent rapport qualité-prix pour un setup dual-screen.',
    specs: ['27 pouces 4K', 'USB-C 65W', 'HDR10', 'FreeSync']
  },
  'ecran-gaming-samsung': {
    id: 'ecran-gaming-samsung',
    name: 'Samsung Odyssey G7 32"',
    category: 'ecran',
    price: 699,
    image: '🖥️',
    description: 'Écran gaming incurvé 240Hz pour une immersion totale.',
    specs: ['32" QHD Curved', '240Hz', '1ms', 'G-Sync Compatible']
  },
  'ecran-gaming-asus': {
    id: 'ecran-gaming-asus',
    name: 'ASUS ROG Swift 27"',
    category: 'ecran',
    price: 799,
    image: '🖥️',
    description: 'Le moniteur esport par excellence. 360Hz de fluidité.',
    specs: ['27" Full HD', '360Hz', 'IPS 1ms', 'G-Sync']
  },

  // === ACCESSOIRES GAMING ===
  'clavier-logitech': {
    id: 'clavier-logitech',
    name: 'Logitech G Pro X',
    category: 'accessoire',
    price: 149,
    image: '⌨️',
    description: 'Clavier mécanique compact pour le gaming compétitif.',
    specs: ['Switches GX', 'RGB', 'Compact TKL', 'Détachable']
  },
  'souris-logitech': {
    id: 'souris-logitech',
    name: 'Logitech G Pro X Superlight',
    category: 'accessoire',
    price: 159,
    image: '🖱️',
    description: 'La souris des pros. Ultra-légère, ultra-précise.',
    specs: ['63g', '25K DPI', 'Sans fil', '70h autonomie']
  },
  'casque-steelseries': {
    id: 'casque-steelseries',
    name: 'SteelSeries Arctis Nova Pro',
    category: 'accessoire',
    price: 349,
    image: '🎧',
    description: 'Audio haute-fidélité et ANC pour le gaming.',
    specs: ['Hi-Res Audio', 'ANC', 'Sans fil', 'Multi-plateforme']
  }
};
