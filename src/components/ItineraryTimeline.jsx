import React, { useState } from 'react';
import { 
  CheckCircle2, Circle, MapPin, AlertTriangle, Sparkles, 
  ChevronDown, ChevronUp, Sun, Moon, Sunrise, Clock, Flame, Check,
  Sliders, Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function ItineraryTimeline({ itinerary, setItinerary, tripConfig, setTripConfig }) {
  const [selectedDayFilter, setSelectedDayFilter] = useState('all');
  const [onlyPlannedDays, setOnlyPlannedDays] = useState(false);
  const [expandedDays, setExpandedDays] = useState({
    'day-1': true,
    'day-2': true,
    'day-3': true,
    'day-4': true,
    'day-5': true,
    'day-6': true,
    'day-7': true,
  });

  const activeDaysLimit = tripConfig?.days || 7;

  const toggleDayExpansion = (dayId) => {
    setExpandedDays(prev => ({ ...prev, [dayId]: !prev[dayId] }));
  };

  const toggleActivity = (dayId, activityId) => {
    setItinerary(prevItinerary => {
      return prevItinerary.map(day => {
        if (day.id !== dayId) return day;
        const updatedActivities = day.activities.map(act => {
          if (act.id !== activityId) return act;
          const nextState = !act.completed;
          if (nextState) {
            confetti({
              particleCount: 25,
              spread: 60,
              origin: { y: 0.8 },
              colors: ['#10b981', '#38bdf8', '#fb923c']
            });
          }
          return { ...act, completed: nextState };
        });

        // Check if all activities for this day were completed
        const allDone = updatedActivities.every(a => a.completed);
        if (allDone && !day.activities.every(a => a.completed)) {
          confetti({
            particleCount: 80,
            spread: 90,
            origin: { y: 0.6 }
          });
        }

        return { ...day, activities: updatedActivities };
      });
    });
  };

  const completeAllInDay = (dayId) => {
    setItinerary(prevItinerary => {
      return prevItinerary.map(day => {
        if (day.id !== dayId) return day;
        const allCompleted = day.activities.every(a => a.completed);
        const newState = !allCompleted;
        if (newState) {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 }
          });
        }
        return {
          ...day,
          activities: day.activities.map(a => ({ ...a, completed: newState }))
        };
      });
    });
  };

  const filteredItinerary = itinerary.filter(day => {
    if (onlyPlannedDays && day.dayNumber > activeDaysLimit) return false;
    if (selectedDayFilter === 'all') return true;
    return day.dayNumber === Number(selectedDayFilter);
  });

  const getPeriodIcon = (period) => {
    const p = period.toLowerCase();
    if (p.includes('amanhecer') || p.includes('nascer')) return <Sunrise className="w-3.5 h-3.5 text-amber-400" />;
    if (p.includes('manhã')) return <Sun className="w-3.5 h-3.5 text-yellow-400" />;
    if (p.includes('noite')) return <Moon className="w-3.5 h-3.5 text-indigo-400" />;
    return <Clock className="w-3.5 h-3.5 text-sky-400" />;
  };

  const getBadgeClass = (badgeColor) => {
    switch (badgeColor) {
      case 'sunset':
        return 'bg-orange-500/10 border-orange-500/30 text-orange-400';
      case 'ocean':
        return 'bg-sky-500/10 border-sky-500/30 text-sky-400';
      case 'forest':
      default:
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls & Day Quick-selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white">Roteiro Carioca</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono font-semibold">
              Plano de {activeDaysLimit} Dias
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Duração flexível: você pode testar quantos dias cabem no seu orçamento e agenda.
          </p>
        </div>

        {/* Filters and View toggles */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setOnlyPlannedDays(!onlyPlannedDays)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              onlyPlannedDays 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {onlyPlannedDays ? `Exibindo só ${activeDaysLimit} dias` : 'Exibir todos os 7 dias'}
          </button>

          {/* Day selector pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedDayFilter('all')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedDayFilter === 'all'
                  ? 'bg-emerald-500 text-white font-semibold shadow'
                  : 'bg-slate-800/70 text-slate-400 hover:text-slate-200'
              }`}
            >
              Todos
            </button>
            {itinerary.map(day => {
              const isDone = day.activities.every(a => a.completed);
              const isBeyond = day.dayNumber > activeDaysLimit;
              return (
                <button
                  key={day.id}
                  onClick={() => setSelectedDayFilter(day.dayNumber.toString())}
                  className={`px-2 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1 ${
                    selectedDayFilter === day.dayNumber.toString()
                      ? 'bg-emerald-500 text-white font-semibold shadow'
                      : isDone
                      ? 'bg-emerald-950/60 border border-emerald-500/30 text-emerald-400'
                      : isBeyond
                      ? 'bg-slate-900 text-slate-500 opacity-60'
                      : 'bg-slate-800/70 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>D{day.dayNumber}</span>
                  {isDone && <Check className="w-3 h-3 text-emerald-400" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Days List */}
      <div className="space-y-6">
        {filteredItinerary.map((day) => {
          const completedCount = day.activities.filter(a => a.completed).length;
          const totalCount = day.activities.length;
          const isAllDone = completedCount === totalCount;
          const isExpanded = expandedDays[day.id] !== false;
          const isBeyondPlan = day.dayNumber > activeDaysLimit;

          return (
            <div
              key={day.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isBeyondPlan
                  ? 'bg-slate-900/30 border-slate-800/60 opacity-80'
                  : isAllDone
                  ? 'bg-gradient-to-b from-emerald-950/20 to-slate-900/60 border-emerald-500/40 shadow-lg shadow-emerald-950/20'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700/80 shadow-md'
              }`}
            >
              {/* Day Header Accordion Trigger */}
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/60">
                <div 
                  onClick={() => toggleDayExpansion(day.id)}
                  className="flex items-start sm:items-center gap-3.5 cursor-pointer flex-1 select-none"
                >
                  {/* Day Number Badge */}
                  <div
                    className={`w-11 h-11 rounded-2xl flex flex-col items-center justify-center font-bold shrink-0 transition-transform ${
                      isAllDone
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                        : isBeyondPlan
                        ? 'bg-slate-800/60 text-slate-400 border border-slate-700/50'
                        : 'bg-gradient-to-br from-slate-800 to-slate-900 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <span className="text-[10px] leading-none uppercase text-slate-300">Dia</span>
                    <span className="text-lg leading-tight font-extrabold">{day.dayNumber}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                        <span>{day.dayOfWeek} ({day.date})</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-200 font-semibold">{day.title}</span>
                      </h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${getBadgeClass(day.badgeColor)}`}>
                        {day.badge}
                      </span>
                      {isBeyondPlan && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-amber-400/90 border border-amber-500/20 font-medium">
                          Opcional / Dia Extra
                        </span>
                      )}
                    </div>
                    {day.quote && (
                      <p className="text-xs text-slate-400 italic">
                        "{day.quote}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Day Actions & Counter */}
                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/40">
                  <div className="flex items-center gap-2 text-xs">
                    <span className={`font-mono font-medium ${isAllDone ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {completedCount}/{totalCount} feitos
                    </span>
                    <button
                      onClick={() => completeAllInDay(day.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                        isAllDone
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {isAllDone ? 'Desmarcar Dia' : 'Concluir Dia'}
                    </button>
                  </div>

                  <button
                    onClick={() => toggleDayExpansion(day.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Day Activities (Body) */}
              {isExpanded && (
                <div className="p-4 sm:p-5 space-y-3.5 bg-[#0b121c]/40">
                  {day.activities.map((activity) => {
                    return (
                      <div
                        key={activity.id}
                        onClick={() => toggleActivity(day.id, activity.id)}
                        className={`group relative p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer select-none ${
                          activity.completed
                            ? 'bg-emerald-950/20 border-emerald-500/30 opacity-75'
                            : activity.highlight
                            ? 'bg-slate-900/90 border-amber-500/30 hover:border-amber-500/60 shadow-md'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          {/* Checkbox Icon */}
                          <div className="pt-0.5 shrink-0">
                            {activity.completed ? (
                              <div className="w-5 h-5 rounded-md bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/40">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded-md border-2 border-slate-600 group-hover:border-emerald-400 transition-colors" />
                            )}
                          </div>

                          {/* Activity Details */}
                          <div className="flex-1 space-y-1.5">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md">
                                  {getPeriodIcon(activity.period)}
                                  <span>{activity.period}</span>
                                </span>

                                {activity.highlight && (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-md">
                                    <Sparkles className="w-3 h-3" />
                                    <span>Marco Épico</span>
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-1 text-[11px] text-slate-400 group-hover:text-slate-300 transition-colors">
                                <MapPin className="w-3 h-3 text-sky-400 shrink-0" />
                                <span>{activity.location}</span>
                              </div>
                            </div>

                            <h4
                              className={`text-sm sm:text-base font-semibold transition-colors ${
                                activity.completed
                                  ? 'line-through text-slate-400'
                                  : 'text-slate-100 group-hover:text-white'
                              }`}
                            >
                              {activity.title}
                            </h4>

                            <p
                              className={`text-xs sm:text-sm leading-relaxed ${
                                activity.completed ? 'text-slate-500' : 'text-slate-300'
                              }`}
                            >
                              {activity.description}
                            </p>

                            {activity.warning && (
                              <div className="mt-2 flex items-center gap-2 p-2 rounded-lg bg-amber-950/40 border border-amber-500/40 text-amber-300 text-xs font-medium">
                                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                                <span>{activity.warning}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
