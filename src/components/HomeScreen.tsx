import React from 'react';
import { TabType, Dish } from '../types';
import { CHEF_AVATAR_URL } from '../data/initialDishes';
import { formatCurrency } from '../utils/pricing';
import { BentoMetricsRow } from './common/BentoMetricsRow';
import {
  Sparkles,
  Calculator,
  ExternalLink,
  CookingPot,
  Lightbulb,
  BookOpen,
} from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (tab: TabType) => void;
  lastDish?: Dish;
  onSelectDishForCosting: (dish: Dish) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  lastDish,
  onSelectDishForCosting,
}) => {
  const CHATGPT_PIERRE_URL =
    'https://chatgpt.com/g/g-698bb0b4cbb481918a1b8671b41fde09-pierre-chef-virtual-ia';

  return (
    <div id="home-screen" className="flex flex-col w-full max-w-md mx-auto px-4 pb-28 gap-6 pt-2">
      {/* Hero Section */}
      <section id="hero-section" className="flex flex-col items-center text-center pt-2">
        {/* Chef Avatar with subtle halo */}
        <div className="relative mb-3">
          <div className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-tr from-[#f2ca50] via-[#ffe088] to-[#d4af37] shadow-[0_0_24px_rgba(242,202,80,0.22)]">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#0e0e0f]">
              <img
                src={CHEF_AVATAR_URL}
                alt="Chef Virtual PIERRE"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          {/* Status Badge */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#353436]/95 backdrop-blur-md shadow-md border border-[#4d4635]/50 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-[#f2ca50] animate-pulse" />
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#f2ca50]">
              Asistente en línea
            </span>
          </div>
        </div>

        {/* Hierarchy & Personal Greeting */}
        <div className="flex flex-col items-center gap-1 mt-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f2ca50]">
            Atelier Digital
          </span>
          <h1 className="font-serif text-[26px] font-semibold text-[#e5e2e3] tracking-tight">
            PIERRE Atelier
          </h1>
          <p className="text-[14px] text-[#d0c5af] max-w-[300px] leading-relaxed">
            Asistente de Inteligencia Culinaria y Gestión de Costes
          </p>

          <a
            id="greeting-chat-trigger"
            href={CHATGPT_PIERRE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#201f20] hover:bg-[#2a2a2b] border border-[#353436] active:scale-95 transition-all text-left group cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#f2ca50] shrink-0" />
            <span className="text-[13px] font-medium text-[#e5e2e3]">
              Bienvenido, Chef. ¿Qué crearemos hoy?
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-[#99907c] group-hover:text-[#f2ca50]" />
          </a>
        </div>
      </section>

      {/* Two Main Tools Grid */}
      <section id="tools-section" className="flex flex-col gap-4 w-full">
        {/* Card 1: Chef IA */}
        <div
          id="card-ia-gastronomica"
          className="w-full rounded-2xl bg-[#1c1b1c] p-5 flex flex-col justify-between relative overflow-hidden shadow-lg border border-[#2a2a2b]/80 hover:border-[#f2ca50]/40 transition-colors"
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#f2ca50]/5 rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-1 rounded-lg bg-[#353436] text-[#f2ca50] text-[10px] font-bold uppercase tracking-wider">
                IA Gastronómica
              </span>
              <div className="w-10 h-10 rounded-full bg-[#201f20] border border-[#353436] flex items-center justify-center text-[#f2ca50] shadow-inner">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
            <h2 className="font-serif text-[20px] font-semibold text-[#e5e2e3] mb-1">
              Chef IA
            </h2>
            <p className="text-[14px] text-[#d0c5af] mb-4">
              Menús, propuestas y dudas de cocina al instante
            </p>
          </div>
          <a
            id="btn-open-chat"
            href={CHATGPT_PIERRE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[48px] rounded-xl bg-[#f2ca50] hover:bg-[#ffe088] text-[#3c2f00] font-medium text-[15px] flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(242,202,80,0.25)] active:scale-[0.98] transition-transform font-semibold cursor-pointer"
          >
            <span>Consultar al Chef IA</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Card 2: Costeo */}
        <div
          id="card-calculadora-costeo"
          className="w-full rounded-2xl bg-[#1c1b1c] p-5 flex flex-col justify-between relative overflow-hidden shadow-lg border border-[#2a2a2b]/80 hover:border-[#f2ca50]/40 transition-colors"
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#f2ca50]/5 rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-1 rounded-lg bg-[#353436] text-[#f2ca50] text-[10px] font-bold uppercase tracking-wider">
                Escandallo & Rentabilidad
              </span>
              <div className="w-10 h-10 rounded-full bg-[#201f20] border border-[#353436] flex items-center justify-center text-[#f2ca50] shadow-inner">
                <Calculator className="w-5 h-5" />
              </div>
            </div>
            <h2 className="font-serif text-[20px] font-semibold text-[#e5e2e3] mb-1">
              Costeo
            </h2>
            <p className="text-[14px] text-[#d0c5af] mb-4">
              Calcula el costo y margen de beneficio por plato
            </p>
          </div>
          <button
            id="btn-open-calculator"
            onClick={() => onNavigate('costeo')}
            className="w-full min-h-[48px] rounded-xl bg-[#f2ca50] hover:bg-[#ffe088] text-[#3c2f00] font-medium text-[15px] flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(242,202,80,0.25)] active:scale-[0.98] transition-transform font-semibold cursor-pointer"
            type="button"
          >
            <span>Iniciar Costeo</span>
            <Calculator className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Complementary Section: Last Analyzed Dish */}
      <section id="recent-activity-section" className="flex flex-col gap-3 w-full">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#99907c]">
            Último Plato en Costeo
          </span>
          <button
            id="btn-view-all-saved-dishes"
            onClick={() => onNavigate('platos')}
            className="min-h-[40px] px-2 text-[12px] font-medium text-[#f2ca50] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Ver Platos Guardados</span>
          </button>
        </div>

        {/* Dish Card */}
        {lastDish && (
          <div
            id="last-dish-card"
            onClick={() => onSelectDishForCosting(lastDish)}
            className="w-full rounded-2xl bg-[#1c1b1c] p-4 flex flex-col gap-3 shadow-md border border-[#2a2a2b]/70 hover:border-[#f2ca50]/50 transition-all cursor-pointer group active:scale-[0.99]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-[#201f20] border border-[#353436] flex items-center justify-center text-[#f2ca50] shrink-0 group-hover:scale-105 transition-transform">
                  <CookingPot className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-[#99907c]">
                    Toca para abrir en Escandallo
                  </span>
                  <span className="font-serif text-[17px] font-medium text-[#e5e2e3] truncate">
                    {lastDish.name}
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#f2ca50]/15 text-[#f2ca50] text-[11px] font-semibold shrink-0">
                {lastDish.tag || 'Rentable'}
              </span>
            </div>

            {/* Quick Metrics Bar using reusable BentoMetricsRow */}
            <BentoMetricsRow
              metrics={[
                { label: 'Coste Materia', value: formatCurrency(lastDish.costBase) },
                { label: 'PVP Carta', value: formatCurrency(lastDish.suggestedPrice) },
                { label: 'Margen Bruto', value: `${lastDish.marginReal}%`, highlightColor: 'gold' },
              ]}
              containerClassName="grid grid-cols-3 gap-2 pt-1 mt-0.5"
            />
          </div>
        )}

        {/* Quick Studio Tip */}
        <div
          id="quote-card"
          className="w-full rounded-xl bg-[#0e0e0f] p-4 flex items-start gap-3 border border-[#2a2a2b]/50"
        >
          <div className="w-8 h-8 rounded-full bg-[#f2ca50]/10 flex items-center justify-center text-[#f2ca50] shrink-0 mt-0.5">
            <Lightbulb className="w-4 h-4" />
          </div>
          <p className="text-[13px] text-[#d0c5af] italic leading-relaxed">
            &ldquo;El coste exacto de cada gramo define la sostenibilidad del menú degustación.&rdquo;
          </p>
        </div>
      </section>
    </div>
  );
};
