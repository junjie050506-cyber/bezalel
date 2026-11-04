import React, { useState, useEffect, useRef } from 'react';

export interface VideoBackgroundProps {
  src?: string;
  sources?: string[];
  poster?: string;
  opacity?: string;
  overlayGradient?: string;
  className?: string;
  videoClassName?: string;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  src = '/assets/videos/Background Video 2.mp4',
  sources,
  poster,
  opacity = 'opacity-30',
  overlayGradient = 'bg-gradient-to-b from-[#111610] via-[#111610]/75 to-[#111610]',
  className = '',
  videoClassName = '',
}) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSources = sources && sources.length > 0 ? sources : [src];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, [videoSources]);

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}
    >
      <video
        ref={videoRef}
        key={videoSources.join('|')}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={poster}
        onLoadedData={() => setIsLoaded(true)}
        onCanPlay={() => setIsLoaded(true)}
        onPlay={() => setIsLoaded(true)}
        className={`w-full h-full object-cover object-center transition-opacity duration-700 ${
          isLoaded ? opacity : 'opacity-0'
        } ${videoClassName}`}
      >
        {videoSources.map((sourceUrl, idx) => (
          <source key={idx} src={sourceUrl} type="video/mp4" />
        ))}
      </video>

      {/* Atmospheric Scrim Overlay ensuring WCAG AAA typography contrast */}
      <div className={`absolute inset-0 pointer-events-none ${overlayGradient}`} />
    </div>
  );
};
