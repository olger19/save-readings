import React from 'react';
import { PlusCircle, Edit3, Trash2, Star } from 'lucide-react';

export default function ReadingCard({ 
  item, 
  onIncrement, 
  onEdit, 
  onDelete 
}) {
  const getStatusText = (status) => {
    switch(status) {
      case 'reading': return 'Leyendo';
      case 'completed': return 'Completado';
      case 'on_hold': return 'En Espera';
      case 'plan_to_read': return 'Por Leer';
      case 'dropped': return 'Abandonado';
      default: return status;
    }
  };

  const getCoverStyle = (type) => {
    const colors = {
      manga: 'linear-gradient(135deg, #4338ca 0%, #f97316 100%)',
      manhwa: 'linear-gradient(135deg, #1e1b4b 0%, #8b5cf6 100%)',
      manhua: 'linear-gradient(135deg, #064e3b 0%, #10b981 100%)'
    };
    return {
      background: colors[type] || 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: '24px',
      color: '#fff',
      textAlign: 'center',
      padding: '16px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      textShadow: '0 2px 4px rgba(0,0,0,0.5)'
    };
  };

  const getInitial = (title) => {
    return title ? title.charAt(0) : '?';
  };

  const getStatusColorClass = (status) => {
    switch(status) {
      case 'reading': return 'bg-status-reading shadow-[0_0_8px_var(--color-status-reading)]';
      case 'completed': return 'bg-status-completed shadow-[0_0_8px_var(--color-status-completed)]';
      case 'on_hold': return 'bg-status-onhold shadow-[0_0_8px_var(--color-status-onhold)]';
      case 'plan_to_read': return 'bg-status-plan shadow-[0_0_8px_var(--color-status-plan)]';
      case 'dropped': return 'bg-status-dropped shadow-[0_0_8px_var(--color-status-dropped)]';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl glass glass-hover transition-all duration-300 min-h-[440px] group">
      {/* Cover Image/Gradient */}
      <div className="relative h-[170px] w-full overflow-hidden bg-[#11121a] border-b border-white/6">
        {item.cover_url ? (
          <img 
            src={item.cover_url} 
            alt={item.title} 
            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-[1.05]" 
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div 
          className="w-full h-full" 
          style={{ 
            ...getCoverStyle(item.type),
            display: item.cover_url ? 'none' : 'flex' 
          }}
        >
          {getInitial(item.title)}
        </div>

        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase text-white border border-white/15 shadow-md bg-${item.type}`}>
          {item.type}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-[18px] flex flex-col flex-grow gap-3">
        <div className="min-h-[42px]">
          <h3 className="text-[17px] font-semibold text-gray-100 line-clamp-2 leading-snug" title={item.title}>
            {item.title}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-0.5">
          {item.rating ? (
            <>
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  className={i < Math.round(item.rating / 2) ? "text-[#fbbf24] fill-[#fbbf24]" : "text-gray-600"} 
                />
              ))}
              <span className="text-[12px] text-gray-300 ml-1.5 font-semibold">{item.rating}/10</span>
            </>
          ) : (
            <span className="text-[12px] text-gray-500 italic">Sin calificar</span>
          )}
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 text-[13px] text-gray-300">
          <span className={`w-2 h-2 rounded-full ${getStatusColorClass(item.status)}`}></span>
          <span>{getStatusText(item.status)}</span>
        </div>

        {/* Progress Tracking */}
        <div className="bg-white/[0.015] border border-white/[0.03] rounded-lg p-2.5">
          <div className="flex justify-between items-center text-[13px] mb-1.5">
            <span className="text-gray-400">Progreso</span>
            <span className="font-semibold text-white">
              Cap. {item.current_chapter}
              <span className="text-gray-500 font-normal"> / {item.total_chapters || '?' }</span>
            </span>
          </div>
          
          {/* Progress Bar */}
          {item.total_chapters ? (
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-300" 
                style={{ 
                  width: `${Math.min(100, (item.current_chapter / item.total_chapters) * 100)}%`,
                  backgroundColor: `var(--color-${item.type})`
                }}
              ></div>
            </div>
          ) : null}
        </div>

        {/* Notes preview if exists */}
        {item.notes && (
          <p className="text-[12px] text-gray-500 line-clamp-2 leading-relaxed border-t border-white/[0.04] pt-2 mt-auto" title={item.notes}>
            {item.notes}
          </p>
        )}
      </div>

      {/* Card Actions */}
      <div className="flex justify-between items-center px-[18px] py-3 border-t border-white/6 bg-black/12">
        <button 
          className="bg-transparent flex items-center justify-center p-1.5 rounded-lg text-gray-400 hover:text-white transition-all duration-300 hover:scale-[1.15] hover:bg-white/3 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          onClick={() => onIncrement(item.id, item.current_chapter, item.total_chapters)}
          disabled={item.total_chapters && item.current_chapter >= item.total_chapters}
          title="Siguiente Capítulo"
        >
          <PlusCircle size={20} style={{ color: `var(--color-${item.type})` }} />
        </button>
        
        <div className="flex gap-1">
          <button 
            className="bg-transparent flex items-center justify-center p-1.5 rounded-lg text-gray-400 transition-all hover:text-status-reading hover:bg-status-reading/8 cursor-pointer" 
            onClick={() => onEdit(item)}
            title="Editar"
          >
            <Edit3 size={16} />
          </button>
          <button 
            className="bg-transparent flex items-center justify-center p-1.5 rounded-lg text-gray-400 transition-all hover:text-status-dropped hover:bg-status-dropped/8 cursor-pointer" 
            onClick={() => onDelete(item.id, item.title)}
            title="Eliminar"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
