import { Leaf, Droplets, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const badges = [
  { icon: <Leaf size={16} strokeWidth={1.5} />, label: 'PARABEN FREE' },
  { icon: <Droplets size={16} strokeWidth={1.5} />, label: 'SULFATE FREE' },
  { icon: <Heart size={16} strokeWidth={1.5} />, label: 'CRUELTY FREE' },
];

export default function TrustBadgeRow() {
  return (
    <div className="flex items-center gap-6 md:gap-8 mt-12 mb-8">
      {badges.map((badge, index) => (
        <div key={index} className="flex items-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 + (index * 0.1) }}
            className="flex flex-col items-center justify-center gap-2"
          >
            <div className="text-copper">
              {badge.icon}
            </div>
            <span className="font-sans text-[9px] md:text-[10px] tracking-widest text-charcoal/70">
              {badge.label}
            </span>
          </motion.div>
          {index < badges.length - 1 && (
            <div className="h-8 w-px bg-charcoal/10 ml-6 md:ml-8 hidden sm:block"></div>
          )}
        </div>
      ))}
    </div>
  );
}
