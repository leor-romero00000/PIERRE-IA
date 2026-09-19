/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType, Dish } from './types';
import { useDishesStorage } from './hooks/useDishesStorage';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { CostCalculatorScreen } from './components/CostCalculatorScreen';
import { SavedDishesScreen } from './components/SavedDishesScreen';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('inicio');

  const {
    dishes,
    activeDish,
    selectDish,
    saveDish,
    deleteDish,
    lastDish,
  } = useDishesStorage();

  const handleSelectDishForCosting = (dish: Dish) => {
    selectDish(dish);
    setCurrentTab('costeo');
  };

  const handleNewDish = () => {
    const newEmptyDish: Dish = {
      id: 'dish-' + Date.now(),
      name: 'Nuevo Plato',
      category: 'principales',
      imageUrl: '',
      tag: 'Nuevo',
      tagColor: 'gold',
      timeAgo: 'Ahora',
      servings: 1,
      menuType: 'Carta',
      costBase: 0,
      marginDesired: 70,
      marginReal: 70,
      suggestedPrice: 0,
      netProfit: 0,
      ingredients: [],
    };
    selectDish(newEmptyDish);
    setCurrentTab('costeo');
  };

  return (
    <div className="min-h-screen w-full bg-[#131314] text-[#e5e2e3] flex flex-col justify-between selection:bg-[#f2ca50] selection:text-[#3c2f00]">
      {/* Top Header */}
      <Header currentTab={currentTab} onTabChange={setCurrentTab} />

      {/* Main Screen Container */}
      <main className="flex-1 w-full pt-16">
        <AnimatePresence mode="wait">
          {currentTab === 'inicio' && (
            <motion.div
              key="inicio"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <HomeScreen
                onNavigate={setCurrentTab}
                lastDish={lastDish}
                onSelectDishForCosting={handleSelectDishForCosting}
              />
            </motion.div>
          )}

          {currentTab === 'costeo' && (
            <motion.div
              key="costeo"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <CostCalculatorScreen
                currentDish={activeDish}
                onSaveDish={saveDish}
                onNavigate={setCurrentTab}
              />
            </motion.div>
          )}

          {currentTab === 'platos' && (
            <motion.div
              key="platos"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <SavedDishesScreen
                dishes={dishes}
                onSelectDishForCosting={handleSelectDishForCosting}
                onDeleteDish={deleteDish}
                onNavigate={setCurrentTab}
                onNewDish={handleNewDish}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Sticky Navigation */}
      <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
    </div>
  );
}
