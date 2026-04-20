import React, { useRef, useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, Mic, Bell } from 'lucide-react';

export default function AlertsPanel({ alerts }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [alerts]);

  const getIcon = (type) => {
    switch(type) {
      case 'danger': return <AlertCircle className="text-red-400 w-4 h-4 flex-shrink-0" />;
      case 'safe': return <CheckCircle className="text-emerald-400 w-4 h-4 flex-shrink-0" />;
      default: return <Info className="text-indigo-400 w-4 h-4 flex-shrink-0" />;
    }
  };

  const getBorderColor = (type) => {
    if(type === 'danger') return 'border-red-500/20 bg-red-500/5';
    if(type === 'safe') return 'border-emerald-500/20 bg-emerald-500/5';
    return 'border-white/5 bg-white/[0.02]';
  }

  return (
    <div className="glass-card p-6 h-full flex flex-col relative overflow-hidden">
      
      <div className="flex items-center justify-between mb-4">
         <h2 className="text-sm font-semibold tracking-wide text-slate-300 flex items-center">
            <Bell className="mr-2 w-4 h-4 text-slate-400" /> Event Log
         </h2>
         <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
         </span>
      </div>
      
      {/* Voice Assistant Mock */}
      <div className="bg-white/5 border border-white/5 rounded-xl p-3 mb-5 flex items-center group cursor-pointer hover:bg-white/10 transition-colors">
         <div className="bg-indigo-500/20 rounded-lg p-2 mr-3 group-hover:bg-indigo-500/30 transition-colors">
           <Mic className="w-4 h-4 text-indigo-400" />
         </div>
         <div>
            <p className="text-xs font-semibold text-slate-300 mb-0.5">Syn AI Copilot</p>
            <p className="text-xs text-slate-500">"Listening for voice commands..."</p>
         </div>
      </div>

      <div ref={scrollRef} className="space-y-3 flex-grow overflow-y-auto pr-2 custom-scrollbar">
        {alerts.length === 0 ? (
          <div className="h-full flex items-center justify-center">
             <p className="text-slate-500 text-sm font-medium">Awaiting Telemetry...</p>
          </div>
        ) : (
          alerts.slice().reverse().map(alert => (
            <div key={alert.id} className={`border rounded-xl p-3 flex items-start ${getBorderColor(alert.type)}`}>
              <div className="mt-0.5 mr-3">{getIcon(alert.type)}</div>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">{alert.msg}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
