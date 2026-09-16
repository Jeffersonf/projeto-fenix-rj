import React, { useState, useEffect } from 'react';
import { EditorialHeader } from './components/EditorialHeader';
import { DestinationComparator } from './components/DestinationComparator';
import { TripDurationBudget } from './components/TripDurationBudget';
import { BrainDumpNotes } from './components/BrainDumpNotes';
import { MinimalChecklist } from './components/MinimalChecklist';

const DEFAULT_TRIP_CONFIG = {
  days: 6,
  destination: 'undecided' // 'floripa', 'rio', 'undecided'
};

export function App() {
  const [activeTab, setActiveTab] = useState('compare');
  const [tripConfig, setTripConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('fenix_trip_editorial_config');
      return saved ? JSON.parse(saved) : DEFAULT_TRIP_CONFIG;
    } catch {
      return DEFAULT_TRIP_CONFIG;
    }
  });

  useEffect(() => {
    localStorage.setItem('fenix_trip_editorial_config', JSON.stringify(tripConfig));
  }, [tripConfig]);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 flex flex-col font-sans selection:bg-amber-100 selection:text-stone-900">
      {/* Calm & Human Editorial Header */}
      <EditorialHeader 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        {activeTab === 'compare' && (
          <DestinationComparator 
            onSelectDestination={(dest) => {
              setTripConfig(prev => ({ ...prev, destination: dest }));
              setActiveTab('simulator');
            }} 
          />
        )}

        {activeTab === 'simulator' && (
          <TripDurationBudget 
            tripConfig={tripConfig} 
            setTripConfig={setTripConfig} 
          />
        )}

        {activeTab === 'notes' && (
          <BrainDumpNotes />
        )}

        {activeTab === 'pack' && (
          <MinimalChecklist />
        )}
      </main>

      {/* Subtle, Calm Footer */}
      <footer className="border-t border-stone-200/60 bg-white py-8 text-center text-xs text-stone-400 font-light">
        <div className="max-w-5xl mx-auto px-4 space-y-1">
          <p className="text-stone-500 font-medium">
            Caderno de Clareza & Escolha de Viagem • Setembro de 2026
          </p>
          <p>
            Sem pressão, sem algoritmos, no seu ritmo. Quarto privativo, ar puro e novos caminhos.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
