import React, { useState } from 'react';
import { TrendingUp, MapPin, AlertTriangle, ShieldAlert, Radio, Tv, CheckCircle2 } from 'lucide-react';
import { SkeuoCard } from './UIComponents';
import { STADIUM_NODES } from '../utils/graphUtils';
import camGate from '../assets/cam_gate.png';
import camConcourse from '../assets/cam_concourse.png';

export default function AIInsightsPanel({ densities, phase, setPhase, triggerEmergencyMode }) {
  const [broadcasting, setBroadcasting] = useState(false);

  // Dynamic logic for AI insights
  let maxGate = null;
  let maxLoad = 0;
  let bestGates = [];

  Object.entries(densities).forEach(([key, state]) => {
    if (key.startsWith('G')) {
       if (state.load > maxLoad) {
          maxLoad = state.load;
          maxGate = key;
       }
       if (state.load < 40 && state.status !== 'Closed' && STADIUM_NODES[key]?.type !== 'Emergency') {
          bestGates.push(key);
       }
    }
  });

  const topBestGates = bestGates.slice(0, 2).join(' or ');

  const handleBroadcast = () => {
    setBroadcasting(true);
    setTimeout(() => setBroadcasting(false), 3000);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      
      {/* Top Half: AI Insights Cards */}
      <div className="flex-1 skeuo-inset p-4 flex flex-col space-y-3 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
         
         <div className="flex items-center space-x-2 mb-2">
            <div className="p-1.5 rounded bg-cyan-500/20 border border-cyan-500/30">
               <Radio size={16} className="text-cyan-400" />
            </div>
            <h2 className="text-sm font-bold text-white tracking-wide uppercase">AI Orchestration</h2>
         </div>

         <SkeuoCard label="Expected Surge" value="+5,000 in 15 mins" icon={TrendingUp} colorClass="text-emerald-400" />
         <SkeuoCard label="Recommended Entry" value={`Use ${topBestGates || 'G1'} for Flow`} icon={MapPin} colorClass="text-cyan-400" />
         <SkeuoCard label="Gate to Monitor" value={maxGate ? `${maxGate} Overcrowded` : 'All Gates Normal'} icon={AlertTriangle} colorClass="text-red-400" className={maxLoad > 80 ? 'border-red-500/50' : ''}>
            <span className="text-xs font-semibold text-red-400">{Math.floor(maxLoad)}% Capacity Alert</span>
         </SkeuoCard>

         {/* Digital Signage Broadcast - New Feature */}
         <button 
           onClick={handleBroadcast}
           disabled={broadcasting}
           className={`w-full text-left skeuo-card p-3 flex items-center space-x-4 border-indigo-500/30 hover:border-indigo-500/60 transition-all ${broadcasting ? 'bg-indigo-500/20 animate-pulse' : ''}`}
         >
            <div className="p-2 rounded-lg bg-indigo-500/20 border border-indigo-500/40">
               {broadcasting ? <CheckCircle2 size={24} className="text-indigo-400" /> : <Tv size={24} className="text-indigo-400" />}
            </div>
            <div className="flex flex-col">
               <span className="text-[10px] text-indigo-400/80 uppercase font-bold tracking-wider mb-0.5">Digital Signage</span>
               <span className="text-sm font-bold text-white tracking-wide">
                  {broadcasting ? 'Broadcast Complete' : 'Broadcast Directions to Screens'}
               </span>
            </div>
         </button>

         {/* Emergency Action */}
         <button 
           onClick={triggerEmergencyMode}
           className="w-full text-left skeuo-card p-3 flex items-center space-x-4 border-amber-500/30 hover:border-amber-500/60"
         >
            <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/40">
               <ShieldAlert size={24} className="text-amber-400" />
            </div>
            <div className="flex flex-col">
               <span className="text-[10px] text-amber-400/80 uppercase font-bold tracking-wider mb-0.5">Emergency Mode</span>
               <span className="text-sm font-bold text-white tracking-wide">Execute Stadium-Wide Evacuation</span>
            </div>
         </button>
      </div>

      {/* Bottom Half: Camera Feeds */}
      <div className="h-[300px] skeuo-inset p-3 flex flex-col space-y-3">
         <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wide">Live Camera Feeds</h2>
            <div className="flex space-x-1">
               <div className="w-2 h-2 rounded bg-red-500 animate-pulse"></div>
               <div className="w-2 h-2 rounded bg-slate-600"></div>
            </div>
         </div>

         <div className="flex-1 relative rounded border border-white/10 overflow-hidden group cursor-pointer">
            <img src={camGate} alt="Gate Feed" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-2 left-2 flex flex-col">
               <span className="text-xs font-bold text-white">Gate G14 Overcrowded</span>
            </div>
            <div className="absolute top-2 right-2 bg-black/60 px-2 py-0.5 rounded text-[8px] text-white border border-white/20 font-mono">
               CAM_01_G14
            </div>
         </div>

         <div className="flex-1 relative rounded border border-white/10 overflow-hidden group cursor-pointer">
            <img src={camConcourse} alt="Concourse Feed" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-2 left-2 flex flex-col">
               <span className="text-xs font-bold text-white">Concourse Area (South)</span>
            </div>
            <div className="absolute top-2 right-2 bg-black/60 px-2 py-0.5 rounded text-[8px] text-white border border-white/20 font-mono">
               CAM_08_S
            </div>
         </div>
      </div>

    </div>
  );
}

