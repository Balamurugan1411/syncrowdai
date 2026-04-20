import { useState, useEffect, useRef } from 'react';
import { SimulationEngine } from '../engine/SimulationEngine';
import { RoutingEngine } from '../engine/RoutingEngine';
import { PredictionEngine } from '../engine/PredictionEngine';
import { getInitialDensities } from '../utils/graphUtils';

export function useSimulation() {
  const [densities, setDensities] = useState(getInitialDensities());
  const [isPredicting, setIsPredicting] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [activeRoute, setActiveRoute] = useState([]);
  const [phase, setPhase] = useState('Entry');
  const engineRef = useRef(null);

  // Saved state for returning from prediction
  const [savedDensities, setSavedDensities] = useState(null);

  useEffect(() => {
    engineRef.current = new SimulationEngine((newDensities) => {
      setDensities(newDensities);
      
      // Auto-generate alerts if density/load > 85
      for (const [key, state] of Object.entries(newDensities)) {
        let loadValue = typeof state === 'object' ? state.load : state;
        if (loadValue >= 85 && typeof state === 'object' && state.status !== 'Closed') {
          addAlert(`High congestion detected at ${key} (${Math.floor(loadValue)}%) - Auto-redistributing`, 'warning');
        }
      }
    });

    engineRef.current.start(densities);

    return () => {
      engineRef.current.stop();
    };
  }, []);

  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.setPhase(phase);
    }
  }, [phase]);

  const addAlert = (msg, type = 'info') => {
    setAlerts(prev => {
      if (prev.find(a => a.msg === msg)) return prev;
      return [{ id: Date.now(), msg, type }, ...prev].slice(0, 5);
    });
  };

  const triggerIncident = () => {
    addAlert("🚨 Emergency Incident: Gate 1 Massive Surge!", "danger");
    engineRef.current.triggerIncident();
  };

  const triggerEmergencyMode = () => {
    setPhase('Emergency');
    addAlert("🚨 EVACUATION INITIATED: ALL EMERGENCY GATES OPENED 🚨", "danger");
    // Suggest an evacuation route for the current active view (e.g. from Section A)
    const evacRoute = RoutingEngine.getEvacuationRoute('S_A', densities);
    setActiveRoute(evacRoute);
    if(evacRoute.length > 0) {
      addAlert(`Evacuation path dynamically routed to safest gate: ${evacRoute[evacRoute.length - 1]}`, 'safe');
    }
  };

  const togglePrediction = () => {
    if (isPredicting) {
      setIsPredicting(false);
      setDensities(savedDensities);
      engineRef.current.start(savedDensities);
    } else {
      setSavedDensities(densities);
      setIsPredicting(true);
      engineRef.current.stop();
      const predicted = PredictionEngine.predictNext15Mins(densities, phase);
      setDensities(predicted);
      addAlert("🔮 Prediction Mode: Viewing projected flow 15 mins from now", "info");
    }
  };

  const calculateRoute = (start, end) => {
    const route = RoutingEngine.getRoute(start, end, densities);
    setActiveRoute(route);
    if (route.length > 0) {
      addAlert(`Navigating from ${start} to ${end}. Path dynamically rerouted to avoid congestion.`, 'safe');
    } else {
      addAlert(`No safe path found from ${start} to ${end}.`, 'danger');
    }
  };

  const suggestBestGate = (sectionId) => {
      const bestGate = RoutingEngine.getBestGate(sectionId, densities, phase);
      if (bestGate) {
          addAlert(`AI Suggestion: Optimal gate for ${sectionId} is ${bestGate} based on real-time queues.`, 'safe');
          calculateRoute(sectionId, bestGate);
      }
  }

  const toggleGate = (gateId) => {
    engineRef.current.toggleGate(gateId, densities);
    addAlert(`Shadow Control: Gate ${gateId} status manually overridden to ${densities[gateId].status}`, 'info');
  };

  return {
    densities,
    alerts,
    isPredicting,
    activeRoute,
    phase,
    setPhase,
    triggerIncident,
    triggerEmergencyMode,
    togglePrediction,
    calculateRoute,
    suggestBestGate,
    toggleGate
  };
}
