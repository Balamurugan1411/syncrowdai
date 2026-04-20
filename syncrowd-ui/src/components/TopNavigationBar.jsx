import React from 'react';
import { Bell, Mail, Settings, UserCircle, Users } from 'lucide-react';

export default function TopNavigationBar({ 
  activeTab, 
  setActiveTab, 
  predictionHorizon, 
  setPredictionHorizon, 
  onPredictToggle 
}) {
  const tabs = [
    { id: 'command', label: 'Dashboard' },
    { id: 'navigation', label: 'Smart Navigation' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'notifications', label: 'Notification Hub' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'alerts', label: 'Alerts' },
    { id: 'settings', label: 'Syn Engine' }
  ];

  return (
    <div className="w-full h-16 flex items-center justify-between px-6 border-b border-[#1e293b] bg-gradient-to-r from-[#0c121e] to-[#161e2e] shadow-[0_4px_20px_rgba(0,0,0,0.5)] z-50">
      
      {/* Left: Logo & Live HUD */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <Users className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" size={28} />
          <div className="flex flex-col">
             <span className="text-xl font-bold text-white tracking-tight leading-tight">SynCrowd AI</span>
             <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">Cognitive Orchestration Engine</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center space-x-4 ml-6 px-4 py-1.5 bg-black/40 rounded-full border border-white/5">
           <div className="flex items-center space-x-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Live State</span>
           </div>
           <div className="w-[1px] h-3 bg-white/10"></div>
           <div className="text-[10px] font-mono text-slate-400">
              Uptime: <span className="text-white">04:12:08</span>
           </div>
        </div>
      </div>

      {/* Center: Navigation Links */}
      <div className="flex items-center space-x-6 h-full">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`h-full relative px-1 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${
              activeTab === tab.id ? 'text-white' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)]"></div>
            )}
          </button>
        ))}
      </div>

      {/* Right: Time Travel & Actions */}
      <div className="flex items-center space-x-6">
        
        {/* Time Travel Slider (SaaS Advanced Feature) */}
        <div className="flex flex-col items-center space-y-1 bg-black/30 px-4 py-1 rounded border border-white/5 group">
           <div className="flex justify-between w-full">
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">Predictive Horizon</span>
              <span className="text-[8px] font-mono text-cyan-400">T +{predictionHorizon}m</span>
           </div>
           <input 
              type="range" 
              min="0" max="60" step="15" 
              value={predictionHorizon}
              onChange={(e) => {
                 const val = parseInt(e.target.value);
                 setPredictionHorizon(val);
                 if (val > 0) onPredictToggle(); // Trigger prediction simulation
              }}
              className="w-32 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
           />
        </div>

        <div className="flex items-center space-x-4 text-slate-300">
           <div className="relative cursor-pointer hover:text-white transition-colors">
              <Bell size={18} />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-[#0c121e]"></div>
           </div>
           <div className="relative cursor-pointer hover:text-white transition-colors">
              <Settings size={18} />
           </div>
        </div>
        
        <div className="h-6 w-px bg-slate-700"></div>

        <div className="flex items-center space-x-3 cursor-pointer group bg-white/5 px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors border border-white/5">
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-white leading-none">B. Balaji</span>
              <span className="text-[9px] text-emerald-500 font-medium">Head of Operations</span>
           </div>
           <UserCircle size={24} className="text-slate-300 group-hover:text-white transition-colors" />
        </div>
      </div>

    </div>
  );
}
