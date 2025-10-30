
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import Footer from "@/components/layout/Footer";

/**

- Página de Login
- Rota: /
  */
  export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

// Verifica se já está logado ao carregar a página
useEffect(() => {
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
if (isLoggedIn) {
// Redireciona para /cards se já estiver logado
router.push("/cards");
}
}, [router]);

/**

- Handler do formulário de login
  */
  const handleLogin = async (username: string, password: string) => {
  setLoading(true);
  setError(null);

try {
  // Chama a API de autenticação
  const response = await fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (response.ok && data.success) {
    // Login bem-sucedido
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
    
    // Redireciona para a página de cartas
    router.push('/cards');
  } else {
    // Login falhou
    setError(data.message || 'Credenciais inválidas');
  }
} catch (err) {
  console.error('Erro ao fazer login:', err);
  setError('Erro ao conectar com o servidor. Tente novamente.');
} finally {
  setLoading(false);
}

};

return (
<div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
{/* Animação de fundo */}
<div className="absolute inset-0 overflow-hidden pointer-events-none">
<div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
</div>

  {/* Formulário de Login */}
  <div className="relative z-10">
    <LoginForm 
      onSubmit={handleLogin}
      loading={loading}
      error={error}
    />
  </div>
</div>

);
}
