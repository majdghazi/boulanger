'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { Message, ChatOption, Product } from '@/types';
import { conversationFlow, categoryOptions } from '@/data/conversation';
import { products } from '@/data/products';
import ChatMessage from './ChatMessage';
import ChatOptions from './ChatOptions';
import ProductCard from '../products/ProductCard';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState('welcome');
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [userChoices, setUserChoices] = useState<Record<string, string>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial message
    setTimeout(() => {
      const step = conversationFlow['welcome'];
      addAssistantMessage(step.question, step.options);
    }, 500);
  }, []);

  const addAssistantMessage = (content: string, options?: ChatOption[], showProducts?: boolean) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content,
        timestamp: new Date(),
        options,
        products: showProducts ? products['lave-linge'] : undefined
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };

  const handleOptionSelect = (option: ChatOption) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: option.label,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Save choice
    setUserChoices(prev => ({ ...prev, [currentStep]: option.value }));

    // Get next step
    const currentStepData = conversationFlow[currentStep];
    const nextStepId = currentStepData.nextStep?.[option.value] || 'results';
    setCurrentStep(nextStepId);

    // Add assistant response
    setTimeout(() => {
      const nextStep = conversationFlow[nextStepId];
      if (nextStep) {
        if (nextStep.type === 'products') {
          addAssistantMessage(nextStep.question, undefined, true);
        } else {
          addAssistantMessage(nextStep.question, nextStep.options);
        }
      }
    }, 500);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      addAssistantMessage(
        "Je comprends votre besoin. Laissez-moi vous guider pour trouver le produit idéal.\n\nQue recherchez-vous aujourd'hui ?",
        categoryOptions
      );
      setCurrentStep('welcome');
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const lastMessage = messages[messages.length - 1];
  const showOptions = lastMessage?.role === 'assistant' && lastMessage.options && !isTyping;
  const showProducts = lastMessage?.role === 'assistant' && lastMessage.products && !isTyping;

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] max-w-4xl mx-auto">
      {/* Chat header */}
      <div className="bg-gradient-to-r from-[#003366] to-[#004488] text-white p-4 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 bg-[#ff6600] rounded-full flex items-center justify-center">
              <Bot size={24} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h2 className="font-bold text-lg">Shopping Agent Boulanger</h2>
            <p className="text-sm text-gray-300 flex items-center gap-1">
              <Sparkles size={14} className="text-[#ff6600]" />
              Propulsé par l&apos;IA générative
            </p>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-gray-500"
          >
            <div className="w-8 h-8 bg-[#003366] rounded-full flex items-center justify-center">
              <Bot size={16} className="text-white" />
            </div>
            <div className="bg-white px-4 py-3 rounded-2xl shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Options */}
        {showOptions && lastMessage.options && (
          <ChatOptions options={lastMessage.options} onSelect={handleOptionSelect} />
        )}

        {/* Products */}
        {showProducts && lastMessage.products && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="grid gap-4">
              {lastMessage.products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
              <p className="font-medium mb-1">Conseil expert Boulanger</p>
              <p>Notre recommandation : le <strong>Bosch EcoSilence Serie 6</strong> offre le meilleur équilibre entre performance, économies d&apos;énergie et prix.</p>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="bg-white border-t p-4 rounded-b-2xl">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Décrivez votre besoin ou posez une question..."
              className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-[#003366] pr-12"
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="p-3 bg-[#ff6600] text-white rounded-full hover:bg-[#e55a00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-xs text-gray-400 text-center mt-2">
          Appuyez sur Entrée pour envoyer • L&apos;IA peut faire des erreurs
        </p>
      </div>
    </div>
  );
}
