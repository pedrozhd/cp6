import React, { useState, useEffect } from 'react';
import { PokemonCard, PokemonImage, ApiResponse} from "../../types/pokemon";
import { Heart, LogOut, Search, X } from 'lucide-react';

// Simulação de autenticação e estados
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedCard, setSelectedCard] = useState<PokemonCard | null>(null);

  // Carregar estado de login e favoritos do localStorage
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    }
  }, []);

  // Carregar cartas iniciais
  useEffect(() => {
    if (isLoggedIn && cards.length === 0) {
      fetchCards();
    }
  }, [isLoggedIn]);

  // Salvar favoritos no localStorage
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites, isLoggedIn]);

  const handleLogin = () => {
    setError('');

    // Validação simples (senha fixa)
    const FIXED_PASSWORD = 'pokemon123';
    
    if (!username || !password) {
      setError('Preencha todos os campos');
      return;
    }

    if (password !== FIXED_PASSWORD) {
      setError('Senha incorreta');
      return;
    }

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('favorites');
    setIsLoggedIn(false);
    setFavorites([]);
    setCards([]);
    setUsername('');
    setPassword('');
  };

  const fetchCards = async (search: string = '') => {
    setLoading(true);
    try {
      const query = search ? `name:${search}` : 'supertype:pokemon';
      const url = `https://api.pokemontcg.io/v2/cards?q=${query}&orderBy=number,name&pageSize=15`;
      
      const response = await fetch(url);
      const data: ApiResponse = await response.json();
      setCards(data.data);
    } catch (err) {
      console.error('Erro ao buscar cartas:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchCards(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLoginKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const toggleFavorite = (cardId: string) => {
    setFavorites(prev => {
      if (prev.includes(cardId)) {
        return prev.filter(id => id !== cardId);
      }
      return [...prev, cardId];
    });
  };

  const isFavorite = (cardId: string) => favorites.includes(cardId);

  // Página de Login
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Pokémon TCG</h1>
            <p className="text-gray-600">Sistema de Favoritos</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Usuário
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleLoginKeyPress}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Digite seu usuário"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleLoginKeyPress}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Digite sua senha"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-lg"
            >
              Entrar
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Dica: senha padrão é pokemon123</p>
          </div>
        </div>
      </div>
    );
  }

  // Modal de detalhes da carta
  if (selectedCard) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Detalhes da Carta</h1>
            <button
              onClick={() => setSelectedCard(null)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition"
            >
              <X size={20} />
              Voltar
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">             

        <div className="md:w-1/2 p-6 flex justify-center items-center bg-gray-50">
                <img
                  src={selectedCard.images.large}
                  alt={selectedCard.name}
                  className="max-w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              
              <div className="md:w-1/2 p-8">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-bold text-gray-800">{selectedCard.name}</h2>
                  <button
                    onClick={() => toggleFavorite(selectedCard.id)}
                    className="p-3 rounded-full hover:bg-gray-100 transition"
                  >
                    <Heart
                      size={28}
                      className={isFavorite(selectedCard.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                    />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-700">HP:</span>
                    <span className="text-2xl font-bold text-red-600">{selectedCard.hp || 'N/A'}</span>
                  </div>

                  {selectedCard.nationalPokedexNumbers && selectedCard.nationalPokedexNumbers[0] && (
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-700">Número Nacional:</span>
                      <span className="text-xl">#{selectedCard.nationalPokedexNumbers[0]}</span>
                    </div>
                  )}

                  {selectedCard.types && selectedCard.types.length > 0 && (
                    <div>
                      <span className="font-semibold text-gray-700 block mb-2">Tipos:</span>
                      <div className="flex gap-2 flex-wrap">
                        {selectedCard.types.map((type) => (
                          <span
                            key={type}
                            className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedCard.number && (
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-700">Número da Carta:</span>
                      <span>{selectedCard.number}</span>
                    </div>
                  )}

                  {selectedCard.artist && (
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-700">Artista:</span>
                      <span>{selectedCard.artist}</span>
                    </div>
                  )}

                  {selectedCard.rarity && (
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-700">Raridade:</span>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                        {selectedCard.rarity}
                      </span>
                    </div>
                  )}

                  {selectedCard.set && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <p className="font-semibold text-gray-700 mb-2">Coleção:</p>
                      <p className="text-gray-600">{selectedCard.set.name}</p>
                      <p className="text-sm text-gray-500">{selectedCard.set.series}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Página principal - Lista de cartas
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Pokémon TCG Favoritos</h1>
            <p className="text-sm text-gray-600">{favorites.length} cartas favoritadas</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            <LogOut size={20} />
            Sair
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Buscar por nome da carta..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Carregando cartas...</p>
          </div>
        ) : cards.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Nenhuma carta encontrada</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {cards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div 
                  className="relative cursor-pointer"
                  onClick={() => setSelectedCard(card)}
                >
                  <img
                    src={card.images.large}
                    alt={card.name}
                    className="w-full h-auto"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(card.id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:scale-110 transition"
                  >
                    <Heart
                      size={24}
                      className={isFavorite(card.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                    />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800 mb-2 truncate">{card.name}</h3>
                  
                  <div className="space-y-2 text-sm">
                    {card.hp && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">HP:</span>
                        <span className="font-bold text-red-600">{card.hp}</span>
                      </div>
                    )}
                    
                    {card.nationalPokedexNumbers && card.nationalPokedexNumbers[0] && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Nº Nacional:</span>
                        <span className="font-semibold">#{card.nationalPokedexNumbers[0]}</span>
                      </div>
                    )}
                    
                    {card.types && card.types.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {card.types.map((type) => (
                          <span
                            key={type}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;