import { useState, useEffect } from 'react';
import { Dish } from '../types';
import { INITIAL_DISHES } from '../data/initialDishes';

const STORAGE_KEY = 'pierre_atelier_dishes_v1';

export function useDishesStorage() {
  const [dishes, setDishes] = useState<Dish[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading from localStorage:', e);
    }
    return INITIAL_DISHES;
  });

  const [activeDish, setActiveDish] = useState<Dish>(() => {
    return dishes[1] || dishes[0] || INITIAL_DISHES[1];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dishes));
    } catch (e) {
      console.warn('Error saving to localStorage:', e);
    }
  }, [dishes]);

  const saveDish = (updatedDish: Dish) => {
    setDishes((prev) => {
      const existsIndex = prev.findIndex((d) => d.id === updatedDish.id);
      if (existsIndex >= 0) {
        const next = [...prev];
        next[existsIndex] = updatedDish;
        return next;
      }
      return [updatedDish, ...prev];
    });
    setActiveDish(updatedDish);
  };

  const deleteDish = (dishId: string) => {
    setDishes((prev) => prev.filter((d) => d.id !== dishId));
  };

  const duplicateDish = (dish: Dish) => {
    const duplicated: Dish = {
      ...dish,
      id: 'dish-' + Date.now(),
      name: `${dish.name} (Variación Atelier)`,
      timeAgo: 'Hoy',
    };
    setDishes((prev) => [duplicated, ...prev]);
  };

  const selectDish = (dish: Dish) => {
    setActiveDish(dish);
  };

  return {
    dishes,
    activeDish,
    selectDish,
    saveDish,
    deleteDish,
    duplicateDish,
    lastDish: dishes[0] || INITIAL_DISHES[0],
  };
}
