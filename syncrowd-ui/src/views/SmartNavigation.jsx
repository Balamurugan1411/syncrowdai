import React from 'react';
import ControlPanel from '../components/ControlPanel';
import { Route as RouteIcon, MapPin, FastForward, Clock, Video, Eye, ShieldAlert } from 'lucide-react';

export default function SmartNavigation({ onPredict, onIncident, onRoute, isPredicting }) {
  const mockCameras = [
    { id: 'CAM-01', location: 'Gate 1 (North)', status: 'Live', load: '84%' },
    { id: 'CAM-08', location: 'Section C Lower', status: 'Live', load: '12%' },
    { id: 'CAM-14', location: 'VIP Lounge Entry', status: 'Restricted', load: '05%' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in-down h-full">
       
       {/* Left Control Side */}
       <div className="lg:col-span-3">
          <ControlPanel 
              onPredict={onPredict}
              onIncident={onIncident}
              onRoute={onRoute}
              isPredicting={isPredicting}
          />
       </div>

       {/* Center: Live Feeds & Routing */}
       <div className="lg:col-span-9 flex flex-col space-y-6">
          
          {/* Top: Live Camera Mosaic */}
          <div className="grid grid-cols-3 gap-4 h-48">
             {mockCameras.map(cam => (
                <div key={cam.id} className="skeuo-inset relative overflow-hidden group border border-white/5 hover:border-cyan-500/30 transition-all">
                   <div className="absolute inset-0 bg-slate-900/40 z-0"></div>
                   {/* Interlaced scanline effect */}
                   <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-30 pointer-events-none"></div>
                   
                   {/* Camera HUD */}
                   <div className="absolute top-2 left-2 flex items-center space-x-2 z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                      <span className="text-[9px] font-bold text-white tracking-widest uppercase">{cam.id}</span>
                   </div>
                   <div className="absolute bottom-2 left-2 z-10">
                      <span className="text-[8px] text-slate-400 uppercase font-bold">{cam.location}</span>
                   </div>
                   <div className="absolute bottom-2 right-2 z-10 bg-black/60 px-2 py-0.5 rounded border border-white/10 flex items-center space-x-1">
                      <Eye size={8} className="text-cyan-400" />
                      <span className="text-[8px] font-mono text-cyan-400">{cam.load}</span>
                   </div>

                   {/* Mock Visual Static / Anomaly Detection overlay */}
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-[10px] font-bold text-cyan-400 bg-black/80 px-3 py-1 rounded border border-cyan-500/50 flex items-center">
                         <Video size={10} className="mr-2" /> AI FEED ACTIVE
                      </div>
                   </div>
                </div>
             ))}
          </div>

          <div className="glass-panel p-6 flex-grow flex flex-col">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-bold text-white flex items-center uppercase tracking-wider">
                 <RouteIcon className="w-5 h-5 mr-3 text-cyan-400" /> Dispatched Route Visualization
               </h3>
               <div className="flex space-x-2">
                  <div className="px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold text-cyan-400 flex items-center">
                     <ShieldAlert size={10} className="mr-1.5" /> SECURE TUNNEL
                  </div>
               </div>
            </div>
            
            {/* Network Graph Matrix Display */}
            <div className="w-full h-72 bg-black/60 rounded-lg border border-white/5 flex items-center justify-center mb-6 relative overflow-hidden skeuo-inset">
               <div className="absolute inset-0 pattern-dots opacity-20"></div>
               {/* Glowing grid lines */}
               <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan-500/20"></div>
               <div className="absolute top-0 left-1/2 w-[1px] h-full bg-cyan-500/20"></div>

               <div className="z-10 flex flex-col items-center space-y-4">
                  <div className="p-4 rounded-full bg-cyan-500/10 border border-cyan-500/30 animate-pulse">
                     <RouteIcon size={32} className="text-cyan-400" />
                  </div>
                  <p className="text-slate-400 text-xs font-mono text-center max-w-xs">Waiting for route coordinates... <br/> [ESTABLISHING SPATIAL GRAPH MATRIX]</p>
               </div>
            </div>

            {/* Route Cards */}
            <div className="grid grid-cols-3 gap-4">
               {/* AI Optimal */}
               <div className="skeuo-card p-4 border-cyan-500/20 bg-cyan-500/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-2 opacity-5 bg-cyan-400 rounded-bl-3xl"></div>
                  <div className="flex items-center text-cyan-400 mb-2">
                     <FastForward className="w-4 h-4 mr-2" />
                     <span className="text-[10px] font-bold uppercase tracking-widest">AI Optimal</span>
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">4.2m <span className="text-xs text-slate-500 font-normal">/ ETA</span></p>
                  <p className="text-[10px] font-mono text-slate-400 uppercase">Path: G1 → CORE → STAND_J</p>
                  <div className="mt-3 text-[9px] bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded border border-emerald-500/30 inline-block font-bold">12% FLOW OPTIMIZED</div>
               </div>
               
               {/* Shortest Path */}
               <div className="skeuo-card p-4 relative border-white/5">
                  <div className="flex items-center text-slate-400 mb-2">
                     <MapPin className="w-4 h-4 mr-2" />
                     <span className="text-[10px] font-bold uppercase tracking-widest">Direct Path</span>
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">5.8m</p>
                  <p className="text-[10px] font-mono text-slate-400 uppercase">Path: G1 → NORTH → STAND_J</p>
                  <div className="mt-3 text-[9px] bg-red-500/20 text-red-300 px-2 py-1 rounded border border-red-500/30 inline-block font-bold">HEAVY CONGESTION</div>
               </div>

               {/* Scenic Route */}
               <div className="skeuo-card p-4 relative border-white/5">
                  <div className="flex items-center text-slate-400 mb-2">
                     <Clock className="w-4 h-4 mr-2" />
                     <span className="text-[10px] font-bold uppercase tracking-widest">Amenities</span>
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">9.5m</p>
                  <p className="text-[10px] font-mono text-slate-400 uppercase">Path: G1 → FOOD_COURT → STAND_J</p>
                  <div className="mt-3 text-[9px] bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded border border-cyan-500/30 inline-block font-bold">2 STOPS EN-ROUTE</div>
               </div>
            </div>
          </div>
       </div>

    </div>
  );
}
