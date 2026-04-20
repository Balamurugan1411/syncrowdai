import React from 'react';
import { FastForward, Map as MapIcon, Flag, Coffee, StepForward, Disc3 } from 'lucide-react';
import StadiumMap from '../components/StadiumMap';

export default function PredictionMode({ onPredict, isPredicting, densities, activeRoute }) {
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in-down">
       
       <div className="lg:col-span-4 flex flex-col space-y-6">
          
          {/* Main Action Card */}
          <div className="glass-panel p-8 text-center relative overflow-hidden">
             
             {isPredicting && (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent pointer-events-none"></div>
             )}

             <div className="mb-6 flex justify-center">
                 <div className={`p-4 rounded-full ${isPredicting ? 'bg-purple-500/20 text-purple-400 animate-pulse' : 'bg-slate-800 text-slate-400'}`}>
                    <FastForward size={32} />
                 </div>
             </div>
             <h2 className="text-xl font-bold text-white mb-3">Temporal Forecasting Engine</h2>
             <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                Execute algorithmic projections of crowd distribution and trajectory paths based on massive historical matching.
             </p>
             <button 
                onClick={onPredict}
                className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg ${
                  isPredicting 
                     ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20' 
                     : 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-indigo-500/20'
                }`}
             >
                {isPredicting ? "HALT PREDICTION • REVERT TO LIVE" : "JUMP FORWARD 5 MINUTES"}
             </button>
          </div>

          {/* Timeline Simulation */}
          <div className="glass-card p-6 flex-grow">
             <h3 className="text-sm font-semibold text-slate-300 mb-6">User Journey Simulation Progress</h3>
             
             <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
                
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                   <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-indigo-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <Flag size={16} />
                   </div>
                   <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-white/5 bg-slate-900/50 shadow">
                      <div className="flex items-center justify-between space-x-2 mb-1">
                         <div className="font-bold text-slate-200 text-sm">Gate Entry</div>
                      </div>
                      <div className="text-slate-400 text-xs text-balance">Security clearance cleared.</div>
                   </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                   <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-slate-800 text-slate-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <StepForward size={16} />
                   </div>
                   <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-white/5 bg-slate-900/50 shadow opacity-50">
                      <div className="flex items-center justify-between space-x-2 mb-1">
                         <div className="font-bold text-slate-200 text-sm">Concourse Hall</div>
                      </div>
                      <div className="text-slate-400 text-xs text-balance">Heavy traffic detected.</div>
                   </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                   <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-slate-800 text-slate-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <Disc3 size={16} />
                   </div>
                   <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] md:opacity-0 hidden md:block"></div>
                </div>

             </div>
          </div>
       </div>

       {/* Map View */}
       <div className="lg:col-span-8 glass-panel min-h-[600px] flex items-center justify-center relative overflow-hidden">
          {isPredicting && (
             <div className="absolute top-6 right-6 z-20 px-4 py-2 bg-purple-500/20 text-purple-300 font-bold tracking-widest uppercase rounded-full text-xs box-shadow-glow flex items-center">
                <FastForward className="w-4 h-4 mr-2" /> Viewer Time + 5:00
             </div>
          )}
          <StadiumMap densities={densities} activeRoute={activeRoute} />
       </div>
    </div>
  );
}
