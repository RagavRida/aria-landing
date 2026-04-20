
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const NODES = [
  { id: "plan", label: "Plan", x: 150, y: 80, strategy: "Decomposes complex requests into atomic research intent tokens." },
  { id: "search", label: "Search", x: 260, y: 180, strategy: "Parallel execution across Tavily, Scholar, and ArXiv APIs." },
  { id: "evaluate", label: "Evaluate", x: 150, y: 280, strategy: "Weights sources by authority and cross-references and claims." },
  { id: "synthesize", label: "Synthesize", x: 40, y: 180, strategy: "Collates verified claims into a cohesive, cited narrative." }
];

export function HowItThinks() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <span className="text-accent-violet text-sm font-mono uppercase tracking-widest mb-4 block">The Architecture</span>
        <h2 className="font-serif text-4xl md:text-6xl mb-4 text-foreground">A closed-loop intelligence.</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">Hover the nodes to see how ARIA manages internal state through the LangGraph loop.</p>
      </div>

      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <div className="relative w-full aspect-[4/3] max-w-[500px]">
          <svg viewBox="0 0 300 360" className="w-full h-full">
            {/* Arrows */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="text-border" />
              </marker>
              <marker id="arrowhead-active" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="text-accent-cyan" />
              </marker>
            </defs>

            {/* Path: Plan -> Search */}
            <motion.path
                d="M 150 110 L 230 170"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className={`${activeNode === 'plan' || activeNode === 'search' ? 'text-accent-cyan' : 'text-border'}`}
                markerEnd={activeNode === 'plan' ? "url(#arrowhead-active)" : "url(#arrowhead)"}
            />

            {/* Path: Search -> Evaluate */}
            <motion.path
                d="M 230 190 L 170 270"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className={`${activeNode === 'search' || activeNode === 'evaluate' ? 'text-accent-cyan' : 'text-border'}`}
                markerEnd={activeNode === 'search' ? "url(#arrowhead-active)" : "url(#arrowhead)"}
            />

            {/* Path: Evaluate -> Synthesize */}
            <motion.path
                d="M 130 280 L 60 210"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className={`${activeNode === 'evaluate' || activeNode === 'synthesize' ? 'text-accent-cyan' : 'text-border'}`}
                markerEnd={activeNode === 'evaluate' ? "url(#arrowhead-active)" : "url(#arrowhead)"}
            />

            {/* Path: Synthesize -> Plan (Loop or Finish) */}
            <motion.path
                d="M 70 180 L 130 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className={`${activeNode === 'synthesize' || activeNode === 'plan' ? 'text-accent-cyan' : 'text-border'}`}
                markerEnd={activeNode === 'synthesize' ? "url(#arrowhead-active)" : "url(#arrowhead)"}
            />

            {/* Nodes */}
            {NODES.map((node) => (
              <g
                key={node.id}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
                className="cursor-pointer group"
              >
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="32"
                  className={`transition-colors duration-300 ${
                    activeNode === node.id ? "fill-accent-cyan/20 stroke-accent-cyan" : "fill-card stroke-border"
                  }`}
                  strokeWidth="1"
                />
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`text-[11px] font-mono font-bold transition-colors ${
                    activeNode === node.id ? "fill-accent-cyan" : "fill-foreground"
                  }`}
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>

          {/* Strategy Tooltip */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 pointer-events-none">
            <AnimatePresence mode="wait">
              {activeNode && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-card border border-accent-cyan/30 rounded-xl p-4 shadow-2xl backdrop-blur"
                >
                  <p className="text-[10px] font-mono text-accent-cyan uppercase mb-2 tracking-widest">Strategy</p>
                  <p className="text-xs text-foreground/80 leading-relaxed font-sans">
                    {NODES.find(n => n.id === activeNode)?.strategy}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
