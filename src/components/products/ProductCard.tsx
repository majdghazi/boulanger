'use client';

import { motion } from 'framer-motion';
import { Star, Check, Truck, Shield, Recycle, ChevronRight, Sparkles } from 'lucide-react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
    >
      {/* Match score banner */}
      <div className="bg-gradient-to-r from-[#003366] to-[#004488] text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-[#ff6600]" />
          <span className="text-sm font-medium">Correspondance IA : {product.matchScore}%</span>
        </div>
        {product.matchScore >= 90 && (
          <span className="bg-[#ff6600] text-xs px-2 py-1 rounded-full">Recommandé</span>
        )}
      </div>

      <div className="p-4">
        <div className="flex gap-4">
          {/* Product image placeholder */}
          <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <div className="text-center text-gray-400">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-2"></div>
              <span className="text-xs">{product.brand}</span>
            </div>
          </div>

          {/* Product info */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#ff6600] font-medium">{product.brand}</p>
                <h3 className="font-bold text-gray-800">{product.name}</h3>
              </div>
              {product.energyClass && (
                <span className={`px-2 py-1 text-xs font-bold rounded ${
                  product.energyClass === 'A' ? 'bg-green-100 text-green-800' :
                  product.energyClass === 'B' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  Classe {product.energyClass}
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={14}
                    className={star <= Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} avis)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-2xl font-bold text-[#003366]">{product.price}€</span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-gray-400 line-through">{product.originalPrice}€</span>
                  <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">-{discount}%</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Caractéristiques clés :</p>
          <div className="flex flex-wrap gap-2">
            {product.features.slice(0, 4).map((feature, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Match reasons */}
        <div className="mt-4 bg-green-50 rounded-lg p-3">
          <p className="text-sm font-medium text-green-800 mb-2">Pourquoi ce produit vous correspond :</p>
          <ul className="space-y-1">
            {product.matchReasons.map((reason, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-green-700">
                <Check size={14} className="text-green-600" />
                {reason}
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="mt-4 flex flex-wrap gap-3">
          {product.services.map((service) => (
            <div key={service.id} className="flex items-center gap-1 text-xs text-gray-600">
              {service.name === 'Installation' && <Truck size={14} className="text-[#003366]" />}
              {service.name === 'Reprise ancien appareil' && <Recycle size={14} className="text-green-600" />}
              {service.name.includes('Garantie') && <Shield size={14} className="text-[#ff6600]" />}
              <span>{service.name}</span>
              {service.price > 0 && <span className="text-[#ff6600]">+{service.price}€</span>}
              {service.price === 0 && <span className="text-green-600">Gratuit</span>}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-4 flex gap-2">
          <button className="flex-1 bg-[#ff6600] hover:bg-[#e55a00] text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
            Voir le produit
            <ChevronRight size={18} />
          </button>
          <button className="px-4 py-3 border-2 border-[#003366] text-[#003366] rounded-lg font-medium hover:bg-[#003366] hover:text-white transition-colors">
            Comparer
          </button>
        </div>
      </div>
    </motion.div>
  );
}
