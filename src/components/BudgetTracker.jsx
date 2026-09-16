import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, AlertCircle, CheckCircle2, 
  Bus, Bed, Utensils, Navigation, Compass, Wind, Mountain,
  ToggleLeft, ToggleRight, Plus, Trash2, Edit2
} from 'lucide-react';

export function BudgetTracker({ budget, setBudget }) {
  const [includeOptional, setIncludeOptional] = useState(true);

  // Icon mapping helper
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Bus': return <Bus className="w-4 h-4 text-sky-400" />;
      case 'Bed': return <Bed className="w-4 h-4 text-emerald-400" />;
      case 'Utensils': return <Utensils className="w-4 h-4 text-orange-400" />;
      case 'Navigation': return <Navigation className="w-4 h-4 text-cyan-400" />;
      case 'Compass': return <Compass className="w-4 h-4 text-purple-400" />;
      case 'Wind': return <Wind className="w-4 h-4 text-amber-400" />;
      case 'Mountain': return <Mountain className="w-4 h-4 text-emerald-400" />;
      default: return <DollarSign className="w-4 h-4 text-slate-400" />;
    }
  };

  const handleActualChange = (id, value) => {
    const numericValue = value === '' ? 0 : parseFloat(value) || 0;
    setBudget(prev => prev.map(item => {
      if (item.id === id) {
        return { 
          ...item, 
          actual: numericValue,
          status: numericValue > 0 ? (numericValue <= item.estimated ? 'Pago' : 'Acima') : item.status
        };
      }
      return item;
    }));
  };

  const handleStatusToggle = (id) => {
    const statuses = ['Pendente', 'Planejado', 'Pago'];
    setBudget(prev => prev.map(item => {
      if (item.id === id) {
        const nextIndex = (statuses.indexOf(item.status) + 1) % statuses.length;
        return { ...item, status: statuses[nextIndex] };
      }
      return item;
    }));
  };

  // Calculations
  const filteredBudget = budget.filter(item => includeOptional || !item.isOptional);
  const totalEstimated = filteredBudget.reduce((sum, item) => sum + item.estimated, 0);
  const totalActual = filteredBudget.reduce((sum, item) => sum + (Number(item.actual) || 0), 0);
  const remainingBudget = totalEstimated - totalActual;
  const percentageUsed = Math.min(100, Math.round((totalActual / totalEstimated) * 100) || 0);

  return (
    <div className="space-y-6">
      {/* Top Banner & Scenario Switcher */}
      <div className="bg-slate-900/60 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>Planejamento & Controle Financeiro</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                BRL (R$)
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Acompanhe o orçamento estimado vs. gastos reais em tempo real.
            </p>
          </div>

          {/* Scenario toggle (Full vs Essential) */}
          <div className="flex items-center gap-3 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700 self-start sm:self-auto">
            <span className="text-xs text-slate-300 font-medium pl-2">
              {includeOptional ? 'Modo Completo (com Asa Delta/Guia)' : 'Modo Essencial'}
            </span>
            <button
              onClick={() => setIncludeOptional(!includeOptional)}
              className="p-1 text-emerald-400 hover:text-emerald-300 transition-colors"
              title="Alternar cenário com/sem voo de asa delta e guia da Gávea"
            >
              {includeOptional ? (
                <ToggleRight className="w-6 h-6 text-emerald-400" />
              ) : (
                <ToggleLeft className="w-6 h-6 text-slate-500" />
              )}
            </button>
          </div>
        </div>

        {/* Big Numbers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
            <span className="text-xs font-medium text-slate-400">Total Previsto</span>
            <div className="text-2xl font-extrabold text-white mt-1">
              R$ {totalEstimated.toLocaleString('pt-BR')}
            </div>
            <span className="text-[11px] text-slate-400">
              {includeOptional ? 'Custo teto estimado' : 'Sem Asa Delta e sem Guia (~R$ 2.440)'}
            </span>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
            <span className="text-xs font-medium text-slate-400">Total Já Gasto / Pago</span>
            <div className={`text-2xl font-extrabold mt-1 ${totalActual > totalEstimated ? 'text-rose-400' : 'text-emerald-400'}`}>
              R$ {totalActual.toLocaleString('pt-BR')}
            </div>
            <span className="text-[11px] text-slate-400">
              {percentageUsed}% do teto utilizado
            </span>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
            <span className="text-xs font-medium text-slate-400">Saldo Disponível</span>
            <div className={`text-2xl font-extrabold mt-1 ${remainingBudget < 0 ? 'text-rose-400' : 'text-sky-400'}`}>
              R$ {remainingBudget.toLocaleString('pt-BR')}
            </div>
            <span className="text-[11px] text-slate-400">
              {remainingBudget >= 0 ? 'Dentro do orçamento planejado' : '⚠️ Orçamento estourado'}
            </span>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-xs font-medium text-slate-400">
            <span>Consumo do Orçamento</span>
            <span className={totalActual > totalEstimated ? 'text-rose-400 font-bold' : 'text-slate-300'}>
              {percentageUsed}% ({totalActual > totalEstimated ? 'Estourado' : 'Equilibrado'})
            </span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                totalActual > totalEstimated 
                  ? 'bg-rose-500' 
                  : percentageUsed > 80 
                  ? 'bg-amber-500' 
                  : 'bg-gradient-to-r from-emerald-500 to-teal-400'
              }`}
              style={{ width: `${percentageUsed}%` }}
            />
          </div>
        </div>
      </div>

      {/* Breakdown Table & Interactive Cards */}
      <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white text-sm sm:text-base">
            Detalhamento de Despesas por Categoria
          </h3>
          <span className="text-xs text-slate-400">
            Clique no status para alterar ou digite o valor real pago
          </span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {filteredBudget.map((item) => {
            const actualVal = Number(item.actual) || 0;
            const diff = actualVal - item.estimated;
            const itemPct = Math.min(100, Math.round((actualVal / item.estimated) * 100) || 0);

            return (
              <div key={item.id} className="p-4 hover:bg-slate-800/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Category Info */}
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 shrink-0 mt-0.5">
                      {getIcon(item.icon)}
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-white text-sm sm:text-base">
                          {item.category}
                        </span>
                        {item.isOptional && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                            Opcional / Destaque
                          </span>
                        )}
                        <button
                          onClick={() => handleStatusToggle(item.id)}
                          className={`text-[10px] px-2 py-0.5 rounded-md font-medium border cursor-pointer transition-colors ${
                            item.status === 'Pago'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                              : item.status === 'Planejado'
                              ? 'bg-sky-500/10 text-sky-400 border-sky-500/30 hover:bg-sky-500/20'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                          }`}
                        >
                          {item.status}
                        </button>
                      </div>
                      <p className="text-xs text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Pricing and Inputs */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pl-11 sm:pl-0">
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                        Estimado
                      </span>
                      <span className="text-sm font-bold text-slate-200">
                        R$ {item.estimated.toLocaleString('pt-BR')}
                      </span>
                    </div>

                    <div className="text-right">
                      <label className="text-[10px] uppercase font-semibold text-slate-400 block">
                        Gasto Real (R$)
                      </label>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs text-slate-400 font-medium">R$</span>
                        <input
                          type="number"
                          min="0"
                          step="10"
                          value={item.actual === 0 ? '' : item.actual}
                          placeholder="0"
                          onChange={(e) => handleActualChange(item.id, e.target.value)}
                          className="w-24 px-2 py-1 text-sm bg-slate-950/80 border border-slate-700 rounded-lg text-white text-right focus:outline-none focus:border-emerald-500 font-mono font-medium"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mini progress bar per category */}
                {actualVal > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-slate-800/40 flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center gap-2 flex-1 max-w-xs">
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            diff > 0 ? 'bg-rose-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${Math.min(100, itemPct)}%` }}
                        />
                      </div>
                      <span className="font-mono text-[10px]">{itemPct}%</span>
                    </div>
                    <span>
                      {diff > 0 ? (
                        <span className="text-rose-400 font-medium">+R$ {diff} acima da estimativa</span>
                      ) : (
                        <span className="text-emerald-400 font-medium">R$ {Math.abs(diff)} economizados</span>
                      )}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
