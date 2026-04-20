
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, RotateCcw, Monitor, ChevronRight } from "lucide-react";

interface TraceEvent {
  id: string;
  type: string;
  content: string;
  confidence: number;
  timestamp: number;
}

export function TraceReplay() {
  const [events, setEvents] = useState<TraceEvent[]>([]);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/agent_trace.json")
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch((e) => console.error("Failed to load trace", e));
  }, []);

  useEffect(() => {
    if (playing && index < events.length - 1) {
      const timer = setTimeout(() => {
        setIndex(i => i + 1);
      }, events[index + 1].timestamp - events[index].timestamp);
      return () => clearTimeout(timer);
    } else if (index === events.length - 1) {
      setPlaying(false);
    }
  }, [index, playing, events]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [index]);

  const progress = (index / (events.length - 1)) * 100;
  const currentEvent = events[index];

  return (
    <section id="trace-section" className="py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Visualizing the silent retries.</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-sans">
            Every query undergoes a self-correction audit. This terminal replays a real trace from a research node evaluating its own uncertainty.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-[#0C0C0E] border border-border rounded-xl overflow-hidden shadow-2xl">
          {/* Terminal Header */}
          <div className="bg-[#121214] border-b border-border p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                <div className="w-3 h-3 rounded-full bg-green-500/20" />
              </div>
              <span className="text-[10px] font-mono text-muted-foreground ml-4 uppercase tracking-widest flex items-center gap-2">
                <Monitor size={12} />
                research_node_01 // trace_log
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 font-mono text-[10px]">
                <span className="text-muted-foreground">Confidence:</span>
                <span className={`transition-colors duration-500 ${currentEvent?.confidence > 0.8 ? 'text-accent-cyan' : 'text-accent-violet'}`}>
                  {Math.round((currentEvent?.confidence || 0) * 100)}%
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row h-[500px]">
             {/* Log Content */}
            <div ref={scrollRef} className="flex-1 p-6 font-mono text-sm overflow-y-auto space-y-3 bg-black/40">
              <AnimatePresence initial={false}>
                {events.slice(0, index + 1).map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex gap-3 ${event.type === 'retry' ? 'text-accent-violet' : 'text-foreground/70'}`}
                  >
                    <span className="opacity-30 shrink-0 select-none">{i.toString().padStart(2, '0')}</span>
                    <span className={`shrink-0 ${event.type === 'retry' ? 'font-bold' : ''}`}>[{event.type.toUpperCase()}]</span>
                    <span className={event.type === 'retry' ? 'text-accent-violet/90' : 'text-muted-foreground'}>{event.content}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {playing && (
                 <motion.div
                    animate={{ opacity: [0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-4 bg-accent-cyan inline-block ml-1"
                />
              )}
            </div>

            {/* Side Panel: Sources & Stats */}
            <div className="w-full md:w-64 border-l border-border bg-[#121214]/50 p-6 flex flex-col gap-6">
                 <div>
                    <h5 className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-4">Active Sources</h5>
                    <div className="space-y-2">
                        {events.slice(0, index + 1).filter(e => e.type === 'search').map((_, i) => (
                            <motion.div
                             key={i}
                             initial={{ opacity: 0, scale: 0.9 }}
                             animate={{ opacity: 1, scale: 1 }}
                             className="h-8 rounded bg-white/5 border border-border flex items-center px-3 gap-2"
                            >
                                <div className="w-2 h-2 rounded-full bg-accent-cyan" />
                                <div className="w-full h-1 bg-white/10 rounded-full" />
                            </motion.div>
                        ))}
                        {events.slice(0, index + 1).filter(e => e.type === 'search').length === 0 && (
                            <p className="text-[10px] text-muted-foreground italic">No sources fetched yet.</p>
                        )}
                    </div>
                 </div>

                 <div className="mt-auto">
                    <h5 className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-2">Confidence State</h5>
                    <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                        <motion.div
                            animate={{ width: `${(currentEvent?.confidence || 0) * 100}%` }}
                            className={`h-full transition-colors ${currentEvent?.confidence > 0.8 ? 'bg-accent-cyan' : 'bg-accent-violet'}`}
                        />
                    </div>
                 </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-[#121214] border-t border-border p-4 flex items-center gap-6">
            <button
              onClick={() => setPlaying(!playing)}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
            </button>
            <button
              onClick={() => { setIndex(0); setPlaying(false); }}
              className="text-muted-foreground hover:text-foreground transition-all"
            >
              <RotateCcw size={18} />
            </button>

            <div className="flex-1 relative h-1 bg-border rounded-full cursor-pointer group"
                 onClick={(e) => {
                     const rect = e.currentTarget.getBoundingClientRect();
                     const p = (e.clientX - rect.left) / rect.width;
                     setIndex(Math.floor(p * (events.length - 1)));
                 }}
            >
              <div className="absolute inset-0 bg-accent-cyan/20 rounded-full" style={{ width: `100%` }} />
              <div className="absolute inset-0 bg-accent-cyan rounded-full transition-all" style={{ width: `${progress}%` }} />
              <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-accent-cyan shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                   style={{ left: `${progress}%`, marginLeft: '-6px' }}
              />
            </div>

            <div className="font-mono text-[10px] text-muted-foreground whitespace-nowrap">
                STEP {String(index + 1).padStart(2, '0')} / {String(events.length).padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
