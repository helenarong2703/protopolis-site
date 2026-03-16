import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { pillars } from "../data/pillars";
import Pillars from "./Pillars";
import "./WorkAreas.css";

/* ── colour palette ─────────────────────────────────────────── */
const COLORS = {
  yellow: "#f5c542",
  purple: "#b07aff",
  teal: "#00d4aa",
};

/* ── three main clusters ────────────────────────────────────── */
const clusters = [
  {
    id: "human-human",
    label: "Human",
    number: "01",
    subtitle: "Civic Protocols & Collective Governance",
    color: COLORS.yellow,
    pillarIndex: 0,
    keywords: pillars[0].keywords,
    cx: 0.22,
    cy: 0.35,
  },
  {
    id: "human-env",
    label: "Environment",
    number: "02",
    subtitle: "Embodied Urban Futures",
    color: COLORS.teal,
    pillarIndex: 1,
    keywords: pillars[1].keywords,
    cx: 0.72,
    cy: 0.30,
  },
  {
    id: "ai",
    label: "AI",
    number: "03",
    subtitle: "AI Governance & Agentic Systems",
    color: COLORS.purple,
    pillarIndex: 2,
    keywords: pillars[2].keywords,
    cx: 0.45,
    cy: 0.72,
  },
];

const trustData = {
  id: "trust",
  label: "04. Trust Experience Design (TXD)",
  pillarIndex: 3,
  keywords: pillars[3].keywords,
};

/* ── constants ──────────────────────────────────────────────── */
const KEYWORD_SPREAD = 130;
const BLOB_RADIUS = 220;
const CONNECTION_DIST = 180;
const DRIFT_SPEED = 0.18;

/* ── generate an organic blob path (SANAA-style) with breathing ── */
function generateBlobPath(cx, cy, baseR, seed, time) {
  const t = time || 0;
  const points = 10;
  const coords = [];
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2;
    const noise = Math.sin(seed * 17.3 + i * 4.7) * 0.3
                + Math.cos(seed * 11.1 + i * 7.3) * 0.25
                + Math.sin(seed * 5.9 + i * 2.1) * 0.15;
    // breathing: slow sinusoidal wobble per control point
    const breathe = Math.sin(t * 0.4 + i * 1.3 + seed * 2.7) * 0.03
                  + Math.cos(t * 0.3 + i * 0.9 + seed * 1.1) * 0.02;
    const r = baseR * (0.8 + noise * 0.55 + breathe);
    const yScale = 0.7 + Math.sin(seed * 3.3 + i * 1.7) * 0.15;
    coords.push({
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r * yScale,
    });
  }
  let d = `M ${coords[0].x} ${coords[0].y}`;
  for (let i = 0; i < coords.length; i++) {
    const prev = coords[(i - 1 + coords.length) % coords.length];
    const curr = coords[i];
    const next = coords[(i + 1) % coords.length];
    const next2 = coords[(i + 2) % coords.length];
    const cp1x = curr.x + (next.x - prev.x) * 0.28;
    const cp1y = curr.y + (next.y - prev.y) * 0.28;
    const cp2x = next.x - (next2.x - curr.x) * 0.28;
    const cp2y = next.y - (next2.y - curr.y) * 0.28;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
  }
  d += " Z";
  return d;
}

/* ── trust blob — 人-shaped bridge from centre outward to all three ── */
function generateTrustBridgePath(w, h) {
  // centre point where the three arms meet
  const cx = w * 0.46;
  const cy = h * 0.46;
  // three target cluster centres
  const targets = [
    { x: 0.22 * w, y: 0.35 * h },  // Human
    { x: 0.72 * w, y: 0.30 * h },  // Environment
    { x: 0.45 * w, y: 0.72 * h },  // AI
  ];
  const armWidth = 45;

  // build three arms, each a quadrilateral from centre to target
  let d = "";
  targets.forEach((t, i) => {
    const dx = t.x - cx;
    const dy = t.y - cy;
    const len = Math.sqrt(dx * dx + dy * dy);
    const nx = -dy / len;
    const ny = dx / len;
    // irregularity per arm
    const n1 = armWidth * (0.8 + Math.sin(i * 5.3 + 1.7) * 0.4);
    const n2 = armWidth * (0.6 + Math.cos(i * 3.1 + 2.9) * 0.35);
    const n3 = armWidth * (0.9 + Math.sin(i * 7.7 + 4.1) * 0.3);
    // centre side (wide)
    const c1x = cx + nx * n1;
    const c1y = cy + ny * n1;
    const c2x = cx - nx * n1;
    const c2y = cy - ny * n1;
    // target side (narrower, with noise)
    const t1x = t.x + nx * n2;
    const t1y = t.y + ny * n2;
    const t2x = t.x - nx * n3;
    const t2y = t.y - ny * n3;
    // midpoints with organic curve offset
    const mx = (cx + t.x) / 2 + nx * Math.sin(i * 4.4 + 3.3) * 25;
    const my = (cy + t.y) / 2 + ny * Math.sin(i * 4.4 + 3.3) * 25;
    const m1x = mx + nx * (n1 + n2) * 0.4;
    const m1y = my + ny * (n1 + n2) * 0.4;
    const m2x = mx - nx * (n1 + n3) * 0.4;
    const m2y = my - ny * (n1 + n3) * 0.4;

    d += `M ${c1x} ${c1y} `;
    d += `Q ${m1x} ${m1y} ${t1x} ${t1y} `;
    d += `L ${t2x} ${t2y} `;
    d += `Q ${m2x} ${m2y} ${c2x} ${c2y} `;
    d += `Z `;
  });

  return d;
}

/* ── build nodes ────────────────────────────────────────────── */
function buildNodes(w, h) {
  const nodes = [];

  clusters.forEach((cluster, ci) => {
    const cx = cluster.cx * w;
    const cy = cluster.cy * h;
    cluster.keywords.forEach((kw) => {
      const angle = Math.random() * Math.PI * 2;
      const r = (Math.random() * 0.5 + 0.35) * KEYWORD_SPREAD;
      nodes.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        vx: (Math.random() - 0.5) * DRIFT_SPEED,
        vy: (Math.random() - 0.5) * DRIFT_SPEED,
        label: kw,
        clusterId: cluster.id,
        clusterIndex: ci,
        color: cluster.color,
        radius: 3 + Math.random() * 2,
        boundsMinX: cx - KEYWORD_SPREAD - 20,
        boundsMaxX: cx + KEYWORD_SPREAD + 20,
        boundsMinY: cy - KEYWORD_SPREAD - 20,
        boundsMaxY: cy + KEYWORD_SPREAD + 20,
        isTrust: false,
      });
    });
  });

  // trust nodes scattered in the interstitial spaces
  const trustKws = trustData.keywords;
  // place trust nodes near the edges of the three blobs, not bunched in centre
  const interstitialZones = [
    { x: 0.35, y: 0.30 },   // edge of Human blob, toward Environment
    { x: 0.35, y: 0.62 },   // closer to AI blob (agentic web lands here)
    { x: 0.60, y: 0.25 },   // edge of Environment blob, toward Human
    { x: 0.65, y: 0.45 },   // edge of Environment blob, toward AI
    { x: 0.35, y: 0.68 },   // edge of AI blob, toward Human
    { x: 0.55, y: 0.62 },   // edge of AI blob, toward Environment
    { x: 0.50, y: 0.42 },   // central but slightly offset
  ];
  const trustColors = [COLORS.yellow, COLORS.teal, COLORS.purple];
  trustKws.forEach((kw, i) => {
    const zone = interstitialZones[i % interstitialZones.length];
    const zx = zone.x * w + (Math.random() - 0.5) * 60;
    const zy = zone.y * h + (Math.random() - 0.5) * 45;
    nodes.push({
      x: zx,
      y: zy,
      vx: (Math.random() - 0.5) * DRIFT_SPEED * 0.7,
      vy: (Math.random() - 0.5) * DRIFT_SPEED * 0.7,
      label: kw,
      clusterId: "trust",
      clusterIndex: -1,
      color: trustColors[i % trustColors.length],
      radius: 3 + Math.random() * 1.5,
      boundsMinX: zx - 90,
      boundsMaxX: zx + 90,
      boundsMinY: zy - 70,
      boundsMaxY: zy + 70,
      isTrust: true,
    });
  });

  return nodes;
}

export default function WorkAreas({ activePillar, setActivePillar }) {
  const containerRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [dimensions, setDimensions] = useState({ w: 1100, h: 650 });
  const [activeCluster, setActiveCluster] = useState(null);
  const [viewMode, setViewMode] = useState("graph"); // "graph" or "list"
  const animRef = useRef();
  const timeRef = useRef(0);

  useEffect(() => {
    if (activePillar === null) {
      setActiveCluster(null);
    } else if (activePillar === 4) {
      setActiveCluster("trust");
    } else {
      const c = clusters.find((cl) => cl.pillarIndex === activePillar - 1);
      if (c) setActiveCluster(c.id);
    }
  }, [activePillar]);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const w = Math.max(rect.width, 600);
        const h = Math.max(500, Math.min(w * 0.55, 650));
        setDimensions({ w, h });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    setNodes(buildNodes(dimensions.w, dimensions.h));
  }, [dimensions]);

  useEffect(() => {
    const animate = () => {
      timeRef.current += 0.016; // ~60fps increment
      setNodes((prev) =>
        prev.map((n) => {
          let { x, y, vx, vy } = n;
          x += vx;
          y += vy;
          if (x < n.boundsMinX || x > n.boundsMaxX) vx *= -1;
          if (y < n.boundsMinY || y > n.boundsMaxY) vy *= -1;
          return { ...n, x, y, vx, vy };
        })
      );
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const { w, h } = dimensions;

  // edges
  const edges = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const ni = nodes[i];
      const nj = nodes[j];
      const dx = ni.x - nj.x;
      const dy = ni.y - nj.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONNECTION_DIST) {
        let color;
        if (ni.isTrust && !nj.isTrust) {
          color = nj.color;
        } else if (nj.isTrust && !ni.isTrust) {
          color = ni.color;
        } else if (ni.clusterId === nj.clusterId && !ni.isTrust) {
          color = ni.color;
        } else {
          color = "var(--color-text-dimmest)";
        }
        edges.push({
          x1: ni.x, y1: ni.y,
          x2: nj.x, y2: nj.y,
          opacity: (1 - dist / CONNECTION_DIST) * 0.5,
          color,
        });
      }
    }
  }

  const t = timeRef.current;
  const clusterCentres = clusters.map((c, i) => ({
    x: c.cx * w,
    y: c.cy * h,
    blobPath: generateBlobPath(c.cx * w, c.cy * h, BLOB_RADIUS, i + 1, t),
    ...c,
  }));

  const trustBridgePath = generateTrustBridgePath(w, h);

  const handleClusterClick = (clusterId, pillarIndex) => {
    if (activeCluster === clusterId) {
      setActiveCluster(null);
      setActivePillar(null);
    } else {
      setActiveCluster(clusterId);
      setActivePillar(pillarIndex + 1);
    }
  };

  let activePillarData = null;
  if (activeCluster === "trust") {
    activePillarData = pillars[trustData.pillarIndex];
  } else if (activeCluster !== null) {
    const c = clusters.find((cl) => cl.id === activeCluster);
    if (c) activePillarData = pillars[c.pillarIndex];
  }

  return (
    <section id="pillars" className="work-areas">
      <div className="work-areas__header">
        <div>
          <div className="work-areas__label">WORK</div>
          <h2 className="work-areas__heading">Four Work Areas</h2>
        </div>
        <div className="work-areas__toggle">
          <button
            className={`work-areas__toggle-btn ${viewMode === "graph" ? "work-areas__toggle-btn--active" : ""}`}
            onClick={() => setViewMode("graph")}
            title="Graph view"
          >
            {"\u25CE"}
          </button>
          <button
            className={`work-areas__toggle-btn ${viewMode === "list" ? "work-areas__toggle-btn--active" : ""}`}
            onClick={() => setViewMode("list")}
            title="List view"
          >
            {"\u2630"}
          </button>
        </div>
      </div>
      <p className="work-areas__intro">
        Protocols operate wherever collective life does: in our institutions, our environments, our machines, and the trust between them.
      </p>

      {viewMode === "list" ? (
        <Pillars activePillar={activePillar} setActivePillar={setActivePillar} embedded />
      ) : (
      <>
      <div className="work-areas__graph" ref={containerRef}>
        <svg
          viewBox={`0 0 ${w} ${h}`}
          className="work-areas__svg"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Trust bridge — 人-shaped, behind everything */}
          <path
            d={trustBridgePath}
            className={`work-areas__trust-blob ${activeCluster === "trust" ? "work-areas__trust-blob--active" : ""}`}
            onClick={() => handleClusterClick("trust", trustData.pillarIndex)}
          />

          {/* Cluster blobs */}
          {clusterCentres.map((c) => (
            <path
              key={`blob-${c.id}`}
              d={c.blobPath}
              className={`work-areas__blob ${activeCluster === c.id ? "work-areas__blob--active" : ""}`}
              style={{ fill: c.color, opacity: activeCluster === c.id ? 0.18 : 0.10 }}
              onClick={() => handleClusterClick(c.id, c.pillarIndex)}
            />
          ))}

          {/* Edges */}
          {edges.map((e, i) => (
            <line
              key={i}
              x1={e.x1} y1={e.y1}
              x2={e.x2} y2={e.y2}
              stroke={e.color}
              strokeWidth={1.2}
              opacity={e.opacity}
            />
          ))}

          {/* Nodes */}
          {nodes.map((n, i) => {
            const clickId = n.isTrust ? "trust" : n.clusterId;
            const clickPillar = n.isTrust
              ? trustData.pillarIndex
              : clusters[n.clusterIndex].pillarIndex;
            return (
              <g key={i} onClick={() => handleClusterClick(clickId, clickPillar)} style={{ cursor: "pointer" }}>
                <circle
                  cx={n.x} cy={n.y}
                  r={n.radius + 4}
                  fill={n.color}
                  opacity={0.12}
                  className="work-areas__glow"
                />
                <circle
                  cx={n.x} cy={n.y}
                  r={n.radius}
                  fill={n.color}
                  opacity={0.85}
                />
                <text
                  x={n.x} y={n.y - 12}
                  textAnchor="middle"
                  className="work-areas__keyword"
                  fill={n.color}
                >
                  {n.label}
                </text>
              </g>
            );
          })}

          {/* Cluster labels — centred in blob */}
          {clusterCentres.map((c) => {
            // offset Human label up-left to avoid TXD text
            const labelX = c.id === "human-human" ? c.x - 30 : c.x;
            const labelY = c.id === "human-human" ? c.y - 24 : c.y - 14;
            const subY = c.id === "human-human" ? c.y + 2 : c.y + 16;
            // split long subtitles into two lines
            const subtitleParts = c.subtitle.length > 25
              ? (() => {
                  const words = `${c.number} ${c.subtitle}`.split(" ");
                  const mid = Math.ceil(words.length / 2);
                  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
                })()
              : [`${c.number} ${c.subtitle}`];
            return (
              <g key={`label-${c.id}`} onClick={() => handleClusterClick(c.id, c.pillarIndex)} style={{ cursor: "pointer" }}>
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  className="work-areas__cluster-label"
                >
                  {c.label}
                </text>
                {subtitleParts.map((line, li) => (
                  <text
                    key={li}
                    x={labelX}
                    y={subY + li * 18}
                    textAnchor="middle"
                    className="work-areas__cluster-subtitle"
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}

          {/* Trust label — centred in the bridge junction */}
          <g onClick={() => handleClusterClick("trust", trustData.pillarIndex)} style={{ cursor: "pointer" }}>
            <text
              x={w * 0.46}
              y={h * 0.46}
              textAnchor="middle"
              className="work-areas__trust-label"
            >
              {trustData.label}
            </text>
          </g>
        </svg>
      </div>

      {/* Expanded detail panel */}
      {activePillarData && (
        <div className="work-areas__detail">
          <div className="work-areas__detail-backdrop" onClick={() => { setActiveCluster(null); setActivePillar(null); }} />
          <div className="work-areas__detail-inner">
            <button
              className="work-areas__detail-close"
              onClick={() => { setActiveCluster(null); setActivePillar(null); }}
            >
              {"\u2715"}
            </button>
            <h3 className="work-areas__detail-title">
              <span className="work-areas__detail-number">{String(activePillarData.number).padStart(2, "0")}</span>{" "}
              {activePillarData.title}
            </h3>
            {activePillarData.description && (
              <p className="work-areas__detail-desc">{activePillarData.description}</p>
            )}
            {activePillarData.works && (
              <div className="work-areas__detail-works">
                <div className="work-areas__detail-works-label">Selected Works</div>
                <div className="work-areas__detail-works-grid">
                  {activePillarData.works.map((wi, i) => (
                    <div key={i} className="work-areas__detail-work">
                      <div className="work-areas__detail-work-title">
                        {wi.slug ? (
                          <Link to={`/${wi.slug}`} className="work-areas__detail-work-link">
                            {wi.t} {"\u2197"}
                          </Link>
                        ) : (
                          wi.t
                        )}
                      </div>
                      <div className={`work-areas__detail-work-meta ${wi.v ? "work-areas__detail-work-meta--italic" : ""}`}>
                        {wi.a}
                        {wi.v ? ` \u2014 ${wi.v}` : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      </>
      )}
    </section>
  );
}
