import React from 'react';
import GateStatusPanel from '../components/GateStatusPanel';
import HeatmapCenterpiece from '../components/HeatmapCenterpiece';
import AIInsightsPanel from '../components/AIInsightsPanel';

export default function CommandCenter({ densities, activeRoute, alerts, phase, setPhase, triggerEmergencyMode, predictionHorizon, toggleGate }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 h-full animate-fade-in-down min-h-[800px]">
      
      {/* Left Column: Gate Status (3/12 width) */}
      <div className="xl:col-span-3 h-full flex flex-col skeuo-panel p-1">
        <GateStatusPanel densities={densities} />
      </div>

      {/* Center Column: Heatmap & Live Stats (6/12 width) */}
      <div className="xl:col-span-6 h-full flex flex-col skeuo-panel p-1">
        <HeatmapCenterpiece 
          densities={densities} 
          activeRoute={activeRoute} 
          phase={phase} 
          predictionHorizon={predictionHorizon} 
          toggleGate={toggleGate} 
        />
      </div>

      {/* Right Column: AI Insights & Camera Feeds (3/12 width) */}
      <div className="xl:col-span-3 h-full flex flex-col space-y-4">
        <AIInsightsPanel 
           densities={densities} 
           phase={phase}
           setPhase={setPhase}
           triggerEmergencyMode={triggerEmergencyMode}
        />
      </div>

    </div>
  );
}
