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
            setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="glass-card animate-fade-in text-center">
            <div className="mb-8">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <LogIn className="w-8 h-8 text-indigo-500" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                <p className="text-secondary">Please enter your details to sign in</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-left">
                    <label className="block text-sm font-medium mb-1.5 ml-1 text-secondary">Username</label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                        <input
                            type="text"
                            className="pl-12"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="text-left">
                    <label className="block text-sm font-medium mb-1.5 ml-1 text-secondary">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                        <input
                            type="password"
                            className="pl-12"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {error && <p className="text-danger text-sm mt-2">{error}</p>}

                <button type="submit" disabled={isLoading} className="mt-6">
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
                </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10 text-sm">
                <span className="text-secondary">Don't have an account? </span>
                <button onClick={onSwitch} className="link bg-transparent p-0 w-auto inline-block border-none hover:transform-none hover:shadow-none">
                    Create an account
                </button>
            </div>
        </div>
    );
};

export default Login;
