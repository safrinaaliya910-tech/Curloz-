'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Droplet, Sparkles, Wind } from 'lucide-react';
import { products } from '@/lib/data/products';
import SectionHeading from '../ui/SectionHeading';

const previewSteps = [
  { icon: Droplet, label: 'Cleanse' },
  { icon: Sparkles, label: 'Condition' },
  { icon: Wind, label: 'Define' },
];

const steps = [
  {
    id: 1,
    number: '01',
    title: 'Step 1: Cleanse',
    product: products[0], // Shampoo
    description: 'Thoroughly wet hair. Apply the Moisturizing & Defining Shampoo to your scalp and massage gently to create a rich lather. Draw the lather down the lengths of your hair. Rinse completely.',
  },
  {
    id: 2,
    number: '02',
    title: 'Step 2: Condition',
    product: products[1], // Conditioner
    description: 'After cleansing, apply a generous amount of Nourishing & Detangling Conditioner from mid-lengths to ends. Use your fingers or a wide-tooth comb to gently detangle. Leave for 3-5 minutes before rinsing.',
  },
  {
    id: 3,
    number: '03',
    title: 'Step 3: Define',
    product: products[2], // Curl Cream
    description: 'On soaking wet or damp hair, apply the Ultra-Defining Curl Cream in sections. Smooth down each section to encourage curl clumping. Scrunch upwards and allow to air dry or diffuse.',
  }
];

export default function UsageSteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !leftColRef.current || !rightColRef.current) return;

    const sections = gsap.utils.toArray('.step-section') as HTMLElement[];

    // Pin the left column (product image view)
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: leftColRef.current,
    });

    // Update active step based on scroll
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveStep(index),
        onEnterBack: () => setActiveStep(index),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="bg-off-white pb-32">
      <div className="pt-32 pb-16">
        <SectionHeading 
          title="The Royal Routine"
          subtitle="How to Use"
        />

        {/* Intro copy + step preview strip — fills the space before the pinned routine begins */}
        <div className="container mx-auto px-6 md:px-12 max-w-2xl text-center mt-10">
          <p className="font-sans text-charcoal/60 leading-relaxed mb-10">
            Three simple steps stand between you and your best curls. Follow the Royal
            Routine below to cleanse, condition, and define — in that order, every time.
          </p>

          <div className="flex items-center justify-center gap-4 sm:gap-8">
            {previewSteps.map((step, index) => (
              <div key={step.label} className="flex items-center gap-4 sm:gap-8">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full border border-copper/30 flex items-center justify-center bg-copper/5">
                    <step.icon size={18} className="text-copper" strokeWidth={1.5} />
                  </div>
                  <span className="font-sans text-[11px] tracking-[0.15em] uppercase text-charcoal/50">
                    {step.label}
                  </span>
                </div>
                {index < previewSteps.length - 1 && (
                  <div className="w-8 sm:w-12 h-px bg-charcoal/15 mt-[-20px]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div ref={containerRef} className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row relative items-start">
        {/* Left Column - Pinned Product Image View */}
        <div ref={leftColRef} className="hidden md:flex w-1/2 h-screen sticky top-0 items-center justify-center overflow-hidden">
          
          {/* Giant decorative step numeral, watermark-style, behind everything */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {steps.map((step, index) => (
              <span
                key={step.id}
                className={`absolute font-serif text-[42vh] leading-none text-charcoal transition-all duration-700 ease-in-out select-none ${
                  activeStep === index ? 'opacity-[0.04]' : 'opacity-0'
                }`}
              >
                {step.number}
              </span>
            ))}
          </div>

          {/* Soft radial pedestal glow beneath the product */}
          <div className="absolute bottom-[12%] w-[380px] h-[380px] rounded-full bg-gradient-to-t from-copper/10 via-copper/5 to-transparent blur-3xl pointer-events-none" />

          {/* Thin ring / pedestal line to ground the product visually */}
          <div className="absolute bottom-[14%] w-[220px] h-[220px] rounded-full border border-copper/15 pointer-events-none" />

          <div className="relative w-full h-[75%] flex items-center justify-center">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out flex items-center justify-center ${
                  activeStep === index ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-95'
                }`}
              >
                <div className="relative w-[62%] h-[78%]">
                  <Image
                    src={step.product.imagePath}
                    alt={step.product.name}
                    fill
                    style={{ objectFit: 'contain' }}
                    className="drop-shadow-[0_35px_45px_rgba(60,40,20,0.22)]"
                    sizes="(max-width: 768px) 80vw, 35vw"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Step progress rail — bottom of the pinned column */}
          <div className="absolute bottom-10 flex items-center gap-3">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-3">
                <div
                  className={`h-[2px] transition-all duration-500 ${
                    activeStep === index ? 'w-10 bg-copper' : 'w-4 bg-charcoal/15'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Scrollable Text */}
        <div ref={rightColRef} className="w-full md:w-1/2 flex flex-col md:py-[20vh]">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className="step-section min-h-[70vh] flex flex-col justify-center relative pl-8 md:pl-16 border-l border-charcoal/10"
            >
              {/* Active Indicator Line */}
              <div 
                className={`absolute left-[-1px] w-[2px] h-full bg-copper transition-all duration-700 origin-top ${
                  activeStep === index ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
                }`} 
              />

              {/* Small step counter tag */}
              <div className="flex items-center gap-3 mb-6">
                <span className={`font-sans text-xs tracking-[0.3em] transition-colors duration-500 ${
                  activeStep === index ? 'text-copper' : 'text-charcoal/30'
                }`}>
                  {step.number} / {String(steps.length).padStart(2, '0')}
                </span>
                <span className={`h-px flex-1 max-w-[60px] transition-colors duration-500 ${
                  activeStep === index ? 'bg-copper/40' : 'bg-charcoal/10'
                }`} />
              </div>
              
              <h2 className={`font-serif text-4xl md:text-5xl mb-4 transition-colors duration-500 ${activeStep === index ? 'text-copper' : 'text-charcoal/40'}`}>
                {step.title}
              </h2>
              <h3 className={`font-sans tracking-widest uppercase text-sm mb-6 transition-colors duration-500 ${activeStep === index ? 'text-charcoal' : 'text-charcoal/40'}`}>
                {step.product.name}
              </h3>
              <p className={`font-sans text-lg leading-relaxed transition-colors duration-500 max-w-md ${activeStep === index ? 'text-charcoal/80' : 'text-charcoal/40'}`}>
                {step.description}
              </p>

              {/* Mobile-only product image (since left column is hidden on mobile) */}
              <div className="md:hidden relative w-full h-[280px] mt-10">
                <Image
                  src={step.product.imagePath}
                  alt={step.product.name}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="drop-shadow-[0_25px_35px_rgba(60,40,20,0.2)]"
                  sizes="80vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}