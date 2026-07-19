'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionHeading from '../ui/SectionHeading';
import { fadeInUp, staggerContainer } from '@/lib/utils/animations';

export default function AboutStory() {
  return (
    <section className="py-24 md:py-32 bg-off-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <SectionHeading 
              title="The Origin of Royalty"
              subtitle="Our Heritage"
              centered={false}
            />
            
            <motion.div variants={fadeInUp} className="space-y-6 font-sans text-charcoal/80 text-lg leading-relaxed">
              <p>
                CURLOZ was born from a singular vision: that textured hair deserves the same level of luxury, precision, and clinical efficacy as premium skincare.
              </p>
              <p>
                For too long, the narrative around curly hair has been about "taming" or "managing" it. We believe in elevating it. Our signature crest—a crowned C featuring a beautifully textured profile—symbolizes our core belief that your natural texture is your crowning glory.
              </p>
              <p>
                Every formula is meticulously crafted using the finest natural extracts and advanced polymer technology to ensure your curls are not just defined, but profoundly healthy and radiant.
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="mt-12 pt-12 border-t border-copper/20">
              <p className="font-serif text-3xl italic text-copper mb-4">
                "We don't just care for curls; we coronate them."
              </p>
              <p className="font-sans text-sm tracking-[0.2em] uppercase text-charcoal/60">
                — The CURLOZ Founders
              </p>
            </motion.div>
          </div>
          
          {/* Image */}
          <motion.div 
            variants={fadeInUp}
            className="order-1 lg:order-2 relative h-[500px] lg:h-[700px] w-full rounded-sm overflow-hidden"
          >
            <div className="absolute inset-0 bg-charcoal">
              <Image
                src="/images/logo/curloz-logo-full.png"
                alt="CURLOZ Logo Crest"
                fill
                style={{ objectFit: 'contain', filter: 'brightness(0) invert(1) opacity(0.1)' }}
                className="scale-150 rotate-12"
              />
            </div>
            <Image
              src="/images/products/curloz-trio-lifestyle.png"
              alt="CURLOZ Lifestyle"
              fill
              style={{ objectFit: 'cover' }}
              className="z-10 mix-blend-screen opacity-80"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-charcoal/80 via-transparent to-copper/20 z-20 mix-blend-multiply" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
