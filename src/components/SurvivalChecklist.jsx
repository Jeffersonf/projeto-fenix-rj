import React, { useState } from 'react';
import { CheckSquare, Square, Plus, Trash2, ShieldCheck, Check, Sparkles, Filter } from 'lucide-react';
import confetti from 'canvas-confetti';

export function SurvivalChecklist({ checklist, setChecklist }) {
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Segurança & Sobrevivência');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = [
    'Segurança & Sobrevivência',
    'Transporte & Hospedagem',
    'Equipamento & Vestuário',
    'Logística & Digital'
  ];

  const toggleItem = (id) => {
    setChecklist(prev => {
      const updated = prev.map(item => {
        if (item.id !== id) return item;
        const nextState = !item.completed;
        if (nextState) {
          confetti({
            particleCount: 20,
            spread: 50,
            origin: { y: 0.8 },
            colors: ['#0284c7', '#10b981', '#f59e0b']
          });
        }
        return { ...item, completed: nextState };
      });

      const allCompleted = updated.every(item => item.completed);
      if (allCompleted) {
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { y: 0.5 }
        });
      }

      return updated;
    });
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemTitle.trim()) return;

    const newItem = {
      id: `custom-${Date.now()}`,
      category: newItemCategory,
      title: newItemTitle.trim(),
      completed: false,
      isCustom: true
    };

    setChecklist(prev => [...prev, newItem]);
    setNewItemTitle('');
  };

  const handleDeleteItem = (id, e) => {
    e.stopPropagation();
    setChecklist(prev => prev.filter(item => item.id !== id));
  };

  const filteredItems = filterCategory === 'all'
    ? checklist
    : checklist.filter(item => item.category === filterCategory);

  const completedCount = checklist.filter(c => c.completed).length;
  const totalCount = checklist.length;
  const percentage = Math.round((completedCount / totalCount) * 100) || 0;

  return (
    <div className="space-y-6">
      {/* Overview & Progress Card */}
      <div className="bg-slate-900/60 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-400" />
              <span>Checklist de Sobrevivência Carioca</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Itens indispensáveis para garantir uma viagem segura, confortável e sem perrengues.
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-400">Progresso da Mochila</span>
            <div className="text-xl font-extrabold text-white flex items-baseline gap-1">
              {completedCount} <span className="text-xs font-normal text-slate-400">/ {totalCount} itens</span>
              <span className="text-xs font-semibold text-emerald-400 ml-1.5">({percentage}%)</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-500 via-emerald-500 to-teal-400 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/60">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterCategory === 'all'
                ? 'bg-sky-500 text-white font-semibold shadow'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            Todas as Categorias ({checklist.length})
          </button>
          {categories.map(cat => {
            const count = checklist.filter(i => i.category === cat).length;
            const done = checklist.filter(i => i.category === cat && i.completed).length;
            return (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  filterCategory === cat
                    ? 'bg-sky-500 text-white font-semibold shadow'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat} ({done}/{count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Add Custom Item Form */}
      <form onSubmit={handleAddItem} className="bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row gap-3 items-center">
        <input
          type="text"
          value={newItemTitle}
          onChange={(e) => setNewItemTitle(e.target.value)}
          placeholder="Adicionar novo item ao checklist (ex: Protetor solar FPS 50)..."
          className="flex-1 w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
        />

        <select
          value={newItemCategory}
          onChange={(e) => setNewItemCategory(e.target.value)}
          className="w-full sm:w-auto bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-sky-500"
        >
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full sm:w-auto px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shrink-0 shadow-md shadow-sky-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Adicionar</span>
        </button>
      </form>

      {/* Checklist Items List */}
      <div className="space-y-2.5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`group p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 select-none ${
              item.completed
                ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-400'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-200'
            }`}
          >
            <div className="flex items-center gap-3.5 flex-1">
              <div className="shrink-0">
                {item.completed ? (
                  <div className="w-5 h-5 rounded-md bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/40">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-md border-2 border-slate-600 group-hover:border-sky-400 transition-colors" />
                )}
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] font-semibold text-sky-400/90 block uppercase tracking-wider">
                  {item.category}
                </span>
                <span className={`text-sm sm:text-base font-medium transition-all ${
                  item.completed ? 'line-through text-slate-500' : 'text-slate-100 group-hover:text-white'
                }`}>
                  {item.title}
                </span>
              </div>
            </div>

            {item.isCustom && (
              <button
                onClick={(e) => handleDeleteItem(item.id, e)}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-all"
                title="Remover item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
