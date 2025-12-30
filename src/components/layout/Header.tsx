'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, User, Search, Bot } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#003366] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold tracking-tight">
              <span className="text-white">BOULANGER</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-[#ff6600] transition-colors flex items-center gap-2">
              <Bot size={18} />
              Shopping Agent
            </Link>
            <Link href="/categories" className="hover:text-[#ff6600] transition-colors">
              Catégories
            </Link>
            <Link href="/services" className="hover:text-[#ff6600] transition-colors">
              Services
            </Link>
            <Link href="/dashboard" className="hover:text-[#ff6600] transition-colors">
              Dashboard PO
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 hover:bg-[#002244] rounded-full transition-colors">
              <Search size={20} />
            </button>
            <button className="p-2 hover:bg-[#002244] rounded-full transition-colors">
              <User size={20} />
            </button>
            <button className="p-2 hover:bg-[#002244] rounded-full transition-colors relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-[#ff6600] text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-[#002244]">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="hover:text-[#ff6600] transition-colors flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Bot size={18} />
                Shopping Agent
              </Link>
              <Link
                href="/categories"
                className="hover:text-[#ff6600] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Catégories
              </Link>
              <Link
                href="/services"
                className="hover:text-[#ff6600] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/dashboard"
                className="hover:text-[#ff6600] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard PO
              </Link>
            </div>
          </nav>
        )}
      </div>

      {/* AI Status Bar */}
      <div className="bg-[#002244] py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2 text-sm">
          <div className="relative">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full pulse-ring"></div>
          </div>
          <span>Shopping Agent IA actif</span>
          <span className="text-[#ff6600]">•</span>
          <span>Trouvez le produit idéal en moins de 5 minutes</span>
        </div>
      </div>
    </header>
  );
}
