'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Product } from '@/lib/data/products';
import { useCartStore } from '@/lib/store/cartStore';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents navigating to the product page when clicking "Add to Cart"
    addItem(product);
    openCart();
  };

  return (
    <Link href={`/shop/${product.id}`} className="group block h-full">
      {/* 
        CARD CONTAINER: Added a luxurious soft gradient background, 
        reduced padding slightly, and added a delicate permanent copper border. 
      */}
      <div className="relative h-full flex flex-col items-center p-5 md:p-6 rounded-2xl bg-gradient-to-b from-white via-white to-[#FCF9F5] border border-copper/10 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(184,114,45,0.2)] hover:border-copper/30">
        
        {/* 
          IMAGE CONTAINER: Fixed height at 240px to keep the card compact 
          and ensure everything fits in a single view! 
        */}
        <div className="relative w-full h-[240px] mb-5 flex items-center justify-center">
          
          {/* Subtle warm spotlight that appears on hover */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#F9D4A6_0%,_transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-20 z-0" />
          
          {/* Tighter Floor Shadow under the bottle */}
          <div className="absolute bottom-[2%] left-[25%] w-[50%] h-[10px] rounded-[50%] bg-[radial-gradient(ellipse,_rgba(60,45,30,0.15)_0%,_transparent_70%)] blur-[4px] z-0 transition-opacity duration-500 group-hover:opacity-40" />
          
          <motion.div 
            className="relative w-[75%] h-[90%] z-10"
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* The bottle floats slightly on hover */}
            <Image
              src={product.imagePath}
            alt={product.name}
              fill
              className="object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </motion.div>
        </div>

        {/* --- Tightly Grouped Text Content --- */}
        <div className="flex flex-col items-center text-center flex-1 w-full">
          
          {/* Subtitle (Tiny, widely spaced) */}
          <span className="font-sans text-[8px] tracking-[0.25em] uppercase text-copper mb-2">
            {product.subtitle}
          </span>
          
          {/* Main Title */}
          <h3 className="font-serif text-2xl text-charcoal mb-3 transition-colors group-hover:text-copper">
            {product.name}
          </h3>
          
          {/* Description (Strictly clamped to 2 lines to save space) */}
          <p className="font-sans text-[11px] md:text-xs text-charcoal/60 leading-relaxed mb-5 line-clamp-2 px-2">
            {product.description}
          </p>
          
          {/* Push price and button to the bottom so all cards align perfectly */}
          <div className="mt-auto w-full flex flex-col items-center">
            <p className="font-sans text-lg text-charcoal mb-4">
              ${product.price}
            </p>
            
            {/* Sleek Pill Button */}
            <button 
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full border border-copper/40 bg-transparent text-copper font-sans text-[9px] tracking-[0.15em] uppercase transition-all duration-300 hover:bg-copper hover:border-copper hover:text-white hover:shadow-lg"
            >
              <Plus size={14} />
              Add to Cart
            </button>
          </div>

        </div>
      </div>
    </Link>
  );
}