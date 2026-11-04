import type { CSSProperties } from 'react';

// Decorative eye-tracking scanpath: circles are fixations (bigger = longer look),
// lines are the saccades between them. Coordinates are in a 1200×700 viewBox.
const fixations = [
  { x: 120, y: 560, r: 10 },
  { x: 310, y: 450, r: 18 },
  { x: 450, y: 500, r: 8 },
  { x: 620, y: 320, r: 26 },
  { x: 800, y: 380, r: 12 },
  { x: 880, y: 190, r: 20 },
  { x: 1050, y: 250, r: 14 },
  { x: 1110, y: 450, r: 22 },
];

const DRAW_SECONDS = 5;
const path = fixations.map((f, i) => `${i === 0 ? 'M' : 'L'}${f.x} ${f.y}`).join(' ');

export default function GazeTrail() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-40"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        d={path}
        pathLength={1}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="gaze-path"
        style={{ '--gaze-duration': `${DRAW_SECONDS}s` } as CSSProperties}
      />
      {fixations.map((f, i) => {
        // Each fixation appears as the line reaches it.
        const delay = `${(i / (fixations.length - 1)) * DRAW_SECONDS}s`;
        return (
          <g key={i} className="gaze-fixation" style={{ '--gaze-delay': delay } as CSSProperties}>
            <circle cx={f.x} cy={f.y} r={f.r * 2.2} fill="var(--accent)" opacity={0.15} />
            <circle cx={f.x} cy={f.y} r={f.r} fill="none" stroke="var(--accent)" strokeWidth={1.5} />
            <circle cx={f.x} cy={f.y} r={3} fill="white" />
          </g>
        );
      })}
    </svg>
  );
}
