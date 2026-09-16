import React from 'react';
import { Calendar, Compass, ShieldCheck, DollarSign, CheckCircle2, Flame, MapPin, AlertCircle, Bed, Bus } from 'lucide-react';

export function Header({ itinerary, checklist, budget, onResetData, tripConfig, setActiveTab }) {
  // Target date (tentative or planned)
  const targetDate = new Date(`${tripConfig.startDate || '2026-09-22'}T08:00:00`);
  const today = new Date();
  const diffTime = targetDate - today;
  const diffDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  // Calculate statistics
  const totalActivities = itinerary.reduce((acc, day) => acc + day.activities.length, 0);
  const completedActivities = itinerary.reduce(
    (acc, day) => acc + day.activities.filter(a => a.completed).length,
    0
  );
  const itineraryPct = Math.round((completedActivities / totalActivities) * 100) || 0;

  const totalChecklist = checklist.length;
  const completedChecklist = checklist.filter(c => c.completed).length;
  const checklistPct = Math.round((completedChecklist / totalChecklist) * 100) || 0;

  const totalEstimated = budget.reduce((acc, item) => acc + item.estimated, 0);
  const totalActual = budget.reduce((acc, item) => acc + (Number(item.actual) || 0), 0);

  const nights = Math.max(1, (tripConfig.days || 7) - 1);

  return (
    <header className="relative overflow-hidden bg-gradient-to-b from-[#0f1d2e] via-[#0d1825] to-[#0a0f18] border-b border-slate-800/80 pt-8 pb-10 px-4 sm:px-6 lg:px-8">
      {/* Background ambient lights */}
      <div className="absolute -top-24 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-24 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Badges & Subtitle */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
              <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
              <span>Duração Flexível: {tripConfig.days || 7} Dias / {nights} Noites (A Definir)</span>
            </div>

            {(!tripConfig.busBooked || !tripConfig.hostelBooked) && (
              <button
                onClick={() => setActiveTab('booking')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold hover:bg-amber-500/30 transition-colors animate-pulse"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Pendente: Passagens & Hospedagem</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>Itapeva, SP ➡️ Rio de Janeiro, RJ</span>
            <button
              onClick={onResetData}
              title="Restaurar dados originais"
              className="ml-2 px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs border border-slate-700/50 transition-colors"
            >
              Resetar
            </button>
          </div>
        </div>

        {/* Title & Core Manifesto */}
        <div className="mb-6">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <span className="bg-gradient-to-r from-emerald-400 via-sky-400 to-amber-400 bg-clip-text text-transparent">
              Projeto Fênix
            </span>
            <span className="text-2xl sm:text-3xl text-slate-400 font-normal">|</span>
            <span className="text-xl sm:text-3xl text-slate-200 font-medium">
              O Resgate da Soberania no RJ
            </span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Uma jornada de reconexão, superação e liberdade. Foco em saúde plena, adrenalina pura nas montanhas e praias, autoconfiança e <strong className="text-amber-400 font-semibold">zero álcool</strong>.
          </p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6">
          {/* Booking Urgency Card */}
          <div 
            onClick={() => setActiveTab('booking')}
            className="bg-slate-900/60 backdrop-blur-md border border-amber-500/40 rounded-2xl p-4 flex flex-col justify-between hover:border-amber-400 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-amber-300">Foco #1: Reservas</span>
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                <AlertCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span className={tripConfig.busBooked ? 'text-emerald-400' : 'text-slate-400'}>Ônibus {tripConfig.busBooked ? '✓' : '⏳'}</span>
                <span>•</span>
                <span className={tripConfig.hostelBooked ? 'text-emerald-400' : 'text-slate-400'}>Hostel {tripConfig.hostelBooked ? '✓' : '⏳'}</span>
              </div>
              <span className="text-[11px] text-amber-400/90 font-medium">Toque para cotar agora ↗</span>
            </div>
          </div>

          {/* Itinerary Progress */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-emerald-500/40 transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Roteiro Carioca</span>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                <Compass className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-bold text-white flex items-baseline gap-1">
                {tripConfig.days || 7} <span className="text-xs font-normal text-slate-400">dias planejados</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${itineraryPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Survival Checklist Progress */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-sky-500/40 transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Checklist Sobrevivência</span>
              <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-bold text-white flex items-baseline gap-1">
                {completedChecklist} <span className="text-xs font-normal text-slate-400">/ {totalChecklist}</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-sky-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${checklistPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Budget Overview */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-orange-500/40 transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Orçamento Estimado</span>
              <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 group-hover:scale-110 transition-transform">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-bold text-white flex items-baseline gap-1">
                R$ {totalActual.toLocaleString('pt-BR')}
                <span className="text-xs font-normal text-slate-400">/ R$ {totalEstimated.toLocaleString('pt-BR')}</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    totalActual > totalEstimated ? 'bg-rose-500' : 'bg-gradient-to-r from-amber-500 to-orange-400'
                  }`}
                  style={{ width: `${Math.min(100, (totalActual / totalEstimated) * 100 || 0)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
