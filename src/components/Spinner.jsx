import React from 'react';

export default function Spinner({ message = 'Cargando...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-10 gap-4 text-center text-gray-400 glass rounded-2xl">
      <div className="w-11 h-11 border-[3.5px] border-white/5 border-t-manhwa rounded-full spinner-icon"></div>
      <p className="font-medium">{message}</p>
    </div>
  );
}
