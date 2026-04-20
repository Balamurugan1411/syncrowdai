import { STADIUM_NODES } from '../utils/graphUtils';

export class PredictionEngine {
  
  static predictNext15Mins(currentDensities, phase) {
    const predicted = JSON.parse(JSON.stringify(currentDensities));

    for (let key in STADIUM_NODES) {
      if (key.startsWith('G')) {
        let gateState = predicted[key];
        
        if (phase === 'Entry') {
          // Gates get more congested over 15 mins during entry
          if (STADIUM_NODES[key].type === 'Emergency') continue;
          gateState.load = Math.min(gateState.load + 40, 100);
          gateState.queue += 100;
        } else if (phase === 'Exit' || phase === 'Emergency') {
          // Massive outward flow
          gateState.load = Math.min(gateState.load + 60, 100);
          gateState.queue += 200;
        } else {
          // Match phase: queue diminishes
          gateState.load = Math.max(0, gateState.load - 30);
          gateState.queue = Math.max(0, gateState.queue - 50);
        }
        
        predicted[key] = gateState;
      } else {
        // Concourses and food
        if (STADIUM_NODES[key].type === 'food' && phase === 'Match') {
           predicted[key] = Math.min(predicted[key] + 50, 100); // Food courts get very busy during match
        } else if (STADIUM_NODES[key].type === 'seating' && phase === 'Entry') {
           predicted[key] = Math.min(predicted[key] + 60, 100); // Seating fills up
        } else if (phase === 'Exit') {
           predicted[key] = Math.max(10, predicted[key] - 50); // Seating empties
        }
        
        // Add general noise
        predicted[key] = Math.max(10, Math.min(predicted[key] + Math.floor(Math.random() * 20) - 10, 100));
      }
    }
    
    return predicted;
  }
}
