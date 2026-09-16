import React from 'react';
import { Calendar, DollarSign, CheckSquare, Link2 } from 'lucide-react';

export function Navigation({ activeTab, setActiveTab, counts }) {
  const tabs = [
    {
      id: 'itinerary',
      label: 'Roteiro (7 Dias)',
      icon: Calendar,
      badge: counts.completedActivities > 0 ? `${counts.completedActivities}/${counts.totalActivities}` : null,
      color: 'emerald'
    },
    {
      id: 'budget',
      label: 'Orçamento',
      icon: DollarSign,
      badge: `R$ ${counts.totalActual}`,
      color: 'amber'
    },
    {
      id: 'checklist',
      label: 'Checklist Sobrevivência',
      icon: CheckSquare,
      badge: counts.completedChecklist > 0 ? `${counts.completedChecklist}/${counts.totalChecklist}` : null,
      color: 'sky'
    },
    {
      id: 'resources',
      label: 'Links & Reservas',
      icon: Link2,
      badge: `${counts.totalResources}`,
      color: 'purple'
    }
  ];

  return (
    <>
      {/* Desktop & Tablet Navigation */}
      <nav className="hidden sm:flex items-center justify-center gap-2 p-1.5 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl max-w-2xl mx-auto shadow-xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Mobile Bottom Fixed Bar */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0f18]/95 backdrop-blur-xl border-t border-slate-800 px-3 py-2 flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[11px] transition-colors relative ${
                isActive ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {tab.badge && (
                  <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                )}
              </div>
              <span>{tab.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
