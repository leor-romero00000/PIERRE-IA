export interface Ingredient {
  id: string;
  name: string;
  supplier: string;
  amount: number;
  unit: 'g' | 'kg' | 'ml' | 'l' | 'ud';
  unitPrice: number; // price per unit standard (e.g. per kg, per ud)
  subtotal: number;
  iconType?: 'fish' | 'plant' | 'butter' | 'sprout' | 'meat' | 'spice' | 'other';
}

export interface Dish {
  id: string;
  name: string;
  category: 'entrantes' | 'principales' | 'postres';
  imageUrl: string;
  tag: string;
  tagColor: 'emerald' | 'gold' | 'secondary' | 'purple';
  timeAgo: string;
  servings: number;
  menuType: 'Degustación' | 'Carta' | 'Ejecutivo' | 'Temporada';
  costBase: number;
  marginDesired: number;
  marginReal: number;
  suggestedPrice: number;
  netProfit: number;
  ingredients: Ingredient[];
  notes?: string;
  certified?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'pierre';
  text: string;
  timestamp: string;
  suggestions?: string[];
  dishContext?: string;
}

export type TabType = 'inicio' | 'costeo' | 'platos';
