
import React from "react";
import { motion } from "motion/react";
import { AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";

export function Problem() {
  return (
    <section className="py-32 bg-[#0C0C0E]/50 border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-accent-cyan text-sm font-mono uppercase tracking-widest mb-4 block">The Problem</span>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-8">
              Most AI answers confidently <span className="italic text-muted-foreground/50 line-through decoration-white/20">hallucinate</span>.
            </h2>

            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-red-950/10 border border-red-900/20 flex gap-4">
                <AlertTriangle className="text-red-500 shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-red-200 mb-1">Standard LLM Output</h4>
                  <p className="text-sm text-red-100/60 leading-relaxed">
                    Provides a smooth, fluent answer even if the training data is outdated or the web snippets are contradictory. No internal doubt is surfaced.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-cyan-950/10 border border-accent-cyan/20 flex gap-4">
                <ShieldCheck className="text-accent-cyan shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-accent-cyan mb-1">The ARIA Strategy</h4>
                  <p className="text-sm text-cyan-100/60 leading-relaxed">
                    Scores its own confidence based on source consensus. If uncertainty exceeds threshold, it autonomously reformulates the plan and retries.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden border border-border bg-[#0A0A0B] p-8 flex flex-col justify-center">
              <div className="space-y-8">
                <div className="space-y-2 opacity-40">
                  <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground uppercase">
                    <span>Query: Quantum Advantage 2024</span>
                    <span>Confidence: 98% (Static)</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500/40 w-full" />
                  </div>
                  <p className="text-xs text-muted-foreground">Standard AI: "In 2024, quantum advantage was achieved by..." (Hallucinating specifics from training data)</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-mono text-accent-cyan uppercase">
                    <span>ARIA Intelligent Audit</span>
                    <span>Confidence Score: 62%</span>
                  </div>
                  <div className="h-2 w-full bg-accent-cyan/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      whileInView={{ width: "62%" }}
                      className="h-full bg-accent-cyan"
                    />
                  </div>
                  <div className="p-3 bg-accent-violet/10 border border-accent-violet/20 rounded-lg">
                    <p className="text-xs text-accent-violet font-mono leading-relaxed">
                      {"» ALERT: Sources from 2024 report contradictory benchmarks."} <br />
                      {"» TRIGGER: Rerouting to search for 'comparative study of 2024 quantum benchmarks'"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floaties */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 p-4 rounded-xl bg-card border border-border shadow-2xl"
            >
              <CheckCircle2 className="text-accent-cyan" size={24} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
