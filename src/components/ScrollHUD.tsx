import React from 'react';

interface ScrollHUDProps {
  scrollProgress: number;
  currentActIndex: number;
  chapters: Array<{ id: string; number: string; title: string }>;
  onJumpToAct: (index: number) => void;
}

export const ScrollHUD: React.FC<ScrollHUDProps> = ({
  scrollProgress,
  currentActIndex,
  chapters,
  onJumpToAct,
}) => {
  const percent = Math.round(scrollProgress * 100);

  return (
    <aside
      aria-label="Story progress and chapter index"
      className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-end gap-3 select-none pointer-events-auto"
    >
      {/* Chapter Indicators */}
      <div className="flex flex-col gap-2.5 items-end">
        {chapters.map((chap, idx) => {
          const isActive = currentActIndex === idx;
          return (
            <button
              key={chap.id}
              onClick={() => onJumpToAct(idx)}
              className="group flex items-center gap-3 text-right cursor-pointer py-1"
              title={`${chap.number}. ${chap.title}`}
            >
              <span
                className={`text-[11px] font-['JetBrains_Mono'] tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? 'text-sky-300 opacity-100 translate-x-0 font-semibold'
                    : 'text-slate-500 opacity-0 group-hover:opacity-100 group-hover:text-slate-300 translate-x-1 group-hover:translate-x-0'
                }`}
              >
                {chap.number} {chap.title}
              </span>
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-6 h-1.5 bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]'
                    : 'w-1.5 h-1.5 bg-slate-700 group-hover:bg-slate-500'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Numerical percentage indicator */}
      <div className="mt-2 text-[10px] font-mono tracking-widest text-slate-500 tabular-nums">
        {String(percent).padStart(2, '0')}% DEPTH
      </div>
    </aside>
  );
};
