import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  onClick,
}) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
    xl: 'h-20',
  };

  const iconSizes = {
    sm: 32,
    md: 40,
    lg: 56,
    xl: 80,
  };

  const iconPx = iconSizes[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none group cursor-pointer ${className}`}
    >
      {/* Luxury Geometric Monogram SVG */}
      <div className="relative flex items-center justify-center">
        <svg
          width={iconPx}
          height={iconPx}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-500 group-hover:scale-105"
        >
          <defs>
            <linearGradient id="arkaGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="50%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#99701a" />
            </linearGradient>
            <linearGradient id="arkaTealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#0d5c5f" />
            </linearGradient>
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer shield container */}
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="24"
            fill="#092122"
            stroke="url(#arkaGoldGrad)"
            strokeWidth="2"
            className="transition-all duration-300 group-hover:stroke-amber-300"
          />

          {/* Inner ambient geometry */}
          <circle cx="50" cy="50" r="34" stroke="#134e4a" strokeWidth="1" strokeDasharray="3 3" />

          {/* Luxury Stylized 'A' & Graphic Pen / Diamond */}
          {/* Main Triangle / Letter A */}
          <path
            d="M50 18 L80 78 L63 78 L53 58 L47 58 L37 78 L20 78 Z"
            fill="url(#arkaGoldGrad)"
            filter="url(#goldGlow)"
          />
          {/* Internal Diamond cutout */}
          <path
            d="M50 36 L43 50 L57 50 Z"
            fill="#092122"
          />
          {/* Teal Creative Sparkle */}
          <circle cx="50" cy="20" r="4.5" fill="#5eead4" />
          <path
            d="M50 43 L52 47 L56 49 L52 51 L50 55 L48 51 L44 49 L48 47 Z"
            fill="#5eead4"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-right">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold tracking-tight text-white group-hover:text-amber-300 transition-colors text-lg sm:text-xl">
              مجموعه گرافیک <span className="gold-gradient-text">آرکا</span>
            </span>
          </div>
          <span className="text-[11px] text-teal-300/75 tracking-wider font-light">
            ARKA GRAPHIC STUDIO
          </span>
        </div>
      )}
    </div>
  );
};
