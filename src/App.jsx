import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { ItineraryTimeline } from './components/ItineraryTimeline';
import { BudgetTracker } from './components/BudgetTracker';
import { SurvivalChecklist } from './components/SurvivalChecklist';
import { ResourceHub } from './components/ResourceHub';
import { 
  INITIAL_ITINERARY, 
  INITIAL_BUDGET, 
  INITIAL_CHECKLIST, 
  INITIAL_RESOURCES 
} from './data/initialData';

export function App() {
  // Load state from localStorage or fallback to defaults
  const [itinerary, setItinerary] = useState(() => {
    try {
      const saved = localStorage.getItem('fenix_itinerary_v1');
      return saved ? JSON.parse(saved) : INITIAL_ITINERARY;
    } catch {
      return INITIAL_ITINERARY;
    }
  });

  const [budget, setBudget] = useState(() => {
    try {
      const saved = localStorage.getItem('fenix_budget_v1');
      return saved ? JSON.parse(saved) : INITIAL_BUDGET;
    } catch {
      return INITIAL_BUDGET;
    }
  });

  const [checklist, setChecklist] = useState(() => {
    try {
      const saved = localStorage.getItem('fenix_checklist_v1');
      return saved ? JSON.parse(saved) : INITIAL_CHECKLIST;
    } catch {
      return INITIAL_CHECKLIST;
    }
  });

  const [resources, setResources] = useState(() => {
    try {
      const saved = localStorage.getItem('fenix_resources_v1');
      return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
    } catch {
      return INITIAL_RESOURCES;
    }
  });

  const [activeTab, setActiveTab] = useState('itinerary');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('fenix_itinerary_v1', JSON.stringify(itinerary));
  }, [itinerary]);

  useEffect(() => {
    localStorage.setItem('fenix_budget_v1', JSON.stringify(budget));
  }, [budget]);

  useEffect(() => {
    localStorage.setItem('fenix_checklist_v1', JSON.stringify(checklist));
  }, [checklist]);

  useEffect(() => {
    localStorage.setItem('fenix_resources_v1', JSON.stringify(resources));
  }, [resources]);

  const handleResetData = () => {
    if (window.confirm('Deseja restaurar todos os dados originais do Projeto Fênix? Todas as alterações manuais serão resetadas.')) {
      setItinerary(INITIAL_ITINERARY);
      setBudget(INITIAL_BUDGET);
      setChecklist(INITIAL_CHECKLIST);
      setResources(INITIAL_RESOURCES);
      localStorage.clear();
    }
  };

  // Metrics for Navigation badges
  const totalActivities = itinerary.reduce((acc, day) => acc + day.activities.length, 0);
  const completedActivities = itinerary.reduce(
    (acc, day) => acc + day.activities.filter(a => a.completed).length,
    0
  );
  const totalChecklist = checklist.length;
  const completedChecklist = checklist.filter(c => c.completed).length;
  const totalActual = budget.reduce((acc, item) => acc + (Number(item.actual) || 0), 0);

  return (
    <div className="min-h-screen bg-[#0a0f18] text-slate-100 flex flex-col font-sans">
      {/* Top Header & Dashboard Metrics */}
      <Header 
        itinerary={itinerary} 
        checklist={checklist} 
        budget={budget} 
        onResetData={handleResetData}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 sm:pb-12 space-y-6">
        {/* Navigation Tabs */}
        <Navigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          counts={{
            totalActivities,
            completedActivities,
            totalChecklist,
            completedChecklist,
            totalActual,
            totalResources: resources.length
          }}
        />

        {/* Tab Contents */}
        <div className="mt-4">
          {activeTab === 'itinerary' && (
            <ItineraryTimeline 
              itinerary={itinerary} 
              setItinerary={setItinerary} 
            />
          )}

          {activeTab === 'budget' && (
            <BudgetTracker 
              budget={budget} 
              setBudget={setBudget} 
            />
          )}

          {activeTab === 'checklist' && (
            <SurvivalChecklist 
              checklist={checklist} 
              setChecklist={setChecklist} 
            />
          )}

          {activeTab === 'resources' && (
            <ResourceHub 
              resources={resources} 
              setResources={setResources} 
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#070b12] py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="text-slate-400 font-medium">
            🦅 Projeto Fênix: O Resgate da Soberania no RJ • 22 a 28 de Setembro de 2026
          </p>
          <p>
            Desenvolvido para máxima agilidade e foco durante a viagem. Persistência local ativada.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
