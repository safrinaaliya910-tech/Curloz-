'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import Link from 'next/link';

interface CopperButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function CopperButton({
  children,
  href,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}: CopperButtonProps) {
  const baseClasses = `inline-flex items-center justify-center px-8 py-4 bg-copper text-white font-sans text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:bg-copper-light hover:shadow-[0_0_20px_rgba(184,114,45,0.4)] disabled:opacity-50 disabled:cursor-not-allowed ${className}`;

  if (href) {
    return (
      <Link href={href}>
        <motion.span
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={baseClasses}
        >
          {children}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={baseClasses}
    >
      {children}
    </motion.button>
  );
}
