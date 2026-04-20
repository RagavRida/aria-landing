
import React from "react";
import { motion } from "motion/react";
import { Navigation } from "@/src/components/Navigation";
import { Hero } from "@/src/components/Hero";
import { Problem } from "@/src/components/Problem";
import { HowItThinks } from "@/src/components/HowItThinks";
import { TraceReplay } from "@/src/components/TraceReplay";
import { WhyDifferent } from "@/src/components/WhyDifferent";
import { BuiltWith } from "@/src/components/BuiltWith";
import { TryIt } from "@/src/components/TryIt";
import { FinalCTA } from "@/src/components/FinalCTA";
import { Footer } from "@/src/components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background selection:bg-accent-cyan/30">
      <Navigation />
      <main>
        <Hero />
        <Problem />
        <HowItThinks />
        <TraceReplay />
        <WhyDifferent />
        <BuiltWith />
        <TryIt />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
