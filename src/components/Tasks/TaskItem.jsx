import React, { useState } from 'react';
import { Trash2, Edit2, Check, X, Save, Square, CheckSquare, Loader2 } from 'lucide-react';

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
        if (window.confirm('Delete this task?')) {
            setIsActionLoading(true);
            try {
                await onDelete(task.id);
            } finally {
                setIsActionLoading(false);
            }
        }
    };

    return (
        <div className={`group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all ${task.done ? 'opacity-60' : ''}`}>
            <button
                onClick={handleToggle}
                disabled={isActionLoading}
                className="text-primary hover:scale-110 active:scale-95 transition-transform bg-transparent p-0 w-auto border-none"
            >
                {task.done ? (
                    <CheckSquare className="w-6 h-6 text-success" />
                ) : (
                    <Square className="w-6 h-6" />
                )}
            </button>

            <div className="flex-1 min-w-0">
                {isEditing ? (
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="m-0 py-1.5 px-3 text-base"
                            autoFocus
                        />
                        <button onClick={handleUpdate} className="w-10 h-10 p-0 rounded-lg bg-success/20 text-success hover:bg-success/30 border-none">
                            <Check className="w-5 h-5" />
                        </button>
                        <button onClick={() => setIsEditing(false)} className="w-10 h-10 p-0 rounded-lg bg-white/5 text-secondary hover:bg-white/10 border-none">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    <span className={`text-lg transition-all line-clamp-2 ${task.done ? 'line-through text-secondary' : 'text-white'}`}>
                        {task.name}
                    </span>
                )}
            </div>

            {!isEditing && (
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="w-10 h-10 p-0 rounded-lg bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 border-none"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="w-10 h-10 p-0 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 border-none"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            )}

            {isActionLoading && (
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] rounded-2xl flex items-center justify-center">
                    <Loader2 className="w-5 h-5 animate-spin" />
                </div>
            )}
        </div>
    );
};

export default TaskItem;
