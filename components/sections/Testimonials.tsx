'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const testimonials = [
  {
    quote: "I've tried everything for my curls, but CURLOZ is on another level. The Moisture & Defining Shampoo leaves my hair feeling like silk.",
    author: "Elena R.",
    role: "Verified Buyer"
  },
  {
    quote: "The Ultra-Defining Curl Cream is absolute magic. It gives me the perfect balance of hold and touchable softness without any crunch.",
    author: "Marcus T.",
    role: "Verified Buyer"
  },
  {
    quote: "Finally, a luxury brand that understands textured hair. The packaging is gorgeous, and the results are even better.",
    author: "Sarah J.",
    role: "Verified Buyer"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 md:py-32 bg-charcoal text-off-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          title="The Royal Court"
          subtitle="Client Testimonials"
          light
        />

        <div className="max-w-4xl mx-auto relative h-[250px] flex items-center justify-center">
          <Quote size={120} className="absolute text-copper/10 top-0 left-1/2 -translate-x-1/2 -z-10" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-center absolute w-full"
            >
              <p className="font-serif text-2xl md:text-4xl text-off-white leading-snug mb-8">
                "{testimonials[currentIndex].quote}"
              </p>
              <div className="flex flex-col items-center">
                <span className="font-sans font-medium text-copper tracking-widest uppercase text-sm mb-1">
                  {testimonials[currentIndex].author}
                </span>
                <span className="font-sans text-xs text-off-white/50 uppercase tracking-widest">
                  {testimonials[currentIndex].role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="flex justify-center mt-12 gap-3">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-px transition-all duration-300 ${
                idx === currentIndex ? 'w-12 bg-copper' : 'w-6 bg-off-white/30 hover:bg-off-white/60'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
