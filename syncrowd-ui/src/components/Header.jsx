import React, { useState, useEffect } from 'react';
import { Activity, Radio, Cpu, Network } from 'lucide-react';

export default function Header({ activeTab }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getTitle = () => {
    switch(activeTab) {
      case 'command': return 'Command Center';
      case 'navigation': return 'Smart Navigation';
      case 'analytics': return 'Analytics & Insights';
      case 'alerts': return 'Alerts & Incidents';
      case 'ai': return 'AI Cognitive Actions';
      case 'prediction': return 'Journey & Prediction';
      default: return 'Command Center';
    }
  };

  const TelemetryNode = ({ label, active }) => (
     <div className="flex items-center space-x-1.5">
        <div className={`w-2 h-2 rounded-full ${active ? 'bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]' : 'bg-slate-600'}`}></div>
        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{label}</span>
     </div>
  );

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4 mb-8 glass-card border-none bg-white/[0.01] p-0 shadow-none">
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white mb-1.5 flex items-center">
          Overview / <span className="text-slate-400 ml-2 font-medium">{getTitle()}</span>
        </h1>
        
        {/* Live Ribbon */}
        <div className="flex items-center space-x-4">
           <div className="flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></span>
              <span className="text-xs font-semibold text-indigo-300">Championship Final</span>
           </div>
           <span className="text-sm text-slate-500 border-l border-slate-700 pl-4">
             {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}  •  {time.toLocaleDateString()}
           </span>
        </div>
      </div>
      
      {/* Telemetry Status Grid */}
      <div className="hidden lg:flex flex-col items-end">
         <p className="text-xs font-medium text-slate-500 mb-2">Platform Telemetry Status</p>
         <div className="flex items-center space-x-4 bg-slate-900/50 border border-white/5 py-2 px-4 rounded-xl">
            <TelemetryNode label="NET" active={true} />
            <div className="w-px h-3 bg-white/10"></div>
            <TelemetryNode label="IOT" active={true} />
            <div className="w-px h-3 bg-white/10"></div>
            <TelemetryNode label="AI" active={true} />
            <div className="w-px h-3 bg-white/10"></div>
            <TelemetryNode label="SEC" active={true} />
         </div>
      </div>
      
    </header>
  );
}
