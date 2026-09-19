import { Dish, Ingredient } from '../types';

/**
 * Computes ingredient subtotal according to unit and unitPrice.
 * Unit prices are specified per kg for g, per l for ml, or per unit.
 */
export function calculateIngredientSubtotal(
  amount: number,
  unit: Ingredient['unit'],
  unitPrice: number
): number {
  let subtotal = 0;
  if (unit === 'g' || unit === 'ml') {
    subtotal = (amount / 1000) * unitPrice;
  } else {
    subtotal = amount * unitPrice;
  }
  return Math.max(0.01, parseFloat(subtotal.toFixed(2)));
}

/**
 * Computes the raw ingredients cost per serving.
 */
export function calculateCostPerServing(ingredients: Ingredient[], servings: number): number {
  const totalRawCost = ingredients.reduce((acc, ing) => acc + (ing.subtotal || 0), 0);
  const cost = servings > 0 ? totalRawCost / servings : totalRawCost;
  return parseFloat(cost.toFixed(2));
}

/**
 * Computes suggested sale price given cost and target gross margin percentage.
 * Selling Price = Cost / (1 - Margin/100)
 */
export function calculateSuggestedPrice(costPerServing: number, marginPercent: number): number {
  const marginDecimal = marginPercent / 100;
  if (marginDecimal >= 1) return costPerServing;
  const pvp = costPerServing / (1 - marginDecimal);
  return parseFloat(pvp.toFixed(2));
}

/**
 * Computes net estimated profit per serving.
 */
export function calculateNetProfit(suggestedPrice: number, costPerServing: number): number {
  return parseFloat((suggestedPrice - costPerServing).toFixed(2));
}

/**
 * Formats a numeric currency value.
 */
export function formatCurrency(amount: number, currencySymbol = '$'): string {
  return `${currencySymbol}${amount.toFixed(2)}`;
}

/**
 * Calculates the average gross margin across an array of dishes.
 */
export function calculateAverageMargin(dishes: Dish[]): string {
  if (!dishes.length) return '70.0';
  const total = dishes.reduce((acc, d) => acc + (d.marginReal || 70), 0);
  return (total / dishes.length).toFixed(1);
}

/**
 * Calculates the average cost base across an array of dishes.
 */
export function calculateAverageCost(dishes: Dish[]): string {
  if (!dishes.length) return '0.00';
  const total = dishes.reduce((acc, d) => acc + (d.costBase || 0), 0);
  return (total / dishes.length).toFixed(2);
}
