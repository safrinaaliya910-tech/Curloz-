'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product } from '@/lib/data/products';
import { useCartStore } from '@/lib/store/cartStore';
import CopperButton from './CopperButton';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const isDark = product.bottleColor === '#0D0B08';

  return (
    <motion.div
      className="group relative flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Link href={`/shop/${product.id}`} className="block relative aspect-[4/5] mb-6 overflow-hidden bg-off-white rounded-sm">
        {/* Soft glow that appears behind the product on hover */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 z-0 bg-gradient-to-t ${
            isDark ? 'from-charcoal/10 to-transparent' : 'from-copper/5 to-transparent'
          } ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Real product image — scales/lifts slightly on hover, never swapped out */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center p-8"
          animate={{
            scale: isHovered ? 1.06 : 1,
            y: isHovered ? -6 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image
            src={product.imagePath}
            alt={product.name}
            fill
            style={{ objectFit: 'contain' }}
            className="p-8 mix-blend-multiply"
          />
        </motion.div>
      </Link>

      <div className="flex flex-col flex-1 text-center px-4">
        <Link href={`/shop/${product.id}`} className="group-hover:text-copper transition-colors">
          <h3 className="font-serif text-2xl mb-1 text-charcoal tracking-wide">{product.name}</h3>
        </Link>
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-charcoal/60 mb-4">{product.subtitle}</p>
        <p className="font-sans text-sm text-charcoal/80 mb-6 flex-1 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-sans font-medium text-lg text-charcoal">${product.price}</span>
          <CopperButton 
            onClick={() => addItem(product)} 
            className="!py-2 !px-4 !text-xs !tracking-wider"
          >
            Add to Cart
          </CopperButton>
        </div>
      </div>
    </motion.div>
  );
}