import React, { useMemo, useState, useEffect } from 'react';
import StadiumMap from './StadiumMap';
import stadiumBg from '../assets/stadium_bg.png';
import { CloudRain, Clock, Users, Activity, Crown } from 'lucide-react';

export default function HeatmapCenterpiece({ densities, activeRoute, phase, predictionHorizon = 0, toggleGate }) {
  const [time, setTime] = useState(new Date());
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    const handleMouseMove = (e) => {
       // Normalize mouse position to -1 to 1
       const x = (e.clientX / window.innerWidth) * 2 - 1;
       const y = (e.clientY / window.innerHeight) * 2 - 1;
       setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
       clearInterval(timer);
       window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate realistic attendance based on average gate load
  const stats = useMemo(() => {
    let totalLoad = 0;
    let gateCount = 0;
    
    Object.keys(densities).forEach(k => {
      if (k.startsWith('G')) {
        totalLoad += densities[k].load;
        gateCount++;
      }
    });

    const avgLoad = gateCount ? totalLoad / gateCount : 0;
    const maxCapacity = 50000;
    // Map avg load (0-100) to capacity (0-50000) with a baseline
    let currentAttendance = Math.floor((avgLoad / 100) * maxCapacity) + 12000;
    if (currentAttendance > maxCapacity) currentAttendance = maxCapacity;

    const capacityPercent = Math.round((currentAttendance / maxCapacity) * 100);

    return {
      attendance: currentAttendance.toLocaleString(),
      maxCapacity: maxCapacity.toLocaleString(),
      capacityPercent
    };
  }, [densities]);

  return (
    <div className="flex flex-col h-full rounded-md skeuo-inset relative overflow-hidden group/center">
      
      {/* Top Header */}
      <div className="absolute top-0 left-0 w-full z-30 p-4 flex justify-between items-start pointer-events-none">
         <div className="bg-black/60 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.8)] flex flex-col items-center pointer-events-auto">
            <h2 className="text-lg font-bold text-white tracking-wide">Stadium Crowd Heatmap</h2>
         </div>

         <div className="flex space-x-2 pointer-events-auto">
            <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-white/10 flex items-center space-x-2">
               <Activity size={12} className="text-cyan-400" />
               <span className="text-xs font-mono text-cyan-400">T +8%</span>
            </div>
            <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-white/10 flex items-center space-x-2">
               <CloudRain size={12} className="text-slate-300" />
               <span className="text-xs font-mono text-slate-300">32°C</span>
            </div>
         </div>
      </div>

      {/* Main Image Background (Blurred/Darkened for Contrast) */}
      <div className="absolute inset-0 z-0">
         <img src={stadiumBg} alt="Stadium" className="w-full h-full object-cover object-center opacity-40 blur-sm" />
         <div className="absolute inset-0 bg-[#080c14]/80"></div>
         {/* Subtle radial glow in the center */}
         <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
         </div>
      </div>

      {/* SVG Map Overlay in 3D Isometric View with Mouse Parallax */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none" style={{ perspective: '2000px' }}>
         <div 
            className="w-full h-full max-w-[900px] max-h-[700px] transition-transform duration-300 ease-out origin-center pointer-events-auto relative transform-style-3d"
            style={{ 
               transform: `rotateX(${60 + mousePos.y * 5}deg) rotateZ(${-30 + mousePos.x * 5}deg) scale(1.2) translateZ(50px)` 
            }}
         >
             {/* Holographic Scanning Beam */}
             <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-full">
                <div className={`w-full h-[150px] bg-gradient-to-b from-transparent ${predictionHorizon > 0 ? 'via-purple-500/20' : 'via-cyan-500/10'} to-transparent absolute top-[-150px] animate-[scan-vertical_4s_linear_infinite]`}></div>
             </div>

             {/* Multi-layered Holographic Depth */}
             <div className="absolute inset-0 rounded-full border-[2px] border-emerald-500/10 bg-emerald-500/5 pointer-events-none" style={{ transform: 'translateZ(-40px)' }}></div>
             <div className="absolute inset-0 rounded-full border-[1px] border-cyan-500/10 bg-cyan-500/5 pointer-events-none" style={{ transform: 'translateZ(-20px)' }}></div>
             <div className="absolute inset-0 rounded-full border-[2px] border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.1)] bg-black/40 backdrop-blur-sm pointer-events-none" style={{ transform: 'translateZ(0px)' }}></div>
             
             {/* Vertical Pillars/Scan Lines */}
             <div className="absolute inset-0 pointer-events-none" style={{ transform: 'translateZ(0px)', transformStyle: 'preserve-3d' }}>
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>
                <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-emerald-500/40 to-transparent"></div>
             </div>

             {/* The Map itself */}
             <StadiumMap densities={densities} activeRoute={activeRoute} toggleGate={toggleGate} />
         </div>
      </div>

      {/* Center Floating HUD (Capacity) */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
         <div className="mt-20 bg-black/70 backdrop-blur-md border border-white/10 rounded-lg p-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex flex-col items-center pointer-events-auto">
            <div className="text-3xl font-bold text-white tracking-tighter">
              {stats.attendance} <span className="text-lg text-slate-400 font-medium">/ {stats.maxCapacity}</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 mb-1 overflow-hidden">
               <div className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full" style={{ width: `${stats.capacityPercent}%` }}></div>
            </div>
            <span className="text-xs font-bold text-slate-300 mb-3">{stats.capacityPercent}% Capacity</span>
            
            <div className={`${predictionHorizon > 0 ? 'bg-purple-500/20 border-purple-500/30 text-purple-400' : 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'} text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded transition-colors duration-500`}>
               {predictionHorizon > 0 ? `PREDICTIVE MODE: T+${predictionHorizon}m Simulation` : 'AI Insight: Nominal Operations'}
            </div>
         </div>
      </div>

      {/* Bottom Live Statistics Footer */}
      <div className="absolute bottom-0 left-0 w-full z-30 bg-black/80 backdrop-blur-xl border-t border-white/10 p-4">
         <div className="flex flex-col space-y-3">
            
            <div className="flex justify-between items-center">
               <div className="flex items-center space-x-3">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Live Statistics</span>
                  <div className="flex items-center space-x-1">
                     <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                     <span className="text-[10px] text-slate-400 uppercase">Smooth</span>
                  </div>
                  <div className="flex items-center space-x-1">
                     <div className="w-2 h-2 rounded-full bg-red-500"></div>
                     <span className="text-[10px] text-slate-400 uppercase">Crowd</span>
                  </div>
               </div>
               
               <div className="text-xs text-slate-300 font-medium">
               M. A. Chidambaram Stadium, Chepauk <span className="text-emerald-400 ml-2 animate-pulse">● LIVE</span>
             </div>
            </div>

            <div className="grid grid-cols-4 gap-4 items-center bg-white/[0.02] border border-white/5 rounded p-3">
               <div className="flex items-center space-x-3 border-r border-white/10">
                  <Users className="text-slate-400" size={16} />
                  <div className="flex flex-col">
                     <span className="text-[10px] text-slate-500 uppercase font-bold">Total Attendance</span>
                     <span className="text-lg font-bold text-white">{stats.attendance}</span>
                  </div>
               </div>
               <div className="flex items-center space-x-3 border-r border-white/10">
                  <Activity className="text-slate-400" size={16} />
                  <div className="flex flex-col">
                     <span className="text-[10px] text-slate-500 uppercase font-bold">Avg. Entry Rate</span>
                     <span className="text-lg font-bold text-white">980 <span className="text-xs text-slate-400 font-medium">/ min</span></span>
                  </div>
               </div>
               <div className="flex items-center space-x-3 border-r border-white/10">
                  <Crown className="text-amber-400" size={16} />
                  <div className="flex flex-col">
                     <span className="text-[10px] text-slate-500 uppercase font-bold">VIP Entries</span>
                     <span className="text-lg font-bold text-white">885</span>
                  </div>
               </div>
               <div className="flex justify-between items-center px-2">
                  <div className="flex items-center space-x-2">
                     <CloudRain size={16} className="text-blue-400" />
                     <span className="text-sm font-bold text-white">32°C</span>
                  </div>
                  <div className="flex items-center space-x-2">
                     <Clock size={16} className="text-slate-400" />
                     <span className="text-sm font-bold text-white">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
               </div>
            </div>

         </div>
      </div>

    </div>
  );
}
