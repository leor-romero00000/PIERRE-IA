import { useState, useEffect } from 'react';
import { Dish, Ingredient } from '../types';
import { INITIAL_DISHES } from '../data/initialDishes';
import {
  calculateIngredientSubtotal,
  calculateCostPerServing,
  calculateSuggestedPrice,
  calculateNetProfit,
} from '../utils/pricing';

export function useDishCostCalculator(initialDish?: Dish) {
  const baseDish = initialDish || INITIAL_DISHES[0];

  const [dishName, setDishName] = useState(baseDish.name);
  const [servings, setServings] = useState(baseDish.servings || 1);
  const [menuType, setMenuType] = useState<Dish['menuType']>(baseDish.menuType || 'Degustación');
  const [ingredients, setIngredients] = useState<Ingredient[]>(baseDish.ingredients || []);
  const [desiredMargin, setDesiredMargin] = useState<number>(baseDish.marginDesired || 70);

  // Sync state if baseDish changes (e.g. user selects a different dish to inspect)
  useEffect(() => {
    setDishName(baseDish.name);
    setServings(baseDish.servings || 1);
    setMenuType(baseDish.menuType || 'Degustación');
    setIngredients(baseDish.ingredients || []);
    setDesiredMargin(baseDish.marginDesired || 70);
  }, [baseDish.id]);

  // Derived financial metrics
  const costPerServing = calculateCostPerServing(ingredients, servings);
  const suggestedPVP = calculateSuggestedPrice(costPerServing, desiredMargin);
  const netProfit = calculateNetProfit(suggestedPVP, costPerServing);
  const costPercentage = 100 - desiredMargin;

  const removeIngredient = (id: string) => {
    setIngredients((prev) => prev.filter((item) => item.id !== id));
  };

  const addIngredient = (
    name: string,
    supplier: string,
    amount: number,
    unit: Ingredient['unit'],
    unitPrice: number
  ) => {
    const subtotal = calculateIngredientSubtotal(amount, unit, unitPrice);
    const newIng: Ingredient = {
      id: 'ing-' + Date.now(),
      name: name.trim(),
      supplier: supplier.trim() || 'Despensa de Temporada',
      amount,
      unit,
      unitPrice,
      subtotal,
      iconType: 'plant',
    };
    setIngredients((prev) => [...prev, newIng]);
  };

  const incrementServings = () => setServings((prev) => prev + 1);
  const decrementServings = () => setServings((prev) => Math.max(1, prev - 1));

  const getDishSnapshot = (): Dish => {
    return {
      ...baseDish,
      name: dishName,
      servings,
      menuType,
      ingredients,
      costBase: costPerServing,
      marginDesired: desiredMargin,
      marginReal: desiredMargin,
      suggestedPrice: suggestedPVP,
      netProfit,
      timeAgo: 'Hoy',
    };
  };

  return {
    dishName,
    setDishName,
    servings,
    incrementServings,
    decrementServings,
    menuType,
    setMenuType,
    ingredients,
    removeIngredient,
    addIngredient,
    desiredMargin,
    setDesiredMargin,
    costPerServing,
    suggestedPVP,
    netProfit,
    costPercentage,
    getDishSnapshot,
  };
}
