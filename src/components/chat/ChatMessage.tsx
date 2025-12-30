'use client';

import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { Message } from '@/types';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-3 ${isAssistant ? '' : 'flex-row-reverse'}`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isAssistant ? 'bg-[#003366]' : 'bg-[#ff6600]'
        }`}
      >
        {isAssistant ? (
          <Bot size={16} className="text-white" />
        ) : (
          <User size={16} className="text-white" />
        )}
      </div>

      {/* Message bubble */}
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
          isAssistant
            ? 'bg-white shadow-sm text-gray-800 rounded-tl-none'
            : 'bg-[#003366] text-white rounded-tr-none'
        }`}
      >
        <p className="whitespace-pre-line text-sm leading-relaxed">{message.content}</p>
        <p
          className={`text-xs mt-1 ${
            isAssistant ? 'text-gray-400' : 'text-blue-200'
          }`}
        >
          {message.timestamp.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
    </motion.div>
  );
}
