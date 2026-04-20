
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { authApi } from "@/src/lib/auth";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <nav className={`glass-nav transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-serif text-2xl tracking-tight text-foreground group-hover:text-accent-cyan transition-colors">
            ARIA
          </span>
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] mt-1 border border-border px-1.5 py-0.5 rounded">
            v1.0
          </span>
        </Link>

        {!isAuthPage && (
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Docs</a>
            <a href="https://github.com" className="hover:text-foreground transition-colors">GitHub</a>
            <div className="flex items-center gap-3 ml-4">
              <Link
                to="/signin"
                className="text-muted-foreground hover:text-foreground hover:bg-white/5 px-4 py-2 rounded-lg transition-all"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  scrolled
                    ? "bg-accent-cyan text-background pulse-button"
                    : "bg-accent-cyan text-background hover:bg-accent-cyan/90"
                }`}
              >
                Sign up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
