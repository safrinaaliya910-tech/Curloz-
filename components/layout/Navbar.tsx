'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { useCartStore } from '@/lib/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Shop', href: '/shop' },
  { name: 'Usage Guide', href: '/usage' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { toggleCart, items } = useCartStore();

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/70 backdrop-blur-xl border-b border-charcoal/5 py-4 shadow-sm' 
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        {/* 1. Added "container mx-auto" here to strictly match the Hero section grid */}
        <div className="container mx-auto w-full px-6 md:px-16 flex items-center justify-between">
          
          {/* 2. Logo (Left) - Added lg:pl-12 xl:pl-20 to perfectly align vertically with "THE CROWN" */}
          <div className="flex items-center flex-1 lg:pl-12 xl:pl-20">
            <Link href="/" className="group flex items-center gap-2.5 transition-transform duration-300 hover:scale-[1.02]">
              
              {/* Crest Icon */}
              <div className="relative w-10 h-10 md:w-11 md:h-11 flex-shrink-0">
                <Image
                  src="/images/logo/curloz-logo-full.png" 
                  alt="CURLOZ Crest"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
              
              {/* Typography Mark */}
              <div className="flex flex-col items-start justify-center pt-0.5">
                <span className="font-serif text-lg md:text-xl lg:text-[22px] text-[#8A4A11] leading-none tracking-[0.05em]">
                  CURLOZ
                </span>
                <span className="font-sans text-[7px] md:text-[8px] font-bold tracking-[0.35em] text-[#8A4A11]/80 mt-1 uppercase pl-0.5">
                  Curl Care
                </span>
              </div>

            </Link>
          </div>

          {/* Desktop Nav (Center) */}
          <nav className="hidden lg:flex items-center justify-center space-x-10 flex-[2]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative group font-sans text-[10px] md:text-[11px] font-medium tracking-[0.15em] uppercase text-charcoal py-2"
                >
                  <span className={`transition-colors duration-300 ${isActive ? 'text-charcoal' : 'text-charcoal/70 group-hover:text-copper'}`}>
                    {link.name}
                  </span>
                  
                  {/* Underline indicator */}
                  <span 
                    className={`absolute left-0 -bottom-1 w-full h-[1px] bg-copper transition-transform duration-300 origin-center ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Icon Cluster (Right) */}
          <div className="flex items-center justify-end space-x-5 md:space-x-7 flex-1">
            <button className="hidden md:flex text-charcoal/80 hover:text-copper transition-colors" aria-label="Search">
              <Search size={20} strokeWidth={1.5} />
            </button>
            
            <button className="hidden md:flex text-charcoal/80 hover:text-copper transition-colors" aria-label="Account">
              <User size={20} strokeWidth={1.5} />
            </button>
            
            <button
              onClick={toggleCart}
              className="relative text-charcoal/80 hover:text-copper transition-colors flex items-center"
              aria-label="Open cart"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-copper text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-sans font-medium shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            <button
              className="lg:hidden text-charcoal/80 hover:text-copper transition-colors ml-2"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-charcoal/20 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#FAF8F5] shadow-2xl flex flex-col p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-16">
                
                {/* Mobile Menu Logo */}
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2.5">
                  <div className="relative w-10 h-10 flex-shrink-0">
                    <Image
                      src="/images/logo/curloz-logo-full.png" 
                      alt="CURLOZ Crest"
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center pt-0.5">
                    <span className="font-serif text-xl text-[#8A4A11] leading-none tracking-[0.05em]">
                      CURLOZ
                    </span>
                    <span className="font-sans text-[7px] font-bold tracking-[0.35em] text-[#8A4A11]/80 mt-1 uppercase pl-0.5">
                      Curl Care
                    </span>
                  </div>
                </Link>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-charcoal hover:text-copper p-2 -mr-2 transition-colors"
                >
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>
              
              <nav className="flex flex-col space-y-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-sm tracking-[0.15em] uppercase font-sans font-medium ${
                      pathname === link.href ? 'text-copper' : 'text-charcoal hover:text-copper'
                    } transition-colors`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              
              <div className="mt-12 pt-8 border-t border-charcoal/10 flex items-center justify-start space-x-6">
                <button className="flex flex-col items-center gap-2 text-charcoal/60 hover:text-copper transition-colors">
                  <Search size={22} strokeWidth={1.5} />
                  <span className="text-[10px] tracking-widest uppercase">Search</span>
                </button>
                <button className="flex flex-col items-center gap-2 text-charcoal/60 hover:text-copper transition-colors">
                  <User size={22} strokeWidth={1.5} />
                  <span className="text-[10px] tracking-widest uppercase">Account</span>
                </button>
              </div>
              
              <div className="mt-auto pb-8 text-center text-xs font-sans tracking-widest text-charcoal/40 uppercase">
                Crowned by Curls
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}