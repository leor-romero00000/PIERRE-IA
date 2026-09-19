import React, { useState } from 'react';
import { Dish, TabType } from '../types';
import { formatCurrency } from '../utils/pricing';
import {
  ArrowLeft,
  Plus,
  Search,
  Trash2,
  Calculator,
  CookingPot,
  BookOpen,
  Sparkles,
} from 'lucide-react';

interface SavedDishesScreenProps {
  dishes: Dish[];
  onSelectDishForCosting: (dish: Dish) => void;
  onDeleteDish: (id: string) => void;
  onNavigate: (tab: TabType) => void;
  onNewDish: () => void;
}

export const SavedDishesScreen: React.FC<SavedDishesScreenProps> = ({
  dishes,
  onSelectDishForCosting,
  onDeleteDish,
  onNavigate,
  onNewDish,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dishToDelete, setDishToDelete] = useState<string | null>(null);

  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const handleDelete = (id: string) => {
    onDeleteDish(id);
    setDishToDelete(null);
  };

  return (
    <div id="saved-dishes-screen" className="flex flex-col w-full max-w-md mx-auto px-4 pb-32 pt-2 gap-4">
      {/* Top Bar with Back and New Dish Action */}
      <div className="flex items-center justify-between pt-1">
        <button
          id="btn-back-saved-dishes"
          onClick={() => onNavigate('inicio')}
          className="min-h-[44px] px-3 py-2 rounded-xl bg-[#201f20] hover:bg-[#2a2a2b] flex items-center gap-1.5 text-[#f2ca50] active:scale-95 transition-all text-[13px] font-medium border border-[#353436] cursor-pointer"
          aria-label="Volver al inicio"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Inicio</span>
        </button>

        <button
          id="btn-create-new-dish"
          onClick={onNewDish}
          className="min-h-[44px] px-3.5 py-2 rounded-xl bg-[#f2ca50] hover:bg-[#ffe088] text-[#3c2f00] font-semibold flex items-center gap-1.5 active:scale-95 transition-all text-[13px] shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Escandallo</span>
        </button>
      </div>

      {/* Screen Title & Description */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#f2ca50]" />
          <h1 className="font-serif text-[22px] font-semibold text-[#e5e2e3]">
            Platos Guardados
          </h1>
          <span className="px-2 py-0.5 rounded-full bg-[#353436] text-[#f2ca50] text-[11px] font-bold">
            {dishes.length}
          </span>
        </div>
        <p className="text-[13px] text-[#99907c] mt-0.5">
          Recetas y escandallos calculados en la pantalla de costeo
        </p>
      </div>

      {/* Simple Search Input if there are dishes */}
      {dishes.length > 0 && (
        <div className="relative">
          <Search className="w-4 h-4 text-[#99907c] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar plato por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full min-h-[46px] pl-10 pr-4 rounded-xl bg-[#1c1b1c] border border-[#2a2a2b] text-[14px] text-[#e5e2e3] placeholder-[#99907c] focus:outline-none focus:border-[#f2ca50] transition-colors"
          />
        </div>
      )}

      {/* Dishes List */}
      {filteredDishes.length === 0 ? (
        <div className="p-8 rounded-2xl bg-[#1c1b1c] border border-dashed border-[#353436] text-center flex flex-col items-center gap-3 my-4">
          <div className="w-14 h-14 rounded-full bg-[#201f20] border border-[#353436] flex items-center justify-center text-[#f2ca50]">
            <CookingPot className="w-7 h-7" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-serif text-[17px] font-semibold text-[#e5e2e3]">
              {searchTerm ? 'No se encontraron platos' : 'No tienes platos guardados'}
            </h3>
            <p className="text-[13px] text-[#99907c] max-w-xs">
              {searchTerm
                ? `No hay ningún plato que coincida con "${searchTerm}".`
                : 'Crea tu primer plato con sus ingredientes en la pantalla de costeo para guardarlo aquí.'}
            </p>
          </div>
          {searchTerm ? (
            <button
              onClick={() => setSearchTerm('')}
              className="mt-2 min-h-[42px] px-4 py-2 rounded-xl bg-[#201f20] text-[#f2ca50] text-[13px] font-medium border border-[#353436] hover:bg-[#2a2a2b] cursor-pointer"
            >
              Borrar búsqueda
            </button>
          ) : (
            <button
              onClick={() => onNavigate('costeo')}
              className="mt-2 min-h-[46px] px-5 py-2.5 rounded-xl bg-[#f2ca50] text-[#3c2f00] text-[14px] font-semibold shadow-md active:scale-95 transition-transform cursor-pointer flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Ir a Costeo</span>
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredDishes.map((dish) => (
            <div
              key={dish.id}
              className="rounded-2xl bg-[#1c1b1c] p-4 border border-[#2a2a2b] hover:border-[#d4af37]/40 transition-colors shadow-md flex flex-col gap-3"
            >
              {/* Top row: Name and Category badge */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col min-w-0">
                  <h3 className="font-serif text-[17px] font-semibold text-[#e5e2e3] truncate">
                    {dish.name}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-[#99907c] mt-0.5">
                    <span>{dish.servings || 1} {dish.servings === 1 ? 'ración' : 'raciones'}</span>
                    <span>•</span>
                    <span>{dish.ingredients.length} ingredientes</span>
                    {dish.menuType && (
                      <>
                        <span>•</span>
                        <span className="text-[#d0c5af]">{dish.menuType}</span>
                      </>
                    )}
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-[#f2ca50]/15 text-[#f2ca50] text-[11px] font-semibold shrink-0">
                  {dish.tag || 'Guardado'}
                </span>
              </div>

              {/* Financial Summary Strip */}
              <div className="grid grid-cols-3 gap-2 bg-[#0e0e0f] p-2.5 rounded-xl border border-[#2a2a2b]">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-semibold text-[#8E8E93]">
                    Costo Ración
                  </span>
                  <span className="font-serif text-[15px] font-bold text-[#e5e2e3]">
                    {formatCurrency(dish.costBase)}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-semibold text-[#8E8E93]">
                    Margen
                  </span>
                  <span className="font-serif text-[15px] font-bold text-[#f2ca50]">
                    {dish.marginReal || dish.marginDesired}%
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-semibold text-[#8E8E93]">
                    PVP Sugerido
                  </span>
                  <span className="font-serif text-[15px] font-bold text-[#e5e2e3]">
                    {formatCurrency(dish.suggestedPrice)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onSelectDishForCosting(dish)}
                  className="flex-1 min-h-[44px] px-3 py-2 rounded-xl bg-[#201f20] hover:bg-[#2a2a2b] text-[#f2ca50] font-medium text-[13px] border border-[#353436] flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Abrir en Costeo</span>
                </button>

                {dishToDelete === dish.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleDelete(dish.id)}
                      className="min-h-[44px] px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-[12px] active:scale-95 transition-all cursor-pointer"
                    >
                      Confirmar
                    </button>
                    <button
                      type="button"
                      onClick={() => setDishToDelete(null)}
                      className="min-h-[44px] px-2.5 py-2 rounded-xl bg-[#2a2a2b] text-[#e5e2e3] text-[12px] hover:bg-[#353436] cursor-pointer"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setDishToDelete(dish.id)}
                    className="min-h-[44px] min-w-[44px] px-2 py-2 rounded-xl bg-[#201f20] hover:bg-rose-950/40 text-[#99907c] hover:text-rose-400 border border-[#353436] flex items-center justify-center active:scale-95 transition-all cursor-pointer"
                    title="Eliminar plato"
                    aria-label="Eliminar plato"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
