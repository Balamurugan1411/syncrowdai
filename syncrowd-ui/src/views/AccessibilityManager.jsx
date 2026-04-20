import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Accessibility, HelpCircle, MapPin, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export default function AccessibilityManager() {
  const [requests, setRequests] = useState([
    { id: 1, type: 'Wheelchair Assistance', location: 'Gate 2', status: 'In Progress', time: '14:32' },
    { id: 2, type: 'Elevator Access', location: 'Section G', status: 'Pending', time: '14:40' },
    { id: 3, type: 'Sensory Room Request', location: 'North Stand', status: 'Resolved', time: '14:15' }
  ]);

  return (
    <div className="h-full flex flex-col space-y-6 animate-fade-in">
      <div className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/5 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-500/20 rounded-lg">
             <Accessibility className="text-purple-400" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Accessibility Intelligence</h1>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Inclusive Venue Orchestration</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
           <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-white">4 Active Requests</span>
              <span className="text-[10px] text-slate-500">Avg Response: 4.2m</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Status Overview Cards */}
        <div className="lg:col-span-1 space-y-4">
           {[
              { label: 'Total Requests', value: '124', icon: HelpCircle, color: 'text-blue-400' },
              { label: 'Active Support', value: '04', icon: Clock, color: 'text-amber-400' },
              { label: 'Safe Zones', value: '98%', icon: CheckCircle2, color: 'text-emerald-400' }
           ].map((stat, i) => (
              <div key={i} className="bg-black/30 p-4 rounded-xl border border-white/5">
                 <div className="flex items-center justify-between mb-2">
                    <stat.icon size={16} className={stat.color} />
                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                 </div>
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
              </div>
           ))}

           <div className="bg-gradient-to-br from-purple-500/20 to-transparent p-5 rounded-xl border border-purple-500/20 mt-6">
              <h3 className="text-sm font-bold text-white mb-2">AI Inclusion Audit</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                 Current crowd density at **Elevator 3** is exceeding comfort thresholds. 
                 <span className="block mt-2 text-purple-400 font-bold underline cursor-pointer">Re-route accessibility requests to Elevator 4?</span>
              </p>
           </div>
        </div>

        {/* Requests List */}
        <div className="lg:col-span-3">
           <div className="bg-black/30 rounded-2xl border border-white/5 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center">
                 <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest">Live Assistance Requests</h2>
                 <button className="text-[10px] font-bold text-cyan-400 hover:underline">View Historical Data</button>
              </div>
              
              <div className="divide-y divide-white/5">
                 {requests.map((req) => (
                    <div key={req.id} className="px-6 py-4 flex items-center justify-between group hover:bg-white/[0.02] transition-colors">
                       <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-lg ${
                             req.status === 'Resolved' ? 'bg-emerald-500/10' : req.status === 'Pending' ? 'bg-amber-500/10' : 'bg-blue-500/10'
                          }`}>
                             {req.status === 'Resolved' ? <CheckCircle2 size={16} className="text-emerald-400" /> : <MapPin size={16} className="text-blue-400" />}
                          </div>
                          <div>
                             <h4 className="text-sm font-bold text-white">{req.type}</h4>
                             <p className="text-xs text-slate-500">Requested from <span className="text-slate-300">{req.location}</span> at {req.time}</p>
                          </div>
                       </div>
                       
                       <div className="flex items-center space-x-6">
                          <div className="flex flex-col items-end">
                             <span className={`text-[10px] font-black uppercase tracking-widest ${
                                req.status === 'Resolved' ? 'text-emerald-500' : req.status === 'Pending' ? 'text-amber-500' : 'text-blue-500'
                             }`}>{req.status}</span>
                             <span className="text-[9px] text-slate-600">Assigned: Team 04</span>
                          </div>
                          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-bold text-slate-300 border border-white/5 transition-all">
                             DISPATCH
                          </button>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
