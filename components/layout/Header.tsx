
import React from 'react';

import { Heart, LogOut } from 'lucide-react';

interface HeaderProps {
favoritesCount: number;
username?: string;
onLogout: () => void;
}

/**

- Header/Barra superior do sistema
- Exibe título, contador de favoritos e botão de logout
  */
  export default function Header({
  favoritesCount,
  username,
  onLogout
  }: HeaderProps) {

return (
<header className="bg-white shadow-md sticky top-0 z-50">
<div className="max-w-7xl mx-auto px-4 py-4">
<div className="flex justify-between items-center flex-wrap gap-4">

      {/* Logo e Informações */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-3xl">🎴</span>
            Pokémon TCG
          </h1>
          <div className="flex items-center gap-4 mt-1">
            {/* Contador de Favoritos */}
            <div className="flex items-center gap-2 text-sm">
              <Heart 
                size={16} 
                className={`
                  ${favoritesCount > 0 ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                  transition-colors
                `}
              />
              <span className="text-gray-600 font-medium">
                {favoritesCount} {favoritesCount === 1 ? 'favorita' : 'favoritas'}
              </span>
            </div>
            
            {/* Username */}
            {username && (
              <span className="text-sm text-gray-500 hidden sm:inline">
                | Olá, <strong>{username}</strong>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Botão de Logout */}
      <button
        onClick={onLogout}
        className="
          flex 
          items-center 
          gap-2 
          px-4 
          py-2.5 
          bg-red-600 
          hover:bg-red-700 
          active:bg-red-800
          text-white 
          rounded-lg 
          transition-all
          duration-200
          font-semibold
          shadow-md
          hover:shadow-lg
          focus:outline-none
          focus:ring-2
          focus:ring-red-400
          focus:ring-offset-2
        "
        title="Sair do sistema"
      >
        <LogOut size={20} />
        <span className="hidden sm:inline">Sair</span>
      </button>
    </div>
  </div>
</header>

);
}