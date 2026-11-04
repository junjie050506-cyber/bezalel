import React, { useEffect, useRef } from 'react';

export interface SeamlessVideoBackgroundProps {
  src: string;
  crossfadeDuration?: number; // Duration of dissolve transition in seconds (default: 1.5s)
  className?: string;
  videoClassName?: string;
  onLoadedData?: () => void;
  onError?: () => void;
}

/**
 * SeamlessVideoBackground
 *
 * Frame-accurate dual-buffered A/B video player that performs a zero-glitch
 * cosine S-curve crossfade from the end of the video to the beginning.
 * - Pre-seeks and decodes frame 0 on the standby track while hidden (opacity: 0).
 * - Holds the retiring track on its last frame during the crossfade (never seeks while visible).
 * - Drives opacity directly in requestAnimationFrame with Porter-Duff alpha = 1 invariant.
 */
export const SeamlessVideoBackground: React.FC<SeamlessVideoBackgroundProps> = ({
  src,
  crossfadeDuration = 1.5,
  className = '',
  videoClassName = '',
  onLoadedData,
  onError,
}) => {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  const activeTrackRef = useRef<1 | 2>(1);
  const transitioningRef = useRef<boolean>(false);
  const transitionStartMsRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const loadedNotifiedRef = useRef<boolean>(false);

  const notifyLoaded = () => {
    if (!loadedNotifiedRef.current) {
      loadedNotifiedRef.current = true;
      onLoadedData?.();
    }
  };

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    loadedNotifiedRef.current = false;
    activeTrackRef.current = 1;
    transitioningRef.current = false;

    // Track 1 starts as the active base layer (zIndex 1, opacity 1)
    v1.style.zIndex = '1';
    v1.style.opacity = '1';
    v1.currentTime = 0;

    // Track 2 starts as the pre-seeked standby overlay layer (zIndex 2, opacity 0)
    v2.style.zIndex = '2';
    v2.style.opacity = '0';
    v2.currentTime = 0;
    v2.pause();

    if (v1.readyState >= 2) {
      notifyLoaded();
    }

    v1.play().catch(() => {
      // Autoplay fallback
    });

    const fadeDurSec = Math.max(0.4, crossfadeDuration);

    const tick = (now: number) => {
      const activeTrack = activeTrackRef.current;
      const activeVideo = activeTrack === 1 ? v1 : v2;
      const standbyVideo = activeTrack === 1 ? v2 : v1;

      const duration = activeVideo.duration;
      if (duration && Number.isFinite(duration) && duration > fadeDurSec) {
        const timeLeft = duration - activeVideo.currentTime;

        // 1. Trigger crossfade when approaching the end of activeVideo
        if (!transitioningRef.current && timeLeft <= fadeDurSec) {
          transitioningRef.current = true;
          transitionStartMsRef.current = now;

          // Standby video is already seeked to 0; ensure it is on top at opacity 0
          activeVideo.style.zIndex = '1';
          activeVideo.style.opacity = '1';
          standbyVideo.style.zIndex = '2';
          standbyVideo.style.opacity = '0';

          if (standbyVideo.currentTime > 0.05) {
            standbyVideo.currentTime = 0;
          }
          standbyVideo.play().catch(() => {});
        }

        // 2. Drive per-frame cosine S-curve crossfade
        if (transitioningRef.current) {
          // Hold activeVideo on its final frame instead of seeking while visible
          if (activeVideo.ended || activeVideo.currentTime >= duration - 0.04) {
            if (!activeVideo.paused) {
              activeVideo.pause();
            }
          }

          // Use standbyVideo playback progress (with wall-clock fallback) once decoded
          const wallElapsedSec = (now - transitionStartMsRef.current) / 1000;
          const standbyElapsedSec =
            !standbyVideo.seeking && standbyVideo.currentTime > 0
              ? standbyVideo.currentTime
              : wallElapsedSec;

          const p = Math.min(1, Math.max(0, standbyElapsedSec / fadeDurSec));
          // Smooth cosine S-curve: 0 -> 1 with zero derivative at both endpoints
          const alpha = 0.5 - 0.5 * Math.cos(p * Math.PI);
          standbyVideo.style.opacity = alpha.toFixed(4);

          // 3. Complete handoff once standbyVideo is 100% opaque on top
          if (p >= 1) {
            standbyVideo.style.opacity = '1';
            standbyVideo.style.zIndex = '1';

            // Hide retiring video first, then reset & pre-decode frame 0 for next loop
            activeVideo.style.opacity = '0';
            activeVideo.style.zIndex = '2';
            activeVideo.pause();
            try {
              activeVideo.currentTime = 0;
            } catch {
              // Ignore seek errors on unloaded media
            }

            activeTrackRef.current = activeTrack === 1 ? 2 : 1;
            transitioningRef.current = false;
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const current = activeTrackRef.current === 1 ? v1 : v2;
        if (current && current.paused) {
          current.play().catch(() => {});
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [src, crossfadeDuration]);

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      {/* Track 1 */}
      <video
        ref={video1Ref}
        src={src}
        autoPlay
        muted
        playsInline
        preload="auto"
        onLoadedData={notifyLoaded}
        onCanPlay={notifyLoaded}
        onError={onError}
        className={`absolute inset-0 w-full h-full object-cover object-center will-change-[opacity] ${videoClassName}`}
        style={{ opacity: 1, zIndex: 1 }}
      />

      {/* Track 2 */}
      <video
        ref={video2Ref}
        src={src}
        muted
        playsInline
        preload="auto"
        onLoadedData={notifyLoaded}
        onCanPlay={notifyLoaded}
        className={`absolute inset-0 w-full h-full object-cover object-center will-change-[opacity] ${videoClassName}`}
        style={{ opacity: 0, zIndex: 2 }}
      />
    </div>
  );
};
