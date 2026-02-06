import React from 'react';
import TaskItem from './TaskItem';
import { ClipboardList } from 'lucide-react';

const TaskList = ({ tasks, onUpdate, onDelete, onToggle }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 px-6 rounded-xl bg-white/[0.02] border border-white/[0.04]">
        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-500">
          <ClipboardList className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-semibold text-slate-300 mb-2">No hay tareas</h3>
        <p className="text-slate-500 text-sm">Añade tu primera tarea usando el campo de arriba</p>
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
