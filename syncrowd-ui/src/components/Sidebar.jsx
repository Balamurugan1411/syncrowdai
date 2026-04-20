import React from 'react';
import { LayoutDashboard, Compass, LineChart, BellRing, FastForward, Map, ShieldCheck } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'command', label: 'Command Center', icon: <LayoutDashboard size={18} /> },
    { id: 'navigation', label: 'Smart Navigation', icon: <Compass size={18} /> },
    { id: 'analytics', label: 'Analytics', icon: <LineChart size={18} /> },
    { id: 'alerts', label: 'Alerts & Incidents', icon: <BellRing size={18} /> },
    { id: 'ai', label: 'AI Actions', icon: <Map size={18} /> },
    { id: 'prediction', label: 'Prediction Mode', icon: <FastForward size={18} /> }
  ];

  return (
    <aside className="w-64 glass-panel border-l-0 border-y-0 rounded-none rounded-r-[30px] flex flex-col h-full sticky top-0 left-0 overflow-y-auto">
      {/* Brand */}
      <div className="p-6 flex items-center space-x-3 mb-4 mt-2">
        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg">
           <Map className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white whitespace-nowrap">SynCrowd AI</h2>
          <p className="text-[10px] font-semibold text-indigo-400 tracking-widest uppercase">Cognitive Orchestration Engine</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1.5">
        {navItems.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm ${
                isActive 
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.1)]' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className={isActive ? "text-indigo-400" : "text-slate-500"}>
                 {item.icon}
              </div>
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* System Status Footer */}
      <div className="p-4 mt-auto mb-4">
        <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-2xl">
           <div className="flex items-center space-x-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-300 tracking-wider uppercase">Systems Nominal</span>
           </div>
           <div className="flex space-x-1.5 justify-between">
              {[...Array(7)].map((_, i) => (
                 <div key={i} className="flex-1 h-1.5 rounded-full bg-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              ))}
           </div>
        </div>
      </div>
    </aside>
  );
}
