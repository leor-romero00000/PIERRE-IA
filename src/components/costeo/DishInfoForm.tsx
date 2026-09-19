import React from 'react';
import { Dish } from '../../types';
import { Utensils, Edit2, Minus, Plus, ChevronDown } from 'lucide-react';

interface DishInfoFormProps {
  dishName: string;
  onDishNameChange: (name: string) => void;
  servings: number;
  onIncrementServings: () => void;
  onDecrementServings: () => void;
  menuType: Dish['menuType'];
  onMenuTypeChange: (type: Dish['menuType']) => void;
}

export const DishInfoForm: React.FC<DishInfoFormProps> = ({
  dishName,
  onDishNameChange,
  servings,
  onIncrementServings,
  onDecrementServings,
  menuType,
  onMenuTypeChange,
}) => {
  return (
    <div
      id="dish-info-card"
      className="bg-[#1c1b1c] rounded-2xl p-4 shadow-md border border-[#2a2a2b]/80 flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="dish-name-input"
          className="text-[11px] uppercase font-semibold tracking-wider text-[#99907c] flex items-center gap-1.5"
        >
          <Utensils className="w-3.5 h-3.5 text-[#f2ca50]" />
          Nombre del Plato
        </label>
        <div className="bg-[#0e0e0f] rounded-xl px-3.5 py-3 flex items-center justify-between border border-[#2a2a2b] focus-within:border-[#f2ca50]/70 transition-colors min-h-[48px]">
          <input
            id="dish-name-input"
            type="text"
            value={dishName}
            onChange={(e) => onDishNameChange(e.target.value)}
            placeholder="Ej: Lubina confitada sobre crema de puerros"
            className="bg-transparent font-serif text-[16px] font-medium text-[#e5e2e3] w-full focus:outline-none placeholder:text-[#99907c]/70"
          />
          <Edit2 className="w-4 h-4 text-[#f2ca50] shrink-0 ml-2 opacity-80" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Raciones / Servicio */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] uppercase font-semibold tracking-wider text-[#99907c]">
            Raciones / Servicio
          </span>
          <div className="bg-[#0e0e0f] rounded-xl p-1 flex items-center justify-between border border-[#2a2a2b] min-h-[48px]">
            <button
              id="btn-dec-servings"
              type="button"
              onClick={onDecrementServings}
              disabled={servings <= 1}
              className="w-11 h-11 rounded-lg bg-[#2a2a2b] hover:bg-[#353436] disabled:opacity-40 flex items-center justify-center text-[#f2ca50] active:scale-95 transition-colors cursor-pointer"
              title="Disminuir raciones"
              aria-label="Disminuir raciones"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-serif text-[17px] font-semibold text-[#e5e2e3] px-2">
              {servings}
            </span>
            <button
              id="btn-inc-servings"
              type="button"
              onClick={onIncrementServings}
              className="w-11 h-11 rounded-lg bg-[#2a2a2b] hover:bg-[#353436] flex items-center justify-center text-[#f2ca50] active:scale-95 transition-colors cursor-pointer"
              title="Aumentar raciones"
              aria-label="Aumentar raciones"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tipo de Menú */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] uppercase font-semibold tracking-wider text-[#99907c]">
            Tipo de Menú
          </span>
          <div className="relative">
            <select
              id="menu-type-select"
              value={menuType}
              onChange={(e) => onMenuTypeChange(e.target.value as Dish['menuType'])}
              className="w-full bg-[#0e0e0f] rounded-xl px-3.5 min-h-[48px] flex items-center justify-between text-[#e5e2e3] text-[14px] border border-[#2a2a2b] appearance-none focus:outline-none focus:border-[#f2ca50]/70 cursor-pointer pr-8"
            >
              <option value="Degustación">Degustación</option>
              <option value="Carta">Carta</option>
              <option value="Ejecutivo">Ejecutivo</option>
              <option value="Temporada">Temporada</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#f2ca50] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
