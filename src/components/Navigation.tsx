import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface NavigationProps {
  currentChapterTitle: string;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
  onRestart: () => void;
  onJumpToAct: (actIndex: number) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  isAudioMuted,
  onToggleAudio,
  onRestart,
  onJumpToAct,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#030612]/40 backdrop-blur-sm border-b border-white/10 select-none">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onRestart();
        }}
        className="text-lg md:text-xl font-bold tracking-tight text-white font-['Syne'] hover:text-sky-300 transition-colors"
      >
        NeuroFlow
      </a>

      {/* Zone 2: 4-6 clean text navigation links */}
      <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-wider text-slate-400 font-medium font-['JetBrains_Mono']">
        <button
          onClick={() => onJumpToAct(0)}
          className="hover:text-sky-300 transition-colors"
        >
          Genesis
        </button>
        <button
          onClick={() => onJumpToAct(1)}
          className="hover:text-sky-300 transition-colors"
        >
          Synapses
        </button>
        <button
          onClick={() => onJumpToAct(2)}
          className="hover:text-sky-300 transition-colors"
        >
          Incoming Idea
        </button>
        <button
          onClick={() => onJumpToAct(3)}
          className="hover:text-sky-300 transition-colors"
        >
          Plasticity
        </button>
        <button
          onClick={() => onJumpToAct(4)}
          className="hover:text-sky-300 transition-colors"
        >
          Decay
        </button>
        <button
          onClick={() => onJumpToAct(5)}
          className="hover:text-sky-300 transition-colors"
        >
          Spaced Cycles
        </button>
        <button
          onClick={() => onJumpToAct(7)}
          className="hover:text-sky-300 transition-colors"
        >
          Consolidation
        </button>
      </nav>

      {/* Zone 3: Primary actions */}
      <div className="flex items-center gap-3">
        {/* Audio Toggle */}
        <button
          onClick={onToggleAudio}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
            !isAudioMuted
              ? 'bg-sky-500/15 border-sky-400/40 text-sky-200 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
              : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
          title={isAudioMuted ? 'Enable procedural neural audio' : 'Mute audio'}
          aria-label={isAudioMuted ? 'Enable sound' : 'Mute sound'}
        >
          {!isAudioMuted ? <Volume2 size={14} className="text-sky-400" /> : <VolumeX size={14} />}
          <span className="hidden sm:inline">{!isAudioMuted ? 'Soundscape On' : 'Sound Off'}</span>
        </button>

      </div>
    </header>
  );
};
