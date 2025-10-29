

/**

- Funções de formatação e utilidades gerais
  */

/**

- Formata o nome do tipo do Pokémon com cores
- @param type - Tipo do Pokémon
- @returns Classe CSS do Tailwind para o tipo
  */
  export function getTypeColor(type: string): string {
  const typeColors: Record<string, string> = {
  Grass: "bg-green-100 text-green-800",
  Fire: "bg-red-100 text-red-800",
  Water: "bg-blue-100 text-blue-800",
  Lightning: "bg-yellow-100 text-yellow-800",
  Psychic: "bg-purple-100 text-purple-800",
  Fighting: "bg-orange-100 text-orange-800",
  Darkness: "bg-gray-800 text-white",
  Metal: "bg-gray-400 text-gray-900",
  Dragon: "bg-indigo-100 text-indigo-800",
  Fairy: "bg-pink-100 text-pink-800",
  Colorless: "bg-gray-100 text-gray-800",
  };

return typeColors[type] || "bg-gray-100 text-gray-800";
}

/**

- Formata número da Pokédex com zeros à esquerda
- @param number - Número da Pokédex
- @returns String formatada (ex: #001)
  */
  export function formatPokedexNumber(number: number): string {
  return `#${number.toString().padStart(3, '0')}`;
  }

/**

- Trunca texto com ellipsis
- @param text - Texto a ser truncado
- @param maxLength - Comprimento máximo
- @returns Texto truncado
  */
  export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
  return text;
  }
  return `${text.slice(0, maxLength)}...`;
  }

/**

- Capitaliza primeira letra de cada palavra
- @param text - Texto a ser capitalizado
- @returns Texto capitalizado
  */
  export function capitalizeWords(text: string): string {
  return text
  .split(" ")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  .join(" ");
  }

/**

- Formata array de tipos em string
- @param types - Array de tipos
- @returns String formatada (ex: “Fire, Water”)
  */
  export function formatTypes(types: string[]): string {
  return types.join(", ");
  }

/**

- Gera uma cor aleatória para placeholder
- @returns Classe CSS do Tailwind para cor de fundo
  */
  export function getRandomColor(): string {
  const colors = [
  "bg-red-200",
  "bg-blue-200",
  "bg-green-200",
  "bg-yellow-200",
  "bg-purple-200",
  "bg-pink-200",
  "bg-indigo-200",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
  }

/**



/**

- Gera ID único para elementos
- @param prefix - Prefixo do ID
- @returns ID único
  */
  export function generateUniqueId(prefix: string = "id"): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

/**

- Formata raridade da carta com ícone
- @param rarity - Raridade da carta
- @returns Objeto com texto e classe CSS
  */
  export function formatRarity(rarity: string): { text: string; className: string } {
  const rarityMap: Record<string, { text: string; className: string }> = {
  "Common": {
  text: "Comum",
  className: "bg-gray-100 text-gray-800"
  },
  "Uncommon": {
  text: "Incomum",
  className: "bg-green-100 text-green-800"
  },
  "Rare": {
  text: "Raro",
  className: "bg-blue-100 text-blue-800"
  },
  "Rare Holo": {
  text: "Raro Holográfico",
  className: "bg-purple-100 text-purple-800"
  },
  "Ultra Rare": {
  text: "Ultra Raro",
  className: "bg-yellow-100 text-yellow-800"
  },
  "Secret Rare": {
  text: "Secreta",
  className: "bg-red-100 text-red-800"
  },
  };

return rarityMap[rarity] || {
text: rarity,
className: "bg-gray-100 text-gray-800"
};
}

/**

- Verifica se o código está rodando no cliente
- @returns boolean indicando se está no cliente
  */
  export function isClient(): boolean {
  return typeof window !== "undefined";
  }

/**

- Converte HP para número (remove sufixo se houver)
- @param hp - HP da carta (ex: “120” ou “120 HP”)
- @returns Número do HP
  */
  export function parseHP(hp: string | undefined): number {
  if (!hp) return 0;
  return parseInt(hp.replace(/\D/g, ""), 10) || 0;
  }