import React from 'react';
import { motion } from 'framer-motion';
import { STADIUM_NODES } from '../utils/graphUtils';

export default function StadiumMap({ densities, activeRoute, toggleGate }) {
  
  const getColor = (densityValue) => {
    if (densityValue < 40) return '#10b981'; // emerald
    if (densityValue < 75) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };

  return (
    <div className="w-full h-full relative flex items-center justify-center pointer-events-none">
      {/* pointer-events-none on wrapper so it doesn't block background interactions, but SVG nodes will have pointer-events-auto */}
      <svg width="100%" height="100%" viewBox="0 0 800 600" className="z-10 absolute inset-0 w-full h-full drop-shadow-[0_0_15px_rgba(0,0,0,1)]">
        
        <defs>
          <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
        </defs>

        {/* Accurate Chepauk Stadium Architecture */}
        <defs>
           <pattern id="grassPattern" width="10" height="20" patternUnits="userSpaceOnUse">
              <rect width="10" height="20" fill="#15803d" />
              <rect width="5" height="20" fill="#166534" opacity="0.3" />
           </pattern>
        </defs>

        {/* Stadium Bowl Base */}
        <circle cx="400" cy="300" r="340" fill="rgba(15,23,42,0.8)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        
        {/* Grass Pitch */}
        <circle cx="400" cy="300" r="260" fill="url(#grassPattern)" stroke="#14532d" strokeWidth="2" opacity="0.4" />
        
        {/* Stand Segments (Chepauk layout) */}
        {[
           { start: -20, end: 20, label: 'A/B' },
           { start: 30, end: 80, label: 'C/D' },
           { start: 100, end: 170, label: 'E/F' },
           { start: 190, end: 260, label: 'G/H' },
           { start: 280, end: 330, label: 'I/J/K' },
           { start: 340, end: 350, label: 'Anna' }
        ].map((segment, i) => {
           const startRad = (segment.start * Math.PI) / 180;
           const endRad = (segment.end * Math.PI) / 180;
           const rInner = 270;
           const rOuter = 330;
           
           const x1 = 400 + Math.cos(startRad) * rInner;
           const y1 = 300 + Math.sin(startRad) * rInner;
           const x2 = 400 + Math.cos(endRad) * rInner;
           const y2 = 300 + Math.sin(endRad) * rInner;
           const x3 = 400 + Math.cos(endRad) * rOuter;
           const y3 = 300 + Math.sin(endRad) * rOuter;
           const x4 = 400 + Math.cos(startRad) * rOuter;
           const y4 = 300 + Math.sin(startRad) * rOuter;
           
           return (
              <g key={i}>
                 {/* 3D Extrusion for Stand */}
                 <path 
                    d={`M ${x1} ${y1} A ${rInner} ${rInner} 0 0 1 ${x2} ${y2} L ${x3} ${y3+10} A ${rOuter} ${rOuter} 0 0 0 ${x4} ${y4+10} Z`} 
                    fill="rgba(15,23,42,0.6)" 
                 />
                 {/* Top Surface */}
                 <path 
                    d={`M ${x1} ${y1} A ${rInner} ${rInner} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${rOuter} ${rOuter} 0 0 0 ${x4} ${y4} Z`} 
                    fill="rgba(30,41,59,0.9)" 
                    stroke="rgba(16,185,129,0.3)" 
                    strokeWidth="1"
                 />
              </g>
           );
        })}

        {/* Floodlight Towers */}
        {[45, 135, 225, 315].map(angle => {
           const rad = (angle * Math.PI) / 180;
           const x = 400 + Math.cos(rad) * 360;
           const y = 300 + Math.sin(rad) * 360;
           return (
              <g key={angle}>
                 <line x1={x} y1={y} x2={x} y2={y-60} stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                 <circle cx={x} cy={y-60} r="10" fill="white" filter="url(#neonGlow)" opacity="0.6" />
              </g>
           )
        })}

        {/* Cricket Pitch Representation */}
        <rect x="385" y="260" width="30" height="80" fill="rgba(251,191,36,0.1)" stroke="rgba(251,191,36,0.4)" strokeWidth="1" rx="2" />
        
        {/* Connections (corridors) drawn as bezier curves */}
        {Object.values(STADIUM_NODES).map(node => (
          node.connections.map(targetId => {
            if (node.id > targetId) return null;

            const target = STADIUM_NODES[targetId];
            const isGateConnection = node.id.startsWith('G') || targetId.startsWith('G');
            const pathId = `path-${node.id}-${targetId}`;
            
            let nodeDensity = node.id.startsWith('G') ? (densities[node.id]?.load || 0) : (densities[node.id] || 0);
            let pathColor = getColor(nodeDensity);

            return (
              <g key={pathId}>
                <path 
                  id={pathId}
                  d={`M ${node.x} ${node.y} Q 400 300 ${target.x} ${target.y}`}
                  fill="transparent"
                  stroke={isGateConnection ? pathColor : "rgba(255, 255, 255, 0.2)"} 
                  strokeWidth="4"
                  strokeOpacity={isGateConnection ? 0.6 : 0.8}
                  strokeLinecap="round"
                />
                
                {/* Particle Flow Animation for Gate Connections */}
                {isGateConnection && nodeDensity > 0 && (
                  <circle r="4" fill="#ffffff" filter="url(#neonGlow)">
                    <animateMotion dur={`${Math.max(1, 5 - (nodeDensity/20))}s`} repeatCount="indefinite">
                       <mpath href={`#${pathId}`} />
                    </animateMotion>
                  </circle>
                )}
              </g>
            )
          })
        ))}

        {/* Draw Active Route Path */}
        {activeRoute.length > 1 && (
           <motion.path
             d={activeRoute.map((id, index) => {
                const n = STADIUM_NODES[id];
                return index === 0 ? `M ${n.x} ${n.y}` : ` Q 400 300 ${n.x} ${n.y}`
             }).join('')}
             fill="transparent"
             stroke="url(#routeGradient)"
             strokeWidth="8"
             filter="url(#strongGlow)"
             initial={{ pathLength: 0 }}
             animate={{ pathLength: 1 }}
             transition={{ duration: 1.5, ease: "easeOut" }}
             strokeLinecap="round"
           />
        )}

        {/* Draw Nodes */}
        {Object.values(STADIUM_NODES).map(node => {
          const isGate = node.id.startsWith('G');
          const state = densities[node.id] || (isGate ? { load: 0, queue: 0 } : 0);
          const densityValue = isGate ? state.load : state;
          const color = getColor(densityValue);
          
          let iconShape = null;
          if (node.type === 'VIP') {
            iconShape = <polygon points={`${node.x},${node.y-10} ${node.x+10},${node.y+8} ${node.x-10},${node.y+8}`} fill="#fcd34d" />;
          } else if (node.type === 'Emergency') {
            iconShape = <rect x={node.x-8} y={node.y-8} width="16" height="16" fill="#fca5a5" rx="2" />;
          } else {
             iconShape = <circle cx={node.x} cy={node.y} r="12" fill="#94a3b8" />;
          }

          return (
            <g 
              key={node.id} 
              className="cursor-pointer group pointer-events-auto"
              onClick={() => isGate && toggleGate(node.id)}
            >
              
              {/* Pulsing glow for Red Zones or Closed Gates */}
              {(densityValue > 80 || (isGate && state.status === 'Closed')) && (
                <circle cx={node.x} cy={node.y} r="35" fill={isGate && state.status === 'Closed' ? '#ef4444' : color} opacity="0.4" className="animate-ping" style={{ animationDuration: '3s' }} />
              )}

              {/* Node 3D Extrusion (Bottom Layer) */}
              <circle 
                cx={node.x} cy={node.y + 8} r={isGate ? "18" : "20"} 
                fill="rgba(15,23,42,0.5)" stroke={isGate && state.status === 'Closed' ? '#ef4444' : color} strokeWidth="1" opacity="0.5"
              />

              {/* Node Outer Ring (Top Layer) */}
              <circle 
                cx={node.x} cy={node.y} r={isGate ? "18" : "20"} 
                fill={isGate && state.status === 'Closed' ? 'rgba(239,68,68,0.2)' : "rgba(15,23,42,0.95)"} 
                stroke={isGate && state.status === 'Closed' ? '#ef4444' : color} 
                strokeWidth={isGate && state.status === 'Closed' ? "4" : "3"} 
                filter="url(#neonGlow)"
                className="transition-all duration-300 group-hover:scale-110"
              />
              
              {/* Node Inner Core */}
              <g transform={`translate(0, ${isGate ? 0 : -2})`}>
                 {isGate && state.status === 'Closed' ? <text x={node.x} y={node.y + 4} fill="#ef4444" fontSize="10" textAnchor="middle" className="font-black">✕</text> : iconShape}
              </g>

              {/* Stylish Label Badge */}
              <rect x={node.x - 25} y={node.y - (isGate ? 32 : 36)} width="50" height="16" rx="8" fill="rgba(0,0,0,0.8)" stroke={isGate && state.status === 'Closed' ? '#ef4444' : color} strokeWidth="1" />
              <text x={node.x} y={node.y - (isGate ? 21 : 25)} fill={isGate && state.status === 'Closed' ? '#ef4444' : "#ffffff"} fontSize="9" textAnchor="middle" className="font-semibold tracking-wider">
                {isGate && state.status === 'Closed' ? 'CLOSED' : node.label}
              </text>
            </g>
          )
        })}

        {/* User Journey Animated Marker */}
        {activeRoute.length > 1 && (
          <motion.g
             animate={{
              cx: activeRoute.map(id => STADIUM_NODES[id].x),
              cy: activeRoute.map(id => STADIUM_NODES[id].y)
            }}
            transition={{
              duration: activeRoute.length * 1.5,
              ease: "easeInOut",
              repeat: Infinity
            }}
          >
             <circle r="12" fill="#ffffff" opacity="0.4" className="animate-ping" />
             <circle r="6" fill="#ffffff" filter="url(#strongGlow)" />
          </motion.g>
        )}
      </svg>
    </div>
  );
}
