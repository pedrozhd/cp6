

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

interface SingleCardResponse {
data: PokemonCard;
}

// Configuração base da API
const API_BASE_URL = "https://api.pokemontcg.io/v2";
const DEFAULT_PAGE_SIZE = 15;

/**

- Busca cartas na API do Pokémon TCG
- @param search - Termo de busca opcional (nome da carta)
- @param pageSize - Quantidade de cartas por página (padrão: 15)
- @param page - Número da página (padrão: 1)
- @returns Promise com array de cartas
  */
  export async function fetchCards(
  search?: string,
  pageSize: number = DEFAULT_PAGE_SIZE,
  page: number = 1
  ): Promise<PokemonCard[]> {
  try {
  // Define a query de busca
  const query = search
  ? `name:${encodeURIComponent(search)}`
  : "supertype:pokemon";
  
  // Monta os parâmetros da URL
  const params = new URLSearchParams({
  q: query,
  orderBy: "number,name",
  pageSize: pageSize.toString(),
  page: page.toString(),
  });
  
  const url = `${API_BASE_URL}/cards?${params.toString()}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
  throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
  }
  
  const data: ApiResponse = await response.json();
  return data.data;
  } catch (error) {
  console.error("Erro ao buscar cartas:", error);
  throw error;
  }
  }

/**

- Busca uma carta específica por ID
- @param cardId - ID único da carta
- @returns Promise com os dados da carta
  */
  export async function fetchCardById(cardId: string): Promise<PokemonCard> {
  try {
  const url = `${API_BASE_URL}/cards/${cardId}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
  throw new Error(`Carta não encontrada: ${response.status}`);
  }
  
  const data: SingleCardResponse = await response.json();
  return data.data;
  } catch (error) {
  console.error("Erro ao buscar carta por ID:", error);
  throw error;
  }
  }

/**

- Busca cartas por tipo (Fire, Water, Grass, etc.)
- @param type - Tipo do Pokémon
- @param pageSize - Quantidade de cartas (padrão: 15)
- @returns Promise com array de cartas
  */
  export async function fetchCardsByType(
  type: string,
  pageSize: number = DEFAULT_PAGE_SIZE
  ): Promise<PokemonCard[]> {
  try {
  const params = new URLSearchParams({
  q: `types:${type}`,
  orderBy: "name",
  pageSize: pageSize.toString(),
  });
  
  const url = `${API_BASE_URL}/cards?${params.toString()}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
  throw new Error(`Erro na API: ${response.status}`);
  }
  
  const data: ApiResponse = await response.json();
  return data.data;
  } catch (error) {
  console.error("Erro ao buscar cartas por tipo:", error);
  throw error;
  }
  }

/**

- Busca cartas por número da Pokédex Nacional
- @param pokedexNumber - Número da Pokédex Nacional
- @returns Promise com array de cartas
  */
  export async function fetchCardsByPokedexNumber(
  pokedexNumber: number
  ): Promise<PokemonCard[]> {
  try {
  const params = new URLSearchParams({
  q: `nationalPokedexNumbers:${pokedexNumber}`,
  orderBy: "name",
  });
  
  const url = `${API_BASE_URL}/cards?${params.toString()}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
  throw new Error(`Erro na API: ${response.status}`);
  }
  
  const data: ApiResponse = await response.json();
  return data.data;
  } catch (error) {
  console.error("Erro ao buscar cartas por número da Pokédex:", error);
  throw error;
  }
  }

/**

- Valida se a resposta da API está no formato correto
- @param data - Dados retornados pela API
- @returns boolean indicando se é válido
  */
  export function isValidApiResponse(data:any): data is ApiResponse {
  return (
  data &&
  typeof data === "object" &&
  Array.isArray(data.data) &&
  typeof data.page === "number" &&
  typeof data.pageSize === "number"
  );
  }

/**

- Tratamento de erros específicos da API
- @param error - Erro capturado
- @returns Mensagem de erro amigável
  */
  export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
  if (error.message.includes("404")) {
  return "Carta não encontrada";
  }
  if (error.message.includes("500")) {
  return "Erro no servidor. Tente novamente mais tarde.";
  }
  if (error.message.includes("Failed to fetch")) {
  return "Erro de conexão. Verifique sua internet.";
  }
  return error.message;
  }
  return "Erro desconhecido ao buscar cartas";
  }