import React, { useState } from 'react';
import { Sliders, BedDouble, Utensils, Bus, Compass, DollarSign, Calendar } from 'lucide-react';

export function TripDurationBudget({ tripConfig, setTripConfig }) {
  const [roomDailyRate, setRoomDailyRate] = useState(180);
  const [foodDailyRate, setFoodDailyRate] = useState(130);
  const [busRoundTrip, setBusRoundTrip] = useState(480);
  const [leisureTotal, setLeisureTotal] = useState(350);

  const days = tripConfig?.days || 6;
  const nights = Math.max(1, days - 1);

  const handleDaysChange = (val) => {
    const d = Number(val) || 6;
    setTripConfig(prev => ({ ...prev, days: d }));
  };

  const totalAccommodation = nights * roomDailyRate;
  const totalFood = days * foodDailyRate;
  const grandTotal = totalAccommodation + totalFood + busRoundTrip + leisureTotal;
  const dailyAverage = Math.round(grandTotal / days);

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div>
            <h3 className="text-xl font-serif text-stone-900">
              Simulador de Duração & Quarto Privativo
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Ajuste a quantidade de dias na janela de 19 a 28 de Setembro e veja o custo real sem surpresas.
            </p>
          </div>

          <div className="text-left sm:text-right bg-stone-50 px-3.5 py-2 rounded-xl border border-stone-200/60">
            <span className="text-[11px] text-stone-500 uppercase tracking-wide block">Estimativa Total</span>
            <div className="text-2xl font-serif font-bold text-stone-900">
              R$ {grandTotal.toLocaleString('pt-BR')}
            </div>
            <span className="text-xs text-emerald-700 font-medium">~R$ {dailyAverage}/dia tudo incluso</span>
          </div>
        </div>

        {/* Days Slider */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold text-stone-800 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-stone-500" />
              <span>Duração da Viagem:</span>
            </span>
            <span className="font-serif font-bold text-base text-stone-900 bg-amber-50 text-amber-900 px-3 py-0.5 rounded-full border border-amber-200/60">
              {days} Dias ({nights} Noites de Hospedagem)
            </span>
          </div>

          <input
            type="range"
            min="4"
            max="9"
            step="1"
            value={days}
            onChange={(e) => handleDaysChange(e.target.value)}
            className="w-full accent-stone-800 cursor-pointer h-2 bg-stone-100 rounded-lg"
          />

          <div className="flex justify-between text-xs text-stone-400 font-light">
            <span>4 Dias (Refúgio Rápido)</span>
            <span>6 Dias (Equilibrado)</span>
            <span>9 Dias (Janela Completa)</span>
          </div>
        </div>

        {/* Custom Price Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4">
          {/* Quarto Privativo */}
          <div className="p-3.5 rounded-xl bg-stone-50/80 border border-stone-200/60 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                <BedDouble className="w-3.5 h-3.5 text-stone-500" />
                <span>Diária Quarto Privativo</span>
              </span>
              <span className="text-xs font-bold text-stone-900">R$ {roomDailyRate}</span>
            </div>
            <input
              type="number"
              min="100"
              max="400"
              step="10"
              value={roomDailyRate}
              onChange={(e) => setRoomDailyRate(Number(e.target.value) || 0)}
              className="w-full px-2.5 py-1 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-stone-700"
            />
            <span className="text-[11px] text-stone-500 block">
              Subtotal: R$ {(nights * roomDailyRate).toLocaleString('pt-BR')} ({nights} noites)
            </span>
          </div>

          {/* Alimentação Diária */}
          <div className="p-3.5 rounded-xl bg-stone-50/80 border border-stone-200/60 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-stone-500" />
                <span>Alimentação / Dia</span>
              </span>
              <span className="text-xs font-bold text-stone-900">R$ {foodDailyRate}</span>
            </div>
            <input
              type="number"
              min="80"
              max="250"
              step="10"
              value={foodDailyRate}
              onChange={(e) => setFoodDailyRate(Number(e.target.value) || 0)}
              className="w-full px-2.5 py-1 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-stone-700"
            />
            <span className="text-[11px] text-stone-500 block">
              Subtotal: R$ {(days * foodDailyRate).toLocaleString('pt-BR')} ({days} dias)
            </span>
          </div>

          {/* Ônibus Ida e Volta */}
          <div className="p-3.5 rounded-xl bg-stone-50/80 border border-stone-200/60 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                <Bus className="w-3.5 h-3.5 text-stone-500" />
                <span>Ônibus (Ida + Volta)</span>
              </span>
              <span className="text-xs font-bold text-stone-900">R$ {busRoundTrip}</span>
            </div>
            <input
              type="number"
              min="300"
              max="700"
              step="20"
              value={busRoundTrip}
              onChange={(e) => setBusRoundTrip(Number(e.target.value) || 0)}
              className="w-full px-2.5 py-1 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-stone-700"
            />
            <span className="text-[11px] text-stone-500 block">
              Média leito / semi-leito confortável
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
