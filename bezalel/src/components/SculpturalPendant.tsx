import React from 'react';

interface SculpturalPendantProps {
  className?: string;
  glowIntensity?: number;
}

export const SculpturalPendant: React.FC<SculpturalPendantProps> = ({
  className = '',
  glowIntensity = 1,
}) => {
  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}>
      {/* Background ambient warm bloom */}
      <div
        className="absolute w-72 sm:w-96 md:w-[480px] h-48 sm:h-64 rounded-full bg-gradient-to-b from-[#F59E0B]/25 via-[#D97706]/20 to-transparent blur-3xl pointer-events-none transition-all duration-700"
        style={{ transform: `scale(${glowIntensity})` }}
      />

      <svg
        viewBox="0 0 900 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-3xl drop-shadow-2xl"
      >
        <defs>
          {/* Inner intense incandescent light gradient */}
          <radialGradient
            id="incandescentLight1"
            cx="45%"
            cy="70%"
            r="60%"
            fx="45%"
            fy="70%"
          >
            <stop offset="0%" stopColor="#FFFBEB" stopOpacity="1" />
            <stop offset="25%" stopColor="#FDE68A" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#F59E0B" stopOpacity="0.85" />
            <stop offset="85%" stopColor="#D97706" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
          </radialGradient>

          <radialGradient
            id="incandescentLight2"
            cx="50%"
            cy="65%"
            r="65%"
            fx="50%"
            fy="65%"
          >
            <stop offset="0%" stopColor="#FFFBEB" stopOpacity="1" />
            <stop offset="30%" stopColor="#FDE68A" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.8" />
            <stop offset="90%" stopColor="#D97706" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#92400E" stopOpacity="0" />
          </radialGradient>

          {/* Exterior Sculptural Ceramic Texture Gradients in Bezalel Olive/Ivory */}
          <linearGradient id="sculpturalShadeFront" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAF7F0" />
            <stop offset="40%" stopColor="#E8E2D4" />
            <stop offset="75%" stopColor="#D5CDC0" />
            <stop offset="100%" stopColor="#B8AF9F" />
          </linearGradient>

          <linearGradient id="sculpturalShadeBack" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2DDD2" />
            <stop offset="50%" stopColor="#C9C2B3" />
            <stop offset="100%" stopColor="#A89F90" />
          </linearGradient>

          {/* Wire Cord Metallic Gradient */}
          <linearGradient id="cordGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8C9E5E" />
            <stop offset="50%" stopColor="#DFB75A" />
            <stop offset="100%" stopColor="#718247" />
          </linearGradient>

          {/* Soft bloom filter */}
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Suspension Wire Cords hanging from top ceiling grid */}
        <line x1="360" y1="0" x2="360" y2="160" stroke="url(#cordGold)" strokeWidth="1.5" strokeDasharray="none" opacity="0.75" />
        <line x1="530" y1="0" x2="530" y2="250" stroke="url(#cordGold)" strokeWidth="1.5" strokeDasharray="none" opacity="0.75" />
        <line x1="430" y1="0" x2="430" y2="162" stroke="url(#cordGold)" strokeWidth="1" strokeDasharray="none" opacity="0.5" />

        {/* Cord connection brass ferrules */}
        <circle cx="360" cy="160" r="3.5" fill="#DFB75A" stroke="#3D4A26" strokeWidth="1" />
        <circle cx="530" cy="250" r="3.5" fill="#DFB75A" stroke="#3D4A26" strokeWidth="1" />
        <circle cx="430" cy="162" r="2.5" fill="#DFB75A" stroke="#3D4A26" strokeWidth="1" />

        {/* 2. REAR PENDANT LIGHT (Offset slightly lower and to the right) */}
        <g id="rearPendant" className="transition-transform duration-700">
          {/* Inner glowing core of rear pendant */}
          <ellipse cx="530" cy="365" rx="160" ry="46" fill="url(#incandescentLight2)" filter="url(#softGlow)" opacity="0.9" />

          {/* Underside glowing rim */}
          <path
            d="M 380 345 C 410 375, 450 388, 490 375 C 530 362, 570 380, 610 392 C 650 375, 680 345, 680 345 C 660 385, 610 405, 545 400 C 470 395, 410 375, 380 345 Z"
            fill="#FBBF24"
            opacity="0.85"
            filter="url(#softGlow)"
          />

          {/* Rear sculptural body shell */}
          <path
            d="M 370 325 
               C 390 260, 440 245, 480 250
               C 520 255, 550 240, 580 250
               C 620 260, 670 280, 690 335
               C 660 375, 610 395, 545 390
               C 470 385, 400 365, 370 325 Z"
            fill="url(#sculpturalShadeBack)"
            stroke="#3D4A26"
            strokeWidth="0.75"
            strokeOpacity="0.2"
          />
        </g>

        {/* 3. FOREGROUND PRIMARY PENDANT LIGHT (Undulating Organic Waves) */}
        <g id="frontPendant" className="transition-transform duration-700">
          {/* Radiating warm light pool under the front shade */}
          <ellipse cx="370" cy="305" rx="165" ry="50" fill="url(#incandescentLight1)" filter="url(#softGlow)" opacity="0.95" />

          {/* Underside undulating warm aperture */}
          <path
            d="M 210 265 
               C 240 310, 290 330, 335 315 
               C 380 300, 425 320, 465 332 
               C 505 315, 535 275, 535 275 
               C 515 325, 465 345, 400 338 
               C 330 330, 250 310, 210 265 Z"
            fill="#F59E0B"
            opacity="0.9"
            filter="url(#softGlow)"
          />

          {/* Sculptural flowing organic front shell */}
          <path
            d="M 205 245 
               C 225 170, 280 155, 325 160 
               C 370 165, 405 145, 440 155 
               C 485 168, 525 190, 540 255 
               C 515 315, 465 338, 400 332 
               C 330 325, 245 300, 205 245 Z"
            fill="url(#sculpturalShadeFront)"
            stroke="#3D4A26"
            strokeWidth="0.8"
            strokeOpacity="0.25"
          />

          {/* Sculptural wave surface contours (subtle highlight ridges) */}
          <path
            d="M 325 162 C 345 220, 340 280, 335 315"
            stroke="#FFFBEB"
            strokeWidth="1.5"
            strokeOpacity="0.45"
            strokeLinecap="round"
          />
          <path
            d="M 440 158 C 450 215, 445 275, 440 328"
            stroke="#78716C"
            strokeWidth="1"
            strokeOpacity="0.25"
            strokeLinecap="round"
          />

          {/* Embossed subtle Z monogram in gold leaf on the front contour */}
          <g transform="translate(355, 215) scale(0.65)" opacity="0.6">
            <path
              d="M 5 5 L 45 5 L 15 45 L 45 45"
              stroke="#DFB75A"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};
