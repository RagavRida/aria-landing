
import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-20 border-t border-border/50 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
             <Link to="/" className="font-serif text-2xl tracking-tight text-foreground block mb-6">ARIA</Link>
             <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
               Built by Ragav. A demonstration of autonomous agent architectures utilizing LangGraph and synthetic confidence scoring.
             </p>
          </div>

          <div>
             <h5 className="font-mono text-[10px] uppercase tracking-widest text-foreground mb-6">Protocol</h5>
             <ul className="space-y-4 text-sm text-muted-foreground font-medium">
               <li><a href="#" className="hover:text-accent-cyan transition-colors">Documentation</a></li>
               <li><a href="https://github.com" className="hover:text-accent-cyan transition-colors flex items-center gap-2">GitHub <Github size={14} /></a></li>
               <li><a href="/agent_trace.json" download className="hover:text-accent-cyan transition-colors">agent_trace.json</a></li>
             </ul>
          </div>

          <div>
             <h5 className="font-mono text-[10px] uppercase tracking-widest text-foreground mb-6">Account</h5>
             <ul className="space-y-4 text-sm text-muted-foreground font-medium">
               <li><Link to="/signin" className="hover:text-accent-cyan transition-colors">Sign in</Link></li>
               <li><Link to="/signup" className="hover:text-accent-cyan transition-colors">Sign up</Link></li>
               <li><a href="#" className="hover:text-accent-cyan transition-colors opacity-50 cursor-not-allowed">Terms</a></li>
               <li><a href="#" className="hover:text-accent-cyan transition-colors opacity-50 cursor-not-allowed">Privacy</a></li>
             </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
           <p>© 2024 ARIA Intelligence. No tracking. No cookies (except auth).</p>
           <div className="flex items-center gap-6">
              <a href="#" className="hover:text-foreground"><Twitter size={14} /></a>
              <a href="#" className="hover:text-foreground"><Linkedin size={14} /></a>
           </div>
        </div>
      </div>
    </footer>
  );
}
