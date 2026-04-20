
import React from "react";

const LOGOS = [
  { name: "LangGraph", color: "text-foreground" },
  { name: "Gemini", color: "text-foreground" },
  { name: "Tavily", color: "text-foreground" },
  { name: "FastAPI", color: "text-foreground" },
  { name: "React", color: "text-foreground" }
];

export function BuiltWith() {
  return (
    <section className="py-20 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.3em] mb-8 block">Powered By Protocol</span>
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
          {LOGOS.map((logo) => (
            <span key={logo.name} className={`text-sm md:text-base font-bold tracking-tight ${logo.color}`}>
              {logo.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
