import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { BookingPriorityHub } from './components/BookingPriorityHub';
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

const DEFAULT_TRIP_CONFIG = {
  days: 7,
  hostelDailyRate: 80,
  busBooked: false,
  hostelBooked: false,
  startDate: '2026-09-22',
  isDateFlexible: true
};

export function App() {
  // Load state from localStorage or fallback to defaults
  const [tripConfig, setTripConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('fenix_trip_config_v1');
      return saved ? { ...DEFAULT_TRIP_CONFIG, ...JSON.parse(saved) } : DEFAULT_TRIP_CONFIG;
    } catch {
      return DEFAULT_TRIP_CONFIG;
    }
  });

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

  // Default to 'booking' if neither bus nor hostel is booked, giving user immediate focus
  const [activeTab, setActiveTab] = useState(() => {
    return (!tripConfig.busBooked || !tripConfig.hostelBooked) ? 'booking' : 'itinerary';
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('fenix_trip_config_v1', JSON.stringify(tripConfig));
  }, [tripConfig]);

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
      setTripConfig(DEFAULT_TRIP_CONFIG);
      setItinerary(INITIAL_ITINERARY);
      setBudget(INITIAL_BUDGET);
      setChecklist(INITIAL_CHECKLIST);
      setResources(INITIAL_RESOURCES);
      localStorage.clear();
      setActiveTab('booking');
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
        tripConfig={tripConfig}
        onResetData={handleResetData}
        setActiveTab={setActiveTab}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 sm:pb-12 space-y-6">
        {/* Navigation Tabs */}
        <Navigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tripConfig={tripConfig}
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
          {activeTab === 'booking' && (
            <BookingPriorityHub
              tripConfig={tripConfig}
              setTripConfig={setTripConfig}
              budget={budget}
              setBudget={setBudget}
            />
          )}

          {activeTab === 'itinerary' && (
            <ItineraryTimeline 
              itinerary={itinerary} 
              setItinerary={setItinerary} 
              tripConfig={tripConfig}
              setTripConfig={setTripConfig}
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
            🦅 Projeto Fênix: O Resgate da Soberania no RJ • {tripConfig.days || 7} Dias em Planejamento
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
