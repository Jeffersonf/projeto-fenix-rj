import React, { useState } from 'react';
import { 
  Check, ExternalLink, Shield, MapPin, Camera, Moon, 
  Bus, Heart, Sun, ArrowRight, BedDouble, Coffee, Compass
} from 'lucide-react';

export function DestinationComparator({ onSelectDestination }) {
  const [activeTab, setActiveTab] = useState('floripa');

  return (
    <div className="space-y-6">
      {/* Introduction Card */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-semibold tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
              A Decisão da Semana
            </span>
            <h2 className="text-xl sm:text-2xl font-serif text-stone-900 mt-2">
              Florianópolis ou Rio de Janeiro?
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
              Os dois destinos têm praias lindas, trilhas com fotos impactantes e vida noturna acessível para curtir sozinho. Veja o que cada um te entrega:
            </p>
          </div>

          {/* Quick Selector Pills */}
          <div className="flex bg-stone-100 p-1 rounded-xl self-start sm:self-auto shrink-0">
            <button
              onClick={() => setActiveTab('floripa')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'floripa'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              🌿 Florianópolis (SC)
            </button>
            <button
              onClick={() => setActiveTab('rio')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'rio'
                  ? 'bg-white text-amber-800 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              🏖️ Rio de Janeiro (RJ)
            </button>
          </div>
        </div>
      </div>

      {/* DETAILED DESTINATION CARD */}
      {activeTab === 'floripa' && (
        <div className="bg-white rounded-2xl border border-emerald-200/70 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌿</span>
                <h3 className="text-2xl sm:text-3xl font-serif text-stone-900">
                  Florianópolis, Santa Catarina
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-emerald-700 font-medium mt-1">
                Território 100% virgem • Zero fantasmas do passado • Segurança e tranquilidade
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-stone-500 block">Distância de Itapeva</span>
              <span className="text-sm font-bold text-stone-800">~8h a 9h de ônibus (via Curitiba)</span>
            </div>
          </div>

          {/* Core Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {/* Fotos & Trilhas */}
            <div className="p-4 rounded-xl bg-stone-50/80 border border-stone-200/60 space-y-2">
              <div className="flex items-center gap-2 text-stone-900 font-semibold">
                <Camera className="w-4 h-4 text-emerald-700" />
                <span>Trilhas & Fotos Épicas para o Feed</span>
              </div>
              <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside leading-relaxed">
                <li><strong>Pedra da Coroa (Lagoinha do Leste):</strong> Uma das fotos mais surreais do Brasil. Você no cume com a praia selvagem aos pés.</li>
                <li><strong>Trilha do Gravatá:</strong> Leve, com mirante rústico e mar aberto entre a Joaquina e a Mole.</li>
                <li><strong>Dunas da Joaquina:</strong> Visual de cinema com contraste de areia e céu azul.</li>
              </ul>
            </div>

            {/* Noite Solo */}
            <div className="p-4 rounded-xl bg-stone-50/80 border border-stone-200/60 space-y-2">
              <div className="flex items-center gap-2 text-stone-900 font-semibold">
                <Moon className="w-4 h-4 text-indigo-600" />
                <span>Bares & Noite Acessível Sozinho</span>
              </div>
              <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside leading-relaxed">
                <li><strong>Centrinho da Lagoa da Conceição:</strong> O melhor ponto para ir solo. Dezenas de bares com mesinhas na rua, música e balcões fáceis de entrosar.</li>
                <li><strong>Rio Tavares & Campeche:</strong> Cervejarias artesanais, praças gastronômicas descontraídas e galera esportiva.</li>
                <li><strong>Segurança total:</strong> Andar à noite com o celular na mão com muita paz.</li>
              </ul>
            </div>

            {/* Praias */}
            <div className="p-4 rounded-xl bg-stone-50/80 border border-stone-200/60 space-y-2">
              <div className="flex items-center gap-2 text-stone-900 font-semibold">
                <Sun className="w-4 h-4 text-amber-600" />
                <span>Praias Obrigatórias</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                <strong>Praia do Campeche:</strong> mar aberto, água cristalina, galera da altinha e corrida na areia.<br />
                <strong>Praia Mole:</strong> point jovem, quiosques com música ao vivo e natureza preservada.
              </p>
            </div>

            {/* Hospedagem Privativa */}
            <div className="p-4 rounded-xl bg-stone-50/80 border border-stone-200/60 space-y-2">
              <div className="flex items-center gap-2 text-stone-900 font-semibold">
                <BedDouble className="w-4 h-4 text-stone-700" />
                <span>Onde Ficar (Quarto Privativo)</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Alugar um <strong>estúdio no Airbnb ou pousada na Lagoa da Conceição ou Campeche</strong>. Ar-condicionado, cama confortável, silêncio e sua própria chave para descansar.
              </p>
            </div>
          </div>

          {/* Bus Route */}
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/70 text-xs text-emerald-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Bus className="w-4 h-4 text-emerald-700 shrink-0" />
              <span><strong>Rota de Ônibus:</strong> Itapeva ➡️ Curitiba (Transpen ~3h40) ➡️ Floripa (Catarinense ~4h30). Saídas diárias constantes.</span>
            </div>
            <a
              href="https://www.clickbus.com.br/onibus/curitiba-pr/florianopolis-todos-sc"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shrink-0 text-center transition-colors"
            >
              Ver Ônibus para Floripa ↗
            </a>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://www.airbnb.com.br/s/Lagoa-da-Concei%C3%A7%C3%A3o--Florian%C3%B3polis---SC/homes?room_types%5B%5D=Entire%20home%2Fapt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[200px] py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white text-center rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Ver Airbnbs Privativos na Lagoa ↗</span>
            </a>
            <a
              href="https://www.booking.com/searchresults.pt-br.html?ss=Lagoa+da+Conceicao+Florianopolis&nflt=roomtype%3D1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[200px] py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 text-center rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Ver Hotéis na Lagoa (Booking) ↗</span>
            </a>
          </div>
        </div>
      )}

      {/* RIO DE JANEIRO TAB */}
      {activeTab === 'rio' && (
        <div className="bg-white rounded-2xl border border-amber-200/70 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🦅</span>
                <h3 className="text-2xl sm:text-3xl font-serif text-stone-900">
                  Rio de Janeiro, RJ
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-amber-800 font-medium mt-1">
                O resgate da soberania • Nova narrativa • Energia vulcânica carioca
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-stone-500 block">Distância de Itapeva</span>
              <span className="text-sm font-bold text-stone-800">~10h de ônibus (via SP / Tietê)</span>
            </div>
          </div>

          {/* Core Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {/* Fotos & Trilhas */}
            <div className="p-4 rounded-xl bg-stone-50/80 border border-stone-200/60 space-y-2">
              <div className="flex items-center gap-2 text-stone-900 font-semibold">
                <Camera className="w-4 h-4 text-amber-700" />
                <span>Trilhas & Fotos Épicas (Zero Nostalgia)</span>
              </div>
              <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside leading-relaxed">
                <li><strong>Morro Dois Irmãos:</strong> Subida de mototáxi no Vidigal, 50 min de caminhada e a vista definitiva de Ipanema e Leblon.</li>
                <li><strong>Voo Livre de Asa Delta:</strong> Decolagem na Pedra Bonita e pouso na praia. Foto lendária no ar.</li>
                <li><strong>Pôr do Sol no Arpoador:</strong> O clássico aplauso ao sol no mar, sem nenhum gatilho do passado.</li>
              </ul>
            </div>

            {/* Noite Solo */}
            <div className="p-4 rounded-xl bg-stone-50/80 border border-stone-200/60 space-y-2">
              <div className="flex items-center gap-2 text-stone-900 font-semibold">
                <Moon className="w-4 h-4 text-amber-800" />
                <span>Bares & Noite Solo</span>
              </div>
              <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside leading-relaxed">
                <li><strong>Baixo Botafogo (BotaSoho):</strong> Rua Nelson Mandela e Voluntários. Mesas na calçada, dezenas de opções para sentar e conversar.</li>
                <li><strong>Ipanema & Leblon:</strong> Barzinhos clássicos pós-praia, suco natural e clima descontraído.</li>
                <li><strong>Atenção carioca:</strong> Usar doleira por dentro da bermuda em locais com aglomeração.</li>
              </ul>
            </div>

            {/* Praias */}
            <div className="p-4 rounded-xl bg-stone-50/80 border border-stone-200/60 space-y-2">
              <div className="flex items-center gap-2 text-stone-900 font-semibold">
                <Sun className="w-4 h-4 text-amber-600" />
                <span>Praias Obrigatórias</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                <strong>Praia de Ipanema (Posto 9):</strong> o melhor ponto para curtir o sol e ver gente sem parecer forçado.<br />
                <strong>Copacabana Posto 6:</strong> mar calmo, stand up paddle e água de coco no quiosque.
              </p>
            </div>

            {/* Hospedagem Privativa */}
            <div className="p-4 rounded-xl bg-stone-50/80 border border-stone-200/60 space-y-2">
              <div className="flex items-center gap-2 text-stone-900 font-semibold">
                <BedDouble className="w-4 h-4 text-stone-700" />
                <span>Onde Ficar (Quarto Privativo)</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Alugar um <strong>estúdio/flat em Botafogo</strong> (pertinho do metrô, bairro seguro e prático) ou em <strong>Copacabana/Ipanema</strong> a poucas quadras da praia.
              </p>
            </div>
          </div>

          {/* Bus Route */}
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/70 text-xs text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Bus className="w-4 h-4 text-amber-700 shrink-0" />
              <span><strong>Rota de Ônibus:</strong> Itapeva ➡️ São Paulo (Tietê) ➡️ Rio de Janeiro (Novo Rio). Opção leito noturno para economizar diária.</span>
            </div>
            <a
              href="https://www.clickbus.com.br/onibus/sao-paulo-sp/rio-de-janeiro-todos-rj"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-semibold shrink-0 text-center transition-colors"
            >
              Ver Ônibus para Rio ↗
            </a>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://www.airbnb.com.br/s/Botafogo--Rio-de-Janeiro---RJ/homes?room_types%5B%5D=Entire%20home%2Fapt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[200px] py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white text-center rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Ver Airbnbs Privativos em Botafogo ↗</span>
            </a>
            <a
              href="https://www.booking.com/searchresults.pt-br.html?ss=Botafogo+Rio+de+Janeiro&nflt=roomtype%3D1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[200px] py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 text-center rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Ver Hotéis em Botafogo (Booking) ↗</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
