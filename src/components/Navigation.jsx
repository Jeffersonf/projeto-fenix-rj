import React from 'react';
import { Calendar, DollarSign, CheckSquare, Link2, AlertCircle } from 'lucide-react';

export function Navigation({ activeTab, setActiveTab, counts, tripConfig }) {
  const tabs = [
    {
      id: 'booking',
      label: 'Passagens & Hostel',
      icon: AlertCircle,
      badge: (!tripConfig.busBooked || !tripConfig.hostelBooked) ? 'Foco #1' : 'OK',
      isUrgent: !tripConfig.busBooked || !tripConfig.hostelBooked,
      color: 'amber'
    },
    {
      id: 'itinerary',
      label: `Roteiro (${tripConfig.days || 7} Dias)`,
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
      <nav className="hidden sm:flex items-center justify-center gap-1.5 p-1.5 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl max-w-3xl mx-auto shadow-xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/40 font-semibold'
                  : tab.isUrgent
                  ? 'text-amber-300 hover:text-white hover:bg-amber-950/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : tab.isUrgent ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : tab.isUrgent 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                      : 'bg-slate-800 text-slate-400'
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
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0f18]/95 backdrop-blur-xl border-t border-slate-800 px-2 py-1.5 flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-0.5 py-1 px-1.5 rounded-lg text-[10px] transition-colors relative ${
                isActive 
                  ? 'text-emerald-400 font-semibold' 
                  : tab.isUrgent 
                  ? 'text-amber-400' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-4 h-4 ${tab.isUrgent && !isActive ? 'animate-pulse text-amber-400' : ''}`} />
                {tab.isUrgent && !isActive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500" />
                )}
              </div>
              <span className="truncate max-w-[65px]">{tab.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
