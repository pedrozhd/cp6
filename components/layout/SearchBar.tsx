
import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
value: string;
onChange: (value: string) => void;
onSearch: () => void;
onClear?: () => void;
loading?: boolean;
placeholder?: string;
}

/**

- Barra de busca com campo de texto e botão
- Suporta busca ao pressionar Enter
  */
  export default function SearchBar({
  value,
  onChange,
  onSearch,
  onClear,
  loading = false,
  placeholder = "Buscar cartas por nome… (ex: Charizard)",
  }: SearchBarProps) {

const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
if (e.key === "Enter") {
onSearch();
}
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
onChange(e.target.value);
};

const handleClear = () => {
onChange("");
if (onClear) {
onClear();
}
};

return (
<div className="w-full max-w-7xl mx-auto px-4 py-6">
<div className="flex gap-3">

    {/* Campo de Input */}
    <div className="flex-1 relative">
      {/* Ícone de Busca */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
        <Search size={20} />
      </div>
      
      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={loading}
        className="
          w-full 
          pl-12 
          pr-12
          py-3.5 
          border-2
          border-gray-300 
          rounded-lg 
          focus:ring-2 
          focus:ring-blue-500 
          focus:border-blue-500
          outline-none
          transition-all
          duration-200
          text-gray-800
          placeholder-gray-400
          disabled:bg-gray-100
          disabled:cursor-not-allowed
          text-base
        "
        aria-label="Campo de busca"
      />
      
      {/* Botão de Limpar (aparece quando há texto) */}
      {value && !loading && (
        <button
          onClick={handleClear}
          className="
            absolute 
            right-4 
            top-1/2 
            transform 
            -translate-y-1/2 
            text-gray-400 
            hover:text-gray-600
            transition-colors
            p-1
            rounded-full
            hover:bg-gray-100
          "
          title="Limpar busca"
          aria-label="Limpar busca"
        >
          <X size={20} />
        </button>
      )}

      {/* Loading Spinner no Input */}
      {loading && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <div className="
            w-5 
            h-5 
            border-2 
            border-gray-300 
            border-t-blue-600 
            rounded-full 
            animate-spin
          "></div>
        </div>
      )}
    </div>
    
    {/* Botão de Buscar */}
    <button
      onClick={onSearch}
      disabled={loading}
      className="
        px-6 
        py-3.5 
        bg-blue-600 
        hover:bg-blue-700 
        active:bg-blue-800
        disabled:bg-gray-400
        disabled:cursor-not-allowed
        text-white 
        rounded-lg 
        font-semibold 
        transition-all
        duration-200
        shadow-md
        hover:shadow-lg
        focus:outline-none
        focus:ring-2
        focus:ring-blue-400
        focus:ring-offset-2
        flex
        items-center
        gap-2
        min-w-[120px]
        justify-center
      "
      aria-label="Buscar cartas"
    >
      {loading ? (
        <>
          <div className="
            w-5 
            h-5 
            border-2 
            border-white 
            border-t-transparent 
            rounded-full 
            animate-spin
          "></div>
          <span className="hidden sm:inline">Buscando...</span>
        </>
      ) : (
        <>
          <Search size={20} />
          <span className="hidden sm:inline">Buscar</span>
        </>
      )}
    </button>
  </div>

  {/* Dicas de Busca */}
  <div className="mt-3 text-sm text-gray-500">
    <p>
      💡 <strong>Dica:</strong> Deixe em branco para ver cartas aleatórias ou busque por nome específico
    </p>
  </div>
</div>

);
}
