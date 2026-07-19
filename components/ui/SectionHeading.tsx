'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/utils/animations';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`mb-12 md:mb-16 ${centered ? 'text-center' : 'text-left'}`}
    >
      {subtitle && (
        <span className={`block font-sans text-xs tracking-[0.3em] uppercase mb-4 ${light ? 'text-copper-light' : 'text-copper'}`}>
          {subtitle}
        </span>
      )}
      <h2 className={`font-serif text-4xl md:text-5xl lg:text-6xl tracking-wide ${light ? 'text-off-white' : 'text-charcoal'}`}>
        {title}
      </h2>
      <div className={`mt-6 w-16 h-px ${centered ? 'mx-auto' : ''} ${light ? 'bg-off-white/20' : 'bg-charcoal/10'}`}></div>
    </motion.div>
  );
}
