'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    // Simule le paiement
    setTimeout(() => {
      router.push('/confirmation');
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-4">Votre panier est vide</h1>
        <Link href="/" className="text-[#ff6b00] hover:underline">Retour à l'accueil</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Header */}
      <header className="p-6 flex justify-between items-center border-b border-[#1a1a1a]">
        <Link href="/" className="flex items-center">
          <Image src="/logo-boulanger.png" alt="Boulanger" width={140} height={40} className="h-8 w-auto" />
        </Link>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="text-green-500">🔒</span>
          Paiement sécurisé
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Récap commande */}
          <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#2a2a2a] mb-6">
            <h2 className="font-semibold text-lg mb-4">Récapitulatif</h2>

            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.product.id} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#0a0a0a] rounded-lg flex items-center justify-center text-2xl">
                    {item.product.image}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium truncate">{item.product.name}</p>
                    <p className="text-xs text-gray-500">Qté: {item.quantity}</p>
                  </div>
                  <p className="text-[#ff6b00] font-medium">{item.product.price * item.quantity}€</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-[#2a2a2a]">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Sous-total</span>
                <span>{total}€</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Livraison</span>
                <span className="text-green-500">Gratuite</span>
              </div>
              <div className="flex justify-between text-2xl font-bold pt-3 border-t border-[#2a2a2a]">
                <span>Total</span>
                <span className="text-[#ff6b00]">{total}€</span>
              </div>
            </div>
          </div>

          {/* Bouton Payer */}
          <motion.button
            onClick={handlePay}
            disabled={isProcessing}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-5 rounded-2xl font-semibold text-xl transition-all ${
              isProcessing
                ? 'bg-[#1a1a1a] cursor-wait'
                : 'bg-[#ff6b00] hover:bg-[#cc5500]'
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin w-6 h-6" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Paiement en cours...
              </span>
            ) : (
              `Payer ${total}€`
            )}
          </motion.button>

          <Link href="/cart" className="block text-center text-gray-500 hover:text-white mt-4 text-sm transition-colors">
            ← Retour au panier
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
