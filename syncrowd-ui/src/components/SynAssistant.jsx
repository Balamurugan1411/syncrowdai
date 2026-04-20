import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Zap, Cpu, ShieldAlert } from 'lucide-react';

export default function SynAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => (p + 1) % 100);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const insights = [
    "Synthesizing crowd flow vectors... Optimal load balancing achieved.",
    "Predictive model shows 12% increase in North Gate congestion in T+10m.",
    "Accessibility route optimized for Zone 4 elevator maintenance.",
    "Cognitive orchestration suggests shifting 3 security units to Sector F."
  ];

  return (
    <div className="fixed bottom-10 right-10 z-[100] flex flex-col items-end">
      
      {/* Insight Bubble */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-72 bg-black/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-4 shadow-[0_0_30px_rgba(34,211,238,0.2)] overflow-hidden relative"
          >
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
               <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-3">
                <Cpu size={14} className="text-cyan-400" />
                <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Syn AI Core</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-medium italic">
                "{insights[Math.floor(Date.now() / 5000) % insights.length]}"
              </p>
              <div className="mt-4 flex items-center justify-between">
                 <div className="flex space-x-1">
                    <div className="w-1 h-1 rounded-full bg-cyan-400"></div>
                    <div className="w-1 h-1 rounded-full bg-cyan-400/50"></div>
                    <div className="w-1 h-1 rounded-full bg-cyan-400/20"></div>
                 </div>
                 <span className="text-[9px] text-slate-500 font-mono">KERNEL_0x22F</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group"
      >
        {/* Pulsing Aura */}
        <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl group-hover:bg-cyan-500/40 transition-all duration-500 animate-pulse"></div>
        
        {/* Core Button */}
        <div className="relative w-16 h-16 bg-[#0c121e] border-2 border-cyan-400/50 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)] overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent"></div>
           <Zap size={28} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
           
           {/* Scanning Ring */}
           <div className="absolute inset-0 border-[1px] border-cyan-400/20 rounded-full scale-110 animate-ping"></div>
        </div>

        {/* Small Badge */}
        <div className="absolute -top-1 -right-1 bg-cyan-500 text-black text-[8px] font-black px-1.5 py-0.5 rounded-full border border-[#0c121e]">
          ACTIVE
        </div>
      </motion.button>
    </div>
  );
}
