import React, { useState } from 'react';
import { Dish, TabType } from '../types';
import { useDishCostCalculator } from '../hooks/useDishCostCalculator';
import { DishInfoForm } from './costeo/DishInfoForm';
import { IngredientItemCard } from './costeo/IngredientItemCard';
import { FinancialResultsCard } from './costeo/FinancialResultsCard';
import { AddIngredientModal } from './costeo/AddIngredientModal';
import {
  ArrowLeft,
  Plus,
  BookOpen,
  Check,
  History,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface CostCalculatorScreenProps {
  currentDish?: Dish;
  onSaveDish: (dish: Dish) => void;
  onNavigate: (tab: TabType) => void;
}

export const CostCalculatorScreen: React.FC<CostCalculatorScreenProps> = ({
  currentDish,
  onSaveDish,
  onNavigate,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [saveToast, setSaveToast] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const {
    dishName,
    setDishName,
    servings,
    incrementServings,
    decrementServings,
    menuType,
    setMenuType,
    ingredients,
    addIngredient,
    removeIngredient,
    desiredMargin,
    setDesiredMargin,
    costPerServing,
    suggestedPVP,
    netProfit,
    costPercentage,
    getDishSnapshot,
  } = useDishCostCalculator(currentDish);

  const handleSave = () => {
    setValidationError(null);
    if (!dishName.trim()) {
      setValidationError('Por favor escribe un nombre para tu plato antes de guardarlo.');
      return;
    }

    if (ingredients.length === 0) {
      setValidationError('Añade al menos un ingrediente para poder calcular y guardar el escandallo.');
      return;
    }

    const updated = getDishSnapshot();
    onSaveDish(updated);
    setSaveToast(true);
    setTimeout(() => {
      setSaveToast(false);
    }, 2800);
  };

  return (
    <div id="cost-calculator-screen" className="flex flex-col w-full max-w-md mx-auto pb-32">
      {/* Header */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <button
          id="btn-back-calculator"
          onClick={() => onNavigate('inicio')}
          className="min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-xl bg-[#201f20] hover:bg-[#2a2a2b] flex items-center gap-2 text-[#f2ca50] active:scale-95 transition-all shadow-sm cursor-pointer border border-[#353436]"
          aria-label="Volver al inicio"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-[13px] font-medium">Inicio</span>
        </button>

        <button
          id="btn-go-to-saved-dishes"
          onClick={() => onNavigate('platos')}
          className="min-h-[44px] px-3 py-2 rounded-xl bg-[#201f20] hover:bg-[#2a2a2b] flex items-center gap-1.5 text-[#e5e2e3] hover:text-[#f2ca50] active:scale-95 transition-all shadow-sm cursor-pointer border border-[#353436] text-[13px] font-medium"
          aria-label="Ver platos guardados"
        >
          <BookOpen className="w-4 h-4 text-[#f2ca50]" />
          <span>Platos Guardados</span>
        </button>
      </div>

      {/* Main Formulation Container */}
      <div className="px-4 flex flex-col gap-5 mt-2">
        {/* Visual onboarding hint for new users */}
        <div className="bg-[#201f20] border border-[#d4af37]/30 rounded-xl p-3 flex items-start gap-2.5 text-[12px] text-[#d0c5af]">
          <span className="text-[#f2ca50] text-base leading-none">💡</span>
          <p className="leading-snug">
            <strong>Cómo funciona:</strong> Ajusta los ingredientes o el margen de ganancia para ver tu PVP recomendado y ganancia estimada al instante.
          </p>
        </div>

        {/* Validation Error Banner */}
        {validationError && (
          <div className="p-3 bg-rose-950/50 border border-rose-800 rounded-xl flex items-center gap-2.5 text-rose-300 text-[13px]">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Dish Information Card */}
        <DishInfoForm
          dishName={dishName}
          onDishNameChange={(name) => {
            setDishName(name);
            if (validationError) setValidationError(null);
          }}
          servings={servings}
          onIncrementServings={incrementServings}
          onDecrementServings={decrementServings}
          menuType={menuType}
          onMenuTypeChange={setMenuType}
        />

        {/* Ingredients Section */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase font-bold tracking-wider text-[#99907c]">
              Composición de Ingredientes ({ingredients.length})
            </span>
            <span className="text-[11px] text-[#f2ca50]">
              Base por receta completa
            </span>
          </div>

          {/* Empty ingredients state */}
          {ingredients.length === 0 ? (
            <div className="p-6 rounded-2xl bg-[#1c1b1c] border border-dashed border-[#353436] text-center flex flex-col items-center gap-2">
              <span className="text-2xl">🌿</span>
              <p className="text-[13px] text-[#d0c5af]">
                Aún no has añadido ingredientes a esta receta.
              </p>
              <p className="text-[11px] text-[#99907c]">
                Toca el botón inferior para agregar el primero con su costo unitario.
              </p>
            </div>
          ) : (
            ingredients.map((ing) => (
              <IngredientItemCard
                key={ing.id}
                ingredient={ing}
                onRemove={removeIngredient}
              />
            ))
          )}

          {/* Add Ingredient Trigger Button (comfortable thumb target) */}
          <button
            id="btn-add-ingredient"
            type="button"
            onClick={() => setShowAddModal(true)}
            className="w-full min-h-[50px] py-3 rounded-2xl bg-[#201f20] hover:bg-[#2a2a2b] border border-dashed border-[#d4af37]/50 text-[#f2ca50] flex items-center justify-center gap-2 text-[14px] font-semibold transition-all active:scale-[0.99] cursor-pointer shadow-sm"
          >
            <Plus className="w-5 h-5" />
            <span>Añadir ingrediente al escandallo</span>
          </button>
        </div>

        {/* Golden High-Impact Financial Results Card */}
        <FinancialResultsCard
          costPerServing={costPerServing}
          desiredMargin={desiredMargin}
          onMarginChange={setDesiredMargin}
          suggestedPVP={suggestedPVP}
          netProfit={netProfit}
          costPercentage={costPercentage}
        />

        {/* Chef's Note & Atelier Certification */}
        <div className="bg-[#1c1b1c] rounded-2xl p-4 flex items-center justify-between border border-[#2a2a2b]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#353436] flex items-center justify-center text-[#f2ca50]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] text-[#e5e2e3] font-medium">
                Certificación Atelier
              </span>
              <span className="text-[11px] text-[#99907c]">
                Aprobado para pase de servicio
              </span>
            </div>
          </div>
          <CheckCircle2 className="w-5 h-5 text-[#f2ca50]" />
        </div>

        {/* Primary Save Action Button in the thumb reach zone */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            id="btn-save-dish-action"
            type="button"
            onClick={handleSave}
            className={`w-full min-h-[54px] py-3.5 px-6 rounded-2xl font-serif text-[17px] font-semibold flex items-center justify-center gap-2 shadow-xl transition-all duration-300 active:scale-[0.98] cursor-pointer ${
              saveToast
                ? 'bg-emerald-500 text-black'
                : 'bg-[#f2ca50] hover:bg-[#ffe088] text-[#3c2f00] shadow-[0_4px_24px_rgba(242,202,80,0.3)]'
            }`}
          >
            {saveToast ? (
              <>
                <Check className="w-5 h-5 text-black" />
                <span>¡Plato guardado con éxito!</span>
              </>
            ) : (
              <>
                <BookOpen className="w-5 h-5" />
                <span>Guardar este plato</span>
              </>
            )}
          </button>

          {saveToast && (
            <button
              type="button"
              onClick={() => onNavigate('platos')}
              className="w-full min-h-[44px] py-2 px-4 rounded-xl bg-[#201f20] hover:bg-[#2a2a2b] border border-[#f2ca50]/40 text-[#f2ca50] text-[13px] font-medium flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all animate-fadeIn"
            >
              <BookOpen className="w-4 h-4" />
              <span>Ver en Platos Guardados →</span>
            </button>
          )}

          <div className="flex items-center justify-center gap-1.5 text-[#8E8E93] text-[11px] uppercase tracking-wider py-1">
            <History className="w-3.5 h-3.5" />
            <span>Escandallo sincronizado localmente</span>
          </div>
        </div>
      </div>

      {/* Add Ingredient Modal */}
      <AddIngredientModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={addIngredient}
      />
    </div>
  );
};
