import { useState, useEffect } from "react";

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

interface ApiResponse {
data: PokemonCard[];
page: number;
pageSize: number;
count: number;
totalCount: number;
}

/**

- Hook customizado para gerenciar cartas Pokémon
- Realiza chamadas à API do Pokémon TCG
  */
  export function useCards() {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

// Carregar cartas iniciais ao montar o componente
useEffect(() => {
fetchInitialCards();
}, []);

/**

- Busca cartas iniciais (sem filtro de busca)
  */
  const fetchInitialCards = async () => {
  await fetchCards();
  };

/**

- Busca cartas na API do Pokémon TCG
- @param search - Termo de busca opcional (nome da carta)
  */
  const fetchCards = async (search?: string) => {
  setLoading(true);
  setError(null);


try {
  // Define a query de busca
  const query = search 
    ? `name:${encodeURIComponent(search)}` 
    : 'supertype:pokemon';
  
  // Monta a URL com os parâmetros
  const url = `https://api.pokemontcg.io/v2/cards?q=${query}&orderBy=number,name&pageSize=15`;
  
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Erro ao buscar cartas');
  }

  const data: ApiResponse = await response.json();
  setCards(data.data);
} catch (err) {
  console.error('Erro ao buscar cartas:', err);
  setError('Erro ao carregar cartas. Tente novamente.');
  setCards([]);
} finally {
  setLoading(false);
}

};

/**

- Busca uma carta específica por ID
- @param cardId - ID da carta a ser buscada
- @returns PokemonCard ou null se não encontrada
  */
  const fetchCardById = async (cardId: string): Promise<PokemonCard | null> => {
  setLoading(true);
  setError(null);

try {
  const url = `https://api.pokemontcg.io/v2/cards/${cardId}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Carta não encontrada');
  }

  const data = await response.json();
  return data.data;
} catch (err) {
  console.error('Erro ao buscar carta:', err);
  setError('Erro ao carregar detalhes da carta.');
  return null;
} finally {
  setLoading(false);
}

};

/**

- Realiza busca com o termo atual
  */
  const search = () => {
  fetchCards(searchTerm);
  };

/**

- Atualiza o termo de busca
- @param term - Novo termo de busca
  */
  const updateSearchTerm = (term: string) => {
  setSearchTerm(term);
  };

/**

- Limpa os resultados e erro
  */
  const clearResults = () => {
  setCards([]);
  setError(null);
  setSearchTerm("");
  };

/**

- Recarrega as cartas (útil para refresh)
  */
  const refresh = () => {
  if (searchTerm) {
  fetchCards(searchTerm);
  } else {
  fetchInitialCards();
  }
  };

return {
cards,
loading,
error,
searchTerm,
fetchCards,
fetchCardById,
search,
updateSearchTerm,
clearResults,
refresh,
};
}