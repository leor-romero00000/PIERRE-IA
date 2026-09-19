import React from 'react';
import { formatCurrency } from '../../utils/pricing';
import { BarChart3, Minus, Plus } from 'lucide-react';

interface FinancialResultsCardProps {
  costPerServing: number;
  desiredMargin: number;
  onMarginChange: (val: number) => void;
  suggestedPVP: number;
  netProfit: number;
  costPercentage: number;
}

export const FinancialResultsCard: React.FC<FinancialResultsCardProps> = ({
  costPerServing,
  desiredMargin,
  onMarginChange,
  suggestedPVP,
  netProfit,
  costPercentage,
}) => {
  const stepMargin = (delta: number) => {
    const next = Math.min(90, Math.max(30, desiredMargin + delta));
    onMarginChange(next);
  };

  return (
    <div
      id="financial-results-card"
      className="bg-gradient-to-br from-[#201f20] via-[#2a2a2b] to-[#0e0e0f] rounded-2xl p-5 shadow-2xl border border-[#d4af37]/30 flex flex-col gap-4 relative overflow-hidden"
    >
      {/* Ambient Glow */}
      <div className="absolute -right-8 -top-8 w-36 h-36 bg-[#f2ca50]/15 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <BarChart3 className="w-4 h-4 text-[#f2ca50]" />
          <span className="text-[11px] uppercase font-bold tracking-widest text-[#e5e2e3]">
            Escandallo Financiero
          </span>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-[#f2ca50]/15 text-[#f2ca50] text-[10px] font-bold border border-[#f2ca50]/30 uppercase">
          Cálculo en vivo
        </span>
      </div>

      {/* Total Cost Primary Display */}
      <div className="flex items-baseline justify-between py-1">
        <div className="flex flex-col">
          <span className="text-[14px] text-[#d0c5af]">Costo materia prima</span>
          <span className="text-[10px] uppercase font-semibold text-[#8E8E93]">
            Por ración neta
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-serif text-[34px] font-bold text-[#f2ca50] leading-none">
            {formatCurrency(costPerServing)}
          </span>
        </div>
      </div>

      {/* Margin Control Slider with Thumb Buttons */}
      <div className="bg-[#0e0e0f]/90 backdrop-blur rounded-xl p-3.5 flex flex-col gap-3 border border-[#2a2a2b]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase font-semibold text-[#e5e2e3]">
              Margen de Ganancia
            </span>
            <span className="text-[10px] text-[#99907c]">Desliza o usa los botones ±5%</span>
          </div>
          <div className="flex items-center gap-1 bg-[#201f20] px-2.5 py-1 rounded-lg border border-[#353436]">
            <span className="font-serif text-[18px] font-bold text-[#f2ca50]">
              {desiredMargin}%
            </span>
          </div>
        </div>

        {/* Thumb controls and slider */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => stepMargin(-5)}
            disabled={desiredMargin <= 30}
            className="min-w-[44px] min-h-[44px] rounded-xl bg-[#201f20] hover:bg-[#353436] disabled:opacity-40 flex items-center justify-center text-[#f2ca50] active:scale-95 transition-all cursor-pointer border border-[#353436]"
            aria-label="Reducir margen 5%"
          >
            <Minus className="w-4 h-4" />
          </button>

          <input
            id="margin-range-slider"
            type="range"
            min={30}
            max={90}
            step={1}
            value={desiredMargin}
            onChange={(e) => onMarginChange(parseInt(e.target.value, 10))}
            className="flex-1 accent-[#f2ca50] h-2 bg-[#353436] rounded-lg cursor-pointer py-2"
            aria-label="Ajustar margen de ganancia"
          />

          <button
            type="button"
            onClick={() => stepMargin(5)}
            disabled={desiredMargin >= 90}
            className="min-w-[44px] min-h-[44px] rounded-xl bg-[#201f20] hover:bg-[#353436] disabled:opacity-40 flex items-center justify-center text-[#f2ca50] active:scale-95 transition-all cursor-pointer border border-[#353436]"
            aria-label="Aumentar margen 5%"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex justify-between text-[11px] font-medium text-[#8E8E93] pt-0.5">
          <span>Tradicional (30%)</span>
          <span className="text-[#f2ca50] font-semibold">Alta Cocina (70%)</span>
          <span>Élite (90%)</span>
        </div>
      </div>

      {/* Suggested Price & Net Profit */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-[#0e0e0f] rounded-xl p-3.5 flex flex-col justify-between border border-[#2a2a2b]">
          <span className="text-[11px] uppercase font-semibold text-[#8E8E93]">
            PVP Carta Sugerido
          </span>
          <span className="font-serif text-[22px] font-bold text-[#e5e2e3] mt-1">
            {formatCurrency(suggestedPVP)}
          </span>
          <span className="text-[10px] text-[#99907c]">Sin IVA incluido</span>
        </div>

        <div className="bg-[#f2ca50]/10 rounded-xl p-3.5 flex flex-col justify-between border border-[#f2ca50]/20">
          <span className="text-[11px] uppercase font-bold text-[#f2ca50]">
            Ganancia Neta Est.
          </span>
          <span className="font-serif text-[22px] font-bold text-[#f2ca50] mt-1">
            +{formatCurrency(netProfit)}
          </span>
          <span className="text-[10px] text-[#f2ca50]/80">Por cada ración</span>
        </div>
      </div>

      {/* Ratio Visual Sparkline Bar */}
      <div className="flex flex-col gap-1.5 mt-1">
        <div className="flex justify-between text-[11px] font-semibold">
          <span className="text-[#8E8E93]">
            Costo: <span className="text-[#e5e2e3]">{costPercentage}%</span>
          </span>
          <span className="text-[#f2ca50]">
            Margen Bruto: {desiredMargin}%
          </span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-[#353436] overflow-hidden flex">
          <div
            className="h-full bg-[#8E8E93] transition-all duration-300"
            style={{ width: `${costPercentage}%` }}
          />
          <div
            className="h-full bg-[#f2ca50] transition-all duration-300"
            style={{ width: `${desiredMargin}%` }}
          />
        </div>
      </div>
    </div>
  );
};
