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
            <input
                type="text"
                className="w-full pr-16 bg-white/5 border-white/10 hover:border-white/20 focus:bg-white/10 transition-all text-lg py-4 mb-0"
                placeholder="What needs to be done?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
            />
            <button
                type="submit"
                disabled={isSubmitting || !name.trim()}
                className="absolute right-2 top-2 bottom-2 w-12 h-12 p-0 flex items-center justify-center rounded-xl transition-all"
            >
                {isSubmitting ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                    <Plus className="w-6 h-6" />
                )}
            </button>
        </form>
    );
};

export default TaskForm;
