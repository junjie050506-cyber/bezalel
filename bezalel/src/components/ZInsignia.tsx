import React from 'react';

interface ZInsigniaProps {
  className?: string;
  size?: number;
  variant?: 'olive' | 'sage' | 'gold' | 'light' | 'white';
  framed?: boolean;
}

export const ZInsignia: React.FC<ZInsigniaProps> = ({
  className = '',
  size = 40,
  variant: _variant = 'olive',
  framed = false,
}) => {
  const content = (
    <img
      src="/assets/bezalel-logo.png"
      alt="BEZALEL INC Z Logo"
      style={{ width: size, height: size }}
      className={`object-contain inline-block shrink-0 ${className}`}
    />
  );

  if (!framed) {
    return content;
  }

  return (
    <div
      className="inline-flex items-center justify-center p-2 border border-[#3D4A26]/15 bg-white shadow-xs relative rounded-xl"
    >
      {content}
    </div>
  );
};

