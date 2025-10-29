import React from "react";
import { Heart } from "lucide-react";

interface FavoriteButtonProps {
isFavorite: boolean;
onClick: () => void;
size?: "small" | "medium" | "large";
className?: string;
}

/**

- Botão de favorito com ícone de coração
- Usado para adicionar/remover cartas dos favoritos
  */
  export default function FavoriteButton({
  isFavorite,
  onClick,
  size = "medium",
  className = ""
  }: FavoriteButtonProps) {

// Define tamanho do ícone baseado na prop
const iconSize = {
small: 16,
medium: 24,
large: 28,
}[size];

// Define padding baseado no tamanho
const paddingClass = {
small: "p-1.5",
medium: "p-2",
large: "p-3",
}[size];

return (
<button
onClick={onClick}
className={`${paddingClass} bg-white  rounded-full  shadow-lg  hover:scale-110  active:scale-95 transition-all  duration-200 focus:outline-none  focus:ring-2  focus:ring-red-400 ${className}`}
aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
>
<Heart
size={iconSize}
className={`transition-colors  duration-200 ${isFavorite  ? 'fill-red-500 text-red-500'  : 'text-gray-400 hover:text-red-400' }`}
/>
</button>
);
}