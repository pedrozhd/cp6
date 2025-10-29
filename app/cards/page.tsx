"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import SearchBar from "@/components/layout/SearchBar";
import CardGrid from "@/components/cards/CardGrid";
import { useFavorites } from "../../hooks/useFavorite";
import { fetchCards } from "@/utils/api";

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
}

/**

- Página de Lista de Cartas
- Rota: /cards
  */
  export default function CardsPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isChecking, setIsChecking] = useState(true);

const {
favorites,
toggleFavorite,
clearFavorites,
favoritesCount
} = useFavorites();

// Verifica autenticação
useEffect(() => {
checkAuth();
}, []);

// Carrega cartas iniciais
useEffect(() => {
if (isLoggedIn && cards.length === 0) {
loadInitialCards();
}
}, [isLoggedIn]);

const checkAuth = () => {
const loggedIn = localStorage.getItem("isLoggedIn") === "true";
const savedUsername = localStorage.getItem("username") || "";

if (!loggedIn) {
  router.push('/');
  return;
}

setIsLoggedIn(true);
setUsername(savedUsername);
setIsChecking(false);

};

const loadInitialCards = async () => {
setLoading(true);
try {
const data = await fetchCards();
setCards(data);
} catch (error) {
console.error("Erro ao carregar cartas:", error);
} finally {
setLoading(false);
}
};

const handleSearch = async () => {
setLoading(true);
try {
const data = await fetchCards(searchTerm);
setCards(data);
} catch (error) {
console.error("Erro ao buscar cartas:", error);
setCards([]);
} finally {
setLoading(false);
}
};

const handleClearSearch = () => {
setSearchTerm("");
loadInitialCards();
};

const handleLogout = () => {
// Limpa todos os dados do localStorage
localStorage.removeItem("isLoggedIn");
localStorage.removeItem("username");
clearFavorites();

// Redireciona para login
router.push('/');

};

const handleCardClick = (card: PokemonCard) => {
// Navega para página de detalhes
router.push(`/cards/${card.id}`);
};

// Loading inicial
if (isChecking) {
return (
<div className="min-h-screen flex items-center justify-center bg-gray-100">
<div className="text-center">
<div className="inline-block w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
<p className="mt-4 text-gray-600 font-medium">Carregando…</p>
</div>
</div>
);
}

return (
<div className="min-h-screen flex flex-col bg-gray-100">
{/* Header */}
<Header
favoritesCount={favoritesCount}
username={username}
onLogout={handleLogout}
/>

  {/* Search Bar */}
  <SearchBar
    value={searchTerm}
    onChange={setSearchTerm}
    onSearch={handleSearch}
    onClear={handleClearSearch}
    loading={loading}
  />

  {/* Cards Grid */}
  <main className="flex-1 max-w-7xl w-full mx-auto px-4 pb-8">
    <CardGrid
      cards={cards}
      favorites={favorites}
      onToggleFavorite={toggleFavorite}
      onCardClick={handleCardClick}
      loading={loading}
    />
  </main>
</div>

);
}