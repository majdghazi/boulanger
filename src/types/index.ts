export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  options?: ChatOption[];
  products?: Product[];
}

export interface ChatOption {
  id: string;
  label: string;
  value: string;
  icon?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  features: string[];
  energyClass?: string;
  services: ProductService[];
  matchScore: number;
  matchReasons: string[];
}

export interface ProductService {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  image: string;
}

export interface ConversationStep {
  id: string;
  question: string;
  type: 'options' | 'text' | 'products';
  options?: ChatOption[];
  nextStep?: Record<string, string>;
}

export interface DashboardMetric {
  id: string;
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: string;
}

export interface ConversationAnalytics {
  totalConversations: number;
  avgDuration: string;
  conversionRate: number;
  satisfactionScore: number;
  topCategories: { name: string; count: number }[];
  peakHours: { hour: string; count: number }[];
}
