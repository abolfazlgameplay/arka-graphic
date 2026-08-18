import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'teal' | 'emerald' | 'rose' | 'slate';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  size = 'md',
  className = '',
}) => {
  const variantStyles = {
    gold: 'bg-amber-400/10 text-amber-300 border-amber-500/30 shadow-amber-500/10',
    teal: 'bg-teal-500/15 text-teal-300 border-teal-500/30 shadow-teal-500/10',
    emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 shadow-emerald-500/10',
    rose: 'bg-rose-500/15 text-rose-300 border-rose-500/30 shadow-rose-500/10',
    slate: 'bg-slate-800/80 text-slate-300 border-slate-700 shadow-slate-900/10',
  };

  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-[11px]',
    md: 'px-3.5 py-1 text-xs',
    lg: 'px-4 py-1.5 text-xs sm:text-sm font-bold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold border backdrop-blur-md shadow-sm transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      <span>{children}</span>
    </span>
  );
};
