'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';

export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, total, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <header className="p-6 flex justify-between items-center border-b border-[#1a1a1a]">
          <Link href="/" className="flex items-center">
            <Image src="/logo-boulanger.png" alt="Boulanger" width={140} height={40} className="h-8 w-auto" />
          </Link>
        </header>

        <div className="flex flex-col items-center justify-center py-32">
          <span className="text-6xl mb-6">🛒</span>
          <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
          <p className="text-gray-500 mb-8">Commencez une conversation pour trouver vos produits</p>
          <Link href="/" className="px-6 py-3 bg-[#ff6b00] hover:bg-[#cc5500] rounded-xl font-medium transition-colors">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="p-6 flex justify-between items-center border-b border-[#1a1a1a]">
        <Link href="/" className="flex items-center">
          <Image src="/logo-boulanger.png" alt="Boulanger" width={140} height={40} className="h-8 w-auto" />
        </Link>
        <div className="text-sm text-gray-500">{itemCount} article{itemCount > 1 ? 's' : ''}</div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Mon Panier</h1>

        <div className="space-y-4 mb-8">
          {items.map((item, index) => (
            <motion.div
              key={item.product.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#2a2a2a]"
            >
              <div className="flex gap-4">
                <div className="text-4xl">{item.product.image}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.product.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{item.product.description}</p>
                  <p className="text-[#ff6b00] text-xl font-bold mt-2">{item.product.price}€</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-gray-500 hover:text-red-500 transition-colors self-start"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#2a2a2a]">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-400">
              <span>Sous-total</span>
              <span>{total}€</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Livraison</span>
              <span className="text-green-500">Gratuite</span>
            </div>
            <div className="border-t border-[#2a2a2a] pt-4 flex justify-between text-2xl font-bold">
              <span>Total</span>
              <span className="text-[#ff6b00]">{total}€</span>
            </div>
          </div>

          <button
            onClick={() => router.push('/checkout')}
            className="w-full py-4 bg-[#ff6b00] hover:bg-[#cc5500] rounded-xl font-semibold text-lg transition-colors"
          >
            Passer commande
          </button>

          <Link href="/" className="block text-center text-gray-500 hover:text-white mt-4 text-sm transition-colors">
            ← Continuer mes achats
          </Link>
        </div>
      </main>
    </div>
  );
}
