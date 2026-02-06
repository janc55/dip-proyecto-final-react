import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { getTasks, createTask, updateTask, toggleTaskStatus, deleteTask } from './api/tasks';
import { ListTodo, LogOut, Loader2, RefreshCw } from 'lucide-react';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TaskForm from './components/Tasks/TaskForm';
import TaskList from './components/Tasks/TaskList';

function App() {
  const { user, logoutUser, loading: authLoading } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch (err) {
      setError('Could not fetch tasks. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const handleAddTask = async (name) => {
    try {
      const newTask = await createTask(name);
      setTasks([newTask, ...tasks]);
    } catch (err) {
      setError('Error creating task.');
    }
  };

  const handleUpdateTask = async (id, name) => {
    try {
      await updateTask(id, name);
      setTasks(tasks.map((t) => (t.id === id ? { ...t, name } : t)));
    } catch (err) {
      setError('Error updating task.');
    }
  };

  const handleToggleTask = async (id, done) => {
    try {
      await toggleTaskStatus(id, done);
      setTasks(tasks.map((t) => (t.id === id ? { ...t, done } : t)));
    } catch (err) {
      setError('Error toggling status.');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      setError('Error deleting task.');
    }
  };

  if (authLoading) {
    return (
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-secondary font-medium">Loading session...</p>
      </div>
    );
  }

  if (!user) {
    return authMode === 'login' ? (
      <Login onSwitch={() => setAuthMode('register')} />
    ) : (
      <Register onSwitch={() => setAuthMode('login')} />
    );
  }

  return (
    <div className="glass-card w-full max-w-2xl animate-fade-in">
      <header className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
            <ListTodo className="w-7 h-7 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">TaskMaster</h1>
            <p className="text-secondary text-sm">Stay productive</p>
          </div>
        </div>
        <button
          onClick={logoutUser}
          className="btn-secondary w-auto py-2 px-4 flex items-center gap-2 text-sm text-secondary hover:text-white"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </header>

      <div className="mb-8">
        <TaskForm onAdd={handleAddTask} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Your Tasks ({tasks.length})
          </h2>
          <button
            onClick={fetchTasks}
            disabled={isLoading}
            className="w-auto p-2 bg-transparent border-none text-secondary hover:text-white transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm mb-4">
            {error}
          </div>
        )}

        {isLoading && tasks.length === 0 ? (
          <div className="flex flex-col items-center py-12 gap-3">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-secondary">Syncing with server...</p>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
            onToggle={handleToggleTask}
          />
        )}
      </div>
    </div>
  );
}

export default App;
