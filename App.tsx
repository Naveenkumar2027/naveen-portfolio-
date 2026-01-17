
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingAnimation from './components/LandingAnimation';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-black overflow-x-hidden selection:bg-red-600 selection:text-white">
      <AnimatePresence mode="wait">
        {!isIntroComplete ? (
          <LandingAnimation onComplete={() => setIsIntroComplete(true)} key="landing" />
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <Dashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
