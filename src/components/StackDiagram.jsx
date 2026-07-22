const CX = 200;
const CY = 206;

const NODES = [
  {
    id: "mobile",
    x: 76,
    y: 114,
    label: "Mobile",
    tone: "orange",
    width: 92,
    pathDelay: "0s",
    dur: "2.8s",
  },
  {
    id: "web",
    x: 324,
    y: 100,
    label: "Web",
    tone: "blue-a",
    width: 78,
    pathDelay: "0.5s",
    dur: "3.1s",
  },
  {
    id: "api",
    x: 200,
    y: 46,
    label: "REST API",
    tone: "blue-b",
    width: 108,
    pathDelay: "1s",
    dur: "2.6s",
  },
  {
    id: "data",
    x: 340,
    y: 284,
    label: "Data",
    tone: "blue-c",
    width: 78,
    pathDelay: "1.5s",
    dur: "3.3s",
  },
  {
    id: "deploy",
    x: 60,
    y: 288,
    label: "Deploy",
    tone: "orange",
    width: 88,
    pathDelay: "2s",
    dur: "2.9s",
  },
];

const TONES = {
  orange: {
    line: "rgba(232, 169, 98, 0.35)",
    node: "rgba(232, 169, 98, 0.55)",
    particle: "#e8a962",
    glow: "rgba(232, 169, 98, 0.55)",
  },
  "blue-a": {
    line: "rgba(94, 196, 232, 0.32)",
    node: "rgba(94, 196, 232, 0.5)",
    particle: "#5ec4e8",
    glow: "rgba(94, 196, 232, 0.5)",
  },
  "blue-b": {
    line: "rgba(110, 181, 255, 0.32)",
    node: "rgba(110, 181, 255, 0.5)",
    particle: "#6eb5ff",
    glow: "rgba(110, 181, 255, 0.5)",
  },
  "blue-c": {
    line: "rgba(122, 157, 255, 0.32)",
    node: "rgba(122, 157, 255, 0.5)",
    particle: "#7a9dff",
    glow: "rgba(122, 157, 255, 0.5)",
  },
};

const pathFor = (x, y) => `M ${CX} ${CY} L ${x} ${y}`;

export const StackDiagram = () => (
  <div className="stack-diagram" aria-hidden="true">
    <svg viewBox="0 0 400 400" className="stack-diagram__svg">
      <defs>
        <radialGradient id="ei-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(232, 169, 98, 0.34)" />
          <stop offset="45%" stopColor="rgba(110, 181, 255, 0.12)" />
          <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
        </radialGradient>

        <filter id="ei-bloom" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="particle-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx={CX} cy={CY} r="118" fill="url(#ei-glow)" className="stack-diagram__aura" />

      {NODES.map((node) => {
        const tone = TONES[node.tone];
        const path = pathFor(node.x, node.y);

        return (
          <g key={node.id}>
            <line
              x1={CX}
              y1={CY}
              x2={node.x}
              y2={node.y}
              stroke={tone.line}
              strokeWidth="1"
              strokeDasharray="3 7"
              className="stack-diagram__line"
            />

            {[0, 0.45].map((offset, i) => (
              <circle
                key={`${node.id}-p-${i}`}
                r={i === 0 ? 3 : 2}
                fill={tone.particle}
                filter="url(#particle-glow)"
                opacity={i === 0 ? 1 : 0.65}
              >
                <animateMotion
                  dur={node.dur}
                  repeatCount="indefinite"
                  path={path}
                  begin={`${parseFloat(node.pathDelay) + offset * parseFloat(node.dur.replace("s", ""))}s`}
                />
              </circle>
            ))}
          </g>
        );
      })}

      {NODES.map((node) => {
        const tone = TONES[node.tone];
        const half = node.width / 2;

        return (
          <g key={`${node.id}-box`}>
            <rect
              x={node.x - half}
              y={node.y - 18}
              width={node.width}
              height="36"
              rx="8"
              fill="rgba(14,14,14,0.88)"
              stroke={tone.node}
              strokeWidth="1"
              className="stack-diagram__node"
            />
            <text
              x={node.x}
              y={node.y + 4}
              textAnchor="middle"
              className="stack-diagram__label"
            >
              {node.label}
            </text>
          </g>
        );
      })}

      <g filter="url(#ei-bloom)">
        <circle cx={CX} cy={CY} r="54" fill="rgba(232,169,98,0.06)" stroke="rgba(232,169,98,0.35)" strokeWidth="1" />
        <circle cx={CX} cy={CY} r="44" fill="#0c0c0c" stroke="rgba(201,168,108,0.45)" strokeWidth="1" />
      </g>

      <text x={CX} y={CY - 1} textAnchor="middle" className="stack-diagram__core-label">
        EI
      </text>
      <text x={CX} y={CY + 14} textAnchor="middle" className="stack-diagram__core-sub">
        INTELLIGENCE
      </text>
    </svg>
  </div>
);
