/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Navigation } from './components/Navigation';
import { ScrollHUD } from './components/ScrollHUD';
import { ScrollVideo } from './components/ScrollVideo';
import { StoryOverlays } from './components/StoryOverlays';
import { neuralAudio } from './audio/neuralAudio';

const CHAPTERS = [
  { id: 'genesis', number: '00', title: 'Genesis', actIndex: 0, scrollPoint: 0.03 },
  { id: 'synapses', number: '01', title: 'The Initial Spark', actIndex: 1, scrollPoint: 0.18 },
  { id: 'information', number: '02', title: 'Incoming Idea', actIndex: 2, scrollPoint: 0.32 },
  { id: 'plasticity', number: '03', title: 'Repetition & LTP', actIndex: 3, scrollPoint: 0.47 },
  { id: 'decay', number: '04', title: 'Memory Decay', actIndex: 4, scrollPoint: 0.62 },
  { id: 'spaced', number: '05', title: 'Spaced Repetition', actIndex: 5, scrollPoint: 0.77 },
  { id: 'pathway', number: '06', title: 'The Highway', actIndex: 6, scrollPoint: 0.89 },
  { id: 'mind', number: '07', title: 'Living Mind', actIndex: 7, scrollPoint: 0.97 },
];

export default function App() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [currentConcept, setCurrentConcept] = useState<string>('PHOTOSYNTHESIS');
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / totalHeight)) : 0;
      scrollProgressRef.current = progress;

      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrollProgress(scrollProgressRef.current);
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getCurrentActIndex = useCallback((p: number): number => {
    if (p < 0.12) return 0;
    if (p < 0.25) return 1;
    if (p < 0.40) return 2;
    if (p < 0.55) return 3;
    if (p < 0.70) return 4;
    if (p < 0.85) return 5;
    if (p < 0.93) return 6;
    return 7;
  }, []);

  const currentActIndex = getCurrentActIndex(scrollProgress);
  const currentChapter = CHAPTERS[currentActIndex] || CHAPTERS[0];

  const handleJumpToAct = (actIdx: number) => {
    const chapter = CHAPTERS.find((c) => c.actIndex === actIdx);
    if (!chapter) return;

    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = chapter.scrollPoint * totalHeight;
    window.scrollTo({
      top: targetY,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  const handleRestart = () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  const handleToggleAudio = () => {
    const muted = !neuralAudio.toggleMute();
    setIsAudioMuted(muted);
  };

  return (
    <div className="relative bg-[#030612] text-slate-100 min-h-screen selection:bg-sky-500 selection:text-white">
      <Navigation
        currentChapterTitle={currentChapter.title}
        isAudioMuted={isAudioMuted}
        onToggleAudio={handleToggleAudio}
        onRestart={handleRestart}
        onJumpToAct={handleJumpToAct}
      />

      <ScrollHUD
        scrollProgress={scrollProgress}
        currentActIndex={currentActIndex}
        chapters={CHAPTERS}
        onJumpToAct={handleJumpToAct}
      />

      {/* Scroll runway. The video sticks for the full learning journey. */}
      <div className="relative h-[880vh]">
        <div className="sticky top-0 z-0 h-dvh w-full overflow-hidden bg-[#030612]">
          <ScrollVideo progressRef={scrollProgressRef} reducedMotion={reducedMotion} />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_48%,rgba(3,6,18,0.34)_100%)]"
          />
        </div>
      </div>

      <StoryOverlays
        scrollProgress={scrollProgress}
        currentConcept={currentConcept}
        onSelectConcept={setCurrentConcept}
        onRestart={handleRestart}
      />
    </div>
  );
}
