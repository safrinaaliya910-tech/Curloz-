'use client';

import { useState } from 'react';
import { products, ProductType } from '@/lib/data/products';
import ProductCard from '@/components/ui/ProductCard';
import SectionHeading from '@/components/ui/SectionHeading';
import PageTransition from '@/components/layout/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';

const filters: { label: string; value: ProductType | 'all' }[] = [
  { label: 'All Collection', value: 'all' },
  { label: 'Shampoo', value: 'shampoo' },
  { label: 'Conditioner', value: 'conditioner' },
  { label: 'Treatments', value: 'treatment' },
];

export default function Shop() {
  const [activeFilter, setActiveFilter] = useState<ProductType | 'all'>('all');

  const filteredProducts = products.filter(
    (product) => activeFilter === 'all' || product.type === activeFilter
  );

  return (
    <PageTransition>
      <section className="pt-12 pb-24 md:pb-32 bg-off-white min-h-screen">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-16">
            <SectionHeading title="The Collection" centered={true} />
            
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`px-6 py-2 rounded-full border text-xs tracking-widest uppercase transition-all duration-300 ${
                    activeFilter === filter.value
                      ? 'bg-copper border-copper text-white'
                      : 'bg-transparent border-charcoal/20 text-charcoal hover:border-copper hover:text-copper'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
