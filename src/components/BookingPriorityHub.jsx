import React, { useState } from 'react';
import { 
  Bus, Bed, ExternalLink, CheckCircle2, Clock, AlertCircle, 
  MapPin, Sparkles, DollarSign, Calendar, Sliders, Check, Shield
} from 'lucide-react';

export function BookingPriorityHub({ 
  tripConfig, 
  setTripConfig, 
  budget, 
  setBudget 
}) {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('both');

  const hostels = [
    {
      id: 'h-1',
      name: 'Ipanema Beach Hostel',
      neighborhood: 'Ipanema',
      vibe: 'Social, jovem, pé na areia e pertinho do Arpoador',
      avgPrice: 95,
      pros: ['A 1 quarteirão da praia de Ipanema', 'Fácil acesso a pé ao pôr do sol no Arpoador', 'Bar social movimentado'],
      bookingUrl: 'https://www.booking.com/searchresults.pt-br.html?ss=Ipanema+Beach+Hostel+Rio+de+Janeiro',
      hostelworldUrl: 'https://www.hostelworld.com/pwa/wds/hosteldetails.php/Ipanema-Beach-Hostel/Rio-de-Janeiro/281358'
    },
    {
      id: 'h-2',
      name: 'Che Lagarto Hostel Ipanema',
      neighborhood: 'Ipanema',
      vibe: 'Famoso pelo ambiente internacional e integração',
      avgPrice: 90,
      pros: ['Público jovem de vários países', 'Excelente para fazer amizades', 'Ótima localização na Zona Sul'],
      bookingUrl: 'https://www.booking.com/searchresults.pt-br.html?ss=Che+Lagarto+Ipanema+Rio+de+Janeiro',
      hostelworldUrl: 'https://www.hostelworld.com/hostels/Rio-de-Janeiro/Che-Lagarto-Ipanema'
    },
    {
      id: 'h-3',
      name: 'Villa 25 Hostel & Suites',
      neighborhood: 'Botafogo / Laranjeiras',
      vibe: 'Estrutura premium, piscina, área verde e tranquilidade',
      avgPrice: 85,
      pros: ['Metrô muito perto', 'Bairro seguro e polo gastronômico (BotaSoho)', 'Excelente custo-benefício'],
      bookingUrl: 'https://www.booking.com/searchresults.pt-br.html?ss=Villa+25+Hostel+Rio+de+Janeiro',
      hostelworldUrl: 'https://www.hostelworld.com/hostels/Rio-de-Janeiro/Villa-25'
    },
    {
      id: 'h-4',
      name: 'El Misti Hostel Botafogo',
      neighborhood: 'Botafogo',
      vibe: 'Super acolhedor, mochileiro clássico e bem conectado',
      avgPrice: 75,
      pros: ['Mais econômico', 'Próximo à estação de metrô Botafogo', 'Staff prestativo com dicas de passeios'],
      bookingUrl: 'https://www.booking.com/searchresults.pt-br.html?ss=El+Misti+Hostel+Botafogo',
      hostelworldUrl: 'https://www.hostelworld.com/hostels/Rio-de-Janeiro/El-Misti-Botafogo'
    }
  ];

  const busPortals = [
    {
      name: 'ClickBus (Comparador de Viações)',
      desc: 'Compara Cometa, 1001, Águia Branca e Catarinense',
      url: 'https://www.clickbus.com.br/onibus/sao-paulo-sp/rio-de-janeiro-todos-rj',
      badge: 'Mais Completo'
    },
    {
      name: 'Buser (Ônibus por Aplicativo)',
      desc: 'Frequentemente com tarifas até 40% menores',
      url: 'https://www.buser.com.br/onibus/sao-paulo-sp/rio-de-janeiro-rj',
      badge: 'Melhor Preço'
    },
    {
      name: 'Auto Viação 1001 (Oficial)',
      desc: 'Linha direta regular mais tradicional SP ➡️ Novo Rio',
      url: 'https://www.autoviacao1001.com.br',
      badge: 'Tradicional'
    },
    {
      name: 'Viação Cometa (Oficial)',
      desc: 'Ônibus leito e semi-leito confortáveis',
      url: 'https://www.viacaocometa.com.br',
      badge: 'Conforto'
    }
  ];

  const filteredHostels = selectedNeighborhood === 'all' || selectedNeighborhood === 'both'
    ? hostels
    : hostels.filter(h => h.neighborhood.toLowerCase().includes(selectedNeighborhood.toLowerCase()));

  // Updates accommodation in budget based on tripDays and daily rate
  const handleHostelRateChange = (newRate) => {
    const rate = Number(newRate) || 0;
    setTripConfig(prev => ({ ...prev, hostelDailyRate: rate }));
    
    // Update budget item 'b-hospedagem'
    const nights = Math.max(1, tripConfig.days - 1);
    const newTotal = rate * nights;
    setBudget(prev => prev.map(item => {
      if (item.id === 'b-hospedagem') {
        return {
          ...item,
          estimated: newTotal,
          description: `${nights} Noites em Social Hostel (R$ ${rate}/dia)`
        };
      }
      return item;
    }));
  };

  const handleDaysChange = (newDays) => {
    const days = Math.min(10, Math.max(3, Number(newDays) || 7));
    setTripConfig(prev => ({ ...prev, days }));
    
    const nights = Math.max(1, days - 1);
    const totalHostel = (tripConfig.hostelDailyRate || 80) * nights;
    const totalFood = days * 130;
    const totalTransport = 200 + Math.max(0, (days - 7) * 25);

    setBudget(prev => prev.map(item => {
      if (item.id === 'b-hospedagem') {
        return {
          ...item,
          estimated: totalHostel,
          description: `${nights} Noites em Social Hostel (R$ ${tripConfig.hostelDailyRate || 80}/dia)`
        };
      }
      if (item.id === 'b-alimentacao') {
        return {
          ...item,
          estimated: totalFood,
          description: `Alimentação saudável para ${days} dias (~R$ 130/dia)`
        };
      }
      if (item.id === 'b-transporte') {
        return {
          ...item,
          estimated: totalTransport,
          description: `Metrô, App e mototáxi para ${days} dias`
        };
      }
      return item;
    }));
  };

  const nights = Math.max(1, tripConfig.days - 1);
  const estimatedHostelTotal = (tripConfig.hostelDailyRate || 80) * nights;

  return (
    <div className="space-y-6">
      {/* Priority Callout Alert */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-sky-500/10 border border-amber-500/40 p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wide">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              Prioridade #1: Fechar Logística Básica
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Definir Duração, Passagens & Hospedagem
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Enquanto você não fecha as datas exatas, utilize o simulador abaixo para testar cenários de <strong>3 a 10 dias</strong>. O orçamento e as diárias são recalculados instantaneamente!
            </p>
          </div>

          {/* Quick status counters */}
          <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-900/90 border border-slate-700/80 p-3 rounded-xl shrink-0">
            <div className="text-center px-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Passagem</span>
              <span className={`text-xs font-extrabold ${tripConfig.busBooked ? 'text-emerald-400' : 'text-amber-400'}`}>
                {tripConfig.busBooked ? '✓ Fechada' : '⏳ A Definir'}
              </span>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div className="text-center px-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Hospedagem</span>
              <span className={`text-xs font-extrabold ${tripConfig.hostelBooked ? 'text-emerald-400' : 'text-amber-400'}`}>
                {tripConfig.hostelBooked ? '✓ Fechada' : '⏳ A Definir'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Simulator: Interactive Duration & Hostel Budget Controls */}
      <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-800 p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-white text-base">
            Simulador de Duração & Diárias da Viagem
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Days Selector */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Quantidade de Dias</span>
              <span className="text-emerald-400 font-bold font-mono text-sm">
                {tripConfig.days} Dias ({nights} Noites)
              </span>
            </label>
            <input
              type="range"
              min="3"
              max="10"
              step="1"
              value={tripConfig.days}
              onChange={(e) => handleDaysChange(e.target.value)}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>3 dias (FDS)</span>
              <span>5 dias</span>
              <span>7 dias (Original)</span>
              <span>10 dias</span>
            </div>
          </div>

          {/* Daily Hostel Rate */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Estimativa da Diária</span>
              <span className="text-amber-400 font-bold font-mono text-sm">
                R$ {tripConfig.hostelDailyRate || 80} / noite
              </span>
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">R$</span>
              <input
                type="number"
                min="50"
                max="250"
                step="5"
                value={tripConfig.hostelDailyRate || 80}
                onChange={(e) => handleHostelRateChange(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
            <p className="text-[10px] text-slate-400">
              Média atual em hostels na Zona Sul: R$ 75 a R$ 110/dia.
            </p>
          </div>

          {/* Total Hostel Calculated */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-300">
              Total Calculado de Hospedagem
            </span>
            <div>
              <div className="text-2xl font-extrabold text-white">
                R$ {estimatedHostelTotal.toLocaleString('pt-BR')}
              </div>
              <span className="text-[11px] text-emerald-400 font-medium">
                {nights} noites × R$ {tripConfig.hostelDailyRate || 80}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: PASSAGENS DE ÔNIBUS */}
      <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/30">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>1. Passagens de Ônibus (SP ➡️ Rio de Janeiro)</span>
              </h3>
              <p className="text-xs text-slate-400">
                Rotas saindo de Itapeva/Sorocaba ou Tietê com destino à Rodoviária Novo Rio.
              </p>
            </div>
          </div>

          <button
            onClick={() => setTripConfig(prev => ({ ...prev, busBooked: !prev.busBooked }))}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              tripConfig.busBooked 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {tripConfig.busBooked ? '✓ Passagens Marcadas como Compradas' : 'Marcar como Comprada'}
          </button>
        </div>

        {/* Pro Tip Card */}
        <div className="p-3.5 rounded-xl bg-sky-950/30 border border-sky-500/30 text-xs text-sky-200 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-sky-300">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>Dica de Ouro de Economia: Ônibus Noturno</span>
          </div>
          <p className="leading-relaxed">
            Pegar ônibus noturno leito/semi-leito (ex: saindo por volta das 22h ou 23h) permite dormir durante a viagem, economizar <strong>1 diária de hostel na ida</strong> e acordar cedinho já no Rio para aproveitar o primeiro dia desde a manhã!
          </p>
        </div>

        {/* Bus Portals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {busPortals.map((portal) => (
            <a
              key={portal.name}
              href={portal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-800/40 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-bold uppercase">
                    {portal.badge}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 transition-colors" />
                </div>
                <h4 className="font-bold text-white text-sm group-hover:text-sky-300 transition-colors">
                  {portal.name}
                </h4>
                <p className="text-xs text-slate-400">
                  {portal.desc}
                </p>
              </div>
              <span className="mt-3 text-xs font-semibold text-sky-400 flex items-center gap-1">
                Cotar Passagem ↗
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* SECTION 2: HOSPEDAGEM (IPANEMA VS BOTAFOGO) */}
      <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Bed className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                2. Hospedagem: Onde Ficar (Ipanema vs. Botafogo)
              </h3>
              <p className="text-xs text-slate-400">
                Os dois melhores bairros para a vibe do Projeto Fênix.
              </p>
            </div>
          </div>

          <button
            onClick={() => setTripConfig(prev => ({ ...prev, hostelBooked: !prev.hostelBooked }))}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              tripConfig.hostelBooked 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {tripConfig.hostelBooked ? '✓ Hostel Marcado como Reservado' : 'Marcar como Reservado'}
          </button>
        </div>

        {/* Neighborhood Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Ipanema */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-white text-base flex items-center gap-1.5">
                <span>🏖️ Ipanema</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  Praia & Sunset
                </span>
              </h4>
              <span className="text-xs text-slate-400 font-mono">~R$ 90 - 110/dia</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
              <li>Pé na areia: acorda e corre no calçadão ou nada no Posto 6/9.</li>
              <li>A poucos passos do pôr do sol clássico na Pedra do Arpoador.</li>
              <li>Ambiente com muitos mochileiros e público esportivo internacional.</li>
            </ul>
          </div>

          {/* Botafogo */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-sky-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-white text-base flex items-center gap-1.5">
                <span>🚇 Botafogo</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">
                  Mobilidade & Gastronomia
                </span>
              </h4>
              <span className="text-xs text-slate-400 font-mono">~R$ 75 - 90/dia</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
              <li>Eixo central: metrô na porta que te leva para Centro, Zona Sul e Tijuca.</li>
              <li>Polo gastronômico com centenas de opções de PFs baratos e saudáveis.</li>
              <li>Diárias um pouco mais econômicas que Ipanema/Leblon.</li>
            </ul>
          </div>
        </div>

        {/* Filter Hostels */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs font-semibold text-slate-300">
            Hostels Recomendados para Avaliar:
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setSelectedNeighborhood('both')}
              className={`px-2.5 py-1 rounded-lg text-xs ${selectedNeighborhood === 'both' ? 'bg-emerald-500 text-white font-bold' : 'bg-slate-800 text-slate-400'}`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedNeighborhood('Ipanema')}
              className={`px-2.5 py-1 rounded-lg text-xs ${selectedNeighborhood === 'Ipanema' ? 'bg-emerald-500 text-white font-bold' : 'bg-slate-800 text-slate-400'}`}
            >
              Ipanema
            </button>
            <button
              onClick={() => setSelectedNeighborhood('Botafogo')}
              className={`px-2.5 py-1 rounded-lg text-xs ${selectedNeighborhood === 'Botafogo' ? 'bg-emerald-500 text-white font-bold' : 'bg-slate-800 text-slate-400'}`}
            >
              Botafogo
            </button>
          </div>
        </div>

        {/* Hostels List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {filteredHostels.map((h) => (
            <div
              key={h.id}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between gap-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                    📍 {h.neighborhood}
                  </span>
                  <span className="text-xs font-bold text-amber-400 font-mono">
                    ~R$ {h.avgPrice}/noite
                  </span>
                </div>
                <h4 className="font-bold text-white text-sm">{h.name}</h4>
                <p className="text-xs text-slate-400">{h.vibe}</p>
                <div className="pt-1 text-[11px] text-slate-300 space-y-0.5">
                  {h.pros.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="text-emerald-400">✓</span>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60">
                <a
                  href={h.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-1.5 text-center text-xs font-semibold rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 transition-colors"
                >
                  Booking.com ↗
                </a>
                <a
                  href={h.hostelworldUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-1.5 text-center text-xs font-semibold rounded-lg bg-orange-600/20 hover:bg-orange-600/30 text-orange-300 border border-orange-500/30 transition-colors"
                >
                  Hostelworld ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
