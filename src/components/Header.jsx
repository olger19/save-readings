import React from 'react';
import { Plus, BookOpen } from 'lucide-react';

export default function Header({ onAddClick }) {
  return (
    <header className="flex justify-between items-center gap-5 pb-5 border-b border-white/6 flex-wrap md:flex-row flex-col md:items-center items-start">
      <div className="flex items-center gap-4">
        <div className="w-[52px] h-[52px] flex items-center justify-center rounded-2xl bg-manhwa/10 border border-manhwa/20 glass">
          <BookOpen className="text-manhwa" size={28} />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">Lecturas Guardadas</h1>
          <p className="text-sm text-gray-400 mt-0.5">Lleva el registro de tus Mangas, Manhwas y Manhuas favoritos</p>
        </div>
      </div>
      <button 
        className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-manhwa to-violet-700 text-white px-5 py-3 rounded-xl font-semibold text-sm hover:translate-y-[-2px] hover:brightness-110 active:translate-y-0 transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] border border-white/10 cursor-pointer"
        onClick={onAddClick}
      >
        <Plus size={20} />
        <span>Agregar Lectura</span>
      </button>
    </header>
  );
}
