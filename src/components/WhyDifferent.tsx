
import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { RefreshCw, BarChart3, Radio } from "lucide-react";

const CARDS = [
  {
    title: "Self-correction that reasons about failure",
    description: "ARIA doesn't just guess. It performs inner-monologue audits to detect when its own research path is hit a dead end, then triggers a logic backtrack.",
    icon: RefreshCw,
    accent: "text-accent-cyan",
    demo: (
      <div className="flex flex-col gap-1 w-full p-4 font-mono text-[8px] bg-black/40 rounded border border-white/5">
        <div className="flex gap-2 text-white/40">[01] Analyzing plan...</div>
        <div className="flex gap-2 text-amber-500/80">[02] WARNING: Search results conflicting.</div>
        <div className="flex gap-2 text-accent-cyan">[03] ACTION: Backtrack (Node:Plan_Sub01)</div>
      </div>
    )
  },
  {
    title: "Source-quality weighting",
    description: "Built-in awareness of the hierarchy of information. Academic journals are weighted higher than official docs, which trump news, which exceed blogs.",
    icon: BarChart3,
    accent: "text-accent-violet",
    demo: (
      <div className="flex items-end gap-1 h-12 w-full p-2 bg-black/40 rounded border border-white/5">
        <div className="flex-1 bg-accent-violet h-full rounded-t" />
        <div className="flex-1 bg-accent-violet/60 h-3/4 rounded-t" />
        <div className="flex-1 bg-accent-violet/30 h-1/2 rounded-t" />
        <div className="flex-1 bg-accent-violet/10 h-1/4 rounded-t" />
      </div>
    )
  },
  {
    title: "Streamed thinking, not tokens",
    description: "Watch ARIA search, read, and reason in real-time. You don't wait for a block of text; you see the live pipeline of thought as it matures.",
    icon: Radio,
    accent: "text-foreground",
    demo: (
      <div className="flex items-center justify-center p-4">
        <div className="relative">
            <div className="w-12 h-12 rounded-full border border-accent-cyan/20 flex items-center justify-center">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-8 h-8 rounded-full bg-accent-cyan/20 blur-sm"
                />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_rgba(34,211,238,1)]" />
            </div>
        </div>
      </div>
    )
  }
];

export function WhyDifferent() {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-center mb-20 leading-tight">Evidence-based <br />autonomous research.</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {CARDS.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 rounded-3xl bg-[#0F0F12] border border-border hover:border-accent-cyan/30 transition-all flex flex-col"
            >
              <div className={`mb-6 ${card.accent}`}>
                <card.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-accent-cyan transition-colors">{card.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 mb-auto">
                {card.description}
              </p>
              <div className="mt-6 pt-6 border-t border-white/5">
                {card.demo}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
