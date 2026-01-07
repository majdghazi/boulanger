'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { products, Product } from '@/data/products';
import { useCart } from './context/CartContext';

// Speech Recognition types
interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: () => void;
  onend: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  text: string;
  options?: { label: string; value: string }[];
  products?: Product[];
}

interface APIProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface APIResponse {
  message: string;
  options?: { label: string; value: string }[] | null;
  products?: APIProduct[] | null;
  action?: string;
  selectedProductId?: string;
}

// Utilitaire pour nettoyer les messages de tout JSON résiduel
function sanitizeMessage(message: string): string {
  if (!message) return "Je suis là pour vous aider ! Que recherchez-vous ?";

  let cleaned = message.trim();

  // Détecter si le message est du JSON brut
  if (cleaned.startsWith('{') && cleaned.includes('"message"')) {
    try {
      const parsed = JSON.parse(cleaned);
      if (parsed.message && typeof parsed.message === 'string') {
        cleaned = parsed.message;
      }
    } catch {
      // Essayer d'extraire le message avec regex
      const match = cleaned.match(/"message"\s*:\s*"([^"]+)"/);
      if (match) {
        cleaned = match[1];
      }
    }
  }

  // Vérifier si le message contient encore des patterns JSON suspects
  if (cleaned.startsWith('{"') || cleaned.startsWith('[{')) {
    // Retourner un message par défaut plutôt que du JSON
    return "Je vous aide à trouver le produit idéal. Que recherchez-vous ?";
  }

  // Nettoyer les échappements JSON résiduels
  cleaned = cleaned
    .replace(/\\n/g, '\n')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\');

  return cleaned;
}


export default function Home() {
  const { addToCart, itemCount } = useCart();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [chatStarted, setChatStarted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  // Auto-scroll chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Focus input on chat start
  useEffect(() => {
    if (chatStarted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [chatStarted]);

  // Speech recognition setup
  const startListening = () => {
    const SpeechRecognition = (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionInstance; webkitSpeechRecognition?: new () => SpeechRecognitionInstance }).SpeechRecognition || (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionInstance }).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('La reconnaissance vocale n\'est pas supportée par votre navigateur');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'fr-FR';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  // Appel à l'API Claude
  const sendToAPI = async (userMessage: string) => {
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages,
          userMessage: userMessage,
        }),
      });

      const data: APIResponse = await response.json();

      // Convertir les produits de l'API vers nos produits locaux si possible
      let localProducts: Product[] | undefined;
      if (data.products && data.products.length > 0) {
        const seenIds = new Set<string>();
        localProducts = data.products
          .map(apiProd => {
            // Chercher si le produit existe dans notre catalogue local
            const localProd = Object.values(products).find(
              p => p.name.toLowerCase().includes(apiProd.name.toLowerCase().split(' ')[0]) ||
                   apiProd.name.toLowerCase().includes(p.name.toLowerCase().split(' ')[0])
            );
            if (localProd) return localProd;

            // Sinon créer un produit temporaire
            return {
              id: apiProd.id || apiProd.name.toLowerCase().replace(/\s+/g, '-'),
              name: apiProd.name,
              price: apiProd.price,
              image: apiProd.image || '💻',
              description: apiProd.description || '',
              category: 'ordinateur',
              specs: []
            };
          })
          .filter(product => {
            // Dédupliquer par ID
            if (seenIds.has(product.id)) return false;
            seenIds.add(product.id);
            return true;
          });
      }

      // Ajouter au panier si action = add_to_cart
      if (data.action === 'add_to_cart' && data.selectedProductId) {
        const productToAdd = products[data.selectedProductId] || localProducts?.find(p => p.id === data.selectedProductId);
        if (productToAdd) {
          addToCart(productToAdd);
        }
      }

      // Ajouter le message de l'assistant (avec nettoyage JSON)
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: sanitizeMessage(data.message),
        options: data.options || undefined,
        products: localProducts,
      }]);

    } catch (error) {
      console.error('API Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: "Désolé, j'ai un petit souci. Pouvez-vous reformuler votre demande ?",
        options: [
          { label: '💻 Je cherche un ordinateur', value: 'Je cherche un ordinateur' },
        ],
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleUserInput = async (text: string) => {
    if (!text.trim()) return;

    if (!chatStarted) {
      setChatStarted(true);
    }

    // Ajouter le message utilisateur
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInputValue('');

    // Envoyer à l'API
    await sendToAPI(text);
  };

  const handleOptionClick = (value: string, label: string) => {
    handleUserInput(label);
  };

  const handleProductClick = (product: Product) => {
    // Ajouter directement au panier
    addToCart(product);
    // Informer l'IA
    handleUserInput(`J'ajoute ${product.name} au panier`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUserInput(inputValue);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header - Sticky */}
      <header className="sticky top-0 z-50 p-4 px-6 flex justify-between items-center border-b border-[#1a1a1a] bg-[#0a0a0a]/80 backdrop-blur-lg">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-boulanger.png"
            alt="Boulanger"
            width={140}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </Link>
        <div className="flex items-center gap-3">
          {/* Bouton Micro Header */}
          <button
            onClick={isListening ? stopListening : startListening}
            className={`relative p-3 rounded-xl transition-all ${
              isListening
                ? 'bg-red-500 animate-pulse'
                : 'bg-[#1a1a1a] hover:bg-[#2a2a2a]'
            }`}
            title="Recherche vocale"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            {isListening && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
            )}
          </button>
          {/* Bouton Panier */}
          <Link href="/cart" className="relative p-3 bg-[#1a1a1a] rounded-xl hover:bg-[#2a2a2a] transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ff6b00] rounded-full text-xs flex items-center justify-center font-medium">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero + Chat Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Left: Hero */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff6b00]/20 to-transparent border border-[#ff6b00]/30 px-4 py-2 rounded-full text-sm mb-6 w-fit"
            >
              <span className="w-2 h-2 bg-[#ff6b00] rounded-full animate-pulse"></span>
              <span className="text-[#ff6b00]">Nouveau</span>
              <span className="text-gray-400">Shopping Assistant</span>
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Trouvez </span>
              <span className="bg-gradient-to-r from-[#ff6b00] to-[#ff8533] bg-clip-text text-transparent">instantanément</span>
              <br />
              <span className="text-white">le produit idéal</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-lg">
              Décrivez ce que vous cherchez en texte ou par la voix, notre assistant vous guide vers le meilleur choix.
            </p>

            {/* Stats - Futuristic Cards */}
            <div className="grid grid-cols-3 gap-4">
              <motion.div
                whileHover={{ scale: 1.05, borderColor: '#ff6b00' }}
                className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl p-5 border border-[#2a2a2a] overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#ff6b00]/5 rounded-full blur-2xl"></div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#ff6b00]/10 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#ff6b00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-white">2 min</div>
                <div className="text-sm text-gray-500">Temps moyen</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, borderColor: '#ff6b00' }}
                className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl p-5 border border-[#2a2a2a] overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#ff6b00]/5 rounded-full blur-2xl"></div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#ff6b00]/10 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#ff6b00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-white">95%</div>
                <div className="text-sm text-gray-500">Satisfaction</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, borderColor: '#ff6b00' }}
                className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl p-5 border border-[#2a2a2a] overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#ff6b00]/5 rounded-full blur-2xl"></div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#ff6b00]/10 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#ff6b00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-500">Disponible</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Chat Interface */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            {/* Glow effect behind */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#ff6b00]/20 via-[#ff6b00]/10 to-[#ff6b00]/20 rounded-3xl blur-xl"></div>

            <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-3xl border border-[#2a2a2a] overflow-hidden flex flex-col h-[520px]">
              {/* Chat Header */}
              <div className="p-4 border-b border-[#2a2a2a] flex items-center justify-between bg-[#1a1a1a]/50 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#ff6b00] to-[#cc5500] rounded-2xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1a1a1a]"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Assistant Boulanger <span className="text-xs font-normal text-gray-400">| Rayon Ordinateurs</span></h3>
                    <p className="text-xs text-green-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                      En ligne • Créé par le candidat
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                {!chatStarted ? (
                  <div className="flex flex-col items-center justify-center h-full text-center px-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#ff6b00]/20 to-transparent rounded-2xl flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-[#ff6b00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <p className="text-white font-medium mb-2">Bonjour ! Je suis là pour vous aider.</p>
                    <p className="text-sm text-gray-500">Tapez votre recherche ou utilisez le micro</p>
                  </div>
                ) : (
                  <>
                    {messages.map((msg, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className="max-w-[85%]">
                          <div className={`px-4 py-3 rounded-2xl text-sm ${
                            msg.role === 'user'
                              ? 'bg-gradient-to-r from-[#ff6b00] to-[#cc5500] text-white rounded-br-sm'
                              : 'bg-[#2a2a2a] text-gray-200 rounded-bl-sm border border-[#3a3a3a]'
                          }`}>
                            {msg.text.split('**').map((part, i) =>
                              i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                            )}
                          </div>

                          {/* Options - COMPACT BUT STYLISH */}
                          {msg.options && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {msg.options.map((opt, i) => (
                                <motion.button
                                  key={i}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: i * 0.05 }}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleOptionClick(opt.value, opt.label)}
                                  className="group relative"
                                >
                                  {/* Glow on hover */}
                                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ff6b00] to-[#ff8533] rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-200"></div>

                                  {/* Button */}
                                  <div className="relative flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#1a1a1a] to-[#222] rounded-xl border border-[#333] group-hover:border-[#ff6b00] transition-all">
                                    <span className="text-lg">{opt.label.split(' ')[0]}</span>
                                    <span className="text-sm font-medium text-white group-hover:text-[#ff6b00] transition-colors">
                                      {opt.label.split(' ').slice(1).join(' ')}
                                    </span>
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          )}

                          {/* Products - COMPACT CARDS WITH GLOW */}
                          {msg.products && (
                            <div className="space-y-2 mt-3">
                              {msg.products.map((product, i) => (
                                <motion.div
                                  key={`${product.id}-${idx}-${i}`}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  className="group relative cursor-pointer"
                                  onClick={() => handleProductClick(product)}
                                >
                                  {/* Glow on hover */}
                                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ff6b00] to-[#ff8533] rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-200"></div>

                                  {/* Card */}
                                  <div className="relative flex items-center gap-3 p-3 bg-gradient-to-r from-[#1a1a1a] to-[#222] rounded-xl border border-[#333] group-hover:border-[#ff6b00] transition-all">
                                    <div className="text-2xl">{product.image}</div>
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-medium text-sm text-white group-hover:text-[#ff6b00] transition-colors truncate">{product.name}</h4>
                                      <p className="text-[#ff6b00] font-bold">{product.price}€</p>
                                    </div>
                                    <div className="w-8 h-8 rounded-lg bg-[#ff6b00]/10 group-hover:bg-[#ff6b00] flex items-center justify-center transition-all">
                                      <svg className="w-4 h-4 text-[#ff6b00] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                      </svg>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}

                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-3"
                      >
                        {/* Avatar IA animé */}
                        <div className="relative flex-shrink-0">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#ff6b00] to-[#cc5500] rounded-xl flex items-center justify-center">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                            </motion.div>
                          </div>
                          {/* Pulse effect */}
                          <motion.div
                            className="absolute -inset-1 bg-[#ff6b00]/30 rounded-xl"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        </div>

                        {/* Bulle avec animation de texte */}
                        <div className="flex-1 max-w-[80%]">
                          <div className="px-4 py-3 bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] rounded-2xl rounded-bl-sm border border-[#3a3a3a] overflow-hidden">
                            {/* Barre de progression subtile */}
                            <motion.div
                              className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-[#ff6b00] to-[#ff8533]"
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 3, repeat: Infinity }}
                            />

                            {/* Message animé */}
                            <div className="flex items-center gap-3">
                              <motion.div
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="text-sm text-gray-300"
                              >
                                Analyse en cours
                              </motion.div>

                              {/* Points animés style moderne */}
                              <div className="flex gap-1">
                                {[0, 1, 2].map((i) => (
                                  <motion.span
                                    key={i}
                                    className="w-1.5 h-1.5 bg-[#ff6b00] rounded-full"
                                    animate={{
                                      scale: [1, 1.5, 1],
                                      opacity: [0.3, 1, 0.3]
                                    }}
                                    transition={{
                                      duration: 0.8,
                                      repeat: Infinity,
                                      delay: i * 0.2
                                    }}
                                  />
                                ))}
                              </div>
                            </div>

                            {/* Texte qui change */}
                            <motion.p
                              className="text-xs text-gray-500 mt-1"
                              animate={{ opacity: [0, 1, 1, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              Recherche des meilleures options...
                            </motion.p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </>
                )}
              </div>

              {/* Chat Input - With Mic */}
              <div className="p-4 border-t border-[#2a2a2a] bg-[#1a1a1a]/50 backdrop-blur">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  {/* Mic Button */}
                  <button
                    type="button"
                    onClick={isListening ? stopListening : startListening}
                    className={`p-3 rounded-xl transition-all ${
                      isListening
                        ? 'bg-red-500 animate-pulse'
                        : 'bg-[#2a2a2a] hover:bg-[#3a3a3a] border border-[#3a3a3a]'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </button>

                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={isListening ? "Parlez maintenant..." : "Je cherche un ordinateur..."}
                    className="flex-1 bg-[#2a2a2a] text-white px-4 py-3 rounded-xl outline-none placeholder-gray-500 border border-[#3a3a3a] focus:border-[#ff6b00] transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="p-3 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#cc5500] hover:from-[#cc5500] hover:to-[#ff6b00] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>

        {/* SECTION DISCOVERY - Behind the Scenes */}
        <section className="mb-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff6b00]/20 to-transparent border border-[#ff6b00]/30 px-4 py-2 rounded-full text-sm mb-4">
              <span className="text-[#ff6b00]">Behind the scenes</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comment j&apos;ai conçu ce <span className="text-[#ff6b00]">POC</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Une approche Product Management structurée : Discovery, Benchmark, Prototypage
            </p>
          </motion.div>

          {/* Process Timeline */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              {
                step: '01',
                icon: '🔍',
                title: 'Discovery',
                subtitle: 'Comprendre le problème',
                items: [
                  'Analyse des parcours e-commerce actuels',
                  'Identification des points de friction',
                  'Étude des attentes utilisateurs'
                ]
              },
              {
                step: '02',
                icon: '📊',
                title: 'Benchmark',
                subtitle: 'S\'inspirer des meilleurs',
                items: [
                  'Amazon Rufus (IA shopping)',
                  'Klarna AI Assistant',
                  'ChatGPT Shopping plugins'
                ]
              },
              {
                step: '03',
                icon: '✏️',
                title: 'Design',
                subtitle: 'Concevoir l\'expérience',
                items: [
                  'Parcours conversationnel guidé',
                  'Quick replies pour fluidité',
                  'Cross-sell intelligent'
                ]
              },
              {
                step: '04',
                icon: '🚀',
                title: 'Prototype',
                subtitle: 'Valider rapidement',
                items: [
                  'Stack moderne (Next.js + Claude)',
                  'Déploiement Vercel',
                  'Itérations basées sur le feedback'
                ]
              }
            ].map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#ff6b00]/50 to-transparent z-0" />
                )}

                <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl p-6 border border-[#2a2a2a] hover:border-[#ff6b00]/50 transition-all h-full">
                  {/* Step number */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{phase.icon}</span>
                    <div>
                      <span className="text-xs text-[#ff6b00] font-mono">{phase.step}</span>
                      <h3 className="font-bold text-lg">{phase.title}</h3>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mb-4">{phase.subtitle}</p>

                  <ul className="space-y-2">
                    {phase.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-[#ff6b00] mt-1">›</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Skills demonstrated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] rounded-2xl p-8 border border-[#2a2a2a]"
          >
            <h3 className="text-xl font-bold mb-6 text-center">Compétences démontrées</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { skill: 'Product Discovery', icon: '🔍', desc: 'Identifier le bon problème à résoudre' },
                { skill: 'Prompt Engineering', icon: '🤖', desc: 'Conception de prompts IA efficaces' },
                { skill: 'UX Conversationnel', icon: '💬', desc: 'Design de parcours chatbot' },
                { skill: 'Prototypage IA', icon: '⚡', desc: 'POC fonctionnel avec LLM' },
                { skill: 'Cadrage Besoin', icon: '🎯', desc: 'Traduire un besoin métier en solution' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <h4 className="font-semibold text-[#ff6b00] mb-1 text-sm">{item.skill}</h4>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* How it works - Version simplifiée */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold">Testez l&apos;expérience</h2>
              <p className="text-gray-400 text-sm mt-1">Remontez dans le chat et essayez le parcours d&apos;achat</p>
            </div>
            <div className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] px-4 py-2 rounded-full text-sm">
              <span className="text-[#ff6b00]">💻</span>
              <span className="text-gray-400">IA entraînée sur le rayon <span className="text-white font-medium">Informatique</span></span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Décrivez votre besoin', desc: 'Ex: "Je cherche un PC gaming" ou "Un Mac pour développer"' },
              { step: '2', title: 'Répondez aux questions', desc: "L'assistant qualifie votre besoin : usage, budget, préférences" },
              { step: '3', title: 'Recevez vos recommandations', desc: 'Produits personnalisés avec cross-sell intelligent' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#2a2a2a]"
              >
                <div className="w-12 h-12 bg-[#ff6b00] rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trust badges */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: '🚚', label: 'Livraison gratuite', sub: 'Dès 20€ d\'achat' },
              { icon: '↩️', label: 'Retours faciles', sub: '30 jours pour changer d\'avis' },
              { icon: '🛡️', label: 'Garantie 2 ans', sub: 'Sur tous les produits' },
              { icon: '🏪', label: '200+ magasins', sub: 'Retrait 1h en magasin' },
            ].map((badge, index) => (
              <div key={index} className="text-gray-400">
                <span className="text-3xl mb-2 block">{badge.icon}</span>
                <p className="font-medium text-white text-sm">{badge.label}</p>
                <p className="text-xs">{badge.sub}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
