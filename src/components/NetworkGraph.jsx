import { useState, useEffect, useRef } from "react";
import "./NetworkGraph.css";

const NODE_COUNT = 24;
const CONNECTION_DISTANCE = 140;
const LABELS = [
  "governance", "protocols", "coordination", "commons",
  "agency", "resilience", "polis", "networks",
  "autonomy", "reciprocity",
];
const LABELED_NODES = [0, 3, 6, 9, 12, 15, 18, 21, 5, 17];

function generateNodes(width, height) {
  const nodes = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const labelIdx = LABELED_NODES.indexOf(i);
    nodes.push({
      x: 40 + Math.random() * (width - 80),
      y: 40 + Math.random() * (height - 80),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: labelIdx !== -1 ? 4 : 2 + Math.random() * 3,
      pulseOffset: Math.random() * Math.PI * 2,
      label: labelIdx !== -1 ? LABELS[labelIdx] : null,
    });
  }
  return nodes;
}

export default function NetworkGraph() {
  const WIDTH = 460;
  const HEIGHT = 500;
  const [nodes, setNodes] = useState(() => generateNodes(WIDTH, HEIGHT));
  const frameRef = useRef();

  useEffect(() => {
    let animId;
    const animate = () => {
      setNodes((prev) =>
        prev.map((n) => {
          let { x, y, vx, vy } = n;
          x += vx;
          y += vy;
          if (x < 30 || x > WIDTH - 30) vx *= -1;
          if (y < 30 || y > HEIGHT - 30) vy *= -1;
          return { ...n, x, y, vx, vy };
        })
      );
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const edges = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONNECTION_DISTANCE) {
        edges.push({ i, j, opacity: 1 - dist / CONNECTION_DISTANCE });
      }
    }
  }

  return (
    <div className="network-graph">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="network-graph__svg"
      >
        {edges.map((e, idx) => (
          <line
            key={idx}
            x1={nodes[e.i].x}
            y1={nodes[e.i].y}
            x2={nodes[e.j].x}
            y2={nodes[e.j].y}
            className="network-graph__edge"
            style={{ opacity: e.opacity * 0.35 }}
          />
        ))}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle
              cx={n.x}
              cy={n.y}
              r={n.radius + 4}
              className="network-graph__glow"
              style={{ animationDelay: `${n.pulseOffset}s` }}
            />
            <circle
              cx={n.x}
              cy={n.y}
              r={n.radius}
              className="network-graph__node"
              style={{ animationDelay: `${n.pulseOffset}s` }}
            />
            {n.label && (
              <text
                x={n.x}
                y={n.y - 10}
                className="network-graph__label"
                textAnchor="middle"
              >
                {n.label}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
