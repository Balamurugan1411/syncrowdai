import React, { useState, useEffect } from 'react';
import TopNavigationBar from './TopNavigationBar';
import { useSimulation } from '../hooks/useSimulation';
import AICore from './AICore';

// Views
import CommandCenter from '../views/CommandCenter';
import SmartNavigation from '../views/SmartNavigation';
import Analytics from '../views/Analytics';
import AlertsView from '../views/AlertsView';
import AISuggestions from '../views/AISuggestions';
import FacilitiesView from '../views/FacilitiesView';
import NotificationHub from '../views/NotificationHub';
import AccessibilityManager from '../views/AccessibilityManager';
import SynAssistant from './SynAssistant';

export default function Dashboard() {
  const { 
    densities, 
    alerts, 
    isPredicting, 
    activeRoute,
    phase,
    setPhase,
    triggerEmergencyMode,
    triggerIncident, 
    togglePrediction, 
    calculateRoute,
    toggleGate
  } = useSimulation();

  const [activeTab, setActiveTab] = useState('command');
  const [showSync, setShowSync] = useState(false);
  const [predictionHorizon, setPredictionHorizon] = useState(0);

  // Trigger "Neural Sync" effect on phase change
  useEffect(() => {
    setShowSync(true);
    const timer = setTimeout(() => setShowSync(false), 1200);
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#080c14] relative">
      
      {/* Global CRT Scanline Effect */}
      <div className="crt-overlay"></div>

      {/* Global Background Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
         <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      {/* New Top Navigation Bar */}
      <TopNavigationBar 
         activeTab={activeTab} 
         setActiveTab={setActiveTab} 
         predictionHorizon={predictionHorizon}
         setPredictionHorizon={setPredictionHorizon}
         onPredictToggle={togglePrediction}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 z-10 relative">
         <div className="h-full w-full max-w-[1800px] mx-auto flex flex-col">
            <div className="flex-grow">
               {activeTab === 'command' && (
                 <CommandCenter 
                    densities={densities} 
                    activeRoute={activeRoute} 
                    alerts={alerts}
                    phase={phase}
                    setPhase={setPhase}
                    triggerEmergencyMode={triggerEmergencyMode}
                    predictionHorizon={predictionHorizon}
                    toggleGate={toggleGate}
                 />
               )}
               
               {activeTab === 'navigation' && (
                 <SmartNavigation 
                    onPredict={togglePrediction} 
                    onIncident={triggerIncident} 
                    onRoute={(start, end) => calculateRoute(start, end)}
                    isPredicting={isPredicting}
                 />
               )}

               {activeTab === 'analytics' && (
                 <Analytics densities={densities} />
               )}

               {activeTab === 'facilities' && (
                 <FacilitiesView />
               )}

               {activeTab === 'notifications' && (
                 <NotificationHub />
               )}

               {activeTab === 'accessibility' && (
                 <AccessibilityManager />
               )}

               {activeTab === 'alerts' && (
                 <AlertsView />
               )}

               {activeTab === 'settings' && (
                 <AISuggestions />
               )}
            </div>

            {/* Legal Disclaimer Footer */}
            <footer className="mt-8 py-4 border-t border-white/5 flex flex-col md:flex-row justify-between items-center opacity-40 hover:opacity-100 transition-opacity">
               <div className="text-[10px] text-slate-500 font-mono tracking-tighter">
                  SYNCROWD_OS v4.2.0 // KERNEL: 0x8F9A // SYSTEM_NOMINAL
               </div>
               <div className="text-[10px] text-slate-500 font-medium max-w-md text-center md:text-right leading-relaxed">
                  A technical demonstration of crowd analytics. This project is for educational purposes and is not affiliated with the M. A. Chidambaram Stadium or TNCA.
               </div>
            </footer>
         </div>
      </div>

      {/* Wow Factor: Neural Sync Transition Overlay */}
      {showSync && (
         <div className="fixed inset-0 z-[1000] pointer-events-none flex items-center justify-center animate-fade-in">
            <div className="absolute inset-0 bg-cyan-500/10 backdrop-blur-[2px]"></div>
            <div className="relative flex flex-col items-center">
               <div className="w-64 h-[1px] bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-[scale-x_0.8s_ease-out]"></div>
               <p className="mt-4 text-[10px] font-black text-cyan-400 uppercase tracking-[0.5em] animate-pulse">NEURAL_SYNC_IN_PROGRESS</p>
            </div>
         </div>
      )}

      {/* Wow Factor: AI Core */}
      <AICore />

      {/* Next-Gen: Syn Assistant */}
      <SynAssistant />
    </div>
  );
}
