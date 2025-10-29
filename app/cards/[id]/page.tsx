"use client;"

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import CardDetails from "@/components/cards/CardDetails";
import { useFavorites } from "../../../hooks/useFavorite";
import { fetchCardById } from "@/utils/api";

interface PokemonCard {
id: string;
name: string;
images: {
small: string;
large: string;
};
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

/**

- Página de Detalhes da Carta
- Rota: /cards/[id]
  */
  export default function CardDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const cardId = params.id as string;

const [card, setCard] = useState<PokemonCard | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

const { toggleFavorite, isFavorite } = useFavorites();

// Verifica autenticação e carrega carta
useEffect(() => {
checkAuthAndLoadCard();
}, [cardId]);

const checkAuthAndLoadCard = async () => {
// Verifica se está logado
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
if (!isLoggedIn) {
router.push("/");
return;
}

// Carrega os dados da carta
await loadCard();

};

const loadCard = async () => {
setLoading(true);
setError(null);

try {
  const data = await fetchCardById(cardId);
  setCard(data);
} catch (err) {
  console.error('Erro ao carregar carta:', err);
  setError('Erro ao carregar detalhes da carta');
} finally {
  setLoading(false);
}

};

const handleClose = () => {
router.push("/cards");
};

const handleToggleFavorite = (id: string) => {
toggleFavorite(id);
};

// Loading state
if (loading) {
return (
<div className="min-h-screen flex items-center justify-center bg-gray-100">
<div className="text-center">
<div className="inline-block w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
<p className="mt-4 text-gray-600 font-medium text-lg">
Carregando detalhes da carta…
</p>
</div>
</div>
);
}

// Error state
if (error || !card) {
return (
<div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
<div className="text-center max-w-md">
<div className="text-6xl mb-4">😢</div>
<h1 className="text-3xl font-bold text-gray-800 mb-2">
Carta não encontrada
</h1>
<p className="text-gray-600 mb-6">
{error || "Não foi possível carregar os detalhes desta carta."}
</p>
<button
onClick={handleClose}
className="
px-6 
py-3 
bg-blue-600 
hover:bg-blue-700 
text-white 
rounded-lg 
font-semibold
transition
"
>
Voltar para as cartas
</button>
</div>
</div>
);
}

// Success state
return (
<CardDetails
card={card}
isFavorite={isFavorite(card.id)}
onToggleFavorite={handleToggleFavorite}
onClose={handleClose}
/>
);
}