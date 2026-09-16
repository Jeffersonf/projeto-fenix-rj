import React from 'react';
import { Compass, Calendar, Sparkles, MapPin, Coffee } from 'lucide-react';

export function EditorialHeader({ activeTab, setActiveTab }) {
  return (
    <header className="border-b border-stone-200/80 bg-white/70 backdrop-blur-md pt-8 pb-7 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-4">
        {/* Top quiet badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60 font-medium">
            <Calendar className="w-3.5 h-3.5 text-amber-700" />
            <span>Janela disponível: 19 a 28 de Setembro • Volta dia 28 em Itapeva</span>
          </div>

          <div className="flex items-center gap-1.5 text-stone-500">
            <MapPin className="w-3.5 h-3.5 text-stone-400" />
            <span>Saindo de Itapeva, SP</span>
          </div>
        </div>

        {/* Editorial Title */}
        <div className="space-y-2 pt-1">
          <h1 className="text-3xl sm:text-5xl font-serif text-stone-900 tracking-tight leading-tight">
            Refúgio & Novas Histórias
          </h1>
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl leading-relaxed font-light">
            Um tempo só seu para desacelerar da rotina de tecnologia, pisar na areia, subir trilhas de visual épico, curtir uma noite leve e ficar em um <strong>quarto privativo com ar-condicionado e paz</strong>.
          </p>
        </div>

        {/* Minimal Navigation Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-stone-100">
          <button
            onClick={() => setActiveTab('compare')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'compare'
                ? 'bg-stone-900 text-white shadow-sm font-semibold'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70 hover:text-stone-900'
            }`}
          >
            🏖️ Floripa vs. Rio (Comparador)
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'simulator'
                ? 'bg-stone-900 text-white shadow-sm font-semibold'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70 hover:text-stone-900'
            }`}
          >
            🎛️ Dias & Orçamento Privativo
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'notes'
                ? 'bg-stone-900 text-white shadow-sm font-semibold'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70 hover:text-stone-900'
            }`}
          >
            📝 Esvaziar a Mente (Anotações)
          </button>
          <button
            onClick={() => setActiveTab('pack')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'pack'
                ? 'bg-stone-900 text-white shadow-sm font-semibold'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70 hover:text-stone-900'
            }`}
          >
            🎒 O que levar (Mala Leve)
          </button>
        </div>
      </div>
    </header>
  );
}
