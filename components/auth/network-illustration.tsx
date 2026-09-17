"use client";

import { motion } from "framer-motion";

const nodes = [
  { cx: 120, cy: 90, r: 5, delay: 0 },
  { cx: 260, cy: 60, r: 4, delay: 0.6 },
  { cx: 320, cy: 180, r: 6, delay: 1.2 },
  { cx: 180, cy: 220, r: 4, delay: 1.8 },
  { cx: 70, cy: 200, r: 3.5, delay: 0.9 },
];

const links: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 3],
  [3, 4],
  [0, 4],
  [1, 3],
];

export function NetworkIllustration() {
  return (
    <svg viewBox="0 0 380 280" fill="none" className="h-full w-full" aria-hidden="true">
      {links.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a].cx}
          y1={nodes[a].cy}
          x2={nodes[b].cx}
          y2={nodes[b].cy}
          stroke="white"
          strokeOpacity={0.16}
          strokeWidth={1}
        />
      ))}

      {nodes.map((n) => (
        <g key={`${n.cx}-${n.cy}`}>
          <motion.circle
            cx={n.cx}
            cy={n.cy}
            r={n.r}
            fill="white"
            fillOpacity={0.85}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.85 }}
            transition={{ duration: 0.6, delay: n.delay * 0.3 }}
          />
          <motion.circle
            cx={n.cx}
            cy={n.cy}
            r={n.r}
            stroke="white"
            strokeWidth={1}
            fill="none"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: [1, 3.2], opacity: [0.4, 0] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              delay: n.delay,
              ease: "easeOut",
            }}
          />
        </g>
      ))}
    </svg>
  );
}
