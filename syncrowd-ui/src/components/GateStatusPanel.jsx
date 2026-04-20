import React from 'react';
import { Play, Pause, RefreshCw, User } from 'lucide-react';
import { STADIUM_NODES } from '../utils/graphUtils';
import miniStadium from '../assets/stadium_bg.png'; // Reuse the bg for mini preview

export default function GateStatusPanel({ densities }) {
  
  // Extract gates and sort them
  const gates = Object.entries(densities)
    .filter(([key]) => key.startsWith('G'))
    .map(([key, state]) => ({
       id: key,
       label: STADIUM_NODES[key]?.label || key,
       type: STADIUM_NODES[key]?.type || 'General',
       load: state.load,
       queue: state.queue,
       status: state.status
    }))
    .sort((a, b) => parseInt(a.id.substring(1)) - parseInt(b.id.substring(1)));

  const getLoadColor = (load) => {
    if (load < 40) return 'bg-emerald-500 shadow-[0_0_8px_#10b981]';
    if (load < 75) return 'bg-amber-500 shadow-[0_0_8px_#f59e0b]';
    return 'bg-red-500 shadow-[0_0_8px_#ef4444]';
  };

  const getTextColor = (load) => {
    if (load < 40) return 'text-emerald-400';
    if (load < 75) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <div className="flex flex-col h-full rounded-md skeuo-inset relative p-4">
      {/* Header controls (mock) */}
      <div className="flex items-center space-x-2 mb-4 px-2">
         <div className="flex space-x-1 bg-[#1e293b] rounded px-2 py-1 border border-[#334155]">
            <Play size={12} className="text-emerald-400 cursor-pointer" />
            <Pause size={12} className="text-slate-400 cursor-pointer" />
            <div className="w-px h-3 bg-slate-600 mx-1"></div>
            <RefreshCw size={12} className="text-slate-400 cursor-pointer" />
         </div>
      </div>

      <h2 className="text-sm font-bold text-white mb-3 tracking-wide px-2 uppercase">Real-Time Gate Status</h2>
      
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-2 px-2 pb-2 border-b border-white/5 text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">
        <div className="col-span-2">Gate</div>
        <div className="col-span-3">Type</div>
        <div className="col-span-4 text-center">Load</div>
        <div className="col-span-3 text-right">Queue</div>
      </div>

      {/* Scrollable Gate List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-1 pb-4">
        {gates.map(gate => (
          <div key={gate.id} className="grid grid-cols-12 gap-2 px-2 py-2 items-center bg-white/[0.02] hover:bg-white/[0.05] rounded border border-white/5 transition-colors">
            <div className="col-span-2 font-mono font-bold text-slate-200 text-xs">{gate.id}</div>
            <div className="col-span-3 text-[10px] font-medium text-slate-400 uppercase tracking-wider truncate">{gate.type}</div>
            
            {/* Progress Bar Column */}
            <div className="col-span-4 flex items-center space-x-2">
               <span className={`text-[10px] font-bold w-7 text-right ${getTextColor(gate.load)}`}>{Math.floor(gate.load)}%</span>
               <div className="h-1.5 flex-1 bg-[#0f172a] rounded-full overflow-hidden border border-black/50 shadow-inner">
                  <div 
                     className={`h-full rounded-full transition-all duration-500 ${getLoadColor(gate.load)}`}
                     style={{ width: `${Math.min(100, gate.load)}%` }}
                  ></div>
               </div>
            </div>
            
            <div className="col-span-3 flex items-center justify-end space-x-1 text-slate-300">
               <span className="text-[10px] font-mono">{gate.queue}</span>
               <User size={10} className="text-slate-500" />
            </div>
          </div>
        ))}
      </div>

      {/* Footer Area: Liv Status & Mini Preview */}
      <div className="mt-4 pt-4 border-t border-white/10 flex flex-col space-y-4">
         
         <div className="bg-[#0f172a] p-3 rounded border border-[#1e293b] flex justify-between items-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-400"></div>
            <div className="flex flex-col">
               <span className="text-[10px] text-slate-400 uppercase tracking-wider">System Status</span>
               <span className="text-emerald-400 font-bold tracking-widest uppercase text-sm text-glow-cyan">READY</span>
            </div>
            <div className="text-[10px] font-mono text-slate-500">Live: Monitoring</div>
         </div>

         <div className="h-32 w-full rounded border border-white/10 overflow-hidden relative opacity-80 group hover:opacity-100 transition-opacity cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-t from-[#05080c] via-transparent to-transparent z-10"></div>
            <img src={miniStadium} alt="Stadium Preview" className="w-full h-full object-cover" />
            <div className="absolute bottom-2 left-2 z-20 text-[9px] font-mono text-white/70">MA Chidambaram Stadium<br/>Chennai, India</div>
         </div>

      </div>

    </div>
  );
}
