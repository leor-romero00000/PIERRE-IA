import React from 'react';
import { TabType } from '../types';
import { UtensilsCrossed, Calculator, BookOpen, Sparkles, ExternalLink } from 'lucide-react';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  return (
    <nav
      id="app-bottom-nav"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0e0e0f]/95 backdrop-blur-xl border-t border-[#2a2a2b]/80 shadow-[0_-4px_24px_rgba(212,175,55,0.08)] pb-safe"
    >
      <div className="max-w-md mx-auto grid grid-cols-4 items-center h-20 px-2 gap-1">
        {/* Inicio */}
        <button
          id="nav-inicio"
          onClick={() => onTabChange('inicio')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1.5 px-1 rounded-xl transition-all duration-200 relative cursor-pointer ${
            currentTab === 'inicio'
              ? 'text-[#f2ca50]'
              : 'text-[#99907c] hover:text-[#e5e2e3] active:scale-95'
          }`}
        >
          {currentTab === 'inicio' && (
            <span className="absolute -top-1 w-7 h-1 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f2ca50] to-[#d4af37] shadow-[0_0_8px_rgba(242,202,80,0.6)]" />
          )}
          <div className={`p-1 rounded-lg ${currentTab === 'inicio' ? 'bg-[#f2ca50]/10 shadow-[0_0_12px_rgba(242,202,80,0.15)]' : ''}`}>
            <UtensilsCrossed className={`w-5 h-5 transition-transform ${currentTab === 'inicio' ? 'scale-110' : ''}`} />
          </div>
          <span
            className={`text-[10px] uppercase font-semibold tracking-wider mt-0.5 ${
              currentTab === 'inicio' ? 'text-[#f2ca50]' : 'text-[#8E8E93]'
            }`}
          >
            Inicio
          </span>
        </button>

        {/* Costeo */}
        <button
          id="nav-costeo"
          onClick={() => onTabChange('costeo')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1.5 px-1 rounded-xl transition-all duration-200 relative cursor-pointer ${
            currentTab === 'costeo'
              ? 'text-[#f2ca50]'
              : 'text-[#99907c] hover:text-[#e5e2e3] active:scale-95'
          }`}
        >
          {currentTab === 'costeo' && (
            <span className="absolute -top-1 w-7 h-1 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f2ca50] to-[#d4af37] shadow-[0_0_8px_rgba(242,202,80,0.6)]" />
          )}
          <div className={`p-1 rounded-lg ${currentTab === 'costeo' ? 'bg-[#f2ca50]/10 shadow-[0_0_12px_rgba(242,202,80,0.15)]' : ''}`}>
            <Calculator className={`w-5 h-5 transition-transform ${currentTab === 'costeo' ? 'scale-110' : ''}`} />
          </div>
          <span
            className={`text-[10px] uppercase font-semibold tracking-wider mt-0.5 ${
              currentTab === 'costeo' ? 'text-[#f2ca50]' : 'text-[#8E8E93]'
            }`}
          >
            Costeo
          </span>
        </button>

        {/* Platos Guardados */}
        <button
          id="nav-platos"
          onClick={() => onTabChange('platos')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1.5 px-1 rounded-xl transition-all duration-200 relative cursor-pointer ${
            currentTab === 'platos'
              ? 'text-[#f2ca50]'
              : 'text-[#99907c] hover:text-[#e5e2e3] active:scale-95'
          }`}
        >
          {currentTab === 'platos' && (
            <span className="absolute -top-1 w-7 h-1 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f2ca50] to-[#d4af37] shadow-[0_0_8px_rgba(242,202,80,0.6)]" />
          )}
          <div className={`p-1 rounded-lg ${currentTab === 'platos' ? 'bg-[#f2ca50]/10 shadow-[0_0_12px_rgba(242,202,80,0.15)]' : ''}`}>
            <BookOpen className={`w-5 h-5 transition-transform ${currentTab === 'platos' ? 'scale-110' : ''}`} />
          </div>
          <span
            className={`text-[10px] uppercase font-semibold tracking-wider mt-0.5 ${
              currentTab === 'platos' ? 'text-[#f2ca50]' : 'text-[#8E8E93]'
            }`}
          >
            Guardados
          </span>
        </button>

        {/* Enlace Directo a Chef IA en ChatGPT */}
        <a
          id="nav-chef-ia"
          href="https://chatgpt.com/g/g-698bb0b4cbb481918a1b8671b41fde09-pierre-chef-virtual-ia"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center min-h-[48px] py-1.5 px-1 rounded-xl transition-all duration-200 relative text-[#99907c] hover:text-[#f2ca50] active:scale-95 cursor-pointer group"
          title="Consultar al Chef Pierre en ChatGPT"
        >
          <div className="p-1 rounded-lg relative">
            <Sparkles className="w-5 h-5 text-[#f2ca50] group-hover:scale-110 transition-transform" />
            <ExternalLink className="w-2.5 h-2.5 text-[#f2ca50] absolute top-0.5 right-0" />
          </div>
          <span className="text-[10px] uppercase font-semibold tracking-wider mt-0.5 text-[#8E8E93] group-hover:text-[#f2ca50] flex items-center gap-0.5">
            Chef IA ↗
          </span>
        </a>
      </div>
    </nav>
  );
};
