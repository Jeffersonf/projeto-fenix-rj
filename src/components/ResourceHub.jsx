import React, { useState } from 'react';
import { 
  Link2, ExternalLink, Edit3, Check, Plus, Trash2, 
  Ticket, Bed, Wind, Mountain, Shield, PhoneCall, AlertCircle
} from 'lucide-react';

export function ResourceHub({ resources, setResources }) {
  const [editingId, setEditingId] = useState(null);
  const [tempUrl, setTempUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState('Geral');

  const startEdit = (resource) => {
    setEditingId(resource.id);
    setTempUrl(resource.url || '');
  };

  const saveEdit = (id) => {
    setResources(prev => prev.map(res => {
      if (res.id === id) {
        return { ...res, url: tempUrl.trim() || '#' };
      }
      return res;
    }));
    setEditingId(null);
  };

  const handleAddResource = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;

    const newRes = {
      id: `custom-res-${Date.now()}`,
      title: newTitle.trim(),
      description: 'Link personalizado do viajante',
      url: newUrl.trim().startsWith('http') ? newUrl.trim() : `https://${newUrl.trim()}`,
      category: newCategory,
      icon: 'Ticket',
      isCustom: true
    };

    setResources(prev => [...prev, newRes]);
    setNewTitle('');
    setNewUrl('');
  };

  const handleDeleteResource = (id) => {
    setResources(prev => prev.filter(r => r.id !== id));
  };

  const getResourceIcon = (iconName) => {
    switch (iconName) {
      case 'Bed': return <Bed className="w-5 h-5 text-emerald-400" />;
      case 'Wind': return <Wind className="w-5 h-5 text-amber-400" />;
      case 'Mountain': return <Mountain className="w-5 h-5 text-orange-400" />;
      case 'Ticket':
      default: return <Ticket className="w-5 h-5 text-sky-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/60 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Link2 className="w-5 h-5 text-purple-400" />
              <span>Central de Links & Reservas</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Guarde os links diretos das suas reservas de passagens, hostel e passeios para acesso rápido no celular.
            </p>
          </div>
        </div>
      </div>

      {/* Add New Resource Form */}
      <form onSubmit={handleAddResource} className="bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row gap-3 items-center">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Nome do link (ex: Voucher Hostel Ipanema)..."
          className="w-full sm:w-1/3 bg-slate-950/80 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
        />

        <input
          type="text"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="URL (ex: https://booking.com/...)"
          className="w-full sm:flex-1 bg-slate-950/80 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
        />

        <button
          type="submit"
          className="w-full sm:w-auto px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shrink-0 shadow-md shadow-purple-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Salvar Link</span>
        </button>
      </form>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((item) => {
          const isEditing = editingId === item.id;
          const hasValidUrl = item.url && item.url !== '#';

          return (
            <div
              key={item.id}
              className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 p-4 sm:p-5 flex flex-col justify-between gap-3 hover:border-slate-700 transition-all group"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700/80">
                      {getResourceIcon(item.icon)}
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-400">
                        {item.category}
                      </span>
                      <h3 className="text-base font-bold text-white leading-snug">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {item.isCustom && (
                    <button
                      onClick={() => handleDeleteResource(item.id)}
                      className="text-slate-500 hover:text-rose-400 p-1 rounded-lg hover:bg-slate-800 transition-colors"
                      title="Excluir link"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <p className="text-xs text-slate-400">
                  {item.description}
                </p>
              </div>

              {/* URL input or Display */}
              <div className="pt-2 border-t border-slate-800/60 space-y-2">
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={tempUrl}
                      onChange={(e) => setTempUrl(e.target.value)}
                      placeholder="https://..."
                      className="flex-1 bg-slate-950 border border-purple-500 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                      autoFocus
                    />
                    <button
                      onClick={() => saveEdit(item.id)}
                      className="p-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-400 transition-colors"
                      title="Confirmar"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono text-slate-400 truncate max-w-[200px] sm:max-w-[260px]">
                      {hasValidUrl ? item.url : 'Nenhum link adicionado ainda'}
                    </span>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => startEdit(item)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-xs flex items-center gap-1"
                        title="Editar URL"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Editar</span>
                      </button>

                      {hasValidUrl && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-medium flex items-center gap-1 transition-colors"
                        >
                          <span>Acessar</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Safety & Protocol Card for Rio */}
      <div className="bg-gradient-to-br from-slate-900/90 via-slate-900 to-[#0d1825] rounded-2xl border border-slate-800 p-5 space-y-3">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
          <Shield className="w-4 h-4" />
          <span>Protocolo de Segurança & Consciência Carioca</span>
        </div>
        <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li><strong>Doleira sempre:</strong> Celular principal e cartões por dentro da roupa em locais com aglomerações (Lapa, Pedra do Sal, Rodoviária).</li>
          <li><strong>Trilha da Gávea:</strong> Nunca subir desacompanhado de guia credenciado. A Carrasqueira exige técnica e ancoragem segura.</li>
          <li><strong>Voo Livre:</strong> Confirmar certificado na Associação de Voo Livre de São Conrado (CSCVL) antes de saltar.</li>
          <li><strong>Deslocamento noturno:</strong> Priorize Uber/99 ou Metrô de estação para estação, evitando caminhadas longas em ruas desertas à noite.</li>
        </ul>
      </div>
    </div>
  );
}
