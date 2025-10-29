import React from "react";
import Image from "next/image";
import { X, Heart } from "lucide-react";
import { getTypeColor, formatRarity } from "@/utils/formatters";

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
artist?: string;
rarity?: string;
set?: {
name: string;
series: string;
};
}

interface CardDetailsProps {
card: PokemonCard;
isFavorite: boolean;
onToggleFavorite: (cardId: string) => void;
onClose: () => void;
}

/**

- Componente de detalhes da carta (Modal/Página)
- Exibe informações completas: artista, raridade, coleção, etc.
  */
  export default function CardDetails({
  card,
  isFavorite,
  onToggleFavorite,
  onClose,
  }: CardDetailsProps) {

const handleFavoriteClick = () => {
onToggleFavorite(card.id);
};

const rarityInfo = card.rarity ? formatRarity(card.rarity) : null;

return (
<div className="min-h-screen bg-gray-100">
{/* Header */}
<div className="bg-white shadow-md sticky top-0 z-10">
<div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
<h1 className="text-2xl font-bold text-gray-800">
Detalhes da Carta
</h1>
<button
onClick={onClose}
className="
flex 
items-center 
gap-2 
px-4 
py-2 
bg-gray-600 
hover:bg-gray-700 
text-white 
rounded-lg 
transition
font-medium
"
>
<X size={20} />
Voltar
</button>
</div>
</div>


  {/* Conteúdo Principal */}
  <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="md:flex">
        
        {/* Coluna da Imagem */}
        <div className="md:w-1/2 p-6 flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="relative">
            <Image
              src={card.images.large}
              alt={card.name}
              width={367}
              height={512}
              className="max-w-full h-auto rounded-lg shadow-2xl"
              priority
            />
          </div>
        </div>
        
        {/* Coluna de Informações */}
        <div className="md:w-1/2 p-6 md:p-8">
          
          {/* Nome e Botão de Favorito */}
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold text-gray-800 flex-1">
              {card.name}
            </h2>
            <button
              onClick={handleFavoriteClick}
              className="
                p-3 
                rounded-full 
                hover:bg-gray-100 
                transition
                ml-4
              "
              title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            >
              <Heart
                size={32}
                className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}
              />
            </button>
          </div>

          {/* Informações Principais */}
          <div className="space-y-4">
            
            {/* HP */}
            {card.hp && (
              <div className="flex items-center gap-3 pb-3 border-b">
                <span className="font-semibold text-gray-700 text-lg">HP:</span>
                <span className="text-3xl font-bold text-red-600">
                  {card.hp}
                </span>
              </div>
            )}

            {/* Número da Pokédex Nacional */}
            {card.nationalPokedexNumbers && card.nationalPokedexNumbers[0] && (
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-700">Número Nacional:</span>
                <span className="text-xl font-bold text-gray-800">
                  #{card.nationalPokedexNumbers[0].toString().padStart(3, '0')}
                </span>
              </div>
            )}

            {/* Tipos */}
            {card.types && card.types.length > 0 && (
              <div>
                <span className="font-semibold text-gray-700 block mb-2">
                  {card.types.length === 1 ? 'Tipo:' : 'Tipos:'}
                </span>
                <div className="flex gap-2 flex-wrap">
                  {card.types.map((type) => (
                    <span
                      key={type}
                      className={`
                        px-4 
                        py-2 
                        rounded-full 
                        text-sm 
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

            {/* Número da Carta */}
            {card.number && (
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-700">Número da Carta:</span>
                <span className="text-gray-800 font-medium">{card.number}</span>
              </div>
            )}

            {/* Artista */}
            {card.artist && (
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-700">Artista:</span>
                <span className="text-gray-800 font-medium">{card.artist}</span>
              </div>
            )}

            {/* Raridade */}
            {rarityInfo && (
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-700">Raridade:</span>
                <span className={`
                  px-4 
                  py-1.5 
                  rounded-full 
                  text-sm 
                  font-semibold
                  ${rarityInfo.className}
                `}>
                  {rarityInfo.text}
                </span>
              </div>
            )}

            {/* Coleção */}
            {card.set && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="font-semibold text-gray-700 mb-3 text-lg">
                  📦 Coleção
                </p>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-gray-800 font-medium">
                    {card.set.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Série: {card.set.series}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ID da Carta (útil para debug) */}
          <div className="mt-6 pt-6 border-t">
            <p className="text-xs text-gray-400">
              ID: {card.id}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

);
}