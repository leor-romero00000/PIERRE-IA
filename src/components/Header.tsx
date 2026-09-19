import React from 'react';
import { TabType } from '../types';
import { LOGO_EMBLEM_URL } from '../data/initialDishes';
import { Sparkles, ExternalLink } from 'lucide-react';

interface HeaderProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onTabChange }) => {
  const getTitle = () => {
    switch (currentTab) {
      case 'costeo':
        return 'Costeo';
      case 'platos':
        return 'Platos Guardados';
      case 'inicio':
      default:
        return 'Inicio';
    }
  };

  return (
    <header
      id="app-header"
      className="fixed top-0 w-full z-50 bg-[#131314]/85 backdrop-blur-xl border-b border-[#2a2a2b]/60 transition-all duration-300"
    >
      <div className="h-16 max-w-md mx-auto px-4 flex items-center justify-between">
        {/* Brand Identity */}
        <button
          id="header-brand-btn"
          onClick={() => onTabChange('inicio')}
          className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
        >
          <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-[#1c1b1c] border border-[#d4af37]/30 shadow-[0_0_12px_rgba(242,202,80,0.15)] group-hover:border-[#f2ca50] transition-colors">
            <img
              src={LOGO_EMBLEM_URL}
              alt="PIERRE Atelier Emblema"
              className="h-6 w-6 object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#f2ca50] leading-none">
              PIERRE Atelier
            </span>
            <span className="font-serif text-[17px] font-medium text-[#e5e2e3] leading-tight">
              {getTitle()}
            </span>
          </div>
        </button>

        {/* Direct Link to Chef IA in ChatGPT */}
        <a
          id="header-chef-ia-link"
          href="https://chatgpt.com/g/g-698bb0b4cbb481918a1b8671b41fde09-pierre-chef-virtual-ia"
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[40px] px-3 py-1.5 rounded-xl bg-[#201f20] hover:bg-[#2a2a2b] border border-[#353436] text-[#f2ca50] flex items-center gap-1.5 text-[12px] font-medium transition-all active:scale-95 cursor-pointer shadow-sm"
          title="Consultar al Chef IA en ChatGPT"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#f2ca50]" />
          <span>Chef IA</span>
          <ExternalLink className="w-3 h-3 text-[#99907c]" />
        </a>
      </div>
    </header>
  );
};
