'use client';

import { motion } from 'framer-motion';
import { Bot, Zap, Clock, ThumbsUp, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import ChatInterface from '@/components/chat/ChatInterface';
import { categories } from '@/data/categories';

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#003366] via-[#004488] to-[#003366] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-[#ff6600] text-white px-4 py-2 rounded-full text-sm mb-6">
                <Sparkles size={16} />
                Nouveau : Shopping Agent IA
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Trouvez le produit idéal en{' '}
                <span className="text-[#ff6600]">moins de 5 minutes</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Notre assistant intelligent analyse vos besoins et vous recommande
                les meilleurs produits avec l&apos;expertise Boulanger.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#ff6600]">5 min</div>
                  <div className="text-sm text-gray-300">Temps moyen</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#ff6600]">95%</div>
                  <div className="text-sm text-gray-300">Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#ff6600]">24/7</div>
                  <div className="text-sm text-gray-300">Disponible</div>
                </div>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                <h3 className="font-semibold text-lg mb-4">Comment ça marche ?</h3>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#ff6600] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Décrivez votre besoin</p>
                    <p className="text-sm text-gray-300">Choisissez une catégorie ou décrivez librement</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#ff6600] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Répondez à quelques questions</p>
                    <p className="text-sm text-gray-300">L&apos;IA affine sa compréhension de vos attentes</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#ff6600] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Recevez des recommandations personnalisées</p>
                    <p className="text-sm text-gray-300">Avec les services Boulanger inclus</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chat Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <ChatInterface />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#003366] mb-8 text-center">
            Explorer par catégorie
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 rounded-xl p-6 text-center cursor-pointer hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="w-16 h-16 bg-[#003366] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Bot size={24} className="text-white" />
                </div>
                <h3 className="font-medium text-[#003366]">{category.name}</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{category.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why AI Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#003366] mb-8 text-center">
            Pourquoi un Shopping Agent IA ?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#ff6600] rounded-lg flex items-center justify-center mb-4">
                <Clock size={24} className="text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Gain de temps</h3>
              <p className="text-gray-600">
                Plus besoin de parcourir des centaines de produits. L&apos;IA filtre et recommande
                selon vos critères précis.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#ff6600] rounded-lg flex items-center justify-center mb-4">
                <ThumbsUp size={24} className="text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Expertise Boulanger</h3>
              <p className="text-gray-600">
                L&apos;IA intègre les conseils de nos meilleurs vendeurs et l&apos;expertise
                technique accumulée depuis 1954.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#ff6600] rounded-lg flex items-center justify-center mb-4">
                <Zap size={24} className="text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Services inclus</h3>
              <p className="text-gray-600">
                Livraison, installation, reprise, garantie... Tous les services Boulanger
                intégrés dans la recommandation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-[#003366] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à trouver votre produit idéal ?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Testez notre Shopping Agent IA et découvrez une nouvelle façon de faire du shopping.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-[#ff6600] hover:bg-[#e55a00] text-white px-8 py-4 rounded-full font-medium transition-colors"
            >
              Démarrer une conversation
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white hover:bg-white hover:text-[#003366] text-white px-8 py-4 rounded-full font-medium transition-colors"
            >
              Voir le Dashboard PO
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
