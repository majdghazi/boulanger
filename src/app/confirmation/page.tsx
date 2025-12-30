'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useCart } from '@/app/context/CartContext';

export default function ConfirmationPage() {
  const { items, total, clearCart } = useCart();
  const [orderNumber] = useState(() => 'BLG-' + Math.random().toString(36).substring(2, 8).toUpperCase());
  const [orderDate] = useState(() => new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }));
  const [savedItems, setSavedItems] = useState(items);
  const [savedTotal, setSavedTotal] = useState(total);

  useEffect(() => {
    // Sauvegarde les items avant de vider le panier
    if (items.length > 0) {
      setSavedItems([...items]);
      setSavedTotal(total);
      clearCart();
    }
  }, []);

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="p-6 flex justify-center border-b border-[#1a1a1a]">
        <Link href="/" className="flex items-center">
          <Image src="/logo-boulanger.png" alt="Boulanger" width={140} height={40} className="h-8 w-auto" />
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          {/* Success */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>

          <h1 className="text-3xl font-bold mb-2">Paiement confirmé !</h1>
          <p className="text-gray-400 mb-8">Merci pour votre commande</p>

          {/* Order info */}
          <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#2a2a2a] text-left mb-6">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#2a2a2a]">
              <div>
                <p className="text-xs text-gray-500 uppercase">Commande</p>
                <p className="text-lg font-mono font-bold text-[#ff6b00]">{orderNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase">Date</p>
                <p className="font-medium">{orderDate}</p>
              </div>
            </div>

            {/* Produits commandés */}
            <div className="space-y-3 mb-6">
              <p className="text-sm text-gray-500 uppercase">Articles commandés</p>
              {savedItems.map(item => (
                <div key={item.product.id} className="flex items-center gap-4 p-3 bg-[#0a0a0a] rounded-xl">
                  <div className="text-2xl">{item.product.image}</div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.product.name}</p>
                    <p className="text-xs text-gray-500">Qté: {item.quantity}</p>
                  </div>
                  <p className="text-[#ff6b00] font-bold">{item.product.price * item.quantity}€</p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-4 border-t border-[#2a2a2a]">
              <span className="font-medium">Total payé</span>
              <span className="text-2xl font-bold text-[#ff6b00]">{savedTotal}€</span>
            </div>
          </div>

          {/* Prochaines étapes */}
          <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#2a2a2a] text-left mb-8">
            <p className="text-sm text-gray-500 uppercase mb-4">Prochaines étapes</p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Commande confirmée</p>
                  <p className="text-sm text-gray-500">Un email de confirmation vous a été envoyé</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#ff6b00] rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
                <div>
                  <p className="font-medium">Préparation en cours</p>
                  <p className="text-sm text-gray-500">Votre commande est en cours de préparation</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#2a2a2a] rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-gray-500">3</div>
                <div>
                  <p className="font-medium text-gray-400">Expédition</p>
                  <p className="text-sm text-gray-500">Vous recevrez un SMS avec le suivi</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#2a2a2a] rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-gray-500">4</div>
                <div>
                  <p className="font-medium text-gray-400">Livraison prévue</p>
                  <p className="text-sm text-gray-500">{formattedDeliveryDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button className="w-full py-4 bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-xl border border-[#2a2a2a] font-medium transition-colors">
              Suivre ma commande
            </button>
            <Link
              href="/"
              className="w-full py-4 bg-[#ff6b00] hover:bg-[#cc5500] rounded-xl font-medium transition-colors text-center"
            >
              Continuer mes achats
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
