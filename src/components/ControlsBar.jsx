import React from 'react';
import { Search, Filter, Eye } from 'lucide-react';
import CustomSelect from './CustomSelect';

export default function ControlsBar({
  searchTerm,
  onSearchChange,
  filterType,
  onFilterTypeChange,
  filterStatus,
  onFilterStatusChange
}) {
  const typeOptions = [
    { value: 'all', label: 'Todos los Tipos' },
    { value: 'manga', label: 'Manga' },
    { value: 'manhwa', label: 'Manhwa' },
    { value: 'manhua', label: 'Manhua' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Todos los Estados' },
    { value: 'reading', label: 'Leyendo' },
    { value: 'completed', label: 'Completado' },
    { value: 'on_hold', label: 'En Espera' },
    { value: 'plan_to_read', label: 'Por Leer' },
    { value: 'dropped', label: 'Abandonado' }
  ];

  return (
    <section className="relative z-20 flex justify-between items-center gap-5 p-4 md:p-[16px] glass rounded-2xl flex-wrap">
      {/* Search Input */}
      <div className="flex items-center gap-2.5 bg-bg-input border border-white/6 rounded-xl px-[14px] flex-grow max-w-[480px] min-w-[260px] focus-within:border-status-reading focus-within:ring-2 focus-within:ring-status-reading/20 transition-all">
        <Search size={18} className="text-gray-500 flex-shrink-0" />
        <input 
          type="text" 
          placeholder="Buscar por título o notas..." 
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-transparent border-none py-[10px] w-full text-white text-sm outline-none"
        />
      </div>

      {/* Filters Group */}
      <div className="flex gap-4 flex-wrap w-full md:w-auto grid grid-cols-2 md:flex">
        <CustomSelect
          label="Tipo"
          value={filterType}
          options={typeOptions}
          onChange={onFilterTypeChange}
          icon={Filter}
        />

        <CustomSelect
          label="Estado"
          value={filterStatus}
          options={statusOptions}
          onChange={onFilterStatusChange}
          icon={Eye}
        />
      </div>
    </section>
  );
}
