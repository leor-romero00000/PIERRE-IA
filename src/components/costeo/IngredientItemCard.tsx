import React from 'react';
import { Ingredient } from '../../types';
import { formatCurrency } from '../../utils/pricing';
import { Fish, Utensils, Sparkles, Wheat, Leaf, Trash2 } from 'lucide-react';

interface IngredientItemCardProps {
  ingredient: Ingredient;
  onRemove: (id: string) => void;
}

export const IngredientItemCard: React.FC<IngredientItemCardProps> = ({
  ingredient,
  onRemove,
}) => {
  const renderIcon = (iconType?: string) => {
    switch (iconType) {
      case 'fish':
        return <Fish className="w-5 h-5 text-[#f2ca50]" />;
      case 'meat':
        return <Utensils className="w-5 h-5 text-[#f2ca50]" />;
      case 'sprout':
        return <Sparkles className="w-5 h-5 text-[#f2ca50]" />;
      case 'butter':
        return <Wheat className="w-5 h-5 text-[#f2ca50]" />;
      default:
        return <Leaf className="w-5 h-5 text-[#f2ca50]" />;
    }
  };

  const unitDisplay =
    ingredient.unit === 'g'
      ? 'kg'
      : ingredient.unit === 'ml'
      ? 'l'
      : ingredient.unit;

  return (
    <div className="bg-[#1c1b1c] rounded-2xl p-3.5 flex flex-col gap-2.5 shadow-sm border border-[#2a2a2b]/60 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#2a2a2b] flex items-center justify-center shrink-0 border border-[#353436]">
            {renderIcon(ingredient.iconType)}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[14px] text-[#e5e2e3] font-medium truncate">
              {ingredient.name}
            </span>
            <span className="text-[11px] text-[#99907c] truncate">
              {ingredient.supplier || 'Proveedor estándar'}
            </span>
          </div>
        </div>

        {/* Thumb-friendly remove button (min 44px) */}
        <button
          onClick={() => onRemove(ingredient.id)}
          className="min-w-[44px] min-h-[44px] rounded-xl bg-[#201f20] hover:bg-rose-950/40 text-[#99907c] hover:text-rose-400 flex items-center justify-center transition-colors cursor-pointer border border-[#2a2a2b] active:scale-95 shrink-0"
          title={`Eliminar ${ingredient.name}`}
          aria-label={`Eliminar ${ingredient.name}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-[#0e0e0f] rounded-xl p-2 grid grid-cols-3 gap-1 text-center items-center border border-[#201f20]">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-semibold text-[#8E8E93]">
            Cantidad
          </span>
          <span className="text-[13px] text-[#e5e2e3] font-semibold mt-0.5">
            {ingredient.amount} {ingredient.unit}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-semibold text-[#8E8E93]">
            Precio base
          </span>
          <span className="text-[13px] text-[#d0c5af] mt-0.5">
            {formatCurrency(ingredient.unitPrice)}/{unitDisplay}
          </span>
        </div>
        <div className="flex flex-col bg-[#2a2a2b]/70 rounded-lg py-1">
          <span className="text-[10px] uppercase font-bold text-[#f2ca50]">
            Subtotal
          </span>
          <span className="text-[13px] text-[#f2ca50] font-bold mt-0.5">
            {formatCurrency(ingredient.subtotal)}
          </span>
        </div>
      </div>
    </div>
  );
};
