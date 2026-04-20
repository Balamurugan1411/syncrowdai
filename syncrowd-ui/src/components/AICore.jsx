import React from 'react';
import { Cpu, Zap } from 'lucide-react';

export default function AICore() {
  return (
    <div className="fixed bottom-12 right-12 z-[100] pointer-events-none group">
       <div className="relative flex items-center justify-center">
          {/* Outer Rotating Rings */}
          <div className="absolute w-24 h-24 border border-cyan-500/20 rounded-full animate-[spin_8s_linear_infinite]"></div>
          <div className="absolute w-20 h-20 border-t-2 border-indigo-500/40 rounded-full animate-[spin_4s_linear_infinite_reverse]"></div>
          
          {/* Inner Pulsing Core */}
          <div className="w-12 h-12 bg-black/80 rounded-full border border-cyan-400/50 flex items-center justify-center relative shadow-[0_0_30px_rgba(34,211,238,0.2)]">
             <div className="absolute inset-0 bg-cyan-400/10 rounded-full animate-pulse"></div>
             <Cpu size={18} className="text-cyan-400 relative z-10" />
          </div>

          {/* Floating Data Labels */}
          <div className="absolute -top-12 right-0 bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
             <p className="text-[9px] font-mono text-cyan-400 whitespace-nowrap">AI_CORE_NOMINAL // STABLE</p>
          </div>
          
          <div className="absolute -bottom-10 right-0 flex flex-col items-end opacity-40">
             <div className="flex items-center space-x-2">
                <span className="text-[8px] font-bold text-slate-500 uppercase">Neural Load</span>
                <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-cyan-500 animate-[pulse_2s_infinite]" style={{ width: '65%' }}></div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
