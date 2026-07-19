'use client';

import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import TrustBadgeRow from '../ui/TrustBadgeRow';
import FeatureStripBar from '../ui/FeatureStripBar';

const HeroShowcase3D = dynamic(() => import('../3d/HeroShowcase3D'), { ssr: false });

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }
  }
};

export default function HomeHero() {
  return (
    <>
      <section className="relative w-full h-[100svh] min-h-[700px] max-h-[1000px] overflow-hidden bg-[#FAF8F5]">
        
        {/* 3D Showcase */}
        <div className="absolute inset-0 w-full h-full z-0">
          <HeroShowcase3D />
        </div>
        
        {/* Soft gradient mask to ensure text is legible over the showcase */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/95 to-transparent w-full lg:w-[58%] z-0 pointer-events-none" />

        {/* Content Foreground (Left Column) */}
        <div className="container relative z-10 mx-auto px-6 md:px-16 h-full flex flex-col pointer-events-none">
          
          {/* Spacer for fixed Navbar */}
          <div className="h-[80px] md:h-[100px] shrink-0" />
          
          {/* Main Text Content */}
          <div className="flex-1 flex flex-col justify-center max-w-[550px] lg:ml-12 xl:ml-20 pointer-events-auto pb-[40px] md:pb-[100px]">
            
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col items-start text-left w-full">
              
              {/* Micro-copy label */}
              <motion.div variants={itemVariants} className="flex items-center justify-start gap-5 mb-6">
                <div className="w-10 h-px bg-copper/40"></div>
                <span className="font-sans text-[9px] md:text-[10px] font-semibold tracking-[0.2em] uppercase text-copper text-center">
                  Premium Curl Care
                </span>
                <div className="w-10 h-px bg-copper/40"></div>
              </motion.div>

              {/* Headline */}
              <motion.h1 
                variants={itemVariants}
                className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6"
              >
                <span className="block text-charcoal mb-1 uppercase tracking-wide">The Crown</span>
                <span className="block text-copper uppercase tracking-wide">You Deserve</span>
              </motion.h1>
              
              {/* Divider */}
              <motion.div variants={itemVariants} className="w-12 h-[1px] bg-copper/30 mb-6" />
              
              {/* Body Copy */}
              <motion.p
                variants={itemVariants}
                className="font-sans text-sm md:text-base text-charcoal/70 mb-8 max-w-sm leading-relaxed"
              >
                Scientifically crafted formulas. Luxurious nourishment. Effortless definition. Because your curls deserve royalty.
              </motion.p>
              
              {/* CTAs */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4 w-full mb-4">
                <Link href="/shop" className="group w-full sm:w-auto relative inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-3.5 bg-copper text-white rounded-full font-sans text-[9px] md:text-[10px] font-semibold tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[#A36224] shadow-md hover:shadow-lg hover:-translate-y-[1px]">
                  <span>Discover Collection</span>
                  <ArrowRight size={14} className="ml-3 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>

              {/* Trust Badges */}
              <div className="w-full flex justify-start">
                <TrustBadgeRow />
              </div>

            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-28 left-6 md:left-16 flex flex-col items-center text-charcoal/50 gap-4 pointer-events-auto hidden lg:flex"
        >
          <div className="w-px h-12 bg-charcoal/20 relative overflow-hidden">
            <motion.div 
              className="w-full h-full bg-copper absolute top-0 left-0"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* Feature Strip — overlaid on desktop only (md:absolute inside FeatureStripBar itself) */}
        <div className="hidden md:block">
          <FeatureStripBar />
        </div>
      </section>

      {/* On mobile, the strip sits in normal flow right after the hero instead of overlapping it,
          so it never gets clipped or cramped against the viewport edge */}
      <div className="md:hidden bg-[#FAF8F5] pb-10 -mt-2">
        <FeatureStripBar />
      </div>
    </>
  );
}