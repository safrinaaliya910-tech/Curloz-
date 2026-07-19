'use client';

import { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';

interface InteractiveProductImageProps {
  image: string;
  alt: string;
}

export default function InteractiveProductImage({
  image,
  alt,
}: InteractiveProductImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Raw pointer position inside the container, -0.5 to 0.5
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the motion so it feels physical, not jittery
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Map pointer position to rotation + a subtle parallax shift
  const rotateY = useTransform(springX, [-0.5, 0.5], [-22, 22]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [14, -14]);
  const translateX = useTransform(springX, [-0.5, 0.5], [-14, 14]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-8, 8]);

  // Soft moving shadow that follows the tilt, grounding the bottle
  const shadowX = useTransform(springX, [-0.5, 0.5], [20, -20]);
  const shadowScale = useTransform(springY, [-0.5, 0.5], [0.9, 1.05]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
      style={{ perspective: 1200 }}
    >
      {/* Grounding shadow */}
      <motion.div
        className="absolute bottom-[8%] w-2/3 h-8 rounded-full bg-charcoal/20 blur-xl"
        style={{ x: shadowX, scaleX: shadowScale }}
      />

      {/* The real product image, tilted in 3D space based on pointer position */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          transformStyle: 'preserve-3d',
        }}
        whileTap={{ scale: 0.97 }}
        className="relative w-[70%] h-[80%] will-change-transform"
      >
        <Image
          src={image}
          alt={alt}
          fill
          className="object-contain drop-shadow-[0_25px_35px_rgba(60,40,20,0.25)]"
          sizes="(max-width: 768px) 80vw, 40vw"
          priority
        />
      </motion.div>
    </div>
  );
}