'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

interface AdminHeaderProps {
    isProfileOpen: boolean;
    setIsProfileOpen: (isOpen: boolean) => void;
    onLogout: () => void;
}

export default function AdminHeader({
    isProfileOpen,
    setIsProfileOpen,
    onLogout
}: AdminHeaderProps) {
    const pathname = usePathname();
    const router = useRouter();
    
    const tabName = pathname === '/admin/dashboard' ? 'overview' : pathname?.split('/').pop() || 'overview';
    const activeTab = tabName;

    const getTabTitle = (tab: string) => {
        switch (tab) {
            case 'overview': return 'Overview Dashboard';
            case 'table-reservations': return 'Table Reservations';
            case 'settings': return 'System Settings';
            default: return 'Admin Panel';
        }
    };

    return (
        <header className="sticky top-0 z-40 flex h-20 items-center border-b border-secondary bg-white/90 px-4 backdrop-blur-md md:px-8">
            <div className="flex w-full items-center justify-between">
                <div>
                    <h1 className="font-display text-xl font-bold text-text-primary md:text-2xl">{getTabTitle(activeTab)}</h1>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-text-muted">
                        Home / <span className="text-primary-dark">{activeTab.replace('-', ' ')}</span>
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-3 rounded-xl border border-transparent p-1.5 transition-colors duration-200 hover:border-secondary hover:bg-secondary/40"
                        >
                            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
                                <User className="w-5 h-5 text-primary-dark" />
                            </div>
                            <div className="text-left hidden md:block pr-2">
                                <p className="text-sm font-bold text-text-primary leading-none">Admin User</p>
                                <p className="text-[10px] text-primary font-bold uppercase tracking-wider mt-1">Super Admin</p>
                            </div>
                        </button>

                        <AnimatePresence>
                            {isProfileOpen && (
                                <div className="absolute top-full right-0 mt-2 w-56">
                                    <div className="fixed inset-0 z-[-1]" onClick={() => setIsProfileOpen(false)} />
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="bg-white rounded-2xl border border-secondary shadow-xl py-2 overflow-hidden"
                                    >
                                        <div className="px-4 py-2 border-b border-secondary mb-2">
                                            <p className="text-xs font-bold text-text-primary">Admin Staff</p>
                                            <p className="text-[9px] text-text-muted font-bold uppercase tracking-widest">Operations</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                router.push('/admin/dashboard/settings');
                                                setIsProfileOpen(false);
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-text-muted hover:text-primary-dark hover:bg-secondary/30 transition-all"
                                        >
                                            <User className="w-4 h-4" /> Account
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsProfileOpen(false);
                                                onLogout();
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-error hover:bg-error/5 transition-all"
                                        >
                                            <LogOut className="w-4 h-4" /> Logout
                                        </button>
                                    </motion.div>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </header>
    );
}
