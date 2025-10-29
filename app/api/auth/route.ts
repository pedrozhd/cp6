import { auth } from "@/utils/localStorage";
import { NextRequest, NextResponse } from "next/server";

/**

- API Route de Autenticação
- POST /api/auth
- Valida credenciais do usuário comparando com senha fixa da variável de ambiente
  */

interface LoginRequest {
username: string;
password: string;
}

interface LoginResponse {
success: boolean;
message: string;
username?: string;
}

/**

- POST /api/auth
- Endpoint para autenticação de usuário
  */
  export async function POST(request: NextRequest) {
  try {
  // Parse do body da requisição
  const body: LoginRequest = await request.json();
  const { username, password } = body;
  
  // Validação dos campos obrigatórios
  if (!username || !password) {
  return NextResponse.json(
  {
  success: false,
  message: "Usuário e senha são obrigatórios",
  } as LoginResponse,
  { status: 400 }
  );
  }
  
  // Validação de tamanho mínimo
  if (username.trim().length < 3) {
  return NextResponse.json(
  {
  success: false,
  message: "Usuário deve ter no mínimo 3 caracteres",
  } as LoginResponse,
  { status: 400 }
  );
  }
  
  if (password.length < 3) {
  return NextResponse.json(
  {
  success: false,
  message: "Senha deve ter no mínimo 3 caracteres",
  } as LoginResponse,
  { status: 400 }
  );
  }
  
  // Busca a senha fixa da variável de ambiente
  const FIXED_PASSWORD = process.env.AUTH_PASSWORD;
  
  // Verifica se a variável de ambiente está configurada
  if (!FIXED_PASSWORD) {
  console.error("ERRO: Variável de ambiente AUTH_PASSWORD não configurada!");
  return NextResponse.json(
  {
  success: false,
  message: "Erro de configuração do servidor",
  } as LoginResponse,
  { status: 500 }
  );
  }
  
  // Valida a senha
  if (password !== FIXED_PASSWORD) {
  return NextResponse.json(
  {
  success: false,
  message: "Senha incorreta",
  } as LoginResponse,
  { status: 401 }
  );
  }
  
  // Login bem-sucedido
  return NextResponse.json(
  {
  success: true,
  message: "Login realizado com sucesso",
  username: username.trim(),
  } as LoginResponse,
  { status: 200 }
  );

} catch (error) {
console.error("Erro no endpoint de autenticação:", error);

return NextResponse.json(
  {
    success: false,
    message: 'Erro interno do servidor',
  } as LoginResponse,
  { status: 500 }
)

}
}

/**

- GET /api/auth
- Endpoint para verificar se a API está funcionando
  */
  export async function GET() {
  return NextResponse.json(
  {
  message: "API de autenticação funcionando",
  endpoint: "POST/api/auth",
  requiredFields: ["username", "password"],
  },
  { status: 200 }
  );
  }

/**

- Outros métodos HTTP não são permitidos
  */
  export async function PUT() {
  return NextResponse.json(
  { message: "Método não permitido" },
  { status: 405 }
  );
  }

export async function DELETE() {
return NextResponse.json(
{ message: "Método não permitido" },
{ status: 405 }
);
}

export async function PATCH() {
return NextResponse.json(
{ message: "Método não permitido" },
{ status: 405 }
);
}