'use client';

import { motion } from 'framer-motion';

export default function CopperRingArc() {
  return (
    <motion.div 
      className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0, rotate: -2, scale: 0.95 }}
      animate={{ opacity: 1, rotate: 0, scale: 1 }}
      transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <svg 
        viewBox="0 0 200 200" 
        /* Scaled up and shifted up/left so it arches OVER the products */
        className="w-[135%] max-w-[950px] h-auto absolute top-[-18%] left-[-15%] md:left-[-10%] drop-shadow-[0_10px_20px_rgba(184,114,45,0.35)]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="copperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9D4A6" />
            <stop offset="25%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#B8722D" />
            <stop offset="80%" stopColor="#8A4A11" />
            <stop offset="100%" stopColor="#E2A66C" />
          </linearGradient>
          
          {/* Inner glow filter to give the arch physical thickness and volume */}
          <filter id="tubeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* 
          The main sweeping ribbon. 
          Starts bottom-right (180, 190), sweeps much higher over the top, 
          and ends elegantly in mid-air high on the left (25, 35).
        */}
        <path 
          d="M 180 190 C 180 10, 100 -10, 25 35" 
          fill="none" 
          stroke="url(#copperGrad)" 
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#tubeGlow)"
        />
        
        {/* Core highlight string to make the center of the metal reflect light */}
        <path 
          d="M 180 190 C 180 10, 100 -10, 25 35" 
          fill="none" 
          stroke="#FFFFFF" 
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* --- The Glowing Tip (Anchored exactly to the new end of the line at x=25, y=35) --- */}
        
        {/* Outer pulsing halo */}
        <motion.circle
          cx="25"
          cy="35"
          fill="#F9D4A6"
          animate={{ r: [2.5, 4.5, 2.5], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: 'drop-shadow(0px 0px 8px #B8722D)' }}
        />
        
        {/* Bright inner core */}
        <motion.circle
          cx="25"
          cy="35"
          fill="#FFFFFF"
          animate={{ r: [1, 2, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          style={{ filter: 'drop-shadow(0px 0px 4px #FFFFFF)' }}
        />
      </svg>
      
      {/* Background Floating Sparkles */}
      <motion.div
        animate={{ y: [-15, 15, -15], opacity: [0.3, 0.9, 0.3], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[25%] right-[10%] w-3 h-3 rounded-full bg-[#FFFFFF] blur-[1px] shadow-[0_0_20px_#F9D4A6]"
      />
      <motion.div
        animate={{ y: [15, -15, 15], opacity: [0.2, 0.7, 0.2], scale: [1, 1.3, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[65%] left-[25%] w-4 h-4 rounded-full bg-[#F9D4A6] blur-[2px] shadow-[0_0_25px_#B8722D]"
      />
    </motion.div>
  );
}