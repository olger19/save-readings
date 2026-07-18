import React from 'react';
import { X, Check } from 'lucide-react';

export default function ReadingModal({
  isOpen,
  onClose,
  editingReading,
  formData,
  onInputChange,
  onSubmit
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-[540px] flex flex-col overflow-hidden max-h-[90vh] glass rounded-2xl border border-white/8 shadow-2xl animate-fade-in">
        {/* Modal Header */}
        <header className="flex justify-between items-center px-6 py-5 border-b border-white/6 bg-black/5">
          <h2 className="text-xl font-semibold text-white">
            {editingReading ? 'Editar Lectura' : 'Agregar Nueva Lectura'}
          </h2>
          <button className="bg-transparent text-gray-400 flex items-center justify-center rounded-full p-1.5 transition-all hover:bg-white/8 hover:text-white cursor-pointer" onClick={onClose}>
            <X size={20} />
          </button>
        </header>

        {/* Modal Form */}
        <form onSubmit={onSubmit} className="p-6 flex flex-col gap-4 overflow-y-auto">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="title" className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Título *</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              required
              value={formData.title} 
              onChange={onInputChange}
              placeholder="Ej: Solo Leveling, One Piece, etc."
              className="bg-bg-input border border-white/6 text-white rounded-lg px-3.5 py-2.5 outline-none transition-all focus:border-status-reading focus:ring-2 focus:ring-status-reading/20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="type" className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Tipo *</label>
              <select 
                id="type" 
                name="type" 
                value={formData.type} 
                onChange={onInputChange}
                className="bg-bg-input border border-white/6 text-white rounded-lg px-3.5 py-2.5 outline-none transition-all focus:border-status-reading focus:ring-2 focus:ring-status-reading/20 cursor-pointer"
              >
                <option value="manga">Manga</option>
                <option value="manhwa">Manhwa</option>
                <option value="manhua">Manhua</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="status" className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Estado *</label>
              <select 
                id="status" 
                name="status" 
                value={formData.status} 
                onChange={onInputChange}
                className="bg-bg-input border border-white/6 text-white rounded-lg px-3.5 py-2.5 outline-none transition-all focus:border-status-reading focus:ring-2 focus:ring-status-reading/20 cursor-pointer"
              >
                <option value="reading">Leyendo</option>
                <option value="completed">Completado</option>
                <option value="on_hold">En Espera</option>
                <option value="plan_to_read">Por Leer</option>
                <option value="dropped">Abandonado</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="current_chapter" className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Capítulo Actual</label>
              <input 
                type="number" 
                id="current_chapter" 
                name="current_chapter" 
                min="0"
                value={formData.current_chapter} 
                onChange={onInputChange}
                className="bg-bg-input border border-white/6 text-white rounded-lg px-3.5 py-2.5 outline-none transition-all focus:border-status-reading focus:ring-2 focus:ring-status-reading/20"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="total_chapters" className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Capítulos Totales</label>
              <input 
                type="number" 
                id="total_chapters" 
                name="total_chapters" 
                min="0"
                placeholder="En emisión: vacío"
                value={formData.total_chapters} 
                onChange={onInputChange}
                className="bg-bg-input border border-white/6 text-white rounded-lg px-3.5 py-2.5 outline-none transition-all focus:border-status-reading focus:ring-2 focus:ring-status-reading/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="rating" className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Calificación (1-10)</label>
              <input 
                type="number" 
                id="rating" 
                name="rating" 
                min="1" 
                max="10"
                placeholder="Ej: 9"
                value={formData.rating} 
                onChange={onInputChange}
                className="bg-bg-input border border-white/6 text-white rounded-lg px-3.5 py-2.5 outline-none transition-all focus:border-status-reading focus:ring-2 focus:ring-status-reading/20"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="cover_url" className="text-xs font-semibold text-gray-400 uppercase tracking-wide">URL de la Portada</label>
              <input 
                type="url" 
                id="cover_url" 
                name="cover_url" 
                placeholder="https://ejemplo.com/cover.jpg"
                value={formData.cover_url} 
                onChange={onInputChange}
                className="bg-bg-input border border-white/6 text-white rounded-lg px-3.5 py-2.5 outline-none transition-all focus:border-status-reading focus:ring-2 focus:ring-status-reading/20"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="notes" className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Notas o Comentarios</label>
            <textarea 
              id="notes" 
              name="notes" 
              rows="3"
              placeholder="Escribe tus opiniones, en qué capítulo te quedaste o detalles importantes..."
              value={formData.notes} 
              onChange={onInputChange}
              className="bg-bg-input border border-white/6 text-white rounded-lg px-3.5 py-2.5 outline-none transition-all focus:border-status-reading focus:ring-2 focus:ring-status-reading/20 resize-y min-h-[80px]"
            ></textarea>
          </div>

          <footer className="flex justify-end gap-3 pt-4 mt-2 border-t border-white/6 bg-black/12">
            <button 
              type="button" 
              className="bg-white/5 text-white border border-white/6 px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-white/10 hover:border-white/14 cursor-pointer" 
              onClick={onClose}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-manhwa to-violet-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:translate-y-[-1px] hover:brightness-110 active:translate-y-0 transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] border border-white/10 cursor-pointer"
            >
              <Check size={18} />
              <span>{editingReading ? 'Guardar Cambios' : 'Crear Registro'}</span>
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
