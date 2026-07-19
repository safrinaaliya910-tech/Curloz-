'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/cartStore';
import CopperButton from './CopperButton';

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, getCartTotal } = useCartStore();

  const handleCheckout = () => {
    alert("Thank you for your interest! Checkout is coming soon.");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal/40 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-[450px] bg-off-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-copper/20">
              <h2 className="font-serif text-2xl text-charcoal flex items-center gap-3">
                <ShoppingBag size={24} className="text-copper" />
                Your Cart
              </h2>
              <button
                onClick={closeCart}
                className="text-charcoal/60 hover:text-copper transition-colors p-2"
                aria-label="Close cart"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-charcoal/60">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="font-sans">Your cart is empty.</p>
                  <CopperButton onClick={closeCart} className="mt-4">
                    Continue Shopping
                  </CopperButton>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 p-4 bg-white shadow-sm border border-charcoal/5">
                      {/* Image */}
                      <div className="relative w-20 h-24 bg-off-white shrink-0 flex items-center justify-center">
                        <Image
                          src={item.product.imagePath}
                          alt={item.product.name}
                          fill
                          style={{ objectFit: 'contain' }}
                          className="p-2 mix-blend-multiply"
                        />
                      </div>
                      
                      {/* Details */}
                      <div className="flex flex-col flex-1 py-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-serif text-lg text-charcoal leading-tight">{item.product.name}</h3>
                            <p className="font-sans text-[10px] tracking-widest uppercase text-charcoal/60 mt-1">
                              {item.product.subtitle}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-charcoal/40 hover:text-red-500 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between mt-auto">
                          {/* Quantity Selector */}
                          <div className="flex items-center border border-charcoal/20">
                            <button
                              onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                              className="px-2 py-1 text-charcoal/60 hover:text-copper transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="font-sans text-sm w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="px-2 py-1 text-charcoal/60 hover:text-copper transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-sans font-medium text-charcoal">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-copper/20 bg-white">
                <div className="flex justify-between items-center mb-6 text-charcoal font-serif text-xl">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <p className="font-sans text-xs text-charcoal/60 text-center mb-6">
                  Shipping & taxes calculated at checkout
                </p>
                <CopperButton onClick={handleCheckout} className="w-full">
                  Checkout
                </CopperButton>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
