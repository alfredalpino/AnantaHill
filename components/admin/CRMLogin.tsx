'use client';

import { useState } from 'react';
import { Lock, User, KeyRound, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface CRMLoginProps {
    onUnlock: () => void;
}

export default function CRMLogin({ onUnlock }: CRMLoginProps) {
    const [username, setUsername] = useState('');
    const [pin, setPin] = useState('');
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(false);

        // Simulated authentication
        setTimeout(() => {
            if (username === 'ananta-admin' && pin === '12345') {
                // Set a temporary cookie for API authentication
                document.cookie = "ananta_admin_session=true; path=/; max-age=86400; SameSite=Lax";
                onUnlock();
            } else {
                setError(true);
                setIsLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen bg-[#fafaf8] flex items-center justify-center p-6 border-4 border-white">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-[2rem] shadow-premium overflow-hidden z-10 p-10 space-y-8"
            >
                <div className="text-center space-y-4">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-display font-bold text-text-primary">Staff Access</h1>
                        <p className="text-xs text-text-muted font-bold tracking-widest uppercase text-primary">Secure Admin Portal</p>
                    </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted ml-1">Username / ID</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-secondary/20 border border-secondary rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    placeholder="Enter username"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted ml-1">Pin Code</label>
                            <div className="relative">
                                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                <input
                                    type="password"
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                    className="w-full bg-secondary/20 border border-secondary rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    placeholder="Enter pin"
                                />
                            </div>
                        </div>
                    </div>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-[10px] font-bold text-error uppercase tracking-widest text-center"
                        >
                            Invalid credentials. Please try again.
                        </motion.p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-accent text-white rounded-2xl py-4 font-bold text-xs uppercase tracking-[0.2em] hover:bg-primary-dark transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                    >
                        {isLoading ? 'Authenticating...' : 'Unlock Dashboard'}
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <div className="pt-4 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2 text-[10px] text-text-muted font-bold uppercase tracking-widest">
                        <Lock className="w-3 h-3" /> Encrypted Session
                    </div>
                    <a 
                        href="/" 
                        className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest flex items-center gap-1"
                    >
                        ← Back to Website
                    </a>
                </div>
            </motion.div>
        </div>
    );
}
