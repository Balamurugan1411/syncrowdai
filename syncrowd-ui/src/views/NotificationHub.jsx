import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Map, Users, Bell, ShieldAlert, Radio } from 'lucide-react';

export default function NotificationHub() {
  const [target, setTarget] = useState('all');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('standard');

  const sectors = [
    { id: 'all', label: 'Entire Stadium' },
    { id: 'north', label: 'North Stand (A-D)' },
    { id: 'south', label: 'South Stand (E-H)' },
    { id: 'east', label: 'East Stand (I-K)' },
    { id: 'west', label: 'West Stand (L-O)' },
    { id: 'vip', label: 'VIP Boxes' },
    { id: 'staff', label: 'Operational Staff' }
  ];

  return (
    <div className="h-full flex flex-col space-y-6 animate-fade-in">
      <div className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/5 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-cyan-500/20 rounded-lg">
             <Radio className="text-cyan-400" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Notification Hub</h1>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Geofenced Micro-Casting Interface</p>
          </div>
        </div>
        <div className="flex space-x-2">
           <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded text-[10px] text-emerald-400 font-bold uppercase">
              Broadcast Uplink: Active
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">
        
        {/* Selection Column */}
        <div className="lg:col-span-1 space-y-4">
           <div className="bg-black/30 p-5 rounded-2xl border border-white/5 h-full">
              <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center">
                 <Map size={12} className="mr-2" /> 1. Select Target Sector
              </h2>
              <div className="space-y-2">
                 {sectors.map(s => (
                    <button
                       key={s.id}
                       onClick={() => setTarget(s.id)}
                       className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-300 flex justify-between items-center ${
                          target === s.id 
                          ? 'bg-cyan-500/10 border-cyan-500/50 text-white shadow-[0_0_15px_rgba(34,211,238,0.1)]' 
                          : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'
                       }`}
                    >
                       <span className="text-sm font-bold">{s.label}</span>
                       {target === s.id && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>}
                    </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Message Column */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-black/30 p-6 rounded-2xl border border-white/5 flex flex-col h-full">
              <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center">
                 <Bell size={12} className="mr-2" /> 2. Compose Broadcast
              </h2>
              
              <div className="flex space-x-4 mb-4">
                 {['standard', 'warning', 'emergency'].map(p => (
                    <button
                       key={p}
                       onClick={() => setPriority(p)}
                       className={`flex-1 py-2 rounded-lg border text-[10px] font-black uppercase tracking-tighter transition-all ${
                          priority === p 
                          ? p === 'emergency' ? 'bg-red-500/20 border-red-500 text-red-500' : p === 'warning' ? 'bg-amber-500/20 border-amber-500 text-amber-500' : 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                          : 'bg-white/5 border-transparent text-slate-500'
                       }`}
                    >
                       {p} Priority
                    </button>
                 ))}
              </div>

              <textarea 
                 value={message}
                 onChange={(e) => setMessage(e.target.value)}
                 placeholder="Enter message for broadcast..."
                 className="flex-grow bg-black/40 border border-white/10 rounded-xl p-4 text-slate-200 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors resize-none placeholder:text-slate-700"
              />

              <div className="mt-6 flex items-center justify-between">
                 <div className="flex items-center space-x-2 text-slate-500">
                    <ShieldAlert size={14} />
                    <span className="text-[10px] font-medium italic">Broadcasts are encrypted and logged for compliance.</span>
                 </div>
                 
                 <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-black px-8 py-3 rounded-xl flex items-center space-x-2 transition-all transform active:scale-95 shadow-[0_10px_20px_rgba(34,211,238,0.3)]">
                    <Send size={18} />
                    <span>EXECUTE BROADCAST</span>
                 </button>
              </div>
           </div>

           {/* Preview Card */}
           <div className="bg-gradient-to-r from-cyan-500/5 to-transparent p-4 rounded-xl border border-cyan-500/20">
              <div className="flex items-center space-x-3 mb-2">
                 <Users className="text-cyan-400" size={14} />
                 <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Audience Reach Estimate</span>
              </div>
              <div className="text-2xl font-bold text-white">
                 {target === 'all' ? '48,202' : target === 'vip' ? '1,200' : '8,450'} <span className="text-xs text-slate-500 font-medium tracking-normal italic">devices connected in {target} sector</span>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
