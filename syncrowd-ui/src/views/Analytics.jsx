import React from 'react';
import { BarChart3, TrendingUp, Zap, ShieldCheck, Globe, Cpu } from 'lucide-react';
import { GlassPanel, SkeuoCard } from '../components/UIComponents';

export default function Analytics({ densities }) {
  const stats = [
    { label: 'System Accuracy', value: '99.8%', trend: '+0.2%', icon: Cpu, color: 'text-cyan-400' },
    { label: 'Flow Efficiency', value: '88.4%', trend: '+5.4%', icon: Zap, color: 'text-amber-400' },
    { label: 'Safety Index', value: '96.2', trend: 'Nominal', icon: ShieldCheck, color: 'text-emerald-400' },
    { label: 'Predicted Peak', value: '20:45', trend: '-12m', icon: TrendingUp, color: 'text-indigo-400' },
  ];

  return (
    <div className="space-y-6 animate-fade-in-down">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <SkeuoCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
           <GlassPanel title="Global Density Matrix" icon={BarChart3} subtitle={`REAL-TIME TELEMETRY STREAM // NODE_0X${Math.random().toString(16).substr(2, 4).toUpperCase()}`}>
              <div className="flex-grow flex items-end justify-between space-x-2 px-4 pb-4 h-[300px]">
                 {Object.entries(densities).map(([key, value], i) => {
                    const density = typeof value === 'object' ? value.load : value;
                    const h = Math.max(10, density * 3);
                    return (
                       <div key={key} className="flex-1 flex flex-col items-center group relative">
                          <div className={`absolute bottom-0 w-full bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} style={{ height: `${h}px` }}></div>
                          <div 
                             className={`w-full rounded-t-sm transition-all duration-700 ease-out relative ${density > 80 ? 'bg-red-500/60 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'bg-cyan-500/40 shadow-[0_0_10px_rgba(34,211,238,0.2)]'}`}
                             style={{ height: `${h}px`, transitionDelay: `${i * 50}ms` }}
                          />
                          <span className="text-[8px] font-mono text-slate-600 mt-2 rotate-45 origin-left whitespace-nowrap">{key}</span>
                       </div>
                    );
                 })}
              </div>
           </GlassPanel>
        </div>

        <div className="lg:col-span-4 h-full">
           <GlassPanel title="Neural Projections" icon={Globe}>
              <div className="space-y-6">
                 {[
                    { label: 'Egress Time Predicted', value: '18 min', status: 'Optimal', color: 'text-emerald-400' },
                    { label: 'Transport Load Match', value: '94%', status: 'High', color: 'text-cyan-400' },
                    { label: 'Bottle-neck Probability', value: '4.2%', status: 'Low', color: 'text-emerald-400' }
                 ].map((p, i) => (
                    <div key={i} className="border-b border-white/5 pb-4 last:border-0">
                       <div className="flex justify-between items-start mb-1">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{p.label}</span>
                          <span className={`text-[9px] font-black uppercase ${p.color}`}>{p.status}</span>
                       </div>
                       <div className="text-xl font-bold text-white">{p.value}</div>
                    </div>
                 ))}
              </div>
           </GlassPanel>
        </div>
      </div>
    </div>
  );
}
