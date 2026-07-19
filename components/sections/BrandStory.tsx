'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '../ui/SectionHeading';
import CopperButton from '../ui/CopperButton';

export default function BrandStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (imageRef.current && sectionRef.current) {
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative h-[600px] w-full overflow-hidden rounded-sm bg-off-white">
            <div ref={imageRef} className="absolute inset-0 -top-[10%] h-[120%] w-full">
              <Image
                src="/images/products/curloz-trio-lifestyle.png"
                alt="CURLOZ Collection"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          
          {/* Content Side */}
          <div className="flex flex-col items-start">
            <SectionHeading 
              title="The Crown You Never Take Off."
              subtitle="Our Philosophy"
              centered={false}
            />
            <div className="font-sans text-charcoal/80 space-y-6 mb-10 text-lg leading-relaxed max-w-xl">
              <p>
                We believe that every curl is a crown, deserving of the utmost care, precision, and luxury. CURLOZ was born from the desire to elevate natural hair care to a premium experience.
              </p>
              <p>
                Formulated with pure, restorative ingredients and encased in packaging inspired by royal aesthetics, our collection is designed to define, nourish, and celebrate your natural texture.
              </p>
            </div>
            <CopperButton href="/about">
              Discover Our Story
            </CopperButton>
          </div>
        </div>
      </div>
    </section>
  );
}
