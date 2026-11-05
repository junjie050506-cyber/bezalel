import React, { useState, useEffect, useRef } from 'react';

export interface VideoBackgroundProps {
  src?: string;
  sources?: string[];
  poster?: string;
  opacity?: string;
  overlayGradient?: string;
  rootMargin?: string;
  className?: string;
  videoClassName?: string;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  src = '/assets/videos/Background Video 2.mp4',
  sources,
  poster,
  opacity = 'opacity-30',
  overlayGradient = 'bg-gradient-to-b from-[#111610] via-[#111610]/75 to-[#111610]',
  rootMargin = '200px 0px',
  className = '',
  videoClassName = '',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSources = sources && sources.length > 0 ? sources : [src];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            setIsInView(true);
          } else {
            setIsInView(false);
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    if (isInView) {
      video.play().catch(() => {
        // Autoplay policy fallback
      });
    } else if (!video.paused) {
      video.pause();
    }
  }, [shouldLoad, isInView, videoSources]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}
    >
      <video
        ref={videoRef}
        key={videoSources.join('|')}
        autoPlay={shouldLoad && isInView}
        loop
        muted
        playsInline
        preload={shouldLoad ? 'metadata' : 'none'}
        poster={poster}
        onLoadedData={() => setIsLoaded(true)}
        onCanPlay={() => setIsLoaded(true)}
        onPlay={() => setIsLoaded(true)}
        className={`w-full h-full object-cover object-center transition-opacity duration-700 ${
          isLoaded ? opacity : 'opacity-0'
        } ${videoClassName}`}
      >
        {shouldLoad &&
          videoSources.map((sourceUrl, idx) => (
            <source key={idx} src={sourceUrl} type="video/mp4" />
          ))}
      </video>

      {/* Atmospheric Scrim Overlay ensuring WCAG AAA typography contrast */}
      <div className={`absolute inset-0 pointer-events-none ${overlayGradient}`} />
    </div>
  );
};
