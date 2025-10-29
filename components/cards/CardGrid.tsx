import React from "react";
import CardItem from "./CardItem";

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

interface CardGridProps {
cards: PokemonCard[];
favorites: string[];
onToggleFavorite: (cardId: string) => void;
onCardClick: (card: PokemonCard) => void;
loading?: boolean;
}

/**

- Grade responsiva que exibe múltiplas cartas
- Gerencia estados de loading e vazio
  */
  export default function CardGrid({
  cards,
  favorites,
  onToggleFavorite,
  onCardClick,
  loading = false,
  }: CardGridProps) {

// Verifica se uma carta está nos favoritos
const isFavorite = (cardId: string): boolean => {
return favorites.includes(cardId);
};

// Estado de loading
if (loading) {
return (
<div className="flex flex-col items-center justify-center py-16">
<div className="relative w-16 h-16">
{/* Spinner animado */}
<div className="
absolute 
inset-0 
border-4 
border-blue-200 
border-t-blue-600 
rounded-full 
animate-spin
"></div>
</div>
<p className="mt-6 text-gray-600 font-medium text-lg">
Carregando cartas…
</p>
<p className="mt-2 text-gray-500 text-sm">
Buscando os melhores Pokémon para você
</p>
</div>
);
}

// Estado vazio - sem cartas
if (cards.length === 0) {
return (
<div className="flex flex-col items-center justify-center py-16">
<div className="text-6xl mb-4">🔍</div>
<h3 className="text-2xl font-bold text-gray-800 mb-2">
Nenhuma carta encontrada
</h3>
<p className="text-gray-600 text-center max-w-md">
Tente buscar por outro nome ou aguarde o carregamento das cartas iniciais.
</p>
</div>
);
}

// Grade de cartas
return (
<div className="w-full">
{/* Contador de resultados */}
<div className="mb-6 flex items-center justify-between">
<p className="text-gray-700 font-medium">
{cards.length} {cards.length === 1 ? "carta encontrada" : "cartas encontradas"}
</p>
{favorites.length > 0 && (
<p className="text-gray-600 text-sm">
{favorites.length} {favorites.length === 1 ? "favorita" : "favoritas"}
</p>
)}
</div>

  {/* Grade responsiva */}
  <div className="
    grid 
    grid-cols-1 
    sm:grid-cols-2 
    md:grid-cols-3 
    lg:grid-cols-4 
    xl:grid-cols-5 
    gap-6
  ">
    {cards.map((card) => (
      <CardItem
        key={card.id}
        card={card}
        isFavorite={isFavorite(card.id)}
        onToggleFavorite={onToggleFavorite}
        onClick={onCardClick}
      />
    ))}
  </div>

  {/* Aviso de limite */}
  {cards.length === 15 && (
    <div className="mt-8 text-center">
      <p className="text-gray-500 text-sm">
        Mostrando máximo de 15 cartas. Refine sua busca para resultados mais específicos.
      </p>
    </div>
  )}
</div>

);
}