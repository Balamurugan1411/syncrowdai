import { STADIUM_NODES } from '../utils/graphUtils';

// A* Routing considering physical distance + congestion weight
export class RoutingEngine {
  
  static getRoute(startId, endId, currentDensities) {
    if (!STADIUM_NODES[startId] || !STADIUM_NODES[endId]) return [];

    let openSet = [startId];
    let cameFrom = {};
    let gScore = {};
    let fScore = {};

    for (let node in STADIUM_NODES) {
      gScore[node] = Infinity;
      fScore[node] = Infinity;
    }

    gScore[startId] = 0;
    fScore[startId] = this.heuristic(startId, endId);

    while (openSet.length > 0) {
      let current = openSet.reduce((min, node) => fScore[node] < fScore[min] ? node : min, openSet[0]);

      if (current === endId) {
        return this.reconstructPath(cameFrom, current);
      }

      openSet = openSet.filter(node => node !== current);

      for (let neighbor of STADIUM_NODES[current].connections) {
        let dist = this.heuristic(current, neighbor);
        
        let density = currentDensities[neighbor];
        if (typeof density === 'object') density = density.load;
        else density = density || 10;

        let congestionPenalty = Math.pow(density, 1.5) * 0.1; 
        
        if (density >= 80) {
          congestionPenalty += 500; 
        }

        // Avoid closed gates entirely
        if (typeof currentDensities[neighbor] === 'object' && currentDensities[neighbor].status === 'Closed') {
            congestionPenalty += 10000;
        }

        let tentative_gScore = gScore[current] + dist + congestionPenalty;

        if (tentative_gScore < gScore[neighbor]) {
          cameFrom[neighbor] = current;
          gScore[neighbor] = tentative_gScore;
          fScore[neighbor] = gScore[neighbor] + this.heuristic(neighbor, endId);
          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor);
          }
        }
      }
    }
    return []; 
  }

  static getBestGate(sectionId, currentDensities, phase) {
      let bestGate = null;
      let minScore = Infinity;

      for (let key in STADIUM_NODES) {
          if (key.startsWith('G')) {
              let node = STADIUM_NODES[key];
              let state = currentDensities[key];
              
              if (state.status === 'Closed') continue;
              if (phase === 'Entry' && node.type === 'Emergency') continue;
              
              let dist = this.heuristic(sectionId, key);
              let score = dist + (state.queue * 2) + (state.load * 5); // Penalty for queue and load

              if (score < minScore) {
                  minScore = score;
                  bestGate = key;
              }
          }
      }
      return bestGate;
  }

  static getEvacuationRoute(startId, currentDensities) {
      // Find nearest Emergency gate or General gate
      let bestGate = null;
      let minScore = Infinity;

      for (let key in STADIUM_NODES) {
          if (key.startsWith('G')) {
              let node = STADIUM_NODES[key];
              let state = currentDensities[key];

              // Prefer emergency gates
              let emergencyBonus = node.type === 'Emergency' ? -500 : 0;
              let dist = this.heuristic(startId, key);
              let score = dist + (state.load * 5) + emergencyBonus;

              if (score < minScore) {
                  minScore = score;
                  bestGate = key;
              }
          }
      }

      if (bestGate) {
          return this.getRoute(startId, bestGate, currentDensities);
      }
      return [];
  }

  static heuristic(a, b) {
    let nodeA = STADIUM_NODES[a];
    let nodeB = STADIUM_NODES[b];
    if(!nodeA || !nodeB) return Infinity;
    return Math.sqrt(Math.pow(nodeA.x - nodeB.x, 2) + Math.pow(nodeA.y - nodeB.y, 2));
  }

  static reconstructPath(cameFrom, current) {
    let total_path = [current];
    while (cameFrom[current]) {
      current = cameFrom[current];
      total_path.unshift(current);
    }
    return total_path;
  }
}
