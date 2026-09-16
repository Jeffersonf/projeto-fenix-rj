import React, { useState, useEffect } from 'react';
import { Check, Plus, Trash2, ShieldCheck, Sparkles } from 'lucide-react';

const DEFAULT_PACK_ITEMS = [
  { id: 'p-1', title: 'Tênis de trilha com boa aderência (fundamental para pedras/costões)', completed: false },
  { id: 'p-2', title: 'Roupas esportivas leves (dry-fit, bermuda e sunga para praia)', completed: false },
  { id: 'p-3', title: 'Mochila de ataque leve (15-20L) para carregar água e câmera na trilha', completed: false },
  { id: 'p-4', title: 'Protetor solar FPS 50 e óculos escuros', completed: false },
  { id: 'p-5', title: 'Carregador portátil (powerbank) para não ficar sem bateria nas fotos', completed: false },
  { id: 'p-6', title: 'Doleira fina para documento e cartões em locais movimentados', completed: false },
  { id: 'p-7', title: 'Toalha de secagem rápida (microfibra compacta)', completed: false }
];

export function MinimalChecklist() {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('fenix_minimal_pack');
      return saved ? JSON.parse(saved) : DEFAULT_PACK_ITEMS;
    } catch {
      return DEFAULT_PACK_ITEMS;
    }
  });

  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    localStorage.setItem('fenix_minimal_pack', JSON.stringify(items));
  }, [items]);

  const toggleItem = (id) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    setItems(prev => [...prev, {
      id: `p-${Date.now()}`,
      title: newItem.trim(),
      completed: false,
      isCustom: true
    }]);
    setNewItem('');
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const completedCount = items.filter(i => i.completed).length;

  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-7 shadow-sm space-y-4">
      <div className="flex justify-between items-center border-b border-stone-100 pb-3">
        <div>
          <h3 className="text-xl font-serif text-stone-900">
            Mala Prática: Essencial para Trilha & Praia
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">Sem exageros, apenas o que você realmente vai usar.</p>
        </div>
        <span className="text-xs font-serif font-bold text-stone-700 bg-stone-100 px-3 py-1 rounded-full">
          {completedCount} / {items.length} prontos
        </span>
      </div>

      <form onSubmit={handleAddItem} className="flex gap-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Adicionar item à mala..."
          className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs rounded-xl transition-colors"
        >
          + Adicionar
        </button>
      </form>

      <div className="space-y-2 pt-1">
        {items.map(item => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 select-none ${
              item.completed
                ? 'bg-stone-50/60 border-stone-200/40 text-stone-400'
                : 'bg-white border-stone-200 hover:border-stone-300 text-stone-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                item.completed ? 'bg-stone-800 border-stone-800 text-white' : 'border-stone-300'
              }`}>
                {item.completed && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span className={`text-xs sm:text-sm ${item.completed ? 'line-through text-stone-400' : 'text-stone-800'}`}>
                {item.title}
              </span>
            </div>

            {item.isCustom && (
              <button
                onClick={(e) => handleDelete(item.id, e)}
                className="text-stone-300 hover:text-rose-500 p-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
