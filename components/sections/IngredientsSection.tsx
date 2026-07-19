'use client';

import { motion } from 'framer-motion';
import { Droplets, Sparkles, ShieldCheck } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { staggerContainer, fadeInUp } from '@/lib/utils/animations';

const features = [
  {
    icon: <Droplets size={32} strokeWidth={1} />,
    title: 'Deep Hydration',
    description: 'Infused with Argan Oil and Shea Butter to deliver lasting moisture that penetrates the hair shaft.'
  },
  {
    icon: <Sparkles size={32} strokeWidth={1} />,
    title: 'Flawless Definition',
    description: 'Advanced polymers provide touchable, flake-free hold that enhances your natural curl pattern.'
  },
  {
    icon: <ShieldCheck size={32} strokeWidth={1} />,
    title: 'Pure & Protected',
    description: 'Free from sulfates, parabens, and silicones. Formulated to protect against environmental damage.'
  }
];

export default function IngredientsSection() {
  return (
    <section className="py-24 md:py-32 bg-white border-t border-b border-copper/10 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-copper/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-copper/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading 
          title="The Alchemy of Curls"
          subtitle="Why Curloz"
        />

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={fadeInUp}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-full border border-copper/30 flex items-center justify-center text-copper mb-6 group-hover:bg-copper group-hover:text-white transition-all duration-500 shadow-[0_0_0_rgba(184,114,45,0)] group-hover:shadow-[0_0_20px_rgba(184,114,45,0.2)]">
                {feature.icon}
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-4">{feature.title}</h3>
              <div className="w-8 h-px bg-copper mb-4"></div>
              <p className="font-sans text-charcoal/70 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
