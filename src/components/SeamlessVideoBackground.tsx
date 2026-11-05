import React, { useEffect, useRef, useState } from 'react';

export interface SeamlessVideoBackgroundProps {
  src: string;
  crossfadeDuration?: number; // Duration of dissolve transition in seconds (default: 1.5s)
  rootMargin?: string; // IntersectionObserver rootMargin (default: '200px 0px')
  className?: string;
  videoClassName?: string;
  onLoadedData?: () => void;
  onError?: () => void;
}

/**
 * SeamlessVideoBackground
 *
 * Frame-accurate dual-buffered A/B video player with IntersectionObserver-based
 * lazy loading and viewport-aware playback lifecycle:
 * - Defers attaching video sources and network fetching until the container enters
 *   (or approaches within rootMargin of) the viewport.
 * - Automatically pauses video decoding and suspends the requestAnimationFrame loop
 *   when the hero section is scrolled out of view, resuming seamlessly on re-entry.
 * - Performs a zero-glitch cosine S-curve crossfade from the end of the video to the beginning.
 */
export const SeamlessVideoBackground: React.FC<SeamlessVideoBackgroundProps> = ({
  src,
  crossfadeDuration = 1.5,
  rootMargin = '200px 0px',
  className = '',
  videoClassName = '',
  onLoadedData,
  onError,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  const [shouldLoad, setShouldLoad] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(false);
  const isInViewRef = useRef<boolean>(false);

  const activeTrackRef = useRef<1 | 2>(1);
  const transitioningRef = useRef<boolean>(false);
  const transitionStartMsRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const loadedNotifiedRef = useRef<boolean>(false);
  const standbyPrimedRef = useRef<boolean>(false);

  const notifyLoaded = () => {
    if (!loadedNotifiedRef.current) {
      loadedNotifiedRef.current = true;
      onLoadedData?.();
    }
    // Prime standby track once primary track has buffered initial frames
    if (!standbyPrimedRef.current && video2Ref.current) {
      standbyPrimedRef.current = true;
      video2Ref.current.preload = 'auto';
    }
  };

  // 1. Observe container visibility for lazy loading and viewport-based play/pause
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      setIsInView(true);
      isInViewRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            setIsInView(true);
            isInViewRef.current = true;
          } else {
            setIsInView(false);
            isInViewRef.current = false;
          }
        }
      },
      {
        rootMargin,
        threshold: 0.01,
      }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);

  // 2. Initialize tracks when src or lazy-load state changes
  useEffect(() => {
    if (!shouldLoad) return;

    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    loadedNotifiedRef.current = false;
    standbyPrimedRef.current = false;
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

    if (isInViewRef.current) {
      v1.play().catch(() => {
        // Autoplay fallback
      });
    }
  }, [src, shouldLoad]);

  // 3. Manage playback and RAF loop only while in viewport
  useEffect(() => {
    if (!shouldLoad) return;

    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    if (!isInView) {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (!v1.paused) v1.pause();
      if (!v2.paused) v2.pause();
      return;
    }

    // Resume active video when entering viewport
    const currentActive = activeTrackRef.current === 1 ? v1 : v2;
    if (currentActive.paused) {
      currentActive.play().catch(() => {});
    }
    if (transitioningRef.current) {
      const currentStandby = activeTrackRef.current === 1 ? v2 : v1;
      if (currentStandby.paused) {
        currentStandby.play().catch(() => {});
      }
    }

    const fadeDurSec = Math.max(0.4, crossfadeDuration);

    const tick = (now: number) => {
      if (!isInViewRef.current) return;

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

          // Use monotonic wall-clock progress for 60/120fps stutter-free opacity interpolation
          const wallElapsedSec = (now - transitionStartMsRef.current) / 1000;
          const p = Math.min(1, Math.max(0, wallElapsedSec / fadeDurSec));
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
      if (document.visibilityState === 'visible' && isInViewRef.current) {
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
        rafIdRef.current = null;
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [shouldLoad, isInView, crossfadeDuration]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}
    >
      {/* Track 1 */}
      <video
        ref={video1Ref}
        src={shouldLoad ? src : undefined}
        autoPlay={shouldLoad && isInView}
        muted
        playsInline
        preload={shouldLoad ? 'auto' : 'none'}
        onLoadedData={notifyLoaded}
        onCanPlay={notifyLoaded}
        onError={onError}
        className={`absolute inset-0 w-full h-full object-cover object-center will-change-[opacity] ${videoClassName}`}
        style={{ opacity: 1, zIndex: 1 }}
      />

      {/* Track 2 */}
      <video
        ref={video2Ref}
        src={shouldLoad ? src : undefined}
        muted
        playsInline
        preload={shouldLoad ? 'metadata' : 'none'}
        onLoadedData={notifyLoaded}
        onCanPlay={notifyLoaded}
        className={`absolute inset-0 w-full h-full object-cover object-center will-change-[opacity] ${videoClassName}`}
        style={{ opacity: 0, zIndex: 2 }}
      />
    </div>
  );
};
