import React from 'react';

export interface MetricItem {
  label: string;
  value: string | number;
  highlightColor?: 'gold' | 'emerald' | 'default';
  subtext?: string;
}

interface BentoMetricsRowProps {
  metrics: MetricItem[];
  containerClassName?: string;
}

export const BentoMetricsRow: React.FC<BentoMetricsRowProps> = ({
  metrics,
  containerClassName = 'grid grid-cols-3 gap-2 bg-[#201f20] rounded-xl p-2.5 border border-[#2a2a2b]',
}) => {
  const getTextColor = (color?: MetricItem['highlightColor']) => {
    switch (color) {
      case 'emerald':
        return 'text-emerald-400';
      case 'gold':
        return 'text-[#f2ca50]';
      default:
        return 'text-[#e5e2e3]';
    }
  };

  return (
    <div className={containerClassName}>
      {metrics.map((m, idx) => (
        <div key={idx} className="flex flex-col">
          <span
            className={`text-[9px] uppercase font-semibold tracking-wider ${
              m.highlightColor === 'gold' ? 'text-[#f2ca50]' : 'text-[#99907c]'
            }`}
          >
            {m.label}
          </span>
          <span
            className={`font-serif text-[16px] font-medium mt-0.5 ${getTextColor(
              m.highlightColor
            )}`}
          >
            {m.value}
          </span>
          {m.subtext && (
            <span className="text-[10px] text-[#99907c] mt-0.5">{m.subtext}</span>
          )}
        </div>
      ))}
    </div>
  );
};
