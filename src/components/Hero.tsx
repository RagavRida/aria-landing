
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const SSE_EVENTS = [
  "PLAN: Identifying core entities in 'quantum supremacy'...",
  "SEARCH: tavily_search(q='quantum computer supremacy benchmarks 2024')",
  "EVALUATE: Source quality=89% | Confidence=72%",
  "RETRIEVE: arxiv:2403.11294v1 [quant-ph] - 'Scaling Quantum Computers...'",
  "EVALUATE: Source quality=95% | Confidence=84%",
  "SYNTHESIZE: Integrating multi-perspective consensus...",
  "REFORMULATE: Missing context on cryogenic cooling efficiency. Retrying search...",
  "SEARCH: google_scholar(q='cryogenic cooling power requirements quantum scalability')",
  "EVALUATE: Source quality=92% | Confidence=91%",
  "SYNTHESIZE: Generating final report with 14 citations."
];

export function Hero() {
  const [tickerItems, setTickerItems] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTickerItems(prev => [...prev.slice(-15), SSE_EVENTS[i % SSE_EVENTS.length]]);
      i++;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Background Ticker */}
      <div className="absolute inset-0 z-0 flex flex-col justify-center items-center opacity-[0.03] select-none pointer-events-none">
        <div className="w-full max-w-5xl font-mono text-[10px] sm:text-xs leading-relaxed space-y-1">
          {tickerItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="whitespace-nowrap"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-5xl md:text-8xl leading-[1.05] tracking-tight mb-8"
        >
          Research that reasons <br />
          <span className="text-accent-cyan italic">about its own doubt.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          ARIA is a self-correcting AI agent that plans, evaluates source quality in real-time,
          and reformulates strategies when it detects uncertainty.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link
            to="/signup"
            className="w-full sm:w-auto bg-accent-cyan text-background px-8 py-4 rounded-full font-bold text-lg hover:bg-accent-cyan/90 transition-all shadow-lg shadow-accent-cyan/10"
          >
            Get started — it's free
          </Link>
          <Link
            to="/signin"
            className="w-full sm:w-auto border border-border bg-white/5 backdrop-blur px-8 py-4 rounded-full font-medium text-lg hover:bg-white/10 transition-all"
          >
            Sign in
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-2"
        >
          <button
            onClick={() => document.getElementById('trace-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm font-mono text-muted-foreground hover:text-accent-violet transition-colors flex items-center gap-2 group"
          >
            Read the trace
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              ↓
            </motion.span>
          </button>
        </motion.div>
      </div>

      {/* Decorative Gradient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial from-accent-cyan/5 via-transparent to-transparent -z-10 blur-3xl pointer-events-none" />
    </section>
  );
}
