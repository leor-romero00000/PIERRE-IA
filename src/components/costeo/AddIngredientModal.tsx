import React, { useState } from 'react';
import { Ingredient } from '../../types';
import { X, AlertCircle } from 'lucide-react';

interface AddIngredientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (
    name: string,
    supplier: string,
    amount: number,
    unit: Ingredient['unit'],
    unitPrice: number
  ) => void;
}

export const AddIngredientModal: React.FC<AddIngredientModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState('');
  const [supplier, setSupplier] = useState('');
  const [amount, setAmount] = useState<string>('100');
  const [unit, setUnit] = useState<Ingredient['unit']>('g');
  const [unitPrice, setUnitPrice] = useState<string>('12.50');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedName = name.trim();
    if (!trimmedName) {
      setErrorMessage('Por favor, escribe el nombre del ingrediente para poder añadirlo.');
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorMessage('La cantidad debe ser un número positivo (por ejemplo: 150).');
      return;
    }

    const parsedPrice = parseFloat(unitPrice);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      setErrorMessage('El precio base debe ser un valor válido (por ejemplo: 8.50).');
      return;
    }

    onAdd(
      trimmedName,
      supplier.trim() || 'Proveedor habitual',
      parsedAmount,
      unit,
      parsedPrice
    );

    // Reset and close
    setName('');
    setSupplier('');
    setAmount('100');
    setUnitPrice('12.50');
    setErrorMessage(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
      <div className="bg-[#1c1b1c] w-full max-w-md rounded-2xl p-5 border border-[#d4af37]/40 shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-2 border-b border-[#2a2a2b]">
          <h3 className="font-serif text-[18px] font-semibold text-[#e5e2e3]">
            Añadir Ingrediente al Escandallo
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center text-[#99907c] hover:text-[#e5e2e3] rounded-xl hover:bg-[#2a2a2b] cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl flex items-start gap-2.5 text-rose-300 text-[13px]">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {/* Nombre */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] uppercase font-semibold text-[#99907c]">
              Nombre del Ingrediente *
            </label>
            <input
              type="text"
              required
              autoFocus
              placeholder="Ej: Mantequilla de Normandía"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              className="bg-[#0e0e0f] border border-[#2a2a2b] rounded-xl px-3.5 min-h-[48px] text-[14px] text-[#e5e2e3] focus:outline-none focus:border-[#f2ca50] placeholder:text-[#99907c]/60"
            />
          </div>

          {/* Cantidad, Unidad, Precio base */}
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] uppercase font-semibold text-[#99907c]">
                Cantidad *
              </label>
              <input
                type="number"
                inputMode="decimal"
                step="any"
                min="0.01"
                required
                placeholder="100"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-[#0e0e0f] border border-[#2a2a2b] rounded-xl px-3 min-h-[48px] text-[14px] text-[#e5e2e3] focus:outline-none focus:border-[#f2ca50]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] uppercase font-semibold text-[#99907c]">
                Unidad *
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as Ingredient['unit'])}
                className="bg-[#0e0e0f] border border-[#2a2a2b] rounded-xl px-2 min-h-[48px] text-[14px] text-[#e5e2e3] focus:outline-none focus:border-[#f2ca50] cursor-pointer"
              >
                <option value="g">Gramos (g)</option>
                <option value="kg">Kilos (kg)</option>
                <option value="ml">Mililitros (ml)</option>
                <option value="l">Litros (l)</option>
                <option value="ud">Unidades (ud)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] uppercase font-semibold text-[#99907c]">
                Precio ($) *
              </label>
              <input
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                required
                placeholder="12.50"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                className="bg-[#0e0e0f] border border-[#2a2a2b] rounded-xl px-3 min-h-[48px] text-[14px] text-[#e5e2e3] focus:outline-none focus:border-[#f2ca50]"
              />
            </div>
          </div>

          {/* Proveedor / Origen */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] uppercase font-semibold text-[#99907c]">
              Proveedor / Origen (Opcional)
            </label>
            <input
              type="text"
              placeholder="Ej: Lonja Gallega o Mercado Central"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              className="bg-[#0e0e0f] border border-[#2a2a2b] rounded-xl px-3.5 min-h-[48px] text-[14px] text-[#e5e2e3] focus:outline-none focus:border-[#f2ca50] placeholder:text-[#99907c]/60"
            />
          </div>

          {/* Action buttons (thumb-friendly min 46px) */}
          <div className="flex gap-2.5 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 min-h-[48px] rounded-xl bg-[#2a2a2b] hover:bg-[#353436] text-[#e5e2e3] font-medium text-[14px] cursor-pointer active:scale-95 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 min-h-[48px] rounded-xl bg-[#f2ca50] hover:bg-[#ffe088] text-[#3c2f00] font-semibold text-[14px] cursor-pointer active:scale-95 shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              Añadir al Plato
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
