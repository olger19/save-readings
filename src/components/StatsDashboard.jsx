import React from 'react';
import { Book, TrendingUp, CheckCircle } from 'lucide-react';

export default function StatsDashboard({ stats }) {
  const { totalTitles, totalChapters, completedTitles, readingTitles, typeCounts } = stats;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {/* Tarjeta 1: Total Títulos */}
      <div className="flex items-center gap-5 p-[22px] glass rounded-2xl hover:translate-y-[-4px] transition-all duration-300 border border-white/6 hover:border-white/15">
        <div className="w-[52px] h-[52px] rounded-xl flex items-center justify-center bg-manga/12">
          <Book className="text-manga" size={24} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total Títulos</span>
          <span className="text-[28px] font-bold text-white mt-0.5 leading-none">{totalTitles}</span>
          <div className="text-[12.5px] text-gray-400 mt-1">
            <span className="text-manga font-semibold">{typeCounts.manga} Mangas</span> •{' '}
            <span className="text-manhwa font-semibold">{typeCounts.manhwa} Manhwas</span> •{' '}
            <span className="text-manhua font-semibold">{typeCounts.manhua} Manhuas</span>
          </div>
        </div>
      </div>

      {/* Tarjeta 2: Capítulos Leídos */}
      <div className="flex items-center gap-5 p-[22px] glass rounded-2xl hover:translate-y-[-4px] transition-all duration-300 border border-white/6 hover:border-white/15">
        <div className="w-[52px] h-[52px] rounded-xl flex items-center justify-center bg-manhwa/12">
          <TrendingUp className="text-manhwa" size={24} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Capítulos Leídos</span>
          <span className="text-[28px] font-bold text-white mt-0.5 leading-none">{totalChapters}</span>
          <span className="text-[12.5px] text-gray-400 mt-1">En todos tus títulos registrados</span>
        </div>
      </div>

      {/* Tarjeta 3: Progreso General */}
      <div className="flex items-center gap-5 p-[22px] glass rounded-2xl hover:translate-y-[-4px] transition-all duration-300 border border-white/6 hover:border-white/15 md:col-span-2 lg:col-span-1">
        <div className="w-[52px] h-[52px] rounded-xl flex items-center justify-center bg-manhua/12">
          <CheckCircle className="text-manhua" size={24} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Progreso General</span>
          <span className="text-[28px] font-bold text-white mt-0.5 leading-none">{completedTitles} / {totalTitles}</span>
          <span className="text-[12.5px] text-gray-400 mt-1">{readingTitles} actualmente leyendo</span>
        </div>
      </div>
    </section>
  );
}
