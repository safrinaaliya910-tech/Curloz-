import { motion } from 'framer-motion';
import { Leaf, Crown, Droplet, Heart } from 'lucide-react';

const features = [
  { icon: <Leaf size={22} strokeWidth={1} />, label: ['Premium', 'Ingredients'] },
  { icon: <Crown size={22} strokeWidth={1} />, label: ['Salon', 'Quality'] },
  { icon: <Droplet size={22} strokeWidth={1} />, label: ['Long Lasting', 'Results'] },
  { icon: <Heart size={22} strokeWidth={1} />, label: ['Loved by', 'Thousands'] },
];

export default function FeatureStripBar() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
      className="relative z-20 w-full px-4 md:px-16 md:absolute md:bottom-6 md:left-0 md:right-0 pointer-events-auto"
    >
      <div className="w-full max-w-7xl mx-auto bg-white/60 md:bg-white/20 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.05)] rounded-2xl py-6 px-5 md:px-12">
        <div className="grid grid-cols-2 md:flex md:flex-nowrap justify-between items-center gap-y-6 gap-x-4">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-1 items-center gap-3 md:gap-4 min-w-0">
              <div className="text-copper/80 shrink-0">
                {feature.icon}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-sans text-[11px] md:text-xs font-medium text-charcoal/80 leading-tight truncate">
                  {feature.label[0]}
                </span>
                <span className="font-sans text-[11px] md:text-xs text-charcoal/60 leading-tight truncate">
                  {feature.label[1]}
                </span>
              </div>
              {index < features.length - 1 && (
                <div className="hidden md:block w-px h-8 bg-charcoal/10 ml-auto"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}