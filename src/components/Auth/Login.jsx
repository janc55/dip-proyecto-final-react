import React, { useState } from 'react';
import { login } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';
import { LogIn, User, Lock, Loader2 } from 'lucide-react';

const Login = ({ onSwitch }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { loginUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const { token } = await login(username, password);
      loginUser(token);
    } catch (err) {
      setError(err.response?.data?.message || 'Credenciales inválidas. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card max-w-auth animate-fade-in mx-auto">
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <LogIn className="w-7 h-7 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-100 mb-1">Bienvenido</h2>
        <p className="text-slate-400 text-sm">Ingresa tus datos para continuar</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Usuario</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all text-base text-slate-100"
              placeholder="Tu nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Contraseña</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="password"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all text-base text-slate-100"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {error && (
          <p className="text-rose-400 text-sm py-2 px-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full py-3.5 mt-2 text-base"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            'Entrar'
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-white/10 text-center">
        <span className="text-slate-400 text-sm">¿No tienes cuenta? </span>
        <button
          type="button"
          onClick={onSwitch}
          className="text-indigo-400 font-bold text-sm hover:text-indigo-300 hover:underline bg-transparent p-0 border-none cursor-pointer"
        >
          Crear una cuenta
        </button>
      </div>
    </div>
  );
};

export default Login;
