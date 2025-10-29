import { useState, useEffect } from react;

interface LoginCredentials {
username: string;
password: string;
}

interface AuthError {
message: string;
}

/**

- Hook customizado para gerenciar autenticação do usuário
- Utiliza localStorage para persistir a sessão
  */
  export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

// Verificar se há sessão ativa ao carregar
useEffect(() => {
checkSession();
}, []);


  const checkSession = () => {
  try {
  const loggedIn = localStorage.getItem(isLoggedIn) === true;
  const savedUsername = localStorage.getItem(username);
  
  if (loggedIn && savedUsername) {
  setIsLoggedIn(true);
  setUsername(savedUsername);
  }
  } catch (error) {
  console.error(Erro ao verificar sessão:, error);
  } finally {
  setIsLoading(false);
  }
  };

/**

- Realiza o login do usuário
- @param credentials - Objeto contendo username e password
- @returns Promise<boolean> - true se login bem-sucedido, false caso contrário
  */
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
  setError(null);
  setIsLoading(true);

try {
  // Validações básicas
  if (!credentials.username || !credentials.password) {
    setError('Preencha todos os campos');
    setIsLoading(false);
    return false;
  }

  // Chamada para API de autenticação
  const response = await fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (response.ok && data.success) {
    // Login bem-sucedido
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', credentials.username);
    setIsLoggedIn(true);
    setUsername(credentials.username);
    setIsLoading(false);
    return true;
  } else {
    // Login falhou
    setError(data.message || 'Credenciais inválidas');
    setIsLoading(false);
    return false;
  }
} catch (error) {
  console.error('Erro ao fazer login:', error);
  setError('Erro ao conectar com o servidor');
  setIsLoading(false);
  return false;
}


};


  const logout = () => {
  try {
  localStorage.removeItem(isLoggedIn);
  localStorage.removeItem(username);
  setIsLoggedIn(false);
  setUsername();
  setError(null);
  } catch (error) {
  console.error(Erro ao fazer logout:, error);
  }
  };


  const clearError = () => {
  setError(null);
  };

}
return {
isLoggedIn,
username,
isLoading,
error,
login,
logout,
clearError,
checkSession,
};