import { STADIUM_NODES } from '../utils/graphUtils';

export class SimulationEngine {
  constructor(updateCallback) {
    this.updateCallback = updateCallback;
    this.intervalId = null;
    this.incidentActive = false;
    this.phase = 'Entry'; // Entry, Match, Exit, Emergency
  }

  setPhase(newPhase) {
    this.phase = newPhase;
  }

  start(currentDensities) {
    if (this.intervalId) return;

    this.intervalId = setInterval(() => {
      let nextDensities = JSON.parse(JSON.stringify(currentDensities)); // Deep copy since gates are objects now
      
      for (let key in STADIUM_NODES) {
        const node = STADIUM_NODES[key];
        
        if (key.startsWith('G')) {
          // Gate Logic
          let gateState = nextDensities[key];
          
          // Determine base traffic based on phase
          let trafficChange = 0;
          if (this.phase === 'Entry') {
            trafficChange = node.type === 'Emergency' ? -5 : Math.floor(Math.random() * 15) - 2; // Traffic coming in
          } else if (this.phase === 'Match') {
            trafficChange = Math.floor(Math.random() * 5) - 2; // Minimal traffic
          } else if (this.phase === 'Exit') {
            trafficChange = node.type === 'VIP' ? 5 : Math.floor(Math.random() * 15) - 2; // Traffic going out
          } else if (this.phase === 'Emergency') {
            trafficChange = node.type === 'Emergency' ? 30 : 20; // Massive exit surge
          }

          if (this.incidentActive && key === 'G1') {
             trafficChange += 20; // Surge
          }

          // Update load
          gateState.load = Math.max(0, Math.min(gateState.load + trafficChange, 100));
          
          // Update queue length based on load and capacity
          if (gateState.load > 75) {
            gateState.queue += Math.floor(Math.random() * 10);
            gateState.status = 'Congested';
          } else if (gateState.load < 40) {
            gateState.queue = Math.max(0, gateState.queue - Math.floor(Math.random() * 15));
            gateState.status = 'Open';
          }

          if (gateState.load >= 100) gateState.status = 'Closed';

          // Auto-redistribute crowd AI: if load > 80, shift load to a neighboring gate
          if (gateState.load > 80 && this.phase !== 'Emergency') {
            gateState.load -= 15; // Shift load away
            // Find another gate in the same zone to take the load
            const siblingGates = Object.keys(STADIUM_NODES).filter(k => k.startsWith('G') && STADIUM_NODES[k].zone === node.zone && k !== key);
            if (siblingGates.length > 0) {
              const target = siblingGates[Math.floor(Math.random() * siblingGates.length)];
              nextDensities[target].load = Math.min(nextDensities[target].load + 10, 100);
            }
          }
          
          nextDensities[key] = gateState;
        } else {
          // Concourse Logic
          const change = Math.floor(Math.random() * 9) - 4; // -4 to +4
          nextDensities[key] = Math.max(10, Math.min(nextDensities[key] + change, 100));
        }
      }

      // Update the reference in memory so the next tick uses it
      Object.assign(currentDensities, nextDensities);
      
      this.updateCallback(nextDensities);
    }, 2000); // 2 second tick
  }

  triggerIncident() {
    this.incidentActive = true;
    setTimeout(() => {
      this.incidentActive = false;
    }, 15000); // incident lasts 15s
  }

  toggleGate(gateId, currentDensities) {
    if (currentDensities[gateId]) {
       currentDensities[gateId].status = currentDensities[gateId].status === 'Closed' ? 'Open' : 'Closed';
       if (currentDensities[gateId].status === 'Closed') {
          currentDensities[gateId].load = 0;
       }
       this.updateCallback({...currentDensities});
    }
  }

  stop() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = null;
  }
}
