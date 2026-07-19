'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, useSpring, MotionValue } from 'framer-motion';
import CopperRingArc from './CopperRingArc';

interface ProductImageProps {
  src: string;
  name: string;
  className: string;
  productHeight: string;
  pedestalHeight: string;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  delayOffset: number;
}

function InteractiveProductWithPedestal({ src, name, className, productHeight, pedestalHeight, mouseX, mouseY, delayOffset }: ProductImageProps) {
  const [hovered, setHovered] = useState(false);

  const rawRotateX = useTransform(mouseY, [0, 1], [15, -15]);
  const rawRotateY = useTransform(mouseX, [0, 1], [-15, 15]);

  const rotateX = useSpring(rawRotateX, { stiffness: 100, damping: 30 });
  const rotateY = useSpring(rawRotateY, { stiffness: 100, damping: 30 });

  return (
    <div className={`absolute z-30 flex flex-col items-center justify-end ${className}`}>

      {/* Tooltip */}
      <div
        className="absolute top-[-30px] left-1/2 -translate-x-1/2 bg-charcoal/90 backdrop-blur-md px-3 py-1.5 rounded text-[10px] tracking-widest text-off-white uppercase whitespace-nowrap shadow-xl border border-copper/20 pointer-events-none z-50 transition-all duration-300"
        style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translate(-50%, -10px)' : 'translate(-50%, 0)' }}
      >
        {name}
      </div>

      {/* Product Image Container */}
      <motion.div
        className="relative w-[120%] flex items-end justify-center origin-bottom z-10 cursor-pointer"
        style={{ rotateX, rotateY, perspective: 1000, height: productHeight }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{
          y: hovered ? -10 : [0, -5, 0],
          scale: hovered ? 1.05 : 1
        }}
        transition={{
          y: hovered ? { type: 'spring', stiffness: 200, damping: 20 } : { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: delayOffset },
          scale: { type: 'spring', stiffness: 200, damping: 20 }
        }}
      >
        {/* Soft, realistic drop shadow */}
        <div
          className="absolute -bottom-[4%] left-[15%] w-[70%] h-[10%] rounded-[50%] -z-10"
          style={{
            background: 'radial-gradient(ellipse, rgba(60,45,30,0.22) 0%, rgba(60,45,30,0.1) 55%, transparent 80%)',
            filter: 'blur(9px)'
          }}
        />

        {/* Product Glow on hover */}
        <div
          className="absolute inset-0 bg-copper/10 blur-[30px] rounded-full -z-10 transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        />

        <Image
          src={src}
          alt={name}
          fill
          style={{ objectFit: 'contain', objectPosition: 'bottom center' }}
          priority
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </motion.div>

      {/* Pedestal — neat marble block, CSS-only so it always renders */}
      <div className="relative w-full flex flex-col mt-[-4px] z-0" style={{ height: pedestalHeight }}>

        <div
          className="absolute w-full h-[22%] top-0 left-0 rounded-[50%] z-10 border border-white/70 overflow-hidden isolate"
          style={{
            background: 'radial-gradient(ellipse at 35% 30%, #FFFFFF 0%, #F2EFEA 45%, #E4DFD7 100%)',
            boxShadow: 'inset 0 -3px 10px rgba(0,0,0,0.06)'
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.18] mix-blend-multiply"
            style={{
              backgroundImage:
                'radial-gradient(circle at 25% 35%, rgba(120,110,100,0.5) 0%, transparent 25%), radial-gradient(circle at 72% 65%, rgba(120,110,100,0.4) 0%, transparent 20%), radial-gradient(circle at 50% 15%, rgba(150,140,130,0.3) 0%, transparent 15%)'
            }}
          />
        </div>

        <div
          className="absolute w-full h-[86%] bottom-[9%] left-0 z-0 overflow-hidden isolate"
          style={{
            background: 'linear-gradient(90deg, #D6D1C8 0%, #F5F2ED 20%, #FDFCFA 50%, #F0ECE6 80%, #C7C1B6 100%)',
            boxShadow: 'inset -18px 0 25px rgba(0,0,0,0.08), inset 14px 0 18px rgba(255,255,255,0.9)'
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.14] mix-blend-multiply"
            style={{
              backgroundImage:
                'linear-gradient(115deg, transparent 28%, rgba(140,130,120,0.45) 30%, transparent 33%), linear-gradient(100deg, transparent 55%, rgba(140,130,120,0.3) 57%, transparent 60%), linear-gradient(130deg, transparent 70%, rgba(150,140,128,0.25) 72%, transparent 75%)'
            }}
          />
        </div>

        <div
          className="absolute w-full h-[18%] bottom-0 left-0 rounded-[50%] z-0"
          style={{
            background: 'linear-gradient(90deg, #B6AFA5 0%, #E6E2DB 50%, #A7A098 100%)',
            boxShadow: '0 14px 26px rgba(0,0,0,0.12)'
          }}
        />

        <div
          className="absolute w-[102%] h-[7%] bottom-[-2%] left-[-1%] rounded-[50%] -z-10"
          style={{
            background: 'linear-gradient(90deg, #C2762F 0%, #F3C88E 50%, #A65A1E 100%)',
            boxShadow: '0 4px 12px rgba(184,114,45,0.3)'
          }}
        />
      </div>
    </div>
  );
}

/** Soft blurred, masked reflection of just the bottle/jar — no pedestal duplication,
 *  so it reads as a glass-floor reflection instead of a second stacked object. */
function GlassReflection({ src, className, height }: { src: string; className: string; height: string }) {
  return (
    <div className={`absolute ${className}`} style={{ height, transform: 'scaleY(-1)', transformOrigin: 'top' }}>
      <Image
        src={src}
        alt=""
        fill
        style={{ objectFit: 'contain', objectPosition: 'bottom center' }}
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    </div>
  );
}

export default function HeroShowcase3D() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const [particles] = useState(() =>
    [...Array(15)].map(() => ({
      width: Math.random() * 3 + 1 + 'px',
      height: Math.random() * 3 + 1 + 'px',
      top: Math.random() * 90 + 5 + '%',
      left: Math.random() * 50 + 50 + '%',
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2
    }))
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-end"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. Background layer: wavy drapery + warm glow + glass floor.
          Contrast and opacity pushed noticeably higher this pass — both
          elements should be unmistakably visible now, not a faint hint. */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Base warm cream color */}
        <div className="absolute inset-0 bg-[#FAF8F5]" />

        {/* Ambient glow — plain (no blend-mode dependency, so it can't get
            washed out by the base color underneath) */}
        <div className="absolute top-[12%] right-[6%] w-[60%] h-[65%] bg-[#F4C48A] blur-[120px] opacity-80 rounded-full" />

        {/* Wavy drapery background — strong, clearly visible copper/cream folds */}
        <div className="absolute inset-0 opacity-90 pointer-events-none">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full absolute inset-0">
            <path d="M0,0 Q30,60 50,20 T100,50 L100,100 L0,100 Z" fill="url(#draperyGradient1)" />
            <path d="M0,40 Q40,90 70,30 T100,80 L100,100 L0,100 Z" fill="url(#draperyGradient2)" />
            <path d="M-20,20 Q20,100 60,40 T120,70 L120,100 L-20,100 Z" fill="url(#draperyGradient1)" opacity="0.9" />
            <defs>
              <linearGradient id="draperyGradient1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                <stop offset="40%" stopColor="#F0B87E" stopOpacity="1" />
                <stop offset="100%" stopColor="#D08A46" stopOpacity="0.75" />
              </linearGradient>
              <linearGradient id="draperyGradient2" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                <stop offset="55%" stopColor="#FBEEDD" stopOpacity="1" />
                <stop offset="100%" stopColor="#C87F3E" stopOpacity="0.85" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Glass floor — a clearly defined reflective plane with visible
            boundary, not just a fade-to-nothing gradient */}
        <div
          className="absolute bottom-0 left-0 w-full h-[46%]"
          style={{
            background: 'linear-gradient(to bottom, rgba(250,248,245,0) 0%, rgba(240,232,222,0.55) 30%, rgba(235,227,216,0.88) 60%, #EFE7DB 100%)'
          }}
        />
        {/* Crisp copper floor-line — marks where the glass surface begins */}
        <div
          className="absolute bottom-[19%] left-0 w-full h-[2px]"
          style={{ background: 'linear-gradient(to right, transparent 2%, rgba(184,114,45,0.75) 50%, transparent 98%)' }}
        />
        {/* Glass highlight sweep so the surface visibly catches light */}
        <div className="absolute bottom-0 left-0 w-full h-[26%] bg-gradient-to-t from-white/60 via-white/20 to-transparent" />
      </div>

      {/* 2. Sparkle particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white shadow-[0_0_12px_4px_#F9D4A6]"
            style={{ width: p.width, height: p.height, top: p.top, left: p.left }}
            initial={{ opacity: 0.1, scale: 0.8 }}
            animate={{ opacity: [0.1, 0.9, 0.1], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* 3. Glass-floor reflections — clearly visible now, minimal blur so the
          bottle silhouettes read, aligned exactly under the real products */}
      <div className="absolute inset-0 flex items-center justify-end pointer-events-none z-20">
        <div className="relative w-full max-w-[700px] h-[80%] max-h-[800px] min-h-[500px] mr-[5%]">
          <div
            className="absolute top-full left-0 w-full h-[230px] opacity-[0.6] blur-[2px]"
            style={{
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0) 90%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0) 90%)'
            }}
          >
            <GlassReflection src="/images/products/curloz-shampoo-bottle.png" className="w-[28%] left-[10%] top-0" height="150px" />
            <GlassReflection src="/images/products/curloz-conditioner-bottle.png" className="w-[30%] left-[40%] top-0" height="140px" />
            <GlassReflection src="/images/products/curloz-curl-cream-jar.png" className="w-[30%] right-[2%] top-0" height="100px" />
          </div>
        </div>
      </div>

      {/* 4. Products + copper ring container */}
      <div className="relative w-full max-w-[700px] h-[80%] max-h-[800px] min-h-[500px] mr-[5%] pointer-events-none z-30">

        <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center">
          <CopperRingArc />
        </div>

        <InteractiveProductWithPedestal
          src="/images/products/curloz-shampoo-bottle.png"
          name="Moisturizing Shampoo"
          className="w-[28%] left-[10%] bottom-[30%] pointer-events-auto"
          productHeight="320px"
          pedestalHeight="160px"
          mouseX={mouseX}
          mouseY={mouseY}
          delayOffset={0}
        />

        <InteractiveProductWithPedestal
          src="/images/products/curloz-conditioner-bottle.png"
          name="Nourishing Conditioner"
          className="w-[30%] left-[40%] bottom-[22%] z-40 pointer-events-auto"
          productHeight="290px"
          pedestalHeight="90px"
          mouseX={mouseX}
          mouseY={mouseY}
          delayOffset={1.5}
        />

        <InteractiveProductWithPedestal
          src="/images/products/curloz-curl-cream-jar.png"
          name="Defining Curl Cream"
          className="w-[30%] right-[2%] bottom-[15%] z-50 pointer-events-auto"
          productHeight="180px"
          pedestalHeight="50px"
          mouseX={mouseX}
          mouseY={mouseY}
          delayOffset={3}
        />
      </div>
    </div>
  );
}