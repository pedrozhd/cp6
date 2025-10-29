import React, { useState } from "react";
import { Eye, EyeOff, User, Lock, LogIn } from "lucide-react";

interface LoginFormProps {
onSubmit: (username: string, password: string) => Promise<void>;
loading?: boolean;
error?: string | null;
}

/**

- Formulário de login completo
- Gerencia validações, estados e UX
  */
  export default function LoginForm({
  onSubmit,
  loading = false,
  error = null
  }: LoginFormProps) {

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [localError, setLocalError] = useState<string | null>(null);
const [touched, setTouched] = useState({
username: false,
password: false,
});

// Validações locais
const validateUsername = (): string | null => {
if (!username.trim()) {
return "Digite seu usuário";
}
if (username.trim().length < 3) {
return "Usuário deve ter no mínimo 3 caracteres";
}
return null;
};

const validatePassword = (): string | null => {
if (!password) {
return "Digite sua senha";
}
if (password.length < 3) {
return "Senha deve ter no mínimo 3 caracteres";
}
return null;
};

const usernameError = touched.username ? validateUsername() : null;
const passwordError = touched.password ? validatePassword() : null;

const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
setUsername(e.target.value);
setLocalError(null);
};

const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
setPassword(e.target.value);
setLocalError(null);
};

const handleUsernameBlur = () => {
setTouched(prev => ({ …prev, username: true }));
};

const handlePasswordBlur = () => {
setTouched(prev => ({ …prev, password: true }));
};

const togglePasswordVisibility = () => {
setShowPassword(!showPassword);
};

const handleSubmit = async () => {
// Marca todos os campos como touched
setTouched({ username: true, password: true });
setLocalError(null);

// Valida antes de enviar
const usernameValidation = validateUsername();
const passwordValidation = validatePassword();

if (usernameValidation || passwordValidation) {
  setLocalError('Preencha todos os campos corretamente');
  return;
}

// Chama callback do pai
try {
  await onSubmit(username, password);
} catch (err) {
  setLocalError('Erro ao fazer login. Tente novamente.');
}

};

const handleKeyPress = (e: React.KeyboardEvent) => {
if (e.key === "Enter" && !loading) {
handleSubmit();
}
};

const displayError = error || localError;

return (
<div className="w-full max-w-md">
<div className="bg-white rounded-2xl shadow-2xl p-8">

    {/* Header */}
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
        <span className="text-3xl">🎴</span>
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        Pokémon TCG
      </h1>
      <p className="text-gray-600">
        Sistema de Favoritos
      </p>
    </div>

    {/* Formulário */}
    <div className="space-y-5">
      
      {/* Campo de Usuário */}
      <div>
        <label 
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Usuário
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <User size={20} />
          </div>
          <input
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            onBlur={handleUsernameBlur}
            onKeyPress={handleKeyPress}
            disabled={loading}
            placeholder="Digite seu usuário"
            className={`
              w-full 
              pl-11 
              pr-4 
              py-3 
              border-2
              ${usernameError ? 'border-red-300' : 'border-gray-300'}
              rounded-lg 
              focus:ring-2 
              focus:ring-blue-500 
              focus:border-blue-500
              outline-none
              transition-all
              disabled:bg-gray-100
              disabled:cursor-not-allowed
            `}
            autoComplete="username"
          />
        </div>
        {usernameError && (
          <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
            ⚠️ {usernameError}
          </p>
        )}
      </div>

      {/* Campo de Senha */}
      <div>
        <label 
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Senha
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Lock size={20} />
          </div>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            onKeyPress={handleKeyPress}
            disabled={loading}
            placeholder="Digite sua senha"
            className={`
              w-full 
              pl-11 
              pr-12 
              py-3 
              border-2
              ${passwordError ? 'border-red-300' : 'border-gray-300'}
              rounded-lg 
              focus:ring-2 
              focus:ring-blue-500 
              focus:border-blue-500
              outline-none
              transition-all
              disabled:bg-gray-100
              disabled:cursor-not-allowed
            `}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            disabled={loading}
            className="
              absolute 
              right-3 
              top-1/2 
              transform 
              -translate-y-1/2 
              text-gray-400
              hover:text-gray-600
              transition-colors
              disabled:opacity-50
            "
            title={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {passwordError && (
          <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
            ⚠️ {passwordError}
          </p>
        )}
      </div>

      {/* Mensagem de Erro Geral */}
      {displayError && (
        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <div className="flex items-start gap-2">
            <span className="text-lg">⚠️</span>
            <div className="flex-1">
              <p className="font-semibold text-sm">Erro ao fazer login</p>
              <p className="text-sm mt-0.5">{displayError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Botão de Login */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="
          w-full 
          bg-blue-600 
          hover:bg-blue-700 
          active:bg-blue-800
          disabled:bg-gray-400
          disabled:cursor-not-allowed
          text-white 
          font-semibold 
          py-3.5 
          rounded-lg 
          transition-all 
          duration-200 
          shadow-lg
          hover:shadow-xl
          focus:outline-none
          focus:ring-2
          focus:ring-blue-400
          focus:ring-offset-2
          flex
          items-center
          justify-center
          gap-2
        "
      >
        {loading ? (
          <>
            <div className="
              w-5 
              h-5 
              border-2 
              border-white 
              border-t-transparent 
              rounded-full 
              animate-spin
            "></div>
            <span>Entrando...</span>
          </>
        ) : (
          <>
            <LogIn size={20} />
            <span>Entrar</span>
          </>
        )}
      </button>
    </div>

    {/* Informações Adicionais */}
    <div className="mt-6 space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            Informações
          </span>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs text-blue-800 text-center">
          💡 <strong>Dica:</strong> A senha padrão é <code className="bg-blue-100 px-2 py-0.5 rounded font-mono">pokemon123</code>
        </p>
      </div>
    </div>
  </div>

  {/* Footer Info */}
  <div className="mt-6 text-center text-sm text-gray-500">
    <p>Projeto educacional - FIAP</p>
  </div>
</div>

);
}