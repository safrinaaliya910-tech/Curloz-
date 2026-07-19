'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Plus, Check } from 'lucide-react';
import { Product } from '@/lib/data/products';
import { useCartStore } from '@/lib/store/cartStore';
import InteractiveProductImage from '@/components/3d/InteractiveProductImage';
import CopperButton from '@/components/ui/CopperButton';
import PageTransition from '@/components/layout/PageTransition';

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addItem, items, openCart } = useCartStore();
  const cartItem = items.find((item) => item.product.id === product.id);

  const handleAddToCart = () => {
    addItem(product);
    openCart();
  };

  return (
    <PageTransition>
      <section className="pt-8 pb-24 md:pb-32 bg-off-white min-h-screen flex items-center">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center min-h-[70vh]">
            
            {/* Interactive Product Viewer — uses the REAL product image, drag/hover to tilt */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 h-[500px] lg:h-[700px] relative bg-white border border-charcoal/5 rounded-sm overflow-hidden"
            >
              <div className="absolute top-6 left-6 z-10 text-xs tracking-widest uppercase text-charcoal/40 font-sans pointer-events-none">
                Interactive Viewer
              </div>
              <div className="absolute bottom-6 right-6 z-10 flex gap-2 pointer-events-none">
                <span className="bg-off-white/80 backdrop-blur-sm px-3 py-1 text-[10px] tracking-widest uppercase text-charcoal/60 rounded-full border border-charcoal/10">
                  Move to rotate
                </span>
              </div>

              <InteractiveProductImage
                image={product.imagePath}
                alt={product.name}
              />
            </motion.div>

            {/* Product Info */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 flex flex-col"
            >
              <span className="font-sans text-xs tracking-[0.3em] uppercase text-copper mb-4 block">
                {product.subtitle}
              </span>
              <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-4">
                {product.name}
              </h1>
              <p className="font-sans text-xl text-charcoal mb-8">${product.price}</p>
              
              <p className="font-sans text-charcoal/70 leading-relaxed mb-8">
                {product.description}
              </p>
              
              <div className="flex items-center gap-6 mb-12">
                <CopperButton onClick={handleAddToCart} className="flex-1">
                  {cartItem ? (
                    <span className="flex items-center gap-2">
                      <Check size={18} /> Added ({cartItem.quantity})
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Plus size={18} /> Add to Cart
                    </span>
                  )}
                </CopperButton>
                <span className="font-sans text-xs tracking-widest text-charcoal/50 uppercase border border-charcoal/10 px-4 py-3 bg-white">
                  {product.size}
                </span>
              </div>

              {/* Accordion-style details */}
              <div className="space-y-6 border-t border-charcoal/10 pt-8 mt-auto">
                <div>
                  <h3 className="font-serif text-xl text-charcoal mb-3 flex items-center gap-2">
                    <ShieldCheck size={20} className="text-copper" /> 
                    Key Ingredients
                  </h3>
                  <ul className="font-sans text-sm text-charcoal/70 space-y-2 pl-7 list-disc">
                    {product.ingredients.map((ingredient, idx) => (
                      <li key={idx}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-serif text-xl text-charcoal mb-3 flex items-center gap-2">
                    <ShieldCheck size={20} className="text-copper" /> 
                    Benefits
                  </h3>
                  <ul className="font-sans text-sm text-charcoal/70 space-y-2 pl-7 list-disc">
                    {product.benefits.map((benefit, idx) => (
                      <li key={idx}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>
    </PageTransition>
  );
}