'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface InteractiveProductImageProps {
  frontImage: string;
  backImage: string;
  alt: string;
}

export default function InteractiveProductImage({ frontImage, backImage, alt }: InteractiveProductImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Continuous rotation value for spinning the bottle
  const rotationY = useMotionValue(0);
  
  // Physical spring physics so the bottle feels weighty and smooth
  const rotateYSpring = useSpring(rotationY, { stiffness: 200, damping: 30, mass: 0.8 });

  // Subtle vertical tilt for 3D realism when moving the mouse up and down
  const tiltX = useMotionValue(0);
  const tiltXSpring = useSpring(tiltX, { stiffness: 150, damping: 20 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(py * -15); // Tilt up/down slightly
  };

  const handlePointerLeave = () => {
    tiltX.set(0); // Return to level when mouse leaves
  };

  // Handle the physical drag-to-spin interaction
  const handlePan = (e: any, info: any) => {
    // info.delta.x is the distance dragged this frame
    // 0.6 is the sensitivity multiplier (higher = spins faster)
    rotationY.set(rotationY.get() + info.delta.x * 0.6);
  };

  const handlePanEnd = (e: any, info: any) => {
    const current = rotationY.get();
    const velocity = info.velocity.x;
    
    // Add a bit of velocity to predict where it should land if swiped hard
    const predicted = current + velocity * 0.1;
    
    // Mathematically snap to the nearest 180 degrees (0 = front, 180 = back, 360 = front, etc.)
    const nearestFace = Math.round(predicted / 180) * 180;
    
    // Snap cleanly into place
    rotationY.set(nearestFace);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full flex flex-col items-center justify-center select-none"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ perspective: 1200 }}
    >
      {/* Grounding shadow (Static, doesn't spin, sits beneath the bottle) */}
      <div className="absolute -bottom-[5%] left-[20%] w-[60%] h-[8%] rounded-[50%] z-0 bg-[radial-gradient(ellipse,_rgba(60,45,30,0.25)_0%,_transparent_70%)] blur-[8px]" />

      {/* The Spinning Bottle Container */}
      <motion.div
        className="relative w-[65%] h-[75%] z-10 flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        style={{ 
          rotateX: tiltXSpring, 
          rotateY: rotateYSpring, 
          transformStyle: 'preserve-3d' 
        }}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
      >
        {/* --- FRONT SIDE --- */}
        <div 
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Image
            src={frontImage}
            alt={`${alt} Front`}
            fill
            className="object-contain drop-shadow-md"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* --- BACK SIDE --- */}
        <div 
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
          style={{ 
            backfaceVisibility: 'hidden', 
            transform: 'rotateY(180deg)' // Pre-flipped so it faces backwards
          }}
        >
          <Image
            src={backImage}
            alt={`${alt} Back Details`}
            fill
            className="object-contain drop-shadow-md"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </motion.div>
    </div>
  );
}