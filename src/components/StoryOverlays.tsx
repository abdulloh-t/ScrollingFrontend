import React from 'react';
import { ChevronDown, RefreshCw, CheckCircle2 } from 'lucide-react';

interface StoryOverlaysProps {
  scrollProgress: number;
  currentConcept: string;
  onSelectConcept: (concept: string) => void;
  onRestart: () => void;
}

export const StoryOverlays: React.FC<StoryOverlaysProps> = ({
  scrollProgress,
  currentConcept,
  onSelectConcept,
  onRestart,
}) => {
  const p = scrollProgress;

  // Concept presets
  const presets = ['PHOTOSYNTHESIS', 'FOREIGN LANGUAGE', 'GUITAR FRETWORK', 'DEEP LOGIC'];

  // Act visibility calculations with smooth opacity & translation
  const getActOpacity = (start: number, peakStart: number, peakEnd: number, end: number) => {
    if (p < start || p > end) return 0;
    if (p < peakStart) return (p - start) / (peakStart - start);
    if (p <= peakEnd) return 1;
    return 1 - (p - peakEnd) / (end - peakEnd);
  };

  const getActTranslateY = (start: number, peakStart: number, peakEnd: number, end: number) => {
    if (p < start) return 24;
    if (p < peakStart) return 24 * (1 - (p - start) / (peakStart - start));
    if (p <= peakEnd) return 0;
    return -24 * ((p - peakEnd) / (end - peakEnd));
  };

  // 1. Hero Act (0.00 to 0.13)
  const heroOpacity = getActOpacity(-0.05, 0.0, 0.06, 0.13);
  const heroTranslate = getActTranslateY(-0.05, 0.0, 0.06, 0.13);

  // 2. Neurons Act (0.13 to 0.26)
  const act2Opacity = getActOpacity(0.12, 0.16, 0.22, 0.26);
  const act2Translate = getActTranslateY(0.12, 0.16, 0.22, 0.26);

  // 3. Information Act (0.26 to 0.40)
  const act3Opacity = getActOpacity(0.25, 0.29, 0.36, 0.40);
  const act3Translate = getActTranslateY(0.25, 0.29, 0.36, 0.40);
  const wordFractureProgress = Math.min(1, Math.max(0, (p - 0.27) / 0.10));

  // 4. Connections Act (0.40 to 0.55)
  const act4Opacity = getActOpacity(0.39, 0.43, 0.51, 0.55);
  const act4Translate = getActTranslateY(0.39, 0.43, 0.51, 0.55);
  const pathwayStrength = Math.min(1, Math.max(0, (p - 0.41) / 0.11));

  // 5. Forgetting Act (0.55 to 0.70)
  const act5Opacity = getActOpacity(0.54, 0.58, 0.66, 0.70);
  const act5Translate = getActTranslateY(0.54, 0.58, 0.66, 0.70);

  // 6. Spaced Repetition Act (0.70 to 0.85)
  const act6Opacity = getActOpacity(0.69, 0.73, 0.81, 0.85);
  const act6Translate = getActTranslateY(0.69, 0.73, 0.81, 0.85);
  const spacedDayIndex = Math.min(4, Math.max(0, Math.floor(((p - 0.71) / 0.12) * 5)));
  const days = [
    { label: 'DAY 1', desc: 'Initial Encoding', retention: '100% → 58%' },
    { label: 'DAY 2', desc: 'First Reactivation', retention: '65% → 78%' },
    { label: 'DAY 5', desc: 'Consolidation Wave', retention: '72% → 88%' },
    { label: 'DAY 12', desc: 'Long-Term Potentiation', retention: '84% → 94%' },
    { label: 'DAY 30', desc: 'Permanent Structural Trace', retention: '96% Consolidated' },
  ];

  // 7. Memory Pathway Act (0.85 to 0.93)
  const act7Opacity = getActOpacity(0.84, 0.87, 0.91, 0.94);
  const act7Translate = getActTranslateY(0.84, 0.87, 0.91, 0.94);

  // 8. Final Transformation (0.93 to 1.00)
  const act8Opacity = getActOpacity(0.92, 0.95, 1.0, 1.05);
  const act8Translate = getActTranslateY(0.92, 0.95, 1.0, 1.05);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex flex-col justify-center items-center px-6 md:px-16 overflow-hidden">
      {/* ---------------- 1. HERO ---------------- */}
      {heroOpacity > 0.01 && (
        <section
          style={{
            opacity: heroOpacity,
            transform: `translate3d(0, ${heroTranslate}px, 0)`,
          }}
          className="text-center max-w-3xl flex flex-col items-center gap-5 select-none"
        >
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400/80">
            <span>Neuroscience of Plasticity</span>
            <span aria-hidden="true">·</span>
            <span>Synaptic Architecture</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-['Syne'] leading-[1.08] text-balance">
            Your brain is changing{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-300">
              right now.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-xl text-balance">
            Scroll to see what happens when you learn.
          </p>

          <div className="mt-8 flex flex-col items-center gap-2 text-slate-500 animate-pulse">
            <span className="text-[11px] font-mono tracking-widest uppercase">Begin Scrolling</span>
            <ChevronDown size={18} className="text-sky-400" />
          </div>
        </section>
      )}

      {/* ---------------- 2. NEURONS & SIGNALS ---------------- */}
      {act2Opacity > 0.01 && (
        <section
          style={{
            opacity: act2Opacity,
            transform: `translate3d(0, ${act2Translate}px, 0)`,
          }}
          className="w-full max-w-6xl flex justify-start select-none"
        >
          <div className="max-w-xl flex flex-col gap-4 text-left">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-sky-400">
              <span>01</span>
              <span aria-hidden="true">·</span>
              <span>Genesis of Action</span>
              <span aria-hidden="true">·</span>
              <span>86 Billion Nodes</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-['Syne'] leading-tight text-balance">
              It starts with a signal.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
              Learning begins when groups of neurons become active together.
            </p>

            <div className="text-sm text-slate-400 leading-relaxed space-y-2 border-l border-sky-500/30 pl-4 mt-2">
              <p>
                Microscopic electrical impulses—action potentials—traverse axonal branches at speeds up to 120 meters per second.
              </p>
              <p className="text-xs text-sky-300 font-mono">
                Dendrites listen · Axons transmit · Neurotransmitters bridge the void
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ---------------- 3. INFORMATION ARRIVAL ---------------- */}
      {act3Opacity > 0.01 && (
        <section
          style={{
            opacity: act3Opacity,
            transform: `translate3d(0, ${act3Translate}px, 0)`,
          }}
          className="w-full max-w-6xl flex flex-col items-center md:items-start text-left select-none pointer-events-auto"
        >
          <div className="max-w-xl flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-sky-400">
              <span>02</span>
              <span aria-hidden="true">·</span>
              <span>Sensory Influx</span>
              <span aria-hidden="true">·</span>
              <span>Novelty Detection</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-['Syne'] leading-tight text-balance">
              Something new enters.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
              When you encounter something new, your brain creates and modifies connections between neurons.
            </p>

            {/* Interactive Concept Selection */}
            <div className="mt-3 flex flex-col gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Choose incoming stimulus:
              </span>
              <div className="flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => onSelectConcept(preset)}
                    className={`px-3 py-1.5 text-xs font-mono tracking-wider transition-all rounded-md border ${
                      currentConcept === preset
                        ? 'bg-sky-500/20 border-sky-400 text-sky-200 shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                        : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Floating Concept Word undergoing particle dispersion */}
            <div className="mt-4 p-4 rounded-xl bg-slate-950/20 border border-sky-400/15">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1">
                Stimulus Packet Dispersion:
              </div>
              <div className="text-2xl sm:text-3xl font-bold tracking-widest font-mono text-sky-300 flex items-center gap-1">
                {currentConcept.split('').map((char, index) => {
                  const disperse = wordFractureProgress > index / currentConcept.length;
                  return (
                    <span
                      key={index}
                      style={{
                        display: 'inline-block',
                        transition: 'transform 0.4s ease, opacity 0.4s ease',
                        transform: disperse
                          ? `translate(${(index - 4) * 6}px, ${-18 - Math.random() * 15}px) scale(0.7)`
                          : 'none',
                        opacity: disperse ? 0.35 : 1,
                        color: disperse ? '#a855f7' : '#38bdf8',
                      }}
                    >
                      {char}
                    </span>
                  );
                })}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                As you scroll, incoming information fractures into electrical energy and streams into receptive dendritic fields.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ---------------- 4. CONNECTIONS & LTP ---------------- */}
      {act4Opacity > 0.01 && (
        <section
          style={{
            opacity: act4Opacity,
            transform: `translate3d(0, ${act4Translate}px, 0)`,
          }}
          className="w-full max-w-6xl flex justify-start select-none"
        >
          <div className="max-w-xl flex flex-col gap-4 text-left">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-sky-400">
              <span>03</span>
              <span aria-hidden="true">·</span>
              <span>Long-Term Potentiation</span>
              <span aria-hidden="true">·</span>
              <span>Hebbian Rule</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-['Syne'] leading-tight text-balance">
              Practice makes pathways stronger.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
              The more you use a pathway, the stronger and more efficient it can become.
            </p>

            {/* Direct In-Network Comparative State */}
            <div className="mt-2 grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950/20 border border-sky-400/15">
              <div className="space-y-1">
                <span className="text-[11px] font-mono tracking-wider uppercase text-slate-400">
                  Before Practice
                </span>
                <div className="text-sm font-semibold text-slate-400">Weak Pathway</div>
                <div className="text-xs text-slate-500 leading-snug">
                  High synaptic resistance · Sporadic action potential loss · Faint filament
                </div>
              </div>

              <div className="space-y-1 border-l border-sky-900/60 pl-4">
                <span className="text-[11px] font-mono tracking-wider uppercase text-sky-400">
                  After Repetition
                </span>
                <div className="text-sm font-semibold text-sky-300">Myelinated Superhighway</div>
                <div className="text-xs text-slate-300 leading-snug">
                  Instantaneous conduction · Dense AMPA receptor clusters · Thickened axon
                </div>
              </div>
            </div>

            {/* Live Potentiation Gauge */}
            <div className="space-y-1.5 mt-1">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>Synaptic Potentiation (LTP)</span>
                <span className="text-sky-300 font-semibold tabular-nums">
                  {Math.round(pathwayStrength * 100)}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 to-cyan-300 transition-all duration-150"
                  style={{ width: `${pathwayStrength * 100}%` }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------------- 5. FORGETTING ---------------- */}
      {act5Opacity > 0.01 && (
        <section
          style={{
            opacity: act5Opacity,
            transform: `translate3d(0, ${act5Translate}px, 0)`,
          }}
          className="w-full max-w-6xl flex justify-end select-none"
        >
          <div className="max-w-xl flex flex-col gap-4 text-left md:text-right">
            <div className="flex items-center md:justify-end gap-2 text-xs font-mono tracking-widest uppercase text-slate-400">
              <span>04</span>
              <span aria-hidden="true">·</span>
              <span>Synaptic Decay</span>
              <span aria-hidden="true">·</span>
              <span>Pruning Protocol</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-['Syne'] leading-tight text-balance">
              But your brain also forgets.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
              Not everything you learn stays equally strong. Without revisiting information, some memories become harder to retrieve.
            </p>

            <div className="text-sm text-slate-400 leading-relaxed space-y-2 border-l md:border-l-0 md:border-r border-slate-700/60 pl-4 md:pl-0 md:pr-4 mt-2">
              <p>
                Unused connections slowly wither. Receptor proteins internalize, and synaptic bridges dissolve back into cellular silence.
              </p>
              <p className="text-xs text-slate-500 font-mono">
                Energy conservation · Noise reduction · Trace decay
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ---------------- 6. SPACED REPETITION TIMELINE ---------------- */}
      {act6Opacity > 0.01 && (
        <section
          style={{
            opacity: act6Opacity,
            transform: `translate3d(0, ${act6Translate}px, 0)`,
          }}
          className="w-full max-w-5xl flex flex-col items-center text-center select-none"
        >
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-sky-400 mb-2">
            <span>05</span>
            <span aria-hidden="true">·</span>
            <span>Ebbinghaus Interval Strategy</span>
            <span aria-hidden="true">·</span>
            <span>Consolidation</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-['Syne'] leading-tight text-balance">
            Use it again.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed text-balance mb-6">
            Reviewing information at increasing intervals helps reinforce the memory.
          </p>

          {/* Scrolling Timeline Controls */}
          <div className="w-full p-6 rounded-2xl bg-slate-950/25 border border-sky-400/15">
            <div className="grid grid-cols-5 gap-2 md:gap-4 relative">
              {days.map((item, idx) => {
                const isPassed = spacedDayIndex >= idx;
                const isCurrent = spacedDayIndex === idx;
                return (
                  <div
                    key={item.label}
                    className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
                      isCurrent
                        ? 'bg-sky-500/15 border border-sky-400/50 shadow-[0_0_20px_rgba(56,189,248,0.25)] scale-105'
                        : isPassed
                        ? 'bg-slate-900/60 border border-slate-800'
                        : 'opacity-40 border border-transparent'
                    }`}
                  >
                    <span
                      className={`text-xs md:text-sm font-mono font-bold ${
                        isCurrent ? 'text-sky-300' : isPassed ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="text-[10px] md:text-xs text-slate-400 font-medium mt-1 hidden sm:block">
                      {item.desc}
                    </span>
                    <span
                      className={`text-[9px] md:text-[11px] font-mono mt-2 tabular-nums ${
                        isCurrent ? 'text-cyan-300 font-semibold' : 'text-slate-500'
                      }`}
                    >
                      {item.retention}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-mono text-slate-400 px-2">
              <span>Scroll actively drives neural recovery waves</span>
              <span className="text-sky-400">
                Active Cycle: {days[spacedDayIndex].label} · {days[spacedDayIndex].desc}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* ---------------- 7. THE MEMORY PATHWAY COMPARISON ---------------- */}
      {act7Opacity > 0.01 && (
        <section
          style={{
            opacity: act7Opacity,
            transform: `translate3d(0, ${act7Translate}px, 0)`,
          }}
          className="w-full max-w-6xl flex flex-col items-center select-none"
        >
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-sky-400 mb-2">
            <span>06</span>
            <span aria-hidden="true">·</span>
            <span>Comparative Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Structural Proof</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-['Syne'] leading-tight text-balance text-center mb-6">
            The Memory Pathway
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            {/* Left: Forgotten */}
            <div className="p-6 rounded-2xl bg-slate-950/25 border border-slate-400/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
                  Left Hemisphere
                </span>
                <span className="text-xs font-mono text-slate-400 font-semibold">Decayed</span>
              </div>
              <h3 className="text-xl font-bold text-slate-300 font-['Syne']">Forgotten Pathway</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                A weak, fading neural pathway. Connections shrink into ghost filaments, and impulses dissipate before reaching the target cortical ensemble.
              </p>
              <div className="text-xs font-mono text-slate-500 space-y-1 pt-2 border-t border-slate-800">
                <div>· Signal Transmission: Fragile (18%)</div>
                <div>· Dendritic Spine Density: Sparse</div>
              </div>
            </div>

            {/* Right: Reinforced */}
            <div className="p-6 rounded-2xl bg-sky-950/20 border border-sky-400/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-sky-400">
                  Consolidated Core
                </span>
                <span className="text-xs font-mono text-cyan-300 font-semibold flex items-center gap-1">
                  <CheckCircle2 size={13} /> Active
                </span>
              </div>
              <h3 className="text-xl font-bold text-white font-['Syne']">Reinforced Pathway</h3>
              <p className="text-sm text-slate-200 leading-relaxed">
                A strong, hyper-conductive pathway. Protected with lipid myelin sheaths, firing in crystalline synchrony with adjacent neural circuits.
              </p>
              <div className="text-xs font-mono text-sky-300/80 space-y-1 pt-2 border-t border-sky-900/60">
                <div>· Signal Transmission: Near-instantaneous (98%)</div>
                <div>· Synaptic Strength: High-efficiency LTP</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------------- 8. FINAL TRANSFORMATION ---------------- */}
      {act8Opacity > 0.01 && (
        <section
          style={{
            opacity: act8Opacity,
            transform: `translate3d(0, ${act8Translate}px, 0)`,
          }}
          className="text-center max-w-3xl flex flex-col items-center gap-6 select-none pointer-events-auto"
        >
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400">
            <span>07</span>
            <span aria-hidden="true">·</span>
            <span>The Evolving Organism</span>
            <span aria-hidden="true">·</span>
            <span>Living Network</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-['Syne'] leading-[1.1] text-balance">
            Learning isn’t a single moment.
          </h2>

          <p className="text-lg sm:text-2xl text-sky-200 font-light max-w-xl text-balance">
            It is a process of changing connections.
          </p>

          <p className="text-base sm:text-lg text-slate-300 max-w-md font-normal text-balance">
            Now go learn something.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            {/* Subtle Start Learning CTA */}
            <button
              onClick={onRestart}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 active:scale-95 transition-all shadow-[0_0_25px_rgba(56,189,248,0.35)] border border-sky-400/30 cursor-pointer"
            >
              <span>Start Learning Again</span>
              <RefreshCw size={15} />
            </button>

          </div>
        </section>
      )}
    </div>
  );
};
