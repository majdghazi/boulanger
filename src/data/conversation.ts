import { ConversationStep, ChatOption } from '@/types';

export const categoryOptions: ChatOption[] = [
  { id: 'electromenager', label: 'Électroménager', value: 'electromenager', icon: 'washing-machine' },
  { id: 'tv-son', label: 'TV & Son', value: 'tv-son', icon: 'tv' },
  { id: 'informatique', label: 'Informatique', value: 'informatique', icon: 'laptop' },
  { id: 'telephonie', label: 'Téléphonie', value: 'telephonie', icon: 'smartphone' },
  { id: 'cuisine', label: 'Cuisine', value: 'cuisine', icon: 'chef-hat' },
  { id: 'autre', label: 'Autre chose', value: 'autre', icon: 'help-circle' }
];

export const electromenagerOptions: ChatOption[] = [
  { id: 'lave-linge', label: 'Lave-linge', value: 'lave-linge', icon: 'shirt' },
  { id: 'refrigerateur', label: 'Réfrigérateur', value: 'refrigerateur', icon: 'thermometer-snowflake' },
  { id: 'lave-vaisselle', label: 'Lave-vaisselle', value: 'lave-vaisselle', icon: 'utensils' },
  { id: 'four', label: 'Four / Cuisinière', value: 'four', icon: 'flame' },
  { id: 'aspirateur', label: 'Aspirateur', value: 'aspirateur', icon: 'wind' },
  { id: 'autre-elec', label: 'Autre', value: 'autre-elec', icon: 'plus' }
];

export const capacityOptions: ChatOption[] = [
  { id: 'cap-small', label: '1-2 personnes (5-6 kg)', value: 'small', icon: 'user' },
  { id: 'cap-medium', label: '3-4 personnes (7-8 kg)', value: 'medium', icon: 'users' },
  { id: 'cap-large', label: '5+ personnes (9 kg+)', value: 'large', icon: 'users' }
];

export const budgetOptions: ChatOption[] = [
  { id: 'budget-eco', label: 'Moins de 400€', value: 'eco', icon: 'piggy-bank' },
  { id: 'budget-medium', label: '400€ - 700€', value: 'medium', icon: 'wallet' },
  { id: 'budget-premium', label: 'Plus de 700€', value: 'premium', icon: 'gem' }
];

export const priorityOptions: ChatOption[] = [
  { id: 'priority-eco', label: 'Économies d\'énergie', value: 'eco', icon: 'leaf' },
  { id: 'priority-silence', label: 'Silence', value: 'silence', icon: 'volume-x' },
  { id: 'priority-speed', label: 'Programmes rapides', value: 'speed', icon: 'zap' },
  { id: 'priority-connect', label: 'Connectivité', value: 'connect', icon: 'wifi' }
];

export const conversationFlow: Record<string, ConversationStep> = {
  welcome: {
    id: 'welcome',
    question: 'Bonjour ! Je suis votre assistant Boulanger. 🛒\n\nJe suis là pour vous aider à trouver le produit idéal en moins de 5 minutes.\n\nQue recherchez-vous aujourd\'hui ?',
    type: 'options',
    options: categoryOptions,
    nextStep: {
      'electromenager': 'electromenager-type',
      'tv-son': 'tv-type',
      'informatique': 'informatique-type',
      'telephonie': 'telephonie-type',
      'cuisine': 'cuisine-type',
      'autre': 'free-search'
    }
  },
  'electromenager-type': {
    id: 'electromenager-type',
    question: 'Parfait ! Quel type d\'appareil électroménager recherchez-vous ?',
    type: 'options',
    options: electromenagerOptions,
    nextStep: {
      'lave-linge': 'lave-linge-capacity',
      'refrigerateur': 'refrigerateur-type',
      'lave-vaisselle': 'lave-vaisselle-capacity',
      'four': 'four-type',
      'aspirateur': 'aspirateur-type',
      'autre-elec': 'free-search'
    }
  },
  'lave-linge-capacity': {
    id: 'lave-linge-capacity',
    question: 'Très bien ! Pour vous proposer le lave-linge le plus adapté, j\'ai besoin de connaître la taille de votre foyer.\n\nCombien de personnes composent votre foyer ?',
    type: 'options',
    options: capacityOptions,
    nextStep: {
      'small': 'budget',
      'medium': 'budget',
      'large': 'budget'
    }
  },
  budget: {
    id: 'budget',
    question: 'Excellent ! Quel est votre budget approximatif ?',
    type: 'options',
    options: budgetOptions,
    nextStep: {
      'eco': 'priority',
      'medium': 'priority',
      'premium': 'priority'
    }
  },
  priority: {
    id: 'priority',
    question: 'Dernière question : qu\'est-ce qui est le plus important pour vous ?',
    type: 'options',
    options: priorityOptions,
    nextStep: {
      'eco': 'results',
      'silence': 'results',
      'speed': 'results',
      'connect': 'results'
    }
  },
  results: {
    id: 'results',
    question: 'Parfait ! J\'ai analysé votre besoin et voici mes recommandations personnalisées.\n\nVoici les 3 lave-linge qui correspondent le mieux à vos critères :',
    type: 'products'
  },
  'free-search': {
    id: 'free-search',
    question: 'Pas de souci ! Décrivez-moi ce que vous recherchez et je ferai de mon mieux pour vous aider.',
    type: 'text'
  }
};

export const assistantResponses = {
  thinking: [
    'Je recherche les meilleures options pour vous...',
    'Analyse en cours de notre catalogue...',
    'Je compare les produits selon vos critères...'
  ],
  productIntro: [
    'Voici ma sélection personnalisée :',
    'J\'ai trouvé ces produits qui correspondent à vos besoins :',
    'Voici les meilleures options selon vos critères :'
  ],
  servicePromo: [
    '💡 Saviez-vous que Boulanger propose la reprise gratuite de votre ancien appareil ?',
    '🚚 Profitez de la livraison et installation à domicile par nos experts.',
    '🛡️ Nos extensions de garantie vous protègent jusqu\'à 5 ans.'
  ]
};
