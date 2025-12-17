import React from 'react';

interface CardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'green' | 'yellow' | 'red' | 'blue';
}

export default function Card({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = 'green',
}: CardProps) {
  const colorClasses = {
    green: {
      bg: 'bg-[#C2EE71]/5',
      border: 'border-[#C2EE71]/20',
      text: 'text-[#C2EE71]',
      accent: 'text-[#C2EE71]/50',
      glow: 'bg-[#C2EE71]/10',
    },
    yellow: {
      bg: 'bg-[#F09414]/5',
      border: 'border-[#F09414]/20',
      text: 'text-[#F09414]',
      accent: 'text-[#F09414]/50',
      glow: 'bg-[#F09414]/10',
    },
    red: {
      bg: 'bg-[#ED0006]/5',
      border: 'border-[#ED0006]/20',
      text: 'text-[#ED0006]',
      accent: 'text-[#ED0006]/50',
      glow: 'bg-[#ED0006]/10',
    },
    blue: {
      bg: 'bg-blue-500/5',
      border: 'border-blue-500/20',
      text: 'text-blue-400',
      accent: 'text-blue-400/50',
      glow: 'bg-blue-500/10',
    },
  };

  const currentColor = colorClasses[color];

  return (
    <div
      className={`relative overflow-hidden bg-black/40 backdrop-blur-md border ${currentColor.border} rounded-lg p-6 transition-all duration-300 hover:border-opacity-40 group`}
    >
      {/* Ambient glow effect on hover */}
      <div
        className={`absolute inset-0 ${currentColor.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`}
      ></div>

      <div className="relative z-10">
        {/* Header with icon */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p
              className={`text-xs font-light ${currentColor.accent} uppercase tracking-wider mb-1`}
            >
              {title}
            </p>
            <h3
              className={`text-3xl font-light ${currentColor.text} tracking-tight`}
            >
              {typeof value === 'number' ? value.toLocaleString() : value}
            </h3>
          </div>
          {icon && (
            <div
              className={`p-3 rounded-lg ${currentColor.bg} ${currentColor.text}`}
            >
              {icon}
            </div>
          )}
        </div>

        {/* Footer with subtitle and trend */}
        <div className="flex items-center justify-between">
          {subtitle && (
            <p className={`text-xs ${currentColor.accent} font-light`}>
              {subtitle}
            </p>
          )}

          {trend && (
            <div
              className={`flex items-center gap-1 text-xs font-light ${
                trend.isPositive ? 'text-green-400' : 'text-red-400'
              }`}
            >
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>

        {/* Decorative line */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-px ${currentColor.glow}`}
        ></div>
      </div>
    </div>
  );
}