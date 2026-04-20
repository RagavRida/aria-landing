
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { authApi } from "@/src/lib/auth";

export function TryIt() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (authApi.isAuthenticated()) {
      window.location.href = `/app?q=${encodeURIComponent(query)}`;
    } else {
      navigate(`/signup?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section className="py-32 bg-[#0C0C0E]/50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="p-8 md:p-12 rounded-[2rem] bg-card border border-border shadow-2xl relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="font-serif text-3xl md:text-4xl mb-8 text-center">Experience autonomous research.</h3>

            <form onSubmit={handleSubmit} className="relative group/input">
              <input
                type="text"
                placeholder="What topic should ARIA investigate?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-black/40 border border-border rounded-2xl py-6 px-14 text-lg focus:outline-none focus:border-accent-cyan transition-all placeholder:text-muted-foreground/30"
              />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-accent-cyan text-background rounded-xl flex items-center justify-center hover:scale-105 transition-all shadow-lg shadow-accent-cyan/20"
              >
                <ArrowRight size={20} />
              </button>
            </form>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {["Impact of Llama 3 on edge AI", "Protein folding breakthroughs 2024", "The future of solid-state batteries"].map((q) => (
                <button
                  key={q}
                  onClick={() => setQuery(q)}
                  className="text-[10px] font-mono text-muted-foreground hover:text-accent-cyan border border-border hover:border-accent-cyan/40 px-3 py-1.5 rounded-full transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Decorative background blur */}
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent-violet/10 blur-[100px] rounded-full group-hover:bg-accent-cyan/10 transition-colors duration-1000" />
        </div>
      </div>
    </section>
  );
}
