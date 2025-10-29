import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('pokemon_favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);
  
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('pokemon_favorites', JSON.stringify(favorites));
      } catch (error) {
        console.error('Erro ao salvar favoritos:', error);
      }
    }
  }, [favorites, isLoaded]);

  /**
   * Adiciona ou remove uma carta dos favoritos
   * @param cardId - ID da carta a ser favoritada/desfavoritada
   */
  const toggleFavorite = (cardId: string) => {
    setFavorites((prev) => {
      if (prev.includes(cardId)) {
        // Remove dos favoritos
        return prev.filter((id) => id !== cardId);
      } else {
        // Adiciona aos favoritos
        return [...prev, cardId];
      }
    });
  };

  /**
   * Verifica se uma carta está nos favoritos
   * @param cardId - ID da carta a ser verificada
   * @returns true se a carta está favoritada, false caso contrário
   */
  const isFavorite = (cardId: string): boolean => {
    return favorites.includes(cardId);
  };

  /**
   * Remove todos os favoritos (usado no logout)
   */
  const clearFavorites = () => {
    setFavorites([]);
    try {
      localStorage.removeItem('pokemon_favorites');
    } catch (error) {
      console.error('Erro ao limpar favoritos:', error);
    }
  };

  /**
   * Adiciona uma carta aos favoritos (se ainda não estiver)
   * @param cardId - ID da carta a ser adicionada
   */
  const addFavorite = (cardId: string) => {
    if (!favorites.includes(cardId)) {
      setFavorites((prev) => [...prev, cardId]);
    }
  };

  /**
   * Remove uma carta dos favoritos (se estiver favoritada)
   * @param cardId - ID da carta a ser removida
   */
  const removeFavorite = (cardId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== cardId));
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    addFavorite,
    removeFavorite,
    favoritesCount: favorites.length,
    isLoaded,
  };
}

