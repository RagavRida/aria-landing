
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-40 bg-[#0A0A0B] border-t border-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <h2 className="font-serif text-5xl md:text-7xl mb-10 leading-tight">
          Stop trusting. <br />
          <span className="text-accent-violet italic">Start verifying.</span>
        </h2>

        <Link
          to="/signup"
          className="inline-flex items-center gap-4 bg-accent-cyan text-background px-10 py-5 rounded-full font-bold text-xl hover:bg-accent-cyan/90 transition-all group shadow-2xl shadow-accent-cyan/20"
        >
          Create your account
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>

        <div className="mt-8">
          <Link to="/signin" className="text-muted-foreground hover:text-foreground transition-colors border-b border-muted-foreground/30 hover:border-foreground">
            Already have one? Sign in.
          </Link>
        </div>
      </div>

       {/* Grid pattern */}
       <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, #27272A 1px, transparent 1px)', backgroundSize: '40px 40px' }}
       />
    </section>
  );
}
