import { useEffect, useRef } from 'react';
import journeyVideo from '../../video/video.mp4';

/** Ignore seeks smaller than this so identical frames are not rewritten. */
const SEEK_EPSILON_SECONDS = 1 / 30;
/** Stay a hair inside the media so the last frame does not flash blank. */
const END_PADDING_SECONDS = 0.04;
/** Still frame for prefers-reduced-motion: mid-journey, independent of scroll. */
const REDUCED_MOTION_PROGRESS = 0.38;

interface ScrollVideoProps {
  progressRef: { current: number };
  reducedMotion: boolean;
}

/**
 * Cinematic learning visualization. The file stays paused and its playhead
 * follows scroll progress through the story. It does not autoplay or loop.
 */
export function ScrollVideo({ progressRef, reducedMotion }: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reducedMotionRef = useRef(reducedMotion);
  reducedMotionRef.current = reducedMotion;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let frameId = 0;
    let stopped = false;
    let lastRequested = Number.NaN;

    video.muted = true;
    video.defaultMuted = true;
    video.loop = false;
    video.autoplay = false;
    video.preload = 'auto';
    video.pause();

    const duration = () => {
      const value = video.duration;
      return Number.isFinite(value) && value > 0 ? value : 0;
    };

    const targetTime = (progress: number) => {
      const length = duration();
      if (!length) return null;
      const clampedProgress = Math.min(1, Math.max(0, progress));
      const maxTime = Math.max(0, length - END_PADDING_SECONDS);
      return clampedProgress * maxTime;
    };

    const seekToProgress = (progress: number) => {
      if (video.readyState < HTMLMediaElement.HAVE_METADATA) return false;
      const target = targetTime(progress);
      if (target === null) return false;

      if (Math.abs(video.currentTime - target) < SEEK_EPSILON_SECONDS) {
        lastRequested = target;
        return true;
      }

      if (
        video.seeking &&
        Number.isFinite(lastRequested) &&
        Math.abs(lastRequested - target) < SEEK_EPSILON_SECONDS
      ) {
        return false;
      }

      lastRequested = target;
      try {
        video.currentTime = target;
      } catch {
        lastRequested = Number.NaN;
      }
      return Math.abs(video.currentTime - target) < SEEK_EPSILON_SECONDS;
    };

    const onReady = () => {
      video.pause();
      const progress = reducedMotionRef.current ? REDUCED_MOTION_PROGRESS : progressRef.current;
      seekToProgress(progress);
    };

    const onPlay = () => {
      video.pause();
    };

    video.addEventListener('loadedmetadata', onReady);
    video.addEventListener('durationchange', onReady);
    video.addEventListener('play', onPlay);

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      onReady();
    }

    const tick = () => {
      if (stopped) return;

      if (reducedMotionRef.current) {
        const settled = seekToProgress(REDUCED_MOTION_PROGRESS);
        if (!settled) frameId = requestAnimationFrame(tick);
        return;
      }

      seekToProgress(progressRef.current);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      stopped = true;
      cancelAnimationFrame(frameId);
      video.removeEventListener('loadedmetadata', onReady);
      video.removeEventListener('durationchange', onReady);
      video.removeEventListener('play', onPlay);
    };
  }, [progressRef, reducedMotion]);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover object-center"
      src={journeyVideo}
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      controls={false}
      loop={false}
      autoPlay={false}
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
