import React, { useState } from 'react';
import { register } from '../../api/auth';
import { UserPlus, User, Lock, Loader2, CheckCircle2 } from 'lucide-react';

const Register = ({ onSwitch }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await register(username, password);
      setSuccess(true);
      setTimeout(() => onSwitch(), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear la cuenta. Intenta con otro usuario.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="glass-card max-w-auth animate-fade-in text-center py-14 mx-auto">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-100 mb-2">¡Cuenta creada!</h2>
        <p className="text-slate-400">Redirigiendo al login...</p>
      </div>
    );
  }

  return (
    <div className="glass-card max-w-auth animate-fade-in mx-auto">
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <UserPlus className="w-7 h-7 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-100 mb-1">Crear cuenta</h2>
        <p className="text-slate-400 text-sm">Únete para gestionar tus tareas</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Nombre de usuario</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all text-base text-slate-100"
              placeholder="Elige un nombre único"
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
            'Crear cuenta'
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-white/10 text-center">
        <span className="text-slate-400 text-sm">¿Ya tienes cuenta? </span>
        <button
          type="button"
          onClick={onSwitch}
          className="text-indigo-400 font-bold text-sm hover:text-indigo-300 hover:underline bg-transparent p-0 border-none cursor-pointer"
        >
          Inicia sesión
        </button>
      </div>
    </div>
  );
};

export default Register;
