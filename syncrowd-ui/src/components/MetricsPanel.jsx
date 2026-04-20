import React, { useMemo } from 'react';
import { Users, Timer, Target, Zap } from 'lucide-react';

export default function MetricsPanel({ densities }) {
  
  const stats = useMemo(() => {
    let totalLoad = 0;
    let high = 0;
    let totalQueue = 0;
    let totalGates = 0;
    
    const values = Object.values(densities);
    values.forEach(d => {
      let load = typeof d === 'object' ? d.load : d;
      let queue = typeof d === 'object' ? d.queue : 0;
      
      if (typeof d === 'object') {
        totalGates++;
        totalQueue += queue;
      }
      
      totalLoad += load;
      if (load > 75) high++;
    });
    
    const avg = values.length ? Math.round(totalLoad / values.length) : 0;
    const avgQueue = totalGates ? Math.round(totalQueue / totalGates) : 0;
    const eff = Math.max(10, 100 - (high * 10)); 
    
    return { avg, high, avgQueue, eff };
  }, [densities]);

  const MetricCard = ({ title, value, sub, icon, iconColorClass }) => (
    <div className="glass-card p-5 relative overflow-hidden flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
         <span className="text-slate-400 font-medium text-sm">{title}</span>
         <div className={`p-2 rounded-lg bg-white/5 border border-white/5 ${iconColorClass}`}>
            {icon}
         </div>
      </div>
      
      <div className="flex items-baseline space-x-2">
         <span className="text-4xl font-bold text-white tracking-tight">
           {value}
         </span>
         {sub && <span className="text-xs font-medium text-slate-400">{sub}</span>}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard 
        title="Average Density" 
        value={`${stats.avg}%`} 
        icon={<Users size={20} />} 
        iconColorClass="text-blue-400"
      />
      <MetricCard 
        title="Critical Zones" 
        value={stats.high} 
        sub=">75% capacity"
        icon={<Target size={20} />} 
        iconColorClass={stats.high > 0 ? "text-red-400" : "text-emerald-400"}
      />
      <MetricCard 
        title="Average Gate Queue" 
        value={`${stats.avgQueue}`} 
        sub="people per gate"
        icon={<Timer size={20} />} 
        iconColorClass="text-purple-400"
      />
      <MetricCard 
        title="Flow Efficiency" 
        value={`${stats.eff}%`} 
        icon={<Zap size={20} />} 
        iconColorClass="text-indigo-400"
      />
    </div>
  );
}
