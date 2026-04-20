import React, { useState } from 'react';
import { Coffee, Utensils, Droplets, Clock, Zap, Star, ShieldCheck } from 'lucide-react';
import { GlassPanel, SkeuoCard } from '../components/UIComponents';

export default function FacilitiesView() {
  const [activeSubTab, setActiveSubTab] = useState('Food');

  const concessions = [
    { id: 1, name: 'Chepauk Delights', category: 'Main', wait: '4 min', rating: 4.8, status: 'High Demand' },
    { id: 2, name: 'Super Kings Cafe', category: 'Drinks', wait: '2 min', rating: 4.9, status: 'Optimal' },
    { id: 3, name: 'Marina Grills', category: 'Snacks', wait: '8 min', rating: 4.5, status: 'Congested' },
  ];

  const restrooms = [
    { id: 'L1-North', occupancy: '82%', wait: '3 min', airQuality: 'Nominal', status: 'High' },
    { id: 'L1-West', occupancy: '14%', wait: '< 1 min', airQuality: 'Excellent', status: 'Low' },
    { id: 'L2-South', occupancy: '45%', wait: '2 min', airQuality: 'Nominal', status: 'Medium' },
  ];

  return (
    <div className="space-y-8 animate-fade-in-down">
       <div className="flex justify-center">
          <div className="bg-black/40 p-1.5 rounded-xl border border-white/5 flex space-x-2 backdrop-blur-md">
             {['Food & Beverage', 'Restroom Radar'].map(t => (
                <button key={t} onClick={() => setActiveSubTab(t.split(' ')[0])} className={`px-8 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeSubTab === t.split(' ')[0] ? 'bg-cyan-500 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>
                   {t}
                </button>
             ))}
          </div>
       </div>

       {activeSubTab === 'Food' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             {concessions.map(item => (
                <SkeuoCard key={item.id} label={item.status} value={item.name} icon={item.category === 'Main' ? Utensils : Coffee}>
                   <div className="flex items-center space-x-2 mt-2">
                      <Star size={10} className="fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold text-slate-300">{item.rating}</span>
                      <span className="text-xs text-slate-500 ml-2">Wait: {item.wait}</span>
                   </div>
                </SkeuoCard>
             ))}
          </div>
       )}

       {activeSubTab === 'Restroom' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
             <div className="lg:col-span-8">
                <GlassPanel title="Hygiene Sensory Matrix" icon={Droplets} subtitle="Live IoT Telemetry // 15 Active Nodes">
                   <div className="space-y-6">
                      {restrooms.map(rr => (
                         <div key={rr.id} className="flex items-center space-x-6 p-4 bg-white/[0.02] border border-white/5 rounded-xl group hover:bg-white/5 transition-all">
                            <div className={`w-2 h-10 rounded-full ${rr.status === 'Low' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]'}`} />
                            <div className="flex-grow">
                               <div className="flex justify-between text-[10px] text-slate-400 mb-1 font-bold uppercase">
                                  <span>{rr.id} Module</span>
                                  <span>{rr.occupancy} LOAD</span>
                               </div>
                               <div className="w-full h-1 bg-black/40 rounded-full overflow-hidden">
                                  <div className={`h-full ${rr.status === 'Low' ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: rr.occupancy }} />
                               </div>
                            </div>
                            <div className="text-center min-w-[60px]">
                               <p className="text-[9px] font-bold text-slate-500 uppercase">Wait</p>
                               <p className="text-sm font-bold text-white">{rr.wait}</p>
                            </div>
                         </div>
                      ))}
                   </div>
                </GlassPanel>
             </div>

             <div className="lg:col-span-4 space-y-6">
                <SkeuoCard label="AI Optimization" value="Redirect Active" icon={Zap} colorClass="text-indigo-400">
                   <p className="text-[11px] text-slate-400 leading-relaxed mt-2">
                      Pushing digital signage update to redirect North Stand attendees to the Level 1 West Module.
                   </p>
                </SkeuoCard>
                <GlassPanel title="Sanitation Status">
                   <div className="space-y-4">
                      {[1, 2, 3].map(i => (
                         <div key={i} className="flex justify-between text-xs border-b border-white/5 pb-2 last:border-0">
                            <span className="text-slate-400">Cleaning Team {i}</span>
                            <span className="text-emerald-400 font-bold flex items-center">
                               <ShieldCheck size={12} className="mr-1.5" /> Ready
                            </span>
                         </div>
                      ))}
                   </div>
                </GlassPanel>
             </div>
          </div>
       )}
    </div>
  );
}
