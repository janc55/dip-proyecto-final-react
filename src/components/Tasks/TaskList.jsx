import React from 'react';
import TaskItem from './TaskItem';
import { ClipboardList } from 'lucide-react';

const TaskList = ({ tasks, onUpdate, onDelete, onToggle }) => {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-12 px-6">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 text-secondary">
                    <ClipboardList className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
                <p className="text-secondary">Start by adding your first task above!</p>
            </div>
        );
    }

    return (
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
};

export default TaskList;
