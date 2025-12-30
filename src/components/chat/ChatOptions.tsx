'use client';

import { motion } from 'framer-motion';
import {
  ShoppingCart, Tv, Laptop, Smartphone, ChefHat, Home, HelpCircle,
  Shirt, Thermometer, Utensils, Flame, Wind, Plus, User, Users,
  PiggyBank, Wallet, Gem, Leaf, VolumeX, Zap, Wifi
} from 'lucide-react';
import { ChatOption } from '@/types';

const iconMap: Record<string, React.ElementType> = {
  'washing-machine': ShoppingCart,
  'tv': Tv,
  'laptop': Laptop,
  'smartphone': Smartphone,
  'chef-hat': ChefHat,
  'home': Home,
  'help-circle': HelpCircle,
  'shirt': Shirt,
  'thermometer-snowflake': Thermometer,
  'utensils': Utensils,
  'flame': Flame,
  'wind': Wind,
  'plus': Plus,
  'user': User,
  'users': Users,
  'piggy-bank': PiggyBank,
  'wallet': Wallet,
  'gem': Gem,
  'leaf': Leaf,
  'volume-x': VolumeX,
  'zap': Zap,
  'wifi': Wifi
};

interface ChatOptionsProps {
  options: ChatOption[];
  onSelect: (option: ChatOption) => void;
}

export default function ChatOptions({ options, onSelect }: ChatOptionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-2 ml-11"
    >
      {options.map((option, index) => {
        const Icon = option.icon ? iconMap[option.icon] || HelpCircle : HelpCircle;
        return (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelect(option)}
            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#003366] text-[#003366] rounded-full hover:bg-[#003366] hover:text-white transition-all shadow-sm hover:shadow-md"
          >
            <Icon size={16} />
            <span className="text-sm font-medium">{option.label}</span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
