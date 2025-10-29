

/**

- Funções de validação para formulários e dados
  */

/**

- Valida se um campo está vazio
- @param value - Valor a ser validado
- @returns boolean indicando se está vazio
  */
  export function isEmpty(value: string | null | undefined): boolean {
  return !value || value.trim().length === 0;
  }

/**

- Valida credenciais de login
- @param username - Nome de usuário
- @param password - Senha
- @returns Objeto com resultado e mensagem de erro
  */
  export function validateLoginCredentials(
  username: string,
  password: string
  ): { isValid: boolean; error?: string } {
  if (isEmpty(username) && isEmpty(password)) {
  return {
  isValid: false,
  error: "Preencha todos os campos",
  };
  }

if (isEmpty(username)) {
return {
isValid: false,
error: "Digite seu usuário",
};
}

if (isEmpty(password)) {
return {
isValid: false,
error: "Digite sua senha",
};
}

// Validação de tamanho mínimo
if (username.trim().length < 3) {
return {
isValid: false,
error: "Usuário deve ter no mínimo 3 caracteres",
};
}

if (password.length < 3) {
return {
isValid: false,
error: "Senha deve ter no mínimo 3 caracteres",
};
}

return { isValid: true };
}

/**

- Valida termo de busca
- @param searchTerm - Termo de busca
- @returns boolean indicando se é válido
  */
  export function validateSearchTerm(searchTerm: string): boolean {
  // Permite buscas vazias (retorna todas as cartas)
  if (isEmpty(searchTerm)) {
  return true;
  }

// Valida se tem pelo menos 2 caracteres
return searchTerm.trim().length >= 2;
}

/**

- Sanitiza string removendo caracteres especiais
- @param value - String a ser sanitizada
- @returns String sanitizada
  */
  export function sanitizeString(value: string): string {
  return value
  .trim()
  .replace(/[<>]/g, "") // Remove < e >
  .replace(/\s+/g, " "); // Remove múltiplos espaços
  }

/**

- Valida ID de carta (formato da API Pokémon TCG)
- @param cardId - ID da carta
- @returns boolean indicando se é válido
  */
  export function validateCardId(cardId: string): boolean {
  // IDs da API geralmente têm formato: base1-1, xy1-1, etc.
  const cardIdPattern = /^[a-zA-Z0-9]+-[a-zA-Z0-9]+$/;
  return cardIdPattern.test(cardId);
  }

/**

- Valida se um array não está vazio
- @param array - Array a ser validado
- @returns boolean indicando se não está vazio
  */
  export function isNotEmptyArray<T>(array: T[] | null | undefined): boolean {
  return Array.isArray(array) && array.length > 0;
  }

/**

- Valida URL de imagem
- @param url - URL a ser validada
- @returns boolean indicando se é válida
  */
  export function isValidImageUrl(url: string): boolean {
  try {
  const urlObj = new URL(url);
  return (
  urlObj.protocol === "http:" ||
  urlObj.protocol === "https:"
  ) && (
  url.endsWith(".jpg") ||
  url.endsWith(".jpeg") ||
  url.endsWith(".png") ||
  url.endsWith(".webp")
  );
  } catch {
  return false;
  }
  }

/**

- Formata mensagem de erro para exibição
- @param error - Erro capturado
- @returns Mensagem formatada
  */
  export function formatErrorMessage(error: unknown): string {
  if (typeof error === "string") {
  return error;
  }

if (error instanceof Error) {
return error.message;
}

return "Ocorreu um erro inesperado";
}