import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function CustomSelect({ label, value, options, onChange, icon: Icon }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  return (
    <div className="relative inline-block w-full md:w-48" ref={containerRef}>
      {/* Label */}
      <span className="absolute -top-2 left-3 px-1.5 text-[11px] font-bold text-gray-400 bg-bg-main leading-none z-10 uppercase tracking-wider">
        {label}
      </span>
      
      {/* Button Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2.5 bg-bg-input border border-white/6 hover:border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white text-left focus:outline-none focus:border-status-reading focus:ring-2 focus:ring-status-reading/20 transition-all cursor-pointer"
      >
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          {Icon && <Icon size={14} className="text-gray-500 flex-shrink-0" />}
          <span>{selectedOption?.label}</span>
        </div>
        <ChevronDown 
          size={14} 
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 z-50 glass border border-white/8 rounded-xl shadow-2xl py-1.5 max-h-60 overflow-y-auto animate-fade-in origin-top">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2 text-sm text-left hover:bg-white/5 transition-colors cursor-pointer ${
                option.value === value ? 'text-status-reading font-semibold bg-white/[0.02]' : 'text-gray-300'
              }`}
            >
              <span>{option.label}</span>
              {option.value === value && <Check size={14} className="text-status-reading" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
