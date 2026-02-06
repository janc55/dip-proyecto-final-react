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
            setTimeout(() => onSwitch(), 2000); // Redirect to login after 2s
        } catch (err) {
            setError(err.response?.data?.message || 'Error creating account. Try a different username.');
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="glass-card animate-fade-in text-center py-12">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Account Created!</h2>
                <p className="text-secondary mb-0">Redirecting to login...</p>
            </div>
        );
    }

    return (
        <div className="glass-card animate-fade-in text-center">
            <div className="mb-8">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <UserPlus className="w-8 h-8 text-indigo-500" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Create Account</h2>
                <p className="text-secondary">Join us to start managing your tasks</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-left">
                    <label className="block text-sm font-medium mb-1.5 ml-1 text-secondary">Choose Username</label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                        <input
                            type="text"
                            className="pl-12"
                            placeholder="Pick a unique name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="text-left">
                    <label className="block text-sm font-medium mb-1.5 ml-1 text-secondary">Create Password</label>
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
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
                </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10 text-sm">
                <span className="text-secondary">Already have an account? </span>
                <button onClick={onSwitch} className="link bg-transparent p-0 w-auto inline-block border-none hover:transform-none hover:shadow-none">
                    Sign in
                </button>
            </div>
        </div>
    );
};

export default Register;
