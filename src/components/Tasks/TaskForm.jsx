import React, { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';

const TaskForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      await onAdd(name);
      setName('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <div className="flex gap-3 items-center bg-white/[0.03] p-1.5 rounded-2xl border border-white/10 focus-within:border-indigo-500/50 focus-within:bg-white/[0.06] focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all duration-300">
        <input
          type="text"
          className="flex-1 bg-transparent border-0 py-3 px-4 text-lg text-slate-100 placeholder:text-slate-500 focus:ring-0 focus:outline-none"
          placeholder="¿Qué hay que hacer hoy?"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={isSubmitting || !name.trim()}
          className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all duration-200"
        >
          {isSubmitting ? (
            <Loader2 className="w-7 h-7 animate-spin" />
          ) : (
            <Plus className="w-7 h-7" />
          )}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
