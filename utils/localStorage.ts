// Chaves usadas no localStorage
export const STORAGE_KEYS = {
IS_LOGGED_IN: "isLoggedIn",
USERNAME: "username",
FAVORITES: "pokemon_favorites",
} as const;

/**

- Salva um item no localStorage
- @param key - Chave do item
- @param value - Valor a ser salvo (será convertido para JSON)
- @returns boolean indicando sucesso
  */
  export function setItem<T>(key: string, value: T): boolean {
  try {
  const serializedValue = JSON.stringify(value);
  localStorage.setItem(key, serializedValue);
  return true;
  } catch (error) {
  console.error(`Erro ao salvar ${key} no localStorage:`, error);
  return false;
  }
  }

/**

- Recupera um item do localStorage
- @param key - Chave do item
- @returns Valor recuperado ou null se não existir
  */
  export function getItem<T>(key: string): T | null {
  try {
  const item = localStorage.getItem(key);
  if (item === null) {
  return null;
  }
  return JSON.parse(item) as T;
  } catch (error) {
  console.error(`Erro ao recuperar ${key} do localStorage:`, error);
  return null;
  }
  }

/**

- Remove um item do localStorage
- @param key - Chave do item a ser removido
- @returns boolean indicando sucesso
  */
  export function removeItem(key: string): boolean {
  try {
  localStorage.removeItem(key);
  return true;
  } catch (error) {
  console.error(`Erro ao remover ${key} do localStorage:`, error);
  return false;
  }
  }

/**

- Limpa todos os itens do localStorage
- @returns boolean indicando sucesso
  */
  export function clear(): boolean {
  try {
  localStorage.clear();
  return true;
  } catch (error) {
  console.error("Erro ao limpar localStorage:", error);
  return false;
  }
  }

/**

- Verifica se uma chave existe no localStorage
- @param key - Chave a ser verificada
- @returns boolean indicando se existe
  */
  export function hasItem(key: string): boolean {
  try {
  return localStorage.getItem(key) !== null;
  } catch (error) {
  console.error(`Erro ao verificar ${key} no localStorage:`, error);
  return false;
  }
  }

/**

- Funções específicas para autenticação
  */
  export const auth = {
  /**
  - Verifica se o usuário está logado
    */
    isLoggedIn(): boolean {
    return getItem<string>(STORAGE_KEYS.IS_LOGGED_IN) === "true";
    },

/**

- Salva o estado de login
  */
  setLoggedIn(value: boolean): void {
  setItem(STORAGE_KEYS.IS_LOGGED_IN, value.toString());
  },

/**

- Recupera o username salvo
  */
  getUsername(): string | null {
  return getItem<string>(STORAGE_KEYS.USERNAME);
  },

/**

- Salva o username
  */
  setUsername(username: string): void {
  setItem(STORAGE_KEYS.USERNAME, username);
  },

/**

- Remove dados de autenticação
  */
  clearAuth(): void {
  removeItem(STORAGE_KEYS.IS_LOGGED_IN);
  removeItem(STORAGE_KEYS.USERNAME);
  },
  };

/**

- Funções específicas para favoritos
  */
  export const favorites = {
  /**
  - Recupera lista de favoritos
    */
    get(): string[] {
    return getItem<string[]>(STORAGE_KEYS.FAVORITES) || [];
    },

/**

- Salva lista de favoritos
  */
  set(favoriteIds: string[], cardId: string): void {
  setItem(STORAGE_KEYS.FAVORITES, favoriteIds);
  },

/**

- Adiciona um favorito
  */
  add(cardId: string): void {
  const current = this.get();
  if (!current.includes(cardId)) {
  this.set(current, cardId);
  }
  },

/**

- Remove um favorito
  */
  remove(cardId: string): void {
  const current = this.get();
  this.set(current.filter(id => id !== cardId));
  },

/**

- Verifica se uma carta está nos favoritos
  */
  has(cardId: string): boolean {
  return this.get().includes(cardId);
  },

/**

- Remove todos os favoritos
  */
  clear(): void {
  removeItem(STORAGE_KEYS.FAVORITES);
  },

/**

- Retorna a quantidade de favoritos
  */
  count(): number {
  return this.get().length;
  },
  };