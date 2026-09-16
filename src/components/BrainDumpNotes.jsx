import React, { useState, useEffect } from 'react';
import { PenLine, Check, Trash2, Sparkles, Feather } from 'lucide-react';

export function BrainDumpNotes() {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('fenix_braindump_notes');
      return saved !== null ? saved : `Minhas ideias para a viagem:

- Quero quarto privativo (hotel ou Airbnb com ar-condicionado e silêncio).
- Nada de rever o passado ou ir em lugares repetidos.
- Quero praia para caminhar e respirar.
- Trilhas com fotos de visual épico.
- Um lugar seguro onde eu consiga curtir a noite e bares sozinho sem me sentir deslocado.
- Preciso voltar para Itapeva no dia 28/09 para trabalhar no dia 29.`;
    } catch {
      return '';
    }
  });

  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    localStorage.setItem('fenix_braindump_notes', notes);
    setSavedStatus(true);
    const timer = setTimeout(() => setSavedStatus(false), 1500);
    return () => clearTimeout(timer);
  }, [notes]);

  const handleClear = () => {
    if (window.confirm('Deseja limpar suas anotações?')) {
      setNotes('');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-7 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
        <div className="flex items-center gap-2">
          <Feather className="w-5 h-5 text-stone-600" />
          <h3 className="text-xl font-serif text-stone-900">
            Caderno Livre: Esvaziar a Mente
          </h3>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className={`transition-opacity duration-300 font-medium ${savedStatus ? 'text-emerald-700 opacity-100' : 'text-stone-400 opacity-60'}`}>
            ✓ Salvo no seu navegador
          </span>
          <button
            onClick={handleClear}
            className="text-stone-400 hover:text-stone-700 transition-colors"
          >
            Limpar
          </button>
        </div>
      </div>

      <p className="text-xs text-stone-500 leading-relaxed font-light">
        Use este espaço para jogar pensamentos, dúvidas sobre Floripa ou Rio, listas de desejos e o que mais estiver na sua cabeça. Nada aqui é imposto.
      </p>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={10}
        placeholder="Escreva livremente aqui..."
        className="w-full bg-[#faf9f6] border border-stone-200 rounded-xl p-4 text-sm text-stone-800 leading-relaxed placeholder-stone-400 focus:outline-none focus:border-stone-400 font-sans resize-y"
      />
    </div>
  );
}
