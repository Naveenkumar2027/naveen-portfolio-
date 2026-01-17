
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface LandingAnimationProps {
  onComplete: () => void;
}

const LandingAnimation: React.FC<LandingAnimationProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'lines' | 'active' | 'out'>('lines');
  const name = "NAVEEN";
  const letters = name.split("");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('active'), 1000), // Start the reveal (N first, then slide + others)
      setTimeout(() => setPhase('out'), 3800),    // Start moving to the corner sooner for a snappy feel
      setTimeout(() => onComplete(), 5000),       // Finished transition
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Letter reveal variants
  // Added explicit Variants type and 'as const' for transition type to resolve TS inference error
  const letterVariants: Variants = {
    hidden: (i: number) => ({
      opacity: i === 0 ? 0 : 0,
      x: i === 0 ? 0 : 40,
      filter: 'blur(10px)',
      scale: 0.8,
    }),
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        delay: i === 0 ? 0 : 0.8 + (i * 0.12), // Start N first, then stagger others
        type: 'spring' as const,
        damping: 20,
        stiffness: 80,
      },
    }),
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden">
      {/* Background Cinematic Grid Lines */}
      <AnimatePresence>
        {phase === 'lines' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`line-${i}`}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: [0, 0.2, 0] }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.05,
                  ease: "easeInOut",
                }}
                className="w-[1px] h-full bg-red-600/20 absolute"
                style={{ left: `${5 + i * 6.5}%` }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative flex items-center justify-center w-full h-full">
        {/* Unified Name Container */}
        <motion.div
          animate={phase === 'out' ? {
            scale: 0.16,
            x: '-42vw',
            y: '-42vh',
            opacity: 0,
            transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
          } : {}}
          className="flex items-center text-red-600 font-black text-8xl md:text-[13rem] tracking-tighter"
        >
          {letters.map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate={phase !== 'lines' ? "visible" : "hidden"}
              variants={letterVariants}
              className="relative inline-block"
            >
              {char}
              {/* Individual Pulsing Glow */}
              <motion.div 
                className="absolute inset-0 bg-red-600 blur-[40px] -z-10"
                animate={{ 
                  opacity: phase !== 'lines' ? [0.05, 0.3, 0.05] : 0,
                  scale: [1, 1.15, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            </motion.span>
          ))}
        </motion.div>

        {/* Central Atmosphere Flash upon full reveal */}
        <AnimatePresence>
          {phase === 'active' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.12, 0] }}
              transition={{ delay: 1.5, duration: 2 }}
              className="absolute inset-[-1000px] bg-red-600 blur-[200px] pointer-events-none mix-blend-screen"
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LandingAnimation;
