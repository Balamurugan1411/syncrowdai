export const STADIUM_NODES = {
  // MA Chidambaram Stadium (Chepauk) - Accurate Stands & Zones
  C_ANNA: { id: 'C_ANNA', label: 'Anna Pavilion', type: 'concourse', x: 400, y: 110, connections: ['F1', 'F2', 'S_PITCH'] },
  C_IJK: { id: 'C_IJK', label: 'I, J, K Stands', type: 'concourse', x: 260, y: 220, connections: ['F1', 'S_PITCH'] },
  C_GH: { id: 'C_GH', label: 'G, H Stands', type: 'concourse', x: 260, y: 380, connections: ['F1', 'S_PITCH'] },
  C_EF: { id: 'C_EF', label: 'E, F Stands', type: 'concourse', x: 400, y: 490, connections: ['F1', 'F2', 'S_PITCH'] },
  C_CD: { id: 'C_CD', label: 'C, D Stands', type: 'concourse', x: 540, y: 380, connections: ['F2', 'S_PITCH'] },
  C_AB: { id: 'C_AB', label: 'A, B Stands', type: 'concourse', x: 540, y: 220, connections: ['F2', 'S_PITCH'] },
  
  // Food & Pitch (Core)
  F1: { id: 'F1', label: 'Food West', type: 'food', x: 320, y: 300, connections: ['C_IJK', 'C_GH', 'C_ANNA', 'C_EF'] },
  F2: { id: 'F2', label: 'Food East', type: 'food', x: 480, y: 300, connections: ['C_ANNA', 'C_CD', 'C_AB', 'C_EF'] },
  S_PITCH: { id: 'S_PITCH', label: 'Pitch Core', type: 'seating', x: 400, y: 300, connections: ['C_ANNA', 'C_IJK', 'C_GH', 'C_EF', 'C_CD', 'C_AB'] }
};

// Generate 18 gates for MA Chidambaram Stadium (Chepauk)
const TOTAL_GATES = 18;
const RADIUS = 280;
for (let i = 0; i < TOTAL_GATES; i++) {
  const angle = (i / TOTAL_GATES) * Math.PI * 2 - Math.PI / 2; // Start at North
  const x = Math.round(400 + RADIUS * Math.cos(angle));
  const y = Math.round(300 + RADIUS * Math.sin(angle));
  
  const id = `G${i + 1}`;
  
  // Determine Zone & Closest Concourse based on angle (Chepauk layout)
  let zone = 'North';
  let closestConcourse = 'C_ANNA';
  
  if (angle >= -Math.PI/6 && angle < Math.PI/6) { 
    zone = 'East'; 
    closestConcourse = 'C_AB'; 
  }
  else if (angle >= Math.PI/6 && angle < Math.PI/2) { 
    zone = 'South-East'; 
    closestConcourse = 'C_CD'; 
  }
  else if (angle >= Math.PI/2 && angle < 5*Math.PI/6) { 
    zone = 'South'; 
    closestConcourse = 'C_EF'; 
  }
  else if (angle >= 5*Math.PI/6 || angle < -5*Math.PI/6) { 
    zone = 'West'; 
    closestConcourse = 'C_GH'; 
  }
  else if (angle >= -5*Math.PI/6 && angle < -Math.PI/2) {
    zone = 'North-West';
    closestConcourse = 'C_IJK';
  }

  // Assign Types
  let type = 'General';
  let capacity = 120; // people per min
  if (id === 'G1' || id === 'G2' || id === 'G18') {
    type = 'VIP'; // Pavilion side
    capacity = 80;
  } else if (id === 'G9' || id === 'G10') {
    type = 'Emergency';
    capacity = 200;
  }

  STADIUM_NODES[id] = {
    id,
    label: `Gate ${i + 1}`,
    type,
    zone,
    capacity,
    x,
    y,
    connections: [closestConcourse]
  };
  
  // Add reverse connection from concourse
  STADIUM_NODES[closestConcourse].connections.push(id);
}

// Initial state of the simulation with gate properties
export const getInitialDensities = () => {
  const densities = {};
  for (const key in STADIUM_NODES) {
    if (key.startsWith('G')) {
      // Gate State
      densities[key] = {
        load: Math.floor(Math.random() * 20) + 10, // 10-30%
        queue: Math.floor(Math.random() * 50),
        status: 'Open'
      };
    } else {
      // Concourse/Internal State
      densities[key] = Math.floor(Math.random() * 20) + 10;
    }
  }
  return densities;
};
