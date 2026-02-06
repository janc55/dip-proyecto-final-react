import React, { useState } from 'react';
import { Trash2, Edit2, Check, X, Square, CheckSquare, Loader2 } from 'lucide-react';

const TaskItem = ({ task, onUpdate, onDelete, onToggle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const handleUpdate = async () => {
    if (editedName.trim() === task.name) {
      setIsEditing(false);
      return;
    }
    setIsActionLoading(true);
    try {
      await onUpdate(task.id, editedName);
      setIsEditing(false);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleToggle = async () => {
    setIsActionLoading(true);
    try {
      await onToggle(task.id, !task.done);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Eliminar esta tarea?')) {
      setIsActionLoading(true);
      try {
        await onDelete(task.id);
      } finally {
        setIsActionLoading(false);
      }
    }
  };

  return (
    <div
      className={`
        relative flex items-center gap-4 py-3 px-4 rounded-xl
        bg-white/[0.04] border border-white/[0.06]
        hover:bg-white/[0.06] hover:border-white/[0.1]
        transition-all duration-200
        ${task.done ? 'opacity-70' : ''}
      `}
    >
      {/* Checkbox */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={isActionLoading}
        className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-white/10 transition-all duration-200 disabled:opacity-50"
        aria-label={task.done ? 'Marcar como pendiente' : 'Marcar como completada'}
      >
        {task.done ? (
          <CheckSquare className="w-7 h-7 stroke-[1.7] text-emerald-400" />
        ) : (
          <Square className="w-6 h-6" />
        )}
      </button>

      {/* Nombre de la tarea */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="flex-1 min-w-0 py-2.5 px-4 text-base rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleUpdate();
                if (e.key === 'Escape') setIsEditing(false);
              }}
            />
            <button
              type="button"
              onClick={handleUpdate}
              className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
            >
              <Check className="w-7 h-7 stroke-[1.7]" />
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:bg-white/10 transition-colors"
            >
              <X className="w-7 h-7 stroke-[1.7]" />
            </button>
          </div>
        ) : (
          <span
            className={`
              block text-lg truncate font-medium transition-all
              ${task.done ? 'line-through text-slate-500 opacity-70' : 'text-slate-100'}
            `}
          >
            {task.name}
          </span>
        )}
      </div>

      {/* Botones de acción - siempre visibles en la misma fila */}
      {!isEditing && (
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="w-12 h-12 flex items-center justify-center rounded-xl text-indigo-400 bg-white/5 hover:bg-indigo-500/20 hover:text-indigo-300 transition-all"
            aria-label="Editar tarea"
          >
            <Edit2 className="w-7 h-7 stroke-[1.7]" />
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="w-12 h-12 flex items-center justify-center rounded-xl text-rose-400 bg-white/5 hover:bg-rose-500/20 hover:text-rose-300 transition-all"
            aria-label="Eliminar tarea"
          >
            <Trash2 className="w-7 h-7 stroke-[1.7]" />
          </button>
        </div>
      )}

      {/* Overlay de carga */}
      {isActionLoading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-slate-900/60 backdrop-blur-[2px]">
          <Loader2 className="w-5 h-5 animate-spin text-indigo-400" />
        </div>
      )}
    </div>
  );
};

export default TaskItem;
