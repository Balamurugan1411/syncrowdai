import React, { useState, useEffect } from 'react';
import {
   Sparkles, BrainCircuit, ArrowRight, Zap, Target,
   CheckCircle2, Loader2, DollarSign, Activity, Settings2, Shield, XCircle, PlaySquare, Radio, ChevronDown, ChevronUp, Terminal, Network, Orbit, Cpu
} from 'lucide-react';

export default function AISuggestions() {
   const [activeTab, setActiveTab] = useState('All');
   const [executingActions, setExecutingActions] = useState({});
   const [simulatingActions, setSimulatingActions] = useState({});
   const [completedActions, setCompletedActions] = useState({});
   const [dismissedActions, setDismissedActions] = useState({});
   const [expandedReasoning, setExpandedReasoning] = useState({});

   // Fake streaming metrics state
   const [streamingMetrics, setStreamingMetrics] = useState({ cpu: 12, memory: 4, latency: 15 });

   useEffect(() => {
      // Simulate highly advanced live server load
      const interval = setInterval(() => {
         setStreamingMetrics({
            cpu: 8 + Math.floor(Math.random() * 20),
            memory: Math.random() < 0.5 ? 4 : 5,
            latency: 10 + Math.floor(Math.random() * 15)
         });
      }, 2500);
      return () => clearInterval(interval);
   }, []);

   const handleExecute = (id) => {
      setExecutingActions(prev => ({ ...prev, [id]: true }));
      setTimeout(() => {
         setExecutingActions(prev => ({ ...prev, [id]: false }));
         setCompletedActions(prev => ({ ...prev, [id]: true }));
      }, 2500);
   };

   const handleSimulate = (id) => {
      setSimulatingActions(prev => ({ ...prev, [id]: true }));
      setExpandedReasoning(prev => ({ ...prev, [id]: true })); // Auto open reasoning when simulating
      setTimeout(() => {
         setSimulatingActions(prev => ({ ...prev, [id]: false }));
      }, 4000);
   };

   const handleDismiss = (id) => {
      setDismissedActions(prev => ({ ...prev, [id]: true }));
   };

   const toggleReasoning = (id) => {
      setExpandedReasoning(prev => ({ ...prev, [id]: !prev[id] }));
   };

   const suggestions = [
      {
         id: 1,
         category: 'Flow',
         title: 'Dynamically Reroute Gate 1 Inflow',
         reason: 'Predictive models show critical bottleneck formatting at Gate 1 in 14 minutes due to localized transport drops.',
         action: 'Open secondary turnstiles G1-B and auto-direct attendees via digital signage to Gate 2.',
         impact: '+24% Flow Efficiency',
         model: 'Vector Flow Predictor',
         confidence: 94,
         icon: <BrainCircuit className="w-6 h-6 text-indigo-400" />,
         reasoningSteps: [
            "[AI] Ingesting real-time SCATS transport data bounds...",
            "[SYS] Anomaly detected: 4 trains dropped simultaneously at Stadium Station.",
            "[Graph] Simulating pedestrian trajectory (N=14,200 agents)",
            "[Ops] Critical node failure imminent at Gate 1 (Predicted: 14m 23s).",
            "[AI] Running 1,500 Monte Carlo permutations...",
            "[AI] Selected Route G1-B optimization. Conflict resolution: 99.8% safe."
         ],
         theme: {
            glow: 'bg-indigo-500/5 group-hover:bg-indigo-500/10',
            bgLight: 'bg-indigo-500/10',
            border: 'border-indigo-500/20',
            borderGlow: 'border-indigo-500/50',
            text: 'text-indigo-400',
            stroke: 'text-indigo-500 drop-shadow-md',
            btnBg: 'bg-indigo-600',
            btnHover: 'hover:bg-indigo-500',
            btnDisabled: 'bg-indigo-500/50',
            btnShadow: 'shadow-indigo-500/20'
         }
      },
      {
         id: 2,
         category: 'Safety',
         title: 'Deploy Tactical Security to North Concourse',
         reason: 'Anomaly detection flagged irregular crowd clustering near concession stands N3 and N4.',
         action: 'Dispatch 2 security agents from central hub to North Concourse for safety mitigation.',
         impact: '-10% Wait Times',
         model: 'Stampede & Anomaly Detector',
         confidence: 89,
         icon: <Shield className="w-6 h-6 text-red-400" />,
         reasoningSteps: [
            "[Vision] Edge Node #04 (N-Concourse) processing optical flow gradients.",
            "[ML] K-Means clustering identifies non-standard density formations (p=0.87).",
            "[Safety] Correlating with POS wait times: Queues exceeded threshold by 45%.",
            "[RL] Evaluated resource allocation: Agent 7 & Agent 12 available.",
            "[AI] Recommendation emitted: Preemptive tactical dispatch to neutralize cluster."
         ],
         theme: {
            glow: 'bg-red-500/5 group-hover:bg-red-500/10',
            bgLight: 'bg-red-500/10',
            border: 'border-red-500/20',
            borderGlow: 'border-red-500/50',
            text: 'text-red-400',
            stroke: 'text-red-500 drop-shadow-md',
            btnBg: 'bg-red-600',
            btnHover: 'hover:bg-red-500',
            btnDisabled: 'bg-red-500/50',
            btnShadow: 'shadow-red-500/20'
         }
      },
      {
         id: 3,
         category: 'Operations',
         title: 'Pre-cool South Stadium Bowl',
         reason: 'IoT thermal sensors predict a 4-degree temperature spike as the stadium reaches 80% occupancy.',
         action: 'Engage HVAC Zone C and D ahead of standard schedule.',
         impact: '+15% Comfort Metric',
         model: 'Thermodynamic Sensor Fusion',
         confidence: 91,
         icon: <Zap className="w-6 h-6 text-amber-400" />,
         reasoningSteps: [
            "[IoT] Telemetry collected from 150 independent thermal nodes in S-Bowl.",
            "[Thermodynamics] Human biological heat emission calculations projected over 30 mins.",
            "[Twin] Digital Twin projects +4.2°C ambient spike over next 18 mins.",
            "[HVAC API] Pre-cooling sequence validated. Cost efficiency ratio: Optimal.",
            "[AI] Triggering Zone C & D early engagement via SCADA bridge."
         ],
         theme: {
            glow: 'bg-amber-500/5 group-hover:bg-amber-500/10',
            bgLight: 'bg-amber-500/10',
            border: 'border-amber-500/20',
            borderGlow: 'border-amber-500/50',
            text: 'text-amber-400',
            stroke: 'text-amber-500 drop-shadow-md',
            btnBg: 'bg-amber-600',
            btnHover: 'hover:bg-amber-500',
            btnDisabled: 'bg-amber-500/50',
            btnShadow: 'shadow-amber-500/20'
         }
      },
      {
         id: 4,
         category: 'Commerce',
         title: 'Trigger Dynamic Viscosity Pricing',
         reason: 'South Concourse F&B is underutilized by 40% while West Concourse experiences 15min queues.',
         action: 'Drop prices by 10% in South Concourse and push notifications to fans in West sector.',
         impact: '+18% F&B Revenue',
         model: 'Micro-Queue Forecaster',
         confidence: 96,
         icon: <DollarSign className="w-6 h-6 text-emerald-400" />,
         reasoningSteps: [
            "[Data] Ingesting POS transaction frequency cross-stadium.",
            "[Logic] Detected 40% variance below rolling 30-day baseline in Point Sale C (South).",
            "[Graph] Nearest congested queue (15m delay) is West Concourse (Node D).",
            "[AI] Simulating price elasticity demand curve shift: 10% discount -> 18% volume increase.",
            "[API] Ready to dispatch MQTT silent push notifications to 1,200 targeted attendee devices."
         ],
         theme: {
            glow: 'bg-emerald-500/5 group-hover:bg-emerald-500/10',
            bgLight: 'bg-emerald-500/10',
            border: 'border-emerald-500/20',
            borderGlow: 'border-emerald-500/50',
            text: 'text-emerald-400',
            stroke: 'text-emerald-500 drop-shadow-md',
            btnBg: 'bg-emerald-600',
            btnHover: 'hover:bg-emerald-500',
            btnDisabled: 'bg-emerald-500/50',
            btnShadow: 'shadow-emerald-500/20'
         }
      },
      {
         id: 5,
         category: 'Operations',
         title: 'Initiate Transit Synchronization',
         reason: 'Match is concluding 12% faster than historical averages. Imminent early egress detected.',
         action: 'Ping city SCATS API to deploy 3 extra trams to Stadium Station 15 mins ahead of schedule.',
         impact: '-35% Platform Wait',
         model: 'City-Scale Handoff Integration',
         confidence: 85,
         icon: <Radio className="w-6 h-6 text-sky-400" />,
         reasoningSteps: [
            "[Game Logic] NLP analyzing live commentator data and official score telemetry.",
            "[ML Prediction] Predicting early mass-exodus (confidence: high).",
            "[City Graph] Cross-referencing current city transit schedules.",
            "[Math] Deficit of 4,000 transit seats detected 15m ahead.",
            "[AI] Synthesizing payload for intelligent smart-city tram API."
         ],
         theme: {
            glow: 'bg-sky-500/5 group-hover:bg-sky-500/10',
            bgLight: 'bg-sky-500/10',
            border: 'border-sky-500/20',
            borderGlow: 'border-sky-500/50',
            text: 'text-sky-400',
            stroke: 'text-sky-500 drop-shadow-md',
            btnBg: 'bg-sky-600',
            btnHover: 'hover:bg-sky-500',
            btnDisabled: 'bg-sky-500/50',
            btnShadow: 'shadow-sky-500/20'
         }
      }
   ];

   const tabs = ['All', 'Flow', 'Safety', 'Operations', 'Commerce'];

   const filteredSuggestions = suggestions.filter(sug => !dismissedActions[sug.id] && (activeTab === 'All' || sug.category === activeTab));

   return (
      <div className="w-full mx-auto animate-fade-in-down pb-20">

         {/* Top HUD Display */}
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 space-y-6 md:space-y-0">
            <div>
               <h2 className="text-3xl font-extrabold text-white mb-2 flex items-center tracking-tight">
                  <Orbit className="w-8 h-8 mr-3 text-indigo-400 animate-[spin_10s_linear_infinite]" />
                  Cognitive Orchestration
               </h2>
               <p className="text-sm text-slate-400 max-w-lg leading-relaxed">System-wide proactive insights synthesized globally by deep reinforcement learning models and real-time digital twin inference.</p>
            </div>

            <div className="flex flex-col items-end space-y-4">
               {/* Advanced Telemetry HUD */}
               <div className="flex items-center space-x-4 bg-black/40 border border-indigo-500/20 rounded-xl px-4 py-2 backdrop-blur-md">
                  <div className="flex flex-col items-center border-r border-indigo-500/20 pr-4">
                     <span className="text-[9px] uppercase font-bold text-slate-500 mb-0.5 tracking-widest">Inference Nodes</span>
                     <div className="flex items-center text-indigo-300 font-mono text-sm"><Network className="w-3 h-3 mr-1.5" /> 24/24 Online</div>
                  </div>
                  <div className="flex flex-col items-center border-r border-indigo-500/20 pr-4">
                     <span className="text-[9px] uppercase font-bold text-slate-500 mb-0.5 tracking-widest">Engine Load</span>
                     <div className="flex items-center text-emerald-300 font-mono text-sm"><Cpu className="w-3 h-3 mr-1.5" /> {streamingMetrics.cpu}%</div>
                  </div>
                  <div className="flex flex-col items-center">
                     <span className="text-[9px] uppercase font-bold text-slate-500 mb-0.5 tracking-widest">Latency</span>
                     <div className="flex items-center text-sky-300 font-mono text-sm"><Activity className="w-3 h-3 mr-1.5" /> {streamingMetrics.latency}ms</div>
                  </div>
               </div>

               {/* Tabs */}
               <div className="flex space-x-2 bg-slate-900/60 p-1.5 rounded-xl border border-white/5 backdrop-blur-md overflow-x-auto max-w-full">
                  {tabs.map(tab => (
                     <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2 rounded-lg text-sm font-bold tracking-wide transition-all duration-300 whitespace-nowrap ${activeTab === tab ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)] border border-indigo-400/50' : 'text-slate-400 hover:text-slate-100 hover:bg-white/5 border border-transparent'}`}
                     >
                        {tab}
                     </button>
                  ))}
               </div>
            </div>
         </div>

         {/* Suggestions Grid */}
         <div className="space-y-8 relative">
            {/* Background grid line effect */}
            <div className="absolute inset-0 pattern-grid-lg opacity-10 pointer-events-none -z-10"></div>

            {filteredSuggestions.length === 0 && (
               <div className="glass-panel p-16 text-center flex flex-col items-center justify-center min-h-[400px] border-emerald-500/20">
                  <div className="relative mb-6">
                     <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-[40px] animate-pulse"></div>
                     <CheckCircle2 className="w-20 h-20 text-emerald-400 relative z-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Omnipresence Nominal</h3>
                  <p className="text-slate-400 max-w-lg leading-relaxed">Zero anomalies detected. The physical architecture is flowing precisely according to the most optimal computed thermodynamic models.</p>
               </div>
            )}

            {filteredSuggestions.map((sug) => (
               <div key={sug.id} className="glass-panel border border-white/5 hover:border-white/10 transition-colors relative overflow-hidden group">
                  {/* Decorative subtle background glow */}
                  <div className={`absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[80px] pointer-events-none transition-all duration-700 ${sug.theme.glow}`}></div>

                  {/* Card Content Top Layer */}
                  <div className="p-6 md:p-8 flex flex-col lg:flex-row items-start lg:items-stretch relative z-10">

                     {/* Circular Badge Column */}
                     <div className="flex flex-row lg:flex-col items-center lg:w-48 lg:border-r border-white/5 lg:pr-8 mb-6 lg:mb-0 shrink-0 space-x-6 lg:space-x-0 lg:space-y-8">
                        <div className={`w-20 h-20 rounded-3xl border shadow-inner flex items-center justify-center relative ${sug.theme.bgLight} ${sug.theme.border}`}>
                           {sug.icon}
                           {/* Deep scanning scanner overlay effect */}
                           <div className="absolute inset-0 overflow-hidden rounded-3xl">
                              <div className={`w-full h-1 ${sug.theme.btnBg} absolute opacity-30 shadow-[0_0_10px_white] animate-[scan_3s_ease-in-out_infinite]`}></div>
                           </div>
                           <div className={`absolute inset-0 border rounded-3xl animate-ping opacity-20 ${sug.theme.borderGlow}`}></div>
                        </div>

                        <div className="flex flex-col items-center text-center">
                           <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-2 hidden lg:block">Confidence Level</span>
                           <div className="relative w-20 h-20 flex items-center justify-center hidden lg:flex">
                              <svg className="w-full h-full transform -rotate-90">
                                 <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-800" />
                                 <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="226" strokeDashoffset={226 - (226 * sug.confidence) / 100} className={`transition-all duration-1000 ease-out ${sug.theme.stroke}`} />
                              </svg>
                              <div className="absolute flex flex-col items-center">
                                 <span className={`text-xl font-black tracking-tighter ${sug.theme.text}`}>{sug.confidence}<span className="text-xs">%</span></span>
                              </div>
                           </div>
                           <div className="lg:hidden flex space-x-2 items-center px-4 py-1.5 bg-white/5 rounded-lg border border-white/5 mt-4">
                              <Activity className={`w-4 h-4 ${sug.theme.text}`} />
                              <span className="text-sm font-bold text-white">{sug.confidence}% Neural Match</span>
                           </div>
                        </div>
                     </div>

                     {/* Content Column */}
                     <div className="flex-1 lg:pl-8 w-full flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                           <div>
                              <div className="flex items-center space-x-3 mb-2.5">
                                 <span className={`px-2.5 py-1 bg-black/40 shadow-inner text-[10px] font-black uppercase tracking-widest gap-2 rounded border ${sug.theme.text} ${sug.theme.border}`}>
                                    {sug.category}
                                 </span>
                                 <span className="text-[11px] text-slate-400 font-mono flex items-center bg-white/5 px-2 py-1 rounded">
                                    <Settings2 className="w-3.5 h-3.5 mr-1.5 opacity-50" /> {sug.model}
                                 </span>
                              </div>
                              <h3 className="text-2xl font-bold text-white tracking-tight">{sug.title}</h3>
                           </div>

                           <div className="flex-shrink-0 text-right ml-4">
                              <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1.5 block">Estimated Impact</span>
                              <div className="px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-sm font-black shadow-inner whitespace-nowrap flex items-center justify-end">
                                 <Activity className="w-3.5 h-3.5 mr-1.5" />
                                 {sug.impact}
                              </div>
                           </div>
                        </div>

                        <div className="space-y-5 w-full flex-grow">
                           <div className="bg-gradient-to-r from-slate-900/80 to-transparent p-4 rounded-xl border-l-[3px] border-slate-700">
                              <p className="text-sm text-slate-300 leading-relaxed font-medium">{sug.reason}</p>
                           </div>

                           <div className="bg-black/40 p-4 rounded-2xl border border-white/5 md:flex items-center justify-between shadow-inner">
                              <div className="pr-6 mb-4 md:mb-0">
                                 <span className={`text-[10px] font-black uppercase tracking-widest flex items-center mb-1.5 ${sug.theme.text}`}>
                                    <Zap className="w-3.5 h-3.5 mr-1.5" /> Optimal Resolution Path
                                 </span>
                                 <p className="text-base text-slate-100 leading-relaxed font-semibold">{sug.action}</p>
                              </div>

                              <div className="flex flex-wrap md:flex-nowrap gap-3 shrink-0 self-start md:self-center">
                                 {completedActions[sug.id] ? (
                                    <button disabled className="px-6 py-3 w-full md:w-auto bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)] cursor-not-allowed">
                                       <CheckCircle2 className="w-5 h-5 mr-2" /> Action Orchestrated
                                    </button>
                                 ) : (
                                    <>
                                       <button
                                          onClick={() => handleDismiss(sug.id)}
                                          className="p-3 bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-transparent hover:border-red-500/30 rounded-xl transition-all shadow-lg hover:shadow-red-500/10"
                                          title="Reject Intelligence"
                                       >
                                          <XCircle className="w-5 h-5" />
                                       </button>

                                       <button
                                          onClick={() => handleExecute(sug.id)}
                                          disabled={executingActions[sug.id] || simulatingActions[sug.id]}
                                          className={`px-6 py-3 font-bold rounded-xl flex items-center justify-center transition-all shadow-xl whitespace-nowrap ${
                                           executingActions[sug.id] 
                                           ? `${sug.theme.btnDisabled} cursor-not-allowed text-white/50`
                                           : `${sug.theme.btnBg} ${sug.theme.btnHover} text-white hover:${sug.theme.btnShadow}`
                                        }`}
                                       >
                                          {executingActions[sug.id] ? (
                                             <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Orchestrating</>
                                          ) : (
                                             <>Execute Action <ArrowRight className="w-5 h-5 ml-2" /></>
                                          )}
                                       </button>
                                    </>
                                 )}
                              </div>
                           </div>
                        </div>

                        {/* Expandable Chain of thought toggle */}
                        <div className="mt-4 pt-4 border-t border-white/5">
                           <button
                              onClick={() => toggleReasoning(sug.id)}
                              className="w-full flex items-center justify-between text-slate-500 hover:text-slate-300 font-mono text-xs font-semibold uppercase tracking-widest transition-colors py-1 group/btn"
                           >
                              <span className="flex items-center">
                                 <Terminal className="w-4 h-4 mr-2 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                                 View Agentic Chain-of-Thought
                              </span>
                              {expandedReasoning[sug.id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                           </button>
                        </div>
                     </div>
                  </div>

                  {/* Expanded Agentic Reasoning Section */}
                  {expandedReasoning[sug.id] && (
                     <div className="border-t border-white/5 bg-black/60 relative overflow-hidden animate-fade-in-down" style={{ animationDuration: '300ms' }}>

                        {/* Simulation Overlay State */}
                        {simulatingActions[sug.id] && (
                           <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center border-t border-indigo-500/20">
                              <Loader2 className={`w-12 h-12 animate-spin mb-4 ${sug.theme.text}`} />
                              <h4 className="text-white font-bold text-lg mb-1 shadow-black">Simulating Alternative Futures</h4>
                              <p className="text-slate-300 font-mono text-xs">Injecting actions into Digital Twin matrix...</p>
                              <div className="w-64 h-1.5 bg-slate-800 rounded-full mt-6 overflow-hidden">
                                 <div className={`h-full ${sug.theme.btnBg} animate-[pulse_2s_ease-in-out_infinite] w-[70%]`}></div>
                              </div>
                           </div>
                        )}

                        <div className="p-6 lg:pl-56 md:p-8 font-mono text-[11px] md:text-xs">
                           <div className="flex items-center space-x-4 mb-6 text-slate-500 border-b border-white/5 pb-4">
                              <span className="flex items-center"><Cpu className="w-3.5 h-3.5 mr-1" /> Thread ID: 0x{Math.random().toString(16).substr(2, 8).toUpperCase()}</span>
                              <span className="flex items-center"><Activity className="w-3.5 h-3.5 mr-1" /> Latency: {streamingMetrics.latency}ms</span>
                           </div>

                           <div className="space-y-3 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[1px] before:bg-gradient-to-b before:from-transparent before:via-white/5 before:to-transparent">
                              {sug.reasoningSteps.map((step, idx) => {
                                 // Adding staggering visual effect based on completion status
                                 const isSimulating = simulatingActions[sug.id];
                                 const showUpTo = isSimulating ? 2 : 10; // Simple logic to simulate processing

                                 if (idx > showUpTo) return null;

                                 const isAI = step.startsWith('[AI]');
                                 const isSys = step.startsWith('[SYS]') || step.startsWith('[Ops]') || step.startsWith('[API]');

                                 return (
                                    <div key={idx} className="relative flex items-start group relative z-10 pl-8 md:pl-0">
                                       <div className={`absolute left-0 mt-1 md:relative md:left-auto md:mt-0 flex items-center justify-center w-4 h-4 rounded-full border border-black z-20 shrink-0 shadow-lg
                                          ${isAI ? sug.theme.bgLight + ' ' + sug.theme.text : 'bg-slate-800 text-slate-500'}`}
                                       >
                                          <div className={`w-1.5 h-1.5 rounded-full ${isAI ? sug.theme.btnBg : 'bg-slate-500'}`}></div>
                                       </div>
                                       <div className="w-full md:w-[calc(100%-2rem)] md:pl-6 bg-transparent">
                                          <div className={`p-2 rounded border transition-colors ${isAI ? 'bg-indigo-500/5 text-indigo-200 border-indigo-500/10' : 'text-slate-400 border-transparent hover:bg-white/5'}`}>
                                             {step}
                                          </div>
                                       </div>
                                    </div>
                                 );
                              })}
                           </div>

                           {/* Run Simulation CTA */}
                           {!simulatingActions[sug.id] && !completedActions[sug.id] && (
                              <div className="mt-8 pt-6 pl-8 md:pl-10">
                                 <button
                                    onClick={() => handleSimulate(sug.id)}
                                    className={`px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center transition-all`}
                                 >
                                    <PlaySquare className={`w-4 h-4 mr-2 ${sug.theme.text}`} />
                                    Run Digital Twin Simulation Array
                                 </button>
                                 <p className="mt-2 text-[10px] text-slate-600">Simulate this logic inside the isolated sandbox to compute cascading collateral effects prior to execution.</p>
                              </div>
                           )}
                           {completedActions[sug.id] && (
                              <div className="mt-6 pt-6 pl-8 md:pl-10 text-emerald-500 flex items-center font-bold">
                                 <CheckCircle2 className="w-4 h-4 mr-2" />
                                 EXECUTED ON PRODUCTION ENVIRONMENT
                              </div>
                           )}
                        </div>
                     </div>
                  )}

               </div>
            ))}
         </div>

      </div>
   );
}
