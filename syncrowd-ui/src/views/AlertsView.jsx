import React, { useState } from 'react';
import { AlertTriangle, AlertCircle, Info, MapPin, Clock, Check, Loader2, ShieldAlert, Radio, Activity } from 'lucide-react';

export default function AlertsView() {
  const [filter, setFilter] = useState('All');
  const [resolving, setResolving] = useState({});
  const [resolved, setResolved] = useState({});

  // Hardcoded mock alerts to match the screenshot layout precisely
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'Structural Overcrowding: North Stand',
      desc: 'Occupancy exceeding safety thresholds (92%). Potential for crush hazard at Exit N-4.',
      location: 'North Stand (Level 2)',
      time: '12s ago',
      priority: 'High'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Flow Impediment: Gate 4 Entrance',
      desc: 'Sustained inflow spike detected. Queue wait times projected to exceed 12 mins.',
      location: 'Gate 4 Concourse',
      time: '45s ago',
      priority: 'Medium'
    },
    {
      id: 3,
      type: 'info',
      title: 'AI Logistics Optimization',
      desc: 'System recommends opening auxiliary turnstiles at Gate 2 for better redistribution.',
      location: 'Gate 2 Hub',
      time: '2m ago',
      priority: 'Low'
    },
    {
      id: 4,
      type: 'warning',
      title: 'Heat Map Anomaly Detected',
      desc: 'Irregular clustering observed in Section G. Possible unauthorized gathering.',
      location: 'Section G Lower',
      time: '3m ago',
      priority: 'Medium'
    },
    {
      id: 5,
      type: 'critical',
      title: 'Emergency Medical Dispatch',
      desc: 'Cardiac event reported in West Wing. First responders dispatched. Path cleared.',
      location: 'West Concourse',
      time: '5m ago',
      priority: 'High'
    }
  ]);

  const handleResolve = (id) => {
    setResolving(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setResolving(prev => ({ ...prev, [id]: false }));
      setResolved(prev => ({ ...prev, [id]: true }));

      // Auto-remove after showing 'Resolved' state for 2 seconds
      setTimeout(() => {
        setAlerts(prev => prev.filter(a => a.id !== id));
      }, 2000);
    }, 1200);
  };

  const filteredAlerts = filter === 'All'
    ? alerts
    : alerts.filter(a => a.type === filter.toLowerCase());

  const getStyle = (type) => {
    switch (type) {
      case 'critical': return {
        bg: 'bg-red-950/20', border: 'border-red-500/30', icon: <AlertCircle className="w-6 h-6 text-red-500" />, text: 'text-red-500', tagBg: 'bg-red-500/20 text-red-500', glow: 'shadow-[0_0_20px_rgba(239,68,68,0.15)]'
      };
      case 'warning': return {
        bg: 'bg-amber-950/20', border: 'border-amber-500/30', icon: <AlertTriangle className="w-6 h-6 text-amber-500" />, text: 'text-amber-500', tagBg: 'bg-amber-500/20 text-amber-500', glow: 'shadow-[0_0_15px_rgba(245,158,11,0.1)]'
      };
      case 'info': return {
        bg: 'bg-cyan-950/20', border: 'border-cyan-500/30', icon: <Info className="w-6 h-6 text-cyan-500" />, text: 'text-cyan-500', tagBg: 'bg-cyan-500/20 text-cyan-500', glow: 'shadow-[0_0_15px_rgba(6,182,212,0.1)]'
      };
      default: return {};
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col space-y-8 animate-fade-in-down pt-2">

      {/* Header HUD */}
      <div className="flex justify-between items-center bg-black/40 p-6 rounded-2xl border border-white/5 backdrop-blur-md skeuo-inset">
        <div>
           <div className="flex items-center space-x-3 mb-1">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <h2 className="text-2xl font-bold text-white uppercase tracking-tighter">Incident Command Center</h2>
           </div>
           <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Global Security Stream // Node 0xAF22 // Active Session</p>
        </div>
        <div className="flex space-x-4">
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Active Alerts</span>
              <span className="text-2xl font-black text-red-500">{alerts.filter(a => a.type === 'critical').length}</span>
           </div>
           <div className="w-[1px] h-10 bg-white/10"></div>
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-500 uppercase">System Status</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center mt-2 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                 <ShieldAlert size={12} className="mr-1.5" /> SECURE
              </span>
           </div>
        </div>
      </div>

      {/* Control Strip */}
      <div className="flex justify-between items-center">
         <div className="flex space-x-2">
            {['All', 'Critical', 'Warning', 'Info'].map(f => (
               <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${filter === f
                        ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] border border-cyan-400'
                        : 'bg-white/5 text-slate-400 border border-transparent hover:bg-white/10'
                  }`}
               >
                  {f}
               </button>
            ))}
         </div>
         <div className="flex items-center space-x-4 text-slate-500 font-mono text-[10px]">
            <Radio size={12} className="animate-pulse text-red-500" /> 
            <span>LISTENING TO EMERGENCY FREQUENCY 442.85 MHZ</span>
         </div>
      </div>

      {/* Alert Feed */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
           <div className="py-20 flex flex-col items-center justify-center skeuo-inset rounded-2xl border border-white/5">
              <div className="p-6 rounded-full bg-emerald-500/5 border border-emerald-500/20 mb-4">
                 <Check className="w-12 h-12 text-emerald-500 opacity-20" />
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">No active incidents detected</p>
           </div>
        ) : (
           filteredAlerts.map(alert => {
             const style = getStyle(alert.type);
             return (
               <div key={alert.id} className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.01] ${style.bg} ${style.border} ${style.glow} flex items-start group`}>

                 <div className="p-4 bg-black/40 rounded-xl mr-6 border border-white/5 shadow-inner relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="relative z-10">{style.icon}</div>
                 </div>

                 <div className="flex-1">
                   <div className="flex items-center justify-between mb-2">
                     <div className="flex items-center space-x-4">
                        <h3 className={`text-xl font-bold tracking-tight ${style.text}`}>{alert.title}</h3>
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${style.tagBg} ${style.border}`}>{alert.type}</span>
                        <div className="flex items-center space-x-1.5 bg-black/40 px-2 py-0.5 rounded border border-white/5">
                           <Activity size={10} className="text-slate-500" />
                           <span className="text-[10px] font-mono text-slate-500">PRIORITY: {alert.priority}</span>
                        </div>
                     </div>

                     <div>
                       {resolved[alert.id] ? (
                         <span className="text-xs font-bold text-emerald-500 uppercase px-4 py-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 flex items-center shadow-inner">
                           <Check className="w-4 h-4 mr-2" /> Incident Resolved
                         </span>
                       ) : (
                         <button
                           onClick={() => handleResolve(alert.id)}
                           disabled={resolving[alert.id]}
                           className={`text-[10px] font-black uppercase px-5 py-2.5 rounded-lg border transition-all flex items-center shadow-lg ${
                                       resolving[alert.id]
                                       ? 'bg-slate-800 text-slate-400 border-slate-700 cursor-not-allowed'
                                       : 'bg-white/5 text-slate-200 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20'
                                    }`}
                         >
                           {resolving[alert.id] ? (
                             <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Committing to Ledger...</>
                           ) : (
                             "Execute Mitigation"
                           )}
                         </button>
                       )}
                     </div>
                   </div>
                   
                   <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-3xl">{alert.desc}</p>

                   <div className="flex items-center space-x-8 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                     <div className="flex items-center space-x-2">
                       <MapPin className="w-4 h-4 text-indigo-400" />
                       <span>{alert.location}</span>
                     </div>
                     <div className="flex items-center space-x-2">
                       <Clock className="w-4 h-4 text-slate-500" />
                       <span>Reported: {alert.time}</span>
                     </div>
                     <div className="flex items-center space-x-2">
                        <ShieldAlert size={14} className="text-red-500" />
                        <span>Tactical Support: DISPATCHED</span>
                     </div>
                   </div>
                 </div>

               </div>
             )
           })
        )}
      </div>

    </div>
  );
}
