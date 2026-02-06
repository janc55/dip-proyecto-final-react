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
  const [authMode, setAuthMode] = useState('login');

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getTasks();
      setTasks(response.data || []);
    } catch (err) {
      setError('No se pudieron cargar las tareas. Reintenta.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleAddTask = async (name) => {
    try {
      const newTask = await createTask(name);
      setTasks((prevTasks) => [newTask, ...prevTasks]);
    } catch (err) {
      const msg =
        err.response?.status === 401
          ? 'Sesión expirada. Por favor entra de nuevo.'
          : err.response?.data?.message || 'Error al crear la tarea.';
      setError(msg);
    }
  };

  const handleUpdateTask = async (id, name) => {
    try {
      await updateTask(id, name);
      setTasks((prevTasks) => prevTasks.map((t) => (t.id === id ? { ...t, name } : t)));
    } catch {
      setError('Error al actualizar la tarea.');
    }
  };

  const handleToggleTask = async (id, done) => {
    try {
      await toggleTaskStatus(id, done);
      setTasks((prevTasks) => prevTasks.map((t) => (t.id === id ? { ...t, done } : t)));
    } catch {
      setError('Error al cambiar el estado.');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
    } catch {
      setError('Error al eliminar la tarea.');
    }
  };

  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 min-h-[300px]">
        <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
        <p className="text-slate-400 font-medium">Cargando sesión...</p>
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
    <div className="glass-card max-w-app animate-fade-in mx-auto">
      <header className="header-section">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center">
            <ListTodo className="w-8 h-8 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-100">TaskMaster</h1>
            <p className="text-slate-400 text-sm">Organiza tu día con estilo</p>
          </div>
        </div>
        <button
          type="button"
          onClick={logoutUser}
          className="btn-secondary flex items-center gap-2 py-3 px-6 text-sm font-semibold hover:bg-white/10"
        >
          <LogOut className="w-5 h-5" />
          Cerrar sesión
        </button>
      </header>

      <div className="mb-8">
        <TaskForm onAdd={handleAddTask} />
      </div>

      <div className="tasks-container">
        <div className="flex items-center justify-between px-1 mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Tus tareas ({tasks.length})
          </h2>
          <button
            type="button"
            onClick={fetchTasks}
            disabled={isLoading}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/10 transition-colors disabled:opacity-50"
            aria-label="Actualizar lista"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {error && (
          <div className="py-3 px-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
            {error}
          </div>
        )}

        {isLoading && tasks.length === 0 ? (
          <div className="flex flex-col items-center py-16 gap-3">
            <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
            <p className="text-slate-400">Sincronizando...</p>
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
