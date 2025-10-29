import React from 'react';
import Image from 'next/image';
import FavoriteButton from "./FavoriteButton";
import { getTypeColor } from "@/utils/formatters";

interface PokemonImage {
small: string;
large: string;
}

interface PokemonCard {
id: string;
name: string;
images: PokemonImage;
nationalPokedexNumbers?: number[];
types?: string[];
hp?: string;
number?: string;
}

interface CardItemProps {
card: PokemonCard;
isFavorite: boolean;
onToggleFavorite: (cardId: string) => void;
onClick: (card: PokemonCard) => void;
}

/**

- Componente que exibe uma carta individual do Pokémon TCG
- Mostra: imagem, nome, HP, número da Pokédex e tipos
  */
  export default function CardItem({
  card,
  isFavorite,
  onToggleFavorite,
  onClick,
  }: CardItemProps) {

const handleFavoriteClick = (e: React.MouseEvent) => {
e.stopPropagation(); // Evita abrir detalhes ao clicar no favorito
onToggleFavorite(card.id);
};

const handleCardClick = () => {
onClick(card);
};

return (
<div
className="
bg-white 
rounded-xl 
shadow-lg 
overflow-hidden 
hover:shadow-2xl 
transition-all 
duration-300 
transform 
hover:-translate-y-2
cursor-pointer
group
"
>
{/* Área da Imagem */}
<div 
className="relative bg-gradient-to-br from-gray-50 to-gray-100"
onClick={handleCardClick}
>
<Image
src={card.images.large}
alt={card.name}
width={245}
height={342}
className="w-full h-auto object-contain"
priority={false}
loading="lazy"
/>

    {/* Botão de Favorito - Posição Absoluta */}
    <div className="absolute top-3 right-3 z-10">
      <FavoriteButton
        isFavorite={isFavorite}
        onToggleFavorite={onToggleFavorite}
        onClick={handleFavoriteClick}e="medium"
      />
    </div>

    {/* Overlay ao Hover */}
    <div className="
      absolute 
      inset-0 
      bg-black 
      bg-opacity-0 
      group-hover:bg-opacity-10 
      transition-all 
      duration-300
      flex
      items-center
      justify-center
    ">
      <span className="
        text-white 
        font-bold 
        text-lg 
        opacity-0 
        group-hover:opacity-100
        transition-opacity
        duration-300
      ">
        Ver Detalhes
      </span>
    </div>
  </div>

  {/* Informações da Carta */}
  <div className="p-4">
    {/* Nome */}
    <h3 
      className="font-bold text-lg text-gray-800 mb-3 truncate"
      title={card.name}
    >
      {card.name}
    </h3>
    
    <div className="space-y-2">
      {/* HP */}
      {card.hp && (
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">HP:</span>
          <span className="font-bold text-red-600 text-lg">
            {card.hp}
          </span>
        </div>
      )}
      
      {/* Número da Pokédex Nacional */}
      {card.nationalPokedexNumbers && card.nationalPokedexNumbers[0] && (
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Nº Nacional:</span>
          <span className="font-semibold text-gray-800">
            #{card.nationalPokedexNumbers[0].toString().padStart(3, '0')}
          </span>
        </div>
      )}

      {/* Número da Carta */}
      {card.number && (
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Nº da Carta:</span>
          <span className="font-semibold text-gray-800">
            {card.number}
          </span>
        </div>
      )}
      
      {/* Tipos */}
      {card.types && card.types.length > 0 && (
        <div className="mt-3">
          <span className="text-sm text-gray-600 block mb-2">Tipos:</span>
          <div className="flex flex-wrap gap-1.5">
            {card.types.map((type) => (
              <span
                key={type}
                className={`
                  px-3 
                  py-1 
                  rounded-full 
                  text-xs 
                  font-semibold
                  ${getTypeColor(type)}
                `}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
</div>

);
}