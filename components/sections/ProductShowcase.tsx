'use client';

import { motion } from 'framer-motion';
import { products } from '@/lib/data/products';
import ProductCard from '../ui/ProductCard';
import SectionHeading from '../ui/SectionHeading';
import { staggerContainer } from '@/lib/utils/animations';

export default function ProductShowcase() {
  return (
    <section className="py-24 md:py-32 bg-off-white">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          title="The Royal Collection"
          subtitle="Shop Our Signatures"
        />
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
