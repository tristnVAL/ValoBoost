import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Shield, Target, Loader2 } from 'lucide-react';

const LOADING_STEPS = [
  "Initializing Tactical Protocol...",
  "Accessing Riot Combat Logs...",
  "Decrypting Match Statistics...",
  "Analyzing Headshot Precision...",
  "Calculating Clutch Factor...",
  "Generating V-Rating Profile...",
  "Finalizing Training Plan..."
];

export function LoadingScreen() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Scanning Line */}
      <motion.div 
        initial={{ top: '-10%' }}
        animate={{ top: '110%' }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-px bg-primary/30 z-0"
      />

      <div className="relative z-10 w-full max-w-md space-y-12">
        {/* Central Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 border-2 border-dashed border-primary/20 rounded-full flex items-center justify-center"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 bg-primary flex items-center justify-center valo-clip shadow-2xl shadow-primary/40"
              >
                <Zap className="w-10 h-10 text-white fill-current" />
              </motion.div>
            </div>
            
            {/* Orbiting Elements */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-secondary valo-clip" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary valo-clip" />
            </motion.div>
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-black uppercase tracking-widest italic">
              Analyzing <span className="text-primary">Combat Data</span>
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-primary/30" />
              <div className="text-[10px] uppercase font-bold tracking-[0.4em] opacity-50">
                Protocol v1.0.4
              </div>
              <div className="h-px w-12 bg-primary/30" />
            </div>
          </div>

          <div className="h-12 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p 
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xs font-mono uppercase tracking-widest text-primary font-bold"
              >
                {LOADING_STEPS[step]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Progress Bar */}
          <div className="relative h-1 bg-muted overflow-hidden valo-clip">
            <motion.div 
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 8, ease: "easeInOut" }}
              className="absolute top-0 left-0 h-full bg-primary"
            />
          </div>

          {/* Tactical Readout */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-2 text-[8px] uppercase font-bold opacity-30">
              <Shield className="w-3 h-3" />
              Encryption: AES-256
            </div>
            <div className="flex items-center gap-2 text-[8px] uppercase font-bold opacity-30 justify-end">
              <Target className="w-3 h-3" />
              Source: Riot-Mainframe
            </div>
          </div>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-primary/20" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-primary/20" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-primary/20" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-primary/20" />
    </div>
  );
}
