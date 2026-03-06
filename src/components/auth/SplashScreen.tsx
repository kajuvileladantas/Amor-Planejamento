import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-wedding-cream flex flex-col items-center justify-center z-[100]">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <div className="w-24 h-24 bg-wedding-rose/10 rounded-full flex items-center justify-center mb-6">
          <Heart className="text-wedding-rose" size={48} fill="currentColor" />
        </div>
        <h1 className="text-4xl md:text-5xl font-script text-stone-800 mb-2">
          Amor & Planejamento
        </h1>
        <p className="text-stone-500 serif italic text-center max-w-xs px-4">
          Organize cada detalhe do seu grande dia com carinho e perfeição.
        </p>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="flex gap-1">
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-2 h-2 rounded-full bg-wedding-rose/40" 
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
            className="w-2 h-2 rounded-full bg-wedding-rose/40" 
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
            className="w-2 h-2 rounded-full bg-wedding-rose/40" 
          />
        </div>
      </motion.div>
    </div>
  );
};
