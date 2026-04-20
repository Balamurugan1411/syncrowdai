import React, { useState } from 'react';
import { Network, Route, Settings2, AlertTriangle, Crosshair, ArrowRight } from 'lucide-react';
import { STADIUM_NODES } from '../utils/graphUtils';

export default function ControlPanel({ onPredict, onIncident, onRoute, isPredicting }) {
  const [startPoint, setStartPoint] = useState('G1');
  const [endPoint, setEndPoint] = useState('S_B');

  return (
    <div className="glass-card p-6 flex flex-col space-y-8">
      
      <div>
         <h2 className="text-sm font-semibold tracking-wide text-slate-300 mb-4 flex items-center">
           <Settings2 className="mr-2 w-4 h-4 text-slate-400" /> Operations
         </h2>
         <div className="space-y-3">
            <button 
              onClick={onPredict}
              className={`w-full py-2.5 px-4 rounded-xl font-medium text-sm flex items-center transition-all ${
                isPredicting 
                  ? 'bg-purple-500 hover:bg-purple-600 text-white shadow-lg shadow-purple-500/20 text-center justify-center' 
                  : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/5'
              }`}
            >
              <Network className={`mr-2 w-4 h-4 ${isPredicting ? 'text-purple-200' : 'text-slate-400'}`} /> 
              {isPredicting ? "Return to Live State" : "Predict Horizon (5M)"}
            </button>

            <button 
              onClick={onIncident}
              className="w-full py-2.5 px-4 rounded-xl font-medium text-sm flex items-center bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all"
            >
               <AlertTriangle className="mr-2 w-4 h-4 text-red-500/80" /> Inject Critical Surge
            </button>
         </div>
      </div>

      <div className="pt-6 border-t border-white/5 flex-grow">
         <h3 className="text-sm font-semibold tracking-wide text-slate-300 mb-4 flex items-center">
           <Route className="mr-2 w-4 h-4 text-slate-400" /> Agent Routing
         </h3>
         
         <div className="space-y-3 mb-5">
            <div className="flex items-center space-x-2 bg-black/20 rounded-lg p-2 border border-white/5">
                <Crosshair className="w-4 h-4 text-slate-500 mx-1" />
                <select 
                   className="flex-grow bg-transparent text-sm font-medium text-slate-200 outline-none"
                   value={startPoint} onChange={e => setStartPoint(e.target.value)}
                >
                   {Object.values(STADIUM_NODES).map(n => <option key={`start-${n.id}`} value={n.id} className="bg-slate-900">{n.label}</option>)}
                </select>
            </div>
            
            <div className="flex items-center space-x-2 bg-black/20 rounded-lg p-2 border border-white/5">
                <ArrowRight className="w-4 h-4 text-indigo-400 mx-1" />
                <select 
                   className="flex-grow bg-transparent text-sm font-medium text-indigo-200 outline-none"
                   value={endPoint} onChange={e => setEndPoint(e.target.value)}
                >
                   {Object.values(STADIUM_NODES).map(n => <option key={`end-${n.id}`} value={n.id} className="bg-slate-900">{n.label}</option>)}
                </select>
            </div>
         </div>

         <button 
            onClick={() => onRoute(startPoint, endPoint)}
            className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 shadow-lg shadow-indigo-500/20 text-white rounded-xl flex items-center justify-center transition-colors text-sm font-medium"
         >
            Dispatch Simulation Agent
         </button>
      </div>
    </div>
  );
}
