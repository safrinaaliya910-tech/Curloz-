'use client';

import { motion } from 'framer-motion';
import { Crown, Sparkle, HeartHandshake } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { staggerContainer, fadeInUp } from '@/lib/utils/animations';

const values = [
  {
    title: 'Craft',
    icon: <Crown size={40} strokeWidth={1} />,
    description: 'Our formulations are the result of rigorous testing and uncompromising standards. We craft every product to perform beautifully on a diverse spectrum of curl patterns.'
  },
  {
    title: 'Purity',
    icon: <Sparkle size={40} strokeWidth={1} />,
    description: 'We prioritize clean, effective ingredients. Our blends rely on the natural potency of botanicals and oils, strictly avoiding harsh chemicals that strip or damage hair.'
  },
  {
    title: 'Royalty',
    icon: <HeartHandshake size={40} strokeWidth={1} />,
    description: 'We believe you should feel like royalty every time you use our products. From the tactile experience of our packaging to the intoxicating scent profiles, it is luxury in every drop.'
  }
];

export default function AboutValues() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          title="The Royal Decrees"
          subtitle="Our Core Values"
        />

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mt-16 max-w-6xl mx-auto"
        >
          {values.map((value, index) => (
            <motion.div 
              key={index} 
              variants={fadeInUp}
              className="flex flex-col items-center text-center p-8 bg-off-white rounded-sm border border-copper/10 hover:border-copper/40 transition-colors duration-500 group"
            >
              <div className="text-copper mb-8 transform group-hover:scale-110 transition-transform duration-500">
                {value.icon}
              </div>
              <h3 className="font-serif text-3xl text-charcoal mb-4">{value.title}</h3>
              <div className="w-12 h-px bg-copper mb-6 mx-auto"></div>
              <p className="font-sans text-charcoal/70 leading-relaxed text-sm lg:text-base">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
